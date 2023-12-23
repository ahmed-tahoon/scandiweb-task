<?php

namespace app\helpers;

class ResponseHelper
{
    public static function sendSuccessResponse($data = [], $message = 'Success', $statusCode = 200)
    {

        return self::sendResponse(true, $data, $message, $statusCode);
    }

    public static function sendErrorResponse($message = 'Error', $statusCode = 500)
    {
        return self::sendResponse(false, null, $message, $statusCode);
    }

    private static function sendResponse($success, $data = null, $message = '', $statusCode = 200)
    {
        header('Content-Type: application/json');
        http_response_code($statusCode);

        $response = [
            'success' => $success,
            'message' => $message,
            'data' => $data
        ];

        echo json_encode($response);
    }
}
