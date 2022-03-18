import { css, Interpolation, Theme } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { User } from '../util/database';

const headerStyle = css`
  background-color: #ffe6d4;
  border-radius: 10px;
  padding: 10px 10px;
  margin: 8px 10px 5px;
  font-size: 1.2rem;
  display: flex;

  a + a {
    margin-left: 20px;
    position: relative;
    color: #660000;
    :hover {
      color: red;
      transition: 0.3s;
    }
  }
  > div:first-child {
    margin-right: auto;
  }
`;
const logoTextStyle = css`
  font-size: 1.6rem;
  text-justify: auto;
  color: #660000;
  font-weight: bold;
`;
type Props = {
  userObject?: User;
};

function Anchor({
  children,
  ...restProps
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  css?: Interpolation<Theme>;
}) {
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  return (
    <header css={headerStyle}>
      <div>
        <a css={logoTextStyle}>NICE RICE</a>
        <a></a>
        <Image src="/logo.jpg" alt="spoon logo" width={85} height={30} />
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/recipes">
        <a>Recipes</a>
      </Link>
      <Link href="/about">
        <a data-test-id="header-about-link">About</a>
      </Link>
      <Link href="/users/protected-user">
        <a data-test-id="header-management-link">
          {props.userObject && <a>{props.userObject.username}</a>}
        </a>
      </Link>
      {/* {props.userObject && <div>{props.userObject.username}</div>}
      <a></a> */}
      {props.userObject ? (
        <Anchor href="/logout">Logout</Anchor>
      ) : (
        <>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/registration">
            <a>Registration</a>
          </Link>
        </>
      )}
    </header>
  );
}
