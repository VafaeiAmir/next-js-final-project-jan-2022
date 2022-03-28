import 'react-slideshow-image/dist/styles.css';
import { css } from '@emotion/react';
// import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import Layout from '../components/Layout';
import styles from './pages.module.css';

const slideImages = [
  '/home-pics/spoons1.jpg',
  '/home-pics/1.jpg',
  '/home-pics/2.jpg',
  '/home-pics/3.jpg',
  '/home-pics/4.jpg',
];

type Props = {
  userObject: { username: string };
};

export default function Home(props: Props) {
  const [userId, setUserId] = useState<number>();
  function changeUserId(id: number) {
    setUserId(id);
  }
  // Avoid error if userId is undefined
  if (typeof userId === 'number') {
    const multipliedUserId = userId * 2;
    changeUserId(multipliedUserId);
  }

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
      </Head>

      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                className={styles.slideImage}
                style={{ height: '70vh', width: '100%' }}
              >
                {' '}
                <Image
                  className={styles.image}
                  src={slideImage}
                  alt="sample"
                  width={930}
                  height={580}
                />
              </div>
            </div>
          ))}
        </Slide>
      </div>

      <div className={styles.homeText2}>
        Learn how to cook rice{' '}
        <a className={styles.koch} href="">
          👨‍🍳
        </a>{' '}
        Maz shows you the magic of how to prepare the rice in different ways
      </div>
    </Layout>
  );
}
