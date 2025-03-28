export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Missing OpenAI API key" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();
        console.log("ChatGPT API Response:", data); // Debugging

        if (data.choices && data.choices.length > 0) {
            return res.status(200).json({ reply: data.choices[0].message.content });
        } else {
            return res.status(500).json({ error: "Invalid response from OpenAI" });
        }

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: "Failed to fetch response from OpenAI" });
    }
}
