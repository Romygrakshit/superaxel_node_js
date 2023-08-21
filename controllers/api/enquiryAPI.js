const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "superaxel",
});

// const postBannerImage = async (req, res) => {};

// Configure multer
const storageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, "../../public/img/enquires");
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

module.exports.listEnquires = async (req, res) => {
  // Fetch data from the "Clubs" table
  const id = req.params.id;
  pool.query(
    "SELECT * FROM enquires LEFT JOIN delivery_boy ON enquires.delivery_boy = delivery_boy.id LEFT JOIN companies ON enquires.company_id = companies.id LEFT JOIN cars ON enquires.car_id = cars.id WHERE enquires.garage_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
      } else {
        res.status(200).json({ success: true, data: results });
      }
    }
  );
};

module.exports.getCategory = async (req, res) => {
  pool.query(
    "SELECT * FROM categories",
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
      } else {
        res.status(200).json({ success: true, data: results });
      }
    }
  );
};

module.exports.newProductEnquiry = async (req, res) => {
  const {
    category_id,
    garage_id,
    company_id,
    car_id,
    price,
  } = req.body;
  pool.query(
    "SELECT state FROM garages WHERE id = ?",
    [garage_id],
    (error, garageResults) => {
      if (error) {
        console.log(error);
        res.json({ success: false });
        return;
      }

      const state = garageResults[0].state;
      pool.query(
        "INSERT INTO products_enquires SET ?",
        {
          category_id,
        garage_id,
        company_id,
        car_id,
        price,
        state,
        },
        (err, results) => {
          if (err) {
            console.error(err);
            res.json({ success: false });
          } else {
            // console.log(results);
            // console.log("success");
            res.status(404).json({ success: true ,data:results});
          }
        }
      );
    })
};

module.exports.newEnquires = async (req, res, next) => {
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
        state,
      } = req.body;

      // console.log(req.files);

      const imageUrls = req.files["enquiryImages"].map((file) => {
        return "/../img/enquires/" + file.filename;
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
            // console.log(results);
            const company_id = results[0].id;
            // console.log(company_id);
            pool.query(
              `SELECT * FROM cars WHERE car_name = ? AND company_id = ?`,
              [car_name, company_id],
              (err, results) => {
                // console.log(results);
                if (err) {
                  console.error(err);
                  res.json({ success: false });
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
                    state,
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
    console.log(err);
    res.json({ success: false });
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
  state,
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
          state,
          images_id,
        },
        (err, results) => {
          if (err) {
            console.error(err);
            res.json({ success: false });
          } else {
            // console.log(results);
            // console.log("success");
            res.status(404).json({ success: true });
          }
        }
      );
    })
    .catch((err) => {
      console.error(err);
      res.json({ success: false });
    });
};
