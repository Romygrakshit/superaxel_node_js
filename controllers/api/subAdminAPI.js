const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "superaxel",
});


module.exports.createInventory = (req, res) => {
  const {
    car_name,
    subAdmin_id,
    left_axel_price,
    left_axel_inventory,
    right_axel_price,
    right_axel_inventory,
  } = req.body;
  // console.log(req.body);

  try {
    pool.query(
      "select * from cars where car_name = ?",
      [car_name],
      (req, results) => {
        // console.log(results);
        pool.query(
          `insert into inventory(car_id,left_axel_price,left_axel_inventory,right_axel_price,right_axel_inventory,subadmin_id) values (${results[0].id},${left_axel_price},${left_axel_inventory},${right_axel_price},${right_axel_inventory},${subAdmin_id})`,
          (req) => {
            res.json({ success: true });
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports.getEnquiryByState = (req, res) => {
  try {
    const subadmin_id = req.body.sID;
    pool.query(
      "SELECT * FROM subadmins WHERE id = ?",
      [subadmin_id],
      (err, results) => {
        if (err) {
          console.log(err);
          res.json({ success: false });
        } else {
          const state = results[0].state;
          pool.query(
            "SELECT enquires.id,enquires.address,enquires.lat,enquires.lng,enquires.company_id,enquires.car_id,companies.company,cars.car_name,garages.garage_name,garages.mobile_number,enquires.axel,enquires.offered_price,enquires.date_time,enquires.status,enquires.state,images2.url as garage_image,GROUP_CONCAT(images1.url) AS image_urls FROM enquires LEFT JOIN images AS images1 ON FIND_IN_SET(images1.id, REPLACE(enquires.images_id, '-', ',')) > 0 LEFT JOIN garages ON garage_id = garages.id LEFT JOIN images AS images2 ON garages.profile_image_id = images2.id LEFT JOIN companies ON enquires.company_id = companies.id LEFT JOIN cars ON enquires.car_id = cars.id WHERE enquires.state = ? GROUP BY enquires.id;",
            [state],
            (err, results) => {
              if (err) {
                console.log(err)
                res.json({ success: false });
              } else {
                res.json({ success: true, data: results });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "some issue occrured" });
  }
};

module.exports.getProductEnquiryByState = (req, res) => {
  const subadmin_id = req.body.sID;

  pool.query(
    "SELECT * FROM subadmins WHERE id = ?",
    [subadmin_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({ success: false });
      } else {
        const state = results[0].state;
        pool.query(
          "select products_enquires.id,company,car_name,garage_name, garages.mobile_number, category_name,products_enquires.state,products_enquires.price, url AS garage_image, garages.lat, garages.lng, garages.address from products_enquires LEFT JOIN companies ON products_enquires.company_id = companies.id LEFT JOIN cars ON products_enquires.car_id = cars.id LEFT JOIN garages ON products_enquires.garage_id = garages.id LEFT JOIN categories ON products_enquires.category_id = categories.id LEFT JOIN images ON garages.profile_image_id = images.id where products_enquires.state = ?",
          [state],
          (req, results) => {
            res.json({ success: true, data: results });
          }
        );
      }
    }
  );
};

module.exports.updateEnq = (req, res) => {
  try {
    pool.query("SELECT * FROM enquires WHERE id = ?",[req.body.id],(req,results)=>{
      const garage_id = results[0].garage_id;
      const old_status = results[0].status;
      const car_id = results[0].car_id;
      const axel = results[0].axel;
      pool.query("SELECT S.id FROM enquires E INNER JOIN garages G ON E.garage_id = G.id INNER JOIN subadmins S ON G.state=S.state WHERE G.id=?", [garage_id], (err, rst) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const subadminId = rst[0].id;
          pool.query(
            "update enquires set offered_price = ?, status = ? where id = ?",
            [req.body.price, req.body.status, req.body.id],
            (req, results) => {
              if (req.body.status.toLowerCase() == 'delivered') {
                updateInventory(subadminId, car_id, axel, 1);
              }
              if (req.body.status.toLowerCase() == 'cancel' && old_status.toLowerCase() == 'delivered') {
                updateInventory(subadminId, car_id, axel, 2);
              }
              res.status(200).json({ message: "Enquiry updated successfully" });
            }
          );
        }
      })
    })
  } catch (err) {
    console.log("error", err);
    res.status(404).json({ message: "some issues occured" });
  }
};

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
