/*import { api } from "./api";

export interface PortfolioData {
  usuario_id: string;
  patrimonio_total_atualizado: number;
  perfil_de_risco: string;
  evolucao_patrimonial: { data: string; valor: number }[];
  recomendacoes: any[];
  ativos: Record<string, { percentual_carteira: number }>;
}

export const portfolioService = {
  async getPortfolio(userId: string): Promise<PortfolioData> {
    const response = await api.get(`/api/portfolio/${userId}`);
    return response.data;
  }
};*/

export interface PortfolioData {
  usuario_id: string;
  patrimonio_total_atualizado: number;
  perfil_de_risco: string;
  evolucao_patrimonial: { data: string; valor: number }[];
  recomendacoes: any[];
  ativos: Record<string, { percentual_carteira: number }>;
}

export const portfolioService = {
  async getPortfolio(userId: string): Promise<PortfolioData> {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          usuario_id: userId,
          patrimonio_total_atualizado: 25430.50,
          perfil_de_risco: "Médio (Moderado)",
          evolucao_patrimonial: [
            { data: "2026-06-25", valor: 24000.00 },
            { data: "2026-06-26", valor: 24250.00 },
            { data: "2026-06-29", valor: 23900.00 },
            { data: "2026-06-30", valor: 24800.00 },
            { data: "2026-07-01", valor: 25100.00 },
            { data: "2026-07-02", valor: 25430.50 }
          ],
          recomendacoes: [],
          ativos: {
            "PETR4": { percentual_carteira: 30.27 },
            "VALE3": { percentual_carteira: 24.38 },
            "WEGE3": { percentual_carteira: 26.54 },
            "ITUB4": { percentual_carteira: 18.81 }
          }
        });
      }, 1200);
    });
  }
};