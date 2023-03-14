import React from 'react'
import logo from '../../assets/logo.svg'
import { NavLink, useLocation, Link } from "react-router-dom";
import { Timer, Scroll } from "phosphor-react";
import { HeaderContainer } from './style';

const Header = ({status}) => {

 
  const {pathname} = useLocation();
  return (
    <HeaderContainer>
      <img src={logo} alt="logo" />

      <nav>
      <NavLink className={pathname === '/' ? 'active' : ''} to="/">
            <Timer size={30} />
          </NavLink>

          <button className={status ? 'btn' : 'disabled'}>
          <NavLink className={pathname === '/historico' ? 'active' : ''} to="historico">
            <Scroll  size={30}/>
          </NavLink>
          </button>
      </nav>

    </HeaderContainer>
  )
}

export default Header;