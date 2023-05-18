import React, { useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";

export const VendorSignup = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    legalBusinessName: "",
    legalBusinessAddress: "",
    legalBusinessCity: "",
    legalBusinessState: "",
    legalBusinessZipcode: "",
    businessPhoneNumber: "",
    businessEmail: "",
    personalEmail: "",
    personalPhoneNumber: "",
    isVendor: false,
  });

  const insertNewData = async (body) => {
    const result = await axios({
      method: "POST",
      url: `https://formula312-server-2xrue.ondigitalocean.app/vendor`,
      data: body,
    });
    console.log("result ==>", result);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isVendor: event.target.checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqBody = {
      title: formData?.legalBusinessName,
      location: formData.legalBusinessCity,
      fullAddress: formData.legalBusinessAddress,
      image: "./assets/wax.jpeg",
      rate: 0,
      promoRate: 0,
      basePrice: 0,
      promoContentTop: "",
      promoContentBottom: "",
      serviceTypes: {},
      carwashPackages: [],
      userInfo: {
        username: user.username,
        platformApprovalStatus: "PENDING",
      },
    };
    insertNewData(reqBody);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Legal Business Name"
              name="legalBusinessName"
              value={formData.legalBusinessName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Legal Business Address"
              name="legalBusinessAddress"
              value={formData.legalBusinessAddress}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Business City"
              name="legalBusinessCity"
              value={formData.legalBusinessCity}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Business State"
              name="legalBusinessState"
              value={formData.legalBusinessState}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Business zipcode"
              name="legalBusinessZipcode"
              value={formData.legalBusinessZipcode}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Business Phone Number"
              name="businessPhoneNumber"
              value={formData.businessPhoneNumber}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Business Email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Personal Email"
              name="personalEmail"
              value={formData.personalEmail}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Personal Phone Number"
              name="personalPhoneNumber"
              value={formData.personalPhoneNumber}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isVendor}
                  onChange={handleCheckboxChange}
                  name="isVendor"
                />
              }
              label="I would like to join the platform as a vendor to offer my services"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};
