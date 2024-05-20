import InputS from "@/components/Input";
import { Background, Content, Submit } from "./styles";

import logo from "@/assets/logo.svg";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Login/styles";
import ClipLoader from "react-spinners/ClipLoader";

const Register: React.FC = () => {
  // Navigation
  const navigate = useNavigate();
  // Variables
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [endereco, setEndereco] = useState<string | null>();
  const [crm, setCrm] = useState<string | null>();
  const [name, setName] = useState<string | null>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o recarregamento da página
    setLoading(true3);
    axios
      .post("http://localhost:8080/cadastrar", {
        name: name,
        email: email,
        password: password,
        crm: crm,
        endereco: endereco,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.resquest);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Background>
      <Content onSubmit={handleSubmit}>
        <img src={logo} alt="" />
        <InputS
          placeholder="Nome"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <InputS
          placeholder="CRM"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCrm(e.target.value);
          }}
        />
        <InputS
          placeholder="Email"
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <InputS
          placeholder="Endereço"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEndereco(e.target.value);
          }}
        />
        <InputS
          password
          placeholder="Senha"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />

        {error && <p>Senha ou usuario incorreto</p>}
        {loading ? (
          <Loading>
            <ClipLoader color={"#0b4a50"} loading={true} size={50} />
          </Loading>
        ) : (
          <Submit type="submit" value={`Acessar`} />
        )}
      </Content>
    </Background>
  );
};

export default Register;
