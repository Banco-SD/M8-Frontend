"use client";

import { useRouter } from "next/navigation";
import Link from "next/link"; 
import { Box, Paper, TextField, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { authService } from "@/src/services/authService";
import { MuiProvider } from "@/src/lib/mui-provider";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.login(email, password);
      router.push("/bolsa");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MuiProvider>
      <Box
        className="min-h-screen flex items-center justify-center p-6"
        sx={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(34,197,94,0.15), transparent), radial-gradient(1000px 500px at 100% 100%, rgba(59,130,246,0.12), transparent), #0b0f17",
        }}
      >
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4, width: 420 }}>
          <Box className="flex items-center gap-2 mb-6">
            <Typography variant="h4" className="font-bold">
              In<span className="text-emerald-400">Vest</span>
            </Typography>
          </Box>

          <Typography variant="h5" className="font-bold">
            Bem-vindo de volta
          </Typography>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
            Acesse sua conta para operar
          </Typography>

   
          <form onSubmit={submit} className="flex flex-col gap-5">
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" color="success" size="large" disabled={loading}>
              {loading ? "Autenticando..." : "Entrar"}
            </Button>
          </form>

   
          <Box className="mt-8 text-center">
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-emerald-400 font-semibold hover:underline">
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </MuiProvider>
  );
}