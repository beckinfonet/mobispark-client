import React from "react";
import { Grid, Stack, Typography, Button } from "@mui/material";
import "../../../Pages/VendorDashboard/styles.css";

export const DisplayItem = ({ data, onEdit }) => {
  const { title, price, availableIn } = data;
  return (
    <>
      <Stack sx={{ border: "1px solid lightgray", padding: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography>{title}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{price}</Typography>
            </Grid>
          </Grid>

          <Grid>
            {availableIn.map((item, index) => (
              <span key={index} className="checkbox-styles">
                <label>{Object.keys(item)}</label>
                <input
                  type="checkbox"
                  checked={item[Object.keys(item)]}
                  onChange={() => console.log("to be developed later")}
                />
              </span>
            ))}
          </Grid>
        </Grid>
        <Button onClick={onEdit} variant="contained" sx={{ mt: 2 }}>
          Edit
        </Button>
      </Stack>
    </>
  );
};
