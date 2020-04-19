# Gendersprache korrigieren

Ein Firefox-Add-on, welches Binnen-Is und Ähnliches von Webseiten entfernt. Es basiert auf dem Add-on *Binnen-I be gone*, welches ich seit langer Zeit selber einsetze und schätzen gelernt habe.

## Sinn und Zweck des Add-ons

Das Firefox-Add-on korrigiert viele durch die Gendersprache verursachten Rechtschreib- und Grammatikfehler. Typische Beispiele sind Binnen-I, Gendersterne, Unterstriche und ähnliche Konstrukte:

Beispiele für die Korrektur (vorher -> nachher):

* StudentInnen -> Studenten
* Lehrer_innen -> Lehrer
* Bürgerinnen und Bürger -> Bürger
* Studierende -> Studenten

Mehr Beispiele finden sich im Verzeichnis `/test`, in dem sich einige Unit-Tests für Korrekturen befinden.

## Warum reicht das Add-on *Binnen-I be gone* nicht aus?

Momentan reicht es wahrschenlich aus. Perspektivisch lässt sich das Add-on auf GitHub besser weiterentwickeln.

## Bisher erfolgte Anpassungen im Vergleich zu *Binnen-i be gone*

* Fix: Doppelformen, die durch einen Zeilenumbruch unterbrochen werden, wurden nicht ersetzt
* Fix: bessere Behandlung einzelner Wortgruppen, die Teil von Hyperlinks (`a`-Tag) sind oder mittels `strong`, `mark` etc. hervorgehoben werden (hier wurde der falsche Fall abgeleitet)
* kleinere Verbesserungen
  * Berücksichtigung von Zahlwörtern und Zahlen: *von **zwei** DesignerInnen*
  * *Ärztinnen und Ärzte* am Anfang eines Satzes wurde nicht erkannt (der Umlaut war Schuld)
  * Berücksichtigung von Aufzählungen wie bei *von AutorInnen **und** FreundInnen*
* Neu: ersetzt die Formulierung "Geflüchtete" durch "Flüchtlinge" (Hinweis: die Behandlung von Verlaufsformen muss in den Optionen aktiviert werden)

## Das Add-on selber bauen / Build the add-on

Voraussetzungen (mit denen das Add-on gebaut wurde) / Prerequisites:
* Node.js 10.19.0
* npm 6.13.4

Schritte / Steps:
* Repository klonen
* `npm install`
* `npm run build`

Fertig. Im Verzeichnis `/dist` befinden sich jetzt die Assets des Plugins. / Done. The directory `/dist` now contains all plugin assets.
