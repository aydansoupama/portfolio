import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState, useEffect } from 'react';
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
            {isDarkMode ? <LuSun size={24} /> : <LuMoon size={24} />}
        </button>
    );
}


const Navigation = () => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const yOffset = -80; 
            const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="navigation-toggler" aria-label="Menu de navigation">
                    <LuMenu size={24} />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                className="dropdown-content"
                sideOffset={5}
                align="end"
                alignOffset={0}
            >
                <DropdownMenu.Item className="dropdown-item">
                    <a href="#home"onClick={(e) => handleClick(e, 'home')}>Home</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="dropdown-item">
                    <a href="#about" onClick={(e) => handleClick(e, 'about')}>About me</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="dropdown-item">
                    <a href="#skills" onClick={(e) => handleClick(e, 'skills')}>My skills</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="dropdown-item">
                    <a href="#projects" onClick={(e) => handleClick(e, 'projects')}>My latest projects</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="dropdown-item">
                    <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact me</a>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default Header;