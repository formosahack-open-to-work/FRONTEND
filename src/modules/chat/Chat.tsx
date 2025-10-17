import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiMessageCircle } from "react-icons/fi";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const Chat: React.FC = () => {
  const token = localStorage.getItem("token");
  console.log(token); // Mover fuera del JSX
  
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hola… estoy aquí contigo. Puedes contarme cómo te sientes, sin juicios, sin prisas.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/chatbot/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: input.trim()
        }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();

      console.log(response);
      
      // Ajuste para la estructura de respuesta de tu backend
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.success ? data.data : data.message || "Lo siento, no pude procesar tu mensaje.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error al comunicarse con el chatbot:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Lo siento mucho… no pude procesar tu mensaje ahora, pero sigo aquí. ¿Quieres intentarlo de nuevo?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header minimalista */}
      <div className="bg-[#141A45] text-white p-4 m-0 flex items-center gap-3 rounded-t-2xl">
        <div className="bg-white/20 p-2 rounded-full">
          <FiMessageCircle className="text-xl" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">Conversa con SerenAI</h1>
          <p className="text-xs opacity-80">Estoy contigo, paso a paso</p>
        </div>
      </div>

      {/* Área de chat más compacta */}
      <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 text-base leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#141A45] text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm max-w-[85%]">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input fijo en la parte inferior */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe lo que sientes…"
              className="flex-1 border border-gray-300 rounded-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#141A45]/40 focus:border-transparent text-gray-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`bg-[#141A45] text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-90 transition-all shadow-md ${
                !input.trim() || isLoading
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
              aria-label="Enviar mensaje"
            >
              <FiSend className="text-lg" />
            </button>
          </form>
          <p className="text-xs text-center text-gray-500 mt-3">
            Este espacio es seguro y confidencial. Si necesitas ayuda inmediata,
            contacta a una línea de emergencia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;