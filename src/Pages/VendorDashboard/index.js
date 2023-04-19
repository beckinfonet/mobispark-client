import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Button } from "@mui/material/";

import { EditItem } from "../../components/VendorDashboard/EditItem";
import { DisplayItem } from "../../components/VendorDashboard/DisplayItem";
import { TermsAndConditions } from "./TermsAndConditions";
import { AddItem } from "../../components/VendorDashboard/AddItem";

import "./styles.css";

const ServiceBuilder = ({ handleNewUpdates, showServiceAdder, onCancel }) => {
  const onSubmit = (data) => {
    handleNewUpdates(data);
    showServiceAdder(false);
  };

  return <AddItem onSubmit={onSubmit} onCancel={onCancel} />;
};

const ServiceItem = (props) => {
  const [isEdit, setEdit] = useState(false);

  const handleEditSubmit = (data, id) => {
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
    setServices((prev) => ({
      ...prev,
      carwashPackages: [...prev.carwashPackages, data],
    }));
    setMakeUpdateCall(true);
  };

  const handleAdderComp = (value) => {
    setOpenBuilder(value);
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
    setMakeUpdateCall(true);
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
                  onAddItem={handleAddItemInCategory(item._id)}
                />
              </div>
            ))}

          {openBuilder && (
            <ServiceBuilder
              showServiceAdder={handleAdderComp}
              handleNewUpdates={handleNewUpdates}
              onCancel={handleBuilder}
            />
          )}
          <Button
            onClick={handleBuilder}
            variant="outlined"
            color="success"
            sx={{ mt: 1 }}
          >
            + Add new service
          </Button>
        </>
      )}
    </div>
  );
};
