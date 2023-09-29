<?php

namespace App\Core;

class Utils
{

    public static function var_dump(mixed $var): void
    {
        echo '<pre style="width: 100%; background-color: #000; color: #fff; padding: 10px; margin: 0; font-size: 14px; line-height: 1.5; overflow: auto;">';
        var_dump($var);
        echo '</pre>';
    }

    public static function var_dump_die(mixed $var): void
    {
        echo '<pre style="width: 100%; background-color: #000; color: #fff; padding: 10px; margin: 0; font-size: 14px; line-height: 1.5; overflow: auto;">';
        var_dump($var);
        echo '</pre>';
        die();
    }

    public static function redirect(mixed $url): void
    {
        header('Location: ' . $url);
        exit();
    }

    public static function error(int $code, String $message): void
    {
        http_response_code($code);
        echo $message;
        exit();
    }
}
