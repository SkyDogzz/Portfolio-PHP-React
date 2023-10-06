<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Models\Projects;

class ProjectController extends BaseController
{

    public function index()
    {
        $project = new Projects();
        $projects = $project->findAll();
        $json = [
            'message' => 'Liste des projets',
            'success' => true,
            'projects' => $projects
        ];
        echo json_encode($json);
    }
}