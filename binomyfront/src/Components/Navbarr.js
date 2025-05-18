import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from './redux/userSlice'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbarr({ user }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const current = JSON.parse(localStorage.getItem("user_connected"))
  const isAuthenticated = !!localStorage.getItem("token")

  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }

  const baseNavigation = [
    { name: 'Accueil', href: '/', current: false },
    { name: 'A propos', href: 'about', current: false },
    { name: 'Contact', href: 'contact', current: false },
    { name: 'Actualités', href: 'actualites', current: false },
  ]

  const privateNavigation = current?.role === "etudiant" || current?.role === "bailleur"
    ? [
        { name: 'Communauté', href: 'communaute', current: false },
        { name: 'Messages', href: 'conversations', current: false },
        { name: 'Offres de location', href: 'offres', current: false }
      ]
    : []

  const navigation = isAuthenticated && current?.role !== "admin"
    ? [...baseNavigation, ...privateNavigation]
    : current?.role === "admin"
    ? [] // no navigation for admin
    : baseNavigation

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon className="block h-6 w-6 group-data-open:hidden" />
              <XMarkIcon className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
            <div className="flex items-center">
              <Link to="/">
                <img src="assets/b1.png" alt=" logo" className="h-10 w-auto" style={{width:'150px', height:'60px'}} />
              </Link>
            </div>

            <div className="flex items-center space-x-4 h-16">
              
              {navigation.map((item) => (
                <Link to={item.href} key={item.name}>
                  <span
  className={classNames(
    item.current
      ? 'bg-gray-900 text-white'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    'rounded-md px-3 py-2 text-sm font-medium flex items-center'
  )}
  style={{
    fontFamily: "'Comic Sans MS', cursive",
    fontWeight: 'bold',
    color: item.current ? '#FFFFFF' : '#34495E',
    fontSize: '0.8rem',
    textShadow: item.current ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  }}
  onMouseEnter={e => !item.current && (e.currentTarget.style.color = '#F5A623')}
  onMouseLeave={e => !item.current && (e.currentTarget.style.color = '#00AEEF')}
>
  {item.name}
</span>
                </Link>
              ))}
              {current?.role === "admin" && (
                <Link to="/dashboard">
                  <span className="text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium">
                    Paramètres
                  </span>
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <>
                  {current?.role !== "admin" && (
                    <Link to="profile">
                      <img
                        src={user?.photo ? `http://localhost:5000/files/${user.photo}` : "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67338d48953975001dd4b439.png"}
                        alt="Profil"
                        className="w-8 h-8 rounded-full object-cover border border-white"
                      />
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Déconnexion
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <Link to="/signin">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                    <path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <Link to={item.href} key={item.name}>
              <DisclosureButton
                as="span"
                className={classNames(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            </Link>
          ))}
          {current?.role === "admin" && (
            <Link to="/dashboard">
              <DisclosureButton className="block text-white px-3 py-2 text-base font-medium">
                Paramètres
              </DisclosureButton>
            </Link>
          )}
          {isAuthenticated && (
              <DisclosureButton
        as="button"
        onClick={handleLogout}
        className="block w-full text-left px-3 py-2 text-base font-bold rounded-md transition duration-300 hover:text-[#F5A623]"
        style={{
          fontFamily: "'Comic Sans MS', cursive",
          color: '#00AEEF',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          letterSpacing: '1px',
        }}
      >
        Déconnexion
      </DisclosureButton>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbarr
