export async function POST(req) {
  const body = await req.json();
  const { idea, type } = body;

  // Mock AI logic (safe for now)
  const features = [];

  if (idea.toLowerCase().includes("offline")) {
    features.push("Offline support");
  }
  if (idea.toLowerCase().includes("music")) {
    features.push("Music playback");
  }
  if (idea.toLowerCase().includes("dark")) {
    features.push("Dark mode");
  }

  return new Response(JSON.stringify({
    status: "App blueprint generated",
    type,
    features,
    template: "pwa-basic"
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
