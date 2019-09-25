# Welcome to Bamazon

Shop the Bamazon store, browse the products For Sale as a Customer.
Or as a Manager check your inventory and add current or new products to inventory.
Also as a Manager or Owner, view your total sales by department and create new departments.


## Built With
* Javascript
* MySQL
* MySQL Workbench for database "bamazon"
* node.js
* npm install packages
  1. mysql
  2. inquire  
* github for repository

## functions used
**_start()_**   
  Displays "Welcome - Open for Business" banner.  
  Then Prompt user to select from Main Menu.  THE CHOICES ARE:  
     1. __View Products For Sale__  
     2. __View Low Inventory__  
     3. __Add to Inventory__  
     4. __Add New Product to Inventory__  
     5. __Exit__  

**_getOrder()_**  
  Displays a list of the products for sale in the inventory.  
  Then prompts user for:  
    1. __Enter Item# of item to purchase.__   
    2. __Enter quantity to purchase.__  

  Checks "bamazon database" for enough product in stock to fulfull the request
  Fulfill the order and display a confirmation "receipt" for the user.
  Then calls *function __updateInventory()__*

**_updateInventory()_**  
  Update the database using Item# of product and quantity purchased.  
   -Then call *function __start()__* to return to Main Menu display.

**_lowInventory()_**  
  Per instructions, any product of less than 5 units in inventory is displayed.  
   -Then call *function __start()__* to return to Main Menu display.

**_addInventory()_**  
  Displays the current inventory and prompts user to select (using arrow keys) which specific product to add.  
NOTE: This is to add more stock of an existing product item.  
Prompt user for Item# and quantity to add. Similar to __getOrder().__  
Then add quantity into database and provide a receipt of item(s) added, how many and new current total.  
-Then call *function __start()__* to return to Main Menu display.

**_addNewProduct()_**  
NOTE: This is to add a completly new product item to the database.  
Prompt user to add the following:
  1. __Product Name__
  2. __Item# (or SKU#)__
  3. __Category__
    NOTE: We list the current *categories* available for user.
    (Electronics, Sports, Fashion)
  4. __Quantity__
  5. __Sell Price__

Then update bamazon database with new product using data elements from user.  
-Then call *function __start()__* to return to Main Menu display.

## ************************************************************* ##
## Demo of Ap (using TinyTake) ##

[link to bamanzonManager demo!] 
(https://ttprivatenew.s3.amazonaws.com/pulse/mjnorato-aol/attachments/11557841/TinyTake25-09-2019-03-50-51.mp4)



[GitHub Logo!](/images/logo.png)
<!-- Format: ![Alt Text](url) -->

Contains MySQL homework command-line ap
Using node application that incorporates Javascript and MySQL:
 