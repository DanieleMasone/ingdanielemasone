import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';

export default function Experience() {
    const experiences = [
        {
            role: "Front End Architect / Team Leader",
            company: "RGI Group",
            period: "2021 – oggi",
            tech: "AngularJS, Angular 8/12, Docker, Kubernetes, Quarkus",
        },
        {
            role: "Full Stack Software Engineer",
            company: "Italiaonline",
            period: "2019 – 2021",
            tech: "Angular 10, Spring, Microservizi, Docker Swarm",
        },
        {
            role: "Full Stack Software Engineer",
            company: "Tecnavia Apps",
            period: "2018 – 2019",
            tech: "PHP, React Native, Zend, NodeJS",
        },
        {
            role: "Junior Software Engineer",
            company: "Teoresi / Meware / Piksel",
            period: "2015 – 2018",
            tech: "JavaEE, Spring, Hibernate, Wildfly",
        }
    ];

    return (
        <section className="p-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Esperienza</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((exp, i) => (
                    <Card
                        key={i}
                        className="bg-white border border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white transition-colors duration-300"
                    >
                        <CardContent>
                            <h3 className="text-lg font-semibold">{exp.role}</h3>
                            <p className="text-gray-700 dark:text-gray-400">{exp.company}</p>
                            <p className="text-sm mb-2 text-gray-600 dark:text-gray-500">{exp.period}</p>

                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <Disclosure.Button
                                            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                                        >
                                            <span>Mostra stack</span>
                                            <ChevronDown
                                                className={`ml-1 w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                            {exp.tech}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
