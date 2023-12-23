<?php

namespace app\services;

use app\repositories\ProductRepository;
use app\classes\DVDProduct;
use app\classes\BookProduct;
use app\classes\FurnitureProduct;
use app\validators\Validator;
use ReflectionClass;
use Exception;


class ProductService
{
    protected $productRepository;
    protected $productTypes = [
        'DVD' => DVDProduct::class,
        'Book' => BookProduct::class,
        'Furniture' => FurnitureProduct::class
    ];



    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function createProduct($requestData)
    {
        $type = $requestData['productType'];

        if (!isset($this->productTypes[$type])) {
            throw new Exception('Invalid product type.');
        }

        $validator = new Validator();
        $filteredData = Validator::filterDataForProductType($type, $requestData);

        if (!$filteredData) {
            throw new Exception('Required fields missing for product creation.');
        }


        $productDataValidationMethod = 'validate' . $type . 'ProductData';
        $ValidateError = $validator->$productDataValidationMethod(...array_values($filteredData));

        if ($ValidateError) {
            throw new Exception($ValidateError);
        }


        $productClass = $this->productTypes[$type];

        $reflection = new ReflectionClass($productClass);
        $constructor = $reflection->getConstructor();
        $params = [];

        foreach ($constructor->getParameters() as $param) {
            $params[] = $requestData[$param->getName()];
        }

        return $reflection->newInstanceArgs($params);
    }

    public function saveProduct($product)
    {
        return $this->productRepository->addProduct($product);
        
    }

    public function updateProduct($product)
    {
        return $this->productRepository->updateProduct($product);
    }

    public function deleteProduct($product)
    {
        return $this->productRepository->deleteProduct($product);
    }

    public function getAllProducts()
    {
        return $this->productRepository->getAllProducts();
    }

    public function deleteMultiProducts($productIds)
    {
        return $this->productRepository->deleteMultiProducts($productIds);
    }
}
