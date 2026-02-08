let checkpoints = [];
let currentVersion = 0;

function setDot(id, state) {
  document.getElementById(id).innerText =
    state === "on" ? "🟢" : state === "thinking" ? "🟠" : "🔴";
}

function setAIStatus(color, text) {
  document.getElementById("aiDot").style.background = color;
  document.getElementById("aiText").innerText = text;
}

function simulateAIEngines() {
  setDot("ai-chatgpt", "thinking");
  setDot("ai-gemini", "thinking");
  setDot("ai-deepai", "thinking");
  setDot("ai-mini", "thinking");
}

function finishAIEngines() {
  setDot("ai-chatgpt", "on");
  setDot("ai-gemini", "on");
  setDot("ai-deepai", "on");
  setDot("ai-mini", "on");
}

function fakeAIResponse(input) {
  return {
    aiUsed: [
      "ChatGPT (logic + structure)",
      "Gemini (UI & UX ideas)",
      "DeepAI (feature expansion)",
      "GPT-4.1 mini (code planning)"
    ],
    blueprint: {
      name: "AI Generated App",
      description: input.idea,
      type: input.type,
      features: input.features,
      preview: true,
      apkLocked: true
    },
    aiMessage:
      "Your app blueprint is ready. Review the preview before unlocking APK export."
  };
}

function saveCheckpoint(data) {
  checkpoints.push(JSON.stringify(data, null, 2));
  currentVersion = checkpoints.length - 1;
}

function rollback() {
  if (currentVersion > 0) {
    currentVersion--;
    document.getElementById("output").innerText =
      checkpoints[currentVersion];
    document.getElementById("aiResponse").innerText =
      "Rolled back to previous checkpoint.";
  } else {
    alert("No previous version available");
  }
}

function generate() {
  const idea = document.getElementById("idea").value.trim();
  if (!idea) return alert("Please enter an idea");

  const type = document.getElementById("type").value;
  const features =
    [...document.querySelectorAll("input:checked")].map(i => i.value);

  setAIStatus("orange", "AI generating…");
  simulateAIEngines();

  document.getElementById("aiResponse").innerText =
    "Multiple AI engines are collaborating…";

  setTimeout(() => {
    const result = fakeAIResponse({ idea, type, features });
    saveCheckpoint(result);

    document.getElementById("output").innerText =
      JSON.stringify(result, null, 2);

    document.getElementById("aiResponse").innerText =
      result.aiMessage;

    finishAIEngines();
    setAIStatus("green", "AI completed");
  }, 1500);
}
