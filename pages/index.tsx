import 'react-slideshow-image/dist/styles.css';

import Head from 'next/head';
import Image from 'next/image';

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
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
      </Head>

      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage) => (
            <div key="">
              <div
                className={styles.slideImage}
                style={{ height: '70vh', width: '100%' }}
              >
                {' '}
                <Image src={slideImage} alt="sample" width={930} height={580} />
              </div>
            </div>
          ))}
        </Slide>
      </div>

      <div className={styles.homeText2}>
        Learn how to cook rice <a className={styles.koch}>👨‍🍳</a> Maz shows you
        the magic of how to prepare the rice in different ways
      </div>
    </Layout>
  );
}
