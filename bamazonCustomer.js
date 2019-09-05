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
//************** function start() ************
function start() {
    //display "Welcome opening" and inventory on screen for user
  console.log("\n"+"************ WELCOME ************");
  console.log("*    WE ARE OPEN FOR BUSINESS   *");
  console.log("*********************************");
  console.log("\n"+"Please purchase from the following store items:"+"\n");
    // connect to database 
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
      console.log("Item# | "+"     Product Name       |"+"  Price");
      console.log("--------------------------------------");
    // loop through database results, stored in "inventory"
    // for displaying inventory to user
    // **option to convert this next block to function displayInventory(res)
    var inventory = res;
      for (i = 0; i < inventory.length; i++) 
        {console.log(inventory[i].item_id+"  | "+inventory[i].product_name+" | "+inventory[i].price);
        }; 
      console.log("----------------------------------------"+"\n"); 
    // start a ".then" to check inventory
    getOrder();
  });
}
// ************** function getOrder() ************
function getOrder() {
  inquirer
    .prompt([
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
        // console.log checks below:
      // console.log ("item id = "+answer.item); 
      // console.log ("quantity ordered is: "+answer.howMany); 
      connection.query("SELECT * FROM products WHERE?",{item_id:answer.item}, function(err, res) {
        if (err) throw err;
          // check database if enough inventory on hand for order;
        if (res[0].stock_quantity < answer.howMany) {
        console.log("\n"+"*** Sorry. There is not enough in stock to fill your order."+"\n");  
          // send user back to order ** add option to show qty of item selected
        getOrder();
      } else { 
          // display "RECEIPT" with item, qty, & total   
          var newBalance = res[0].stock_quantity - answer.howMany;
          if (answer.howMany > 1) {
            console.log("\n"+"*** CONFIRMATION ***"+"\n");
            console.log("You purchased: "+answer.howMany+" "+res[0].product_name+"s");
            var num = res[0].price * answer.howMany;
            console.log("Total purchase: "+"$ "+num.toFixed(2));  
          } 
          else {
            console.log("\n"+"*** CONFIRMATION ***"+"\n");
            console.log("You  purchased: "+answer.howMany+" "+res[0].product_name);
            var num = res[0].price * answer.howMany;
            console.log("Total purchase: "+"$ "+num.toFixed(2));   
          }  // end inner if-else statment 
          updateInventory(answer, newBalance);      
        }; // end if-else statment 
      });  // end connection.query   
    });  // end .then function
}  // end getOrder function

// ************** function updatedInventory() ************
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
    
    function(err, res) {
      if (err) throw err;
      // console.log("newTotal line 109: "+newTotal);
      console.log("database updated!");
      start();
    }
  );       
      // connection.end();
}
  // );
// }
