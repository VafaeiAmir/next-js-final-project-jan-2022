import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

const regisTextStyle = css`
  color: #660000;
  text-align: center;
  position: absolute;
  font-size: 260%;
  top: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 5rem !important;
`;
const containerStyle = css`
  position: relative;
  text-align: center;
`;
const diffRiceImageStyle = css`
  display: grid;
  justify-content: center;
  /* margin: auto; */
  /* margin-left: 100px;
  margin-right: 100px; */
  padding-left: 10px;
  padding-right: 10px;
`;
const threeImagestyle = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, calc(((59vw - 4rem) / 2.1)));
  grid-gap: 1rem;
  grid-template-rows: auto;
  margin: 0.5rem 0;
  padding: 0 7rem 0;
`;

export default function Registration() {
  return (
    <Layout>
      <Head>
        <title>Registration</title>
        <meta name="description" content="Registration" />
      </Head>
      <div css={containerStyle}>
        <div css={diffRiceImageStyle}>
          <Image
            src="/home-pics/threeRices.jpg"
            alt="three different types of rice"
            height={320}
            width={1180}
          />
        </div>
        <h1 css={regisTextStyle}>Registration</h1>
      </div>
      <div css={threeImagestyle}>
        <Image
          src="/home-pics/4.jpg"
          alt="tow hands of rice"
          height={300}
          width={270}
        />
        <Image
          src="/home-pics/shalizar.jpg"
          alt="people working in rice field"
          height={300}
          width={620}
        />
        <Image
          src="/home-pics/3holzspoons.jpg"
          alt="three different types of rice"
          height={300}
          width={270}
        />
      </div>
    </Layout>
  );
}
