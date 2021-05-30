/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";

export default function MyButton(props) {
  return (
    <Button variant="outlined" color="primary" onClick={props.onClick}>
      {props.content}
    </Button>
  );
}
