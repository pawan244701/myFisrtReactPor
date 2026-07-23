import { useState } from "react";
import styles from './Home.module.css';

import { Navbar } from '../components/Navbar'
import { Login } from "./Login";
import { Signup } from './Signup';
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { TechStack } from "../components/TechStack";

import firstPorject from '../assets/projectImgs/firstPorject.png';

import './Home.module.css';

export const Home = () => {
    return (
        <main>
            <Hero />
            <TechStack />
            <section className={styles['project-item-section']}>
                <h1 className={styles['project-item-h1']}>My Projects and Exprements</h1>
                <article className={styles['project-item-article']} >
                    {/* 
                provide imgSrc      ='thumbnil of project'
                provide description ='text about project'
                provide projectLink ='link of the project'
                */}
                    <Projects
                        imgSrc={firstPorject}
                        description='This was my project (full user auth and verification)'
                        projectLink='https://pawan244701.onrender.com'
                    />
                    <Projects
                        imgSrc={firstPorject}
                        description='This was my project (full user auth and verification)'
                        projectLink='https://pawan244701.onrender.com'
                    />
                    <Projects
                        imgSrc={firstPorject}
                        description='This was my project (full user auth and verification)'
                        projectLink='https://pawan244701.onrender.com'
                    /><Projects
                        imgSrc={firstPorject}
                        description='This was my project (full user auth and verification)'
                        projectLink='https://pawan244701.onrender.com'
                    />
                    <Projects
                        imgSrc={firstPorject}
                        description='This was my project (full user auth and verification)'
                        projectLink='https://pawan244701.onrender.com'
                    />
                    <Projects
                        imgSrc={firstPorject}
                        description='This was my project (full user auth and verification)'
                        projectLink='https://pawan244701.onrender.com'
                    />
                </article>
            </section>
        </main>
    )
};
