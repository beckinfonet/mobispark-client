import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";

export const ServiceCategories = (props) => {
  const { options, selected } = props;

  const handleCategoryClick = (record) => () => {
    const isRecordSelected = selected.some(
      (item) => item.title === record.title
    );
    if (isRecordSelected) {
      props.onClick(selected.filter((val) => val !== record));
    } else {
      props.onClick([...selected, record]);
    }
  };

  return (
    <Box
      sx={{
        my: 2,
        textAlign: "center",
        "& button": { m: 0.5 },
      }}
    >
      {options.map((service) => (
        <Button
          key={service.title}
          color="primary"
          variant={
            selected.some((item) => item.title === service.title)
              ? "contained"
              : "outlined"
          }
          size="small"
          endIcon={
            selected.some((item) => item.title === service.title) ? (
              <DoneIcon />
            ) : null
          }
          sx={{ borderRadius: "15px" }}
          onClick={handleCategoryClick(service)}
        >
          {service.title} ${service.cost}
        </Button>
      ))}
    </Box>
  );
};
