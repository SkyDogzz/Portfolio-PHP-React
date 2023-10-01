<?php

namespace App\Controllers;

use App\Models\Projects;
use App\Core\BaseController;

class HomeController extends BaseController
{
    public function index()
    {
        echo 'Page d\'accueil';
    }

    public function testDbConnection()
    {
        $projects = new Projects();

        var_dump($projects->findAll());
    }
}