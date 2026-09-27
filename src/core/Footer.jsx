function Footer(){
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>© {currentYear} Gas Volcán todos los derechos reservados</p>
        </footer>
    );
}
export default Footer;