import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import CotangemRegressiva from "../../components/ContagemRegressiva";
import { AuthContext } from "../../components/UseContext/AuthContext";
import { Play, HandPalm } from "phosphor-react";
import {
  Container,
  ContainerForm,
  InputName,
  InputTime,
  ButtonStop,
  ButtonPlay,
} from "./style";

const Home = () => {
  const [time, setTime] = useState(0);
  const [input, setInput] = useState("");
  const [minutesQuantidade, setMinutesQuantidade] = useState(0);
  const [secondsQuantidade, setSecondsQuantidade] = useState(0);
  const [projetoTime, setProjetoTime] = useState("");

  const { criarProjeto, projetos, status, setStatus, setProjetos } =
    useContext(AuthContext);
  const geradorID = () => Math.round(Math.random() * 1000);

  const startTimer = () => {
    setTime(parseInt(input) * 60);
    if(input === ''){
      alert('Favor informar nome do projeto e o tempo destinado')
      setTime(0);
    }
    setStatus("Em andamento");
    setInput("");
    setProjetoTime("");
    criarProjeto({
      id: geradorID(),
      projetoTime,
      input,
      status: "Em andamento",
    });
  };

  useEffect(() => {
    let timer;
    if (status === "Em andamento") {
      timer = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    if (status === "Em andamento" && time === 0) {
      setStatus("parou");
    }

    return () => clearInterval(timer);
  }, [status, time]);

  useEffect(() => {
    setMinutesQuantidade(Math.floor(time / 60));
    setSecondsQuantidade(time % 60);
  }, [time]);

  useEffect(() => {
    const projetosConcluidos = projetos.map(({ status, ...resto }) =>
      time === 0 ? { ...resto, status: "Concluido" } : { ...resto, status }
    );
    setProjetos(projetosConcluidos);
  }, [time]);

  const pauseClock = () => {
    const projetosExecucao = projetos
      .filter(({ status }) => status === "Em andamento")
      .map((projeto) => ({
        ...projeto,
        status:
          projeto.status === "Em andamento" ? "Interrompido" : projeto.status,
      }));
    setProjetos(projetosExecucao);
    setStatus("Interrompido");
  };

  return (
    <Container>
      <Header status={status} />

      <ContainerForm>
        <label htmlFor="">Vou trabalhar em</label>
        <InputName
          type="text"
          placeholder="De um nome para seu projeto"
          value={projetoTime}
          onChange={({ target }) => setProjetoTime(target.value)}
        />

        <label htmlFor="">durante</label>
        <InputTime
          type="number"
          placeholder="00"
          min="0"
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <span>minutos.</span>
      </ContainerForm>

      <div className="contagem">
        <CotangemRegressiva
          minutos={minutesQuantidade}
          segundos={secondsQuantidade}
        />
      </div>

      {time > 0 ? (
        <ButtonStop onClick={pauseClock}>
          {" "}
          <HandPalm /> Interromper
        </ButtonStop>
      ) : (
        <ButtonPlay onClick={startTimer}>
          {" "}
          <Play /> Começar
        </ButtonPlay>
      )}
    </Container>
  );
};

export default Home;
