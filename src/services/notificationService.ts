export interface Notification {
  id: string;
  title: string;
  body: string;
  kind: string;
  read: boolean;
}

export const notificationService = {
  async list(): Promise<Notification[]> {
    // Simulando 1 segundo de carregamento
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { 
            id: "1", 
            title: "Depósito PIX Recebido", 
            body: "Você recebeu uma transferência de R$ 5.000,00", 
            kind: "FINANCEIRO", 
            read: false 
          },
          { 
            id: "2", 
            title: "Ordem Executada", 
            body: "Sua compra de 100 PETR4 a R$ 38,20 foi concluída", 
            kind: "ORDEM", 
            read: false 
          },
          { 
            id: "3", 
            title: "Alerta de Rebalanceamento", 
            body: "Atenção! Sua carteira desbalanceou mais de 5% em ITUB4.", 
            kind: "SISTEMA", 
            read: true 
          },
          { 
            id: "4", 
            title: "Bem-vindo à NovaBroker", 
            body: "Seu cadastro foi aprovado e sua conta está ativa.", 
            kind: "CONTA", 
            read: true 
          }
        ]);
      }, 1000);
    });
  }
};