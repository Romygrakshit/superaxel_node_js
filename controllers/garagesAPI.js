const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  port: "3308",
  password: "password",
  database: "superaxel",
});

// const postBannerImage = async (req, res) => {};

// Configure multer
const storageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    let uploadPath = "";
    uploadPath = path.join(__dirname, "../public/img/garage/profile");
    callback(null, uploadPath);
    req.uploadPath = uploadPath; // save upload path in request object
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const fileName = uniqueSuffix + extension;
    callback(null, fileName);
  },
});

const upload = multer({ storage: storageEngine });

const registerGarages = async (req, res, next) => {
  try {
    upload.fields([{ name: "profileImage", maxCount: 1 }])(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      const {
        garage_name,
        state,
        city,
        address,
        mobile_number,
        lat,
        lng,
        password,
      } = req.body;
      const profileUrl =
        "/img/garage/profile/" + req.files["profileImage"][0].filename;

      pool.query(
        "INSERT INTO images SET ?",
        { url: profileUrl },
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            insertData(
              garage_name,
              state,
              city,
              address,
              profileUrl,
              mobile_number,
              lat,
              lng,
              password,
              res
            );
          }
        }
      );
    });
  } catch (err) {
    // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
};

const insertData = async (
  garage_name,
  state,
  city,
  address,
  profileUrl,
  mobile_number,
  lat,
  lng,
  password,
  res
) => {
  pool.query(
    `SELECT * FROM images WHERE url = ?`,
    [profileUrl],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const profile_image_id = results[0].id;

            pool.query(
              "INSERT INTO garages SET ?",
              {
                garage_name,
                state,
                city,
                address,
                profile_image_id,
                mobile_number,
                lat,
                lng,
                password: hash,
              },
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  // Redirect back to the add garage page
                  res.redirect("/garages/add");
                }
              }
            );
          }
        });
      }
    }
  );
};

const editGaragesData = async (req, res) => {
  const { garage_name, address, state, city, mobile_number, lat, lng, id } =
    req.body;

  // Update user to database
  pool.query(
    "UPDATE garages SET garage_name = ?, address = ?, state =?, city = ?, mobile_number = ?, lat = ?, lng =? WHERE id = ?",
    [garage_name, address, state, city, mobile_number, lat, lng, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/garages/list");
      }
    }
  );
};

// Delete Garages
const deleteGarages = async (req, res) => {
  const userid = req.params.id;
  const deleted = 1;
  pool.query(
    `UPDATE garages SET deleted = ${deleted} WHERE id = ${userid}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/garages/list");
      }
    }
  );
};
// Garages List
const listGarages = async (req, res) => {
  // Fetch data from the "Garages" table
  pool.query("SELECT * FROM garages WHERE deleted = 0", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageGarages.hbs template with the user data
      res.render("manageGaragePage", { garages: results });
    }
  });
};

// Edit User Page
const editGaragePage = async (req, res) => {
  const id = req.params.id;
  // Fetch data from the "users" table of particular user
  pool.query(
    `SELECT garages.id, garages.garage_name, garages.mobile_number, garages.address, garages.city, garages.state, garages.lat, garages.lng, garages.profile_image_id, images.url
    FROM garages
    LEFT JOIN images ON garages.profile_image_id = images.id
    WHERE garages.id = ${id}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const garage = results[0];
        pool.query(`SELECT * FROM states`, (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const states = results;

            // Render the editSubAdminPage.ejs with SubAdmin data
            res.render("editGaragePage", { garage, states });
          }
        });
        // Render the editUserPage.ejs with User data
        // res.json(results);
      }
    }
  );
};

const updateProfileImage = (req, res, next) => {
  try {
    upload.single("profileImage")(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      const { url, id } = req.body;
      const bannerUrl = "/img/garage/profile/" + req.file.filename;
      const oldProfileurl = url;

      pool.query(
        "UPDATE images SET url = ? WHERE url = ?",
        [bannerUrl, oldProfileurl],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // Redirect back to the add garage page
            res.redirect("/garages/edit/page/" + id);
          }
        }
      );
    });
  } catch (err) {
    // handle error
    res.sendStatus(500);
    console.log("error paji", err);
  }
};

const deleteImage = (req, res, next) => {
  const { url, id } = req.body;
  const deleteBannerUrl = 0;

  try {
    console.log("id:", id);
    console.log("url:", url);
    pool.query(
      "UPDATE images SET url = ? WHERE id = ?",
      [url, id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.redirect("/garages/edit/page/" + id);
        }
      }
    );
  } catch (err) {
    // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
};
// uploadPath = path.join(__dirname, "../public/img/garage/gallery");
// Garages List
const addGaragePage = async (req, res) => {
  pool.query(`SELECT * FROM states`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const states = results;

      // Render the editSubAdminPage.ejs with SubAdmin data

      res.render("addGaragePage.ejs", { states });
    }
  });
};

const updateGaragePassword = async (req, res, next) => {
  const { password, id } = req.body;

  pool.query(
    "UPDATE garages SET password = ? WHERE id = ?",
    [hash, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/garages/edit/page/" + id);
      }
    }
  );
};

module.exports = {
  registerGarages,
  editGaragesData,
  deleteGarages,
  listGarages,
  addGaragePage,
  editGaragePage,
  updateProfileImage,
  deleteImage,
  updateGaragePassword,
};
