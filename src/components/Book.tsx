import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Typography,
  Select,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function Book(item: any) {
  const [booked, setBooked] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({
    name: "",
    room: "",
    schedule: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
    }-${new Date().getDate()}`,
  });

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
        padding: "5%",
      },
      textField: {
        width: "100%",
      },
    })
  );

  const classes = useStyles();

  const useFormControls = () => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({} as any);
    const validate: any = (fieldValues = values) => {
      let temp: any = { ...errors };

      if ("name" in fieldValues)
        temp.name = fieldValues.name.length < 3 ? "Name too short." : "";

      if ("room" in fieldValues)
        temp.room = fieldValues.room ? "" : "Select the room.";

      if ("schedule" in fieldValues) {
        temp.schedule = fieldValues.schedule ? "" : "Date to book is required.";
      }

      setErrors({
        ...temp,
      });
    };
    const handleInputValue = (e: any) => {
      setBooked(false);
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
      setInitialFormValues({
        ...values,
        [name]: value,
      });
      validate({ [name]: value });
    };
    const handleFormSubmit = async (e: any) => {
      e.preventDefault();
      if (formIsValid()) {
        setBooked(true);
      }
    };
    const formIsValid: any = (fieldValues = values) => {
      const isValid =
        fieldValues.name &&
        fieldValues.room &&
        fieldValues.schedule &&
        Object.values(errors).every((x) => x === "");

      return isValid;
    };
    return {
      handleInputValue,
      handleFormSubmit,
      formIsValid,
      errors,
    };
  };

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls();

  return (
    <div>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography component="h5">Schedule your booking:</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Name"
              className={classes.textField}
              onChange={handleInputValue}
              value={initialFormValues.name || ""}
              name="name"
              {...(errors["name"] && {
                error: true,
                helperText: errors["name"],
              })}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Select
              label="Select"
              name="room"
              className={classes.textField}
              onChange={handleInputValue}
              value={initialFormValues.room || ""}
              {...(errors["room"] && { error: true })}
            >
              {item &&
                item.rooms.map((option: number) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Schedule to"
              type="date"
              name="schedule"
              onChange={handleInputValue}
              value={initialFormValues.schedule || ""}
              className={classes.textField}
              {...(errors["schedule"] && {
                error: true,
                helperText: errors["schedule"],
              })}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!formIsValid()}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            {booked && (
              <Alert variant="filled" severity="success">
                {`${initialFormValues.name} everything set to room ${initialFormValues.room} at ${initialFormValues.schedule} !`}
              </Alert>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Book;
