async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  document.getElementById(
    "chat-box"
  ).innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
  document.getElementById("user-input").value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    console.log("Frontend Response:", data); // Debugging

    if (data.reply) {
      document.getElementById(
        "chat-box"
      ).innerHTML += `<p><strong>ChatGPT:</strong> ${data.reply}</p>`;
    } else {
      document.getElementById(
        "chat-box"
      ).innerHTML += `<p><strong>ChatGPT:</strong> No response received</p>`;
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p><strong>ChatGPT:</strong> Error fetching response</p>`;
  }
}
