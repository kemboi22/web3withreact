import Logo from "../../images/logo.png"
import {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {HiMenuAlt4} from "react-icons/hi";

// eslint-disable-next-line react/prop-types
const NavbarItem = ({title, classProps}) => {
    return (
        <li className={"mx-4 cursor-pointer " + classProps}>
            {title}
        </li>
    )
}
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    return (
        <nav className={"w-full flex md:justify-center justify-between items-center p-4"}>
            <div className={"md:flex-[0.5] flex-initial justify-center items-center"}>
                <img src={Logo} alt={"Logo"} className={"w-32 cursor-pointer"}/>
            </div>
            <ul className={"text-white md:flex hidden flex-row justify-between items-center flex-initial"}>
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => <NavbarItem key={item + index}
                                                                                                 title={item}
                                                                                                 classProps={""}/>)}
                <li className={"bg-blue-600 py-2 px-7 rounded-full mx-4 cursor-pointer hover:bg-blue-800"}>
                    Login
                </li>
            </ul>
            <div className={"flex relative"}>
                {
                    toggleMenu ? <AiOutlineClose fontSize={28} className={"text-white md:hidden cursor-pointer"}
                                                 onClick={() => setToggleMenu(false)}/> :
                        <HiMenuAlt4 fontSize={28} className={"text-white md:hidden cursor-pointer"}
                                    onClick={() => setToggleMenu(true)}/>
                }
                {
                    toggleMenu && (
                        <ul className={"z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"}>
                            <li className={"text-xl w-full my-2"}>
                                <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                            </li>
                            {["Markets", "Exchange", "Tutorials", "Wallets"].map((item, index) =>
                                <NavbarItem title={item} key={item + index} classProps={"my-2 text-lg"}/>)}
                        </ul>
                    )
                }
            </div>
        </nav>
    )
}
export default Navbar