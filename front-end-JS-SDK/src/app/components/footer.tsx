import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className=" mt-[100px] text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">© 2024 MoveMe. All rights reserved.</p>
        <nav>
          <ul className="flex justify-center space-x-4">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer