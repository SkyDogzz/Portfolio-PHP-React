<?php

namespace App\Core;

class BaseController
{

    public function __construct()
    {
        //Sanitize information
        foreach ($_POST as $key => $value) {
            $_POST[$key] = trim(strip_tags($value));
        }
        foreach ($_GET as $key => $value) {
            $_GET[$key] = trim(strip_tags($value));
        }

    }

}
