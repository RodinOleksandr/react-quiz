import React from 'react';
import classes from './MenuToggle.css';

const MenuToggle = props => {
  const cls = [classes.MenuToggle]
  props.isOpen ? cls.push('fa fa-times' , classes.open) : cls.push('fa fa-bars');
  return (
    <i
      className = {cls.join(' ')}
      onClick = {props.onToggle}
    />
  )
}

export default MenuToggle;
