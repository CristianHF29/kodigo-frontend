export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Kodigo Bootcamps. Todos los derechos reservados.</p>
                <nav className="footer-links">
                    <a href="#">Privacidad</a>
                    <a href="#">Términos</a>
                    <a href="#">Contacto</a>
                </nav>
            </div>
        </footer>
    );
}
