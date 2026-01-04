import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";


const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="container">
        <div className="logo-container">
            <h3>MyApiary</h3>
        </div>

        <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Пасіка</Link>
            </li>

            <li className={location.pathname === "/stats" ? "active" : ""}>
            <Link to="/stats">Статистика</Link>
            </li>

            <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">Кабінет</Link>
            </li>
        </ul>
        </nav>
    );
};

export default Navbar;
