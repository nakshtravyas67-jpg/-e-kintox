import { motion } from 'framer-motion'

export default function AdminUsers({ users, orders, onRefresh }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[24px] font-semibold text-ink">Users</h2>
        <button onClick={onRefresh} className="btn-dark-utility">Refresh</button>
      </div>
      <div className="bg-white border border-hairline rounded-lg overflow-hidden">
        {users.length === 0 ? (
          <div className="py-16 text-center text-caption text-muted">No registered users yet</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline bg-parchment/50">
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">ID</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Name</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Email</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Orders</th>
                    <th className="text-left px-5 py-4 text-fine-print font-semibold text-muted uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const userOrders = orders.filter((o) => o.user?.email === u.email)
                    return (
                      <tr key={u.id} className="border-b border-hairline last:border-none hover:bg-parchment transition-colors">
                        <td className="px-5 py-4 text-fine-print text-muted font-mono">#{u.id}</td>
                        <td className="px-5 py-4 text-caption text-ink font-medium">{u.name}</td>
                        <td className="px-5 py-4 text-caption text-muted">{u.email}</td>
                        <td className="px-5 py-4">
                          <span className="bg-parchment text-action-blue text-fine-print font-medium px-3 py-1 rounded-pill">{userOrders.length}</span>
                        </td>
                        <td className="px-5 py-4 text-fine-print text-muted">{new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden divide-y divide-hairline">
              {users.map((u) => {
                const userOrders = orders.filter((o) => o.user?.email === u.email)
                return (
                  <div key={u.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-fine-print text-muted font-mono">#{u.id}</span>
                      <span className="bg-parchment text-action-blue text-fine-print font-medium px-3 py-1 rounded-pill">{userOrders.length} orders</span>
                    </div>
                    <p className="text-caption text-ink font-medium">{u.name}</p>
                    <p className="text-fine-print text-muted">{u.email}</p>
                    <p className="text-fine-print text-muted">{new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}