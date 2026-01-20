
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function convertToCorporateSpeak(complaint: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一个懂职场、有温度、幽默感爆棚的“树洞AI”。
      用户刚经历了一场职场委屈/压力，内容是： "${complaint}"
      
      请按以下格式回复（确保字里行间流露出对用户的坚定支持）：
      
      1. 【同频共情】：先站在用户这一边，狠狠地替用户出气，用温暖又毒舌的语言承认TA的辛苦（例如：“这老板脑子是被甲方踢了吗？”）。
      2. 【优雅黑话】：将原意转化为三句不同风格的“职场黑话”：
         - 官方专业体
         - 阴阳怪气高情商体
         - 极度冷漠专业感体
      
      要求：加入高级感 emoji（✨, ☕️, 🕊️, 🥂, 💎, 🕯️, ⌛）。
      输出格式：一段温暖的共情文字，接着是三个黑话选项。不要输出多余的引导词。`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text || "翻译官开小差了，请再试一次。✨";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "在忙着写周报，稍后再帮你翻译。⌛";
  }
}

export async function getPsychologicalFirstAid(context: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一个温暖、专业的女性职场心理医生。
      用户刚经历了一次不愉快的职场事件： "${context}"
      请从认知重构的角度，给出一个温暖的、支持性的三步走心理急救建议：
      1. 情绪接纳。
      2. 视角转换。
      3. 微小行动建议。
      字数控制在200字以内，语气要温柔、坚定，适当使用温暖的表情符号。`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "我在这里陪着你，深呼吸一下。🕊️";
  } catch (error) {
    return "深呼吸，我是你的坚强后盾。🕯️";
  }
}

export async function getRandomDailyAffirmation(): Promise<{ text: string; author: string }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "为职场女性生成一条基于心理学逻辑的每日成长肯定语。包含一句金句和一个作者。输出JSON格式。",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            author: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"text": "你已经足够优秀，无需证明给任何人看。✨", "author": "HerSpace"}');
  } catch (error) {
    return { text: "今天的你，依然是无可替代的星辰。💎", author: "HerSpace" };
  }
}

export async function generateAiAvatar(jobTitle: string, mood: string): Promise<string | null> {
  try {
    const prompt = `Create a minimalist, healing-style artistic profile avatar for a professional woman. 
    Subject description: A female ${jobTitle || 'professional'}, mood is ${mood || 'calm'}. 
    Style: Soft pastel colors, clean lines, flat design or soft watercolor texture. 
    Aesthetic: Modern, elegant, inspiring. 
    No text, no realistic photos, artistic representation only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("AI Avatar Generation Error:", error);
    return null;
  }
}
