import { DDuDuMainMenu, DDuDuSubMenu } from "./components";

export const DDuDuMenu = () => {
  return (
    <div className="w-ful flex flex-col items-center p-[2rem]">
      <DDuDuMainMenu />
      <DDuDuSubMenu />
    </div>
  );
};

export default DDuDuMenu;
