"use server";

import { GenerativeModel } from "@google/generative-ai";

export async function generateBlogContent(title, category = "", tags = []) {
  if (!title || title.trim().length === 0) {
    throw new Error("Title is required to generate blog content.");
  }
  const model = GenerativeModel.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
Write a comprehensive blog post with the title: "${title}"

${category ? `Category: ${category}` : ""}
${tags.length > 0 ? `Tags: ${tags.join(", ")}` : ""}

Requirements:
- Write engaging, informative content that matches the title
- Use proper HTML formatting with headers (h2, h3), paragraphs, lists, and emphasis
- Include 3-5 main sections with clear subheadings
- Write in a conversational yet professional tone
- Make it approximately 800-1200 words
- Include practical insights, examples, or actionable advice where relevant
- Use <h2> for main sections and <h3> for subsections
- Use <p> tags for paragraphs
- Use <ul> and <li> for bullet points when appropriate
- Use <strong> and <em> for emphasis
- Ensure the content is original and valuable to readers

Do not include the title in the content as it will be added separately.
Start directly with the introduction paragraph.
`;

const result = await model.generate(prompt);
const response = await result.response();
const content = response.text;
}

export async function improveContent(
  currentContent,
  improvementType = "enhance"
) {}
