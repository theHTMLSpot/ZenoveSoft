"use client";

import React from 'react';
import Link from 'next/link';
import styles from '../css/navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <ul className={styles.navlist}>
                <li className={styles.logo}>
                    <Link href='/'>
                        <img src='/logo.png' alt='logo' className={styles.logoImg} />
                    </Link>
                </li>
                <li className={styles.navitem}>
                    <Link href='/'>Home</Link>
                </li>
                <li className={styles.navitem}>
                    <Link href='/about'>About</Link>
                </li>
                <li className={styles.cta}>
                    <Link href='/info'>
                        <button className={styles.cta_button}>Get Started</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}