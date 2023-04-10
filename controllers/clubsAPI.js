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
  database: "partypal",
});

// const postBannerImage = async (req, res) => {};

// Configure multer
const storageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    let uploadPath = "";
    if (file.fieldname === "bannerImage") {
      uploadPath = path.join(__dirname, "../public/img/club/banner");
    } else if (file.fieldname === "galleryImages") {
      uploadPath = path.join(__dirname, "../public/img/club/gallery");
    }
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

const registerClubs = async (req, res, next) => {
  try {
    upload.fields([
      { name: "bannerImage", maxCount: 1 },
      { name: "galleryImages", maxCount: 100 },
    ])(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      const { club_name, address, club_rules, password } = req.body;
      const bannerUrl =
        "/img/club/banner/" + req.files["bannerImage"][0].filename;

      pool.query(
        "INSERT INTO images SET ?",
        { url: bannerUrl },
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const imageUrls = req.files["galleryImages"].map((file) => {
              return "/img/club/gallery/" + file.filename;
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
            insertData(
              club_name,
              address,
              club_rules,
              bannerUrl,
              imageUrls,
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
  club_name,
  address,
  club_rules,
  bannerUrl,
  imageUrls,
  password,
  res
) => {
  pool.query(
    `SELECT * FROM images WHERE url = ?`,
    [bannerUrl],
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
            const banner_image_id = results[0].id;
            let gallery_image_ids = [];
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
                      gallery_image_ids.push(results[0].id);
                      resolve();
                    }
                  }
                );
              });
              promises.push(promise);
            });
            Promise.all(promises)
              .then(() => {
                const gallery_image_id = gallery_image_ids.join(separator);

                pool.query(
                  "INSERT INTO Clubs SET ?",
                  {
                    club_name,
                    password: hash,
                    address,
                    club_rules,
                    banner_image_id,
                    gallery_image_id,
                  },
                  (err, results) => {
                    if (err) {
                      console.error(err);
                      res.sendStatus(500);
                    } else {
                      // Redirect back to the add club page
                      res.redirect("/clubs/add");
                    }
                  }
                );
              })
              .catch((err) => {
                console.error(err);
                res.sendStatus(500);
              });
          }
        });
      }
    }
  );
};

const editClubsData = async (req, res) => {
  const { club_name, address, club_rules, id } = req.body;

  // Update user to database
  pool.query(
    "UPDATE Clubs SET club_name = ?, address = ?, club_rules = ? WHERE id = ?",
    [club_name, address, club_rules, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/clubs/edit/page/" + id);
      }
    }
  );
};

const editClubsImages = async (req, res) => {
  const { club_name, address, club_rules } = req.body;
  const id = req.params.id;

  // Update user to database
  pool.query(
    "UPDATE Clubs SET club_name = ?, banner_image = ?, address = ?, club_rules = ?, other_image = ? WHERE id = ?",
    [club_name, imageData, address, club_rules, otherImageData, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
};

// Delete Clubs
const deleteClubs = async (req, res) => {
  const userid = req.params.id;
  const deleted = 1;
  pool.query(
    `UPDATE Clubs SET deleted = ${deleted} WHERE id = ${userid}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/clubs/list");
      }
    }
  );
};
// Clubs List
const listClubs = async (req, res) => {
  // Fetch data from the "Clubs" table
  pool.query("SELECT * FROM Clubs WHERE deleted = 0", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageClubs.hbs template with the user data
      res.render("manageClubPage", { clubs: results });
    }
  });
};

// Edit User Page
const editClubPage = async (req, res) => {
  const id = req.params.id;
  // Fetch data from the "users" table of particular user
  pool.query(
    `SELECT clubs.id, clubs.club_name, clubs.address, clubs.club_rules, clubs.banner_image_id, clubs.gallery_image_id, images.url
    FROM clubs
    LEFT JOIN images ON clubs.banner_image_id = images.id
    WHERE clubs.id = ${id}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Render the editUserPage.ejs with User data
        console.log(id);
        console.log(results);
        const club = results[0];
        const gallery_image_id = results[0].gallery_image_id;
        const separator = "-";
        let galleryIdResults;
        let galleryUrl = [];

        if (gallery_image_id.includes(separator)) {
          galleryIdResults = gallery_image_id.split(separator);
        } else {
          galleryIdResults = [gallery_image_id];
        }

        // Use Promise.all() to wait for all database queries to complete
        Promise.all(
          galleryIdResults.map((galleryIdResult) => {
            return new Promise((resolve, reject) => {
              pool.query(
                `SELECT * FROM images WHERE id = ?`,
                [galleryIdResult],
                (err, results) => {
                  if (err) {
                    console.error(err);
                    reject(err);
                  } else {
                    galleryUrl.push(results[0]);
                    resolve();
                  }
                }
              );
            });
          })
        )
          .then(() => {
            console.log(galleryUrl);
            res.render("editClubPage", { club, galleryUrl });
            // res.json(results);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error fetching gallery images");
          });
      }
    }
  );
};

const addGalleryImages = (req, res, next) => {
  try {
    upload.fields([{ name: "galleryImages", maxCount: 100 }])(
      req,
      res,
      (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
        }

        const { id } = req.body;
        pool.query(`SELECT * FROM clubs WHERE id = ?`, [id], (err, results) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            let gallery_image_ids = [];
            let promises = [];
            const separator = "-";
            const galleryImageUrls = req.files["galleryImages"].map((file) => {
              return "/img/club/gallery/" + file.filename;
            });
            galleryImageUrls.forEach((imageUrls) => {
              let promise = new Promise((resolve, reject) => {
                pool.query(
                  "INSERT INTO images SET ?",
                  { url: imageUrls },
                  (err, results) => {
                    if (err) {
                      console.error(err);
                    } else {
                      pool.query(
                        `SELECT * FROM images WHERE url = ?`,
                        [imageUrls],
                        (err, results) => {
                          if (err) {
                            console.error(err);
                            reject(err);
                          } else {
                            gallery_image_ids.push(results[0].id);
                            resolve();
                          }
                        }
                      );
                    }
                  }
                );
              });
              promises.push(promise);
            });
            Promise.all(promises).then(() => {
              const galleryImageIds = gallery_image_ids.join(separator);
              console.log(galleryImageIds);
              pool.query(
                `SELECT * FROM clubs WHERE id = ${id}`,
                (err, results) => {
                  if (err) {
                    console.error(err);
                    reject(err);
                  } else {
                    const updatedGalleryId =
                      results[0].gallery_image_id.toString() +
                      "-" +
                      galleryImageIds.toString();
                    console.log(updatedGalleryId);
                    pool.query(
                      "UPDATE Clubs SET gallery_image_id = ? WHERE id = ?",
                      [updatedGalleryId, id],
                      (err, results) => {
                        if (err) {
                          console.error(err);
                          res.sendStatus(500);
                        } else {
                          // Redirect back to the add club page
                          res.redirect("/clubs/edit/page/" + id);
                        }
                      }
                    );
                  }
                }
              );
            });
          }
          // res.json(results);
        });
      }
    );
  } catch (err) {
    // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
};
const updateBannerImage = (req, res, next) => {
  try {
    upload.single("bannerImage")(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      const { url, id } = req.body;
      const bannerUrl = "/img/club/banner/" + req.file.filename;
      const oldBannerurl = url;

      pool.query(
        "UPDATE images SET url = ? WHERE url = ?",
        [bannerUrl, oldBannerurl],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // Redirect back to the add club page
            res.redirect("/clubs/edit/page/" + id);
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
const updateGalleryImage = (req, res, next) => {
  try {
    upload.single("galleryImages")(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      const { url, id } = req.body;
      const galleryUrl = "/img/club/gallery/" + req.file.filename;
      const oldBannerurl = url;

      pool.query(
        "UPDATE images SET url = ? WHERE url = ?",
        [galleryUrl, oldBannerurl],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // Redirect back to the add club page
            res.redirect("/clubs/edit/page/" + id);
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
  const substr = "gallery";

  try {
    console.log("id:", id);
    console.log("url:", url);
    pool.query("SELECT * FROM images WHERE url = ?", [url], (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const galleryIdDelete = results[0].id;
        console.log("id for the image:", galleryIdDelete);
        pool.query(
          "UPDATE images SET url = ? WHERE id = ?",
          [deleteBannerUrl, galleryIdDelete],
          (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              if (url.includes(substr)) {
                console.log("string mai se remove hoga ab");
                pool.query(
                  `SELECT * FROM clubs WHERE id = ${id}`,
                  (err, results) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                    } else {
                      const galleryIdArray =
                        results[0].gallery_image_id.split("-");
                      console.log("old:", galleryIdArray);
                      const index = galleryIdArray.indexOf(
                        galleryIdDelete.toString()
                      );
                      if (index > -1) {
                        galleryIdArray.splice(index, 1);
                      }
                      const separator = "-";
                      const updatedGalleryId = galleryIdArray.join(separator);
                      console.log("new:", updatedGalleryId);

                      pool.query(
                        "UPDATE Clubs SET gallery_image_id = ? WHERE id = ?",
                        [updatedGalleryId, id],
                        (err, results) => {
                          if (err) {
                            console.error(err);
                            res.sendStatus(500);
                          } else {
                            res.redirect("/clubs/edit/page/" + id);
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                res.redirect("/clubs/edit/page/" + id);
              }
            }
          }
        );
      }
    });
  } catch (err) {
    // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
};
// uploadPath = path.join(__dirname, "../public/img/club/gallery");
// Clubs List
const addClubPage = async (req, res) => {
  res.render("addClubPage.ejs");
};

const updateClubPassword = async (req, res, next) => {
  const { password, id } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      pool.query(
        "UPDATE Clubs SET password = ? WHERE id = ?",
        [hash, id],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            res.redirect("/clubs/edit/page/" + id);
          }
        }
      );
    }
  });
};

module.exports = {
  registerClubs,
  editClubsData,
  editClubsImages,
  deleteClubs,
  listClubs,
  addClubPage,
  editClubPage,
  addGalleryImages,
  updateBannerImage,
  updateGalleryImage,
  deleteImage,
  updateClubPassword,
};
