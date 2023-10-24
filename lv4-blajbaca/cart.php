<?php
session_start();

if (!isset($_SESSION['cart']) || !is_array($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Cart</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <a href="index.php"><h2>Web Shop</h2></a>
    <ul class="cart-items">
      <?php
        include 'db.php';

        $conn = connect();

        $totalPrice = 0;

        foreach ($_SESSION['cart'] as $productID => $quantity) {
          $query = "SELECT * FROM products WHERE id = $productID";
          $result = mysqli_query($conn, $query);
          $product = mysqli_fetch_assoc($result);

          if ($product) {
            echo '<li>';
            echo '<img src="' . $product['image'] . '" alt="Product Image">';
            echo '<h3>' . $product['name'] . '</h3>';
            echo '<p>Price: $' . $product['price'] . '</p>';
            echo '<form method="post" action="updateCart.php">';
            echo '<input type="hidden" name="product_id" value="' . $productID . '">';
            echo '<label for="quantity">Quantity:</label>';
            echo '<input type="number" id="quantity" name="quantity" min="1" value="' . $quantity . '">';
            echo '<button type="submit">Update</button>';
            echo '</form>';
            echo '</li>';

            $totalPrice += ($product['price'] * $quantity);
          }
        }

        mysqli_close($conn);
      ?>
    </ul>
    <p>Total: $<?php echo $totalPrice; ?></p>
    <form method="post" action="order.php">
      <button type="submit">Buy Cart</button>
    </form>
    <a href="index.php">Go back to shop</a>
  </body>
</html>