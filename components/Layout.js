import { css } from '@emotion/react';
import Head from 'next/head';
import Header from './Header';

// const rightSidebarStyle = css`
//   display: flex;
//   position: absolute;
//   width: 120px;
//   height: 610px;
//   top: 125px;
//   right: 10px;
//   background-color: #e2f2ff;
//   border-radius: 10%;
// `;
// const leftSidebarStyle = css`
//   display: grid;
//   position: absolute;
//   width: 120px;
//   height: 610px;
//   top: 125px;
//   left: 10px;
//   background-color: #e2f2ff;
//   border-radius: 10%;
//   margin: auto;
//   bottom: auto;
// `;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{props.children}</main>
      {/* <div css={rightSidebarStyle}></div>
      <div css={leftSidebarStyle}></div> */}
    </>
  );
}
