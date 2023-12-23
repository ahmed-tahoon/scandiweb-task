<?php

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;

    $pdo = new PDO($dsn, DB_USER, DB_PASS);
} catch (PDOException $e) {

    echo "Faild to connect ";
}
