async function queryGroq(text, language = "English") {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant that explains text in simple words." 
        },
        { 
          role: "user", 
          content: `Simplify and explain the following text in ${language}. 
          Use clear formatting with:
          - Headers and subheaders
          - Bullet points for lists
          - Bold important terms
          - Keep language very simple

          Text: ${text}`
         },
      ],
      max_tokens: 1024
    }),
  });
  
  console.log("Groq API Key:", process.env.GROQ_API_KEY?.slice(0, 8) + "...");
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Groq API error:", response.status, errorText);
    throw new Error(`Groq API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "[Could not simplify this text]";
}

module.exports = queryGroq;



