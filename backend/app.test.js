const request = require("supertest");
const app = require("./App");
const Doctor = require("./models/user");
const Specialty = require("./models/specialty");
const Patient = require("./models/patient");
const Enquiry = require("./models/enquiry");

describe("API Endpoints", () => {
    let token;

    test("POST /backend/cadastrar - deve cadastrar um novo médico", async () => {
        const response = await request(app)
            .post("/backend/cadastrar")
            .send({
                name: "New Doctor",
                email: "newdoctor@example.com",
                password: "123456",
                crm: "654321",
                especialidade: 1,
                endereco: "Rua teste, 0"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("erro", false);

        const login = await request(app)
            .post("/backend/login")
            .send({ email: "newdoctor@example.com", password: "123456" });

        token = login._body.token;
    });

    test("GET /backend - deve retornar a lista de médicos", async () => {
        const response = await request(app).get("/backend").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("erro", false);
        expect(response.body.mensagem.doctors).toBeInstanceOf(Array);
    });



    test("POST /backend/cadastrar/paciente - deve cadastrar um novo paciente", async () => {
        const response = await request(app)
            .post("/backend/cadastrar/paciente")
            .send({
                name: "Maria da Silva",
                data_nascimento: "18/05/1985", 
                genero: "feminino",
                cpf: "321.321.321-50",
                cid_card: "000.000.001",
                endereco: "Rua das Flores, 123, Centro, São Paulo, SP",
                email: "newpatient@example.com",
                password: "123456",
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("erro", false);
    });

    test("GET /backend/consultas/:id - deve retornar as consultas de um médico", async () => {
        const enquiryResponse = await request(app)
            .post("/backend/consulta")
            .set("Authorization", `Bearer ${token}`)
            .send({
                medico: 1,
                paciente: 1,
                data: new Date(),
            });

        const response = await request(app).get("/backend/consultas/1").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("erro", false);
        expect(response.body.dados).toBeInstanceOf(Array);
    });
});
