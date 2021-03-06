var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require("console.table");


// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
});

// Connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
    displayInventory()
});

// Display Inventory Table
function displayInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log('===============Welcome To Bamazon================');
        console.log('=================Items in Store==================');
        console.log('=================================================');
        console.table(res);
        console.log('=================================================');
        placeOrder();
    })
}

//Prompts the user to place an order
function placeOrder() {
    inquirer.prompt([{
        name: "selectId",
        type: "inputs",
        message: "Please enter the ID of the product you wish to purchase.",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                return "Please enter a valid Product ID"
            }
        }
    }, {
        name: "selectQuantity",
        type: "input",
        message: "How many of this product would you like to order?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return "Please enter a numerical value"
        }
    }]).then(function(answer) {
        // If there is not enough quantity to complete the purchase
        connection.query("SELECT * FROM products WHERE id = ?", [answer.selectId], function(err, res) {
            if (answer.selectQuantity > res[0].stock_quantity) {
                console.log("Insufficient Quantity!");
                console.log('This order has been cancelled');
                console.log('');
            } else {
                // Total cost of the item * quantity purchased
                totalCost = res[0].price * answer.selectQuantity;
                currentDepartment = res[0].department;
                console.log('Your order has been placed!');
                console.log('Total Cost $' + totalCost);
                console.log('');
                //update products table
                connection.query('UPDATE products SET ? Where ?', [{
                    stock_quantity: res[0].stock_quantity - answer.selectQuantity
                }, {
                    id: answer.selectId
                }], function(err, res) {});
                displayInventory();
            }
        })

    }, function(err, res) {})
};