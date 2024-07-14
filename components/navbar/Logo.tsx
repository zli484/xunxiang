import Link from "next/link";
import { LuTent } from "react-icons/lu";
import { Button } from "../ui/button";
import xunxiang from "@/public/img/logo.png";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/">
      <Image className="h-8 w-auto" src={xunxiang} alt="Lara" />
    </Link>
  );
}
export default Logo;
