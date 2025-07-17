import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImage from "../assets/images/logo.png";
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        return savedState ? JSON.parse(savedState) : false;
    });
    // Remove backend role check for pure frontend
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("role") === "admin");

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    // Remove backend logout call; just clear localStorage and navigate
    const handleConfirmLogout = () => {
        
      
        localStorage.removeItem('sidebarCollapsed');
        toast.success(t('Logged out successfully'), {
            position: "top-right",
            autoClose: 1500,
        });
        navigate("/login");
        setShowLogoutConfirm(false);
    };

    const handleCancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const handleSupportUsClick = () => {
        navigate("/payment");
    };



    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`min-h-screen flex ${i18n.language === 'ne' ? 'font-noto-sans' : ''}`}>
            <aside className={`bg-white dark:bg-gray-800 shadow-lg rounded-3xl ml-4 mt-6 mb-7 relative transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
                <div className="relative p-4">
                    <div className="flex justify-start mb-2">
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            <span className="material-icons-outlined">{isCollapsed ? 'menu_open' : 'menu'}</span>
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/dashboard">
                            <img
                                src={logoImage}
                                alt="Anna Logo"
                                className={isCollapsed ? "w-12 h-auto" : "w-40 h-auto"}
                            />
                        </Link>
                    </div>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-900"
                            >
                                <span className="material-icons-outlined">home</span>
                                {!isCollapsed && <span className="ml-4">{t('Home')}</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/lesson"
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-900"
                            >
                                <span className="material-icons-outlined">library_books</span>
                                {!isCollapsed && <span className="ml-4">{t('Lessons')}</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/practiceSessions"
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-900"
                            >
                                <span className="material-icons-outlined">playlist_add_check</span>
                                {!isCollapsed && <span className="ml-4">{t('Practice Sessions')}</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/chords"
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-900"
                            >
                                <span className="material-icons-outlined">queue_music</span>
                                {!isCollapsed && <span className="ml-4">{t('Chords & Lyrics')}</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tuner"
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-900"
                            >
                                <span className="material-icons-outlined">tune</span>
                                {!isCollapsed && <span className="ml-4">{t('Tuner')}</span>}
                            </Link>
                        </li>
                     
                        <li>
                            <button
                                onClick={handleSupportUsClick}
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-900 w-full text-left"
                            >
                                <span className="material-icons-outlined">volunteer_activism</span>
                                {!isCollapsed && <span className="ml-4">{t('Support Us')}</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={toggleTheme}
                                className="flex items-center p-4 text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-blue-900 w-full text-left"
                            >
                                <span className="material-icons-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
                                {!isCollapsed && <span className="ml-4">{t(theme === 'light' ? 'Dark Mode' : 'Light Mode')}</span>}
                            </button>
                        </li>
                       
                    </ul>
                </nav>
                <div className={`absolute bottom-12 ${isCollapsed ? 'left-4' : 'left-7'}`}>
                    <button
                        onClick={handleLogoutClick}
                        className="flex items-center text-red-600 hover:text-red-800 font-medium p-3 w-full rounded-md transition duration-200 ease-in-out hover:bg-red-100 dark:text-red-400 dark:hover:text-red-600 dark:hover:bg-red-900"
                    >
                        <span className="material-icons-outlined">logout</span>
                        {!isCollapsed && <span className="ml-3">{t('Logout')}</span>}
                    </button>
                </div>
            </aside>

            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                {t('Log out')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                                {t('Are you sure you want to log out?')}
                            </p>
                            <div className="space-y-3">
                                <button
                                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-800 transition duration-200"
                                    onClick={handleConfirmLogout}
                                >
                                    {t('Log out')}
                                </button>
                                <button
                                    className="w-full py-3 px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-200"
                                    onClick={handleCancelLogout}
                                >
                                    {t('Cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;