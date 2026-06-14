import { motion } from 'framer-motion'

export default function AdminOverview({ stats, ordersByMonth, ordersByStatus }) {
  const statCards = stats ? [
    { label: 'Total Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`, sub: `${stats.totalOrders} orders` },
    { label: 'Total Users', value: stats.totalUsers, sub: 'Registered accounts' },
    { label: 'Total Orders', value: stats.totalOrders, sub: `${ordersByStatus?.completed || 0} completed` },
    { label: 'Avg Order Value', value: `₹${(stats.avgOrderValue || 0).toLocaleString('en-IN')}`, sub: 'Per order' },
  ] : []

  const months = Object.keys(ordersByMonth).sort()
  const maxMonthVal = Math.max(...Object.values(ordersByMonth), 1)

  const statusLabels = { pending: 'Pending', in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled' }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white border border-hairline rounded-xl p-6">
            <p className="text-fine-print font-semibold text-muted uppercase tracking-wider">{card.label}</p>
            <p className="text-[32px] font-semibold text-ink mt-2">{card.value}</p>
            <p className="text-fine-print text-muted mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-hairline rounded-xl p-6">
          <h3 className="text-caption-strong font-semibold text-ink mb-4">Orders by Month</h3>
          {months.length === 0 ? (
            <p className="text-fine-print text-muted">No data yet</p>
          ) : (
            <div className="flex items-end gap-3 h-48">
              {months.map((m) => {
                const val = ordersByMonth[m] || 0
                const pct = (val / maxMonthVal) * 100
                return (
                  <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-fine-print text-muted font-medium">{val}</span>
                    <div className="w-full bg-action-blue rounded-t-md transition-all duration-500" style={{ height: `${Math.max(pct, 4)}%` }} />
                    <span className="text-fine-print text-muted text-[10px] -rotate-45 origin-left whitespace-nowrap">
                      {new Date(m + '-02T00:00:00').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="bg-white border border-hairline rounded-xl p-6">
          <h3 className="text-caption-strong font-semibold text-ink mb-4">Order Status</h3>
          <div className="space-y-4">
            {Object.entries(statusLabels).map(([key, label]) => {
              const count = ordersByStatus[key] || 0
              const total = stats?.totalOrders || 1
              const pct = (count / total) * 100
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-fine-print font-medium text-muted">{label}</span>
                    <span className="text-fine-print font-semibold text-ink">{count}</span>
                  </div>
                  <div className="h-2 bg-parchment rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${key === 'pending' ? 'bg-yellow-400' : key === 'in_progress' ? 'bg-blue-400' : key === 'completed' ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}