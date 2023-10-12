<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Models\Categories;

class CategoryController extends BaseController
{

    public function index()
    {
        $category = new Categories();
        $categories = $category->findAll();
        $json = [
            'message' => 'Liste des catégories',
            'success' => true,
            'categories' => $categories
        ];
        echo json_encode($json);
        exit;
    }
}
