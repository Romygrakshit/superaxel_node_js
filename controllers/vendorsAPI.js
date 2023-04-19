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
      uploadPath = path.join(__dirname, "../public/img/vendors/banner");
    } else if (file.fieldname === "galleryImages") {
      uploadPath = path.join(__dirname, "../public/img/vendors/gallery");
    } else if (file.fieldname === "hostImage") {
      uploadPath = path.join(__dirname, "../public/img/vendors/hostImage");
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

const registerVendors = async (req, res, next) => {
  try {
    upload.fields([
      { name: "bannerImage", maxCount: 1 },
      { name: "hostImage", maxCount: 1 },
      { name: "galleryImages", maxCount: 100 },
    ])(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      const {
        name,
        address,
        capacity,
        charges,
        charges_type,
        check_in,
        check_out,
        lat,
        lng,
        host_name,
        house_rules,
        tnc,
        password,
      } = req.body;
      const bannerUrl =
        "/img/vendors/banner/" + req.files["bannerImage"][0].filename;
      const hostImageUrl =
        "/img/vendors/hostImage/" + req.files["bannerImage"][0].filename;
      pool.query(
        "INSERT INTO images SET ?",
        { url: hostImageUrl },
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            pool.query(
              "INSERT INTO images SET ?",
              { url: bannerUrl },
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  const imageUrls = req.files["galleryImages"].map((file) => {
                    return "/img/vendors/gallery/" + file.filename;
                  });
                  imageUrls.forEach((imageUrls) => {
                    pool.query(
                      "INSERT INTO images SET ?",
                      { url: imageUrls },
                      (err, results) => {
                        if (err) {
                          console.error(err);
                        }
                      }
                    );
                  });
                  insertData(
                    name,
                    address,
                    capacity,
                    charges,
                    charges_type,
                    check_in,
                    check_out,
                    lat,
                    lng,
                    host_name,
                    house_rules,
                    tnc,
                    password,
                    bannerUrl,
                    hostImageUrl,
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
  name,
  address,
  capacity,
  charges,
  charges_type,
  check_in,
  check_out,
  lat,
  lng,
  host_name,
  house_rules,
  tnc,
  password,
  bannerUrl,
  hostImageUrl,
  imageUrls,
  res
) => {
  pool.query(
    `SELECT * FROM images WHERE url = ?`,
    [hostImageUrl],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const host_image_id = results[0].id;
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
                  const banner_id = results[0].id;
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
                      const gallery_id = gallery_image_ids.join(separator);

                      pool.query(
                        "INSERT INTO vendors SET ?",
                        {
                          name,
                          address,
                          capacity,
                          charges,
                          charges_type,
                          check_in,
                          check_out,
                          lat,
                          lng,
                          host_name,
                          house_rules,
                          tnc,
                          password: hash,
                          host_image_id,
                          banner_id,
                          gallery_id,
                        },
                        (err, results) => {
                          if (err) {
                            console.error(err);
                            res.sendStatus(500);
                          } else {
                            // Redirect back to the add vendor page
                            res.redirect("/vendors/add");
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
      }
    }
  );
};

const editVendorsData = async (req, res) => {
  const {
    name,
    address,
    capacity,
    charges,
    charges_type,
    check_in,
    check_out,
    lat,
    lng,
    host_name,
    house_rules,
    tnc,
    id,
  } = req.body;

  // Update user to database
  pool.query(
    "UPDATE vendors SET name = ?, address = ?, capacity = ?, charges = ?, charges_type = ?, check_in = ?, check_out = ?, lat = ?, lng = ?, host_name = ?, house_rules = ?, tnc = ? WHERE id = ?",
    [
      name,
      address,
      capacity,
      charges,
      charges_type,
      check_in,
      check_out,
      lat,
      lng,
      host_name,
      house_rules,
      tnc,
      id,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/vendors/edit/page/" + id);
      }
    }
  );
};

// Delete Vendors
const deleteVendors = async (req, res) => {
  const userid = req.params.id;
  const deleted = 1;
  pool.query(
    `UPDATE vendors SET deleted = ${deleted} WHERE id = ${userid}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/vendors/list");
      }
    }
  );
};
// vendors List
const listVendors = async (req, res) => {
  // Fetch data from the "vendors" table
  pool.query("SELECT * FROM vendors WHERE deleted = 0", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the managevendors.hbs template with the user data
      res.render("manageVendorPage", { vendors: results });
    }
  });
};

// Edit User Page
const editVendorPage = async (req, res) => {
  const id = req.params.id;
  // Fetch data from the "users" table of particular user
  pool.query(
    `SELECT * FROM vendors
    LEFT JOIN images ON vendors.banner_id = images.id
    WHERE vendors.id = ${id}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Render the editUserPage.ejs with User data
        console.log(id);
        console.log(results);
        const vendor = results[0];
        const host_id = results[0].host_image_id;
        const gallery_id = results[0].gallery_id;
        const separator = "-";
        let galleryIdResults;
        let galleryUrl = [];
        pool.query(
          `SELECT * FROM images WHERE id = ${host_id}`,
          (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              const hostImageUrl = results[0].url;
              if (gallery_id.includes(separator)) {
                galleryIdResults = gallery_id.split(separator);
              } else {
                galleryIdResults = [gallery_id];
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
                  res.render("editVendorPage", {
                    vendor,
                    galleryUrl,
                    hostImageUrl,
                  });
                  // res.json(results);
                })

                .catch((err) => {
                  console.error(err);
                  res.status(500).send("Error fetching gallery images");
                });
            }
          }
        );
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
        pool.query(
          `SELECT * FROM vendors WHERE id = ?`,
          [id],
          (err, results) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              let gallery_image_ids = [];
              let promises = [];
              const separator = "-";
              const galleryImageUrls = req.files["galleryImages"].map(
                (file) => {
                  return "/img/vendors/gallery/" + file.filename;
                }
              );
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
                  `SELECT * FROM vendors WHERE id = ${id}`,
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
                        "UPDATE vendors SET gallery_image_id = ? WHERE id = ?",
                        [updatedGalleryId, id],
                        (err, results) => {
                          if (err) {
                            console.error(err);
                            res.sendStatus(500);
                          } else {
                            // Redirect back to the add club page
                            res.redirect("/vendors/edit/page/" + id);
                          }
                        }
                      );
                    }
                  }
                );
              });
            }
            // res.json(results);
          }
        );
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
      const bannerUrl = "/img/vendors/banner/" + req.file.filename;
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
            res.redirect("/vendors/edit/page/" + id);
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

const updateHostImage = (req, res, next) => {
  try {
    upload.single("HostImage")(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      const { url, id } = req.body;
      const hostUrl = "/img/vendors/hostImage/" + req.file.filename;
      const oldHosturl = url;

      pool.query(
        "UPDATE images SET url = ? WHERE url = ?",
        [hostUrl, oldHosturl],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // Redirect back to the add club page
            res.redirect("/vendors/edit/page/" + id);
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
            res.redirect("/vendors/edit/page/" + id);
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
                  `SELECT * FROM vendors WHERE id = ${id}`,
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
                        "UPDATE vendors SET gallery_image_id = ? WHERE id = ?",
                        [updatedGalleryId, id],
                        (err, results) => {
                          if (err) {
                            console.error(err);
                            res.sendStatus(500);
                          } else {
                            res.redirect("/vendors/edit/page/" + id);
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                res.redirect("/vendors/edit/page/" + id);
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
// vendors List
const addVendorPage = async (req, res) => {
  res.render("addVendorPage.ejs");
};

const updateVendorPassword = async (req, res, next) => {
  const { password, id } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      pool.query(
        "UPDATE vendors SET password = ? WHERE id = ?",
        [hash, id],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            res.redirect("/vendors/edit/page/" + id);
          }
        }
      );
    }
  });
};

module.exports = {
  registerVendors,
  editVendorsData,
  deleteVendors,
  listVendors,
  addVendorPage,
  editVendorPage,
  addGalleryImages,
  updateBannerImage,
  updateHostImage,
  updateGalleryImage,
  deleteImage,
  updateVendorPassword,
};
