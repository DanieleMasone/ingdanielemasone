import{j as e,A as d,m as c}from"./motion-CG5jGWZC.js";import"./react-MQTchhl-.js";function g({children:r,className:s="",...a}){return e.jsx("section",{...a,className:`
                flex flex-col
                rounded-3xl
                bg-white/60 dark:bg-gray-800/60
                backdrop-blur-md
                border border-gray-200 dark:border-gray-700
                shadow-md hover:shadow-xl transition-shadow duration-300
                p-4 sm:p-6
                w-full
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70
                ${s}
            `,children:r})}function x({children:r,className:s="",...a}){return e.jsx("div",{...a,className:`
                p-4 sm:p-6 md:p-8
                text-sm sm:text-base
                text-gray-900 dark:text-gray-300
                ${s}
            `.trim(),children:r})}const i={1:"grid-cols-1",2:"grid-cols-1 md:grid-cols-2",3:"grid-cols-1 md:grid-cols-2 xl:grid-cols-3",4:"grid-cols-1 md:grid-cols-2 xl:grid-cols-4"};function u({children:r,page:s,columns:a=2,className:o="",...t}){const l=i[a]??i[2];return e.jsx("div",{className:`flex flex-col ${o}`,...t,children:e.jsx(d,{mode:"wait",children:e.jsx(c.div,{initial:{opacity:0,scale:.96},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.96},transition:{duration:.3,ease:"easeOut"},layout:!0,className:`grid ${l} gap-6 pt-4 items-start`,role:"grid","aria-label":`Page ${s}`,children:r},`page-${s}`)})})}export{g as C,u as P,x as a};
//# sourceMappingURL=PageGrid-BALIQbEo.js.map
