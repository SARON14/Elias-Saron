import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyAho4MDmeFkjCxOH2A5GOXn2MDm5B443Kk';
const MODEL_ID = 'gemini-3-pro-image-preview';

async function generateImage(prompt, outputPath, aspectRatio = '16:9') {
  console.log(`Generating image for: ${prompt}`);
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:streamGenerateContent?key=${API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: '1K'
          }
        }
      }
    );

    // The response is a stream of JSON objects. We need to extract the base64 image data.
    // Since it's a stream, we might need to parse it carefully.
    // For simplicity, let's assume the first part contains the image.
    
    // Note: The stream response format for Gemini can be tricky. 
    // In some cases, it's an array of objects.
    const data = response.data;
    let base64Image = null;

    if (Array.isArray(data)) {
      for (const chunk of data) {
        if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
          base64Image = chunk.candidates[0].content.parts[0].inlineData.data;
          break;
        }
      }
    } else {
        // Handle non-array response (if any)
        console.error("Unexpected response format", data);
    }

    if (base64Image) {
      const buffer = Buffer.from(base64Image, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`Image saved to ${outputPath}`);
    } else {
      console.error('Failed to extract image data from response');
    }
  } catch (error) {
    console.error('Error generating image:', error.response?.data || error.message);
  }
}

async function main() {
  await generateImage(
    'Generate a clean, modern placeholder image for a wedding hero section. Minimal design, abstract floral patterns in champagne and ivory, soft lighting, premium feel. No text, no logos.',
    path.join(process.cwd(), 'public/assets/images/hero/hero-bg.jpg'),
    '16:9'
  );

  await generateImage(
    'A high-end, professional portrait of a groom (African descent, elegant suit) for a wedding website. Warm lighting, celebratory mood, blurred background.',
    path.join(process.cwd(), 'public/assets/images/couples/elias.jpg'),
    '1:1'
  );

  await generateImage(
    'A high-end, professional portrait of a bride (African descent, elegant wedding dress) for a wedding website. Soft lighting, graceful, blurred background.',
    path.join(process.cwd(), 'public/assets/images/couples/saron.jpg'),
    '1:1'
  );
}

main();
