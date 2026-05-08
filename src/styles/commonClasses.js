export const layoutClasses = {
  pageSection: "mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 md:px-12",
  sectionTitle: "text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl",
};

export const surfaceClasses = {
  card: "flex w-full flex-col rounded-3xl border border-gray-200 bg-white/60 p-4 shadow-md backdrop-blur-md transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/60",
};

export const interactiveClasses = {
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
  buttonBase:
    "inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  selectedButton:
    "border bg-blue-600 text-white shadow-md hover:shadow-lg dark:bg-blue-500",
  unselectedButton:
    "border bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
  linkButtonBase:
    "inline-flex min-h-11 flex-1 min-w-[140px] items-center justify-center rounded-lg px-6 py-3 text-center text-base font-semibold text-white shadow-md transition-colors",
  linkButtonGreen:
    "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus-visible:ring-green-400 dark:focus-visible:ring-green-300",
  linkButtonBlue:
    "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-300",
};
