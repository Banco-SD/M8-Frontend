import { Paper, Typography, Button, Box, Skeleton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { walletService, type WalletBalance } from "@/src/services/walletService";
import { brl } from "@/src/lib/format";

export function WalletCard() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const authDataString = localStorage.getItem("authData");
    if (authDataString) {
      const authData = JSON.parse(authDataString);
      const userId = authData.usuario?.id;
      
      if (userId) {
        walletService.getBalance(userId).then(setBalance).catch(() => setError(true));
      }
    }
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background:
          "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.08) 60%, rgba(17,24,39,0.9) 100%)",
        borderColor: "rgba(34,197,94,0.25)",
        borderRadius: 3,
      }}
      className="h-full"
    >
      <Box className="flex items-center justify-between">
        <Typography variant="body2" className="!text-white/70">
          Saldo Disponível
        </Typography>
        <VisibilityIcon
          fontSize="small"
          className="cursor-pointer text-white/50 hover:text-white"
          onClick={() => setShow((s) => !s)}
        />
      </Box>

      {error ? (
        <Typography color="error" className="mt-4">
          Wallet Service indisponível
        </Typography>
      ) : !balance ? (
        <Skeleton variant="text" width={220} height={56} />
      ) : (
        <Typography variant="h4" className="!mt-2 !font-bold">
          {show ? brl(balance.available) : "R$ ••••••"}
        </Typography>
      )}

      <Stack direction="row" spacing={3} className="!mt-4">
        <Box>
          <Typography variant="caption" className="!text-white/50">Investido</Typography>
          <Typography variant="body2" className="!font-semibold">
            {balance ? brl(balance.invested) : "—"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" className="!text-white/50">Bloqueado</Typography>
          <Typography variant="body2" className="!font-semibold">
            {balance ? brl(balance.blocked) : "—"}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1.5} className="!mt-5">
        <Button variant="contained" color="success" startIcon={<ArrowUpwardIcon />} size="small">
          Depositar
        </Button>
        <Button
          variant="outlined"
          startIcon={<SwapHorizIcon />}
          size="small"
          sx={{ borderColor: "rgba(255,255,255,0.15)", color: "white" }}
        >
          Transferir
        </Button>
      </Stack>
    </Paper>
  );
}