const mysql = require("mysql");

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  port: "3308",
  password: "password",
  database: "superaxel",
});

// Register Inventory
const addInventory = async (req, res) => {
  const {
    car_id,
    left_axel_price,
    left_axel_inventory,
    right_axel_price,
    right_axel_inventory,
    subadmin_id,
  } = req.body;

  pool.query(
    "INSERT INTO inventory SET ?",
    {
      car_id,
      left_axel_price,
      left_axel_inventory,
      right_axel_price,
      right_axel_inventory,
      subadmin_id,
    },
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Redirect back to the manage garage list
        res.sendStatus(200);

        // res.redirect("/inventory/list");
      }
    }
  );
};
// Add Inventory Page
const addInventoryPage = async (req, res) => {
  pool.query(`SELECT * FROM cars WHERE id = ? `, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const cars = results;
      pool.query(`SELECT * FROM subadmins WHERE id = ?`, (err, results) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const subadmins = results;

          res.render("addInventoryPage", { cars, subadmins });
        }
      });
    }
  });
};

// Edit Inventory
const editInventoryPage = async (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * FROM inventory LEFT JOIN cars ON inventory.car_id = cars.id LEFT JOIN companies ON cars.company_id = companies.id WHERE inventory.id = ${id}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const inventory = results[0];

        res.json(inventory);
      }
    }
  );
  // pool.query(
  //   "UPDATE inventory SET  left_axel_price = ?, left_axel_inventory = ?, right_axel_price = ?, right_axel_inventory = ? WHERE id = ?",
  //   [
  //     left_axel_price,
  //     left_axel_inventory,
  //     right_axel_price,
  //     right_axel_inventory,
  //     id,
  //   ],
  //   (err, results) => {
  //     if (err) {
  //       console.error(err);
  //       res.sendStatus(500);
  //     } else {
  //       // Redirect back to the manage garage list

  //       res.redirect("/subadmins/list");
  //     }
  //   }
  // );
};
const changeInventory = async (req, res) => {
  const { id, inventory, stock, type } = req.body;
  let query;
  if (inventory == "Left Axel") {
    query =
      "UPDATE inventory SET left_axel_inventory = left_axel_inventory + ? WHERE id = ?";
  } else {
    query =
      "UPDATE inventory SET right_axel_inventory = right_axel_inventory + ? WHERE id = ?";
  }
  const values = [type === "Add" ? stock : -stock, id];
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
    right_axel_inventory,
  } = req.body;
  // Fetch data from the "subadmins" table of particular garage
  pool.query(
    "UPDATE inventory SET left_axel_price = ?, left_axel_inventory = ?,right_axel_price ?, right_axel_inventory ? WHERE id = ?",
    [
      id,
      left_axel_price,
      left_axel_inventory,
      right_axel_price,
      right_axel_inventory,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("");
      }
    }
  );
};

// Delete Inventory
const deleteInventory = async (req, res) => {
  const subAdminId = req.params.id;
  const deleted = 1;
  pool.query(
    `UPDATE subadmins SET deleted = ${deleted} WHERE id = ${subAdminId}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Redirect back to the manage garage list
        res.redirect("/subadmins/list");
      }
    }
  );
};

// Manage Inventory Page
const listInventoryAdmin = async (req, res) => {
  let { Id } = req.body;
  console.log("Body:", Id);

  if (Id == undefined) {
    console.log("params:", Id);
    Id = req.params.id;
  }
  if (Id == undefined) {
    Id = 1;
  }
  console.log(Id);
  // Fetch data from the "subadmins" table
  pool.query(`SELECT * FROM subadmins WHERE id = ?`, [Id], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const subadmin = results[0];
      // Render the manageInventoryPage.ejs with Inventory data
      pool.query(
        `SELECT * FROM subadmins WHERE id != ${Id}`,
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const subadmins = results;
            pool.query(
              "SELECT inventory.*, inventory.id as in_id, cars.*, companies.* FROM inventory JOIN cars ON inventory.car_id = cars.id LEFT JOIN companies ON cars.company_id = companies.id WHERE inventory.id = ?",
              [Id],
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  const inventory = results;
                  console.log(subadmin);
                  console.log(subadmins);
                  // Render the manageInventoryPage.ejs with Inventory data
                  res.render("manageInventoryPage", {
                    inventory,
                    subadmin,
                    subadmins,
                  });
                  // res.json(inventory);
                }
              }
            );
          }
        }
      );
    }
  });
};

module.exports = {
  addInventory,
  editInventory,
  deleteInventory,
  listInventoryAdmin,
  editInventoryPage,
  addInventoryPage,
  changeInventory,
};
