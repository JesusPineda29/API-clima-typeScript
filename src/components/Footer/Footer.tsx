import { FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.titleBlock}>
            <p className={styles.title}>Buscador de Clima</p>
            <p className={styles.subtitle}>
              Desarrollado por <strong>Jesús Pineda</strong>
            </p>
          </div>

          <nav className={styles.nav}>
            <a
              href="https://jesus-pineda-portafolio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sitio Web personal"
              className={styles.link}
            >
              <FaGlobe size={22} />
              <span>Sitio Web</span>
            </a>

            <a
              href="https://www.linkedin.com/in/jesús-pineda-630a3b300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de LinkedIn"
              className={styles.link}
            >
              <FaLinkedin size={22} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/JesusPineda29"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Repositorio en GitHub"
              className={styles.link}
            >
              <FaGithub size={22} />
              <span>GitHub</span>
            </a>
          </nav>

          <div className={styles.rights}>
            © {new Date().getFullYear()} - Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
};
