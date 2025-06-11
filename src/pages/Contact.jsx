import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Input} from "../components/ui/Input";
import {Button} from "../components/ui/Button";
import {Textarea} from "../components/ui/Textarea";

export default function Contact() {
    const {t} = useTranslation();
    const [form, setForm] = useState({name: "", email: "", message: ""});

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dati inviati:", form);
        alert(t("contact_success"));
    };

    return (
        <section className="p-8 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("contact_title")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("contact_name_placeholder")}
                    required
                    className="bg-white text-gray-900 border border-gray-300 rounded-md
                           focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
                           dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />
                <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("contact_email_placeholder")}
                    required
                    className="bg-white text-gray-900 border border-gray-300 rounded-md
                           focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
                           dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />
                <Textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contact_message_placeholder")}
                    required
                    className="bg-white text-gray-900 border border-gray-300 rounded-md
                           focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
                           dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />
                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold rounded-md
                           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                           dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                >
                    {t("contact_submit")}
                </Button>
            </form>
        </section>
    );
}
