"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  Heart,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignInClick = () => signIn();
  const handleSignOutClick = () => signOut();

  return (
    <div className="flex justify-between gap-3 px-5 pt-5">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image src="/logo.png" alt="eFood" fill />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <div className="item-center flex gap-4">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image as string | undefined}
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {data?.user?.name?.split(" ")[0][0].toUpperCase()}
                  {data?.user?.name?.split(" ")[1][0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="font-semibold">{data.user.name}</h1>
                <span className="block text-xs text-muted-foreground">
                  {data.user.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-5">
              <h2 className="font-semibold">Olá. Faça seu login</h2>
              <Button onClick={handleSignInClick}>Entrar</Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span className="block">Início</span>
              </Link>
            </Button>
          </div>

          {data?.user && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                asChild
              >
                <Link href="/myorders">
                  <ScrollText size={16} />
                  <span className="block">Meus pedidos</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                asChild
              >
                <Link href="/my-favorites-restaurants">
                  <Heart size={16} />
                  <span className="block">Restaurantes favoritos</span>
                </Link>
              </Button>

              <Separator />

              <h1>TBA</h1>

              <Separator />

              <div className="py-6">
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                  onClick={handleSignOutClick}
                >
                  <LogOutIcon size={16} />
                  <span className="block">Sair</span>
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
