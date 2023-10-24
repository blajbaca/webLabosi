<?php
$servername = "localhost";
$username = "admin";
$password = "admin";
$dbname = "lv4web";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === true) {
    echo "Database created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->select_db($dbname);

$sql = "CREATE TABLE IF NOT EXISTS products (
    id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    code VARCHAR(100) NOT NULL,
    price DOUBLE(9,2) NOT NULL,
    image VARCHAR(250) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY code (code)
) ENGINE=InnoDB DEFAULT CHARSET=latin1";

if ($conn->query($sql) === true) {
    echo "Table 'products' created successfully<br>";
} else {
    echo "Error creating table: " . $conn->error;
}

$insertData = "
    INSERT INTO products (name, code, price, image)
    VALUES
        ('Apple', '1', 2.3, 'assets/apple.png'),
        ('Banana', '2', 1.4, 'assets/banana.png'),
        ('Pineapple', '3', 3.7, 'assets/pineapple.jpg'),
        ('Kiwi', '4', 0.5, 'assets/kiwi.jpg'),
        ('Orange', '5', 2.1, 'assets/orange.jpg'),
        ('Pear', '6', 4.4, 'assets/pear.jfif'),
        ('Fig', '7', 5.4, 'assets/fig.jpg'),
        ('Plum', '8', 3.1, 'assets/plum.jpg'),
        ('Avocado', '9', 6.8, 'assets/avocado.png'),
        ('Grapefruit', '10', 4.9, 'assets/grapefruit.jpg')
";

if ($conn->multi_query($insertData) === true) {
    echo "Data inserted successfully<br>";
} else {
    echo "Error inserting data: " . $conn->error;
}

$conn->close();
?>
