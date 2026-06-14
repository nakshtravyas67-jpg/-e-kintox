import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import OpenAI from 'openai'

const router = Router()

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many messages. Slow down.' },
})

const systemPrompt = `You are KINTOX AI — a helpful sales & support assistant for KINTOX, a premium Indian design agency.

ABOUT KINTOX:
- Founder: Nakshtra Vyas (age 17, BTech AI-DS 2nd year, Sangam University Bhilwara)
- Team: 6 creative professionals
- Location: Bhilwara, Rajasthan, India
- Email: nakshtr.144@gmail.com
- Phone: +91 98757 66841

SERVICES & PRICING (all in INR ₹):
1. YouTube Thumbnails: Basic ₹499 (5 thumbnails), Professional ₹999 (20), Ultra ₹1,499 (25)
2. Website Development: Starting ₹4,999 (full-stack, responsive)
3. Branding & Logo Design: Starting ₹1,999
4. Social Media Content: Custom packages
5. App UI/UX Design: Custom pricing

KEY INFO:
- Delivery: thumbnails 3 days, logo 3-5 days, websites 7-14 days
- Payment: 50% advance, 50% on delivery (UPI, bank transfer, cards)
- Portfolio: 200+ projects delivered, 30+ happy clients, 95% satisfaction
- Past work: 7 full-stack websites, 2 mobile apps delivered

RULES:
- Be friendly, concise, and professional
- Always mention pricing in ₹
- If asked something outside scope, politely redirect to email
- NEVER make up information not listed here
- For specific project inquiries, suggest emailing nakshtr.144@gmail.com`

const GROQ_API_KEY = process.env.GROQ_API_KEY
const groqClient = GROQ_API_KEY && GROQ_API_KEY !== '' && GROQ_API_KEY !== 'your_groq_api_key_here'
  ? new OpenAI({ apiKey: GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1' })
  : null

const localResponses = [
  [/hello|hi|hey/i, "Hey there! 👋 Welcome to KINTOX. How can I help you today?"],
  [/services|what do you do/i, "We offer premium design services: YouTube thumbnails (from ₹499), website development (from ₹4,999), branding & logo design (from ₹1,999), social media content, and app UI/UX design."],
  [/price|cost|pricing|rate|₹/i, "Our pricing starts from ₹499 for thumbnail packs, ₹1,999 for logo design, and ₹4,999 for complete website packages. All pricing is in INR."],
  [/portfolio|work|project/i, "We've delivered 200+ projects across web design, app UI, branding, social media, and more with 95% client satisfaction!"],
  [/contact|email|reach/i, "Email: nakshtr.144@gmail.com | Phone: +91 98757 66841 | Location: Bhilwara, Rajasthan. We respond within 2-4 hours."],
  [/location|bhiwara|where/i, "We're based in Bhilwara, Rajasthan, India. We work with clients globally!"],
  [/team|who|founder/i, "KINTOX was founded by Nakshtra Vyas — a 17-year-old BTech AI-DS student at Sangam University, Bhilwara. We have 6 creative professionals on our team."],
  [/website|build|web/i, "Yes! Full-stack websites starting from ₹4,999. We've delivered 7+ production websites."],
  [/brand|logo/i, "Branding packages include logo design, color palette, typography, and brand guidelines starting from ₹1,999."],
  [/thumbnail|youtube/i, "YouTube thumbnail packs: Basic ₹499 (5), Professional ₹999 (20), Ultra ₹1,499 (25). High CTR guaranteed!"],
  [/social media|instagram|content/i, "We create scroll-stopping social media content — posts, stories, carousels, and reels. Custom packages available."],
  [/timeline|how long|delivery/i, "Thumbnails: 3 days | Logo: 3-5 days | Website: 7-14 days | Most projects deliver within 2-5 days."],
  [/payment|pay/i, "We accept UPI, bank transfer, and cards. 50% advance and 50% on delivery for most projects."],
  [/bye|thanks|thank/i, "You're welcome! 😊 Feel free to reach out anytime. Email: nakshtr.144@gmail.com. Have a great day!"],
]

function getLocalResponse(msg) {
  for (const [pattern, reply] of localResponses) {
    if (pattern.test(msg)) return reply
  }
  return null
}

router.post('/', chatLimiter, async (req, res) => {
  try {
    const { message, history } = req.body
    if (!message?.trim()) return res.status(400).json({ error: 'Message is required' })

    const local = getLocalResponse(message)
    if (local) return res.json({ reply: local })

    if (groqClient) {
      const completion = await groqClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...(history || []).slice(-10),
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      })
      return res.json({ reply: completion.choices[0].message.content })
    }

    res.json({
      reply: "I'm not sure about that. Could you rephrase? You can also email us at nakshtr.144@gmail.com for specific queries! 📧",
    })
  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({ error: 'Failed to get response' })
  }
})

export default router