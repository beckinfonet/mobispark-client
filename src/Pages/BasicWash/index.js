import * as React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ServiceCategories } from "../../components/ServiceCategories";
import { ServiceCard } from "../../components/ServiceDetailsCard/ServiceCard";
import { WashTabs } from "./../../components/WashTabs";

import data from "../../assets/jsons/data.json";

const testOptions = [
  { title: "Tint", cost: 20 },
  { title: "Mobile Car Wash", cost: 5 },
  { title: "Full Detailing", cost: 5 },
  { title: "Body Shop Work", cost: 35 },
  { title: "Paint-less Dent Repire", cost: 35 },
  { title: "Mobile Tire Service", cost: 35 },
];

export const BasicWash = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const selectedCategoriesTotalPrice = React.useMemo(() => {
    return selectedCategories.reduce((acc, item) => acc + item.cost, 0);
  }, [selectedCategories]);

  const handleCategoryClick = (categories) => {
    setSelectedCategories(categories);
  };

  const handleServiceCardClick = (record) => () => {
    navigate(`/basic-wash/${record.id}/details`, { state: record });
  };

  return (
    <Box>
      <ServiceCategories
        selected={selectedCategories}
        options={testOptions}
        onClick={handleCategoryClick}
      />
      <Grid container spacing={3}>
        {data.data.map((record, key) => (
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
