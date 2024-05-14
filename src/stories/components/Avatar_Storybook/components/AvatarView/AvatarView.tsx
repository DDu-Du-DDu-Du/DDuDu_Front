import { Avatar } from "@/app/_components/client";
import { AvatarProps } from "@/app/_components/client/Avatar/Avatar";

const AvatarView = (props: AvatarProps) => {
  return (
    <div style={{ padding: "50px 0" }}>
      <Avatar {...props} />
    </div>
  );
};

export default AvatarView;
