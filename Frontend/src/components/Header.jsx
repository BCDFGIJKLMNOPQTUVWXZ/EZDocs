import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex items-center justify-center px-6 py-4">
      {/* Logo on the left */}
      <h1 className="absolute left-6 text-3xl font-extrabold bg-gradient-to-r from-[#c18bfa] to-[#8b5cf6] bg-clip-text text-transparent">
        EZDocs
      </h1>

      {/* Navigation in the center */}
      <nav className="flex gap-8 text-black text-lg font-medium">
        <Link
          to="/"
          className="transition duration-300 hover:text-[#B388B3] hover:drop-shadow-[0_0_8px_#d4b3ff]"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="transition duration-300 hover:text-[#B388B3] hover:drop-shadow-[0_0_8px_#d4b3ff]"
        >
          About
        </Link>
      </nav>

      {/* Profile Section */}
      <div className="absolute right-6 flex items-center gap-3">
        <span className="text-[#c18bfa] font-medium">Aarvi</span>
        <img
          src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-white hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Empty div to balance layout */}
      <div className="w-[70px]"></div>
    </div>
  )
}

export default Header
