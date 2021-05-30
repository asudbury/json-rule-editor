/* eslint-disable react/prop-types */
import React from "react";
import Alert from "@material-ui/lab/Alert";

export default function MyAlert(props) {
  return (
    <Alert severity={props.type} variant="outlined">
      {props.message}
    </Alert>
  );
}
