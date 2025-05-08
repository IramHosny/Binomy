import React from 'react'
import { Link } from 'react-router-dom'


function Footer({className=""}) {
  return (
    <footer className={`bg-gray-900 rounded-lg shadow-sm m-4 dark:bg-gray-900 ${className}`}>
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2025 <a href="#" className="hover:underline">Binomy</a>. Tous les droits sont réservés.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link to="/about" className="hover:underline me-4 md:me-6">À propos</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline me-4 md:me-6">Contact</Link>
        </li>
        <li>
          <Link to="/actualites" className="hover:underline me-4 md:me-6">Actualités</Link>
        </li>
        <li>
          <Link to="/register" className="hover:underline">S'inscrire</Link>
        </li>
      </ul>
    </div>
  </footer>
  )
}

export default Footer