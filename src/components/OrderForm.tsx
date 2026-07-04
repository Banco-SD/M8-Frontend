import { Paper, Typography, TextField, Button, Box, ToggleButtonGroup, ToggleButton, Alert } from "@mui/material";
import { useState } from "react";
import { brokerageService } from "@/src/services/brokerageService";

export function OrderForm() {
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [symbol, setSymbol] = useState("PETR4");
  const [qty, setQty] = useState("100");
  const [price, setPrice] = useState("38.20");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await brokerageService.placeOrder({
        symbol,
        quantity: Number(qty),
        price: Number(price),
        side,
      });
      setMsg(`Ordem ${res.orderId} ${res.status.toLowerCase()}`);
    } catch {
      setMsg("Brokerage Service indisponível");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }} className="h-full">
      <Typography variant="h6">Nova Ordem</Typography>
      <Typography variant="caption" className="!text-white/50">Brokerage Service</Typography>

      <ToggleButtonGroup
        exclusive
        fullWidth
        value={side}
        onChange={(_, v) => v && setSide(v)}
        size="small"
        className="!mt-4"
      >
        <ToggleButton value="BUY" sx={{ "&.Mui-selected": { bgcolor: "rgba(34,197,94,0.2)", color: "#22c55e" } }}>
          Comprar
        </ToggleButton>
        <ToggleButton value="SELL" sx={{ "&.Mui-selected": { bgcolor: "rgba(239,68,68,0.2)", color: "#ef4444" } }}>
          Vender
        </ToggleButton>
      </ToggleButtonGroup>

      <Box className="mt-4 grid gap-3">
        <TextField label="Ativo" size="small" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} />
        <TextField label="Quantidade" size="small" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
        <TextField label="Preço (R$)" size="small" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </Box>

      <Button
        onClick={submit}
        disabled={loading}
        fullWidth
        variant="contained"
        color={side === "BUY" ? "success" : "error"}
        className="!mt-4"
      >
        {loading ? "Enviando..." : `Enviar ordem de ${side === "BUY" ? "compra" : "venda"}`}
      </Button>

      {msg && <Alert severity="info" className="!mt-3">{msg}</Alert>}
    </Paper>
  );
}