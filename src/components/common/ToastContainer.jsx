import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../../context/ToastContext'

const icons = {
  success: (
    <svg aria-hidden="true" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  ),
  error: (
    <svg aria-hidden="true" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  ),
  info: (
    <svg aria-hidden="true" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
}

const bgMap = {
  success: 'bg-[#34c759]',
  error: 'bg-[#ff3b30]',
  info: 'bg-[#5856d6]',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 max-w-[360px] w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-[14px] shadow-lg ${bgMap[t.type]} text-white text-[14px] font-[500]`}
          >
            <span className="shrink-0">{icons[t.type]}</span>
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Dismiss"
            >
              <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}