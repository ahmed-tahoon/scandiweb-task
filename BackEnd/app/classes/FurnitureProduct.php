<?php

namespace app\classes;
use PDO;

class FurnitureProduct extends Product
{
    protected $height;
    protected $width;
    protected $length;

    public function __construct($sku, $name, $price, $height, $width, $length)
    {
        parent::__construct($sku, $name, $price);
        $this->setDimensions($height, $width, $length);
    }

    public function setDimensions($height, $width, $length)
    {
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    public function getDimensions()
    {
        return [
            'height' => $this->height,
            'width' => $this->width,
            'length' => $this->length
        ];
    }


    public function saveToDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("INSERT INTO products (sku, name, price, height, width, length, type) VALUES (?, ?, ?, ?, ?, ?, 'Furniture')");
        $stmt->execute([$this->getSKU(), $this->getName(), $this->getPrice(), $this->height, $this->width, $this->length]);
    }

    public function updateInDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("UPDATE products SET name = ?, price = ?, height = ? WHERE width = ?");
        $stmt->execute([$this->name, $this->price, $this->height, $this->width]);
    }

    public function deleteFromDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("DELETE FROM products WHERE sku = ?");
        $stmt->execute([$this->sku]);
    }
}
