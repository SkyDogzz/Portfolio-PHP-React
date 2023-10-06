<?php

namespace App\Core;

use stdClass;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class BaseController
{
    public function __construct()
    {
        $this->onlyPostMiddlware();
        //$this->onlyAdminMiddleware();

        //Sanitize information
        foreach ($_POST as $key => $value) {
            $_POST[$key] = trim(strip_tags($value));
        }
        foreach ($_GET as $key => $value) {
            $_GET[$key] = trim(strip_tags($value));
        }
    }

    public function onlyAdminMiddleware()
    {
        try {
            $key = new Key($_ENV['JWT_KEY'], 'HS256');
            $headers = new stdClass();
            $headers->alg = 'HS256';
            $decoded = JWT::decode($_GET['JWT_TOKEN'], $key, $headers);
            return $decoded;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function onlyPostMiddlware()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $json = [
                'message' => 'Méthode non autorisée',
                'success' => false
            ];
            header("Content-Type: application/json");
            echo json_encode($json);
            exit;
        }
    }
}
