import { useState } from "react";
import { useFarmerLang } from "../../context/FarmerLangContext";
import "./FarmingAssistant.css";

export default function FarmingAssistant() {
  const { lang } = useFarmerLang();
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const text = {
    en: {
      title: "AI Farming Assistant",
      placeholder: "Ask about crops, fertilizer, disease...",
      send: "Ask"
    },
    hi: {
      title: "कृषि सहायक",
      placeholder: "फसल, खाद, बीमारी के बारे में पूछें...",
      send: "पूछें"
    },
    mr: {
      title: "शेती सहाय्यक",
      placeholder: "पीक, खत, रोग याबद्दल विचारा...",
      send: "विचारा"
    }
  };

  /* 🌱 EXISTING CROP DATA — UNCHANGED */
  const cropData = { /* SAME AS YOUR CODE */ };

  const getLocalAnswer = (q) => {
    q = q.toLowerCase();
    for (let crop in cropData) {
      if (q.includes(crop)) {
        return (
          "🌱 " +
          crop.toUpperCase() +
          "\n\n" +
          cropData[crop][lang].map(l => "• " + l).join("\n")
        );
      }
    }
    return null;
  };

  const askGemini = async (question) => {
    const res = await fetch("https://farmer-shop-backend.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `You are an agriculture expert. Answer simply:\n${question}`
      })
    });

    const data = await res.json();
    return data.reply;
  };

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setReply("");

    // 1️⃣ Try local rule-based
    const local = getLocalAnswer(query);
    if (local) {
      setReply(local);
      setLoading(false);
      return;
    }

    // 2️⃣ Gemini fallback
    try {
      const aiReply = await askGemini(query);
      setReply("🤖 " + aiReply);
    } catch {
      setReply("AI service unavailable");
    }

    setLoading(false);
  };

  return (
    <div className="ai-wrapper">
      <h1>🤖 {text[lang].title}</h1>

      <div className="ai-box">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={text[lang].placeholder}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : text[lang].send}
        </button>
      </div>

      {reply && (
        <div className="ai-reply" style={{ whiteSpace: "pre-line" }}>
          {reply}
        </div>
      )}
    </div>
  );
}
