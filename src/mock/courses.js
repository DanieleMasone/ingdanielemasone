import gitPhoto from '../assets/courses/GIT.png';
import cPhoto from '../assets/courses/C.png';
import angularjsPhoto from '../assets/courses/ANGULARJS.png';
import assemblyPhoto from '../assets/courses/ASSEMBLY.png';
import cplusplusPhoto from '../assets/courses/CPLUSPLUS.png';
import html5Photo from '../assets/courses/HTML5.png';
import javaPhoto from '../assets/courses/JAVA.png';
import javascriptPhoto from '../assets/courses/JAVASCRIPT.png';
import jqueryPhoto from '../assets/courses/JQUERY.png';
import phpPhoto from '../assets/courses/PHP.png';
import sqlPhoto from '../assets/courses/SQL.png';
import typescriptPhoto from '../assets/courses/TYPESCRIPT.png';
//import angular2Photo from '../assets/courses/ANGULAR2.png';
//import reactjsPhoto from '../assets/courses/REACTJS.png';
//import nodejsPhoto from '../assets/courses/NODEJS.png';

/**
 * Static course entries displayed by the Courses page.
 *
 * Title, description, and duration are translation keys; images are bundled
 * assets so the course cards remain available offline after deployment.
 *
 * @type {Array<{nameKey: string, descKey: string, durationKey: string, tech: string, link: string, image: string}>}
 * @module mock/courses
 */
export const courses = [
    {
        nameKey: "courses_page.git.title",
        descKey: "courses_page.git.description",
        durationKey: "courses_page.git.duration",
        tech: "Git",
        link: "https://www.udemy.com/course/corso-git/",
		//payLink: "https://www.udemy.com/course/corso-git/?referralCode=98BEA398477C05BFEA5E",
        image: gitPhoto
    },
    {
        nameKey: "courses_page.typescript.title",
        descKey: "courses_page.typescript.description",
        durationKey: "courses_page.typescript.duration",
        tech: "Typescript, data types, module, OOP",
        link: "https://www.udemy.com/course/typescript-da-zero/",
		//payLink: "https://www.udemy.com/course/typescript-da-zero/?referralCode=28EC7F597E0EAA2240A2",
        image: typescriptPhoto
    },
    {
        nameKey: "courses_page.jQuery.title",
        descKey: "courses_page.jQuery.description",
        durationKey: "courses_page.jQuery.duration",
        tech: "jQuery, Selectors, Classes management, Traversing, Manipulating CSS, Bind, Events",
        link: "https://www.udemy.com/course/corso-jquery/",
		//payLink: "https://www.udemy.com/course/corso-jquery/?referralCode=990D681D4A01296D0B77",
        image: jqueryPhoto
    },
    {
        nameKey: "courses_page.php.title",
        descKey: "courses_page.php.description",
        durationKey: "courses_page.php.duration",
        tech: "Php, data types, Control flow statements, iterations, Regular expressions, Arrays, OOP, HTTP calls, File system",
        link: "https://www.udemy.com/course/corso-di-programmazione-php/",
		//payLink: "https://www.udemy.com/course/corso-di-programmazione-php/?referralCode=75C511DE366A15CB45C1",
        image: phpPhoto
    },
    {
        nameKey: "courses_page.cpp.title",
        descKey: "courses_page.cpp.description",
        durationKey: "courses_page.cpp.duration",
        tech: "C++, data types, control flow statements, iterations, I/O system, arrays and structs, OOP, lambda expressions",
        link: "https://www.udemy.com/course/corso-di-programmazione-c-plus-plus/",
		//payLink: "https://www.udemy.com/course/corso-di-programmazione-c-plus-plus/?referralCode=9FF2F8657D38430D9785",
        image: cplusplusPhoto
    },
    {
        nameKey: "courses_page.html5.title",
        descKey: "courses_page.html5.description",
        durationKey: "courses_page.html5.duration",
        tech: "HTML5, APIs (WebStorage, Web Workers, Drag & Drop), Canvas & Multimedia, Header, Footer, Aside",
        link: "https://www.udemy.com/course/corso-html5/",
		//payLink: "https://www.udemy.com/course/corso-html5/?referralCode=E763B69EA07BC0B5A4F8",
        image: html5Photo
    },
    {
        nameKey: "courses_page.angularJS.title",
        descKey: "courses_page.angularJS.description",
        durationKey: "courses_page.angularJS.duration",
        tech: "AngularJS, scope (the hierarchy), services ($http), control flow statement, directives (bind, ng-class, ng-repeat...), filters, custom directives",
        link: "https://www.udemy.com/course/corso-angularjs/",
		//payLink: "https://www.udemy.com/course/corso-angularjs/?referralCode=690C1A89CAEF05B360C3",
        image: angularjsPhoto
    },
    {
        nameKey: "courses_page.java.title",
        descKey: "courses_page.java.description",
        durationKey: "courses_page.java.duration",
        tech: "Java, Control flow statements, iterations, arrays, OOP, File management, Lambda expressions, MySQL, MongoDB ",
        link: "https://www.udemy.com/course/corso-di-programmazione-java/",
		//payLink: "https://www.udemy.com/course/corso-di-programmazione-java/?referralCode=BACA0670CBDA098CD963",
        image: javaPhoto
    },
    {
        nameKey: "courses_page.javascript.title",
        descKey: "courses_page.javascript.description",
        durationKey: "courses_page.javascript.duration",
        tech: "Javascript, control flow statements, iterations, arrays, DOM, Design patterns, Arrow function",
        link: "https://www.udemy.com/course/corso-di-programmazione-javascript/",
		//payLink: "https://www.udemy.com/course/corso-di-programmazione-javascript/?referralCode=782D21BE08B1AEFC8118",
        image: javascriptPhoto
    },
    {
        nameKey: "courses_page.c.title",
        descKey: "courses_page.c.description",
        durationKey: "courses_page.c.duration",
        tech: "C, data types, control flow statements, iterations, arrays, structs",
        link: "https://www.udemy.com/course/corso-di-programmazione-c/",
		//payLink: "https://www.udemy.com/course/corso-di-programmazione-c/?referralCode=A9534E5E8A950816D547",
        image: cPhoto
    },
    {
        nameKey: "courses_page.assembler.title",
        descKey: "courses_page.assembler.description",
        durationKey: "courses_page.assembler.duration",
        tech: "AssemblerX86, data types, control flow statement, iterations, arrays",
        link: "https://www.udemy.com/course/corso-di-programmazione-assembler-8086/",
		//payLink: "https://www.udemy.com/course/corso-di-programmazione-assembler-8086/?referralCode=92DD26030DF72AE77EFD",
        image: assemblyPhoto
    },
    {
        nameKey: "courses_page.sql.title",
        descKey: "courses_page.sql.description",
        durationKey: "courses_page.sql.duration",
        tech: "SQL, C, E/R, DB design",
        link: "https://www.udemy.com/course/corso-sulle-basi-di-dati-dallo-schema-er-allsql/",
		//payLink: "https://www.udemy.com/course/corso-sulle-basi-di-dati-dallo-schema-er-allsql/?referralCode=8322DB0180AFFF996692",
        image: sqlPhoto
    }
	// {
    //     nameKey: "courses_page.angular2.title",
    //     descKey: "courses_page.angular2.description",
    //     durationKey: "courses_page.angular2.duration",
    //     tech: "",
    //     link: "https://www.udemy.com/course/corso-angular-2/",
	// 	   payLink: "https://www.udemy.com/course/corso-angular-2/?referralCode=36D965FD0BB58840683C",
    //     image: angular2Photo
    // },
		// {
    //     nameKey: "courses_page.reactJS.title",
    //     descKey: "courses_page.reactJS.description",
    //     durationKey: "courses_page.reactJS.duration",
    //     tech: "",
    //     link: "https://www.udemy.com/course/corso-react-js/",
	// 	   payLink: "https://www.udemy.com/course/corso-react-js/?referralCode=C9A88EF0B139B3A27F8E",
    //     image: reactjsPhoto
    // },
		// {
    //     nameKey: "courses_page..title",
    //     descKey: "courses_page..description",
    //     durationKey: "courses_page..duration",
    //     tech: "",
    //     link: "https://www.udemy.com/course/corso-nodejs/",
	// 	   payLink: "https://www.udemy.com/course/corso-nodejs/?referralCode=7C99736BE57E882B7837",
    //     image: nodejsPhoto
    // }
];
