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
  resumo?: string; // Adicionando o campo resumo
}

const Table: React.FC = () => {
  // Variáveis de estado
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidCard, setCidCard] = useState("");
  const [sangue, setSangue] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [resumo, setResumo] = useState(""); // Estado para o resumo
  const [modalVisible, setModalVisible] = useState(false);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        if (!id || !token) {
          setError('ID ou token não encontrado');
          return;
        }

        const response = await axios.get(`http://localhost:8080/backend/consultas/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setConsultas(response.data.dados);
      } catch (err: any) {
        setError(`Erro ao buscar consultas: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultas();
  }, []);

  const formatDateToPtBr = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
  
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  };

  const updateResumo = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('Token não encontrado');
        return;
      }

      await axios.put(`http://localhost:8080/backend/consulta/${id}/resumo`, { resumo }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setConsultas(prev => prev.map(consulta => 
        consulta.id === id ? { ...consulta, resumo } : consulta
      ));

      alert("Resumo atualizado com sucesso!");

      setModalVisible(false);
    } catch (err: any) {
      setError(`Erro ao atualizar resumo: ${err.message}`);
    }
  };

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
                setIdade("21 anos"); 
                setCidCard(item.patient.cid_card);
                setSangue("A+"); 
                setEndereco(item.patient.logradouro); 
                setNumero("0"); 
                setResumo(item.resumo || ""); 
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
          resumo={resumo}
          onResumoChange={(newResumo) => setResumo(newResumo)} 
          onUpdateResumo={() => {
            const consultaId = consultas.find(c => c.patient.name === nome)?.id; 
            if (consultaId) updateResumo(consultaId); 
          }}
        />
      )}
    </>
  );
};

export default Table;
