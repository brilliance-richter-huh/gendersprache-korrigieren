import { expect } from 'chai';
import { BeGone } from '../src/gendersprachekorrigieren';

describe('entferne Binnen-I', () => {
    let beGone = new BeGone();

    it('Journalist*innen -> Journalisten', () => {
        const result = beGone.entferneInitialForTesting("Journalist*innen");
        expect(result).to.be.equal("Journalisten");
    });

    it('Medienmacher*innen -> Medienmacher', () => {
        const result = beGone.entferneInitialForTesting("Medienmacher*innen");
        expect(result).to.be.equal("Medienmacher");
    });

    it('Lehrer/innen -> Lehrer', () => {
        const result = beGone.entferneInitialForTesting("Lehrer/innen");
        expect(result).to.be.equal("Lehrer");
    });

    it('Lehrer(innen) -> Lehrer', () => {
        const result = beGone.entferneInitialForTesting("Lehrer(innen)");
        expect(result).to.be.equal("Lehrer");
    });

    it('Lehrer*innen* -> Lehrer', () => {
        const result = beGone.entferneInitialForTesting("Lehrer*innen");
        expect(result).to.be.equal("Lehrer");
    });

    it('LehrerInnen -> Lehrer', () => {
        const result = beGone.entferneInitialForTesting("LehrerInnen");
        expect(result).to.be.equal("Lehrer");
    });

    it('LehrerINNen -> Lehrer', () => {
        const result = beGone.entferneInitialForTesting("LehrerINNen");
        expect(result).to.be.equal("Lehrer");
    });

    it('die ganzen Lehrer*innen* -> die ganzen Lehrer', () => {
        const result = beGone.entferneInitialForTesting("die ganzen Lehrer*innen");
        expect(result).to.be.equal("die ganzen Lehrer");
    });

    it('der ganzen Lehrer*innen* -> der ganzen Lehrer', () => {
        const result = beGone.entferneInitialForTesting("der ganzen Lehrer*innen");
        expect(result).to.be.equal("der ganzen Lehrer");
    });

    it('den ganzen Lehrer*innen* -> den ganzen Lehrern', () => {
        const result = beGone.entferneInitialForTesting("den ganzen Lehrer*innen");
        expect(result).to.be.equal("den ganzen Lehrern");
    });

    it('deren ganzen Lehrer*innen* -> deren ganzen Lehrer', () => {
        const result = beGone.entferneInitialForTesting("deren ganzen Lehrer*innen");
        expect(result).to.be.equal("deren ganzen Lehrer");
    });

    it('eine/n Psycholog/in -> einen Psychologen', () => {
        const result = beGone.entferneInitialForTesting("eine/n Psycholog/in");
        expect(result).to.be.equal("einen Psychologen");
    });

    it('ExpertIn -> Experte', () => {
        const result = beGone.entferneInitialForTesting("ExpertIn");
        expect(result).to.be.equal("Experte");
    });

    it('BeamtIn -> Beamter', () => {
        const result = beGone.entferneInitialForTesting("BeamtIn");
        expect(result).to.be.equal("Beamter");
    });

    it('AnwältInnen -> Anwälte', () => {
        const result = beGone.entferneInitialForTesting("AnwältInnen");
        expect(result).to.be.equal("Anwälte");
    });

    it('WeltverbesserIn -> Weltverbesserer', () => {
        const result = beGone.entferneInitialForTesting("WeltverbesserIn");
        expect(result).to.be.equal("Weltverbesserer");
    });

    it('Verbesser*innen -> Verbesserer', () => {
        const result = beGone.entferneInitialForTesting("Verbesser*innen");
        expect(result).to.be.equal("Verbesserer");
    });

    it('FörderInnen -> Förderer', () => {
        const result = beGone.entferneInitialForTesting("FörderInnen");
        expect(result).to.be.equal("Förderer");
    });

    it('JournalistInfrage -> Journalistenfrage', () => {
        const result = beGone.entferneInitialForTesting("JournalistInfrage");
        expect(result).to.be.equal("Journalistenfrage");
    });

    it('der/die LehrerIn -> der Lehrer', () => {
        const result = beGone.entferneInitialForTesting("der/die LehrerIn");
        expect(result).to.be.equal("der Lehrer");
    });

    it('den/die LehrerIn -> den Lehrer', () => {
        const result = beGone.entferneInitialForTesting("den/die LehrerIn");
        expect(result).to.be.equal("den Lehrer");
    });

    it('des/der -> des', () => {
        const result = beGone.entferneInitialForTesting("des/der");
        expect(result).to.be.equal("des");
    });

    it('dem/der -> dem', () => {
        const result = beGone.entferneInitialForTesting("dem/der");
        expect(result).to.be.equal("dem");
    });

    it('den LehrerInnen -> den Lehrern', () => {
        const result = beGone.entferneInitialForTesting("den LehrerInnen");
        expect(result).to.be.equal("den Lehrern");
    });
    
    it('einem*r Schüler*In -> einem Schüler', () => {
        const result = beGone.entferneInitialForTesting("einem*r Schüler*In");
        expect(result).to.be.equal("einem Schüler");
    });

    it('deren Musiker:innen sangen -> deren Musiker sangen', () => {
        const result = beGone.entferneInitialForTesting("deren Musiker:innen sangen");
        expect(result).to.be.equal("deren Musiker sangen");
    });

    it('MusikerInnen -> Musikern', () => {
        const result = beGone.entferneInitialForTesting("Auch wenn man sich schätzt und freundlich grüßt: Prinzipiell hat man es in der freien Bremer Szene, bei den MusikerInnen wie den VeranstalterInnen, eher mit EinzelkämpferInnen zu tun.");
        expect(result).to.be.equal("Auch wenn man sich schätzt und freundlich grüßt: Prinzipiell hat man es in der freien Bremer Szene, bei den Musikern wie den Veranstaltern, eher mit Einzelkämpfern zu tun.");
    });

    it('MusikerInnen -> Musikern', () => {
        const result = beGone.entferneInitialForTesting("Kaum ausgezogen, hat sie die Straßen mit Bildern von zwei MusikerInnen dekoriert.");
        expect(result).to.be.equal("Kaum ausgezogen, hat sie die Straßen mit Bildern von zwei Musikern dekoriert.");
    });

    it('von Autor*innen und Freund*innen -> von Autoren und Freunden', () => {
        const result = beGone.entferneInitialForTesting("Abseitiges, Tiefsinniges & Schönes von Autor*innen und Freund*innen der taz.");
        expect(result).to.be.equal("Abseitiges, Tiefsinniges & Schönes von Autoren und Freunden der taz.");
    });

    it('von Autor*innen und Freund*innen -> von Autoren und Freunden', () => {
        const result = beGone.entferneInitialForTesting("Wenn Friedrich Merz Bundeskanzler wird, dann wandere ich aus in ein Land mit einer/m*x progressive*n*x Staatsoberhaupt.");
        // besser als nichts
        expect(result).to.be.equal("Wenn Friedrich Merz Bundeskanzler wird, dann wandere ich aus in ein Land mit einem progressive*n Staatsoberhaupt.");
    });

    it('Mehrzahl', () => {
        const result = beGone.entferneInitialForTesting("mehr als 50 Sprecher*innen nahmen teil");
        expect(result).to.be.equal("mehr als 50 Sprecher nahmen teil");
    });

    it('jede*n -> jeden', () => {
        const result = beGone.entferneInitialForTesting("Es war für jede*n von uns ein schweres Jahr.");
        expect(result).to.be.equal("Es war für jeden von uns ein schweres Jahr.");
    });
 });

 describe('entferne Doppelformen', () => {
     let beGone = new BeGone();
    it('Lehrer und Lehrerinnen -> Lehrer', () => {
        const result = beGone.entferneInitialForTesting("Lehrer und Lehrerinnen");
        expect(result).to.be.equal("Lehrer");
    });

    it('Bürgerinnen und Bürger -> Bürger', () => {
        const result = beGone.entferneInitialForTesting("Bürgerinnen und Bürger");
        expect(result).to.be.equal("Bürger");
    });

    it('Bürger und Bürgerinnen -> Bürger', () => {
        const result = beGone.entferneInitialForTesting("Bürger und Bürgerinnen");
        expect(result).to.be.equal("Bürger");
    });

    it('Bürger und Bürgerin -> Bürger', () => {
        const result = beGone.entferneInitialForTesting("Bürger und Bürgerin");
        expect(result).to.be.equal("Bürger");
    });

    it('die Bürgerin und der Bürger -> der Bürger', () => {
        const result = beGone.entferneInitialForTesting("die Bürgerin und der Bürger");
        expect(result).to.be.equal("der Bürger");
    });
    
    it('die Ärztin und der Arzt -> der Arzt', () => {
        const result = beGone.entferneInitialForTesting("die Ärztin und der Arzt");
        expect(result).to.be.equal("der Arzt");
    });

    it('der Arzt und die Ärztin -> der Arzt', () => {
        const result = beGone.entferneInitialForTesting("der Arzt und die Ärztin");
        expect(result).to.be.equal("der Arzt");
    });

    it('Bäuerinnen und Bauern -> Bauern', () => {
        const result = beGone.entferneInitialForTesting("Bäuerinnen und Bauern");
        expect(result).to.be.equal("Bauern");
    });

    it('Bürgervertreterinnen und -vertreter -> Bürgervertreter', () => {
        const result = beGone.entferneInitialForTesting("Bürgervertreterinnen und -vertreter");
        expect(result).to.be.equal("Bürgervertreter");
    });

    it('Könige und Königinnen -> Könige', () => {
        const result = beGone.entferneInitialForTesting("Könige und Königinnen");
        expect(result).to.be.equal("Könige");
    });

    it('Musikerinnen und Musiker -> Musiker', () => {
        const result = beGone.entferneInitialForTesting("Dazwischen kulturelle Projekte wie die ABC“, ebenfalls in Bremen, ein Treffpunkt für Musikerinnen und Musiker verschiedener Länder und Kulturen.");
        expect(result).to.be.equal("Dazwischen kulturelle Projekte wie die ABC“, ebenfalls in Bremen, ein Treffpunkt für Musiker verschiedener Länder und Kulturen.");
    });

    it('Heldinnen und Helden -> Helden', () => {
        const result = beGone.entferneInitialForTesting("Fast jeder von uns kennt die wahren Heldinnen und Helden der Krise.");
        expect(result).to.be.equal("Fast jeder von uns kennt die wahren Helden der Krise.");
    });

    it('Verkäuferinnen und Verkäufern -> Verkäufern', () => {
        const result = beGone.entferneInitialForTesting("den Verkäuferinnen und Verkäufern im Supermarkt, die hinter");
        expect(result).to.be.equal("den Verkäufern im Supermarkt, die hinter");
    });

    it('die Bürgerin und der Bürger -> der Bürger', () => {
        const result = beGone.entferneInitialForTesting("Dem Polizisten, der auf den Straßen für Sicherheit sorgt, der Bürgerin und dem Bürger, der hinter");
        expect(result).to.be.equal("Dem Polizisten, der auf den Straßen für Sicherheit sorgt, dem Bürger, der hinter");
    });

    it('Ärztinnen und Ärzte -> Ärzte', () => {
        const result = beGone.entferneInitialForTesting("Ärztinnen und Ärzte genießen in der Regel ein hohes Ansehen.");
        expect(result).to.be.equal("Ärzte genießen in der Regel ein hohes Ansehen.");
    });

    it('Den Ärztinnen und Ärzte -> Den Ärzten', () => {
        const result = beGone.entferneInitialForTesting("Den Ärztinnen und Ärzten, die Tag und Nacht bereitstehen, um Leben zu retten.");
        expect(result).to.be.equal("Den Ärzten, die Tag und Nacht bereitstehen, um Leben zu retten.");
    });

    it('Förderinnen und Förderer -> Förderer', () => {
        const result = beGone.entferneInitialForTesting("Vielen Dank an alle Förderinnen und Förderer.");
        expect(result).to.be.equal("Vielen Dank an alle Förderer.");
    });
});

describe('entfernt Partizipien', () => {
    let beGone = new BeGone();
    it('Besserverdienenden -> Besserverdiener', () => {
        const result = beGone.entferneInitialForTesting("Gemeint waren dabei meist die Besserverdienenden.");
        expect(result).to.be.equal("Gemeint waren dabei meist die Besserverdiener.");
    });

    it('Lesenden -> Leser', () => {
        const result = beGone.entferneInitialForTesting("ist zwar nett für die Lesenden");
        // besser als nichts
        expect(result).to.be.equal("ist zwar nett für die Leser");
    });
});

describe('behandelt viele Whitespaces', () => {
    let beGone = new BeGone();
    it('Musikerinnen und Musiker -> Musiker', () => {
        const result = beGone.entferneInitialForTesting("Dazwischen kulturelle Projekte wie die ABC“, ebenfalls in Bremen, ein Treffpunkt für \fMusikerinnen und Musiker\f verschiedener Länder und Kulturen.");
        expect(result).to.be.equal("Dazwischen kulturelle Projekte wie die ABC“, ebenfalls in Bremen, ein Treffpunkt für \fMusiker\f verschiedener Länder und Kulturen.");
    });

    it('MusikerInnen -> Musikern', () => {
        const result = beGone.entferneInitialForTesting("Auch wenn man sich schätzt und freundlich grüßt: Prinzipiell hat man es in der freien Bremer Szene, bei den\fMusikerInnen\fwie den VeranstalterInnen, eher mit EinzelkämpferInnen zu tun.");
        expect(result).to.be.equal("Auch wenn man sich schätzt und freundlich grüßt: Prinzipiell hat man es in der freien Bremer Szene, bei den\fMusikern\fwie den Veranstaltern, eher mit Einzelkämpfern zu tun.");
    });

    it('Verkäuferinnen und Verkäufern -> Verkäufern', () => {
        const result = beGone.entferneInitialForTesting("Den Polizisten, die auf den Straßen für Sicherheit sorgen, den \fVerkäuferinnen und Verkäufern im Supermarkt\f, die hinter");
        expect(result).to.be.equal("Den Polizisten, die auf den Straßen für Sicherheit sorgen, den \fVerkäufern im Supermarkt\f, die hinter");
    });

    it('Geflüchtete', () => {
        const result = beGone.entferneInitialForTesting("Protest am Aktionstag für die \fGeflüchteten\f aus den griechischen Lagern ");
        expect(result).to.be.equal("Protest am Aktionstag für die \fFlüchtlinge\f aus den griechischen Lagern ");
    });

    it('behält Zeilenumbrüche', () => {
        const result = beGone.entferneInitialForTesting(
        `
            abc\r
        def\r\n gih\n ;
        `);
        expect(result).to.be.equal(
            `
            abc\r
        def\r\n gih\n ;
        `);
    });


});

describe('ersetzt den Begriff Geflüchtete zu Flüchtlinge', () => {
    let beGone = new BeGone();

    // verschiedene Formulierungen angelehnt an aktuelle Medienberichte

    it('Geflüchtete', () => {
        const result = beGone.entferneInitialForTesting("Dem folgte am Mittwoch vor Weihnachten ein Beschluss, dass Hamburg Geflüchtete aufnehmen wolle dem Vernehmen nach 60 Kinder, außerdem sei das Land bereit, fünf Kinder aus dem nun gestarteten Bundesprogramm aufzunehmen.");
        expect(result).to.be.equal("Dem folgte am Mittwoch vor Weihnachten ein Beschluss, dass Hamburg Flüchtlinge aufnehmen wolle dem Vernehmen nach 60 Kinder, außerdem sei das Land bereit, fünf Kinder aus dem nun gestarteten Bundesprogramm aufzunehmen.");
    });

    it('Geflüchtete, in Aufzählung', () => {
        const result = beGone.entferneInitialForTesting("Der Senat soll sein Handeln gegenüber Obdachlosen, Geflüchteten und Menschen ohne Papiere überdenken.");
        expect(result).to.be.equal("Der Senat soll sein Handeln gegenüber Obdachlosen, Flüchtlingen und Menschen ohne Papiere überdenken.");
    });

    it('Geflüchtete, in Aufzählung mit "und"', () => {
        const result = beGone.entferneInitialForTesting("Der Senat soll sein Handeln gegenüber AutorInnen und Geflüchteten überdenken.");
        expect(result).to.be.equal("Der Senat soll sein Handeln gegenüber Autoren und Flüchtlingen überdenken.");
    });

    it('Geflüchtete, in Aufzählung, mit Binnen-I-Wort', () => {
        const result = beGone.entferneInitialForTesting("Der Senat soll sein Handeln gegenüber AutorInnen, Geflüchteten und Menschen ohne Papiere überdenken.");
        expect(result).to.be.equal("Der Senat soll sein Handeln gegenüber Autoren, Flüchtlingen und Menschen ohne Papiere überdenken.");
    });

    it('Geflüchtete', () => {
        const result = beGone.entferneInitialForTesting("Es müsse der Aufenthalt von Flüchtlingen und Leuten ohne Papiere legalisiert werden.");
        expect(result).to.be.equal("Es müsse der Aufenthalt von Flüchtlingen und Leuten ohne Papiere legalisiert werden.");
    });

    it('Geflüchtete', () => {
        const result = beGone.entferneInitialForTesting("Das Bündnis hatte dazu aufgerufen, mit Plakaten auf Rädern durch die Straßen zu fahren, um gegen das Elend der Geflüchteten in Lagern zu demonstrieren.");
        expect(result).to.be.equal("Das Bündnis hatte dazu aufgerufen, mit Plakaten auf Rädern durch die Straßen zu fahren, um gegen das Elend der Flüchtlinge in Lagern zu demonstrieren.");
    });

    it('Geflüchtete', () => {
        const result = beGone.entferneInitialForTesting("Protest am Aktionstag für die Geflüchteten aus den griechischen Lagern");
        expect(result).to.be.equal("Protest am Aktionstag für die Flüchtlinge aus den griechischen Lagern");
    });

    it('Geflüchtete', () => {
        const result = beGone.entferneInitialForTesting("Bei der Räumung sollen mehrere Geflüchtete versucht haben");
        expect(result).to.be.equal("Bei der Räumung sollen mehrere Flüchtlinge versucht haben");
    });

    it('Geflüchtete (Nominativ Singular)', () => {
        const result = beGone.entferneInitialForTesting("Der Geflüchtete muss in diesem Fall selbst die Verantwortung übernehmen.");
        expect(result).to.be.equal("Der Flüchtling muss in diesem Fall selbst die Verantwortung übernehmen.");
    });

    it('Geflüchtete (Dativ Plural)', () => {
        const result = beGone.entferneInitialForTesting("Das derzeitige Mühen um das Wohl Anderer endet bei den Geflüchteten in Sammelunterkünften.");
        expect(result).to.be.equal("Das derzeitige Mühen um das Wohl Anderer endet bei den Flüchtlingen in Sammelunterkünften.");
    });

    it('Geflüchtete (Dativ Plural II)', () => {
        const result = beGone.entferneInitialForTesting("Inwiefern beeinflusst die Sprache, wie wir den Geflüchteten begegnen?");
        expect(result).to.be.equal("Inwiefern beeinflusst die Sprache, wie wir den Flüchtlingen begegnen?");
    });

    it('„Geflüchtete“ mit soft hyphen und Anführungszeichen', () => {
        const result = beGone.entferneInitialForTesting("Mehr und mehr Engagierte verwenden den Begriff „Geflüch­te­te“.");
        expect(result).to.be.equal("Mehr und mehr Engagierte verwenden den Begriff „Flüchtlinge“.");
    });

    it('Geflüchtete als Adjektiv', () => {
        const result = beGone.entferneInitialForTesting("Geflüchtete Menschen beschäftigen");
        expect(result).to.be.equal("Geflüchtete Menschen beschäftigen");
    });

    it('geflüchtete Kinder', () => {
        const result = beGone.entferneInitialForTesting("geflüchtete Kinder");
        expect(result).to.be.equal("geflohene Kinder");
    });

    it('geflüchteten Kinder', () => {
        const result = beGone.entferneInitialForTesting("kommenden geflüchteten Kinder aus");
        expect(result).to.be.equal("kommenden geflohenen Kinder aus");
    });

    it('Geflüchtetenlager', () => {
        const result = beGone.entferneInitialForTesting("Geflüchtetenlager");
        expect(result).to.be.equal("Flüchtlingslager");
    });
});


describe('Empfehlungen Uni Hamburg werden korrigiert', () => {
    let beGone = new BeGone();

    // Quelle: https://www.uni-hamburg.de/gleichstellung/download/empfehlungen-zu-inklusiven-anredeformen-2019-05.pdf

    it('Interessierte -> Interessenten', () => {
        const result = beGone.entferneInitialForTesting("Sehr geehrte Interessierte");
        expect(result).to.be.equal("Sehr geehrte Interessenten");
    });

    it('Studierende -> Studenden', () => {
        const result = beGone.entferneInitialForTesting("Sehr geehrte Studierende");
        expect(result).to.be.equal("Sehr geehrte Studenten");
    });

    it('Empfänger*innen -> Empfänger', () => {
        const result = beGone.entferneInitialForTesting("Sehr geehrte Empfänger*innen des Newsletters XY");
        expect(result).to.be.equal("Sehr geehrte Empfänger des Newsletters XY");
    });

    it('Mitarbeitende -> Mitarbeiter', () => {
        const result = beGone.entferneInitialForTesting("Liebe Mitarbeitende");
        expect(result).to.be.equal("Liebe Mitarbeiter");
    });

    it('Teilnehmende -> Teilnehmer', () => {
        const result = beGone.entferneInitialForTesting("Sehr geehrte Teilnehmende");
        expect(result).to.be.equal("Sehr geehrte Teilnehmer");
    });

});


describe('TODO oder nicht ohne weiteres lösbar', () => {
    let beGone = new BeGone();

    // it('Mehrzahl', () => {
    //     const result = beGone.entferneInitialForTesting("mit mehr als 50 Sprecher*innen");
    //     expect(result).to.be.equal("mit mehr als 50 Sprechern");
    // });

    // it('bekannten Musiker:innen -> bekannten Musikern', () => {
    //     const result = beGone.entferneInitialForTesting("von einigen Dutzend mehr oder eher weniger bekannten Musiker:innen unterzeichneten Aufruf");
    //     expect(result).to.be.equal("von einigen Dutzend mehr oder eher weniger bekannten Musikern unterzeichneten Aufruf");
    // });

    // it('des/der LehrerIn -> des Lehrers', () => {
    //     const result = beGone.entferneInitialForTesting("des/der LehrerIn");
    //     expect(result).to.be.equal("des Lehrers");
    // });
});

/** 
 * Sammlung:
 * 
 * wenn 1 sich
 * 
 * 
 * 
*/
