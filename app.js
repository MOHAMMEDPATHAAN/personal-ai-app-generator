let checkpoints = [];
let currentVersion = 0;

function setAIStatus(color, text) {
  document.getElementById("aiDot").style.background = color;
  document.getElementById("aiText").innerText = text;
}

function fakeAIResponse(input) {
  // This simulates AI logic (upgradeable later)
  return {
    blueprint: {
      appName: "Generated App",
      description: input.idea,
      type: input.type,
      features: input.features,
      previewReady: true,
      apkReady: false
    },
    nextSteps: [
      "Preview app in browser",
      "Refine UI & logic",
      "Enable APK export",
      "Prepare Play Store assets"
    ]
  };
}

function saveCheckpoint(data) {
  checkpoints.push(JSON.stringify(data));
  currentVersion = checkpoints.length - 1;
}

function rollback() {
  if (currentVersion > 0) {
    currentVersion--;
    document.getElementById("output").innerText =
      checkpoints[currentVersion];
  } else {
    alert("No older version available");
  }
}

function generate() {
  const idea = document.getElementById("idea").value.trim();
  if (!idea) return alert("Enter your app idea");

  const type = document.getElementById("type").value;
  const features = [...document.querySelectorAll("input:checked")].map(i => i.value);

  setAIStatus("orange", "AI generating...");
  document.getElementById("aiResponse").innerText = "Thinking…";

  setTimeout(() => {
    const aiResult = fakeAIResponse({ idea, type, features });

    saveCheckpoint(aiResult);

    document.getElementById("output").innerText =
      JSON.stringify(aiResult, null, 2);

    document.getElementById("aiResponse").innerText =
      "Blueprint ready ✔ Preview available. APK locked until review.";

    setAIStatus("green", "AI active");
  }, 1200);
}
