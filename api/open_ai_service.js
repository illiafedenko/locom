import { OPENAI_API, OPENAI_MODEL, OPENAI_API_KEY } from "@env"

// Function to send a request to the OpenAI API
export const getOpenAIResponse = async (prompt) => {
    try {
        const res = await fetch(OPENAI_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`, // Fill your OpenAI key
            },
            body: JSON.stringify({
                max_tokens: 400,
                model: OPENAI_MODEL,
                temperature: 0.8,
                prompt,
            }),
        });
        let data = await res.json().then((json) => {
            return json.choices[0].text;
        });
        return data;
    } catch (error) {
        console.log("ERR:", error);
        return false;
    }
};