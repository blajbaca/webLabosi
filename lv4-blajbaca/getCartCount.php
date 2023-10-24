<?php
session_start();

$cartCount = 0;

if (isset($_SESSION['cart'])) {
  foreach ($_SESSION['cart'] as $quantity) {
    $cartCount += $quantity;
  }
}

$response = array('count' => $cartCount);
echo json_encode($response);
?>