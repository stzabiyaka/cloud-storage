import './Footer.scss';

const Footer = () => {
  const date = new Date();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {date.getFullYear()} Developed by</p>
      <a
        href="https://zabiiaka-portfolio.netlify.app/"
        className="footer__link"
        rel="noreferrer noopener nofollow"
        target="_blank"
      >
        Stanislav Zabiiaka
      </a>
    </footer>
  );
};

export default Footer;
