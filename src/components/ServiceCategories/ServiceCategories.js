import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const ServiceCategories = (props) => {
  const { options, selected } = props;

  const handleCategoryClick = (record) => () => {
    // const isRecordSelected = selected.some(
    //   (item) => item.title === record.title
    // );
    // if (isRecordSelected) {
    //   props.onClick(selected.filter((val) => val !== record));
    // } else {
    props.onClick([
      // ...selected,
      record,
    ]);
    // }
  };

  return (
    <Box
      sx={{
        my: 2,
        textAlign: "center",
        "& button": { m: 1 },
      }}
    >
      {options.map((service) => {
        const Icon = service.Icon;
        return (
          <Button
            key={service.title}
            color="primary"
            variant={
              selected.some((item) => item.title === service.title)
                ? "contained"
                : "outlined"
            }
            size="large"
            startIcon={<Icon />}
            sx={{ borderRadius: "10px" }}
            onClick={handleCategoryClick(service)}
          >
            {service.title}
          </Button>
        );
      })}
    </Box>
  );
};
