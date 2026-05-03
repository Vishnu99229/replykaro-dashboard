const statusConfig = {
  booked: { label: 'Confirmed', className: 'badge-booked' },
  completed: { label: 'Completed', className: 'badge-completed' },
  cancelled: { label: 'Cancelled', className: 'badge-cancelled' },
  no_show: { label: 'No show', className: 'badge-no_show' },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.booked
  return <span className={`badge ${config.className}`}>{config.label}</span>
}
