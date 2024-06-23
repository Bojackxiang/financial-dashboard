import Image from "next/image";
import Link from "next/link";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <Image src="images/logo.svg" width={50} height={50} alt="logo" />
        <p className="font-semibold text-white text=2xl ml-0.5">Hybrid</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
