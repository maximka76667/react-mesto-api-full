export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© {currentYear}. Максим Гривенный</p>
      </div>
    </footer>
  )
}