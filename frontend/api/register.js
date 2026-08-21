export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method Not Allowed" });
  }

  try {
    let data = req.body || {};

    if (typeof data === "string") {
      data = Object.fromEntries(new URLSearchParams(data));
    }

    const response = await fetch(
      "https://ai-debt-relief-platform-1-flex.onrender.com/register_json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const contentType = response.headers.get("content-type") || "application/json";
    const text = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", contentType);
    return res.send(text);
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "Backend unavailable",
      error: error.message,
    });
  }
}
