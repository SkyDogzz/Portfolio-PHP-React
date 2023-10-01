<?php

namespace App\Controllers;

use App\Models\Users;
use Firebase\JWT\JWT;
use App\Core\BaseController;

class AuthController extends BaseController
{

    public function login()
    {
        $users = new Users();
        $user = $users->findByColumn('email', 'test@test');

        $jwt = JWT::encode((array) $user, $_ENV['JWT_KEY'], 'HS256');
        echo json_encode($jwt);
    }
}
