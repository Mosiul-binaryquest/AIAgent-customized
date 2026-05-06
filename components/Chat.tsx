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

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code style=\"background:#0f1117;padding:2px 5px;border-radius:4px;font-family:monospace;font-size:12px;\">$1</code>")
    .replace(/^### (.+)$/gm, "<div style=\"font-weight:700;color:#f1f5f9;margin:10px 0 4px;\">$1</div>")
    .replace(/^## (.+)$/gm, "<div style=\"font-weight:700;font-size:15px;color:#f1f5f9;margin:12px 0 6px;\">$1</div>")
    .replace(/^# (.+)$/gm, "<div style=\"font-weight:700;font-size:16px;color:#f1f5f9;margin:14px 0 8px;\">$1</div>")
    .replace(/^\* (.+)$/gm, "<div style=\"display:flex;gap:8px;margin:3px 0;\"><span style=\"color:#3b82f6;margin-top:1px;\">•</span><span>$1</span></div>")
    .replace(/^- (.+)$/gm, "<div style=\"display:flex;gap:8px;margin:3px 0;\"><span style=\"color:#3b82f6;margin-top:1px;\">•</span><span>$1</span></div>")
    .replace(/^\d+\. (.+)$/gm, "<div style=\"margin:3px 0;\">$1</div>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

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
      height: "100%",
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 24px",
    }}>
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
          <div style={{ textAlign: "center", paddingTop: "32px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "14px",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <Bot size={28} color="white" />
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>
              Hi! How can I help you today?
            </div>
            <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "28px" }}>
              Ask me anything about BinaryQuest — services, products, partnerships, and more.
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: "9px 16px",
                    background: "#0d1018",
                    border: "1px solid #2d3748",
                    borderRadius: "20px",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "13px",
                    transition: "all 0.15s",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget).style.borderColor = "#3b82f6";
                    (e.currentTarget).style.color = "#93c5fd";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget).style.borderColor = "#2d3748";
                    (e.currentTarget).style.color = "#94a3b8";
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
              width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: msg.role === "user" ? "#1e3a5f" : "linear-gradient(135deg, #3b82f6, #6366f1)",
            }}>
              {msg.role === "user"
                ? <User size={16} color="#60a5fa" />
                : <Bot size={16} color="white" />}
            </div>
            <div style={{
              maxWidth: "76%",
              padding: "12px 16px",
              borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
              background: msg.role === "user" ? "#1e3a5f" : "#0d1018",
              border: "1px solid",
              borderColor: msg.role === "user" ? "#2563eb33" : "#1e2533",
              fontSize: "14px",
              lineHeight: "1.65",
              color: msg.role === "user" ? "#bfdbfe" : "#e2e8f0",
            }}>
              {msg.role === "assistant" ? (
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
              ) : (
                <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            }}>
              <Bot size={16} color="white" />
            </div>
            <div style={{
              padding: "12px 16px", background: "#0d1018",
              border: "1px solid #1e2533", borderRadius: "4px 16px 16px 16px",
              display: "flex", alignItems: "center", gap: "8px",
              color: "#64748b", fontSize: "14px",
            }}>
              <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
              Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "12px 0 20px", borderTop: "1px solid #1e2533" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about BinaryQuest..."
            disabled={loading}
            style={{
              flex: 1, padding: "12px 16px",
              background: "#0d1018", border: "1px solid #2d3748",
              borderRadius: "12px", color: "#e2e8f0", fontSize: "14px",
              outline: "none", transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#2d3748")}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            style={{
              padding: "12px 16px",
              background: input.trim() && !loading ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "#0d1018",
              border: "1px solid",
              borderColor: input.trim() && !loading ? "transparent" : "#2d3748",
              borderRadius: "12px",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            <Send size={18} color={input.trim() && !loading ? "white" : "#4a5568"} />
          </button>
        </form>
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
