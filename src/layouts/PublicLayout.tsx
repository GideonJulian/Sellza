import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <>
      <header>Sellza</header>
      <Outlet />
    </>
  )
}
