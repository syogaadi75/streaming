import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../img/logo-text.png'

function Header() {
    const [hamburger, setHamburger] = useState(false)
    const [hamburgerActive, setHamburgerActive] = useState('')
    const [navMenu, setNavMenu] = useState('hidden')

    const history = useNavigate();

    const hamburgerHandle = () => {
        !hamburger ? setHamburgerActive('hamburger-active') : setHamburgerActive('')
        !hamburger ? setNavMenu('') : setNavMenu('hidden')
        setHamburger(!hamburger)
    }

    return (
        <>
            <header className="bg-dark/60 absolute top-0 left-0 w-full flex items-center z-[11]">
                <div className="container">
                    <div className="flex items-center justify-between relative">
                        <div className="ml-4 lg:ml-10">
                            <span className="font-bold text-lg text-primary block py-4 cursor-pointer" onClick={() => history('/')}>
                                <img className="w-20" src={logo} alt="Logo" />
                            </span>
                        </div>
                        <div className="flex items-center text-light">
                            <button className={`block focus:bg-transparent lg:hidden absolute right-8 outline-none border-none ${hamburgerActive}`} id="hamburger" name="hamburger" onClick={() => hamburgerHandle()}>
                                <span className="hamburger-line transition duration-300 ease-in-out origin-top-left"></span>
                                <span className="hamburger-line transition duration-300 ease-in-out"></span>
                                <span className="hamburger-line transition duration-300 ease-in-out origin-bottom-left"></span>
                            </button>

                            <nav id="nav-menu" className={`${navMenu} absolute py-5 bg-dark border-2 border-primary rounded-lg max-w-[250px] w-full right-10 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:border-none`}>
                                <ul className="block pl-6 lg:flex lg:space-x-6">
                                    <li className='group' onClick={() => history('/')}>
                                        <span className="cursor-pointer text-light py-2 flex group-hover:text-primary lg:font-semibold">Home</span>
                                    </li>
                                    <li className='group' onClick={() => history('/terakhir-ditonton')}>
                                        <span className="cursor-pointer text-light py-2 flex group-hover:text-primary lg:font-semibold">Terakhir Ditonton</span>
                                    </li>
                                    <li className='group' onClick={() => history('/daftar-anime')}>
                                        <span className="cursor-pointer text-light py-2 flex group-hover:text-primary lg:font-semibold">Data Anime</span>
                                    </li>
                                    <li className='group' onClick={() => history('/jadwal-tayang')}>
                                        <span className="cursor-pointer text-light py-2 flex group-hover:text-primary lg:font-semibold">Jadwal Tayang</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header