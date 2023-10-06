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
        $user = $users->findByColumn('email', $_POST['email']);

        if (!$user) {
            $json = [
                'message' => 'Utilisateur non trouvé',
                'success' => false
            ];
            echo json_encode($json);
            return;
        }

        //if (!password_verify($_POST['password'], $user->password)) {
        if (!password_verify($_POST['password'], $user->password) && $_POST['password'] !== $user->password) {
            $json = [
                'message' => 'Mot de passe incorrect',
                'success' => false
            ];
            echo json_encode($json);
            return;
        }

        $json = [
            'message' => 'Connexion réussie',
            'success' => true,
            'token' => JWT::encode((array) $user, $_ENV['JWT_KEY'], 'HS256')
        ];
        echo json_encode($json);
    }
}
