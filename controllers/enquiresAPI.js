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
    const uploadPath = path.join(__dirname, "../public/img/enquires");
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

const newEnquires = async (req, res, next) => {
  try {
    upload.fields([{ name: "enquiryImages", maxCount: 9 }])(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      const status = "pending";
      const {
        garage_id,
        address,
        lat,
        lng,
        company,
        car_name,
        axel,
        offered_price,
      } = req.body;

      const imageUrls = req.files["enquiryImages"].map((file) => {
        return "/img/enquires/" + file.filename;
      });
      imageUrls.forEach((imageUrls) => {
        pool.query(
          "INSERT INTO images SET ?",
          { url: imageUrls },
          (err, results) => {
            if (err) {
              console.error(err);
            } else {
            }
          }
        );
      });
      pool.query(
        `SELECT * FROM companies WHERE company = ?`,
        [company],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            const company_id = results[0].id;
            pool.query(
              `SELECT * FROM cars WHERE car_name = ? AND company_id = ?`,
              [car_name, company_id],
              (err, results) => {
                if (err) {
                  console.error(err);
                } else {
                  const car_id = results[0].id;
                  insertData(
                    garage_id,
                    address,
                    lat,
                    lng,
                    company_id,
                    car_id,
                    axel,
                    offered_price,
                    status,
                    imageUrls,
                    res
                  );
                }
              }
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
  garage_id,
  address,
  lat,
  lng,
  company_id,
  car_id,
  axel,
  offered_price,
  status,
  imageUrls,
  res
) => {
  let image_ids = [];
  let promises = [];
  const separator = "-";
  imageUrls.forEach((imageUrl) => {
    let promise = new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM images WHERE url = ?`,
        [imageUrl],
        (err, results) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            image_ids.push(results[0].id);
            resolve();
          }
        }
      );
    });
    promises.push(promise);
  });
  Promise.all(promises)
    .then(() => {
      const images_id = image_ids.join(separator);

      pool.query(
        "INSERT INTO enquires SET ?",
        {
          garage_id,
          address,
          lat,
          lng,
          company_id,
          car_id,
          axel,
          offered_price,
          status,
          images_id,
        },
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // Redirect back to the add club page
            res.redirect("/enquires/add");
          }
        }
      );
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Clubs List
const listEnquires = async (req, res) => {
  // Fetch data from the "Clubs" table
  pool.query(
    "SELECT * FROM enquires LEFT JOIN delivery_boy ON enquires.delivery_boy = delivery_boy.id LEFT JOIN companies ON enquires.company_id = companies.id LEFT JOIN cars ON enquires.car_id = cars.id",
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Render the manageClubs.hbs template with the user data
        res.render("manageEnquiresPage", { enquires: results });
      }
    }
  );
};

// Edit User Page
const editEnquiryPage = async (req, res) => {
  const id = req.params.id;
  const enquiryId = {
    id: id,
  };
  // Fetch data from the "users" table of particular user
  pool.query(
    `SELECT * FROM enquires LEFT JOIN delivery_boy ON enquires.delivery_boy = delivery_boy.id WHERE enquires.id = ${id}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Render the editUserPage.ejs with User data
        console.log(id);
        console.log(results);

        const enquiry = results[0];
        const company_id = results[0].company_id;
        const car_id = results[0].car_id;
        const images_id = results[0].images_id;
        const separator = "-";
        let imagesIdResults;
        let imagesUrl = [];

        if (images_id.includes(separator)) {
          imagesIdResults = images_id.split(separator);
        } else {
          imagesIdResults = [images_id];
        }

        // Use Promise.all() to wait for all database queries to complete
        Promise.all(
          imagesIdResults.map((imagesIdResult) => {
            return new Promise((resolve, reject) => {
              pool.query(
                `SELECT * FROM images WHERE id = ?`,
                [imagesIdResult],
                (err, results) => {
                  if (err) {
                    console.error(err);
                    reject(err);
                  } else {
                    imagesUrl.push(results[0]);
                    resolve();
                  }
                }
              );
            });
          })
        )

          .then(() => {
            console.log(imagesUrl);
            pool.query(
              `SELECT * FROM companies WHERE id = ${company_id}`,
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  const company = results[0];
                  pool.query(
                    `SELECT * FROM cars WHERE id =${car_id}`,
                    (err, results) => {
                      if (err) {
                        console.error(err);
                        res.sendStatus(500);
                      } else {
                        const car = results[0];
                        pool.query(
                          `SELECT * FROM delivery_boy`,
                          (err, results) => {
                            if (err) {
                              console.error(err);
                              res.sendStatus(500);
                            } else {
                              const boy = results;
                              console.log(enquiryId);
                              // Render the editSubAdminPage.ejs with SubAdmin data
                              console.log(enquiry);
                              res.render("editEnquiryPage.ejs", {
                                enquiry,
                                imagesUrl,
                                car,
                                boy,
                                company,
                                enquiryId,
                              });
                              //  res.json(enquiry, imagesUrl, car, boy, company);
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error fetching gallery images");
          });
      }
    }
  );
};

const addEnquiryPage = async (req, res) => {
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
          pool.query(`SELECT * FROM states`, (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              const states = results;
              // Render the editSubAdminPage.ejs with SubAdmin data

              res.render("addEnquiryPage.ejs", { company, car, states });
            }
          });
        }
      });
    }
  });
};

const updateEnquiry = async (req, res, next) => {
  const { status, offered_price, delivery_boy, id } = req.body;

  // Render the editSubAdminPage.ejs with SubAdmin data
  pool.query(
    "UPDATE enquires SET status = ?, offered_price =?, delivery_boy =? WHERE id = ?",
    [status, offered_price, delivery_boy, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log("result of enquiry", results);
        res.redirect("/enquires/list");
      }
    }
  );
};

module.exports = {
  newEnquires,
  listEnquires,
  editEnquiryPage,
  addEnquiryPage,
  updateEnquiry,
};
