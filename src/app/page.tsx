"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/carteira"); 
  }, [router]);

  return (
    <Box className="min-h-screen bg-[#0b0f17] flex items-center justify-center">
      <CircularProgress color="success" />
    </Box>
  );
}