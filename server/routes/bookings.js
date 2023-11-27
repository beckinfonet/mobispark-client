const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const bookingsRouter = express.Router();
const bookingDataFile = path.resolve(
  process.cwd(),
  "server/data/bookings.json"
);

const readBookingData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(bookingDataFile, "utf8", (error, data) => {
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

const writeBookingData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(bookingDataFile, JSON.stringify(data), "utf8", (error) => {
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

bookingsRouter.get("/list/:userId", (req, res) => {
  readBookingData()
    .then((data) => {
      const records = (data?.data || [])
        ?.filter((item) => item?.userInfo?.sub === req?.params?.userId)
        ?.map(({ userInfo, ...rest }) => rest);
      res.status(200).json({ data: records });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    });
});

bookingsRouter.post("/create", (req, res) => {
  const newBooking = { ...(req.body || {}), id: uuid.v1() };
  readBookingData()
    .then((data) => {
      const updatedBookings = { data: (data?.data || []).concat(newBooking) };
      return writeBookingData(updatedBookings);
    })
    .then(() => {
      res.status(200).json({ data: newBooking });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    });
});

bookingsRouter.put("/update", (req, res) => {
  const newBooking = { ...(req.body || {}) };
  readBookingData()
    .then((data) => {
      const updatedBookings = {
        data: (data?.data || []).map((booking) =>
          newBooking.id === booking.id ? newBooking : booking
        ),
      };
      return writeBookingData(updatedBookings);
    })
    .then(() => {
      res.status(200).json({ data: newBooking });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    });
});

module.exports = bookingsRouter;
