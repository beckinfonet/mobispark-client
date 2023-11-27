import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import defaultProfileImage from "./default-profile.png";

import "./style.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

export const Profile = () => {
  const { user } = useAuthenticator((context) => [context.authStatus]);
  const [avatar, setAvatar] = useState(defaultProfileImage);
  const fileInputRef = useRef();

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setAvatar(reader.result);
      };
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-cover-image">
          <div className="cover-responsive-sizer"></div>
          <div className="cover-image"></div>
          <div className="cover-responsive-content"></div>
        </div>
        <div className="profile-img-container">
          <div className="profile-img-separator">
            <div className="profile-img-content">
              <button
                type="button"
                className="profile-camera-btn"
                onClick={handleUploadButtonClick}
              >
                <span className="icon-content">
                  <PhotoCameraIcon />
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="file-upload-input"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <div className="view-profile-content">
                <div className="view-profile-sizer"></div>
                <div
                  className="view-profile-avatar"
                  style={{
                    backgroundImage: `url(${avatar})`,
                    backgroundPosition: "center center",
                  }}
                ></div>
                <div className="view-profile-responsive-content"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="username-section"></div>
        <div className="profile-form-section">
          <TextField
            label="Username"
            id="username"
            sx={{ margin: "20px 0px" }}
            focused
            fullWidth
            defaultValue=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Phone"
            id="phone"
            sx={{ margin: "20px 0px" }}
            focused
            fullWidth
            defaultValue={user?.attributes?.phone_number}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email Address"
            id="email-address"
            sx={{ margin: "20px 0px" }}
            focused
            fullWidth
            defaultValue={user?.attributes?.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Address"
            id="home-address"
            sx={{ margin: "20px 0px" }}
            focused
            fullWidth
            defaultValue=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};
