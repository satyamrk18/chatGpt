async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    document.getElementById("chat-box").innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("/api/chat", { // Make sure it's the correct API route
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        console.log("Frontend Response:", data); // Debugging log

        if (data.reply) {
            document.getElementById("chat-box").innerHTML += `<p><strong>ChatGPT:</strong> ${data.reply}</p>`;
        } else {
            document.getElementById("chat-box").innerHTML += `<p><strong>ChatGPT:</strong> Error in response</p>`;
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        document.getElementById("chat-box").innerHTML += `<p><strong>ChatGPT:</strong> Failed to fetch response</p>`;
    }
}
