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

    // it('den AnwältInnen -> den Anwälten', () => {
    //     const result = beGone.entferneInitialForTesting("den AnwältInnen");
    //     expect(result).to.be.equal("den Anwälten");
    // });
    
    // it('vielen AnwältInnen -> vielen Anwälten', () => {
    //     const result = beGone.entferneInitialForTesting("vielen AnwältInnen");
    //     expect(result).to.be.equal("vielen Anwälten");
    // });

    // it('und dessen AnwältInnen -> und dessen Anwälten', () => {
    //     const result = beGone.entferneInitialForTesting("und dessen AnwältInnen");
    //     expect(result).to.be.equal("und dessen Anwälten");
    // });

    // it('und deren Musiker:innen -> und deren Musikern', () => {
    //     const result = beGone.entferneInitialForTesting("und deren Musiker:innen");
    //     expect(result).to.be.equal("und deren Musikern");
    // });

    // it('den BeamtInnen -> den Beamten', () => {
    //     const result = beGone.entferneInitialForTesting("den BeamtInnen");
    //     expect(result).to.be.equal("den Beamten");
    // });

    it('WeltverbesserIn -> Weltverbesserer', () => {
        const result = beGone.entferneInitialForTesting("WeltverbesserIn");
        expect(result).to.be.equal("Weltverbesserer");
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

    // geht aktuell nicht
    // it('des/der LehrerIn -> des Lehrers', () => {
    //     const result = beGone.entferneInitialForTesting("des/der LehrerIn");
    //     expect(result).to.be.equal("des Lehrers");
    // });
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

    // it('bekannten Musiker:innen -> bekannten Musikern', () => {
    //     const result = beGone.entferneInitialForTesting("von einigen Dutzend mehr oder eher weniger bekannten Musiker:innen unterzeichneten Aufruf");
    //     expect(result).to.be.equal("von einigen Dutzend mehr oder eher weniger bekannten Musikern unterzeichneten Aufruf");
    // });

    it('deren Musiker:innen sangen -> deren Musiker sangen', () => {
        const result = beGone.entferneInitialForTesting("deren Musiker:innen sangen");
        expect(result).to.be.equal("deren Musiker sangen");
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

});
