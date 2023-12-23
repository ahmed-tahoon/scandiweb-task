<?php
namespace app\interface;
use PDO;

interface ProductInterface {
    public function saveToDatabase(PDO $pdo);
    public function updateInDatabase(PDO $pdo);
    public function deleteFromDatabase(PDO $pdo);
}