export async function POST(req) {
  const { idea, type, features } = await req.json();

  // ---- AI CALLS ----
  async function callOpenAI(prompt) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  }

  async function callGemini(prompt) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  }

  async function callGroq(prompt) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  }

  // ---- MULTI-AI VOTING ----
  const prompt = `
  Convert this app idea into a SAFE Play Store feature list.
  App idea: ${idea}
  User selected features: ${features.join(", ")}
  Only return feature names.
  `;

  const [openai, gemini, groq] = await Promise.all([
    callOpenAI(prompt),
    callGemini(prompt),
    callGroq(prompt)
  ]);

  // ---- SIMPLE MERGE ----
  const merged = `${openai}\n${gemini}\n${groq}`;
  const finalFeatures = [...new Set(
    merged
      .split(/[\n,]/)
      .map(f => f.trim())
      .filter(Boolean)
  )];

  return new Response(JSON.stringify({
    status: "✅ AI App Blueprint Ready",
    type,
    features: finalFeatures,
    template: "pwa-basic"
  }), {
    headers: { "Content-Type": "application/json" }
  });
}

const categorized = {
  core: [],
  ui: [],
  system: [],
  monetization: []
};

finalFeatures.forEach(f => {
  if (/offline|storage|update|rollback/i.test(f)) categorized.system.push(f);
  else if (/dark|background|theme|ui/i.test(f)) categorized.ui.push(f);
  else if (/ads|iap|purchase/i.test(f)) categorized.monetization.push(f);
  else categorized.core.push(f);
});

return new Response(JSON.stringify({
  status: "✅ App Blueprint Generated",
  appType: type,
  features: categorized,
  nextSteps: [
    "Generate full app code",
    "Enable PWA + APK export",
    "Add versioning & updates",
    "Prepare Play Store listing"
  ]
}), {
  headers: { "Content-Type": "application/json" }
});

