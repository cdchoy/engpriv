import React from "react";

import MuiButton from '@mui/material/Button';

const style = { width: 250, height: 56, mt: 2 }

export default function PopupButton(props) {
  let button;
  if (!props.href) {
    button = (<MuiButton sx={style} variant='contained' disabled>{props.text} Not Found</MuiButton>);
  } else {
    button = (
      <MuiButton 
        sx={style} 
        variant='outlined' 
        endIcon={props.icon} 
        onClick={() => handleClick(props.href)}
      >
        {props.text}
      </MuiButton>);
  }
  return button;
}

function handleClick(href) {
  window.open(href);
}