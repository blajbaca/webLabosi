<?php
include 'db.php';

$conn = connect();
$query = "SELECT * FROM products";
$result = mysqli_query($conn, $query);

$cartCount = isset($_SESSION['cart']) ? count($_SESSION['cart']) : 0;
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Web Shop</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <h1>Web Shop</h1>
    <div class="cart-container">
        <a href="cart.php" class="cart-button">Cart <span class="cart-badge"><?php echo $cartCount; ?></span></a>
    </div>

    <div class="items-grid">
      <?php while ($row = mysqli_fetch_assoc($result)): ?>
        <div class="item">
          <a href="product.php?id=<?php echo $row['id']; ?>"><img src="<?php echo $row['image']; ?>"></a>
          <h3><?php echo $row['name']; ?></h3>
          <p>Price: $<?php echo $row['price']; ?></p>
        </div>
      <?php endwhile; ?>
    </div>

    <div class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Cart</h2>
        <ul class="cart-items"></ul>
        <p>Total: <span class="cart-total">$0.00</span></p>
        <button class="buy-btn">Buy</button>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
