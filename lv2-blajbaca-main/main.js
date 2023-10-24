"use strict";

// const - constant (immutable)
// let - variable (mutable)
// require() - import
// console.log() - print

const readline = require('readline');
const process = require('process');
const { parse, format } = require('path');

let cart = [];
let walletAmount = 40;

// (Almost all) JavaScript types:
// - number (const a = 1;)
// - string (const a = 'abc';)
// - boolean (const a = true;)
// - object (const a = { name: 'abc', age: 1 };)
// - array (const a = [1, 2, 3];)

let items = [
    {
        name: 'Apple',
        price: 2,
    },
    {
        name: 'Banana',
        price: 1,
    },
    {
        name: 'Pineapple',
        price: 3,
    },
    {
        name: 'Kiwi',
        price: 0.5,
    },
    {
        name: 'Orange',
        price: 2,
    },
    {
        name: 'Pear',
        price: 4,
    },
    {
        name: 'Fig',
        price: 5,
    },
    {
        name: 'Plum',
        price: 3,
    },
    {
        name: 'Avocado',
        price: 6,
    },
    {
        name: 'Grapefruit',
        price: 4,
    }
];


function buy(itemName) {
    const formattedName = parseInput(itemName);
    const index = items.findIndex((item) => item.name === formattedName);
    const item = items[index];
    if (!items.includes(item)) {
        console.log(`${formattedName} is not a valid item.`);
        return;
    }
    // string interpolation - `${variable}` (backticks, not single quotes)
    // equivalent of %s in C printf (or %d, %f, etc.)
    console.log(`Buying ${item.name} with price ${item.price}`);

    if (item.price > walletAmount) {
        console.log('Not enough money');
        return;
    }
    else {
        walletAmount -= item.price;
    }
    console.log(`Your new balance is ${walletAmount}`);
}

function add(itemName) {
    const formattedName = parseInput(itemName);
    const index = items.findIndex((item) => item.name === formattedName);
    const item = items[index];
    if (!items.includes(item)) {
        console.log(`${formattedName} is not a valid item.`);
        return;
    }
    cart.push(item);
    console.log(`Added ${item.name} to cart. `)
}

function remove(itemName) {
    const formattedName = parseInput(itemName);
    const itemToRemove = cart.find((item) => item.name === formattedName);
    if (!itemToRemove) {
        console.log(`${formattedName} is not in your cart.`);
        return;
    }
    const removeIndex = cart.indexOf(itemToRemove);
    if (removeIndex >= 0) {
        cart.splice(removeIndex, 1);
        console.log(`Removed ${itemName} from cart.`);
    }
    else {
        console.log(`${itemName} is not in cart.`);
    }
}

function printCart() {
    var cartPrice = 0;
    cart.forEach(element => {
        console.log(element);
        cartPrice += element.price;
    });
    console.log(`The price of your cart is ${cartPrice}`);
}

function availableItems() {
    items.forEach(element => {
        console.log(`${element.name} - ${element.price}`)
    });
}

function buyCart() {
    var cartPrice = 0;
    cart.forEach(element => {
        cartPrice += element.price;
    });
    if (cartPrice > walletAmount) {
        console.log('Not enough money');
        return;
    }
    else {
        cart.forEach(element => {
            buy(element.name);
        });
        while (cart.length > 0) {
            cart.pop();
        }
    }

}





function search(itemName) {
    const formattedName = parseInput(itemName);
    var itemIndex = items.findIndex((item) => item.name === formattedName);
    const item = items[itemIndex];
    console.log(`${item.name} costs ${item.price}`);
}

function help(userInput) {
    if (!userInput || !userInput.trim()) {
        console.log("Available commands are:\nbuy\nadd\nremove\navailable\nprint\nbuyall\nsearch");
        return;
    }
    switch (userInput) {
        case "buy":
            console.log("Function buy allows you to buy the item without putting it in the cart.");
            break;
        case "add":
            console.log("Adds the item to your shopping cart.");
            break;
        case "remove":
            console.log("Removes the item from your shopping cart.");
            break;
        case "available":
            console.log("Prints all the available products with their respective price.");
            break;
        case "print":
            console.log("Prints all the items currently in your shopping cart.");
            break;
        case "buyall":
            console.log("Buys all the items from you shopping cart.");
            break;
        case "search":
            console.log("Searches for the inputed item to find it's respective price");
            break;
        default:
            console.log("You've inputed a wrong command.");
            break;
    }
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function parseInput(input) {
    if (!input) {
        return '';
    }
    const firstChar = input.charAt(0);
    if (firstChar === firstChar.toUpperCase()) {
        return input;
    } else {
        return firstChar.toUpperCase() + input.slice(1);
    }
}

console.log("Store");
rl.prompt();

// (argument) => { body } - arrow function
// higher-order function, equivalent of delegate in C#
// rl.on('line', (line) => { ... }) registers a function to 
// get called when the user enters a line
rl.on('line', (line) => {
    const split = line.split(' '); // 'buy Apple' => ['buy', 'Apple']
    const command = split[0];
    const args = split.slice(1); // Rest of the array. (['Apple'])


    switch (command) {
        case "buy":
            buy(args[0]);
            break;
        case "search":
            search(args[0]);
            break;
        case "remove":
            remove(args[0]);
            break;
        case "add":
            add(args[0]);
            break;
        case "available":
            availableItems();
            break;
        case "print":
            printCart();
            break;
        case "buyall":
            buyCart();
            break;
        case "help":
            help(args[0]);
            return;
        default:
            console.log(`Unknown command: ${command}`);
    }

    rl.prompt();
}).on('close', () => {
    console.log('Exit');
    process.exit(0);
});