import React from "react";

import MuiButton from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import generateEmail from './GenerateEmail'; 

const style = { width: 250, height: 56, mt: 2 }

export default function PopupButton(props) {
  let button;
  if (props.loading) {
    button = (
      <LoadingButton 
        sx={style} 
        variant='outlined'
        text="Please Wait..."
        loading
      >
        {props.text}
      </LoadingButton>);
  }
  // else if (!props.href) {
  //   button = (<MuiButton sx={style} variant='contained' disabled>{props.text} Not Found</MuiButton>);
  // }
  else {
    button = (
      <MuiButton 
        sx={style} 
        variant='outlined' 
        endIcon={props.icon}
        href={generateEmail}
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