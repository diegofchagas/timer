import { Scroll, Timer } from "@phosphor-icons/react";
import { HeaderContainer } from "./styles";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderContainer>
      TIMER
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={28} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          {" "}
          <Scroll size={28} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
