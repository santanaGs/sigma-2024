import { TableBody, TableHead, TableHeadItem, TableS, Td, Tr } from "./styles";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import axios from "axios";

// Definição do tipo Consulta
interface Consulta {
  id: string;
  patient: {
    name: string;
    idade: string;      // Adicionando idade
    cid_card: string;   // Renomeando para corresponder à resposta da API
    sangue: string;
    logradouro: string; // Adicionando logradouro se necessário
    numero: string;
  };
  data: string;
  horario: string;
}

const Table: React.FC = () => {
  // Variáveis de estado
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidCard, setCidCard] = useState("");
  const [sangue, setSangue] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função assíncrona para buscar consultas
    const fetchConsultas = async () => {
      try {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        if (!id || !token) {
          setError('ID ou token não encontrado');
          return;
        }

        const response = await axios.get(`http://35.193.111.224/backend/consultas/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setConsultas(response.data.dados); // Certifique-se de que isso está correto
      } catch (err: any) {
        setError(`Erro ao buscar consultas: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Chamar a função assíncrona
    fetchConsultas();
  }, []);

  // Função para formatar a data para o padrão pt-BR (dia, mês e ano)
  const formatDateToPtBr = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
  
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  };

  // Renderização condicional
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <TableS>
        <TableHead>
          <TableHeadItem>Nome</TableHeadItem>
          <TableHeadItem>Data</TableHeadItem>
          <TableHeadItem>Horário</TableHeadItem>
        </TableHead>
        <TableBody>
          {consultas.map((item) => (
            <Tr
              key={item.id}
              onClick={() => {
                setModalVisible(true);
                setNome(item.patient.name);
                setIdade(item.patient.idade);
                setCidCard(item.patient.cid_card);
                setSangue(item.patient.sangue);
                setEndereco(item.patient.logradouro); // Se necessário
                setNumero(item.patient.numero);
              }}
            >
              <Td>{item.patient.name}</Td>
              <Td>{formatDateToPtBr(item.data)}</Td>
              <Td>{item.horario}</Td>
            </Tr>
          ))}
        </TableBody>
      </TableS>
      {modalVisible && (
        <Modal
          onClick={() => setModalVisible(false)}
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
