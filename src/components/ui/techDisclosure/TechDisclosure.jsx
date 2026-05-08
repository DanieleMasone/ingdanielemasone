import {Disclosure} from "@headlessui/react";
import {ChevronDown} from "lucide-react";
import clsx from "clsx";
import {interactiveClasses} from "../../../styles/commonClasses";

/**
 * Collapsible technology list used by experience and project cards.
 *
 * Converts a comma-separated technology string into compact badges inside a
 * Headless UI disclosure panel.
 *
 * @component
 * @module components/ui/techDisclosure/TechDisclosure
 *
 * @param {Object} props - Component props.
 * @param {string} props.techList - Comma-separated list of technologies to display.
 * @param {string} props.label - Text label for the disclosure button.
 * @returns {JSX.Element} Collapsible list of technology badges.
 */
export default function TechDisclosure({techList, label}) {
    return (
        <Disclosure>
            {({open}) => (
                <div className="pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
                    <Disclosure.Button
                        className={clsx(
                            "flex items-center rounded text-sm text-blue-600 hover:underline dark:text-blue-400",
                            interactiveClasses.focusRing
                        )}
                    >
                        <span>{label}</span>
                        <ChevronDown
                            aria-hidden="true"
                            className={`ml-1 w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 flex flex-wrap gap-2">
                        {techList.split(",").map((t, i) => (
                            <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300"
                            >
                                {t.trim()}
                            </span>
                        ))}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}
