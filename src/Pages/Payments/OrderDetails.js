import * as React from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { SocialIcon } from "react-social-icons";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicTable() {
  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>
          <img
            src="https://pixlr.com/studio/template/8352fdc3-0e0e-4465-a3d3-af93beb070c4/thumbnail.webp"
            width={50}
            height={50}
            style={{ borderRadius: "10px" }}
          />
        </Item>
        <Item>
          <div>Brandon Frank</div>
          <div>(212)755-3455</div>
        </Item>
        <Item>
          <SocialIcon
            network="email"
            style={{ height: 25, width: 25, margin: 10 }}
          />
          <SocialIcon
            network="wechat"
            style={{ height: 25, width: 25, margin: 10 }}
          />
        </Item>
      </Stack>
    </div>
  );
}
