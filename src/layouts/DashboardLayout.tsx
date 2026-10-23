import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div>
      <aside>Dashboard</aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
