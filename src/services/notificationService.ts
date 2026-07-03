import axios from "axios";

export interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export const notificationService = {
  async list(): Promise<Notification[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: "1",
        title: "Ordem Executada",
        body: "Sua compra de 100 PETR4 foi finalizada.",
        createdAt: "Hoje, 10:30",
        read: false,
      },
      {
        id: "2",
        title: "Rebalanceamento",
        body: "Sua carteira desviou 5% da meta ideal.",
        createdAt: "Ontem, 15:45",
        read: true,
      },
    ];
  },
};

