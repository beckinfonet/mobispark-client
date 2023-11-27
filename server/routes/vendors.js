const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const vendorsRouter = express.Router();
const vendorDataFile = path.resolve(process.cwd(), "server/data/vendors.json");

const readVendorData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(vendorDataFile, "utf8", (error, data) => {
      if (error) {
        reject({
          status: 500,
          message: error.message || "Internal server error",
        });
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeVendorData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(vendorDataFile, JSON.stringify(data), "utf8", (error) => {
      if (error) {
        reject({
          status: 500,
          message: error.message || "Internal server error",
        });
      } else {
        resolve({ stats: 200 });
      }
    });
  });
};

vendorsRouter.get("/list/:zipcode", (req, res) => {
  readVendorData()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    });
});

vendorsRouter.post("/create", (req, res) => {
  const newVendor = { ...(req.body || {}), id: uuid.v1() };
  readVendorData()
    .then((data) => {
      const updatedVendors = { data: (data?.data || []).concat(newVendor) };
      return writeVendorData(updatedVendors);
    })
    .then(() => {
      res.status(200).json({ data: newVendor });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    });
});

vendorsRouter.put("/update", (req, res) => {
  const newVendor = { ...(req.body || {}) };
  readVendorData()
    .then((data) => {
      const updatedVendors = {
        data: (data?.data || []).map((vendor) =>
          newVendor.id === vendor.id ? newVendor : vendor
        ),
      };
      return writeVendorData(updatedVendors);
    })
    .then(() => {
      res.status(200).json({ data: newVendor });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    });
});

module.exports = vendorsRouter;
