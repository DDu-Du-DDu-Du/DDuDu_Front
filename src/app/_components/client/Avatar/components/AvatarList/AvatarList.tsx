"use client";

import { useClickAway, useToggle } from "@/app/_hooks";
import { UserType } from "@/app/_types/response/user";

import profileImage from "../../../../../../../public/assets/userProfile.svg";
import Avatar from "../../Avatar";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { twJoin } from "tailwind-merge";

export interface AvatarListProps {
  users: UserType[];
}

const AvatarList = ({ users }: AvatarListProps) => {
  const { isToggle, handleToggle, handleToggleOff } = useToggle();
  const ref = useClickAway<HTMLDivElement>(handleToggleOff);

  return (
    <>
      <div
        className="relative inline-flex"
        ref={ref}
      >
        <div
          className="inline-flex cursor-pointer items-center"
          onClick={handleToggle}
        >
          {users.slice(0, 2).map(({ userId, userName, userImage }, index) => (
            <div
              key={userId}
              className={twJoin(
                "relative h-[3rem] w-[3rem] overflow-hidden rounded-full",
                index === 1 && "-ml-[2.2rem] top-[0.3rem]",
                index === 0 && "z-10 mb-[0.5rem]",
              )}
            >
              <Image
                className="object-cover"
                src={userImage || profileImage}
                alt={userName}
                sizes="100%"
                priority
                fill
              />
            </div>
          ))}
        </div>
        <AnimatePresence>
          {isToggle && (
            <motion.ul
              className="absolute left-0 top-0 z-10 flex px-[0.5rem] py-[0.5rem] bg-white_100 shadow-shadow_500 rounded-radius5"
              initial={{ x: "-100%", y: "-4.5rem" }}
              animate={{ x: "0" }}
              exit={{ x: "-100%" }}
              whileTap={{ scale: 0.95 }}
            >
              {users.map((user) => (
                <li
                  className="mr-2 overflow-hidden rounded-full"
                  key={user.userId}
                >
                  <Avatar
                    size="tiny"
                    user={user}
                  />
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AvatarList;
