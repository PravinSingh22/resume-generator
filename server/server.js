const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
const genAI = new GoogleGenerativeAI("AIzaSyA888I4GdBTLoCAubCvGJidOQfE-5-vNFQ");

app.post("/generate-resume", async (req, res) => {
  console.log("req", req);
  const { template, userDetails, style, color, Font, Additionaldetails } =
    req.body;

  const prompt2 = `This details contain overall requirement of user you have to update that in html as per additionalDetails :
  ${Additionaldetails}`;

  const prompt = `Create a professional ATS friendly and stylish resume. Provide the content in HTML format and utilize semantic HTML tags to enhance the meaning and structure of your content. The resume should include the following sections: personal details, summary, education, work experience, and skills. Please ensure the resume is well-structured with proper margins and padding.
  
  Style the resume with a ${style} style and use ${color} as the primary color. The sections should be clearly defined and easy to read. Use appropriate fonts and sizes to make the resume look modern and appealing. Ensure there is sufficient white space and the content is aligned properly.
  
  Use the following font for the resume: ${Font}.
  
  Here are the user details to include:
  ${JSON.stringify(userDetails)}
  
  Format the resume with:
  - Margins: 1 inch on all sides
  - Padding: 10px inside each section
  - Font Size: 12pt for body text, 14pt for section headers, 16pt for the resume title
  - Line Height: 1.5 for body text
  - Section Headers: Bold and in ${color}
  - Personal Details: Include name, contact information, and a professional summary at the top
  - Education: List educational background with the most recent degree first
  - Work Experience: Include job titles, companies, and descriptions of responsibilities and achievements
  - Skills: Highlight relevant skills and competencies
  
  Make sure the resume is visually appealing and follows best practices for resume formatting.
- Do not include any text before <!DOCTYPE html> or after </html>. important
- Do not include any instructions, explanations, or notes in the generated HTML. important`;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt, prompt2]);

    const resume = result.response.text();
    let data = resume.replace(/`/g, "");
    data = resume.replace(/^html<!DOCTYPE html>/, "<!DOCTYPE html>");
    console.log("data", data);
    res.json({ data });
  } catch (error) {
    console.error("Error generating resume:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
