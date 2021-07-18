import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Service from "../service/service";
import Check from "../components/Check";
import Book from "../components/Book";

export default function Booking() {
  let [hotel, setHotel] = useState(Object);
  let [state, setState] = useState("add");

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
        padding: "5%",
      },
      header: {
        padding: "1vh",
        height: "7vh",
      },
    })
  );

  const classes = useStyles();

  const getHotel = () => {
    Service.getHotel()
      .then((item: any) => {
        setHotel(item);
      })
      .catch((error) => {
        console.log("getHotel - ERROR:", error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getHotel();
    }, 1000);
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.header}>
          <Typography variant="h5" color="inherit">
            {hotel.hotel && `Book your room at ${hotel.hotel}`}
          </Typography>
        </Toolbar>
      </AppBar>
      {hotel ? (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem
                  button
                  onClick={(event) => {
                    setState("add");
                  }}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Booking" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    setState("check");
                  }}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Check Booking" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              {hotel.hotel &&
                (state === "add" ? <Book {...hotel} /> : <Check {...hotel} />)}
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>:( We are having problem to connect the server.</div>
      )}
    </div>
  );
}
