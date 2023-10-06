INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@doe.com', '123456');

INSERT INTO categories (name) VALUES ('Web');

INSERT INTO projects (title, description, createdAt, user_id) VALUES ('Mon premier projet', 'Ceci est la description de mon premier projet', NOW(), 1);

INSERT INTO project_categories (project_id, category_id) VALUES (1, 1);