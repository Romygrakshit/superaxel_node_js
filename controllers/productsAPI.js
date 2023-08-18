const mysql = require("mysql");
// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "superaxel",
});
// create category in database
const createProduct = async (req, res) => {
  try {
    // console.log(req.body)
    const {
      category_name, company_id, car_id, price
    } = req.body;

    pool.query(`SELECT * FROM companies WHERE id = ? LIMIT 0, 25`, [company_id], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        if (results.length === 0) {
          console.error("No car found with the specified name.");
          res.sendStatus(500);
          return;
        }
        const company_name = results[0].company;
        pool.query(`SELECT * FROM cars WHERE id = ?`, [car_id], (err, results) => {
          if (err) {
            console.error(err);
          } else {
            if (results.length === 0) {
              console.error("No subadmin found with the specified name.");
              res.sendStatus(500);
              return;
            }
            const car_name = results[0].car_name;
            insertProduct(category_name,
              company_name,
              car_name,
              price, res);
          }
        });
      }
    });
  } catch (err) { // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
 
};

const insertProduct = async(category_name,
  company_name,
  car_name,
  price,res,)=> {pool.query(
  "INSERT INTO products SET ?",
  {
    category_name,
    company_name,
    car_name,
    price,
  },
  (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // console.log(results);
      res.redirect("/products/list?added=1");
    }
  }
)};
const editProduct = async (req, res) => {
  const { company_id, car_name, price, id } = req.body;

  pool.query(
    "SELECT * FROM companies WHERE companies.id = ?",
    [company_id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        if (results.length === 0) {
          console.error("No company found with the specified name.");
          res.sendStatus(500);
          return;
        }
        const company_name = results[0].company;
        pool.query(
          "UPDATE products SET company_name = ?, car_name = ?, price = ? WHERE id = ?",
          [company_name, car_name, price, id],
          (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              res.redirect("/products/list");
            }
          }
        );
      }
    }
  )
};

// Delete Company
const deleteProduct = async (req, res) => {
  const categoryId = req.params.id;
  pool.query(
    `DELETE FROM products WHERE id = ${categoryId}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/products/list");
      }
    }
  );
};
// Company List
const listProduct = async (req, res) => {
  pool.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      const added = req.query.added === "1";
      res.render("manageProductsPage", { products: results, added });
    }
  });
};

const listProductInventory = async (req, res) => {
  const query = `
  SELECT pi.id, c.company, car.car_name, sa.name, pi.inventory, pi.date
  FROM products_inventory pi
  LEFT JOIN companies c ON pi.company_id = c.id
  LEFT JOIN cars car ON pi.car_id = car.id
  LEFT JOIN subadmins sa ON pi.subadmin_id = sa.id
`;
  pool.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manage users template with the user data
      const added = req.query.added === "1";
      
      res.render("manageProductInventoryPage", { products: results, added });
    }
  });
};

const addProductPage = async (req, res) => {
  try {
    pool.query(`SELECT * FROM categories`, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const category = results;
        pool.query(`SELECT * FROM companies`, (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const company = results;
            pool.query(`SELECT * FROM cars`, (err, results) => {
              if (err) {
                console.error(err);
                res.sendStatus(500);
              } else {
                const car = results;
                // Render the editSubAdminPage.ejs with SubAdmin data
                res.render("addProductsPage.ejs", { category, company, car });
              }
            });
          }
        });
      }
    });
  } catch (err) {
    // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
};

const editProductPage = async (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM products WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const category_name = results[0];
      pool.query(
        'SELECT * FROM companies',
        (err,results) =>{
          if(err){
            console.error(err);
            res.sendStatus(500);
          }else{
            const company = results;

            res.render("editProductsPage.ejs", {category_name, company});
          }
        }
      )
      // Render the editProduct.ejs template with the product data
      // const category_name = results[0];
      
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

const addProductInventoryPage = async (req, res) => {
  const { categoryName,companyName, carName } = req.params;
  // Pass the company_name and car_name to the addProductInventory.ejs template
  pool.query(
    "SELECT * FROM subadmins",
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const subadmin = results;
        pool.query(
          "SELECT * FROM companies WHERE company=?",
          [companyName],(err,results)=>
          {
            if(err){
              console.error(err);
              res.sendStatus(500);
            }else{
              const company_id = results[0].id;
              pool.query(
                "SELECT * FROM cars WHERE car_name=? AND company_id=?",
                [carName,company_id],(err,results)=>
                {
                  if(err){
                    console.error(err);
                    res.sendStatus(500);
                  }else{
                    const car_id = results[0].id;
                    pool.query("SELECT * FROM categories WHERE category_name = ?", [categoryName], (err, results) => {
                      if(err){
                        console.error(err);
                        res.sendStatus(500);
                      }else{
                        const category_id = results[0].id;
                        res.render("addProductInventoryPage.ejs", {category_id, company_id, car_id , subadmin });
                    }})
                  }
                }
              )
            }
          }
        )
      }
    }
  );
  
};

const addProductInventory = async (req, res) => {
  const {  category_id,company_id, car_id, subadmin_id, inventory } = req.body;

  pool.query(
    "INSERT INTO products_inventory SET ?",
    {
      category_id,
      company_id,
      car_id,
      subadmin_id,
      inventory,
    },
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // console.log(results);
        res.redirect("/products/inventory/list?added=1");
      }
    }
  );
};


module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  listProduct,
  addProductPage,
  editProductPage,
  getCarsByCompanyId,
  addProductInventoryPage,
  addProductInventory,
  listProductInventory,
};

