import { SwitchButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";

import Link from "next/link";

const MainHeader = () => {
  return (
    <header className="mb-[2rem]">
      <ul className="flex justify-end gap-[0.8rem] mb-[1.5rem]">
        <li>
          <Link
            href="/"
            title=""
          >
            <ExampleIcon />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            title=""
          >
            <ExampleIcon />
          </Link>
        </li>
        <li className="ml-[0.8rem]">
          <Link
            href="/"
            title=""
          >
            <ExampleIcon />
          </Link>
        </li>
      </ul>
      <SwitchButton />
    </header>
  );
};

export default MainHeader;
