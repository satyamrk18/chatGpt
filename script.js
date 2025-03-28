async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    document.getElementById("chat-box").innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    const response = await fetch("https://your-vercel-project.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    document.getElementById("chat-box").innerHTML += `<p><strong>ChatGPT:</strong> ${data.reply}</p>`;
}
