export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method Not Allowed" });
  }

  try {
    const data =
      typeof req.body === "string"
        ? Object.fromEntries(new URLSearchParams(req.body))
        : req.body || {};

    const body = new URLSearchParams();
    body.append("name", data.name || "");
    body.append("email", data.email || "");
    body.append("password", data.password || "");

    const response = await fetch(
      "https://ai-debt-relief-platform-1-flex.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );

    const text = await response.text();

    res.status(response.status);
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/json"
    );

    return res.send(text);
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "Backend unavailable",
      error: error.message,
    });
  }
}
