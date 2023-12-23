<?php

namespace app\classes;

use app\interface\ProductInterface;
use PDO;


class DVDProduct extends Product
{
    protected $size;

    public function __construct($sku, $name, $price, $size)
    {
        parent::__construct($sku, $name, $price);
        $this->setSize($size);
    }

    public function getSize()
    {
        return $this->size;
    }

    public function setSize($size)
    {
        $this->size = $size;
    }

    // Implementation of the abstract method to save DVD product to the database
    public function saveToDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("INSERT INTO products (sku, name, price, size, type) VALUES (?, ?, ?, ?, 'DVD')");
        $stmt->execute([$this->getSKU(), $this->getName(), $this->getPrice(), $this->getSize()]);
    }

    public function updateInDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("UPDATE products SET name = ?, price = ?, weight = ? WHERE sku = ?");
    }

    public function deleteFromDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("DELETE FROM products WHERE sku = ?");
        $stmt->execute([$this->sku]);
    }
}
