import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MuiProvider } from "@/src/lib/mui-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InVest — Home Broker de Investimentos",
  description: "Plataforma unificada de investimentos com cotações, carteira e análise de portfólio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <MuiProvider>
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}