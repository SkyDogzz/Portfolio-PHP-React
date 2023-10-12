<?php

namespace App\Models;

use App\Core\Sql;

class Images extends Sql{

    protected int $id;
    protected string $name;
    protected string $path;
    protected int $project_id;

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setPath(string $path): void
    {
        $this->path = $path;
    }

    public function setProjectId(int $project_id): void
    {
        $this->project_id = $project_id;
    }

    public function create(array $data = NULL)
    {
        $db = $this::getInstance();
        $result = $db->pdo->prepare("INSERT INTO images (name, path, project_id) VALUES (:name, :path, :project_id)");
        $result->execute([
            'name' => $this->name,
            'path' => $this->path,
            'project_id' => $this->project_id
        ]);
        $this->id = $db->pdo->lastInsertId();
    }

    public function findByProject(int $id){
        $db = $this::getInstance();
        $result = $db->pdo->prepare("SELECT * FROM images WHERE project_id = :id");
        $result->execute([
            'id' => $id
        ]);
        $images = $result->fetchAll();
        return $images;
    }

}