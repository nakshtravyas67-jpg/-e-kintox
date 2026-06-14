import { motion } from 'framer-motion'
import { api } from '../../lib/api'

const statusList = ['pending', 'in_progress', 'completed', 'cancelled']
const statusColors = { pending: 'bg-yellow-100 text-yellow-700', in_progress: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' }
const statusLabels = { pending: 'Pending', in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled' }

export default function AdminOrders({ orders, onRefresh }) {
  const updateStatus = async (id, status) => {
    try { await api.patch(`/admin/orders/${id}/status`, { status }); onRefresh() } catch {}
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[24px] font-semibold text-ink">Orders</h2>
        <button onClick={onRefresh} className="btn-dark-utility">Refresh</button>
      </div>
      <div className="bg-white border border-hairline rounded-lg overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-16 text-center text-caption text-muted">No orders yet</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline bg-parchment/50">
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">ID</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Customer</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Service</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Package</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Status</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-hairline last:border-none hover:bg-parchment transition-colors">
                      <td className="px-5 py-4 text-fine-print text-muted font-mono">#{o.id}</td>
                      <td className="px-5 py-4">
                        <p className="text-caption text-ink font-medium">{o.user?.name}</p>
                        <p className="text-fine-print text-muted">{o.user?.email}</p>
                      </td>
                      <td className="px-5 py-4 text-caption text-ink">{o.service}</td>
                      <td className="px-5 py-4">
                        <span className="bg-parchment text-action-blue text-fine-print font-medium px-3 py-1 rounded-pill capitalize">{o.package}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="relative group">
                          <span className={`text-fine-print font-medium px-3 py-1 rounded-pill cursor-pointer capitalize ${statusColors[o.status] || statusColors.pending}`}>
                            {statusLabels[o.status] || 'Pending'}
                          </span>
                          <div className="absolute top-full left-0 mt-1 bg-white border border-hairline rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[140px]">
                            {statusList.map((s) => (
                              <button key={s} onClick={() => updateStatus(o.id, s)}
                                className={`block w-full text-left px-4 py-2 text-fine-print font-medium hover:bg-parchment transition-colors first:rounded-t-lg last:rounded-b-lg capitalize ${o.status === s ? 'text-action-blue' : 'text-muted'}`}>
                                {statusLabels[s]}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-fine-print text-muted whitespace-nowrap">{new Date(o.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden divide-y divide-hairline">
              {orders.map((o) => (
                <div key={o.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-fine-print text-muted font-mono">#{o.id}</span>
                    <select
                      value={o.status || 'pending'}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className={`text-fine-print font-medium px-3 py-1.5 rounded-pill capitalize border-none outline-none ${statusColors[o.status] || statusColors.pending}`}
                    >
                      {statusList.map((s) => (
                        <option key={s} value={s}>{statusLabels[s]}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-caption text-ink font-medium">{o.user?.name}</p>
                  <p className="text-fine-print text-muted">{o.user?.email}</p>
                  <div className="flex items-center gap-2 text-fine-print text-muted">
                    <span>{o.service}</span>
                    <span className="bg-parchment text-action-blue font-medium px-2 py-0.5 rounded-pill capitalize">{o.package}</span>
                    <span className="ml-auto">{new Date(o.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}