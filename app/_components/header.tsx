import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between gap-3 px-5 pt-5">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image src="/logo.png" alt="eFood" fill />
        </Link>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
