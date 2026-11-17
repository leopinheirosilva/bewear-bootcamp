"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Cart } from "./cart";
import MenuSheet from "./menu-sheet";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <MenuSheet
          triggerButton={
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          }
        />
        <Cart />
      </div>
    </header>
  );
};

export default Header;
