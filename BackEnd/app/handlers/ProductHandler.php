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
            $json_data = file_get_contents('php://input');
            $requestData = json_decode($json_data, true);

            if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/products') {



                $product = $this->productService->createProduct($requestData);
                $this->productService->saveProduct($product);
                ResponseHelper::sendSuccessResponse(['product' => $product], 'Product added successfully');
            } else if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/products/delete') {
                $productIds = $requestData['productIds'] ?? "";
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
            } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/api/products') {
                $products = $this->productService->getAllProducts();
                ResponseHelper::sendSuccessResponse(['products' => $products], 'Products retrieved successfully');
            } else {
                ResponseHelper::sendErrorResponse('Invalid request method', 400);
            }
        } catch (Exception $e) {
            ResponseHelper::sendErrorResponse($e->getMessage(), 500);
        }
    }
}
