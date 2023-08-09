const mysql = require("mysql");

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "superaxel"
});


const newInventory = async (req, res) => {
  try {
    // console.log(req.body)
    const {
      car_name,
      left_axel_price,
      left_axel_inventory,
      right_axel_price,
      right_axel_inventory,
      subadmin_name
    } = req.body;

    pool.query(`SELECT * FROM cars WHERE car_name = ? LIMIT 0, 25`, [car_name], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        if (results.length === 0) {
          console.error("No car found with the specified name.");
          res.sendStatus(500);
          return;
        }
        const car_id = results[0].id;
        pool.query(`SELECT * FROM subadmins WHERE name = ?`, [subadmin_name], (err, results) => {
          if (err) {
            console.error(err);
          } else {
            if (results.length === 0) {
              console.error("No subadmin found with the specified name.");
              res.sendStatus(500);
              return;
            }
            const subadmin_id = results[0].id;
            insertData(car_id, left_axel_price, 
              left_axel_inventory, right_axel_price, right_axel_inventory, subadmin_id, res);
          }
        });
      }
    });
  } catch (err) { // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
};

const insertData = async (car_id,
   left_axel_price, left_axel_inventory, right_axel_price, right_axel_inventory, subadmin_id, res) => {
  pool.query("INSERT INTO inventory SET ?", {
    car_id,
    left_axel_price,
    left_axel_inventory,
    right_axel_price,
    right_axel_inventory,
    subadmin_id
  }, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else { // Redirect back to the add club page

      res.redirect("/inventory/list");
    }
  })
};
// Add Inventory Page
const addInventoryPage = async (req, res) => {
  try {
    pool.query(`SELECT * FROM cars`, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const car = results;
        pool.query(`SELECT * FROM subadmins`, (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const subadmins = results;
            // Render the editSubAdminPage.ejs with SubAdmin data
            res.render("addInventoryPage.ejs", {car, subadmins});
          }
        });
      }
    });
  } catch (err) { // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
};

// Edit Inventory
const editInventoryPage = async (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM inventory LEFT JOIN cars ON inventory.car_id = cars.id LEFT JOIN companies ON cars.company_id = companies.id WHERE inventory.id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const inventory = results[0];

      res.json(inventory);
    }
  });
  // pool.query(
  // "UPDATE inventory SET  left_axel_price = ?, left_axel_inventory = ?, right_axel_price = ?, right_axel_inventory = ? WHERE id = ?",
  // [
  //     left_axel_price,
  //     left_axel_inventory,
  //     right_axel_price,
  //     right_axel_inventory,
  //     id,
  // ],
  // (err, results) => {
  //     if (err) {
  //       console.error(err);
  //       res.sendStatus(500);
  //     } else {
  //       // Redirect back to the manage garage list

  //       res.redirect("/subadmins/list");
  //     }
  // }
  // );
};
const changeInventory = async (req, res) => {
  const {id, inventory, stock, type} = req.body;
  let query;
  if (inventory == "Left Axel") {
    query = "UPDATE inventory SET left_axel_inventory = left_axel_inventory + ? WHERE id = ?";
  } else {
    query = "UPDATE inventory SET right_axel_inventory = right_axel_inventory + ? WHERE id = ?";
  }
  const values = [
    type === "Add" ? stock : -stock,
    id
  ];
  // Fetch data from the "subadmins" table of particular garage
  pool.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect("/inventory/list/" + id);
    }
  });
};
// Edit Inventory Page
const editInventory = async (req, res) => {
  const {
    id,
    left_axel_price,
    left_axel_inventory,
    right_axel_price,
    right_axel_inventory
  } = req.body;
  // Fetch data from the "subadmins" table of particular garage
  pool.query("UPDATE inventory SET left_axel_price = ?, left_axel_inventory = ?,right_axel_price ?, right_axel_inventory ? WHERE id = ?", [
    id,
    left_axel_price,
    left_axel_inventory,
    right_axel_price,
    right_axel_inventory,
  ], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect("");
    }
  });
};

// Delete Inventory
const deleteInventory = async (req, res) => {
  const subAdminId = req.params.id;
  const deleted = 1;
  pool.query(`UPDATE subadmins SET deleted = ${deleted} WHERE id = ${subAdminId}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else { // Redirect back to the manage garage list
      res.redirect("/subadmins/list");
    }
  });
};

// Manage Inventory Page
const listInventoryAdmin = async (req, res) => {
  let {Id} = req.body;
  // console.log("Body:", Id);

  if (Id == undefined) {
    // console.log("params:", Id);
    Id = req.params.id;
  }
  if (Id == undefined) {
    Id = 1;
  }
  // console.log(Id);
  // Fetch data from the "subadmins" table
  pool.query(`SELECT * FROM subadmins WHERE id = ?`, [Id], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const subadmin = results[0];
      // console.log(subadmin)
      // Render the manageInventoryPage.ejs with Inventory data
      pool.query(`SELECT * FROM subadmins WHERE id != ${Id}`, (err, results) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const subadmins = results;
          pool.query("SELECT inventory.*, inventory.id as in_id, cars.*, companies.* FROM inventory JOIN cars ON inventory.car_id = cars.id LEFT JOIN companies ON cars.company_id = companies.id WHERE inventory.subadmin_id = ?", [Id], (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              const inventory = results;
              // console.log(inventory);
              // console.log(subadmins);
              // Render the manageInventoryPage.ejs with Inventory data
              res.render("manageInventoryPage", {inventory, subadmin, subadmins});
              // res.json(inventory);
            }
          });
        }
      });
    }
  });
};

module.exports = {
  newInventory,
  editInventory,
  deleteInventory,
  listInventoryAdmin,
  editInventoryPage,
  addInventoryPage,
  changeInventory
};
