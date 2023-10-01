<?php

namespace App\Models;

use App\Core\Sql;


class Users extends Sql
{
    public Int $id;
    public String $name;
    public String $email;
    public String $password;
}
