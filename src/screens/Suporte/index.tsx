import React, { useState } from 'react';
import NavBar from '@/components/NavBar'; // Verifique o caminho correto
import axios from 'axios'; // Importando o Axios
import './Estilo.css'; // Verifique o caminho correto

const Prontuario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Estado para mensagens de erro

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar email
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Resetar mensagens de erro
    setError('');

    // Validação dos campos
    if (!nome || !email || !mensagem) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true); // Ativa o loading

    try {
      const response = await axios.post('http://localhost:8080/backend/contato', {
        name: nome,
        email: email,
        message: mensagem,
      });

      // Tratar a resposta
      if (response.data.erro) {
        alert(response.data.mensagem);
      } else {
        alert('Mensagem enviada com sucesso!');
        // Limpa os campos após o envio
        setNome('');
        setEmail('');
        setMensagem('');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  return (
    <div className="Main">
      <NavBar />
      <div className="inputs">
        {/* LADO ESQUERDO */}
        <div>
          <h1 className="text1">Ouvir suas dúvidas, críticas ou sugestões é muito importante<br />para nós. Utilize o formulário abaixo para enviar sua mensagem!</h1><br />
          {error && <div className="error">{error}</div>} {/* Exibe mensagem de erro se houver */}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nome" id="nomeid">Nome:</label>
              <input
                required
                type="text"
                id="nomebar"
                placeholder="Por favor, colocar seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)} // Atualiza o estado
              />
              <label htmlFor="email" id="emailid">E-mail:</label>
              <input
                required
                type="email"
                id="emailbar"
                placeholder="Por favor, colocar seu e-mail completo"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
              />
            </div>
            <label htmlFor="mensagem" id="mensagemid">Conte para nós sua dúvida:</label>
            <textarea
              id="mensagembar"
              placeholder="Deixe sua mensagem"
              rows={5}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)} // Atualiza o estado
            />
            <button type="submit" className="btEnviar" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'} {/* Exibe o texto baseado no loading */}
            </button>
          </form>
        </div>
        {/* LADO DIREITO */}
        <div className="container2">
          <strong>
            <h2 className="titlecontainer2">Fale Conosco</h2><br />
            <p>(11) 99999-9999<br />Segunda á Sexta das 08h ás 19h</p><br />
            <p><u>suporte@sigma.com.br</u></p><br />
            <p><u>Endereço:</u> R. Espírito Santo, 277 - Santo<br /> Antônio, São Caetano do Sul - SP,<br /> 09530-905 </p><br />
            <p>Veja no mapa:</p>
          </strong>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.5902148622004!2d-46.57582742548516!3d-23.619025063711646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5ceb39423fb7%3A0x543148b172f303c8!2sR.%20Esp%C3%ADrito%20Santo%2C%20277%20-%20Santo%20Ant%C3%B4nio%2C%20S%C3%A3o%20Caetano%20do%20Sul%20-%20SP%2C%2009530-700!5e0!3m2!1spt-BR!2sbr!4v1728429465171!5m2!1spt-BR!2sbr" width="500" height="300" style={{border: 'none'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          {/* <iframe src="https://www.youtube.com/embed/uXWycyeTeCs" width={500} height={330}></iframe> */}
        </div>
      </div>
    </div>
  );
};

export default Prontuario;
