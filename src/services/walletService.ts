import { api } from "./api";

/*export interface WalletBalance {
  available: number;
  invested: number;
  blocked: number;
}

export const walletService = {
  async getBalance(userId: string): Promise<WalletBalance> {
    const res = await api.get(`/wallet/${userId}`);
    return {
      available: Number(res.data.saldo),
      invested: 0, 
      blocked: 0,
    };
  }
};*/

export interface WalletBalance {
  available: number;
  invested: number;
  blocked: number;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  type: string;
  amount: number;
}

export const walletService = {
  async getBalance(userId: string): Promise<WalletBalance> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          available: 24580.75,
          invested: 187430.22,
          blocked: 1200.00,
        });
      }, 800);
    });
  },

  async getStatement(userId: string): Promise<Transaction[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "tx1", description: "Depósito via PIX", date: "2026-07-01", type: "DEPOSIT", amount: 5000.00 },
          { id: "tx2", description: "Compra 100 PETR4", date: "2026-07-02", type: "TRADE", amount: -3820.00 },
          { id: "tx3", description: "TED enviada", date: "2026-06-28", type: "TRANSFER", amount: -1200.00 },
          { id: "tx4", description: "Venda 50 VALE3", date: "2026-06-25", type: "TRADE", amount: 3410.00 }
        ]);
      }, 1200);
    });
  }
};