import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWashRounded";
import CarRepairIcon from "@mui/icons-material/CarRepairRounded";
import NoCrashIcon from "@mui/icons-material/NoCrashRounded";
import MinorCruchIcon from "@mui/icons-material/MinorCrashRounded";

import { ServiceCategories } from "../../components/ServiceCategories";
import { ServiceCard } from "../../components/ServiceDetailsCard/ServiceCard";

const testOptions = [
  { title: "Tint", cost: 20, Icon: MinorCruchIcon },
  { title: "Mobile Car Wash", cost: 5, Icon: LocalCarWashIcon },
  { title: "Full Detailing", cost: 5, Icon: NoCrashIcon },
  { title: "Paintless Dent Repair", cost: 35, Icon: CarRepairIcon },
];

export const BasicWash = () => {
  const { state } = useLocation();
  const [vendors, setVendors] = useState([]);
  const [filterWord, setFilterWord] = useState(state.categories);
  const [selectedCategories, setSelectedCategories] = React.useState(
    testOptions.filter((opt) => state.categories.includes(opt.title))
  );

  useEffect(() => {
    const fetchVendors = async () => {
      const result = await axios(
        "https://formula312-server-2xrue.ondigitalocean.app/vendors"
      );
      setVendors(result.data);
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const { title } = selectedCategories[0];
    const filterWord = snakeCaseIt(title);

    setFilterWord(filterWord);
  }, [selectedCategories, selectedCategories[0].title]);

  const navigate = useNavigate();

  const handleCategoryClick = (categories) => {
    setSelectedCategories(categories);
  };

  const handleServiceCardClick = (record) => () => {
    navigate(`/basic-wash/${record.id}/details`, {
      state: { selectedVendor: record, dateAndZipCode: state.dateAndZipCode },
    });
  };

  const snakeCaseIt = (str) =>
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join("-");

  return (
    <Box>
      <ServiceCategories
        selected={selectedCategories}
        options={testOptions}
        onClick={handleCategoryClick}
      />
      <Grid container spacing={3}>
        {vendors.length &&
          vendors.map((record, key) =>
            record.offeredServiceTypes.includes(snakeCaseIt(filterWord)) ? (
              <Grid item xs={12} md={4} key={key}>
                <ServiceCard
                  data={record}
                  onClick={handleServiceCardClick(record)}
                />
              </Grid>
            ) : null
          )}
      </Grid>
    </Box>
  );
};
