function setAIStatus(color, text) {
  const dot = document.getElementById("aiDot");
  const label = document.getElementById("aiText");
  dot.style.background = color;
  label.innerText = text;
}

async function generate() {
  const idea = document.getElementById("idea").value.trim();
  if (!idea) {
    alert("Please enter your idea");
    return;
  }

  const type = document.getElementById("type").value;
  const features = [...document.querySelectorAll("input:checked")].map(i => i.value);

  setAIStatus("orange", "AI thinking...");
  document.getElementById("output").innerText = "Generating…";

  try {
    const res = await fetch("api/generate.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, type, features })
    });

    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
    setAIStatus("green", "AI active");

  } catch (e) {
    document.getElementById("output").innerText = "AI error";
    setAIStatus("red", "AI offline");
  }
}
