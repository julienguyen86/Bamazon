#bamazon

### Overview
This application is an Amazon-like storefront with [MySQL](https://www.npmjs.com/package/mysql) & [Node.JS](https://www.npmjs.com/).


### Node.js
Three JavaScript files replicate the basics of a simple ecommerce engine:

- `bamazonCustomer.js`
  -  Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

   ![Giphy](Images/Customerpurchase.gif)

- Once the customer has placed the order, the application check if your store has enough of the product to meet the customer's request. If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

   ![Giphy](Images/CustomerInsuffient.gif)


- `bamazonManager.js` 
 - The manager module lets managers view the list of products, view low inventory, add inventory, and add products.
  - A sample of the menu is below:
    * View Products for Sale 
    ![Giphy](Images/Managerviewproduct.gif)

    * View Low Inventory - inventory count lower than five.
    ![Giphy](Images/ManagerViewLowInventory.gif)

    * Add to Inventory
    ![Giphy](Iamges/ManagerAddInventory.gif)

    * Add New Product
    ![Giphy](Images/ManagerAddProduct.gif)

## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)

### Prerequisites

- Node.js 
- Create a MYSQL database called 'bamazon_db', reference schema.sql



## Authors
**Julie Nguyen** https://github.com/julienguyen86/Bamazon
	
