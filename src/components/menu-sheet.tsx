"use client";

import { House, LogInIcon, LogOutIcon, Truck } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

import { categoryTable } from "@/db/schema";
import { useCategories } from "@/hooks/queries/use-categories";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface MenuSheetProps {
  triggerButton?: ReactNode;
  categories?: (typeof categoryTable.$inferSelect)[];
}

const MenuSheet = ({ triggerButton, categories }: MenuSheetProps) => {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const { data: categoriesData } = useCategories({
    initialData: categories,
  });

  const availableCategories = categories ?? categoriesData ?? [];

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {triggerButton && <SheetTrigger asChild>{triggerButton}</SheetTrigger>}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="space-y-5 px-5">
            {session?.user ? (
              <>
                <div className="flex flex-col justify-between space-y-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={session?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {session?.user?.name?.split(" ")?.[0]?.[0]}
                        {session?.user?.name?.split(" ")?.[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{session?.user?.name}</h3>
                      <span className="text-muted-foreground block text-xs">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <Link href="/" onClick={() => setOpen(false)}>
                    <div className="flex gap-3">
                      <House />
                      <h2 className="font-semibold">Início</h2>
                    </div>
                  </Link>
                  <Link href="/my-orders" onClick={() => setOpen(false)}>
                    <div className="flex gap-3">
                      <Truck />
                      <h2 className="font-semibold">Meus pedidos</h2>
                    </div>
                  </Link>
                  <Separator />
                  <div className="flex flex-col gap-6">
                    <h2 className="font-semibold text-muted-foreground">CATEGORIAS</h2>
                    {availableCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        onClick={() => setOpen(false)}
                      >
                        <h2 className=" font-semibold">
                          {category.name}
                        </h2>
                      </Link>
                    ))}
                  </div>
                  <Separator />
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => authClient.signOut()}
                  >
                    <LogOutIcon className="size-5" />
                    Sair da conta
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" asChild variant="outline">
                  <Link href="/authentication" onClick={() => setOpen(false)}>
                    <LogInIcon />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuSheet;
