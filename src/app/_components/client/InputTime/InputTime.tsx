import { InputTimeRange, InputTimeSingle } from "./components";

interface InputTimeProps {
  type?: "single" | "range";
  beginAt: string;
  nameStart: string;
  labelStart: string;
  nameEnd?: string;
  labelEnd?: string;
}

const InputTime = ({
  type = "single",
  beginAt,
  nameStart,
  labelStart,
  nameEnd,
  labelEnd,
}: InputTimeProps) => {
  return (
    <>
      {type === "single" && (
        <InputTimeSingle
          name={nameStart}
          label={labelStart}
        />
      )}
      {type === "range" && labelEnd && nameEnd && (
        <InputTimeRange
          beginAt={beginAt}
          nameStart={nameStart}
          labelStart={labelStart}
          nameEnd={nameEnd}
          labelEnd={labelEnd}
        />
      )}
    </>
  );
};

export default InputTime;
