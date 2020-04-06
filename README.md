# Gendersprache korrigieren

Ein Firefox-Add-on, welches Binnen-Is und Ähnliches von Webseiten entfernt. Es basiert auf dem Add-on **Binnen-I be gone**, welches ich seit langer Zeit selber einsetze und schätzen gelernt habe.

## Sinn und Zweck des Add-ons

Das Firefox-Plugin korrigiert viele durch die Gendersprache verursachten Rechtschreib- und Grammatikfehler. Typische Beispiele sind Binnen-I, Gendersterne, Unterstriche und ähnliche Konstrukte:

Beispiele für die Korrektur (vorher -> nachher):

* StudentInnen -> Studenten
* Lehrer_innen -> Lehrer
* Bürgerinnen und Bürger -> Bürger
* Studierende -> Studenten

Mehr Beispiele finden sich im Verzeichnis `/test`, in dem sich einige Unit-Tests für Korrekturen befinden.

## Warum reicht Binnen-I be gone nicht aus?

Momentan reicht es wahrschenlich aus. Perspektivisch lässt sich das Add-on auf GitHub besser weiterentwickeln.

## Das Add-on selber bauen / Build the add-on

Voraussetzungen (mit denen das Add-on gebaut wurde) / Prerequisites:
* Node.js 10.19.0
* npm 6.13.4

Schritte / Steps:
* Repository klonen
* `npm install`
* `npm run build`

Fertig. Im Verzeichnis `/dist` befinden sich jetzt die Assets des Plugins. / Done. The directory `/dist` now contains all plugin assets.
