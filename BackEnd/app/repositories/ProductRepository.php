<?php

namespace app\repositories;

use app\interface\ProductInterface;

use PDO;
use PDOException;

class ProductRepository
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function isSKUUnique($sku)
    {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM products WHERE sku = ?");
        $stmt->execute([$sku]);
        $count = $stmt->fetchColumn();

        return $count === 0;
    }


    public function addProduct(ProductInterface $product)
    {
        if ($this->isSKUUnique($product->getSKU())) {
            $product->saveToDatabase($this->pdo);
        } else {
            throw new \Exception("SKU must be unique");
        }
    }

    public function updateProduct(ProductInterface $product)
    {
        $product->updateInDatabase($this->pdo);
    }

    public function deleteProduct(ProductInterface $product)
    {
        $product->deleteFromDatabase($this->pdo);
    }

    public function getProductBySKU($sku)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM products WHERE sku = ?");
        $stmt->execute([$sku]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllProducts()
    {
        $stmt = $this->pdo->query("SELECT * FROM products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductById($productId)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$productId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // delete multi products

    public function deleteMultiProducts($productIds)
    {
        $productIds = array_map('intval', $productIds);


        if (empty($productIds)) {
            return false;
        }

        try {
            $placeholders = implode(',', array_fill(0, count($productIds), '?'));

            $stmt = $this->pdo->prepare("DELETE FROM products WHERE id IN ($placeholders)");

            foreach ($productIds as $key => $value) {
                $stmt->bindValue(($key + 1), $value, PDO::PARAM_INT);
            }

            $stmt->execute();

            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return false;
        }
    }
}
