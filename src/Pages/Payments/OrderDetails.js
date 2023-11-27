import * as React from "react";
import { SocialIcon } from "react-social-icons";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import "./orderDetails.styles.css";

export default function BasicTable(props) {
  const { values, userInfo } = props;

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
            <div>{userInfo?.email}</div>
            <div>{userInfo?.phone_number}</div>
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
            <Typography variant="caption" display="block">
              Booking Date & Slot
            </Typography>
            <Typography>{`${dayjs(values?.dateOfBooking?.$d).format(
              "MM/DD/YYYY"
            )} ${values?.timeSlot}`}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
