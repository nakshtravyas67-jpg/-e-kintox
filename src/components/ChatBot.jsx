import { useState, useRef, useEffect } from 'react'
import { api } from '../lib/api'

const quickReplies = [
  "What services do you offer?",
  "Show me pricing",
  "View portfolio",
  "Contact info",
]

const faqResponses = [
  { keywords: ['service', 'offer', 'do you'], reply: 'We offer: Brand Identity, Web Design, App UI, Social Media Design, YouTube Thumbnails, Posters, and UI Kits. Which one interests you?' },
  { keywords: ['price', 'pricing', 'cost', 'how much', 'package'], reply: 'Our pricing depends on the scope. Studio packages start at ₹4,999, Project packages at ₹8,999, Enterprise at ₹14,999. Visit /services for full details!' },
  { keywords: ['portfolio', 'work', 'project', 'past work'], reply: 'Check out our portfolio at /portfolio. We have 50+ projects across Web Design, Branding, App UI, and more!' },
  { keywords: ['contact', 'email', 'phone', 'reach', 'call'], reply: 'Email: nakshtr.144@gmail.com | Phone: +91 98757 66841 | Location: Bhilwara, Rajasthan. Or use the contact form on our site!' },
  { keywords: ['brand', 'identity', 'branding'], reply: 'Our Brand Identity service includes logo design, color system, typography, brand guidelines, and social media templates. Packages start at ₹8,999.' },
  { keywords: ['web', 'website', 'site'], reply: 'We design high-conversion websites with clean UI, responsive layouts, and modern aesthetics. Check our Web Design portfolio at /portfolio.' },
  { keywords: ['app', 'mobile', 'ui design', 'application'], reply: 'Our App UI service covers iOS, Android, and cross-platform designs. From wireframes to polished prototypes.' },
  { keywords: ['social media', 'instagram', 'post'], reply: 'Social media design packs include 30+ templates, Instagram stories, and carousel posts. Starting at ₹2,499.' },
  { keywords: ['thumbnail', 'youtube'], reply: 'YouTube thumbnail packs with click-worthy designs. Each pack includes 10+ custom thumbnails with source files.' },
  { keywords: ['timeline', 'how long', 'delivery', 'turnaround'], reply: 'Most projects deliver within 3-7 business days. Rush delivery available at an additional charge.' },
  { keywords: ['refund', 'cancel', 'money back'], reply: 'We offer full refund within 7 days if the work hasn\'t started. Once design work begins, refunds are handled case-by-case.' },
  { keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'], reply: 'Hey there! 👋 How can I help you today? Feel free to ask about our services, pricing, or portfolio.' },
]

function getLocalReply(msg) {
  const lower = msg.toLowerCase()
  for (const faq of faqResponses) {
    if (faq.keywords.some((k) => lower.includes(k))) return faq.reply
  }
  return "I'm not sure about that. Please email nakshtr.144@gmail.com and our team will get back to you! Or try asking about services, pricing, or portfolio."
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm KINTOX AI assistant. Ask me anything about our services, pricing, or process!" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = async (text) => {
    const msg = (text || input).trim()
    if (!msg) return
    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setInput('')
    setTyping(true)
    setTimeout(async () => {
      try {
        const data = await api.post('/chat', {
          message: msg,
          history: messages.map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })),
        })
        setMessages((prev) => [...prev, { role: 'bot', text: data.reply }])
      } catch {
        setMessages((prev) => [...prev, { role: 'bot', text: getLocalReply(msg) }])
      }
      setTyping(false)
    }, 600)
  }

  return (
    <>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="KINTOX AI Chat" className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-32px)] md:w-[380px] h-[520px] bg-white rounded-[18px] border border-[#e0e0e0] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f5f5f7] flex items-center justify-center">
                <svg aria-hidden="true" className="w-4 h-4 text-[#1d1d1f]" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" /></svg>
              </div>
              <div>
                <p className="text-[17px] font-[600] text-[#1d1d1f]">KINTOX AI</p>
                <p className="text-[11px] text-[#7a7a7a]">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors cursor-pointer p-3">
              <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#0066cc] text-white rounded-[18px]'
                    : 'bg-[#f5f5f7] text-[#1d1d1f] rounded-[18px]'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#f5f5f7] text-[#1d1d1f] px-4 py-3 rounded-[18px]">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#7a7a7a] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#7a7a7a] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#7a7a7a] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && !typing && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => handleSend(qr)}
                  className="text-[14px] text-[#0066cc] border border-[#e0e0e0] rounded-[999px] px-4 py-2.5 hover:bg-[#f5f5f7] transition-colors cursor-pointer"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-[#f0f0f0] bg-white shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend() }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                aria-label="Chat message"
                className="flex-1 px-4 py-2.5 border border-[#e0e0e0] rounded-[11px] text-[17px] text-[#1d1d1f] outline-none placeholder:text-[#7a7a7a] bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 rounded-[999px] bg-[#0066cc] text-white flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" /></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="btn-icon-circle fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#1d1d1f] hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Open AI Chat"
      >
        {open ? (
          <svg aria-hidden="true" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
        ) : (
          <svg aria-hidden="true" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" /></svg>
        )}
      </button>
    </>
  )
}
