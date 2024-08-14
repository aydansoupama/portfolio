import React from 'react';

const Footer = () => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const yOffset = -80;
            const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <footer>
            <div className="footer-navigation">
                <ul>
                    <h3>Navigation</h3>
                    <li><a href="#home" onClick={(e) => handleClick(e, 'home')}>Home</a></li>
                    <li><a href="#about" onClick={(e) => handleClick(e, 'about')}>About me</a></li>
                    <li><a href="#skills" onClick={(e) => handleClick(e, 'skills')}>My skills</a></li>
                    <li><a href="#projects" onClick={(e) => handleClick(e, 'projects')}>My latest projects</a></li>
                    <li><a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact me</a></li>
                </ul>
                <ul>
                    <h3>Legal</h3>
                    <li><a href="#">Terms & Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
                <ul>
                    <h3>Contact me</h3>
                    <li><a href="tel:+33789342474" target='_blank'>+33 7 89 34 24 74</a></li>
                    <li><a href="mailto:aydansoupama@gmail.com" target='_blank'>aydansoupama@gmail.com</a></li>
                </ul>
            </div>
            <div>
                <p>All rights reserved &copy; {new Date().getFullYear()}</p>
                <li><a href="#">Go to top</a></li>
            </div>
        </footer>
    )
}

export default Footer;