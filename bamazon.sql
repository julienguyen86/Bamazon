DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INT(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NULL,
	department_name VARCHAR(50) NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INT(10) NULL,
	primary key(id)


);

SELECT * FROM products;


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JavaScript and Jquery","Books", "23.07", 18),
		("Justice League","Movies", "19.99", 20),
		("Echo Dot","Electronics", "49.99", 10),
		("Iphone Charger", "Accessories", "9.99", 15),
		("Screen protector", "Accessories", "4.99", 10),
		("Nike Air Huarache", "Shoes", "120", 9),
		("Harry Potter","Books", "8.99", 15),
		("Apple Watch", "Electronics", "258.50", 14),
		("Macbook Pro Case", "Accessories", "54.95", 20),
		("Fire TV", "Electronics", "69.99", 2);

