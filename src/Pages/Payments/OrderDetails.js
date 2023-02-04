import * as React from "react";
import { SocialIcon } from "react-social-icons";
import { Typography } from "@mui/material";
import "./orderDetails.styles.css";

export default function BasicTable(props) {
  const { values } = props;

  return (
    <div className="basic-details-section">
      <Typography align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        Vendor details:
      </Typography>
      <div className="user-details-section">
        <div className="item">
          <img
            alt="vendor icon"
            src="https://pixlr.com/studio/template/8352fdc3-0e0e-4465-a3d3-af93beb070c4/thumbnail.webp"
            width={50}
            height={50}
            style={{ borderRadius: "10px" }}
          />
          <div style={{ marginLeft: "5px" }}>
            <div>Brandon Frank</div>
            <div>(212)755-3455</div>
          </div>
        </div>

        <div className="item">
          <div>
            <SocialIcon
              network="email"
              style={{ height: 25, width: 25, margin: 10 }}
            />
            <SocialIcon
              network="wechat"
              style={{ height: 25, width: 25, margin: 10 }}
            />
          </div>
          <div>
            <Typography>Service Date</Typography>
            <Typography>{`${values?.dateOfBooking}`}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
