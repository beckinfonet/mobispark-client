import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWashRounded";
import MinorCruchIcon from "@mui/icons-material/MinorCrashRounded";

import { ServiceCategories } from "../../components/ServiceCategories";
import { ServiceCard } from "../../components/ServiceDetailsCard/ServiceCard";
import dataJSON from "../../assets/jsons/data.json";

const testOptions = [
  { title: "Mobile Tint", cost: 20, Icon: MinorCruchIcon },
  { title: "Mobile Car Wash", cost: 5, Icon: LocalCarWashIcon },
];

export const BasicWash = () => {
  const { state } = useLocation();
  const [selectedCategories, setSelectedCategories] = React.useState(
    testOptions.filter((opt) => state.categories.includes(opt.title))
  );

  // useEffect(() => {
  //   const fetchVendors = async () => {
  //     const result = await axios(
  //       "https://formula312-server-2xrue.ondigitalocean.app/vendors"
  //     );
  //     setVendors(result.data);
  //   };

  //   fetchVendors();
  // }, []);

  const navigate = useNavigate();

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
