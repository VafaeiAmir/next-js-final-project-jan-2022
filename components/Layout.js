import { css } from '@emotion/react';
import Head from 'next/head';
import Header from './Header';

const rightGridStyles = css`
  display: flex;
  position: absolute;
  margin-top: 20px;
  padding: 335px 60px;
  top: 54px;
  right: 13px;
  background-color: #edf6fd;
  border-radius: 10%;
`;
const leftGridStyles = css`
  display: flex;
  position: absolute;
  margin-top: 20px;
  padding: 335px 60px;
  top: 54px;
  left: 13px;
  background-color: #edf6fd;
  border-radius: 10%;
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{props.children}</main>
      <div css={rightGridStyles}></div>
      <div css={leftGridStyles}></div>
    </>
  );
}
