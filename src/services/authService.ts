import { api } from "./api"; // Importa a instância que criamos acima

export const authService = {
  async login(email: string, senha: string) {
    try {
      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      const authData = response.data;
      localStorage.setItem("authData", JSON.stringify(authData));
      return authData.usuario;
    } catch (error: any) {
      console.error("Erro no login:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
      }
      throw new Error("Serviço temporariamente indisponível.");
    }
  },

  async register(dadosCadastro: any) {
    try {
      const response = await api.post("/usuarios", dadosCadastro);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const mensagensValidacao = error.response.data.errors
          .map((e: any) => e.message || e.defaultMessage)
          .join(" | ");
        throw new Error(`Erro de Validação: ${mensagensValidacao}`);
      }
      if (error.response?.status === 400 || error.response?.status === 409) {
        throw new Error("Verifique os dados informados. CPF ou E-mail já podem estar cadastrados.");
      }
      throw new Error("Serviço de cadastro temporariamente indisponível.");
    }
  },

  async verificarEmail(token: string) {
    try {
      const response = await api.post("/usuarios/verificar-email", { token });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.mensagem || "Ocorreu um erro ao validar o token.");
    }
  },

  getCurrentUser() {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("authData");
    if (!data) return null;
    try {
      return JSON.parse(data).usuario;
    } catch {
      return null;
    }
  },

  logout() {
 
    localStorage.removeItem("authData");
    window.location.href = "/login";
  },
};