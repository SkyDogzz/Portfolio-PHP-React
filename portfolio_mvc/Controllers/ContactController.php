<?php

namespace App\Controllers;

use App\Core\Utils;
use App\Models\Contact;
use App\Core\BaseController;

class ContactController extends BaseController
{

    public function index(): void
    {
        $contact = new Contact();
        $contact = $contact->findLast();
        if ($contact == NULL) {
            echo json_encode([
                'message' => 'Aucun contact',
                'success' => false
            ]);
            exit;
        }
        echo json_encode([
            'message' => 'Contact récupéré',
            'success' => true,
            'data' => $contact
        ]);
    }

    public function update(): void
    {
        if (!isset($_POST['email']) || !isset($_POST['telephone']) || !isset($_POST['message'])) {
            echo json_encode([
                'message' => 'Paramètres manquants',
                'success' => false
            ]);
            exit;
        }

        $email = $_POST['email'];
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([
                'message' => 'Email invalide',
                'success' => false
            ]);
            exit;
        }

        $phone = $_POST['telephone'];
        if (!preg_match('/^0[1-9](\.\d{2}){0,4}$/', $phone)) {
            echo json_encode([
                'message' => 'Numéro de téléphone invalide',
                'success' => false
            ]);
            exit;
        }

        $message = $_POST['message'];
        if (strlen($message) != 0 && strlen($message) < 5) {
            echo json_encode([
                'message' => 'Message trop court',
                'success' => false
            ]);
            exit;
        }

        $contact = new Contact();
        $contact->setEmail($email);
        $contact->setTelephone($phone);
        $contact->setMessage($message);
        $contact->update();

        echo json_encode([
            'message' => 'Contact mis à jour',
            'success' => true
        ]);
    }
}
