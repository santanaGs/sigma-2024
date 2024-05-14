import React from 'react';
import NavBar from '@/components/NavBar'; // Verifique o caminho correto
import './Estilo.css'; // Verifique o caminho correto


const Prontuario: React.FC = () => {
  return (
    <body>
      <div className="Main">
        <NavBar />
        <div className="inputs">
          {/* LADO ESQUERDO */}
          <div>
            <h1 className="text1">Ouvir suas dúvidas, críticas ou sugestões é muito importante<br/>para nós. Utilize o formulário abaixo para enviar sua mensagem!</h1><br></br>
            <form>
              <div>
                <label htmlFor="nome" id="nomeid">Nome:</label>
                <input required type="text" id="nomebar" placeholder="Por favor, colocar seu nome completo" />
                <label htmlFor="email" id="emailid">E-mail:</label>
                <input required type="email" id="emailbar" placeholder="Por favor, colocar seu e-mail completo" />
              </div>
              <label htmlFor="mensagem" id="mensagemid">Conte para nós sua dúvida:</label>
              <textarea id="mensagembar" placeholder="Deixe sua mensagem" rows={5} />

              <button type="submit" className="btEnviar">Enviar</button>
              
            </form>
          </div>
          {/* LADO DIREITO */}
          <div className= "container2">
            <strong><h2 className="titlecontainer2">Fale Conosco</h2><br></br>
            <p>(11) 99999-9999<br></br>Segunda á Sexta das 08h ás 19h</p><br></br>
            <p><u>Suporte@Suporte.com.br</u></p><br></br>
            <p><u>Endereço:</u> R. Espírito Santo, 277 - Santo<br></br> Antônio, São Caetano do Sul - SP,<br></br> 09530-905 </p><br></br>
            <p>Veja no mapa:</p></strong>
            <iframe src="https://www.youtube.com/embed/uXWycyeTeCs" width={500} height={330} ></iframe>
          </div>
          
        </div>
      </div>
      
    </body>
    
  );
};

export default Prontuario;
