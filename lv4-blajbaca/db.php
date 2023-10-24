<?php
function connect()
{
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "lv4web";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}
?>