import { BottomSheet } from "../BottomSheet";

const AlarmSheet = () => {
  return (
    <BottomSheet
      isShow
      defaultHeight={"fit-content"}
      maxHeight={"fit-content"}
    >
      <div className="flex flex-col p-[2.4rem]">
        <div className="flex-1">
          <h3 className="mb-[0.6rem] font-medium text-size15">알림설정</h3>
          {/* <div>
            <strong>미리 알림 켜놓기</strong>
          </div> */}
          <div className="flex bg-white px-[1.6rem] py-[1.8rem] rounded-radius10">
            <select>
              <option value={0}>0시</option>
              {Array.from({ length: 24 }, (_, index) => (
                <option
                  key={index}
                  value={index + 1}
                >
                  {index + 1}시
                </option>
              ))}
            </select>
            <select>
              {Array.from({ length: 60 }, (_, index) => (
                <option
                  key={index}
                  value={index}
                >
                  {index}분
                </option>
              ))}
            </select>
          </div>
          <button
            // onClick={onClose}
            className="w-full max-w-[50rem] h-[5.6rem] bg-example_gray_700 rounded-radius15 mt-[2rem]"
          >
            확인
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default AlarmSheet;
