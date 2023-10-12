<?php

namespace App\Models;

use App\Core\Sql;

class Categories extends Sql{

    protected int $id;
    protected string $name;

    public function findByProject(int $id){
        $db = $this::getInstance();
        $result = $db->pdo->prepare("SELECT * FROM categories INNER JOIN project_categories ON categories.id = project_categories.category_id WHERE project_categories.project_id = :id");
        $result->execute([
            'id' => $id
        ]);
        return $result->fetchAll();
    }

}