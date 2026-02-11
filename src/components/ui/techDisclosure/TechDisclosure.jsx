import {Disclosure} from "@headlessui/react";
import {ChevronDown} from "lucide-react";

/**
 * techDisclosure is a collapsible UI component that displays a list of technologies.
 * It shows a label that can be clicked to expand or collapse the list.
 *
 * @component
 * @module components/ui/techDisclosure/TechDisclosure
 *
 * @param {Object} props
 * @param {string} props.techList - Comma-separated list of technologies to display.
 * @param {string} props.label - Text label for the disclosure button.
 * @returns {JSX.Element}
 */
export default function TechDisclosure({techList, label}) {
    return (
        <Disclosure>
            {({open}) => (
                <div className="pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
                    <Disclosure.Button
                        className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        <span>{label}</span>
                        <ChevronDown
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
