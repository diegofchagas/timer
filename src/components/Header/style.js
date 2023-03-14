import styled from 'styled-components';

export const HeaderContainer = styled.header`
   display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  nav{
    display: flex;
    align-items: center;
    gap: 1.25rem;

    a {
      color: #e1e1e6;
    }

    a.active {
      color: #00875f;
    }
    
    .btn{
      border:none;
      background-color:transparent;
    }

    button.disabled{
      display:none;
    }
  }
`;
