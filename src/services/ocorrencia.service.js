import api from "./api";

export const ocorrenciaService = {
  // Lista ocorrências (Cidadão vê as dele, Admin vê todas)
  async listar() {
    const response = await api.get("/ocorrencias");
    return response.data;
  },

  // Cria nova ocorrência com suporte a FormData (para imagens)
  async criar(dados) {
    const formData = new FormData();
    Object.keys(dados).forEach((key) => formData.append(key, dados[key]));

    const response = await api.post("/ocorrencias", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
