import {GoogleGenerativeAI} from "@google/generative-ai";
async function enviarParaGemini (blob){
    try {
        /*Chave API Gemini*/
      const apiKey = "AIzaSyAn1kTZvhoruQWsFo-Mpb9NJTbBpP9SXwE";
      /** Convert imagem em blob para Base64*/
      const arrayBuffer = await blob.arrayBuffer();
      const base64String = arrayBufferToBase64(arrayBuffer);
      /**Cria objeto para anexar no body da requisição */
      const imagemPrompt = {
        inlineData: {
            data: base64String,
            mimeType: "image/jpeg",
        }
    }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
          `descreva em pt-BR a imagem `,imagemPrompt]);
      const description = result.response.text().toString();
      return description
    }catch (error) {
        console.error('Erro ao enviar imagem para o Gemini:', error);
      };
}
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
export const geminiServices = {
    enviarParaGemini
}