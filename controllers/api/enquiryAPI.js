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
  pool.query(
    "SELECT * FROM enquires LEFT JOIN delivery_boy ON enquires.delivery_boy = delivery_boy.id LEFT JOIN companies ON enquires.company_id = companies.id LEFT JOIN cars ON enquires.car_id = cars.id",
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
      } else {
        res.status(400).json({ success: true, data: results });
      }
    }
  );
};

module.exports.newEnquires = async (req, res, next) => {
  try {
    await upload.fields([{ name: "enquiryImages", maxCount: 9 }]);

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

    let result = await pool.query(`SELECT * FROM companies WHERE company = ?`, [
      company,
    ]);

    console.log(result);
    const company_id = result.id;

    result = await pool.query(
      `SELECT * FROM cars WHERE car_name = ? AND company_id = ?`,
      [car_name, company_id]
    );

    console.log(result);
    const car_id = result.id;

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
    Promise.all(promises).then(() => {
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
            console.log("success");
            res.status(404).json({ success: true });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

//   try {
//     upload.fields([{ name: "enquiryImages", maxCount: 9 }])(req, res, (err) => {
//       if (err) {
//         console.error(err);
//         res.sendStatus(500);
//         return;
//       }
//       const status = "pending";
//       const {
//         garage_id,
//         address,
//         lat,
//         lng,
//         company,
//         car_name,
//         axel,
//         offered_price,
//       } = req.body;

//       const imageUrls = req.files["enquiryImages"].map((file) => {
//         return "/../img/enquires/" + file.filename;
//       });
//       imageUrls.forEach((imageUrls) => {
//         pool.query(
//           "INSERT INTO images SET ?",
//           { url: imageUrls },
//           (err, results) => {
//             if (err) {
//               console.error(err);
//             } else {
//             }
//           }
//         );
//       });
//       pool.query(
//         `SELECT * FROM companies WHERE company = ?`,
//         [company],
//         (err, results) => {
//           if (err) {
//             console.error(err);
//           } else {
//             console.log(results);
//             const company_id = results.id;
//             pool.query(
//               `SELECT * FROM cars WHERE car_name = ? AND company_id = ?`,
//               [car_name, company_id],
//               (err, results) => {
//                 console.log(results.toString());
//                 if (err) {
//                   console.error(err);
//                 } else {
//                   const car_id = results.id;
//                   insertData(
//                     garage_id,
//                     address,

//                     lat,
//                     lng,
//                     company_id,
//                     car_id,
//                     axel,
//                     offered_price,
//                     status,
//                     imageUrls,
//                     res
//                   );
//                 }
//               }
//             );
//           }
//         }
//       );
//     });
//   } catch (err) {
//     res.sendStatus(500);
//     console.log(err);
//   }
// };

// const insertData = async (
//   garage_id,
//   address,
//   lat,
//   lng,
//   company_id,
//   car_id,
//   axel,
//   offered_price,
//   status,
//   imageUrls,
//   res
// ) => {
//   let image_ids = [];
//   let promises = [];
//   const separator = "-";
//   imageUrls.forEach((imageUrl) => {
//     let promise = new Promise((resolve, reject) => {
//       pool.query(
//         `SELECT * FROM images WHERE url = ?`,
//         [imageUrl],
//         (err, results) => {
//           if (err) {
//             console.error(err);
//             reject(err);
//           } else {
//             image_ids.push(results[0].id);
//             resolve();
//           }
//         }
//       );
//     });
//     promises.push(promise);
//   });
//   Promise.all(promises)
//     .then(() => {
//       const images_id = image_ids.join(separator);

//       pool.query(
//         "INSERT INTO enquires SET ?",
//         {
//           garage_id,
//           address,
//           lat,
//           lng,
//           company_id,
//           car_id,
//           axel,
//           offered_price,
//           status,
//           images_id,
//         },
//         (err, results) => {
//           if (err) {
//             console.error(err);
//             res.sendStatus(500);
//           } else {
//             console.log("success");
//             res.status(404).json({ success: true });
//           }
//         }
//       );
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };
