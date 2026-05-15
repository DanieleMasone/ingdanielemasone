/**
 * Shared Tailwind class presets for the portfolio UI.
 *
 * These objects keep recurring layout, surface, and interaction styles in one
 * place so reusable components can stay visually consistent without adding a
 * larger design-system layer.
 *
 * @module styles/commonClasses
 */

/**
 * Layout class presets for page sections and section headings.
 *
 * @typedef {Object} LayoutClasses
 * @property {string} pageSection - Responsive wrapper used by route-level content sections.
 * @property {string} sectionTitle - Heading style used by titled portfolio sections.
 * @property {string} pageGridWrapper - Outer wrapper for animated paginated grids.
 * @property {string} pageGrid - Compact responsive spacing for route-level card grids.
 * @property {string} mobilePagination - Sticky mobile pagination wrapper that avoids extra vertical margins.
 * @property {string} desktopPagination - Desktop pagination wrapper aligned with section spacing.
 * @property {string} sectionIntro - Readable introductory copy used below route headings.
 * @property {string} resultSummary - Compact live result summary used near filters and paginated grids.
 * @property {string} filterableLayout - Width-constrained layout for pages with filter controls and paginated content.
 * @property {string} filterSidebar - Width-constrained sticky desktop sidebar wrapper for route-level filters.
 * @property {string} horizontalFilterBar - Horizontal filter controls with compact scrolling on small screens.
 * @property {string} sidebarFilterBar - Sidebar filter controls that switch from horizontal scrolling to a vertical desktop rail.
 * @property {string} timelineList - Semantic vertical timeline list with a decorative progress rail.
 * @property {string} timelineItem - Timeline item wrapper that reserves space for the rail marker.
 * @property {string} focusList - Responsive list layout for compact portfolio focus items.
 * @property {string} focusMarker - Decorative marker aligned with the first text line of portfolio focus items.
 * @property {string} tradingChartSection - Portfolio trading chart wrapper.
 * @property {string} tradingChartCanvas - Responsive height wrapper for the trading chart canvas.
 * @property {string} tradingViewToggleGroup - Responsive segmented button group for the trading chart view switcher.
 * @property {string} screenReaderOnly - Visually hidden content that remains available to assistive technologies.
 */

/**
 * Reusable layout classes used by PageSection and similar page containers.
 *
 * @type {LayoutClasses}
 */
export const layoutClasses = {
  pageSection: "mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 md:px-12 md:py-6",
  sectionTitle: "text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-3xl",
  pageGridWrapper: "flex flex-col",
  pageGrid: "grid items-start gap-4 sm:gap-5 lg:gap-6",
  mobilePagination:
      "md:hidden sticky top-0 z-20 -mx-4 border-b border-gray-200 bg-white/95 px-4 py-2 shadow-sm backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/90 sm:-mx-6 sm:px-6",
  desktopPagination: "hidden md:flex justify-center",
  sectionIntro: "max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300",
  resultSummary: "text-sm font-medium text-gray-600 dark:text-gray-300",
  filterableLayout:
      "grid min-w-0 gap-4 md:grid-cols-[12rem_minmax(0,1fr)] md:items-start lg:grid-cols-[14rem_minmax(0,1fr)]",
  filterSidebar: "min-w-0 md:sticky md:top-20",
  horizontalFilterBar:
      "flex flex-row gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0",
  sidebarFilterBar:
      "flex min-w-0 max-w-full flex-row gap-2 overflow-x-auto snap-x pb-2 scrollbar-hide md:flex-col md:overflow-visible md:snap-none md:pb-0",
  timelineList:
      "relative flex flex-col gap-4 before:absolute before:bottom-4 before:left-3 before:top-4 before:w-px before:bg-gray-200 dark:before:bg-gray-700 sm:before:left-4",
  timelineItem: "relative pl-8 sm:pl-10",
  focusList:
      "grid grid-cols-1 gap-2 text-left sm:grid-cols-3 md:flex md:flex-wrap md:justify-start",
  focusMarker: "mt-[0.42em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-300 md:mt-0",
  tradingChartSection:
      "mx-auto flex max-w-6xl flex-col gap-6 rounded-xl bg-white px-4 py-6 shadow-lg dark:bg-gray-900 sm:px-6",
  tradingChartCanvas: "h-[300px] w-full sm:h-[500px] md:h-[700px]",
  tradingViewToggleGroup:
      "flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-center",
  screenReaderOnly: "sr-only",
};

/**
 * Surface class presets for reusable content containers.
 *
 * @typedef {Object} SurfaceClasses
 * @property {string} card - Responsive card surface with border, shadow, backdrop blur, and dark-mode styles.
 * @property {string} insetText - Compact inset surface for descriptive text inside cards.
 * @property {string} metaBadge - Compact badge for card metadata such as category, period, or publication state.
 * @property {string} mutedMetaBadge - Compact neutral badge for secondary card metadata.
 * @property {string} statusBadgeBase - Base status badge for current-role timeline states.
 * @property {string} statusBadgeOngoing - Current-role timeline badge color.
 * @property {string} timelineMarker - Decorative marker used by the Experience page timeline.
 * @property {string} timelineMarkerActive - Highlighted marker for the current role in the Experience timeline.
 * @property {string} activeTimelineCard - Current-role card accent used in the Experience timeline.
 * @property {string} credentialIcon - Compact icon surface used by certification cards.
 * @property {string} initialAvatar - Local initials avatar used when a real portrait is not available.
 * @property {string} mediaFrame - Responsive 16:9 media surface for course cover thumbnails.
 * @property {string} mediaImage - Full-bleed cover image style used inside framed media surfaces.
 * @property {string} testimonialQuote - Readable quote surface used inside testimonial cards.
 * @property {string} focusItem - Responsive focus item surface used by the home page focus list.
 */

/**
 * Reusable surface classes used by portfolio cards.
 *
 * @type {SurfaceClasses}
 */
export const surfaceClasses = {
  card:
      "flex w-full flex-col rounded-xl border border-gray-200/60 bg-white/70 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/50 sm:p-5",
  insetText:
      "rounded-lg bg-white/50 px-3 py-2 text-sm text-gray-800 shadow-inner dark:bg-gray-900/50 dark:text-gray-200",
  metaBadge:
      "inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  mutedMetaBadge:
      "inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  statusBadgeBase:
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
  statusBadgeOngoing:
      "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-200",
  timelineMarker:
      "absolute left-1.5 top-5 h-3 w-3 rounded-full border-2 border-white bg-gray-300 shadow-sm dark:border-gray-900 dark:bg-gray-600 sm:left-2.5",
  timelineMarkerActive:
      "bg-sky-500 ring-4 ring-sky-100 dark:bg-sky-300 dark:ring-sky-400/20",
  activeTimelineCard:
      "border-sky-200/80 bg-sky-50/70 dark:border-sky-400/30 dark:bg-sky-500/10",
  credentialIcon:
      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-400/20",
  initialAvatar:
      "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold uppercase text-blue-700 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-400/20",
  mediaFrame:
      "aspect-[16/9] overflow-hidden rounded-lg border border-gray-200/70 bg-gray-50 shadow-inner dark:border-gray-700/70 dark:bg-gray-900/50",
  mediaImage:
      "h-full w-full object-cover",
  testimonialQuote:
      "relative rounded-lg border border-gray-100/70 bg-white/60 px-3 py-3 shadow-inner dark:border-gray-700/60 dark:bg-gray-900/40",
  focusItem:
      "inline-flex w-full items-start gap-2 rounded-lg border border-blue-200/80 bg-white/70 px-3 py-2 text-sm font-semibold leading-snug text-blue-900 shadow-sm backdrop-blur-sm transition dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-100 md:w-auto md:items-center md:rounded-full md:px-3.5 md:py-1.5",
};

/**
 * Interaction class presets for accessible buttons and links.
 *
 * @typedef {Object} InteractiveClasses
 * @property {string} focusRing - Shared focus-visible ring for keyboard navigation.
 * @property {string} focusRingInset - Shared inset focus-visible ring for menu items.
 * @property {string} buttonBase - Base layout and disabled styles for button controls.
 * @property {string} paginationButton - Base style for pagination controls.
 * @property {string} selectedButton - Visual state for active selectable buttons.
 * @property {string} unselectedButton - Visual state for inactive selectable buttons.
 * @property {string} linkButtonBase - Base layout for anchor elements rendered as CTA buttons.
 * @property {string} linkButtonGreen - Green CTA theme used for primary external links.
 * @property {string} linkButtonBlue - Blue CTA theme used for secondary external links.
 * @property {string} resourceLink - Compact external resource link used inside project cards.
 * @property {string} iconLink - Square icon-only link used for compact profile actions.
 * @property {string} toolbarButton - Compact header toolbar button used by language and theme controls.
 * @property {string} toolbarIconButton - Square icon-only header toolbar button with a stable hit target.
 * @property {string} dropdownPanel - Shared floating panel surface for compact header dropdowns.
 * @property {string} dropdownOption - Shared option row style for compact header dropdowns.
 * @property {string} dropdownOptionActive - Active option state for compact header dropdowns.
 * @property {string} textLink - Accessible inline text link style for legal and policy pages.
 */

/**
 * Reusable interaction classes used by buttons, links, and focusable surfaces.
 *
 * @type {InteractiveClasses}
 */
export const interactiveClasses = {
  focusRing:
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
  focusRingInset:
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-inset",
  buttonBase:
      "inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  paginationButton:
      "min-w-[110px] rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-800 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800",
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
  resourceLink:
      "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800",
  iconLink:
      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800",
  toolbarButton:
      "inline-flex min-h-10 items-center rounded-md border border-gray-200/70 bg-gray-100/80 text-sm font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-gray-200/80 dark:border-gray-700/70 dark:bg-gray-700/70 dark:text-gray-100 dark:hover:bg-gray-600/60",
  toolbarIconButton:
      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-200/70 bg-gray-100/80 text-gray-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-gray-200/80 dark:border-gray-700/70 dark:bg-gray-700/70 dark:text-gray-100 dark:hover:bg-gray-600/60",
  dropdownPanel:
      "absolute right-0 mt-2 origin-top-right overflow-hidden rounded-lg border border-gray-200/70 bg-white/95 shadow-lg ring-1 ring-black/10 backdrop-blur-md dark:border-gray-700/70 dark:bg-gray-800/95",
  dropdownOption:
      "flex w-full items-center px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-100/80 dark:text-gray-100 dark:hover:bg-gray-700/60",
  dropdownOptionActive:
      "bg-blue-100/80 font-semibold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  textLink:
      "text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
};
