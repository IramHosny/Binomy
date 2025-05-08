import React from 'react'
import { Fade} from "react-awesome-reveal";
import { Link } from 'react-router-dom'

function Header() {
  const isAuth = localStorage.getItem("token");
  return (
    <div className=''>
        <video autoPlay loop muted>
        <source src="assets/vid1.mp4" type="video/mp4" />
        </video>
        <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <Fade cascade damping={0.4}  direction='up' triggerOnce={true}>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            La colocation parfaite t'attend. Rejoins-nous !
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
            Simplifie ta recherche de colocataire avec notre app intelligente. Plus de stress, juste des rencontres adaptées !            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              {isAuth?(
                <Link to="/profile"> <a
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Devenir membre
              </a></Link>
              ):  
              ( <Link to="/register"> <a
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Devenir membre
            </a></Link>)}
          
              <Link to="/about">
              <a href="#" className="text-sm/6 font-semibold text-white">
                A propos de nous <span aria-hidden="true">→</span>
              </a></Link>
            </div>
          </div>
          </Fade>
          <div className="relative mt-16 h-80 lg:mt-8">
          
          <img
  alt="Trouve ton binôme parfait"
  src="assets/st.webp"
  className="w-full max-w-lg mx-auto rounded-md object-contain"
/>
          </div>
        </div>
      </div>
    </div>
        </div>
  )
}

export default Header