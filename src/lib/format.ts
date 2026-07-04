export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;