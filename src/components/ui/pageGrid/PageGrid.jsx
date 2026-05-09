import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import {layoutClasses} from "../../../styles/commonClasses";

const COLS = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
};

/**
 * Responsive grid wrapper for paginated portfolio sections.
 *
 * Uses Framer Motion to animate page changes while keeping the column layout
 * consistent across route-level cards. Spacing is centralized in commonClasses
 * to keep paginated pages compact on mobile and desktop. The grid remains a
 * visual layout only, avoiding ARIA grid semantics because children are not
 * interactive grid cells.
 *
 * @component
 * @module components/ui/pageGrid/PageGrid
 *
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Grid items to render inside the layout.
 * @param {string | number} props.page - Unique page identifier used as the animation key.
 * @param {1 | 2 | 3 | 4} [props.columns=2] - Maximum responsive column count.
 * @param {string} [props.className] - Additional CSS classes for the wrapper div.
 * @returns {JSX.Element} Responsive grid with animated page transitions.
 */
export function PageGrid({
                             children,
                             page,
                             columns = 2,
                             className = "",
                             ...rest
                         }) {
    const colClass = COLS[columns] ?? COLS[2];

    return (
        <div className={clsx(layoutClasses.pageGridWrapper, className)} {...rest}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={`page-${page}`}
                    initial={{opacity: 0, scale: 0.96}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.96}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                    layout
                    className={clsx(layoutClasses.pageGrid, colClass)}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
