"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What services does BinaryQuest offer?",
  "Tell me about the bquick ERP product",
  "Can BinaryQuest help with Odoo implementation?",
  "How does Team Augmentation work?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || loading) return;

    const updated: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages([...updated, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...updated, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
      }
    } catch {
      setMessages([...updated, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "0 16px",
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 0 16px",
        borderBottom: "1px solid #1e2533",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Bot size={22} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "16px", color: "#f1f5f9" }}>BinaryQuest Assistant</div>
          <div style={{ fontSize: "13px", color: "#64748b" }}>Ask anything about our services & products</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: "40px" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>
              Hi! How can I help?
            </div>
            <div style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px" }}>
              I know everything about BinaryQuest — services, products, and more.
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: "10px 16px",
                    background: "#1a1f2e",
                    border: "1px solid #2d3748",
                    borderRadius: "20px",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "13px",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.borderColor = "#3b82f6";
                    (e.target as HTMLButtonElement).style.color = "#93c5fd";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.borderColor = "#2d3748";
                    (e.target as HTMLButtonElement).style.color = "#94a3b8";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
            }}
          >
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: msg.role === "user" ? "#1e3a5f" : "linear-gradient(135deg, #3b82f6, #6366f1)",
            }}>
              {msg.role === "user"
                ? <User size={16} color="#60a5fa" />
                : <Bot size={16} color="white" />}
            </div>
            <div style={{
              maxWidth: "75%",
              padding: "12px 16px",
              borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
              background: msg.role === "user" ? "#1e3a5f" : "#1a1f2e",
              border: "1px solid",
              borderColor: msg.role === "user" ? "#2563eb33" : "#2d3748",
              fontSize: "14px",
              lineHeight: "1.6",
              color: msg.role === "user" ? "#bfdbfe" : "#e2e8f0",
              whiteSpace: "pre-wrap",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              flexShrink: 0,
            }}>
              <Bot size={16} color="white" />
            </div>
            <div style={{
              padding: "12px 16px",
              background: "#1a1f2e",
              border: "1px solid #2d3748",
              borderRadius: "4px 16px 16px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#64748b",
              fontSize: "14px",
            }}>
              <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
              Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "16px 0 24px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about BinaryQuest..."
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px 16px",
              background: "#1a1f2e",
              border: "1px solid #2d3748",
              borderRadius: "12px",
              color: "#e2e8f0",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#2d3748")}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            style={{
              padding: "12px 16px",
              background: input.trim() && !loading ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#1a1f2e",
              border: "1px solid",
              borderColor: input.trim() && !loading ? "transparent" : "#2d3748",
              borderRadius: "12px",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            <Send size={18} color={input.trim() && !loading ? "white" : "#4a5568"} />
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "12px", color: "#374151" }}>
          Powered by BinaryQuest AI · <a href="https://www.binaryquest.com" target="_blank" style={{ color: "#4b5563", textDecoration: "none" }}>binaryquest.com</a>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
