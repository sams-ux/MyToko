import Footer from "./Footer"
import NavBar from "./NavBar"

export default function Layout({children}) {
  return (
    <div>
        <NavBar/>
        <div className="items-center justify-center min-h-screen">
          {children}
        </div>
        <Footer/>
    </div>
  )
}
