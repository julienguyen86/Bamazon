var inquirer = require('inquirer');
var mysql = require('mysql');


var amountOwed;
var currentDepartment;
var updateSales;

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon_db'
});

//Establish Connection
connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id: ' + connection.threadId)
});

function displayInventory(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		console.log('===============Welcome To Bamazon================');
		console.log('=================Items in Store==================');
		console.log('=================================================');

		
		for(i=0;i<res.length;i++){
			 console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
		}
		console.log('=================================================');
		placeOrder();
		})
}

//Prompts the user to place an order, fulfills the order, and then calls the new order function
function placeOrder(){
	inquirer.prompt([{
		name: "selectId",
		type:"inputs",
		message: "Please enter the ID of the product you wish to purchase.",
		validate: function(value){
			if(isNaN(value) === false) {
				return true;
			} else {
				return "Please enter a valid Product ID"
			}
		}
	},{
		name:"selectQuantity",
		type:"input",
		message: "How many of this product would you like to order?",
		validate: function(value){
			if(isNaN(value) === false) {
				return true;
			}
				return "Please enter a numerical value"
		}
	}]).then(function(answer){
	connection.query("SELECT * FROM products WHERE id = ?", [answer.selectId], function(err, res){
		if(answer.selectQuantity > res[0].stock_quantity){
			console.log("Insufficient Quantity!");
			console.log('This order has been cancelled');
			console.log('');
			newOrder();
		}
		else{
			totalCost = res[0].price * answer.selectQuantity;
			currentDepartment = res[0].department;
			console.log('Your order has been placed!');
			console.log('Total Cost $' + totalCost);
			console.log('');
			//update products table
			connection.query('UPDATE products SET ? Where ?', [{
				stock_quantity: res[0].stock_quantity - answer.selectQuantity
			},{
				id: answer.selectId
			}], function(err, res){});
			//update departments table
			logSaleToDepartment();
			newOrder();
		}
	})

}, function(err, res){})
};

Allows the user to place a new order or end the connection
function newOrder(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      placeOrder();
    } else{
      console.log("See you soon!");
    }
  });
}



//functions to push the sales to the executive table
function logSaleToDepartment(){
	connection.query('SELECT * FROM departments WHERE DepartmentName = ?', [currentDepartment], function(err, res){
		updateSales = res[0].TotalSales + amountOwed;
		updateDepartmentTable();
	})
};

function updateDepartmentTable(){
		connection.query('UPDATE departments SET ? WHERE ?', [{
		TotalSales: updateSales
	},{
		DepartmentName: currentDepartment
	}], function(err, res){});
};
//Call the original function (all other functions are called within this function)
// //======================================================================
displayInventory();
