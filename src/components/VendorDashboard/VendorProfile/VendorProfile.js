import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const ProfileViewMode = ({ setToEditMode }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography>View mode</Typography>
        <Button variant="outlined" onClick={setToEditMode}>
          Edit info
        </Button>
      </Grid>
    </Grid>
  );
};

const VendorProfile = ({ submitUserProfileData, data }) => {
  const [viewMode, setViewMode] = useState(false);
  const { companyName, companyStreetAddress, email, city, state, zipcode } =
    data?.vendorProfile;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      companyName: companyName,
      companyStreetAddress: companyStreetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      email: email,
      mainPhoneNumber: {
        value: data.vendorProfile.mainPhoneNumber.value,
        authenticated: false,
      },
      secondaryPhone: {
        value: data.vendorProfile.secondaryPhone.value,
        authenticated: false,
      },
      contactPerson: {
        firstName: data.vendorProfile.contactPerson.firstName,
        lastName: data.vendorProfile.contactPerson.lastName,
        cellPhone: {
          value: data.vendorProfile.contactPerson.cellPhone.value,
          authenticated: false,
        },
        email: {
          value: data.vendorProfile.contactPerson.email.value,
          authenticated: false,
        },
      },
    },
  });

  const handleFormSubmit = (data) => {
    submitUserProfileData(data);
    setViewMode(false);
  };

  const handleEditMode = (flag) => {
    setViewMode(flag);
  };

  const onCancel = () => {
    setViewMode(false);
  };

  return (
    <Stack sx={{ border: "1px solid lightgray", padding: 1, borderRadius: 2 }}>
      <Typography sx={{ textAlign: "center", mt: 2, mb: 2, fontWeight: 600 }}>
        Company Profile
      </Typography>
      {!data && <p>LOADING...</p>}
      {!viewMode && data ? (
        <ProfileViewMode setToEditMode={() => handleEditMode(true)} />
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12}>
              <Controller
                name="companyName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="Company name"
                    id="comany-name"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="companyStreetAddress"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="Company street address"
                    id="company-street-address"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>

            <Grid container item spacing={1}>
              <Grid item xs={6}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error?.type}
                      label="City"
                      id="city"
                      size="small"
                      fullWidth
                      {...(error?.type === "required"
                        ? { helperText: "Field is required" }
                        : {})}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error?.type}
                      label="State"
                      id="state"
                      size="small"
                      fullWidth
                      {...(error?.type === "required"
                        ? { helperText: "Field is required" }
                        : {})}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="zipcode"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error?.type}
                      label="Zip"
                      id="zipcode"
                      size="small"
                      fullWidth
                      {...(error?.type === "required"
                        ? { helperText: "Field is required" }
                        : {})}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="Email"
                    id="company-email"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="mainPhoneNumber.value"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="Main phone"
                    id="company-phone"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="secondaryPhone.value"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="Secondary phone"
                    id="company-secondary-phone"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{ textAlign: "center", mt: 3, mb: 2, fontWeight: 600 }}
          >
            Contact person
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12}>
              <Controller
                name="contactPerson.firstName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="First name"
                    id="contact-first-name"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="contactPerson.lastName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="Last name"
                    id="contact-last-name"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="contactPerson.cellPhone.value"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="Personal cell-phone"
                    id="contact-person-cellphone"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="contactPerson.email.value"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={!!error?.type}
                    label="Personal email"
                    id="contact-email"
                    size="small"
                    fullWidth
                    {...(error?.type === "required"
                      ? { helperText: "Field is required" }
                      : {})}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={onCancel}
              sx={{ mr: 1, width: "40%" }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" sx={{ width: "40%" }}>
              Save
            </Button>
          </Grid>
        </form>
      )}
    </Stack>
  );
};

export { VendorProfile };
