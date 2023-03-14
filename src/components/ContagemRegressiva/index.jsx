import React from "react";
import { Container, Pontos, Importante, ContainerPontos } from "./style";

const CotangemRegressiva = ({minutos,segundos}) => {

  minutos = minutos.toString().padStart(2, "0");
  segundos = segundos.toString().padStart(2, "0");
  
  return (
    <>
      <Container>
        <span>{minutos[0]}</span>
        <span>{minutos[1]}</span>
        <ContainerPontos>
          <Pontos></Pontos>
          <Pontos></Pontos>
          </ContainerPontos>
        <span>{segundos[0]}</span>
        <span>{segundos[1]}</span>
      </Container>

      <Importante>
        <p>Preencha o nome e a duração antes de começar.</p>
      </Importante>
    </>
  );
};

export default CotangemRegressiva;
























// const minutos = minutesQuantidade.toString().padStart(2, "0");
  // const segundos = secondsQuantidade.toString().padStart(2, "0");
