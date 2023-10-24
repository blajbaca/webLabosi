<?php
session_start();

if (isset($_POST['product_id']) && isset($_POST['quantity'])) {
    $productID = $_POST['product_id'];
    $quantity = $_POST['quantity'];

    if (isset($_SESSION['cart'][$productID])) {
        $_SESSION['cart'][$productID] += $quantity;
    } else {
        $_SESSION['cart'][$productID] = $quantity;
    }
}

header('Location: cart.php');
exit();
?>
