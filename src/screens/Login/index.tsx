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
      .post("http://localhost:8080/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("name", res.data.user.name);

        navigate("/agenda");
      })
      .catch((err) => {
        console.log(err);
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
