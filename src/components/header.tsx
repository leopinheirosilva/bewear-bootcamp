"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Cart } from "./cart";
import MenuSheet from "./menu-sheet";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src={logoSrc} alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <MenuSheet />
        <Cart />
      </div>
    </header>
  );
};

export default Header;
