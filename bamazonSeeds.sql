DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR(30) NULL,
  department_name VARCHAR(30) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1001, "Wilson Catcher's Glove ", "Sports", 85.79, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1002, "Easton Youth Bat", "Sports", 249.99, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1003, "Wilson Batting Glove", "Sports", 14.79, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2001, "Apple iPad", "Electronics", 249.50, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2002, "Lenova Laptop", "Electronics", 499.50, 3);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2003, "Logitech Optical Mouse", "Electronics", 24.79, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3001, "Oakley Flak 2.0 Sunglasses", "Fashion", 199.79, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3002, "Oakley Half-Jacket Sunglasses", "Fashion", 185.79, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3003, "Maui Jim Mavrick Sunglasses", "Fashion", 249.79, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3004, "Ray-Ban Aviator Sunglasses", "Fashion", 155.79, 5);
