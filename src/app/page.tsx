"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchPortfolioData } from "@/src/services/api"; 

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const carregarDados = async () => {
      try {
  
        const authDataString = localStorage.getItem("authData");
        if (!authDataString) {
          setError("Usuário não autenticado. Faça o login.");
          setLoading(false);
          return;
        }

        const authData = JSON.parse(authDataString);
        const usuarioId = authData.usuario?.id || authData.usuario?.email; 

        if (!usuarioId) {
          setError("ID do usuário não encontrado na sessão.");
          setLoading(false);
          return;
        }

        const dados = await fetchPortfolioData(usuarioId);
        setPortfolioData(dados);
      } catch (err) {
        setError("Não foi possível carregar o portfólio. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const chartOptions = {
    chart: {
      type: "area" as const,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#3b82f6"], 
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" as const, width: 2 },
    xaxis: {
      type: "datetime" as const,
      categories: portfolioData?.evolucao_patrimonial?.map((item: any) => item.data) || [],
    },
    yaxis: {
      labels: {
        formatter: (value: number) =>
          new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value),
      },
    },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    },
  };

  const chartSeries = [
    {
      name: "Patrimônio",
      data: portfolioData?.evolucao_patrimonial?.map((item: any) => item.valor) || [],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-500">
        <p className="text-xl font-semibold mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Cabeçalho */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meu Portfólio</h1>
            <p className="text-gray-500 mt-1">Acompanhe a evolução dos seus ativos</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Patrimônio Total</p>
            <p className="text-4xl font-bold text-blue-600">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                portfolioData?.patrimonio_total_atualizado || 0
              )}
            </p>
          </div>
        </header>

        {/* Gráfico Principal */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Evolução Patrimonial</h2>
          <div className="h-[400px]">
            {portfolioData?.evolucao_patrimonial?.length > 0 ? (
              <Chart options={chartOptions} series={chartSeries} type="area" height="100%" />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Nenhum histórico de transação para gerar o gráfico.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}