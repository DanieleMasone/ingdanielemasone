import React from "react";

export default function PageSection({title, children}) {
    return (
        <section className="p-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {title}
            </h2>
            {children}
        </section>
    );
}
