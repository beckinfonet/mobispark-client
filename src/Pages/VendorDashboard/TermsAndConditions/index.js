import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import "../styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  maxHeight: "80%",
};

export const TermsAndConditions = ({ onAccept, onDeny }) => {
  const [open, setOpen] = React.useState(false);
  const [agreement, setAgreement] = React.useState({
    clientName: "",
    clientAddress: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeny = () => {
    handleClose();
    onDeny();
  };

  // const handleAgreement = (evt) => {
  //   setAgreement((prev) => ({
  //     ...prev,
  //     [evt.target.name]: evt.target.value,
  //   }));
  // };

  // const checkDisabled = () => {
  //   return !Object.values(agreement).every((keyValue) => keyValue.length > 0);
  // };

  return (
    <div>
      <Button onClick={handleOpen}>Read Terms and Conditions</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              Terms and Conditions
            </Typography>
            <br />
            <Typography align="center">
              Company-Client Agreement for Aggregator Website.
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, mb: 5 }}
              className="agreement"
            >
              This Company-Client Agreement ("Agreement") is made and entered
              into by and between FORMULA312 LLC, a [State] corporation with its
              principal place of business at [Address] and its website located
              at www.formula312.com ("Company"), and [Client Name], with its
              principal place of business at [Address] ("Client"), collectively
              referred to as the "Parties." RECITALS The company operates an
              online aggregator website that collects and displays information
              about various products and services ("Aggregator Website"). The
              client desires to participate in the Aggregator Website as a
              provider of its products or services ("Client Products").
            </Typography>
            <Stack spacing={2}>
              <Button variant="outlined" onClick={() => handleDeny()}>
                Deny
              </Button>
              <Button
                variant="contained"
                onClick={() => onAccept({ agreementConsentTaken: true })}
                // disabled={checkDisabled()}
              >
                Accept
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
