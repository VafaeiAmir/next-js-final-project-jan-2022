import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerStyle = css`
  background-color: #ffe6d4;
  border-radius: 10px;
  padding: 10px 10px;
  margin: 8px 8px 20px;
  font-size: 1.2rem;
  display: flex;

  a + a {
    margin-left: 20px;
    position: relative;
  }
  > div:first-child {
    margin-right: auto;
    color: #660000;
  }
`;
const logoTextStyle = css`
  font-size: 1.6rem;
  text-justify: auto;
  color: #660000;
  font-weight: bold;
`;
//
export default function Header() {
  return (
    <nav css={headerStyle}>
      <div>
        <a css={logoTextStyle}>NICE RICE</a>
        <a></a>
        <Image src="/logo.jpg" alt="spoon logo" width={85} height={30} />
        <a></a>
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/recipes">
        <a>Recipes</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/registration">
        <a>Registration</a>
      </Link>
    </nav>
  );
}
