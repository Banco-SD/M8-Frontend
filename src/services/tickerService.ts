import { api } from "./api";

export interface TickerQuote {
  symbol: string;
  price: number;
  changePct: number;
  direction: "up" | "down" | "flat";
}

export const tickerService = {
  // Busca o array inteiro do GET /quotes do Módulo 6 e adapta para o front
  async getQuotes(): Promise<TickerQuote[]> {
    const res = await api.get("/quotes");
    return res.data.map((q: any) => ({
      symbol: q.symbol,
      price: q.price,
      changePct: q.variation,
      direction: q.variation > 0 ? "up" : q.variation < 0 ? "down" : "flat",
    }));
  }
};