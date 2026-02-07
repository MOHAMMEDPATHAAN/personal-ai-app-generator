async function generate() {
  const idea = document.getElementById("idea").value;
  const type = document.getElementById("type").value;

  document.getElementById("output").innerText = "⏳ Generating...";

  const res = await fetch("../api/generate.js", {
    method: "POST",
    body: JSON.stringify({ idea, type })
  });

  const data = await res.json();
  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}
