"use client";

import profileImage from "../../../../../public/assets/userProfile.svg";
import Avatar from "../Avatar/Avatar";
import { useClickAvatarList } from "./hooks";

import { motion } from "framer-motion";
import Image from "next/image";

interface AvatarProps {
  id: string;
  avatarImage: string | null;
  name: string;
}

export interface AvatarListProps {
  avatars: AvatarProps[];
}

const AvatarList = ({ avatars }: AvatarListProps) => {
  const { toggle, handleClickAvatar, handleClickBackground } = useClickAvatarList();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleClickAvatar}
        >
          {avatars.slice(0, 2).map(({ id, name, avatarImage }, index) => (
            <div
              key={id}
              className={`relative w-[3rem] h-[3rem] rounded-full overflow-hidden ${index === 1 && "-ml-[2.2rem]"} ${index === 1 && "mt-[1rem]"} ${index === 0 && "z-10"}`}
            >
              <Image
                className="object-cover"
                src={avatarImage || profileImage}
                alt={name}
                sizes="100%"
                priority
                fill
              />
            </div>
          ))}
        </div>

        <motion.ul
          className="absolute left-0 top-0 flex z-10"
          initial={{ opacity: 0, x: "-100%" }}
          animate={toggle ? "open" : "closed"}
          variants={variants}
          whileTap={{ scale: 0.9 }}
        >
          {avatars.map(({ id, avatarImage }) => (
            <li
              className="mr-2 rounded-full overflow-hidden"
              key={id}
            >
              <Avatar
                avatarImage={avatarImage}
                userId={id}
              />
            </li>
          ))}
        </motion.ul>
      </div>
      {toggle && (
        <div
          className="fixed size-[100%] inset-0 bg-black/50 z-0 cursor-pointer"
          onClick={handleClickBackground}
        ></div>
      )}
    </>
  );
};

export default AvatarList;
