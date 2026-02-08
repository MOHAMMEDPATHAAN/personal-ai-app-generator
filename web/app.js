async function generate() {
  const idea = document.getElementById("idea").value;
  const type = document.getElementById("type").value;

  const features = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map(cb => cb.value);

  document.getElementById("output").innerText = "⏳ AI is thinking...";

  const res = await fetch("../api/generate.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, type, features })
  });

  const data = await res.json();
  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}
