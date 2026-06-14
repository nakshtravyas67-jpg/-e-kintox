import { motion } from 'framer-motion'

export default function AdminMessages({ messages, onRefresh }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[24px] font-semibold text-ink">Contact Messages</h2>
        <button onClick={onRefresh} className="btn-dark-utility">Refresh</button>
      </div>
      <div className="bg-white border border-hairline rounded-lg overflow-hidden">
        {messages.length === 0 ? (
          <div className="py-16 text-center text-caption text-muted">No messages yet</div>
        ) : (
          <div className="divide-y divide-hairline">
            {messages.map((m) => (
              <div key={m.id} className="p-5 hover:bg-parchment transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-caption font-semibold text-ink">{m.name}</p>
                    <p className="text-fine-print text-muted">{m.email}</p>
                  </div>
                  <span className="text-fine-print text-muted shrink-0">{new Date(m.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-fine-print font-medium text-action-blue mt-2">{m.subject}</p>
                <p className="text-fine-print text-muted mt-1 whitespace-pre-wrap line-clamp-3">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}