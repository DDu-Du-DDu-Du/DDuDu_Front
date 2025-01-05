export const bottomSheetCalendarStyles = {
  caption: "flex justify-between py-2 mb-8 relative w-full select-none",
  caption_label: "text-size15 font-medium text-gray-900",
  nav: "flex items-center",
  nav_button:
    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300 text-example_gray_1200",
  table: "w-full border-collapse",
  head_row: "flex font-medium text-example_gray_1100 select-none",
  head_cell: "m-0.5 w-full h-[3rem] font-normal text-size11",
  row: "flex w-full mt-2",
  cell: "rounded-md h-[3rem] w-full text-center text-[1.1rem] p-0 m-0.5 relative",
  day: "h-[3rem] w-[3rem] p-0 font-normal",
  day_range_end: "day-range-end",
  day_selected: "rounded-full bg-example_gray_1000 text-white focus:bg-example_gray_1000",
  day_outside:
    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
  day_disabled: "text-gray-500 opacity-50",
  day_hidden: "invisible",
};

export const feedCalendarStyles = {
  caption: "flex justify-between py-2 mb-4 relative w-full select-none items-center h-20",
  caption_label: "text-size15 font-medium text-gray-900",
  nav: "flex items-center",
  nav_button:
    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300 text-example_gray_1200",
  table: "w-full border-collapse",
  head_row: "flex font-medium text-example_gray_1100 select-none",
  head_cell: "m-0.5 w-full font-normal text-size11",
  row: "flex w-full",
  cell: "rounded-md h-[5.4rem] flex items-end justify-center w-full text-center text-size11 p-0 m-1 relative",
  day: "h-[5.4rem] w-12 p-0 font-normal flex flex-col justify-end items-center gap-4",
  day_range_end: "day-range-end",
  day_selected: "rounded-full bg-example_gray_1000 text-white focus:bg-example_gray_1000",
  day_outside:
    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
  day_disabled: "text-gray-500 opacity-50",
  day_hidden: "invisible",
};
