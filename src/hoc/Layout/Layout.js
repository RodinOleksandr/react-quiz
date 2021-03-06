import React, {Component} from 'react';
import classes from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import {connect} from 'react-redux'


class Layout extends Component{

  state = {
    menu : false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu : !this.state.menu
    })
  }
  render(){

    return(
        <div className = {classes.Layout}>
          <Backdrop isOpen = {this.state.menu} closeMenu = {this.toggleMenuHandler}/>
          <Drawer isOpen = {this.state.menu} closeMenu = {this.toggleMenuHandler} isAuthenticated = {this.props.isAuthenticated} / >
          <MenuToggle
            onToggle = {this.toggleMenuHandler}
            isOpen = {this.state.menu}
            />

          <main >
            {this.props.children}
          </main>
        </div>
    )
  }
}

function mapStateToProps(state){
  return {
    isAuthenticated : !!state.auth.token
  }
}


export default connect(mapStateToProps  )(Layout);
