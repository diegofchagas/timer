import styled from "styled-components";

export const Container = styled.div`
  font-family: "Roboto Mono", sans-serif;
  font-size: 10rem;
  line-height: 8rem;
  color: #e1e1e6;
  display: flex;
  gap: 1rem;
  padding: 1.5rem;

  span {
    background-color: #29292e;
    padding: 2rem 1rem;
    border-radius: 8px;
  }

`;

export const ContainerPontos = styled.div`
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    
`


export const Pontos = styled.div`
      width: 2rem;
      height:2rem;
      background-color:#00875F;
      border-radius: 50%;
`;

export const Importante = styled.div`
    margin: 0 auto;
    width: 22rem;
    background: #09090A;
    padding: .750rem 1rem;
    border-radius: 5px; 


    p{
      font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 140%;
text-align: center;
color: #E1E1E6;
    }
`
