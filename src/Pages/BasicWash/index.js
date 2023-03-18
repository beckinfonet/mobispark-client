import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWashRounded";
import CarRepairIcon from "@mui/icons-material/CarRepairRounded";
// import TireRepairIcon from "@mui/icons-material/TireRepairRounded";
// import GarageIcon from "@mui/icons-material/GarageRounded";
import NoCrashIcon from "@mui/icons-material/NoCrashRounded";
import MinorCruchIcon from "@mui/icons-material/MinorCrashRounded";

import { ServiceCategories } from "../../components/ServiceCategories";
import { ServiceCard } from "../../components/ServiceDetailsCard/ServiceCard";
// import { WashTabs } from "./../../components/WashTabs";

import dataJSON from "../../assets/jsons/data.json";

const testOptions = [
  { title: "Tint", cost: 20, Icon: MinorCruchIcon },
  { title: "Mobile Car Wash", cost: 5, Icon: LocalCarWashIcon },
  { title: "Full Detailing", cost: 5, Icon: NoCrashIcon },
  // { title: "Body Shop Work", cost: 35 },
  { title: "Paintless Dent Repire", cost: 35, Icon: CarRepairIcon },
  // { title: "Mobile Tire Services", cost: 35 },
];

export const BasicWash = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = React.useState(
    testOptions.filter((opt) => state.categories.includes(opt.title))
  );

  // const selectedCategoriesTotalPrice = React.useMemo(() => {
  //   return selectedCategories.reduce((acc, item) => acc + item.cost, 0);
  // }, [selectedCategories]);

  const handleCategoryClick = (categories) => {
    setSelectedCategories(categories);
  };

  const handleServiceCardClick = (record) => () => {
    navigate(`/basic-wash/${record.id}/details`, {
      state: { selectedVendor: record, dateAndZipCode: state.dateAndZipCode },
    });
  };

  return (
    <Box>
      <ServiceCategories
        selected={selectedCategories}
        options={testOptions}
        onClick={handleCategoryClick}
      />
      <Grid container spacing={3}>
        {dataJSON.data.map((record, key) => (
          <Grid item xs={12} md={4} key={key}>
            <ServiceCard
              data={record}
              onClick={handleServiceCardClick(record)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
