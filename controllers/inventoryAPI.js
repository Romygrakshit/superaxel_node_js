const mysql = require("mysql");

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "superaxel",
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
    pool.query(`SELECT * FROM companies`, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const company = results;
        pool.query(`SELECT * FROM subadmins`, (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const subadmins = results;
            // Render the editSubAdminPage.ejs with SubAdmin data
            res.render("addInventoryPage.ejs", { company, subadmins });
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
  const { id, inventory, stock, type } = req.body;
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
      pool.query("SELECT subadmin_id FROM inventory WHERE id= ?", [id],
        (err, results) => {
          if (err) {
            console.error(err)
            res.sendStatus(500);
          } else {
            // console.log(results[0])
            const subadmin_id = results[0].subadmin_id;
            res.redirect(`/inventory/list/${subadmin_id}?_method=PUT`);

          }
        }
      )

    }
  });
};
//Update Inventory Price updateInventoryPrice
const updateInventoryPrice = async (req, res) => {
  const { id, leftAxelPrice, rightAxelPrice } = req.body;
  // Fetch data from the "subadmins" table of particular garage
  pool.query("UPDATE inventory SET left_axel_price = ?, right_axel_price = ? WHERE id = ?", [leftAxelPrice, rightAxelPrice, id], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      pool.query("SELECT subadmin_id FROM inventory WHERE id= ?", [id],
        (err, results) => {
          if (err) {
            console.error(err)
            res.sendStatus(500);
          } else {
            // console.log(results[0])
            const subadmin_id = results[0].subadmin_id;
            res.redirect(`/inventory/list/${subadmin_id}?_method=PUT`);
          }
        }
      )
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

// Disable Inventory
const disableInventory = async (req, res) => {
  const inventoryId = req.params.id;
  pool.query(`UPDATE inventory SET is_disable = NOT(is_disable) WHERE id = ${inventoryId}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else { // Redirect back to the manage garage list
      res.redirect("/inventory/list");
    }
  });
};

// Manage Inventory Page
const listInventoryAdmin = async (req, res) => {
  let { Id } = req.body;
  // console.log("Body:", req.body);

  if (Id == undefined) {
    // console.log("params:", Id);
    Id = req.params.id;
  }
  if (Id == undefined) {
    Id = 27;
  }
  // console.log('id==>'+Id);
  // Fetch data from the "subadmins" table
  pool.query(`SELECT * FROM subadmins WHERE id = ?`, [Id], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const subadmin = results[0];
      // console.log("SUBADMIN:"+subadmin)
      // Render the manageInventoryPage.ejs with Inventory data
      pool.query(`SELECT * FROM subadmins WHERE id != ${Id}`, (err, results) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const subadmins = results;
          pool.query("SELECT inventory.*, inventory.id as in_id, cars.*, companies.* FROM inventory JOIN cars ON inventory.car_id = cars.id LEFT JOIN companies ON cars.company_id = companies.id WHERE NOT(inventory.is_disable) AND inventory.subadmin_id = ?", [Id], (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              const inventory = results;
              // console.log("INVENTORY:"+inventory);
              // console.log("SUBADMINS:"+subadmins);
              // Render the manageInventoryPage.ejs with Inventory data
              res.render("manageInventoryPage", { inventory, subadmin, subadmins });

              // res.json(inventory);
            }
          });
        }
      });
    }
  });
};

const getCarsByCompanyId = (req, res) => {
  const companyId = req.params.companyId;
  pool.query(
    "SELECT * FROM cars WHERE company_id = ?",
    [companyId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json({ cars: results });
      }
    }
  );
};

module.exports = {
  newInventory,
  editInventory,
  disableInventory,
  listInventoryAdmin,
  editInventoryPage,
  addInventoryPage,
  changeInventory,
  updateInventoryPrice,
  getCarsByCompanyId
};
