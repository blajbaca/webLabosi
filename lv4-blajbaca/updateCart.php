<?php
session_start();

$productID = $_POST['product_id'];
$newQuantity = $_POST['quantity'];

if (isset($_SESSION['cart'][$productID])) {
  $_SESSION['cart'][$productID] = $newQuantity;
}

header('Location: cart.php');
exit();
?>
