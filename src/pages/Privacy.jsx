import React from "react";

export default function Privacy() {
    return (
        <main className="max-w-4xl mx-auto p-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300 min-h-screen">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Introduzione</h2>
                <p>
                    Questa Privacy Policy descrive come raccogliamo, utilizziamo e proteggiamo i dati personali
                    degli utenti che visitano il nostro sito web <a href="https://www.tuosito.it"
                                                                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">www.tuosito.it</a>.
                    Il trattamento dei dati è effettuato nel rispetto del Regolamento (UE) 2016/679 (GDPR) e delle
                    normative italiane.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Titolare del trattamento</h2>
                <address className="not-italic mb-2">
                    <strong>Daniele Masone</strong><br/>
                    Via Esempio 123, 20100 Milano, Italia<br/>
                    Email: <a href="mailto:info@tuosito.it"
                              className="text-blue-600 dark:text-blue-400 underline">info@tuosito.it</a>
                </address>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Tipologie di dati raccolti</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Dati di navigazione:</strong> indirizzi IP, browser, pagine visitate, tempo di
                        permanenza.
                    </li>
                    <li><strong>Dati forniti volontariamente:</strong> nome, email, messaggi inviati tramite modulo di
                        contatto.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Finalità del trattamento</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Fornire i servizi richiesti (es. rispondere a richieste di contatto).</li>
                    <li>Analizzare l’uso del sito per migliorare l’esperienza utente.</li>
                    <li>Inviare comunicazioni relative ai servizi, previo consenso.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Base giuridica</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Esecuzione di un contratto o misure precontrattuali.</li>
                    <li>Consenso esplicito per finalità di marketing.</li>
                    <li>Legittimo interesse per analisi e miglioramento.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Destinatari dei dati</h2>
                <p>
                    I dati possono essere comunicati a fornitori tecnici, consulenti e autorità competenti, sempre nel
                    rispetto del GDPR.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Trasferimento dati</h2>
                <p>
                    I dati non sono trasferiti fuori dall'Unione Europea.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Periodo di conservazione</h2>
                <p>
                    Conserviamo i dati solo per il tempo strettamente necessario alle finalità di raccolta.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Diritti dell’interessato</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati.</li>
                    <li>Revoca del consenso in qualsiasi momento.</li>
                    <li>Reclamo all'autorità di controllo.</li>
                </ul>
                <p>
                    Per esercitare questi diritti, scrivere a: <a href="mailto:info@tuosito.it"
                                                                  className="text-blue-600 dark:text-blue-400 underline">info@tuosito.it</a>
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Cookie Policy</h2>
                <p>
                    Il sito utilizza cookie per migliorare l’esperienza utente e analizzare il traffico. Per maggiori
                    informazioni, consulta la nostra <a href="/cookie-policy"
                                                        className="text-blue-600 dark:text-blue-400 underline">Cookie
                    Policy</a>.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Modifiche alla Privacy Policy</h2>
                <p>
                    Potremmo aggiornare questa informativa. Le modifiche saranno pubblicate qui con la data di
                    aggiornamento.
                </p>
            </section>

            <footer
                className="border-t border-gray-300 dark:border-gray-700 pt-4 text-sm text-gray-500 dark:text-gray-600 text-center">
                Ultimo aggiornamento: Giugno 2025
            </footer>
        </main>
    );
}
