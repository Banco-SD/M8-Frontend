"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Box, Paper, Typography, CircularProgress, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { authService } from "@/src/services/authService";
import { MuiProvider } from "@/src/lib/mui-provider";

// Componente isolado para ler a URL (Necessário para o Next.js)
function VerificadorConteudo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"carregando" | "sucesso" | "erro">("carregando");
  const [mensagem, setMensagem] = useState("Validando seu e-mail, aguarde um momento...");

useEffect(() => {
    // Se a pessoa acessar a página sem um token na URL
    if (!token) {
      // setTimeout joga a atualização de estado para o fim da fila, evitando o erro do compilador
      setTimeout(() => {
        setStatus("erro");
        setMensagem("Link de verificação inválido ou ausente.");
      }, 0);
      return;
    }

    const confirmar = async () => {
      try {
        await authService.verificarEmail(token);
        setStatus("sucesso");
        setMensagem("Conta ativada! Você já pode fazer login na InVest.");
        
        // Redireciona para o login após 3 segundos de sucesso
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (err: any) {
        setStatus("erro");
        setMensagem(err.message || "Não foi possível verificar o e-mail. O link pode ter expirado.");
      }
    };

    confirmar();
  }, [token, router]);
     

  return (
    <Paper elevation={0} sx={{ p: 5, borderRadius: 4, width: 420, textAlign: "center" }}>
      <Box className="flex justify-center mb-6">
        {status === "carregando" && <CircularProgress color="secondary" size={60} />}
        {status === "sucesso" && <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />}
        {status === "erro" && <ErrorIcon color="error" sx={{ fontSize: 60 }} />}
      </Box>

      <Typography variant="h5" className="font-bold mb-4">
        {status === "carregando" && "Verificando..."}
        {status === "sucesso" && "E-mail Verificado!"}
        {status === "erro" && "Erro na Verificação"}
      </Typography>

      <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 4 }}>
        {mensagem}
      </Typography>

      {status === "erro" && (
        <Button component={Link} href="/login" variant="contained" color="secondary" fullWidth>
          Voltar para o Login
        </Button>
      )}
    </Paper>
  );
}

// O Next.js exige que qualquer leitura de parâmetros da URL seja envelopada por um <Suspense>
export default function VerificarEmailPage() {
  return (
    <MuiProvider>
      <Box
        className="min-h-screen flex items-center justify-center p-6"
        sx={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(34,197,94,0.15), transparent), radial-gradient(1000px 500px at 100% 100%, rgba(59,130,246,0.12), transparent), #0b0f17",
        }}
      >
        <Suspense fallback={<CircularProgress color="secondary" />}>
          <VerificadorConteudo />
        </Suspense>
      </Box>
    </MuiProvider>
  );
}