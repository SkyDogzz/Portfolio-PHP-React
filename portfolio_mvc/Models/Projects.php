<?php

namespace App\Models;

use App\Core\Sql;

class Projects extends Sql
{

    protected int $id;
    protected string $title;
    protected string $description;
    protected $createdAt;
    protected int $user_id;
    protected array $categories = [];

    public function findAll(): array
    {
        $query = "SELECT projects.*, GROUP_CONCAT(categories.name) AS categories
        FROM $this->table
        LEFT JOIN project_categories ON projects.id = project_categories.project_id
        LEFT JOIN categories ON project_categories.category_id = categories.id
        GROUP BY projects.id";
        $db = $this::getInstance();
        $result = $db->pdo->prepare($query);
        $result->execute();
        $projects = $result->fetchAll();
        return $projects;
    }
}
