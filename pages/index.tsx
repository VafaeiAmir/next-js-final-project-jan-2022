import 'react-slideshow-image/dist/styles.css';
import { css } from '@emotion/react';
// import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import Layout from '../components/Layout';

const homeText2Style = css`
  justify-content: center;
  text-align: center;
  width: 700px;
  font-size: 1.7rem;
  line-height: 1;
  margin: auto;
  /* margin-left: 140px;
  margin-right: 140px; */
  margin-top: 1rem;
  color: #660000;
  border: 2px solid #fff;
  box-shadow: 10px 10px 5px #ccc;
`;

const kochSytle = css`
  font-size: 2rem;
  :hover {
    font-size: 3rem;
    transition: 0.3s;
  }
`;
const slideImageFrameStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const imageStyle = css`
  /* border: 2px solid #fff;
  box-shadow: 10px 10px 5px #ccc; */
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
                css={slideImageFrameStyle}
                style={{ height: '70vh', width: '100%' }}
              >
                {' '}
                <Image
                  css={imageStyle}
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

      <div css={homeText2Style}>
        Learn how to cook rice{' '}
        <a css={kochSytle} href="">
          👨‍🍳
        </a>{' '}
        Maz shows you the magic of how to prepare the rice in different ways
      </div>
    </Layout>
  );
}
