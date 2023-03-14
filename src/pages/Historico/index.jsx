import React, { useContext } from "react";
import { format } from "date-fns";
import Header from "../../components/Header";
import { AuthContext } from "../../components/UseContext/AuthContext";
import { Container, ContainerTable, Status } from "./style";

const Historico = () => {
  const { projetos } = useContext(AuthContext);
  console.log(projetos);

  let newDate = new Date();
  return (
    <Container>
      <Header />

      <h1>Meu histórico</h1>

      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((item) => (
              <tr key={item.id}>
                <td>{item.projetoTime}</td>
                <td>{item.input} minutos</td>
                <td>{item ? format(newDate, "dd/MM/yyyy") : ""}</td>
                <td>
                  {item.status === "Interrompido" && (
                    <Status color="#AB222E">Interrompido</Status>
                  )}
                  {item.status === "Em andamento" && (
                    <Status color="#FBA94C">Em andamento</Status>
                  )}
                  {item.status === "Concluido" && (
                    <Status color="#04D361">Concluido</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContainerTable>
    </Container>
  );
};

export default Historico;
