import { TableBody, TableHead, TableHeadItem, TableS, Td, Tr } from "./styles";

const Table: React.FC = () => {
  return (
    <TableS>
      <TableHead>
        <TableHeadItem>Nome</TableHeadItem>
        <TableHeadItem>Data</TableHeadItem>
        <TableHeadItem>Horário</TableHeadItem>
      </TableHead>
      <TableBody>
        <Tr>
          <Td>Paciente 01</Td>
          <Td>01/01/2024</Td>
          <Td>09:50</Td>
        </Tr>
        <Tr>
          <Td>Paciente 02</Td>
          <Td>02/02/2024</Td>
          <Td>09:50</Td>
        </Tr>
        <Tr>
          <Td>Paciente 03</Td>
          <Td>03/03/2024</Td>
          <Td>09:50</Td>
        </Tr>
        <Tr>
          <Td>Paciente 04</Td>
          <Td>04/04/2024</Td>
          <Td>09:50</Td>
        </Tr>
      </TableBody>
    </TableS>
  );
};

export default Table;
