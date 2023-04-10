const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const methodOverride = require("method-override");
const port = process.env.port || 3000;

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

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for html form method
app.use(methodOverride("_method"));
// handle form data
app.use(express.urlencoded({ extended: true }));

// Routes
const categories_routes = require("./routes/categoriesRoutes");
const sub_categories_routes = require("./routes/subCategoriesRoutes");
const users_routes = require("./routes/usersRoutes");
const clubs_routes = require("./routes/clubsRoutes");
const events_routes = require("./routes/eventsRoutes");
const tickets_routes = require("./routes/ticketsRoutes");

// middleware for routes
app.use("/categories", categories_routes);
app.use("/sub/categories", sub_categories_routes);
app.use("/users", users_routes);
app.use("/clubs", clubs_routes);
app.use("/events", events_routes);
app.use("/tickets", tickets_routes);

// app.post("/days", (req, res) => {
//   const { day_name } = req.body;
//   pool.query(
//     "INSERT INTO days SET ?",
//     {
//       day_name,
//     },
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         res.sendStatus(500);
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
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
