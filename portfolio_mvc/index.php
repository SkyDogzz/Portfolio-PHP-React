<?php

namespace App;

// Chargez l'autoloader pour gérer automatiquement les classes et les espaces de noms.
require_once __DIR__ . '/vendor/autoload.php';

// Utilisez les classes et les espaces de noms nécessaires.
use App\Core\Utils;

spl_autoload_register(function ($class) {
    $class = str_replace("App\\", "", $class);
    $class = str_replace("\\", "/", $class) . ".php";
    if (file_exists($class)) {
      include $class;
    }
  });

// Définissez le chemin de base de l'application (modifiable en fonction de votre configuration).
define('BASE_PATH', '/');

// Obtenez le chemin de l'URL actuelle (par exemple, "/mon_projet/index.php/projets").
$current_url = $_SERVER['REQUEST_URI'];
// Retirez le chemin de base de l'URL pour obtenir le chemin relatif.
$relative_path = str_replace(BASE_PATH, '/', $current_url);

//Retire les variables GET de l'url
$relative_path = explode('?', $relative_path)[0];

// Divisez le chemin en segments.
$segments = explode('/', $relative_path);

// Déterminez le contrôleur et la méthode à appeler en fonction des segments de l'URL.
$controller_name = (isset($segments[1]) && $segments[1] != '') ? ucfirst($segments[1]) . 'Controller' : 'HomeController';
$method_name = (isset($segments[2]) && $segments[2] != '') ? $segments[2] : 'index';

// Complétez le nom du contrôleur avec l'espace de noms complet.
$controller_name = 'App\\Controllers\\' . $controller_name;

// Instanciez le contrôleur et appelez la méthode appropriée.
if (class_exists($controller_name)) {
    $controller = new $controller_name();
    if (method_exists($controller, $method_name)) {
        $controller->$method_name();
    } else {
        // Gérez ici la méthode non trouvée (par exemple, affichez une page 404).
        Utils::error(404, 'Méthode ' . $method_name . ' non trouvée');
    }
} else {
    // Gérez ici le contrôleur non trouvé (par exemple, affichez une page 404).
    Utils::error(404, 'Contrôleur ' . $controller_name . ' non trouvé');
}
