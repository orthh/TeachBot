// ChatGptConfig.ts
interface GptConfig {
    AUTHORIZATION: string;
    BEARER: string;
    CHAT_MODEL: string;
    MAX_TOKEN: number;
    STREAM: boolean;
    ROLE: string;
    TEMPERATURE: number;
    MEDIA_TYPE: string;
    CHAT_URL: string;
    KEY: string;
}

const gptconfig: GptConfig = {
    AUTHORIZATION: "Authorization",
    BEARER: "Bearer ",
    CHAT_MODEL: "gpt-4",
    MAX_TOKEN: 400,
    STREAM: false,
    ROLE: "user",
    TEMPERATURE: 0.9,
    MEDIA_TYPE: "application/json; charset=UTF-8",
    CHAT_URL: "https://api.openai.com/v1/chat/completions",
    KEY: process.env.REACT_APP_GPT_KEY || "",
};

export default gptconfig;
