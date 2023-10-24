<?php
session_start();

if (!isset($_SESSION['cart']) || !is_array($_SESSION['cart']) || count($_SESSION['cart']) === 0) {
    header('Location: index.php');
    exit();
}

include 'db.php';

$conn = connect();

$totalPrice = 0;
$orderDetails = array();

foreach ($_SESSION['cart'] as $productID => $quantity) {
    $query = "SELECT * FROM products WHERE id = $productID";
    $result = mysqli_query($conn, $query);
    $product = mysqli_fetch_assoc($result);

    if ($product) {
        $subtotal = $product['price'] * $quantity;

        $orderDetails[] = array(
            'name' => $product['name'],
            'quantity' => $quantity,
            'price' => $product['price'],
            'subtotal' => $subtotal,
            'image' => $product['image']
        );

        $totalPrice += $subtotal;
    }
}

$_SESSION['cart'] = array();

mysqli_close($conn);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>Order Confirmation</h1>

    <h2>Thank you for your order!</h2>

    <h3>Order Details:</h3>
    <ul class="order-items">
        <?php foreach ($orderDetails as $item): ?>
            <li>
                <img src="<?php echo $item['image']; ?>" alt="<?php echo $item['name']; ?>">
                <p><strong>Item:</strong> <?php echo $item['name']; ?></p>
                <p><strong>Quantity:</strong> <?php echo $item['quantity']; ?></p>
                <p><strong>Price per item:</strong> $<?php echo $item['price']; ?></p>
                <p><strong>Subtotal:</strong> $<?php echo $item['subtotal']; ?></p>
            </li>
        <?php endforeach; ?>
    </ul>

    <p><strong>Total:</strong> $<?php echo $totalPrice; ?></p>

    <a href="index.php">Back to Shop</a>
</body>
</html>
