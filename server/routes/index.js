const express = require("express");
const vendorsRouter = require("./vendors");
const bookingsRouter = require("./bookings");
const appRouter = express.Router();

appRouter.use("/vendors", vendorsRouter);

appRouter.use("/bookings", bookingsRouter);

module.exports = appRouter;
