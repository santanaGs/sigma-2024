import { consultas } from "@/global/data";
import { TableBody, TableHead, TableHeadItem, TableS, Td, Tr } from "./styles";
import { Container } from "../../styles";
import Modal from "../Modal";
import { useState } from "react";

const Table: React.FC = () => {
  // variables
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidCard, setCidCard] = useState("");
  const [sangue, setSangue] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // rendering
  return (
    <>
      <TableS>
        <TableHead>
          <TableHeadItem>Nome</TableHeadItem>
          <TableHeadItem>Data</TableHeadItem>
          <TableHeadItem>Horário</TableHeadItem>
        </TableHead>
        <TableBody>
          {consultas.map((item: any, index: number) => {
            return (
              <Tr
                key={index}
                onClick={() => {
                  setModalVisible(true);
                  setNome(item.nome);
                  setIdade(item.idade);
                  setCidCard(item.cidCard);
                  setSangue(item.sangue);
                  setEndereco(item.logradouro);
                  setNumero(item.numero);
                }}
              >
                <Td>{item.nome}</Td>
                <Td>{item.data}</Td>
                <Td>{item.horario}</Td>
              </Tr>
            );
          })}
        </TableBody>
      </TableS>
      {modalVisible && (
        <Modal
          onClick={() => {
            setModalVisible(!modalVisible);
          }}
          nome={nome}
          idade={idade}
          cidCard={cidCard}
          sangue={sangue}
          endereco={endereco}
          numero={numero}
        />
      )}
    </>
  );
};

export default Table;
