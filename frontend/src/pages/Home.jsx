import { useState } from "react";
import { Navbar } from '../components/Navbar'
import { Login } from "./Login";
import { Signup } from './Signup';
import { Hero } from "../components/Hero";

import './Home.module.css';

export const Home = () => {
    return (
        <main>
            <Hero />
        </main>
    )
};