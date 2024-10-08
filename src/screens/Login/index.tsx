import InputS from "@/components/Input";
import {
  Background,
  ButtosContaner,
  Content,
  Forgot,
  Loading,
  Register,
  Submit,
} from "./styles";

import logo from "@/assets/logo.svg";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Login: React.FC = () => {
  // Navigation
  const navigate = useNavigate();
  // Variables
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o recarregamento da página
    setLoading(true);
    axios
      .post("http://35.193.111.224/backend/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log('SUCESSO', res.data);
        localStorage.setItem("id", res.data.doctor.id);
        localStorage.setItem("name", res.data.doctor.name);
        localStorage.setItem("token", res.data.token);

        if (res && res.data) {
          navigate("/agenda");
        }

        return
      })
      .catch((err) => {
        console.log('Erro:', err); // Print the full error object
        if (err.response) {
          console.log('Resposta do servidor:', err.response.data);
          console.log('Status do servidor:', err.response.status);
        } else if (err.request) {
          console.log('Erro na requisição:', err.request);
        } else {
          console.log('Erro ao configurar a requisição:', err.message);
        }
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Rendering
  return (
    <Background>
      <Content onSubmit={handleSubmit}>
        <img src={logo} alt="" />
        <InputS
          password={false}
          placeholder="Email"
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
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
        {error && <p style={{ color: "red" }}>Senha ou usuario incorreto</p>}
        {loading ? (
          <Loading>
            <ClipLoader color={"#0b4a50"} loading={true} size={50} />
          </Loading>
        ) : (
          <Submit type="submit" value={`Acessar`} />
        )}

        <ButtosContaner>
          <Forgot>Esqueci minha senha</Forgot>
          <Register
            onClick={() => {
              navigate("/register");
            }}
          >
            Registrar
          </Register>
        </ButtosContaner>
      </Content>
    </Background>
  );
};

export default Login;
