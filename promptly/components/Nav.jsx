"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@public/images/logo.svg";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const CustomNavBar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex flex-center gap-2" href="/">
        <Image
          src={logo}
          alt="Promptly"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptly</p>
      </Link>
      {/*Desktop Navigation*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button className="outline_btn" onClick={signOut} type="button">
              Sign Out
            </button>

            <Link href="/profile">
              <div className="flex gap-2">
                <Image
                  src={session?.user?.image}
                  alt="User Avatar"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </div>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    className="black_btn"
                    type="button"
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                  >
                    Sign in with {provider.name}
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/*Mobile Navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={session?.user?.image}
              alt="User Avatar"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mg-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    className="black_btn"
                    type="button"
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                  >
                    Sign in with {provider.name}
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default CustomNavBar;
