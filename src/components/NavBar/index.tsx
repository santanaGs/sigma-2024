import { useNavigate } from "react-router-dom";
import {
  ButtonTitle,
  DivS,
  MedicoDiv,
  MedicoImagem,
  MedicoName,
  Nav,
  NavButton,
} from "./styles";

import agenda from "@/assets/agenda.svg";
import prontuario from "@/assets/prontuario.svg";
import dash from "@/assets/dash.svg";
import suporte from "@/assets/suporte.svg";

const NavBar: React.FC = () => {
  // Navigate
  const navigate = useNavigate();

  // Rendering
  return (
    <DivS>
      <MedicoDiv>
        <MedicoImagem src="https://imgur.com/51muZcN.png" alt="" />
        <MedicoName>Drª Maicon</MedicoName>
      </MedicoDiv>
      <Nav>
        <NavButton
          onClick={() => {
            navigate("/agenda");
          }}
        >
          <img src={agenda} alt="" />
          <ButtonTitle>Agenda</ButtonTitle>
        </NavButton>
        <NavButton
          onClick={() => {
            navigate("/prontuario");
          }}
        >
          <img src={prontuario} alt="" />
          <ButtonTitle>Prontúario</ButtonTitle>
        </NavButton>
        <NavButton
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src={dash} alt="" />
          <ButtonTitle>Dashboard</ButtonTitle>
        </NavButton>
        <NavButton
          onClick={() => {
            navigate("/suporte");
          }}
        >
          <img src={suporte} alt="" />
          <ButtonTitle>Suporte</ButtonTitle>
        </NavButton>
      </Nav>
    </DivS>
  );
};

export default NavBar;
