import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeny = () => {
    handleClose();
    onDeny();
  };

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
            <Typography id="transition-modal-description" sx={{ mt: 2, mb: 5 }}>
              The standard Lorem Ipsum passage, used since the 1500s "Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
              Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
              Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus error
              sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
              sit amet, consectetur, adipisci velit, sed quia non numquam eius
              modi tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?" 1914
              translation by H. Rackham "But I must explain to you how all this
              mistaken idea of denouncing pleasure and praising pain was born
              and I will give you a complete account of the system, and expound
              the actual teachings of the great explorer of the truth, the
              master-builder of human happiness. No one rejects, dislikes, or
              avoids pleasure itself, because it is pleasure, but because those
              who do not know how to pursue pleasure rationally encounter
              consequences that are extremely painful. Nor again is there anyone
              who loves or pursues or desires to obtain pain of itself, because
              it is pain, but because occasionally circumstances occur in which
              toil and pain can procure him some great pleasure. To take a
              trivial example, which of us ever undertakes laborious physical
              exercise, except to obtain some advantage from it? But who has any
              right to find fault with a man who chooses to enjoy a pleasure
              that has no annoying consequences, or one who avoids a pain that
              produces no resultant pleasure?" Section 1.10.33 of "de Finibus
              Bonorum et Malorum", written by Cicero in 45 BC "At vero eos et
              accusamus et iusto odio dignissimos ducimus qui blanditiis
              praesentium voluptatum deleniti atque corrupti quos dolores et
              quas molestias excepturi sint occaecati cupiditate non provident,
              similique sunt in culpa qui officia deserunt mollitia animi, id
              est laborum et dolorum fuga. Et harum quidem rerum facilis est et
              expedita distinctio. Nam libero tempore, cum soluta nobis est
              eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus. Temporibus autem quibusdam et aut officiis debitis
              aut rerum necessitatibus saepe eveniet ut et voluptates
              repudiandae sint et molestiae non recusandae. Itaque earum rerum
              hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
              maiores alias consequatur aut perferendis doloribus asperiores
              repellat."
            </Typography>
            <Stack spacing={2}>
              <Button variant="outlined" onClick={() => handleDeny()}>
                Deny
              </Button>
              <Button variant="contained" onClick={() => onAccept()}>
                Accept
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
