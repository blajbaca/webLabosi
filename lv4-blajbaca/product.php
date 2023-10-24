<?php
session_start();

include 'db.php';

$conn = connect();

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $product = $result->fetch_assoc();
    } else {
        echo "Product not found";
        exit;
    }

    $stmt->close();
} else {
    echo "No product ID provided";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['quantity']) && is_numeric($_POST['quantity'])) {
        $quantity = intval($_POST['quantity']);

        $cartItem = array(
            'id' => $product['id'],
            'name' => $product['name'],
            'price' => $product['price'],
            'quantity' => $quantity
        );


        header("Location: product.php?id=$id");
        exit;
    } else {
        echo "Invalid quantity";
        exit;
    }
}
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Product Page</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <a href="index.php"><h2>Web Shop</h2></a>
    <div class="product-details">
      <div class="product-image">
        <img src="<?php echo $product['image']; ?>">
      </div>
      <div class="product-info">
        <p>Price: $<?php echo $product['price']; ?></p>
        <form method="POST" action="addToCart.php">
          <input type="hidden" name="product_id" value="<?php echo $product['id']; ?>">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" min="1" value="1">
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    </div>
    <a href="index.php">Go back to shop</a>
  </body>
</html>
