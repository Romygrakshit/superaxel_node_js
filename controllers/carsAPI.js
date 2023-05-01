const mysql = require("mysql");
// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "superaxel",
});
// create category in database
const createCars = async (req, res) => {
  const {
    car_name,
    company,
    left_axel_price,
    right_axel_price,
    left_inventory,
    right_inventory,
  } = req.body;
  pool.query(
    "SELECT * FROM companies WHERE company = ?",
    [company],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Render the manageusers.hbs template with the user data
        const company_id = results[0].id;
        pool.query(
          "INSERT INTO cars SET ?",
          {
            car_name,
            company_id,
            left_axel_price,
            right_axel_price,
            left_inventory,
            right_inventory,
          },
          (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              res.redirect("/cars/list");
            }
          }
        );
      }
    }
  );
};

const updateInventory = async (req, res) => {
  const { left_inventory, right_inventory, id } = req.body;
  // Update category to database
  pool.query(
    "UPDATE cars SET left_inventory = ?, right_inventory = ? WHERE id = ?",
    [left_inventory, right_inventory, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/cars/list");
      }
    }
  );
};

const editCars = async (req, res) => {
  const { car_name, company, left_axel_price, right_axel_price, id } = req.body;

  // Update category to database
  pool.query(
    "SELECT * FROM companies WHERE company = ?",
    [company],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Render the manageusers.hbs template with the user data
        const company_id = results[0].id;
        pool.query(
          "UPDATE cars SET car_name = ?, company_id = ?, left_axel_price = ?,right_axel_price = ? WHERE id = ?",
          [car_name, company_id, left_axel_price, right_axel_price, id],
          (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              res.redirect("/cars/list");
            }
          }
        );
      }
    }
  );
};

// Delete category
const deleteCars = async (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM cars WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect("/cars/list");
    }
  });
};
// category List
const listCars = async (req, res) => {
  pool.query(
    "SELECT cars.id as car_id, car_name, company_id, deleted, companies.id as company_id, company FROM cars INNER JOIN companies ON cars.company_id = companies.id",
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Render the manageusers.hbs template with the user data
        console.log(results);
        res.render("manageCarsPage", { cars: results });
      }
    }
  );
};
const addCarsPage = async (req, res) => {
  pool.query(`SELECT * FROM companies`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const company = results;
      res.render("addCarsPage.ejs", { company });
    }
  });
};
const editCarsPage = async (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT cars.id as car_id, car_name, company_id, deleted, companies.id as company_id, company FROM cars INNER JOIN companies ON cars.company_id = companies.id WHERE cars.id =${id}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const car = results[0];
        pool.query(`SELECT * FROM companies`, (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const company = results;

            console.log(car);
            res.render("editCarsPage.ejs", { car, company });
          }
        });
        // Render the manageusers.hbs template with the user data
      }
    }
  );
};
module.exports = {
  createCars,
  editCars,
  deleteCars,
  listCars,
  editCarsPage,
  addCarsPage,
  updateInventory,
};
