"use client";

import { useState } from "react";
import { Bot, Briefcase, Package, Users, Clock, MessageSquare, Globe, Mail, ChevronRight, BarChart3, Layers, Cpu } from "lucide-react";
import Chat from "./Chat";

const SERVICES = [
  { name: "Team Augmentation", desc: "Skilled professionals to fill expertise gaps" },
  { name: "Offshore Development", desc: "Global talent to reduce costs" },
  { name: "Software Development", desc: "Custom solutions for your business" },
  { name: "Product Design", desc: "User-centric, innovative solutions" },
  { name: "MVP Development", desc: "Validate market potential fast" },
  { name: "Odoo Implementation", desc: "Streamlined ERP integration" },
];

const PRODUCTS = [
  { name: "bquick ERP", desc: "Accounting & business management for non-accountants", icon: BarChart3, color: "#3b82f6" },
  { name: "bquick CRM", desc: "Customer relationship management", icon: Users, color: "#8b5cf6" },
  { name: "bquick SCM", desc: "Supply chain management software", icon: Layers, color: "#10b981" },
  { name: "bquick HRM", desc: "Human resource management system", icon: Cpu, color: "#f59e0b" },
];

type View = "chat" | "services" | "products" | "about";

const NAV = [
  { id: "chat" as View, label: "AI Assistant", icon: Bot },
  { id: "services" as View, label: "Services", icon: Briefcase },
  { id: "products" as View, label: "Products", icon: Package },
  { id: "about" as View, label: "About", icon: Globe },
];

const STATS = [
  { label: "Services", value: "6", icon: Briefcase, color: "#3b82f6" },
  { label: "Products", value: "4", icon: Package, color: "#8b5cf6" },
  { label: "Years Experience", value: "10+", icon: Clock, color: "#10b981" },
  { label: "Global Clients", value: "100+", icon: Users, color: "#f59e0b" },
];

export default function Dashboard() {
  const [view, setView] = useState<View>("chat");

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f1117", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{
        width: "240px",
        flexShrink: 0,
        background: "#0d1018",
        borderRight: "1px solid #1e2533",
        display: "flex",
        flexDirection: "column",
        padding: "0",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #1e2533" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "9px",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Bot size={20} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "15px", color: "#f1f5f9" }}>BinaryQuest</div>
              <div style={{ fontSize: "11px", color: "#475569", marginTop: "1px" }}>AI Dashboard</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          <div style={{ fontSize: "11px", color: "#374151", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 10px 8px" }}>
            Navigation
          </div>
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = view === id;
            return (
              <button
                key={id}
                onClick={() => setView(id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "9px 12px", borderRadius: "8px", border: "none",
                  background: active ? "#1a1f2e" : "transparent",
                  color: active ? "#93c5fd" : "#64748b",
                  cursor: "pointer", fontSize: "14px", fontWeight: active ? 600 : 400,
                  marginBottom: "2px", transition: "all 0.15s",
                  outline: "none",
                  borderLeft: active ? "2px solid #3b82f6" : "2px solid transparent",
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Contact footer */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #1e2533" }}>
          <a
            href="https://www.binaryquest.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              fontSize: "12px", color: "#475569", textDecoration: "none",
              padding: "8px 10px", borderRadius: "7px",
              background: "#0f1117", border: "1px solid #1e2533",
            }}
          >
            <Globe size={13} />
            binaryquest.com
            <ChevronRight size={12} style={{ marginLeft: "auto" }} />
          </a>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <header style={{
          padding: "0 28px",
          height: "60px",
          borderBottom: "1px solid #1e2533",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          background: "#0d1018",
        }}>
          <div>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9" }}>
              {NAV.find(n => n.id === view)?.label}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <a
              href="mailto:info@binaryquest.com"
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 14px", borderRadius: "8px",
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                color: "white", textDecoration: "none", fontSize: "13px", fontWeight: 500,
              }}
            >
              <Mail size={14} />
              Contact Us
            </a>
          </div>
        </header>

        {/* Stats bar */}
        <div style={{
          display: "flex", gap: "16px", padding: "16px 28px",
          borderBottom: "1px solid #1e2533", flexShrink: 0,
          background: "#0f1117",
        }}>
          {STATS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{
              flex: 1, padding: "14px 18px", borderRadius: "10px",
              background: "#0d1018", border: "1px solid #1e2533",
              display: "flex", alignItems: "center", gap: "14px",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={18} color={color} />
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.1 }}>{value}</div>
                <div style={{ fontSize: "12px", color: "#475569", marginTop: "2px" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          {view === "chat" && <Chat />}
          {view === "services" && <ServicesView />}
          {view === "products" && <ProductsView />}
          {view === "about" && <AboutView />}
        </div>
      </div>
    </div>
  );
}

function ServicesView() {
  return (
    <div style={{ padding: "28px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9", marginBottom: "6px" }}>Our Services</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Comprehensive solutions tailored to your business needs.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {SERVICES.map(({ name, desc }, i) => {
          const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
          const color = colors[i % colors.length];
          return (
            <div key={name} style={{
              padding: "20px", borderRadius: "12px",
              background: "#0d1018", border: "1px solid #1e2533",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "14px",
              }}>
                <Briefcase size={20} color={color} />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9", marginBottom: "6px" }}>{name}</div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductsView() {
  return (
    <div style={{ padding: "28px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9", marginBottom: "6px" }}>bquick Product Suite</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Proprietary software built for simplicity and scale.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {PRODUCTS.map(({ name, desc, icon: Icon, color }) => (
          <div key={name} style={{
            padding: "24px", borderRadius: "12px",
            background: "#0d1018", border: "1px solid #1e2533",
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "16px",
            }}>
              <Icon size={24} color={color} />
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>{name}</div>
            <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
            <div style={{
              marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "12px", color: color, fontWeight: 500,
            }}>
              Learn more <ChevronRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <div style={{ padding: "28px", overflowY: "auto", height: "100%" }}>
      <div style={{ maxWidth: "700px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9", marginBottom: "6px" }}>About BinaryQuest</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Trusted by 100+ companies worldwide since 2013.</p>
        </div>

        <div style={{
          padding: "24px", borderRadius: "12px",
          background: "#0d1018", border: "1px solid #1e2533", marginBottom: "16px",
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9", marginBottom: "10px" }}>Who We Are</h3>
          <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7 }}>
            BinaryQuest is a software company with 10+ years of experience, trusted by 100+ companies globally.
            As an official Odoo Partner in Bangladesh, we specialize in custom solutions designed to meet unique
            business requirements — from team augmentation to full-scale ERP implementation.
          </p>
        </div>

        <div style={{
          padding: "24px", borderRadius: "12px",
          background: "#0d1018", border: "1px solid #1e2533", marginBottom: "16px",
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9", marginBottom: "10px" }}>Our Strengths</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              "Official Odoo Partner with deep customization expertise",
              "User-centric design — products are accessible and easy to use",
              "Flexible engagement models for projects of all sizes",
              "Focus on efficiency, sustainable growth, and ROI for clients",
            ].map(s => (
              <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#94a3b8" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", marginTop: "7px", flexShrink: 0 }} />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          padding: "24px", borderRadius: "12px",
          background: "#0d1018", border: "1px solid #1e2533",
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9", marginBottom: "14px" }}>Contact</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a href="https://www.binaryquest.com" target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: "10px",
              fontSize: "14px", color: "#3b82f6", textDecoration: "none",
            }}>
              <Globe size={16} /> www.binaryquest.com
            </a>
            <a href="mailto:info@binaryquest.com" style={{
              display: "flex", alignItems: "center", gap: "10px",
              fontSize: "14px", color: "#3b82f6", textDecoration: "none",
            }}>
              <Mail size={16} /> info@binaryquest.com
            </a>
            <a href="https://www.binaryquest.com/contact" target="_blank" rel="noreferrer" style={{
              marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 18px", borderRadius: "9px",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              color: "white", textDecoration: "none", fontSize: "14px", fontWeight: 500,
            }}>
              <MessageSquare size={15} /> Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
