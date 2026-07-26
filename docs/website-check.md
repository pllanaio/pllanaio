# Website-Check: Betrieb, Datenfluss und Datenschutz-Hinweise

## Architektur

Die öffentliche Route `/website-check` nutzt getrennte Server-Endpunkte:

- `POST /api/website-check/analyze`: URL-Prüfung, Rate Limit und PageSpeed-Analyse.
- `GET /api/website-check/results/:id`: optionaler Abruf eines noch verfügbaren Ergebnisses.
- `POST /api/website-check/request-report`: Lead-Validierung und transaktionaler Report-Versand.
- `GET /api/website-check/prepare-marketing`: validiert den E-Mail-Link, legt den verschlüsselten Bezug kurzzeitig als HttpOnly-Cookie ab und leitet auf eine saubere Bestätigungsseite.
- `POST /api/website-check/confirm-marketing`: bestätigt die separate Marketing-Einwilligung erst nach aktiver Nutzeraktion.

Die PageSpeed-API wird ausschließlich serverseitig angesprochen. Der API-Schlüssel wird nicht an den Browser übertragen. Die vollständige Google-Antwort wird nicht dauerhaft gespeichert; verarbeitet wird nur eine reduzierte Auswertung aus Scores, zentralen Kennzahlen und priorisierten Befunden.

## Aufbewahrung und Analysebezug

- Identische Analysen werden im Prozessspeicher für 15 Minuten zwischengespeichert.
- Reduzierte Analyseergebnisse und verschlüsselte Report-Bezüge sind auf 30 Tage ausgelegt.
- In einer verteilten Serverless-Umgebung dient ein authentifiziert verschlüsselter, komprimierter Analysebezug als manipulationssicherer Report-Nachweis. URL, Analysewerte und Double-Opt-in-Daten sind dadurch nicht im Klartext aus dem Token lesbar.
- Für eine revisionssichere Lead- und Einwilligungsverwaltung sollte der optionale CRM-/Webhook-Adapter mit einem geeigneten System verbunden werden.

## Missbrauchsschutz

- verbindliche serverseitige URL-Normalisierung und DNS-Auflösung,
- Sperre privater, lokaler, Link-Local-, Loopback- und Cloud-Metadata-Adressen,
- erneute Prüfung des von PageSpeed gemeldeten finalen Redirect-Ziels,
- ausschließlich HTTP/HTTPS und Ports 80/443,
- Request-Limits, Timeouts, Antwortreduktion, Analyse-Cache und parallele Request-Deduplizierung,
- Rate Limits pro gehashtem IP-, Domain-, Analyse- und E-Mail-Bezug,
- In-Memory-Fallback und optionaler verteilter KV-Rate-Limiter,
- idempotente Double-Opt-in-Verarbeitung mit verteiltem KV-Lock beziehungsweise lokalem Fallback,
- Honeypot und optional abstrahierte Cloudflare-Turnstile-Prüfung.

## E-Mail-Trennung

1. Der angeforderte Website-Report ist eine transaktionale E-Mail und wird unabhängig von einer Marketing-Einwilligung versendet.
2. Bei optionaler Marketing-Einwilligung wird eine separate Double-Opt-in-E-Mail versendet.
3. Der E-Mail-Link wird serverseitig validiert, aus der sichtbaren Seiten-URL entfernt und nur kurzzeitig in einem HttpOnly-/SameSite-Cookie gehalten. Erst eine bewusste POST-Bestätigung löst den Double-Opt-in aus; automatische Link-Scanner bestätigen die Anmeldung nicht.
4. Ein angeschlossenes CRM oder Mailing-System muss anhand der DOI-ID idempotent arbeiten und Widerrufe verwalten.

## Noch rechtlich und organisatorisch zu prüfen

Die Datenschutzerklärung sollte nicht ungeprüft automatisch verändert werden. Vor dem Produktivbetrieb sollten insbesondere folgende Punkte mit den tatsächlich eingesetzten Anbietern und Prozessen abgeglichen und gegebenenfalls ergänzt werden:

- Verarbeitung der eingegebenen öffentlich erreichbaren URL,
- Verarbeitung von Vorname, Unternehmen, E-Mail und optionalen Kontaktdaten,
- Nutzung der Google PageSpeed Insights API,
- Zweck und Rechtsgrundlage des transaktionalen Report-Versands,
- konkrete Speicherdauer und Löschprozess,
- freiwillige Marketing-Einwilligung, Textversion, Quelle, Widerruf und Double-Opt-in-Nachweis,
- konkret eingesetzter SMTP-, CRM-, KV-, CAPTCHA- oder E-Mail-Dienstleister,
- Auftragsverarbeitung und gegebenenfalls Drittlandübermittlung.

Zusätzlich werden für Missbrauchsschutz kurzlebige gehashte technische Kennungen verwendet; die konkrete Ausgestaltung und Speicherdauer ist in der Datenschutzerklärung zu berücksichtigen.

Google weist darauf hin, dass reale CrUX-Felddaten in der PageSpeed Insights API künftig entfallen sollen. Die Oberfläche behandelt Felddaten deshalb bereits als optional; für eine langfristige Nutzung sollte bei Bedarf ein separater CrUX-API-Adapter ergänzt werden.

Diese technische Dokumentation ist keine abschließende rechtliche Prüfung.

## Benötigte Umgebungsvariablen

Siehe `.env.example`. Minimal erforderlich sind `PAGESPEED_API_KEY`, `WEBSITE_CHECK_TOKEN_SECRET` und die vorhandene SMTP-Konfiguration. Für mehrere Serverless-Instanzen wird zusätzlich der verteilte KV-Rate-Limiter empfohlen.
