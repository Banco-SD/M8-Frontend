"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Paper, TextField, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { authService } from "@/src/services/authService";
import { MuiProvider } from "@/src/lib/mui-provider";

export default function CadastroPage() {
  const router = useRouter();
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apenasNumeros = (valor: string) => valor.replace(/\D/g, "");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      
      const payloadValido = {
        nome,
        email,
        senha: password,
        cpf: apenasNumeros(cpf),         
        telefone: apenasNumeros(telefone), 
        dataNascimento,
      };

      await authService.register(payloadValido);
      router.push("/login");
    } catch (err: any) {
    
      if (err.response?.data?.errors) {
      
        const mensagensValidacao = err.response.data.errors
          .map((e: any) => e.message || e.defaultMessage)
          .join(" | ");
        setError(`Erro de Validação: ${mensagensValidacao}`);
      } else if (err.response?.data?.mensagem) {
        setError(err.response.data.mensagem);
      } else {
        setError(err.message || "Erro ao criar conta. Verifique as regras dos campos.");
      }
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
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4, width: 500 }}>
          <Typography variant="h4" className="font-bold" sx={{ mb: 2 }}>
              In<span className="text-emerald-400">Vest</span>
        </Typography>

          <Typography variant="h5" className="font-bold text-white">
            Criar Conta
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
            Preencha seus dados para começar a investir
          </Typography>

          <form onSubmit={submit} className="flex flex-col gap-5">
            <TextField label="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth required />
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
            
            <div className="grid grid-cols-2 gap-4">
              <TextField 
                label="CPF" 
                value={cpf} 
                onChange={(e) => setCpf(e.target.value)} 
                placeholder="Apenas números ou válido" 
                fullWidth 
                required 
              />
              <TextField 
                label="Telefone (DDD + Número)" 
                value={telefone} 
                onChange={(e) => setTelefone(e.target.value)} 
                placeholder="Ex: 81999998888" 
                fullWidth 
                required 
              />
            </div>

            <TextField 
              label="Data de Nascimento" 
              type="date" 
              value={dataNascimento} 
              onChange={(e) => setDataNascimento(e.target.value)} 
              fullWidth 
              required 
              slotProps={{ inputLabel: { shrink: true } }}
            />
            
            <TextField 
              label="Senha" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              helperText="Mínimo 8 caracteres, com Letra Maiúscula, Número e Caractere Especial"
              slotProps={{ formHelperText: { sx: { color: "rgba(255,255,255,0.4)" } } }}
              fullWidth 
              required 
            />
            
            {error && <Alert severity="error" sx={{ width: "100%" }}>{error}</Alert>}
            
            <Button type="submit" variant="contained" color="secondary" size="large" disabled={loading} sx={{ mt: 1 }}>
              {loading ? "Criando conta..." : "Cadastrar"}
            </Button>
          </form>

          <Box className="mt-6 text-center">
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
              Já tem uma conta?{" "}
              <Link href="/login" className="text-blue-400 font-semibold hover:underline">
                Faça login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </MuiProvider>
  );
}