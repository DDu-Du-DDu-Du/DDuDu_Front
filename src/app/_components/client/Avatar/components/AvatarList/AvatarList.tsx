"use client";

import { useToggle } from "@/app/_hooks";
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
  const { isShow, handleClickToggle, handleClickClose } = useToggle();

  return (
    <>
      <div className="relative">
        <div
          className="inline-flex cursor-pointer items-center"
          onClick={handleClickToggle}
        >
          {users.slice(0, 2).map(({ userId, userName, userImage }, index) => (
            <div
              key={userId}
              className={twJoin(
                "relative h-[3rem] w-[3rem] overflow-hidden rounded-full",
                index === 1 && "-ml-[2.2rem] mt-[1rem]",
                index === 0 && "z-10",
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
        {isShow && (
          <AnimatePresence>
            <motion.ul
              className="absolute left-0 top-0 z-10 flex"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              whileTap={{ scale: 0.95 }}
            >
              {users.map((user) => (
                <li
                  className="mr-2 overflow-hidden rounded-full"
                  key={user.userId}
                >
                  <Avatar user={user} />
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        )}
      </div>
      {isShow && (
        <div
          className="fixed inset-0 z-0 size-[100%] cursor-pointer bg-black/50"
          onClick={handleClickClose}
        ></div>
      )}
    </>
  );
};

export default AvatarList;
