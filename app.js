const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// handle form data
app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 3000;
//
const mysql = require("mysql");
app.use(bodyParser.json());
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

// middleware for routes
app.use("/companies", companies_routes);
app.use("/cars", cars_routes);
app.use("/subadmins", sub_admins);
app.use("/garages", garages_routes);
app.use("/enquires", enquires_routes);

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
