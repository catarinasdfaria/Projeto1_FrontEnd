import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import googleAPIKey from "../../Scripts/GoogleAPI";
import { auth } from "../../Config/firebase";

const genAI = new GoogleGenerativeAI(googleAPIKey);

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

function MainContent() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gemini-flash-latest");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const userEmail = auth.currentUser?.email || "Guest";

  const saveChatHistory = (promptText: string, responseText: string, durationMs: number) => {
    const historyEntry = {
      prompt: promptText,
      response: responseText,
      model,
      timestamp: new Date().toISOString(),
      durationMs,
    };

    const raw = localStorage.getItem('chatHistory');
    const existing = raw ? JSON.parse(raw) : [];
    const nextHistory = [historyEntry, ...existing].slice(0, 50);
    localStorage.setItem('chatHistory', JSON.stringify(nextHistory));
  };

  const saveApiMetrics = (durationMs: number) => {
    const raw = localStorage.getItem('apiMetrics');
    const previous = raw
      ? JSON.parse(raw)
      : { totalCount: 0, totalTime: 0, history: [] };

    const nextMetrics = {
      totalCount: previous.totalCount + 1,
      totalTime: previous.totalTime + durationMs,
      history: [
        { label: `Req ${previous.totalCount + 1}`, duration: durationMs },
        ...previous.history,
      ].slice(0, 12),
    };

    localStorage.setItem('apiMetrics', JSON.stringify(nextMetrics));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    const startTime = performance.now();

    try {
      const modelLoader = genAI.getGenerativeModel({ model });
      const result = await modelLoader.generateContent(trimmed);
      const assistantText = result.response.text();
      setMessages((prev) => [...prev, { role: "assistant", text: assistantText }]);
      const durationMs = Math.round(performance.now() - startTime);
      saveChatHistory(trimmed, assistantText, durationMs);
      saveApiMetrics(durationMs);
    } catch (error) {
      const errorMessage = "Error generating content. Check your API key.";
      setMessages((prev) => [...prev, { role: "assistant", text: errorMessage }]);
      console.error(error);
      const durationMs = Math.round(performance.now() - startTime);
      saveChatHistory(trimmed, errorMessage, durationMs);
      saveApiMetrics(durationMs);
    }

    setLoading(false);
  }

  return (
    <div className="chat-screen d-flex flex-column h-100">
      <div className="chat-header mb-4">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div>
            <h2>Hello, {userEmail}</h2>
            <p className="text-muted">Your AI chat is ready. Ask anything and I will answer on the left.</p>
          </div>
          <div className="model-selector">
            <label htmlFor="modelSelect" className="form-label mb-1">Modelo de IA</label>
            <select
              id="modelSelect"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="form-select"
              disabled={loading}
            >
              <option value="gemini-flash-latest">Gemini Flash</option>
              <option value="gemini-pro">Gemini Pro</option>
              <option value="gemini-ultra">Gemini Ultra</option>
            </select>
          </div>
        </div>
      </div>

      <div className="chat-window flex-grow-1 mb-4">
        {messages.length === 0 ? (
          <div className="chat-placeholder">
            <p>Start the conversation by asking a question below.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message d-flex ${message.role === "user" ? "justify-content-end" : "justify-content-start"}`}
            >
              <div className={`chat-bubble ${message.role}`}>
                {message.text}
              </div>
            </div>
          ))
        )}
      </div>

      <form className="chat-input-row d-flex align-items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Pergunte qualquer coisa"
          className="form-control me-2"
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
          {loading ? "Thinking..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default MainContent;

