import React from "react";
import { Grid, Typography, Button, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../../../Pages/VendorDashboard/styles.css";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 35,
  height: 18,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 15,
    height: 15,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function CustomizedSwitches() {
  return (
    <FormGroup>
      <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} />
    </FormGroup>
  );
}

export const DisplayItem = ({ data, onEdit }) => {
  const { title, price, availableIn } = data;
  return (
    <>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          border: "1px solid lightgray",
          p: 1,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Grid
          item
          sx={{
            fontSize: 18,
            fontWeight: 600,
            pb: 1,
          }}
        >
          {title}
        </Grid>
        <Grid
          container
          item
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid item xs={9}>
            <Typography
              sx={{
                backgroundColor: "aliceblue",
              }}
            >
              Available in:
            </Typography>
            {availableIn.map((item, index) => (
              <div key={index} className="checkbox-styles">
                <input
                  type="checkbox"
                  checked={item[Object.keys(item)]}
                  onChange={() => console.log("to be developed later")}
                />
                <label>{Object.keys(item)}</label>
              </div>
            ))}
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ backgroundColor: "aliceblue" }}>
              Price:
            </Typography>
            ${price}
            <CustomizedSwitches />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            onClick={onEdit}
            variant="contained"
            sx={{ width: "100%", mt: 1 }}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
