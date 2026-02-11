import {AnimatePresence, motion} from "framer-motion";

const COLS = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
};

/**
 * PageGrid component for consistent grid layouts with page transitions.
 *
 * @component
 * @module components/ui/PageGrid
 *
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Grid items (Cards) to render inside the layout.
 * @param {string | number} props.page - Unique page identifier for AnimatePresence key and smooth transitions.
 * @param {string} [props.className] - Additional CSS classes for the wrapper div.
 * @param {object} [props.rest] - Other props to spread on the wrapper div (e.g., data attributes).
 *
 * @returns {JSX.Element} Responsive 2-column grid with Framer Motion animations that fills viewport height uniformly.
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
        <div className={`flex flex-col ${className}`} {...rest}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={`page-${page}`}
                    initial={{opacity: 0, scale: 0.96}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.96}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                    layout
                    className={`grid ${colClass} gap-6 pt-4 items-start`}
                    role="grid"
                    aria-label={`Page ${page}`}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
