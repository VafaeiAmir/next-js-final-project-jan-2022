import { css, Global } from '@emotion/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 1px;
            font-family: 'Times New Roman', Times, serif;
          }
          main {
            margin: 0 8px;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
