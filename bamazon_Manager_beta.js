var mysql = require("mysql");
var inquirer = require("inquirer");
var newTotal = 0;

var connection = mysql.createConnection({
  host: "localhost",
    // Port being used 
  port: 3306,
    // My username
  user: "root",
    // My password and database name 
  password: "Birdie88!",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
    // call function start() to begin program
  start();
});
//  1) function start() ************
function start() {
    //display "Welcome opening" and inventory on screen for user
  console.log("\n"+"************ WELCOME ************");
  console.log("*    WE ARE OPEN FOR BUSINESS   *");
  console.log("*********************************");
  console.log("\n"+"Please select from the following options:"+"\n");
    // connect to database 
//   getOrder();
  inquirer
    .prompt({ 
      name: "selection",
      type: "list",
      message: "***** MAIN MENU *****",
      choices: ["View Products for Sale", "View Low Inventory",
                "Add to Inventory", "Add New Product to Inventory", "Exit"] 
    })
    .then(function(answer){
      switch(answer.selection) {
        case "View Products for Sale":
          getOrder(); 
          break;
        case "View Low Inventory":
          lowInventory();
        break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product to Inventory":
          addNewProduct();
          break;
        case "Exit":
          console.log("Good bye");
        break;
      }
    });
}
// **** 2) function getOrder() ************
function getOrder() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("Item# | "+"     Product Name       |"+"  Price");
    console.log("--------------------------------------"); 
    inquirer
    .prompt([
    {  
      name: "choice",
      type: "rawlist",
      choices: function() {
        var displayArray = [];
        for (var i=0; i < res.length; i++) {
          displayArray.push(res[i].item_id +" | "+ res[i].product_name +"   "+ res[i].price.toFixed(2));   
        }
        return displayArray;
      },
    },
    {
      name: "item",
      type: "input",
      message: "Please enter the Item# of the item you'd like to purchase."
    },
    {
      name: "howMany",
      type: "input",
      message: "Next, enter how many would you like to purchase."
    }
    ])  // end .prompt - getOrder()
    .then(function(answer) {
      connection.query("SELECT * FROM products WHERE?",{item_id:answer.item}, function(err, res) {
        if (err) throw err;
          // check database if enough inventory on hand for order;
        if (res[0].stock_quantity < answer.howMany) {
        console.log("\n"+"*** Sorry. There is not enough in stock to fill your order."+"\n");  
          // send user back to order ** add option to show qty of item selected
        getOrder();
        } else { // complete order and
          // display "RECEIPT" with item, qty, & total   
          var newBalance = res[0].stock_quantity - answer.howMany;
            // this checks if more than one item purchased to add "'s"  
          if (answer.howMany > 1) {
            console.log("\n"+"****** CONFIRMATION ******"+"\n");
            console.log("You purchased: "+answer.howMany+" "+res[0].product_name+"s");
            var num = res[0].price * answer.howMany;
            console.log("Total purchase: "+"$ "+num.toFixed(2));  
          } 
          else {
            console.log("\n"+"****** CONFIRMATION ******"+"\n");
            console.log("You  purchased: "+answer.howMany+" "+res[0].product_name);
            var num = res[0].price * answer.howMany;
            console.log("Total purchase: "+"$ "+num.toFixed(2));   
          }  // end inner if-else statment
            // call update function to change database table 
          updateInventory(answer, newBalance);      
        }; // end if-else statment 
      });  // end connection.query   
    });  // end .then function
  });  // end connection.query
}  // end getOrder function

// **** 3) function updatedInventory() ************
// takes in answer and newBalance from getOrder
// connect to db to update new qty - from getOrder()
function updateInventory(answer, newBalance) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newBalance
      },
      {
        item_id : answer.item
      }
    ],   
    function(err) {
      if (err) throw err;
      // console.log("\n"+"------------------------");
        // console.log("Continue Shopping? (Y/N)");
        // send user back to main screen
       // connection.end(); 
      //  console.log("newBalance = "+newBalance);
       console.log("*** database updated ***");
      start();
    }
  );  // end connection.query
  // start();
}  // end function updatedInventory()

// **** 4) function lowInventory() ********
//
function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 10",    
  function(error, res) {
  if (error) throw err;
    console.log("\n"+"Product with less than 10 units in inventory");
    console.log("*********************************************"); 
    console.log("Item# | "+"   Product Name        |"+"  Qty");
    console.log("--------------------------------------");
    var inventory = res;
    for (i = 0; i < inventory.length; i++) 
      {
        console.log(inventory[i].item_id+"  | "+inventory[i].product_name+" | "+inventory[i].stock_quantity);
      }; 
    console.log("--------------------------------------"); 
    start(); 
  });  // end connection.query
}  // end lowInventory()

// **** 5) addInventory function ******
function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
      
      console.log(" "+" Item# | "+"     Product Name       |"+"  Price");
      console.log("--------------------------------------");
    // prompt for product/item_id to add
  inquirer
    .prompt([
    {  
      name: "Item#",
      type: "rawlist",
      choices: function() {
        var displayArray = [];
        for (var i=0; i < res.length; i++) {
          displayArray.push(res[i].item_id +" | "+ res[i].product_name +"   "+ res[i].price.toFixed(2));   
        }
        return displayArray;
      },
    },
    {
      name: "id",
      type: "input",
      message: "What is the item ID# of the product to add to inventory?" 
    },
    {
      name: "qty",
      type: "input",
      message: "How many are you adding to inventory?",
      validate: function(value) {
        if (isNaN(value) === false) {
          // console.log("Line 190");  
        return true;         
        }
        return false;
      }   
    }
  ])  // end .prompt
  .then(function(answer) {
      // connection.query
      // console.log("res = "+res[2].product_name);
      var newBalance;
        // console.log("res item_id = "+res[0].item_id);
      for (var i = 0; i < res.length; i++) {   
        if (res[i].item_id == answer.id) {
          console.log("\n"+"****** "+res[i].product_name+" ******");
          newBalance = res[i].stock_quantity + parseInt(answer.qty);
          console.log("\n"+"You added "+answer.qty+" "+res[i].product_name+"s");
          console.log("Total Inventory: "+newBalance);
        }
      }  
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newBalance
          },
          {
            item_id : answer.id
          }
        ],   
        function(err, results) {
          if (err) throw err;
          start();
        }  // end function(err)
      );  // end connection.query  
    });  // end .then 
  });  // end connection.query  
}
// **** 6) addNewProduct function ******
function addNewProduct() {
  console.log("\n"+"Categories are: Electronics / Sports / Fashion"+"\n");
  inquirer
  .prompt([
    {
      name: "item",
      type: "input",
      message: "Enter product name you are adding to the inventory"
    },
    {
      name: "itemNumber",
      type: "input",
      message: "Enter the Item# (or SKU#) of your product."
    },
    {
      name: "category",
      type: "input",
      message: "What category does your product belong to?"
    },
    {
      name: "qty",
      type: "input",
      message: "How many are you putting into inventory?"
    },
    {
      name: "price",
      type: "input",
      message: "What is the selling price?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
          return false;
      }
    }    
  ])
  .then(function(answer) {
    connection.query (
      "INSERT INTO products SET ?",
      {
        item_id: answer.itemNumber,
        product_name: answer.item,
        department_name: answer.category,
        price: answer.price,
        stock_quantity: answer.qty
      },
      function(err) {
        if (err) throw err;
        console.log("\n"+"Your product was added to the inventory.");
        start();
      }
    );  // end connection.query
  });  // end .then function
}  // end addNewProduct function

