import NavBar from "@/components/NavBar";
import { ChartDiv, Container } from "./styles";
import Chart from 'chart.js/auto';
import { useEffect } from "react";

const Main: React.FC = () => {
  useEffect(() => {
    async function loadCharts() {
      const acquisitionsData = [
        { month: 'Janeiro', count: 10 },
        { month: 'Fevereiro', count: 20 },
        { month: 'Março', count: 15 },
        { month: 'Abril', count: 25 },
        { month: 'Maio', count: 22 },
        { month: 'Junho', count: 30 },
        { month: 'Julho', count: 28 },
        { month: 'Agosto', count: 35 },
        { month: 'Setembro', count: 40 },
        { month: 'Outubro', count: 30 },
        { month: 'Novembro', count: 20 },
        { month: 'Dezembro', count: 25 },
      ];

      const acquisitionsElement = document.getElementById('acquisitions') as HTMLCanvasElement;
      if (acquisitionsElement) {
        new Chart(acquisitionsElement, {
          type: 'line',
          data: {
            labels: acquisitionsData.map(row => row.month),
            datasets: [
              {
                label: 'Evolução das Consultas por Mês',
                data: acquisitionsData.map(row => row.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }

      // Gráfico doughnut: Atendimentos
      const doughnutData = {
        labels: ['Entrega de Exames', 'Consultas', 'Pedido de Receita'],
        datasets: [{
          label: 'Atendimentos',
          data: [30, 50, 20],
          backgroundColor: ['#0B4A50', '#1F696D', '#44A09F'],
          borderColor: ['#0B4A50', '#1F696D', '#44A09F'],
          borderWidth: 1,
        }]
      };

      const atendimentosElement = document.getElementById('atendimentos') as HTMLCanvasElement;
      if (atendimentosElement) {
        new Chart(atendimentosElement, {
          type: 'doughnut',
          data: doughnutData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                  }
                }
              }
            },
          },
        });
      }

      // Gráfico de barras: Ranking de Consultas por Especialidades
      const specialtiesData = [
        { specialty: 'Ortopedia', count: 40 },
        { specialty: 'Clínico Geral', count: 70 },
        { specialty: 'Otorrinolaringologia', count: 30 },
        { specialty: 'Psiquiatra', count: 20 },
        { specialty: 'Oncológica', count: 50 },
        { specialty: 'Oftalmologia', count: 60 },
        { specialty: 'Urologia', count: 10 },
      ];

      const specialtiesElement = document.getElementById('specialties') as HTMLCanvasElement;
      if (specialtiesElement) {
        new Chart(specialtiesElement, {
          type: 'bar',
          data: {
            labels: specialtiesData.map(row => row.specialty),
            datasets: [
              {
                label: 'Consultas por Especialidade',
                data: specialtiesData.map(row => row.count),
                backgroundColor: '#0B4A50',
                borderColor: '#0B4A50',
                borderWidth: 1,
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }

      const attendanceData = {
        labels: ['Compareceram', 'Não Compareceram'],
        datasets: [{
          label: 'Comparecimento às Consultas',
          data: [80, 20],
          backgroundColor: ['#1F696D', '#1F696D'],
          borderColor: ['#1F696D', '#1F696D'],
          borderWidth: 1,
        }]
      };

      const attendanceElement = document.getElementById('attendance') as HTMLCanvasElement;
      if (attendanceElement) {
        new Chart(attendanceElement, {
          type: 'bar',
          data: attendanceData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    loadCharts();
  }, []);

  return (
    <Container>
      <NavBar />
      <ChartDiv>
        <div style={{ width: 550 }}>
          <canvas id="acquisitions"></canvas>
        </div>
        <div style={{ width: 550 }}>
          <canvas id="atendimentos"></canvas>
        </div>
        <div style={{ width: 550 }}>
          <canvas id="specialties"></canvas>
        </div>
        <div style={{ width: 550 }}>
          <canvas id="attendance"></canvas>
        </div>
      </ChartDiv>
    </Container>
  );
};

export default Main;
