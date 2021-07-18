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

function Check(item: any) {
  const [check, setCheck] = useState(0);
  const [initialFormValues, setInitialFormValues] = useState({
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
      setCheck(0);
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
        let { room, schedule } = values;
        checkAvailability(room, schedule);
      }
    };
    const formIsValid: any = (fieldValues = values) => {
      const isValid =
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

  const checkAvailability = (room: string, schedule: string) => {
    if (
      item.bookings.find(
        (item: any) =>
          new Date(item.date).getTime() === new Date(schedule).getTime() &&
          item.room === room
      )
    ) {
      setCheck(2);
    } else {
      setCheck(1);
    }
  };

  return (
    <div>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography component="h5">Check availability:</Typography>
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
          <Grid container item xs={12} md={12}>
            <Grid item xs={3} md={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formIsValid()}
              >
                Check
              </Button>
            </Grid>
            <Grid item xs={8} md={8}>
              {check !== 0 &&
                (check > 1 ? (
                  <Alert variant="filled" severity="error">
                    This date is not available to this room :(
                  </Alert>
                ) : (
                  <Alert variant="filled" severity="success">
                    This date is available to this room :)
                  </Alert>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Check;
