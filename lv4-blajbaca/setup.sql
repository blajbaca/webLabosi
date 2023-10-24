CREATE TABLE IF NOT EXISTS `products` (
`id` int(10) NOT NULL AUTO_INCREMENT,
`name` varchar(250) NOT NULL,
`code` varchar(100) NOT NULL,
`price` double(9,2) NOT NULL,
`image` varchar(250) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `products` (`name`,`code`,`price`, `image`)
VALUES
    ('Apple','1', 2.3, 'assets/apple.png'),
    ('Banana','2', 1.4, 'assets/banana.png'),
    ('Pineapple','3', 3.7, 'assets/pineapple.jpg'),
    ('Kiwi','4', 0.5, 'assets/kiwi.jpg'),
    ('Orange','5', 2.1, 'assets/orange.jpg'),
    ('Pear','6', 4.4, 'assets/pear.jfif'),
    ('Fig','7', 5.4, 'assets/fig.jpg'),
    ('Plum','8', 3.1, 'assets/plum.jpg'),
    ('Avocado','9', 6.8, 'assets/avocado.png'),
    ('Grapefruit','10', 4.9, 'assets/grapefruit.jpg');