import { useState, useEffect, useRef } from 'react';
import { LuMenu, LuMoon, LuSun } from 'react-icons/lu';

const Header = () => {
    return (
        <header className="header">
            <h3 className="header-title">Aydan Soupama</h3>
            <ul className="header-actions">
                <ThemeToggler />
                <Navigation />
            </ul>
        </header>
    )
}

const ThemeToggler = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('light-mode', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <button className="theme-toggler" onClick={toggleTheme}>
            {isDarkMode ? <LuSun className="icon" /> : <LuMoon className="icon" />}
        </button>
    );
}


const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const yOffset = -80;
            const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="navigation" ref={dropdownRef}>
            <button
                className="navigation-toggler"
                aria-label="Menu de navigation"
                onClick={() => setIsOpen(!isOpen)}
            >
                <LuMenu className="icon" />
            </button>

            {isOpen && (
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <a href="#home" onClick={(e) => handleClick(e, 'home')}>Home</a>
                    </div>
                    <div className="dropdown-item">
                        <a href="#about" onClick={(e) => handleClick(e, 'about')}>About me</a>
                    </div>
                    <div className="dropdown-item">
                        <a href="#skills" onClick={(e) => handleClick(e, 'skills')}>My skills</a>
                    </div>
                    <div className="dropdown-item">
                        <a href="#projects" onClick={(e) => handleClick(e, 'projects')}>Latest projects</a>
                    </div>
                    <div className="dropdown-item">
                        <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact</a>
                    </div>
                </div>

            )}
        </div>
    );
};

export default Header;