import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, Stack, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export const EditItem = (props) => {
  const { data } = props;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: data.title,
      price: data.price,
      availableIn: data.availableIn,
    },
  });

  const handleFormSubmit = (data) => {
    props.onSubmit(data, props.data._id);
  };

  return (
    <Stack sx={{ border: "1px solid lightgray", padding: 1 }}>
      <Typography sx={{ textAlign: "center" }}>Edit service</Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error?.type}
                  label="Title"
                  id="item-title"
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
              name="price"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error?.type}
                  label="Price"
                  id="item-price"
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
            {[
              { label: "Basic", name: "availableIn.0.basic" },
              { label: "Classic", name: "availableIn.1.classic" },
              { label: "Premium", name: "availableIn.2.premium" },
              { label: "Platinum", name: "availableIn.3.platinum" },
            ].map(({ label, name }) => (
              <Controller
                name={name}
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      {...field}
                      control={<Checkbox name={name} checked={field.value} />}
                      label={label}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    />
                  );
                }}
              />
            ))}
          </Grid>
        </Grid>
        <Grid sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit">
            Update Item
          </Button>
        </Grid>
      </form>
    </Stack>
  );
};
