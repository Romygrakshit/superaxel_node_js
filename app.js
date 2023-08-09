const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mysql = require("mysql");

// handle form data
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware for html form method
app.use(methodOverride("_method"));

const port = process.env.port || 3000;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "superaxel",
});


// Set Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Static Files
app.use(express.static("public"));
// Example for other folders - not required
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/fonts", express.static(__dirname + "public/fonts"));

// Routes
const companies_routes = require("./routes/companiesRoutes");
const cars_routes = require("./routes/carsRoutes");
const sub_admins = require("./routes/subAdminsRoutes");
const garages_routes = require("./routes/garagesRoutes");
const enquires_routes = require("./routes/enquiresRoutes");
const inventory_routes = require("./routes/inventoryRoutes");
const categories_routes = require("./routes/categoriesRoutes");
const products_routes = require("./routes/productsRoutes")

// middleware for routes
app.use("/companies", companies_routes);
app.use("/cars", cars_routes);
app.use("/subadmins", sub_admins);
app.use("/products",products_routes);
app.use("/categories", categories_routes);
app.use("/garages", garages_routes);
app.use("/enquires", enquires_routes);
app.use("/inventory", inventory_routes);

// Route to show the login page
app.get("/login", (req, res) => {
  const logout = req.query.logout === 'true';
  res.render("login",{logout});
});

// Route to handle login form submission
app.post("/login", (req, res) => {
  // Check the provided credentials in the database
  const { username, password } = req.body;

  // Query the database to find the user with the given username and password
  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
  pool.query(sql, [username, password], (err, results) => {
    if (err) {
      console.log(err);
      // Handle any database errors here
      res.redirect("/login?error=1");
      // res.redirect("/cars/list"); // for testing
    } else {
      // Check if any rows were returned from the database query
      // console.log(results);
      if (results.length === 1) {
        // Login successful, redirect to a protected page or dashboard
        res.redirect("/cars/list");
      } else {
        // Login failed, redirect back to the login page with an error message
        res.redirect("/login?error=1");
        // res.redirect("/cars/list"); // for testing
      }
    }
  });
});

// Route to handle logout
app.get("/logout", (req, res) => {
  // Redirect to the login page with a query parameter indicating successful logout
  res.redirect("/login?logout=1");
});


// app.post("/days", (req, res) => {
//   const { name } = req.body;
//   const state = [
//     "Andhra Pradesh",
//     "Arunachal Pradesh",
//     "Assam",
//     "Bihar",
//     "Chhattisgarh",
//     "Goa",
//     "Gujarat",
//     "Haryana",
//     "Himachal Pradesh",
//     "Jammu and Kashmir",
//     "Jharkhand",
//     "Karnataka",
//     "Kerala",
//     "Madhya Pradesh",
//     "Maharashtra",
//     "Manipur",
//     "Meghalaya",
//     "Mizoram",
//     "Nagaland",
//     "Odisha",
//     "Punjab",
//     "Rajasthan",
//     "Sikkim",
//     "Tamil Nadu",
//     "Telangana",
//     "Tripura",
//     "Uttarakhand",
//     "Uttar Pradesh",
//     "West Bengal",
//     "Andaman and Nicobar Islands",
//     "Chandigarh",
//     "Dadra and Nagar Haveli",
//     "Daman and Diu",
//     "Delhi",
//     "Lakshadweep",
//     "Puducherry",
//   ];
//   state.forEach((state) => {
//     pool.query(`INSERT INTO states SET ?`, { state }, (err, results) => {
//       if (err) {
//         console.error(err);
//       }
//     });
//   });
//   res.sendStatus(200);
// });

// Starting server
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`${port} connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
