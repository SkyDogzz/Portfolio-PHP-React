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
    protected array $categories;

    public function __construct()
    {
        parent::__construct();
        $this->createdAt = date('Y-m-d H:i:s');
    }

    public function create($data = NULL)
    {
        $db = $this::getInstance();
        $result = $db->pdo->prepare("INSERT INTO projects (title, description, createdAt, user_id) VALUES (:title, :description, :created_at, :user_id)");
        $result->execute([
            'title' => $this->title,
            'description' => $this->description,
            'created_at' => $this->createdAt,
            'user_id' => $this->user_id
        ]);
        $id = $db->pdo->lastInsertId();
        $result = $db->pdo->prepare("INSERT INTO project_categories (project_id, category_id) VALUES (:project_id, :category_id)");

        if($this->categories[0] != "") {
            foreach ($this->categories as $category) {
                $result->execute([
                    'project_id' => $id,
                    'category_id' => $category
                ]);
            }
        }
        $this->id = $db->pdo->lastInsertId();
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function setCreatedAt(): void
    {
        $this->createdAt = date('Y-m-d H:i:s');
    }

    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    public function setCategories(array $categories): void
    {
        $this->categories = $categories;
    }

    public function getId(): int
    {
        $db = $this::getInstance();
        $result = $db->pdo->prepare("SELECT id FROM projects ORDER BY id DESC LIMIT 1");
        $result->execute();
        $id = $result->fetch();
        return $id->id;
    }

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
