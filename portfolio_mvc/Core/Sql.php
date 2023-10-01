<?php

namespace App\Core;

use PDOException;

class Sql
{

    protected static $instance = null;
    protected $pdo;
    protected $table;

    public function __construct()
    {
        try {
            $this->pdo = new \PDO('mysql:host=' . $_ENV['MYSQL_HOST'] . ';port:' . $_ENV['MYSQL_PORT'] . ';dbname=' . $_ENV['MYSQL_DATABASE'] . ';charset=utf8', $_ENV['MYSQL_USER'], $_ENV['MYSQL_PASSWORD']);
            $this->pdo->exec("USE " . $_ENV['MYSQL_DATABASE']);
        } catch (PDOException $e) {
            die("Erreur de connexion à la base de données : " . $e->getMessage());
        }
        $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $this->pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);

        $this->table = strtolower(str_replace('App\\Models\\', '', get_called_class()));
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new Sql();
        }
        return self::$instance;
    }

    public function find(int $id): object | null
    {
        $query = "SELECT * FROM $this->table WHERE id = :id";
        $result = $this->pdo->prepare($query);
        $result->execute(['id' => $id]);
        $data = $result->fetch(\PDO::FETCH_OBJ);
        return $data;
    }

    public function findAll(): array | null
    {
        $query = "SELECT * FROM $this->table";
        $result = $this->pdo->query($query);
        $datas = $result->fetchAll(\PDO::FETCH_OBJ);
        return $datas;
    }

    public function findByColumn(String $column, String $value): object | bool
    {
        $query = "SELECT * FROM $this->table WHERE $column = :$column";
        $result = $this->pdo->prepare($query);
        $result->execute([$column => $value]);
        $data = $result->fetch(\PDO::FETCH_OBJ);
        return $data;
    }

    public function create(array $data): void
    {
        $keys = array_keys($data);
        $fields = implode(', ', $keys);
        $values = ':' . implode(', :', $keys);
        $query = "INSERT INTO $this->table ($fields) VALUES ($values)";
        $result = $this->pdo->prepare($query);
        $result->execute($data);
    }

    public function update(int $id, array $data): void
    {
        $keys = array_keys($data);
        $fields = '';
        foreach ($keys as $key) {
            $fields .= $key . ' = :' . $key . ', ';
        }
        $fields = rtrim($fields, ', ');
        $query = "UPDATE $this->table SET $fields WHERE id = :id";
        $data['id'] = $id;
        $result = $this->pdo->prepare($query);
        $result->execute($data);
    }

    public function delete(int $id): void
    {
        $query = "DELETE FROM $this->table WHERE id = :id";
        $result = $this->pdo->prepare($query);
        $result->execute(['id' => $id]);
    }
}
