import InputS from "@/components/Input";
import { Background, Content, Submit } from "./styles";

import logo from "@/assets/logo.svg";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  // Navigation
  const navigate = useNavigate();
  // Variables
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [error, setError] = useState<boolean>(false);

  // Function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o recarregamento da página

    if (email === "sigma@uscsonline.com.br" && password === "123@sigma") {
      setError(false);
      navigate("/dashboard");
    } else {
      setError(true);
    }
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
        {error && <p>Senha ou usuario incorreto</p>}
        <Submit type="submit" value={`Acessar`} />
      </Content>
    </Background>
  );
};

export default Login;
