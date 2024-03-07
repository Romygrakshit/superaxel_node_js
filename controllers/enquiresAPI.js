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
  password: "",
  database: "superaxel",
});

const serviceAccount = require('../firebase/serviceAccountKey.json'); 
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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

// Function to send FCM notifications to subadmins
const sendFCMNotifications = async (fcmToken, enquiryDetails) => {
  if (!fcmToken || !enquiryDetails) {
    return ('Missing required fields: fcmToken, enquiryDetails');
  }
  try {
    const message = {
      token:fcmToken,
      notification: {
        title: 'New Enquiry Received',
        body: 'A new enquiry has been raised by a garage'
      },
      data: {
        enquiryDetails: JSON.stringify(enquiryDetails)
      },
    };

    const response = await admin.messaging().send(message);
    console.log('FCM notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending FCM notification:', error);
  }
}

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
        garage_name,
        address,
        lat,
        lng,
        company_id,
        car_id,
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
        `SELECT * FROM garages WHERE garage_name = ?`,
        [garage_name],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            if (results.length === 0) {
              console.error("No garage found with the specified.");
              res.sendStatus(500);
              return;
            }
            const garage_id = results[0].id;
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
            pool.query("SELECT s.fcm_token from subadmins s LEFT JOIN garages g on s.state=g.state where g.id = ?;", [garage_id],
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  const fcmToken = results[0].fcm_token;
                  const enquiryDetails = {
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
                  }
                  sendFCMNotifications(fcmToken, enquiryDetails);
                }
              })
            // Redirect back to the add club page
            res.redirect("/enquires/list");
          }
        }
      );
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const listEnquires = async (req, res) => {
  // Fetch data from the "Clubs" table
  const query = "SELECT e.id, c.company, car.car_name, e.garage_id, e.address, e.lat, e.lng, e.axel, e.offered_price, e.images_id, e.status FROM enquires e LEFT JOIN companies c ON e.company_id = c.id LEFT JOIN cars car ON e.car_id = car.id "
  pool.query(
    query,
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

const editEnquiryPage = async (req, res) => {
  const id = req.params.id;

  pool.query(
    `SELECT e.id,c.company, e.status, g.id AS gid, car.car_name, g.garage_name, g.mobile_number, e.address, e.lat, e.lng, e.axel, offered_price, e.images_id, images.url FROM enquires e LEFT JOIN companies c ON e.company_id = c.id LEFT JOIN cars car ON e.car_id = car.id LEFT JOIN garages g ON e.garage_id = g.id LEFT JOIN images ON e.images_id = images.id WHERE e.id =${id}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const enquiry = results;
        pool.query('SELECT * FROM companies',
          (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              const company = results;
              pool.query('SELECT * FROM states', (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  const states = results;
                  res.render("editEnquiryPage.ejs", { results: enquiry, company, states });
                }
              })

            }
          }
        )
        // Render the manageusers.hbs template with the user data
      }
    }
  );
};

const addEnquiryPage = async (req, res) => {
  try {
    pool.query(`SELECT * FROM garages`, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const garages = results;
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
                    res.render("addEnquiryPage.ejs", {
                      garages,
                      company,
                      car,
                      states,
                    });
                  }
                });
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

const updateEnquiry = async (req, res, next) => {
  const { mobile_number, address, state, company_id, car_id, axel, status, lat, lng, offered_price, id, gid } = req.body;
  // console.log(req.body)
  const companyId = parseInt(company_id);
  const carId = parseInt(car_id);

  if (isNaN(companyId) || isNaN(carId)) {
    pool.query("SELECT id FROM companies WHERE company= ?", [company_id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const company_id = result[0].id;
          pool.query("SELECT id FROM cars WHERE car_name=?", [car_id],
            (err, result) => {
              if (err) {
                console.error(err);
                res.sendStatus(500);
              } else {
                const car_id = result[0].id;
                pool.query("SELECT status FROM enquires where id=?", [id], (err, results) => {
                  if (err) {
                    console.error(err);
                    res.sendStatus(500);
                  }
                  else {
                    const old_status = results[0].status;
                    pool.query(
                      "UPDATE enquires SET address = ?, state = ?, company_id = ?, car_id = ?, axel=?, status=? ,lat=?, lng=?, offered_price = ? WHERE id = ?",
                      [address, state, company_id, car_id, axel, status, lat, lng, offered_price, id],
                      (err, results) => {
                        if (err) {
                          console.error(err);
                          res.sendStatus(500);
                        } else {
                          // console.log("result of enquiry", results);
                          pool.query(
                            "UPDATE garages SET mobile_number=? WHERE id=?",
                            [mobile_number, gid],
                            (err, results) => {
                              if (err) {
                                console.error(err);
                                res.sendStatus(500);
                              } else {
                                pool.query("SELECT S.id FROM enquires E INNER JOIN garages G ON E.garage_id = G.id INNER JOIN subadmins S ON G.state=S.state WHERE G.id=?", [gid], (err, rst) => {
                                  if (err) {
                                    console.error(err);
                                    res.sendStatus(500);
                                  } else {
                                    const subadminId = rst[0].id;
                                    if (status == 'delivered') {
                                      updateInventory(subadminId, car_id, axel, 1);
                                    }
                                    else if (status == 'cancel' && old_status == 'delivered') {
                                      updateInventory(subadminId, car_id, axel, 2);
                                    }
                                    res.redirect("/enquires/list");
                                  }
                                })
                              }
                            }
                          )
                        }
                      }
                    );
                  }
                })
              }
            })
        }
      })
  }
  else {
    pool.query("SELECT status FROM enquires where id=?", [id], (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }
      else {
        const old_status = results[0].status;
        pool.query(
          "UPDATE enquires SET address = ?, state = ?, company_id = ?, car_id = ?, axel=?, status=? ,lat=?, lng=?, offered_price = ? WHERE id = ?",
          [address, state, company_id, car_id, axel, status, lat, lng, offered_price, id],
          (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              // console.log("result of enquiry", results);
              pool.query(
                "UPDATE garages SET mobile_number=? WHERE id=?",
                [mobile_number, gid],
                (err, results) => {
                  if (err) {
                    console.error(err);
                    res.sendStatus(500);
                  } else {
                    pool.query("SELECT S.id FROM enquires E INNER JOIN garages G ON E.garage_id = G.id INNER JOIN subadmins S ON G.state=S.state WHERE G.id=?", [gid], (err, rst) => {
                      if (err) {
                        console.error(err);
                        res.sendStatus(500);
                      } else {
                        const subadminId = rst[0].id;
                        if (status == 'delivered') {
                          updateInventory(subadminId, car_id, axel, 1);
                        }
                        if (status == 'cancel' && old_status == 'delivered') {
                          updateInventory(subadminId, car_id, axel, 2);
                        }
                        res.redirect("/enquires/list");
                      }
                    })
                  }
                }
              )
            }
          }
        );
      }
    })
    // console.log('company_id and car_id are integers:', companyId, carId);
  }
}

const updateInventory = (subadminId, car_id, axel, status_type) => {
  if (axel != 'Both') {
    const inventoryField = axel === 'Right' ? 'right_axel_inventory' : 'left_axel_inventory';
    const updateValue = status_type === 1 ? -1 : 1;

    pool.query(
      `UPDATE inventory SET ${inventoryField} = ${inventoryField} + ? WHERE subadmin_id = ? AND car_id = ?`,
      [updateValue, subadminId, car_id],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          console.log(results);
        }
      }
    );
  } else {
    const right_axel_inventory = status_type === 1 ? -1 : 1;
    const left_axel_inventory = status_type === 1 ? -1 : 1;
    pool.query(
      `UPDATE inventory SET right_axel_inventory = right_axel_inventory + ?, left_axel_inventory = left_axel_inventory + ? WHERE subadmin_id = ? AND car_id = ?`,
      [right_axel_inventory, left_axel_inventory, subadminId, car_id],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          console.log(results);
        }
      }
    );
  }
};


const getCitiesByStateId = (req, res) => {
  const stateId = req.params.stateId;
  pool.query(
    "SELECT * FROM cities WHERE state_id = ?",
    [stateId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json({ cities: results });
      }
    }
  );
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

const deleteEnquiry = async (req, res) => {
  const userid = req.params.id;
  pool.query(
    `DELETE FROM enquires WHERE id = ${userid}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/enquires/list");
      }
    }
  );
};

const updateEnquiryImage = async (req, res) => {
  try {
    upload.single("enquiryImage")(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      const { url, enquiryId } = req.body;
      const imageUrl = "/img/enquires/" + req.file.filename;
      const oldImageUrl = url;

      // Update the image URL in the images table
      pool.query(
        "UPDATE images SET url = ? WHERE url = ?",
        [imageUrl, oldImageUrl],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // Update the images_id field in the enquires table
            pool.query(
              "UPDATE enquires SET images_id = REPLACE(images_id, ?, ?) WHERE images_id LIKE ?",
              [oldImageUrl, imageUrl, `%${oldImageUrl}%`],
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  res.redirect("/enquires/list");
                }
              }
            );
          }
        }
      );
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("error paji", err);
  }
};
// Delete Image for Enquiry
const deleteEnquiryImage = (req, res, next) => {
  const { url, id } = req.body;

  try {
    pool.query(
      "UPDATE images SET url = ? WHERE id = ?",
      [url, id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.redirect("/enquires/list");
        }
      }
    );
  } catch (err) {
    res.sendStatus(500);
    console.log("error paji");
  }
};


module.exports = {
  newEnquires,
  listEnquires,
  editEnquiryPage,
  addEnquiryPage,
  updateEnquiry,
  getCitiesByStateId,
  getCarsByCompanyId,
  deleteEnquiry,
  updateEnquiryImage,
  deleteEnquiryImage,
  sendFCMNotifications,
};
