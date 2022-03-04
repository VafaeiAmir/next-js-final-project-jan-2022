import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
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
const homeImageStyle = css`
  display: flex;
  justify-content: center;
  margin-bottom: -10px;
  border-radius: 20px;
  /* border: 5px solid #f3dede; */
  padding: 4px;
  margin-left: 200px;
  margin-right: 200px;
`;
const kochSytle = css`
  font-size: 2rem;
  :hover {
    font-size: 3rem;
    transition: 0.3s;
  }
`;
const buttonStyle = css`
  font-size: 1.5rem;
  border-color: transparent;
  border-radius: 20px;
  padding: 3rem;
  :hover {
    background-color: #edf6fd;
    transition: 0.3s;
  }
`;

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Head>

      <div css={homeImageStyle}>
        <button css={buttonStyle}>⏪</button>
        <Image
          src="/home-pics/spoons1.jpg"
          alt="tow Spoons with rice"
          width={880}
          height={580}
        />
        <button css={buttonStyle}>⏩</button>
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
