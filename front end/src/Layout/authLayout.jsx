import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <main className="contenedor mx-auto mt-2 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-1/2">

          <Outlet />
        </div>
      </main>
    </>
  )
}
