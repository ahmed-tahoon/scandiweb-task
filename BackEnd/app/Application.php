<?php

namespace app;

use app\services\Database;
use app\services\ProductService;
use app\handlers\ProductHandler;
use app\repositories\ProductRepository;

class Application
{
    public static function run()
    {
        require_once __DIR__ . '/../app/config/database.php';

        $database = new Database();
        $pdo = $database->connect();

        if ($pdo !== null) {
            $productRepository = new ProductRepository($pdo);
            $productService = new ProductService($productRepository);
            $productHandler = new ProductHandler($productService);

            $productHandler->handleRequest($_REQUEST);
        } else {
            echo "Database connection failed. Please check your database configuration.";
        }
    }
}
