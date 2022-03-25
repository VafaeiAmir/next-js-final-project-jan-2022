import 'react-slideshow-image/dist/styles.css';
import { css } from '@emotion/react';
// import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import Layout from '../components/Layout';

const homeText2Style = css`
  text-align: center;
  font-size: 1.7rem;
  line-height: 1;
  margin-left: 140px;
  margin-right: 140px;
  margin-top: 1rem;
  color: #660000;
`;

const kochSytle = css`
  font-size: 2rem;
  :hover {
    font-size: 3rem;
    transition: 0.3s;
  }
`;
const slideImageStyle = css`
  display: flex;
  justify-content: center;
`;
const imageInsideStyle = css`
  border: 2px solid #fff;
  box-shadow: 10px 10px 5px #ccc;
`;

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
                css={slideImageStyle}
                style={{ height: '80vh', width: '100%' }}
              >
                {' '}
                <Image
                  css={imageInsideStyle}
                  src={slideImage}
                  alt="sample"
                  width={880}
                  height={530}
                />
              </div>
            </div>
          ))}
        </Slide>
      </div>

      <div css={homeText2Style}>
        Learn to Cook Rice{' '}
        <a css={kochSytle} href="">
          👨‍🍳
        </a>{' '}
        Maz shows you the magic of how to prepare the rice in different ways
      </div>
    </Layout>
  );
}
