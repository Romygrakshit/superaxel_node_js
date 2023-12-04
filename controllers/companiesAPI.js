const mysql = require("mysql");
// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "superaxel",
});

// create Company in database
const createCompany = async (req, res) => {
  const { company } = req.body;

  pool.query(
    "INSERT INTO companies SET ?",
    {
      company,
    },
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/companies/list");
      }
    }
  );
};

const editCompany = async (req, res) => {
  const { company, id } = req.body;

  pool.query(
    "UPDATE companies SET company = ? WHERE id = ?",
    [company, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/companies/list");
      }
    }
  );
};

// Delete Company
const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  pool.query(
    `DELETE FROM companies WHERE id = ${companyId}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/companies/list");
      }
    }
  );
};
// Company List
const listCompany = async (req, res) => {
  pool.query("SELECT * FROM companies", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      res.render("manageCompaniesPage", { companies: results });
    }
  });
};
const addCompanyPage = async (req, res) => {
  res.render("addCompaniesPage.ejs");
};
const editCompanyPage = async (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM companies WHERE id =${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      const company = results[0];
      res.render("editCompaniesPage.ejs", { company });
    }
  });
};
module.exports = {
  createCompany,
  editCompany,
  deleteCompany,
  listCompany,
  addCompanyPage,
  editCompanyPage,
};
