/* eslint-disable react/prop-types */
import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  text: {
    fontSize: "0.6rem",
  },
}));

export default function NavigationDrawer(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button key="Create Ruleset" onClick={props.onCreateRuleSet}>
          <ListItemIcon>
            <AddCircleIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="secondary" className={classes.text}>
              Create Ruleset
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem
          button
          key="Upload Ruleset"
          color="secondary"
          onClick={props.onUploadRuleSet}
        >
          <ListItemIcon>
            <CloudUploadIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="secondary" className={classes.text}>
              Upload Ruleset
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem
          button
          key="Upload Ruleset"
          color="secondary"
          onClick={props.onShowDocumentation}
        >
          <ListItemIcon>
            <HelpOutlineIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="secondary" className={classes.text}>
              Documentation
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}
