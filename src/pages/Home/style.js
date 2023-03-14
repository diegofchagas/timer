import styled from "styled-components";

export const Container = styled.div`
  background-color: #2f2f33;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;


  .contagem {
    margin: 0 auto;
  }
`;

export const ContainerForm = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
  color: #e1e1e6;
  margin: 0 auto;
`;

export const InputPadrao = styled.input`
  background: transparent;
  height: 2.1rem;
  border: 0;
  border-bottom: 2px solid #7c7c8a;
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: #e1e1e6;

  &:focus {
    outline: none;
    border-color: #7c7c8a;
  }

  &::placeholder {
    color: #7c7c8a;
    font-family: "Roboto", sans-serif;
    font-size: 1.125rem;
  }
`;

export const InputName = styled(InputPadrao)`
  width: 35%;
`;
export const InputTime = styled(InputPadrao)`
  width: 3.5rem;
  text-align: center;
`;

export const Button = styled.button`
  width: 60%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00875f;
  color: #e1e1e6;
  font-family: "Roboto";
  font-size: 1rem;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const ButtonPlay = styled(Button)`
 background: #00875f;
`

export const ButtonStop = styled(Button)`
background: #AB222E;

`