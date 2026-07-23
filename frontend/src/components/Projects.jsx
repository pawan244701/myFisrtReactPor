import { Link } from "react-router-dom"
import styles from './Projects.module.css';

export const Projects = ({imgSrc, description, projectLink}) => {
    return (
            <article className={styles['item']}>
                <img src={imgSrc} alt="Project Thumbnil" />
                <p>{description}</p>
                    <a href={projectLink}
                        target="_blank"
                        rel='noopener noreferrer'
                    > Click to Visit</a>
            </article>
    )
}
