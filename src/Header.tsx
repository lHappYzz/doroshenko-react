import {useState} from "react";

import logo from "./assets/logo.svg";
import DiagonalMenuIcon from "./assets/bar-menu-icon.svg";
import CourseCard from "./CourseCard.tsx";
import { FaInstagram, FaFacebookF, FaYoutube, FaHandHoldingHeart, FaPhone, FaUser, FaChevronUp, FaChevronDown} from "react-icons/fa";
import "./Header.css";

type MenuId = 'courses' | 'trainings' | 'center' | null;
const Header = () => {
    const [activeMenu, setActiveMenu] = useState<MenuId>(null);

    const toggleMenu = (menu: MenuId) => setActiveMenu(activeMenu === menu ? null : menu);

    const menuItems = [
        { id: 'courses', label: 'Курси', content: <CourseCard />, withIcon: true },
        { id: 'trainings', label: 'Тренінги', content: <div className="submenu">Субменю тренінгів</div>, withIcon: true },
        { id: 'center', label: 'Аналітичний центр', content: <div className="submenu">Субменю центру</div>, withIcon: false },
    ];

    return (
        <header className="header">
            <div className="header-left-block">
                <div className="logo-container">
                    <img src={logo} alt="Логотип" />
                    <div className="logo-text">Інститут лідерства, управління і коучингу</div>
                </div>

                <nav className="menu">
                    {menuItems.map((item) => (
                        <div key={item.id} className="menu-item">
                            <button
                                className={`menu-button ${activeMenu === item.id ? 'active' : ''}`}
                                onClick={() => toggleMenu(item.id as MenuId)}
                            >
                                {item.label}
                                {item.withIcon && (activeMenu === item.id ?
                                    <FaChevronUp className="menu-button-icon" />
                                    : <FaChevronDown className="menu-button-icon"/>)
                                }
                            </button>
                            {activeMenu === item.id && item.content}
                        </div>
                    ))}

                    <button className="menu-button list-nested">
                        <img src={DiagonalMenuIcon} alt="Menu" className="dropdown-icon" />
                    </button>
                </nav>
            </div>

            <div className="info-block">
                <div className="socials">
                    <a href="tel:+380991234567" className="phone">
                        <FaPhone className="phone-icon"/>
                        <span className="phone-value">+38 (099) 123-4567</span>
                    </a>
                    <a href="#" className="social-icon"><FaInstagram /></a>
                    <a href="#" className="social-icon"><FaFacebookF /></a>
                    <a href="#" className="social-icon"><FaYoutube /></a>
                    <a href="#" className="charity-icon">
                        <FaHandHoldingHeart className="donation-icon" />
                    </a>
                </div>

                <div className="cabinet">
                    <a href="#" className="sign-in">
                        <FaUser  className="cabinet-icon" />
                        Увійти
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;