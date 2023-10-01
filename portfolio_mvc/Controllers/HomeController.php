<?php

namespace App\Controllers;

use App\Core\BaseController;

class HomeController extends BaseController
{
    public function index()
    {
        echo 'Page d\'accueil';
    }

    public function test()
    {
        echo 'test';
        
    }
}
