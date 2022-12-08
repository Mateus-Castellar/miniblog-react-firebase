import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini<span>Blog</span></h2>
      <p>Esse projeto consiste em um blog usando React no front-end e Firebase como back-end.</p>
      <Link to="/posts/create" className="btn">Criar Post</Link>
    </div>
  )
}

export default About