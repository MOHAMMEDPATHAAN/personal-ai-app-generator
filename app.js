async function generate() {
  const idea = document.getElementById("idea").value.trim();
  const type = document.getElementById("type").value;

  if (!idea) {
    alert("Please describe your app idea");
    return;
  }

  const features = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map(cb => cb.value);

  const output = document.getElementById("output");
  output.innerText = "🧠 AI engines working...";

  const res = await fetch("../api/generate.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, type, features })
  });

  const data = await res.json();
  output.innerText = JSON.stringify(data, null, 2);
}
