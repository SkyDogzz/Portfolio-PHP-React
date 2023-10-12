<?php

namespace App\Controllers;

use App\Models\Users;
use App\Models\Images;
use App\Models\Projects;
use App\Core\BaseController;

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

    public function show(int $id = NULL)
    {
        if($id == NULL) {
            $id = (int) explode('/', $_SERVER['REQUEST_URI'])[3];  
        }
        $project = new Projects();  
        $json = [
            'message' => 'Détail d\'un projet',
            'success' => true,
            'project' => $project->find($id)  
        ];
        echo json_encode($json);
    }

    public function create()
    {
        $project = new Projects();
        $project->setTitle($_POST['title']);
        $project->setDescription($_POST['description']);
        $project->setCreatedAt();
        $project->setUserId(1);
        $project->setCategories(explode(',', $_POST['categories']));
        $project->create();

        $image = new Images();
        $targetDir = "/var/www/html/uploads/";
        if (isset($_FILES['images'])) {
            $images = $_FILES['images'];
            for ($i = 0; $i < count($images['name']); $i++) {
                $image->setName($images['name'][$i]);
                $image->setPath($targetDir . $images['name'][$i]);
                $image->setProjectId($project->getId());
                $image->create();
                $name = $images['name'][$i];
                if ($images['error'][$i] === UPLOAD_ERR_OK) { 
                    $tmpName = $images['tmp_name'][$i];
                    $targetFilePath = $targetDir . basename($name);
        
                    if (!move_uploaded_file($tmpName, $targetFilePath)) {
                        echo json_encode([
                            'message' => 'Error with file upload',
                            'success' => false
                        ]);
                    }
                } else {
                    echo json_encode([
                        'message' => 'Error with file upload',
                        'success' => false
                    ]);
                }
            }
        }
        foreach ($_FILES['images'] as $image) {
        }
        
        $json = [
            'message' => 'Création d\'un projet',
            'success' => true,
            'project' => $_POST,
            'files' => $_FILES
        ];
        echo json_encode($json);
    }
}