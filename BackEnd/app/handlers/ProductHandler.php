<?php

namespace app\handlers;

use Exception;
use app\services\ProductService;
use app\helpers\ResponseHelper;

class ProductHandler
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function handleRequest($requestData)
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            
                if (isset($requestData['action'])) {
                    if ($requestData['action'] === 'createProduct') {
                        $product = $this->productService->createProduct($requestData);
                        $this->productService->saveProduct($product);
                        ResponseHelper::sendSuccessResponse(['product' => $product], 'Product added successfully');
                    } elseif ($requestData['action'] === 'deleteMultipleProducts') {
                        // Logic for deleting multiple products
                        
                        $productIds = $requestData['productIds'] ?? [];
                        $productIdsArray = explode(',', $productIds);
                        if (!empty($productIdsArray)) {
                            $deleted = $this->productService->deleteMultiProducts($productIdsArray);
            
                            if ($deleted) {
                                ResponseHelper::sendSuccessResponse([], 'Products deleted successfully');
                            } else {
                                ResponseHelper::sendErrorResponse('Products not found', 404);
                            }
                        } else {
                            ResponseHelper::sendErrorResponse('Product IDs are required for deletion', 400);
                        }
                    } else {
                        // Handle other actions if needed
                        ResponseHelper::sendErrorResponse('Invalid action', 400);
                    }
                } else {
                    // Handle other POST request scenarios if action parameter is not present
                    ResponseHelper::sendErrorResponse('Action parameter missing', 400);
                }
            } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $products = $this->productService->getAllProducts();
                ResponseHelper::sendSuccessResponse(['products' => $products], 'Products retrieved successfully');
            }  else {
                ResponseHelper::sendErrorResponse('Invalid request method', 400);
            }
        } catch (Exception $e) {
            ResponseHelper::sendErrorResponse($e->getMessage(), 500);
        }
    }
}
