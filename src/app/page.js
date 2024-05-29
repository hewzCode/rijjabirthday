'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import { useTransform, useScroll, motion } from 'framer-motion';


export default function Home() {
  
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (


  

    <main className={styles.main}>
      <section id='Section 1'>
          <div>Happy</div>
        </section>
        <section id='Section 2'>
          <div>Birthday</div>
        </section>
        <section id='Section 3'>
          <div>to</div>
        </section>
        <section id='Section 4'>
          <div>you</div>
        </section>
        <section id='Section 5'>
          <div>💜Rijja💜</div>
        </section>
    
      <div ref={gallery} className={styles.gallery}>
        <Column images={["image1.png", "image2.png", "image3.png",]} y={y}/>
        <Column images={["image2.png", "image3.png", "image4.png",]} y={y2}/>
        <Column images={["image5.png", "image4.png", "image7.png"]} y={y3}/>
        <Column images={["image8.png", "image9.png", "image10.png"]} y={y4}/>
      </div>

      <section id='Section 6'>
          <div>I hope you have a good day</div>
        </section>
      

    </main>
    
  )
}

const Column = ({images, y}) => {
  return (
    <motion.div 
      className={styles.column}
      style={{y}}
      >
      {
        images.map( (src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image 
              src={`/images/${src}`}
              alt='image'
              fill
            />
          </div>
        })
      }
    </motion.div>
  )
}