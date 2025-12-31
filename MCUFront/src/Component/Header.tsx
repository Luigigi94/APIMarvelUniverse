import marvelLogo from '../../public/svg/marvelapp-svgrepo-com.svg'
import { HiHome, HiOutlineBookOpen, HiOutlineRefresh, HiOutlineUser, HiOutlineUserCircle /*, HiMenu*/ } from "react-icons/hi";
import HeaderItem from "./HeaderItem.tsx";
// HiHome = home
// HiOutlineBookOpen reseñas
// HiOutlineRefresh Pelicula Aleatoria
// HiOutlineUser login
// HiOutlineUserCircle Menu loggeado
// HiMenu menu sandwich

function Header(){
    const menu = [
        {
            id: 0,
            name: 'HOME',
            icon: HiHome,
            route: '/'
        },{
            id: 1,
            name: 'REVIEWS',
            icon: HiOutlineBookOpen,
            route: '/reviews'
        },{
            id: 2,
            name: 'RANDOM MOVIE',
            icon: HiOutlineRefresh,
            route: '/random'
        },{
            id: 3,
            name: 'LOGIN',
            icon: HiOutlineUser,
            route: '/login'
        },{
            id: 4,
            name: 'LOGGED',
            icon: HiOutlineUserCircle
        }
    ]


    return(
        <div className='flex items-center justify-between p-5'>
            <div className="flex gap-8 items-center">
                <img src={marvelLogo} className='w-[50px] md:w-[85px] object-cover' alt="Marvel Logo"/>
                {
                    menu.map((item) =>(
                        <HeaderItem name={item.name} Icon={item.icon} route={item.route}/>
                    ))
                }
            </div>
            <img src={marvelLogo} className='w-[25px] rounded-full' alt="login"/>
        </div>
    )
}

export default Header;