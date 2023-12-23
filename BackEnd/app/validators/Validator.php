<?php

namespace app\validators;

class Validator
{
    public static function validateBookProductData($sku, $name, $price, $weight)
    {

        if (empty($sku) || empty($name) || empty($price) || empty($weight)) {
            return "All fields are required!";
        }

        if (!is_string($sku) || strlen($sku) > 50) {
            return "SKU should be a string with a maximum length of 50 characters";
        }

        if (!is_string($name) || strlen($name) > 100) {
            return "Name should be a string with a maximum length of 100 characters";
        }

        if (!is_numeric($price) || $price <= 0) {
            return "Price should be a positive number";
        }

        if (!is_numeric($weight) || $weight <= 0) {
            return "Weight should be a positive number";
        }

        // check max integer value for all numbers
        if ($weight > PHP_INT_MAX ||  $price > PHP_INT_MAX) {
            return "Weight is too big";
        }

        // ceeck max char value for all strings

        if (strlen($sku) > 50 || strlen($name) > 100) {
            return "SKU or Name is too big";
        }





        return false;
    }

    public static function validateDVDProductData($sku, $name, $price, $size)
    {
        if (empty($sku) || empty($name) || empty($price) || empty($size)) {
            return "All fields are required!";
        }

        if (!is_string($sku) || strlen($sku) > 50) {
            return "SKU should be a string with a maximum length of 50 characters";
        }

        if (!is_string($name) || strlen($name) > 100) {
            return "Name should be a string with a maximum length of 100 characters";
        }

        if (!is_numeric($price) || $price <= 0) {
            return "Price should be a positive number";
        }

        if (!is_numeric($size) || $size <= 0) {
            return "Size should be a positive number";
        }

        // check max integer value for all numbers

        if ($size > PHP_INT_MAX ||  $price > PHP_INT_MAX) {
            return "Size is too big";
        }


        return false;
    }

    public static function validateFurnitureProductData($sku, $name, $price, $height, $width, $length)
    {
        if (empty($sku) || empty($name) || empty($price) || empty($height) || empty($width) || empty($length)) {
            return "All fields are required!";
        }

        if (!is_string($sku) || strlen($sku) > 50) {
            return "SKU should be a string with a maximum length of 50 characters";
        }

        if (!is_string($name) || strlen($name) > 100) {
            return "Name should be a string with a maximum length of 100 characters";
        }

        if (!is_numeric($price) || $price <= 0) {
            return "Price should be a positive number";
        }

        if (!is_numeric($height) || $height <= 0 || !is_numeric($width) || $width <= 0 || !is_numeric($length) || $length <= 0) {
            return "Height, Width and Length should be a positive number";
        }

        // check max integer value for all numbers

        if ($height > PHP_INT_MAX ||  $width > PHP_INT_MAX || $length > PHP_INT_MAX || $price > PHP_INT_MAX) {
            return "Height, Width or Length is too big";
        }

        return false;
    }

    public static function filterDataForProductType($type, $requestData)
    {
        $keysByType = [
            'Book' => ['sku', 'name', 'price', 'weight'],
            'DVD' => ['sku', 'name', 'price', 'size'],
            'Furniture' => ['sku', 'name', 'price', 'height', 'width', 'length']
        ];

        if (!isset($keysByType[$type])) {
            return false;
        }

        $typeKeys = $keysByType[$type]; // Get keys based on product type
        $filteredData = [];

        foreach ($typeKeys as $key) {
            if (isset($requestData[$key])) {
                $filteredData[$key] = $requestData[$key];
            } else {
                return  false;
            }
        }

        return $filteredData;
    }
}
