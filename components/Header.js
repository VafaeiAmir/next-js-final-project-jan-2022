import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerStyle = css`
  background-color: #ffe6d4;
  text-align: center;
  padding: 1rem 7rem;
  border-radius: 10px;
  margin: 8px;
  a + a {
    margin: 15px;
    color: #660000;
    font-size: 1.2rem;
  }
`;

const logoTextStyle = css`
  text-align: start;
  font-size: 1.5rem;
  color: #660000;
  font-weight: bold;
`;

export default function Header() {
  return (
    <header css={headerStyle}>
      <a css={logoTextStyle}>NICE RICE</a>
      <a>
        <Image src="/logo.jpg" alt="spoon logo" width={80} height={25} />
      </a>

      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/login">
        <a>Recipes Log In/Out</a>
      </Link>
      <Link href="/subscribe">
        <a>Subscribe</a>
      </Link>
    </header>
  );
}
