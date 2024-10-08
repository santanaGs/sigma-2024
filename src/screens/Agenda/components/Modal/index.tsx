import {
  BottomDiv,
  Container,
  Content,
  InfosDiv,
  Label,
  ModalS,
  Submit,
  TextArea,
  Title,
} from "./styles";

interface ModalProps {
  nome: string;
  idade: string;
  cidCard: string;
  sangue: string;
  endereco: string;
  numero: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  return (
    <ModalS>
      <Content>
        <Title>Prontuário</Title>
        <Container>
          <InfosDiv>
            <Label>Paciente:</Label>
            <p>{props.nome}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>Idade:</Label>
            <p>{props.idade}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>CID-Card:</Label>
            <p>{props.cidCard}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>Tipo Sanguineo:</Label>
            <p>{props.sangue}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>Endereço:</Label>
            <p>{props.endereco}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>Número:</Label>
            <p>{props.numero}</p>
          </InfosDiv>
        </Container>
        <p>Resumo da consulta:</p>
        <TextArea />
        <BottomDiv>
          <input type="file" name="" id="" />
          <Submit onClick={props.onClick}>Enviar</Submit>
        </BottomDiv>
      </Content>
    </ModalS>
  );
};

export default Modal;
