import React , {Component} from 'react';
import classes from './Drawer.css';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends Component {

  handlerClick = () => {
    this.props.closeMenu()
  }

  renderLinks(links) {
    return links.map ((link, index) => {
      return (
        <li key = {index}>
          <NavLink to = {link.to} exact = {link.exact} activeClassName = {classes.active} onClick = {this.handlerClick}>
            {link.label}
          </NavLink>
        </li>
      )
    })
  }
  render(props){

    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.close);
        }
        
    let links = [ {to : '/' , label : 'Quiz list', exact : true},

                ];

    if (this.props.isAuthenticated) {
      links.push(  {to : '/quiz-creator' , label : 'Create a test', exact : false})
      links.push(  {to : '/logout' , label : 'Log out', exact : false })
    } else {
      links.push( {to : '/auth' , label : 'Authorization', exact : false})
    }



    return(
      <nav className = {cls.join(' ')}>
      <ul>
      {this.renderLinks(links)}
      </ul>
      </nav>
    )
  }
}


export default Drawer;
