import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./styles.css";

const initialValues = {
  title: "",
  price: 0,
  availableIn: [],
};

const options = {
  basic: false,
  classic: false,
  premium: false,
  platinum: false,
};

const checkboxSupply = [
  {
    title: "Basic",
    name: "basic",
  },
  {
    title: "Classic",
    name: "classic",
  },
  {
    title: "Premium",
    name: "premium",
  },
  {
    title: "Platinum",
    name: "platinum",
  },
];

const ServiceBuilder = () => {
  const [payload, setPayload] = useState([]);
  const [state, setState] = useState(initialValues);
  const [checkedVals, setCheckedVals] = useState(options);

  const handleBoxes = (evt) => {
    const { name, checked } = evt.target;
    setCheckedVals((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div style={{ display: "flex", margin: "15px 0px" }}>
      {/* {console.log("state: ", state)} */}
      <input placeholder="Service name" name="title" onChange={handleInputs} />
      <input placeholder="price" name="price" onChange={handleInputs} />
      {checkboxSupply.map(({ title, name }, index) => (
        <span key={index} className="checkbox-styles">
          <label>{title}</label>
          <input name={name} type="checkbox" onClick={(e) => handleBoxes(e)} />
        </span>
      ))}
    </div>
  );
};

const ServiceDisplay = (data) => {
  if (!data.length) {
    return <p>No data to show</p>;
  }

  return <div>map it all here</div>;
};

export const VendorDashboard = () => {
  const [services, setServices] = useState([]);
  const [openBuilder, setOpenBuilder] = useState(false);

  const handleBuilder = () => {
    setOpenBuilder(!openBuilder);
  };

  return (
    <div className="vendor-dashboard-container">
      <p>VENDOR DASHBOARD</p>
      <Button onClick={handleBuilder}>+ Please add service</Button>
      {services.length > 0 &&
        services.map((item) => <ServiceDisplay data={item} />)}

      {openBuilder && <ServiceBuilder />}
    </div>
  );
};
