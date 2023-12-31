<?php

namespace App\Models;

use stdClass;
use App\Core\Sql;

class Contact extends Sql{
    
    protected String $email;
    protected String $telephone;
    protected String $message;

    public function setEmail(String $email): void
    {
        $this->email = $email;
    }

    public function setTelephone(String $telephone): void
    {
        $this->telephone = $telephone;
    }

    public function setMessage(String $message): void
    {
        $this->message = $message;
    }

    public function update(int $id = NULL, array $data = NULL): void
    {
        $db = $this::getInstance();
        $result = $db->pdo->prepare("INSERT INTO contact (email, telephone, message) VALUES (:email, :telephone, :message)");
        $result->execute([
            'email' => $this->email,
            'telephone' => $this->telephone,
            'message' => $this->message
        ]);
    }

    public function findLast(): ?stdClass
    {
        $db = $this::getInstance();
        $result = $db->pdo->prepare("SELECT * FROM contact ORDER BY id DESC LIMIT 1");
        $result->execute();

        if ($result->rowCount() == 0) {
            return NULL;
        }

        return $result->fetch();
    }

}