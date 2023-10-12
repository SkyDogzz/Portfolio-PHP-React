INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@doe.com', '123456');

INSERT INTO categories (name) VALUES ('Web'), ('PHP'), ('Javascript');

INSERT INTO projects (title, description, link, github, createdAt, user_id) VALUES ('Mon premier projet', 'Ceci est la description de mon premier projet','http://google.fr', 'https://github.com/skydogzz', NOW(), 1);

INSERT INTO project_categories (project_id, category_id) VALUES (1, 1), (1, 2), (1, 3);