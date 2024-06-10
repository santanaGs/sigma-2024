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
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [endereco, setEndereco] = useState<string | null>(null);
  const [crm, setCrm] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from reloading
    setLoading(true);
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
        setLoading(false);
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.request);
        setError(true);
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

        {loading ? (
          <Loading>
            <ClipLoader color={"#0b4a50"} loading={true} size={30} />
          </Loading>
        ) : (
          <Submit type="submit" value={`Registrar`} />
        )}
      </Content>
    </Background>
  );
};

export default Register;
