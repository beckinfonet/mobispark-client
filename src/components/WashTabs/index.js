import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";

export const WashTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event, value) => {
    window.scrollTo(0, 0);
    navigate(value);
  };

  return (
    <Tabs
      value={location.pathname}
      onChange={handleChange}
      aria-label="wrapped label tabs example"
      variant="fullWidth"
    >
      <Tab
        value="/basic-wash"
        label={
          <div>
            Basic Wash
            <br />
            <Typography
              variant="caption"
              display="inline"
              gutterBottom
              sx={{ fontSize: "10px" }}
            >
              Starting from $125
            </Typography>
          </div>
        }
      />
      <Tab
        value="/pro-wash"
        label={
          <div>
            Pro Wash
            <br />
            <Typography
              variant="caption"
              display="inline"
              gutterBottom
              sx={{ fontSize: "10px" }}
            >
              Starting from $175
            </Typography>
          </div>
        }
      />
    </Tabs>
  );
};
