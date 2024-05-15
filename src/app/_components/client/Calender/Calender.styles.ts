export const BottomSheetCalenderStyles = {
  caption: "flex justify-start py-2 mb-4 relative w-full",
  caption_label: "text-size15 font-medium text-gray-900",
  nav: "flex items-center",
  nav_button:
    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300 text-[#8e8e8e]",
  table: "w-full border-collapse",
  head_row: "flex font-medium text-[#9c9c9c]",
  head_cell: "m-0.5 w-full font-normal text-size11",
  row: "flex w-full mt-2",
  cell: "rounded-md h-9 w-full text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
  day: "h-9 w-9 p-0 font-normal",
  day_range_end: "day-range-end",
  day_selected:
    "rounded-full bg-[#a8a8a8] text-white hover:bg-[#a8a8a8] hover:text-white focus:bg-[#a8a8a8] focus:text-white",
  day_today: "rounded-md bg-gray-200 text-gray-900",
  day_outside:
    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
  day_disabled: "text-gray-500 opacity-50",
  day_hidden: "invisible",
};
