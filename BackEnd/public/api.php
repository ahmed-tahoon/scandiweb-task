<?php
require __DIR__ . '/../app/interface/ProductInterface.php';
require __DIR__ . '/../app/services/ProductService.php';
require __DIR__ . '/../app/handlers/ProductHandler.php';
require __DIR__ . '/../app/repositories/ProductRepository.php';
require __DIR__ . '/../app/helpers/ResponseHelper.php';
require __DIR__ . '/../app/classes/Product.php';
require __DIR__ . '/../app/classes/DVDProduct.php';
require __DIR__ . '/../app/classes/BookProduct.php';
require __DIR__ . '/../app/classes/FurnitureProduct.php';
require __DIR__ . '/../app/validators/Validator.php';
require __DIR__ . '/../app/config/database.php';
require __DIR__ . '/../app/services/Database.php';



use app\services\ProductService;
use app\handlers\ProductHandler;
use app\repositories\ProductRepository;

$productRepository = new ProductRepository($pdo);
$productService = new ProductService($productRepository);
$productHandler = new ProductHandler($productService);




$productHandler->handleRequest($_REQUEST);
