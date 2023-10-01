-- Table pour les utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Table pour les catégories de projets
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Table pour les projets
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt DATE,
    user_id INT,
    categorie_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
);