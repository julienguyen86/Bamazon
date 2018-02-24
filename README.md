#bamazon

### Overview
This application is an Amazon-like storefront with MySQL. The application takes in orders from customers and deplete stock from the store's inventory as well as let managers view and update their stock.

### Node.js
Three JavaScript files replicate the basics of a simple ecommerce engine:

### #1: Customer View
- `bamazonCustomer.js`
  -  Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

   ![Giphy](Images/Customerpurchase.gif)

- Once the customer has placed the order, the application check if your store has enough of the product to meet the customer's request. If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

   ![Giphy](Images/CustomerInsuffient.gif)

### #2: Manager View
- `bamazonManager.js` 
 - The manager module lets managers view the list of products, view low inventory, add inventory, and add products.
  - A sample of the menu is below:
    * View Products for Sale 
    
    ![Giphy](Images/Managerviewproduct.gif)

    * View Low Inventory - inventory count lower than five.
    
    ![Giphy](Images/ManagerViewLowInventory.gif)

    * Add to Inventory
    
    ![Giphy](Images/ManagerAddInventory.gif)

    * Add New Product
    
    ![Giphy](Images/ManagerAddProduct.gif)

## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)
- Console.table Package (https://www.npmjs.com/package/console.table)

### Prerequisites

- Node.js 
- Create a MYSQL database called 'bamazon_db', reference schema.sql



## Authors
**Julie Nguyen** https://github.com/julienguyen86/Bamazon
	
