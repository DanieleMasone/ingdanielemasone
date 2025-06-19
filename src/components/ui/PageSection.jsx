import React from "react";

export default function PageSection({title, children}) {
    return (
        <section className="px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                {title}
            </h2>
            {children}
        </section>
    );
}
