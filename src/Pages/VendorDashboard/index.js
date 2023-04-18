import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { EditItem } from "../../components/VendorDashboard/EditItem";
import { DisplayItem } from "../../components/VendorDashboard/DisplayItem";
import { TermsAndConditions } from "./TermsAndConditions";
import "./styles.css";
import { Typography } from "@mui/material";

const initialValues = {
  title: "",
  price: 0,
  availableIn: [],
};

const options = [
  { basic: false },
  { classic: false },
  { premium: false },
  { platinum: false },
];

const checkboxSupply = [
  {
    title: "basic",
    name: "basic",
  },
  {
    title: "classic",
    name: "classic",
  },
  {
    title: "premium",
    name: "premium",
  },
  {
    title: "platinum",
    name: "platinum",
  },
];

const ServiceBuilder = ({ handleNewUpdates, showServiceAdder }) => {
  const [state, setState] = useState(initialValues);
  const [checkedVals, setCheckedVals] = useState(options);

  const handleBoxes = (evt) => {
    const { name, checked } = evt.target;

    const result = checkedVals.map((item) => {
      if (Object.keys(item)[0] === name) {
        return { [name]: checked };
      } else {
        return item;
      }
    });
    setCheckedVals(result);
  };

  const addToMain = () => {
    const newPackage = { ...state, availableIn: [checkedVals] };
    handleNewUpdates(newPackage);
    showServiceAdder(false);
  };

  const handleInputs = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  return (
    <div style={{ display: "flex", margin: "15px 0px" }}>
      <input placeholder="Service name" name="title" onChange={handleInputs} />
      <input placeholder="price" name="price" onChange={handleInputs} />
      {checkboxSupply.map(({ title, name }, index) => (
        <span key={index} className="checkbox-styles">
          <label>{title}</label>
          <input name={name} type="checkbox" onClick={(e) => handleBoxes(e)} />
        </span>
      ))}
      <span>
        <Button onClick={addToMain}>Add record</Button>
      </span>
    </div>
  );
};

const ServiceItem = (props) => {
  const [isEdit, setEdit] = useState(false);

  const handleEditSubmit = (data, id) => {
    // setShowAddItem(false);
    // setExpand(true);
    setEdit(false);
    props.onAddItem(data, id);
  };

  return (
    <div style={{ display: "flex", margin: "15px 0px" }}>
      {isEdit ? (
        <EditItem
          {...props}
          onCancel={() => setEdit(false)}
          onSubmit={handleEditSubmit}
        />
      ) : (
        <DisplayItem
          {...props}
          // onHide={handleOnHide}
          onEdit={() => setEdit(true)}
        />
      )}
    </div>
  );
};

export const VendorDashboard = () => {
  const params = useParams();
  const [termsAccepted, setTerms] = useState(true);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(null);
  const [openBuilder, setOpenBuilder] = useState(false);
  const [makeUpdateCall, setMakeUpdateCall] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://formula312-server-2xrue.ondigitalocean.app/vendor/${params.vendorId}`
      );
      setServices(result.data);
      if (result.data.carwashPackages.length) {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (makeUpdateCall) {
      let body = JSON.parse(JSON.stringify(services));
      delete body._id;
      const insertNewData = async () => {
        const result = await axios({
          method: "put",
          url: `https://formula312-server-2xrue.ondigitalocean.app/vendor/${params.vendorId}`,
          data: body,
        });
        console.log("result: ", result);
        setMakeUpdateCall(false);
      };
      insertNewData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeUpdateCall]);

  const handleBuilder = () => {
    setOpenBuilder(!openBuilder);
  };

  const handleNewUpdates = (data) => {
    const newRecord = {
      availableIn: data.availableIn[0],
      price: data.price,
      title: data.title,
    };
    setServices((prev) => ({
      ...prev,
      carwashPackages: [...prev.carwashPackages, newRecord],
    }));
    setMakeUpdateCall(true);
  };

  const handleAdderComp = (value) => {
    setOpenBuilder(value);
  };

  const updateParentData = (data) => {
    // add logic here
  };

  const handleAddItemInCategory = (serviceTypeId) => (data, itemId) => {
    setServices((prev) => {
      return {
        ...prev,
        carwashPackages: prev.carwashPackages.map((item) => {
          return item._id === serviceTypeId ? { ...data } : item;
        }),
      };
    });
  };

  return (
    <div className="vendor-dashboard-container">
      {!termsAccepted ? (
        <TermsAndConditions
          onAccept={() => setTerms(true)}
          onDeny={() => setTerms(false)}
        />
      ) : (
        <>
          <Typography align="center" sx={{ mt: 3, fontWeight: 600 }}>
            VENDOR DASHBOARD
          </Typography>
          {loading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          {!loading &&
            services.carwashPackages.length &&
            services.carwashPackages.map((item, index) => (
              <div key={index}>
                <ServiceItem
                  data={item}
                  updateParentData={updateParentData}
                  onAddItem={handleAddItemInCategory(item._id)}
                />
              </div>
            ))}

          {openBuilder && (
            <ServiceBuilder
              showServiceAdder={handleAdderComp}
              handleNewUpdates={handleNewUpdates}
            />
          )}
          <Button onClick={handleBuilder}>+ Please add service</Button>
        </>
      )}
    </div>
  );
};
