export const callAI = async (
  messages: { role: string; content: string }[],
  maxTokens: number = 4000
): Promise<string | null> => {
  try {
    const response = await fetch("https://mujfx.jojapi.net/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-JoJAPI-Key":
          "***REMOVED***",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4",
        messages,
      }),
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch (error) {
    console.error("AI call failed:", error);
    return null;
  }
};
