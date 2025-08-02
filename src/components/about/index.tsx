'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/button';
import './styles.scss';
import Link from 'next/link';

interface AboutProps {
  title: string;
  description: string;
  button: string;
  buttonLink?: string;
}

const variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } }
};

const viewPort = {
  once: true,
  margin: "0px",
  // amount: 0.3
}

const About = ({ title, description, button, buttonLink }: AboutProps) => {
  return (
    <section className="about">
      <motion.div 
        className="about-container"
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={viewPort}
      >
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={viewPort}
        >
          {title}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={viewPort}
        >
          {description}
        </motion.p>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={viewPort}
          className="about-button"
        >
          <Link href={buttonLink || ''} target="_blank">
            <Button>{button}</Button>
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;