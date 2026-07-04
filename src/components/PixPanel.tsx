"use client";

import { Paper, Typography, TextField, Button, Box, Alert } from "@mui/material";
import PixIcon from "@mui/icons-material/Pix";
import { useState } from "react";
import { pixService } from "@/src/services/pixServices";
import { brl } from "@/src/lib/format";

export function PixPanel() {
  const [key, setKey] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState<{ receiptId: string; amount: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    setReceipt(null); 
    try {
      const r = await pixService.sendPix(key, Number(amount));
      setReceipt({ receiptId: r.receiptId, amount: r.amount });
      setKey("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        bgcolor: "rgba(255,255,255,0.02)", 
        border: "1px solid rgba(255,255,255,0.05)" 
      }} 
      className="h-full"
    >
      <Box className="flex items-center gap-2">
        <PixIcon sx={{ color: "#10b981" }} />
        <Typography variant="h6" className="text-white">Transferência PIX</Typography>
      </Box>
      <Typography variant="caption" className="!text-white/50">Payments Service</Typography>

      <Box className="mt-6 grid gap-4">
        <TextField 
          label="Chave PIX (CPF, email, telefone)" 
          size="small" 
          value={key} 
          onChange={(e) => setKey(e.target.value)} 
          disabled={loading}
        />
        <TextField 
          label="Valor (R$)" 
          size="small" 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          disabled={loading}
        />
      </Box>

      <Button
        onClick={send}
        disabled={!key || !amount || loading}
        fullWidth
        variant="contained"
        color="success"
        className="!mt-6"
      >
        {loading ? "Processando..." : "Enviar PIX"}
      </Button>

      {receipt && (
        <Alert severity="success" className="!mt-4">
          Comprovante <strong>{receipt.receiptId}</strong> — {brl(receipt.amount)}
        </Alert>
      )}
    </Paper>
  );
}