import React from 'react';
import classes from './Backdrop.css';

const Backdrop = props =>{
  return(
    props.isOpen ? <div className = {classes.Backdrop} onClick = {props.closeMenu}></div> : null


  )
}


export default Backdrop;
