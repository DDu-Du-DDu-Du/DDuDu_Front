import { scrollToTop } from "@/app/_utils";

interface HeaderLabelProps {
  label: string;
}

const HeaderLabel = ({ label }: HeaderLabelProps) => {
  return (
    <p
      className="select-none text-size15"
      onClick={scrollToTop}
    >
      {label}
    </p>
  );
};

export default HeaderLabel;
