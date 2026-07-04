/*import { api } from "./api";

export const brokerageService = {
  async placeOrder(order: { symbol: string; quantity: number; price: number; side: "BUY" | "SELL" }) {
    const payload = {
      ticker: order.symbol,
      tipoOrdem: order.side === "BUY" ? "COMPRA" : "VENDA",
      tipoPreco: "LIMITADA", 
      quantidade: order.quantity,
      precoLimite: order.price,
    };
    
    const res = await api.post("/ordens", payload);
    return res.data; 
  }
};*/

export const brokerageService = {
  async placeOrder(order: { symbol: string; quantity: number; price: number; side: "BUY" | "SELL" }) {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
 
          orderId: "77a8-4562-b3fc", 
          status: "RECEBIDA",
          
  
          ticker: order.symbol,
          tipoOrdem: order.side === "BUY" ? "COMPRA" : "VENDA",
          quantidade: order.quantity,
          precoLimite: order.price,
        });
      }, 1500);
    });
  }
};