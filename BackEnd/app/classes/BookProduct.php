<?php
namespace app\classes;
use app\interface\ProductInterface;
use PDO;


class BookProduct extends Product
{
    protected $weight;

    public function __construct($sku, $name, $price, $weight)
    {
        parent::__construct($sku, $name, $price);
        $this->setWeight($weight);
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    public function saveToDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("INSERT INTO products (sku, name, price, weight, type) VALUES (?, ?, ?, ?, 'Book')");
        $stmt->execute([$this->sku, $this->name, $this->price, $this->weight]);
        
    }

    public function updateInDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("UPDATE products SET name = ?, price = ?, weight = ? WHERE sku = ?");
        $stmt->execute([$this->name, $this->price, $this->weight, $this->sku]);
    }

    public function deleteFromDatabase(PDO $pdo)
    {
        $stmt = $pdo->prepare("DELETE FROM products WHERE sku = ?");
        $stmt->execute([$this->sku]);
    }


}
