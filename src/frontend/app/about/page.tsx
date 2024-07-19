// pages/about.js

import React from 'react';
import styles from '../css/about.module.css'; // Import your CSS module
import LaptopCanvas from '../components/LaptopCanvas'; // Import the 3D component

const About = () => {
    return (
        <div className={styles.container}>
            <LaptopCanvas />
            <header className={styles.header}>
                <h1 className={styles.title}>About Us</h1>
                <p className={styles.description}>
                    At [Company Name], we are committed to delivering exceptional products and services that make a difference. Our team is driven by innovation and excellence.
                </p>
            </header>
            
            <section className={styles.history}>
                <h2 className={styles.subtitle}>Our History</h2>
                <p className={styles.text}>
                    Founded in [Year], our company has grown from a small startup to a leading player in [industry/field]. Our journey has been defined by a relentless pursuit of quality and innovation.
                </p>
            </section>

            <section className={styles.team}>
                <h2 className={styles.subtitle}>Meet the Team</h2>
                <div className={styles.teamGrid}>
                    <div className={styles.teamMember}>
                        <img src="/ceo.jpeg" alt="John Doe" className={styles.teamImage} />
                        <h3 className={styles.memberName}>John Doe</h3>
                        <p className={styles.memberRole}>CEO</p>
                    </div>
                    
                </div>
            </section>

            <section className={styles.contact}>
                <h2 className={styles.subtitle}>Contact Us</h2>
                <p className={styles.text}>
                    We’d love to hear from you. Reach out to us via email or phone for any inquiries or support.
                </p>
                <p className={styles.contactInfo}>
                    Email: <a href="mailto:info@ZenoveSoft.nl">info@ZenoveSoft.nl</a><br />
                  
                </p>
            </section>
        </div>
    );
};

export default About;