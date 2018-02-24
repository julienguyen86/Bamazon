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
    selectAction();

});

// Manager selects action they wish to complete
var selectAction = function() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }]).then(function(answer) {

        // Different functions called based on managers selection
        switch (answer.action) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        }
    });
};

// Displays list of all available products
var viewProducts = function() {
    var query = "Select * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        // Lets manager select new action.
        selectAction();
    });
};

// Displays products with low inventory less than five.
var viewLowInventory = function() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        // Lets manager select new action.
        selectAction();
    });
};

// Adds new stock to selected product
var addInventory = function() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        var itemArray = [];
        //pushes each item into an itemArray
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i].product_name);
        }

        inquirer.prompt([{
            type: "list",
            name: "product",
            choices: itemArray,
            message: "Which item would you like to add inventory?"
        }, {
            type: "input",
            name: "qty",
            message: "How much would you like to add?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return "Please enter a numerical value"
            }
        }]).then(function(ans) {
            var currentQty;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === ans.product) {
                    currentQty = res[i].stock_quantity;
                }
            }
            connection.query('UPDATE products SET ? WHERE ?', [
                { stock_quantity: currentQty + parseInt(ans.qty) },
                { product_name: ans.product }
            ], function(err, res) {
                if (err) throw err;
                console.log('The quantity was updated.');
                // Lets manager select new action.
                selectAction();
                viewProducts();
            });
        })
    });
}
// Adds new product to the table
var addProduct = function() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What is the product you would like to add?"
    }, {
        name: "department",
        type: "input",
        message: "What is the department for this product?"
    }, {
        name: "price",
        type: "input",
        message: "What is the price for the product, e.g. 35.00?"
    }, {
        name: "stock",
        type: "input",
        message: "How much stock do you have to start with?"
    }]).then(function(ans) {
        connection.query("INSERT INTO products SET ?", {
            product_name: ans.product,
            department_name: ans.department,
            price: ans.price,
            stock_quantity: ans.stock
        }, function(err, res) {
            if (err) {
                throw err;
            } else {
                console.log("Your product was added successfully!");
                // Lets manager select new action.
                selectAction();
                viewProducts();
            }
        });
    });
};
