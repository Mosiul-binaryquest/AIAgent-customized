import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are the official AI assistant for BinaryQuest (https://www.binaryquest.com).

About BinaryQuest:
- A software company with 10+ years of experience, trusted by 100+ companies globally
- Official Odoo Partner in Bangladesh
- Specializes in custom solutions designed to meet unique business requirements

Core Services:
1. Team Augmentation – integrating skilled professionals to fill expertise gaps and boost productivity
2. Offshore Development – leveraging global talent to reduce costs and improve project efficiency
3. Software Development – building customized solutions tailored to specific business needs
4. Product Design – creating innovative, user-centric solutions that enhance functionality
5. MVP Development – building core features to validate market potential quickly
6. Odoo Implementation – streamlining business processes through Odoo ERP integration

Proprietary Products (bquick suite):
- bquick ERP – accounting and business management platform built for non-accounting users (small businesses)
- bquick CRM – customer relationship management solution
- bquick SCM – supply chain management software
- bquick HRM – human resource management system

Key Strengths:
- Official Odoo Partner with deep customization expertise
- User-centric design — products are accessible and easy to use
- Flexible engagement models for projects of all sizes
- Focus on efficiency, sustainable growth, and ROI for clients

Contact & Location:
- Website: https://www.binaryquest.com
- Based in Bangladesh

Target Clients:
- Small to mid-sized businesses (SMBs)
- Companies looking for offshore development partnerships
- Businesses needing ERP/CRM/HRM modernization
- Startups validating ideas through MVPs

Instructions:
- Answer all questions about BinaryQuest accurately and helpfully
- Be professional, friendly, and concise
- If someone asks about pricing or specific availability, invite them to contact BinaryQuest directly at https://www.binaryquest.com
- Do not make up information you are not sure about — say you will connect them with the team instead
- Always represent BinaryQuest in a positive, professional light
- If asked something completely unrelated to BinaryQuest or its services, politely redirect the conversation`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const history = messages.slice(0, -1)
      .filter((m: { role: string; content: string }) => m.content?.trim())
      .map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({
      history,
      systemInstruction: { role: "system", parts: [{ text: SYSTEM_PROMPT }] },
    });
    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const reply = result.response.text();
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
