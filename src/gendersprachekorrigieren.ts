declare var chrome: any;
interface BeGoneSettings {
    aktiv?: boolean;
    redundancy?: boolean;
    skip_topic?: boolean;
    partizip?: boolean;
    whitelist?: string;
    blacklist?: string;
    counter?: boolean;
    filterliste?: "Bei Bedarf"|"Whitelist"|"Blacklist"|undefined;
}

class BeGoneSettingsHelper {
    public static isWhitelist(settings: BeGoneSettings): boolean {
        return settings.filterliste === "Whitelist";
    }

    public static isBlacklist(settings: BeGoneSettings): boolean {
        return settings.filterliste === "Blacklist";
    }

    public static whiteliststring(settings: BeGoneSettings): string {
        return settings.whitelist ? settings.whitelist.replace(/(\r\n|\n|\r)/gm, "|") : "";
    } 

    public static blackliststring(settings: BeGoneSettings): string {
        return settings.blacklist ? settings.blacklist.replace(/(\r\n|\n|\r)/gm, "|") : "";
    } 
}

export class BeGone {
    public version = 2.7;
    private replacementsb = 0;
    private replacementsd = 0;
    private replacementsp = 0;
    private settings: BeGoneSettings = { aktiv: true, partizip: true, redundancy: true, skip_topic: false };
    private nodes: Array<CharacterData> = new Array<CharacterData>();
    private mtype: string | undefined = undefined;

    private log(s: string) {
//        console.log(s);
    }

    private textNodesUnder(el: Node): Array<CharacterData> {
        var n, a = new Array<CharacterData>(),
            walk = document.createTreeWalker(
                el,
                NodeFilter.SHOW_TEXT, 
                { acceptNode: (node: Node) => {
                        //Nodes mit weniger als 5 Zeichen nicht filtern
                        if (!node.textContent || node.textContent.length < 5) {
                            return NodeFilter.FILTER_REJECT;
                        } else {
                            var isUntreatedElement = node.parentNode ? (node.parentNode instanceof HTMLInputElement || node.parentNode instanceof HTMLTextAreaElement || node.parentNode instanceof HTMLScriptElement || node.parentNode instanceof HTMLStyleElement || node.parentNode.nodeName == "CODE" || node.parentNode.nodeName == "NOSCRIPT") : false;
                            var isDivTextbox = document.activeElement && (document.activeElement.getAttribute("role") == "textbox" || document.activeElement.getAttribute("contenteditable") == "true") && document.activeElement.contains(node);
    
                            //Eingabeelemente, <script>, <style>, <code>-Tags nicht filtern
                            if (isUntreatedElement || isDivTextbox) {
                                return NodeFilter.FILTER_REJECT;
                            }
                            //Nur Nodes erfassen, deren Inhalt ungefähr zur späteren Verarbeitung passt
                            else if (/\b(und|oder|bzw)|[a-zA-ZäöüßÄÖÜ][\/\*.&_\(]-?[a-zA-ZäöüßÄÖÜ]|[a-zäöüß\(_\*:\.][iI][nN]|nE\b|r[MS]\b|e[NR]\b|fahrende|ierende|Mitarbeitende|Forschende/.test(node.textContent)) {
                                return NodeFilter.FILTER_ACCEPT;
                            }
                        }
                        return NodeFilter.FILTER_REJECT;
                    }
                  
                },
                false);
        while (n = walk.nextNode()) a.push(n as CharacterData);
        return a;
    }

    public handleResponse(message: { type?: string, response: string }) {
        this.settings = JSON.parse(message.response);
    
        if (!this.settings.aktiv && this.settings.filterliste !== "Bei Bedarf" || this.settings.filterliste == "Bei Bedarf" && message.type !== "ondemand") return;
    
        this.mtype = message.type;
        if (!BeGoneSettingsHelper.isWhitelist(this.settings) && !BeGoneSettingsHelper.isBlacklist(this.settings) || BeGoneSettingsHelper.isWhitelist(this.settings) && RegExp(BeGoneSettingsHelper.whiteliststring(this.settings)).test(document.URL) || BeGoneSettingsHelper.isBlacklist(this.settings) && !RegExp(BeGoneSettingsHelper.blackliststring(this.settings)).test(document.URL)){
            //Entfernen bei erstem Laden der Seite
            this.entferneInitial();
    
            //Entfernen bei Seitenänderungen
            try {
                var observer = new MutationObserver((mutations:any) => {
                    var insertedNodes = new Array<CharacterData>();
                    mutations.forEach((mutation:any) => {
                        for (var i = 0; i < mutation.addedNodes.length; i++) {
                            insertedNodes = insertedNodes.concat(this.textNodesUnder(mutation.addedNodes[i]));
                        }
                    });
                    this.entferneInserted(insertedNodes);
                });
                observer.observe(document, {
                    childList: true,
                    subtree: true,
                    attributes: false,
                    characterData: false
                });
            } catch (e) {
                console.error(e);
                chrome.runtime.sendMessage({
                    action: 'error',
                    page: document.location.hostname,
                    source: 'gendersprachekorrigieren.js',
                    error: e
                });
            }
        }
    }    

    private entferneBinnenIs(s: string): string {
        this.log("10000");
        if (/[a-zA-ZäöüßÄÖÜ][\/\*.&_\(]-?[a-zA-ZäöüßÄÖÜ]/.test(s) && /der|die|dessen|ein|sie|ihr|sein|zu[rm]|jede|frau|man|eR\b|em?[\/\*.&_\(]-?e?r\b|em?\(e?r\)\b/.test(s)) {
            this.log("11000");
            //Stuff
            if (/der|die|dessen|ein|sie|ih[rmn]|zu[rm]|jede/i.test(s)) {
                this.log("11100");
                s = s.replace(/\b(d)(ie[\/\*_\(-]+der|er[\/\*_\(-]+die)\b/ig, (match, p1) => {
                    this.log("11101");
                    this.replacementsb++;
                    return p1 + "er";
                });
                s = s.replace(/\b(d)(en[\/\*_\(-]+die|ie[\/\*_\(-]+den)\b/ig, (match, p1) => {
                    this.log("11102");
                    this.replacementsb++;
                    return p1 + "en";
                });
                s = s.replace(/\b(d)(es[\/\*_\(-]+der|er[\/\*_\(-]+des)\b/ig, (match, p1) => {
                    this.log("11103");
                    this.replacementsb++;
                    return p1 + "es";
                });
                s = s.replace(/\b(d)(er[\/\*_\(-]+dem|em[\/\*_\(-]+der)\b/ig, (match, p1) => {
                    this.log("11104");
                    this.replacementsb++;
                    return p1 + "em";
                });
                s = s.replace(/\b(d)(eren[\/\*_\(-]dessen|essen[\/\*_\(-]deren)\b/ig, (match, p1) => {
                    this.log("11105");
                    this.replacementsb++;
                    return p1 + "essen";
                });
                s = s.replace(/\bdiese[r]?[\/\*_\(-](diese[rnms])|(diese[rnms])[\/\*_\(-]diese[r]?\b/ig, (match, p1, p2) => {
                    this.replacementsb++;
                    if (p1) {
                        this.log("11106");
                        return p1;
                    } else if (p2) {
                        this.log("11107");
                        return p2;
                    }
                });
                s = s.replace(/\b([DMSdms]?[Ee])in([\/\*_\(-]+e |\(e\) |E )/g, (match, p1) => {
                    this.log("11108");
                    this.replacementsb++;
                    return p1 + "in ";
                });
                s = s.replace(/\b([DMSdms]?[Ee])ine([\/\*_\(-]+r |\(r\) |R )/g, (match, p1) => {
                    this.log("11109");
                    this.replacementsb++;
                    return p1 + "iner ";
                });
                s = s.replace(/\b([DMSdms]?[Ee])iner([\/\*_\(-]+s |\(S\) |S )/g, (match, p1) => {
                    this.log("11110");
                    this.replacementsb++;
                    return p1 + "ines ";
                });
                s = s.replace(/\b([DMSdms]?[Ee])ines([\/\*_\(-]+r |\(R\) |R )/g, (match, p1) => {
                    this.log("11111");
                    this.replacementsb++;
                    return p1 + "ines ";
                });
                s = s.replace(/\b([DMSdms]?[Ee])iner([\/\*_\(-]+m |\(m\) |M )/g, (match, p1) => {
                    this.log("11112");
                    this.replacementsb++;
                    return p1 + "inem ";
                });
                s = s.replace(/\b([DMSdms]?[Ee])inem([\/\*_\(-]+r |\(r\) |R )/g, (match, p1) => {
                    this.log("11113");
                    this.replacementsb++;
                    return p1 + "inem ";
                });
                s = s.replace(/\b([DMSdms]?[Ee])ine([\/\*_\(-]+n |\(n\) |N )/g, (match, p1) => {
                    this.log("11114");
                    this.replacementsb++;
                    return p1 + "inen ";
                });
                s = s.replace(/\bsie[\/\*_\(-]er|er[\/\*_\(-]sie\b/g, () => {
                    this.log("11115");
                    this.replacementsb++;
                    return "er";
                });
                s = s.replace(/\bSie[\/\*_\(-][Ee]r|Er[\/\*_\(-][Ss]ie\b/g, () => {
                    this.log("11116");
                    this.replacementsb++;
                    return "Er";
                });
                s = s.replace(/\b(i)(hr[\/\*_\(-]ihm|hm[\/\*_\(-]ihr)\b/ig, (match, p1) => {
                    this.log("11117");
                    this.replacementsb++;
                    return p1 + "hm";
                });
                s = s.replace(/\bsie[\/\*_\(-]ihn|ihn[\/\*_\(-]ie\b/g, () => {
                    this.log("11118");
                    this.replacementsb++;
                    return "ihn";
                });
                s = s.replace(/\bSie[\/\*_\(-][Ii]hn|Ihn[\/\*_\(-][Ss]ie\b/g, () => {
                    this.log("11119");
                    this.replacementsb++;
                    return "Ihn";
                });
                s = s.replace(/\bihr[\/\*_\(-]e\b/ig, () => {
                    this.log("11120");
                    this.replacementsb++;
                    return "ihr";
                }); //ihr*e Partner*in
                s = s.replace(/\bihre?[rnms]?[\/\*_\(-](seine?[rnms]?)|(seine?[rnms]?)[\/\*_\(-]ihre?[rnms]?\b/ig, (match, p1, p2) => {
                    this.replacementsb++;
                    if (p1) {
                        this.log("11121");
                        return p1;
                    } else if (p2) {
                        this.log("11122");
                        return p2;
                    }
                });
                s = s.replace(/\b(z)(um\/zur|ur\/zum)\b/ig, (match, p1) => {
                    this.log("11123");
                    this.replacementsb++;
                    return p1 + "um";
                });
                s = s.replace(/\jede[rnms]?[\/\*_\(-](jede[rnms]?)\b/ig, (match, p1) => {
                    this.log("11124");
                    this.replacementsb++;
                    return p1;
                });
            }

            //extra Stuff				
            if (/eR\b|em?[\/\*_\(-]{1,2}e?r\b|em?\(e?r\)\b/.test(s)) {
                this.log("11200");

                s = s.replace(/e[\/\*_\(-]+r|e\(r\)|eR\b/g, () => {
                    this.replacementsb++;
                    return "er";
                }); //jede/r,jede(r),jedeR,
                s = s.replace(/em\(e?r\)|em[\/\*_\(-]+r\b/g, () => {
                    this.replacementsb++;
                    return "em";
                }); //jedem/r
                s = s.replace(/er\(e?s\)|es[\/\*_\(-]+r\b/g, () => {
                    this.replacementsb++;
                    return "es";
                }); //jedes/r
            }

            //man
            if (/\/(frau|man|mensch)/.test(s)) {
                this.log("11300");
                s = s.replace(/\b(frau|man+|mensch)+[\/\*_\(-](frau|man+|mensch|[\/\*_\(-])*/, () => {
                    this.replacementsb++;
                    return "man";
                });
            }
        }

        if (/[a-zäöüß\u00AD\u200B]{2}((\/-?|_|\*|:|\.| und -)?In|(\/-?|_|\*|:|\.| und -)in(n[\*|\.]en)?|INNen|\([Ii]n+(en\)|\)en)?|\/inne?)(?!(\w{1,2}\b)|[A-Z]|[cf]o|te[gr]|act|clu|dex|di|line|ner|put|sert|stall|stan|stru|val|vent|v?it|voice)|[A-ZÄÖÜß\u00AD\u200B]{3}(\/-?|_|\*|:|\.)IN\b/.test(s)) {
            this.log("12000");
            s = s.replace(/[\u00AD\u200B]/g, ""); //entfernt soft hyphens

            //Prüfung auf Ersetzung
            if (/[a-zäöüß](\/-?|_|\*|:|\.| und -)in\b/i.test(s) || /[a-zäöüß](\/-?|_|\*|:|\.| und -)inn(\*|\.|\))?en/i.test(s) || /[a-zäöüß](\(|\/)in/i.test(s) || /[a-zäöüß]INNen/.test(s)) {
                this.log("12100");
                s = s.replace(/(\/-?|_|\*|:|\.)inn(\*|\.|\/)?e(\*|\.|\/)?n/ig, "Innen"); //Schüler/innen
                s = s.replace(/([a-zäöüß])\(inn(en\)|\)en)/ig, "$1Innen"); //Schüler(innen)
                s = s.replace(/([a-zäöüß])INNen/g, "$1Innen"); //SchülerINNen
                s = s.replace(/ und -innen\b/ig, () => {
                    this.log("12101");
                    this.replacementsb++;
                    return "";
                }); //und -innen
                s = s.replace(/(\/-?|_|\*|:|\.)in\b/ig, "In"); //Schüler/in
                s = s.replace(/([a-zäöüß])\(in\)/ig, "$1In"); //Schüler(in)
                this.log(s);
            }

            //Plural
            if (/[a-zäöüß]Innen/i.test(s)) {
                this.log("12200");
                //Prüfung auf Sonderfälle
                if (/(chef|fan|gött|verbesser|äur|äs)innen/i.test(s)) {
                    s = s.replace(/(C|c)hefInnen/g, (match, p1) => {
                        this.log("12201");
                        this.replacementsb++;
                        return p1 + "hefs";
                    });
                    s = s.replace(/(F|f)anInnen/g, (match, p1) => {
                        this.log("12202");
                        this.replacementsb++;
                        return p1 + "ans";
                    });
                    s = s.replace(/([Gg]ött|verbesser)(?=Innen)/g, (match, p1) => {
                        this.log("12203");
                        this.replacementsb++;
                        return p1 + "er";
                    });
                    s = s.replace(/äue?rInnen/g, () => {
                        this.log("12204");
                        this.replacementsb++;
                        return "auern";
                    });
                    s = s.replace(/äsInnen/g, () => {
                        this.log("12205");
                        this.replacementsb++;
                        return "asen";
                    });
                }
                s = s.replace(/\b(([Dd]en|[Aa]us|[Aa]ußer|[Bb]ei|[Dd]ank|[Gg]egenüber|[Ll]aut|[Mm]it(samt)?|[Nn]ach|[Ss]amt|[Vv]on|[Uu]nter|[Zz]u|[Ww]egen|[MmSsDd]?einen) ([ID]?[a-zäöüß]+en |[0-9.,]+ )?[A-ZÄÖÜ][a-zäöüß]+)erInnen\b/g, (match, p1) => {
                    this.log("12206");
                    this.replacementsb++;
                    return p1 + "ern";
                }); //unregelmäßiger Dativ bei Wörtern auf ...erInnen
                s = s.replace(/(er?|ER?)Innen/g, (match, p1) => {
                    this.log("12207");
                    this.replacementsb++;
                    return p1;
                });

                s = s.replace(/([Aa]nwält|[Ää]rzt|e[iu]nd|rät|amt|äst|würf|äus|[ai(eu)]r|irt)Innen/g, (match, p1) => {
                    this.log("12208");
                    this.replacementsb++;
                    return p1 + "e";
                });
                s = s.replace(/([nrtsmdfghpbklvwNRTSMDFGHPBKLVW])Innen/g, (match, p1) => {
                    this.log("12209");
                    this.replacementsb++;
                    return p1 + "en";
                });
            }

            //Singular			
            if (/[a-zäöüß]In/.test(s) && !/([Pp]lug|Log|[Aa]dd|Linked)In\b/.test(s)) {
                this.log("12300");
                //Prüfung auf Sonderfälle
                if (/amtIn|stIn\B|verbesser(?=In)/.test(s)) {
                    s = s.replace(/verbesser(?=In)/g, () => {
                        this.log("12301");
                        this.replacementsb++;
                        return "verbesserer";
                    });
                    s = s.replace(/amtIn/g, () => {
                        this.log("12302");
                        this.replacementsb++;
                        return "amter";
                    });
                    s = s.replace(/stIn\B(?!(\w{1,2}\b)|[A-Z]|[cf]o|te[gr]|act|clu|dex|di[ac]|line|ner|put|sert|stall|stan|stru|val|vent|v?it|voice)/g, () => {
                        this.log("12303");
                        this.replacementsb++;
                        return "sten";
                    }); //JournalistInfrage
                }
                //Prüfung auf Umlaute
                if (/[äöüÄÖÜ][a-z]{0,3}In/.test(s)) {
                    s = s.replace(/ä(?=s(t)?In|tIn|ltIn|rztIn)/g, () => {
                        this.log("12304");
                        this.replacementsb++;
                        return "a";
                    });
                    s = s.replace(/ÄrztIn/g, () => {
                        this.log("12305");
                        this.replacementsb++;
                        return "Arzt";
                    });
                    s = s.replace(/ö(?=ttIn|chIn)/g, () => {
                        this.log("12306");
                        this.replacementsb++;
                        return "o";
                    });
                    s = s.replace(/ü(?=rfIn)/g, () => {
                        this.log("12307");
                        this.replacementsb++;
                        return "u";
                    });
                    s = s.replace(/ündIn/g, () => {
                        this.log("12308");
                        this.replacementsb++;
                        return "und";
                    });
                    s = s.replace(/äue?rIn/g, () => {
                        this.log("12309");
                        this.replacementsb++;
                        return "auer";
                    });
                }
                s = s.replace(/\b(([Dd]en|[Aa]us|[Aa]ußer|[Bb]ei|[Dd]ank|[Gg]egenüber|[Ll]aut|[Mm]it(samt)?|[Nn]ach|[Ss]amt|[Uu]nter|[Vv]on|[Zz]u|[Ww]egen|[MmSsDd]?eine[mnrs]) ([ID]?[a-zäöüß]+en)?[A-ZÄÖÜ][a-zäöüß]+)logIn\b/g, (match, p1) => {
                    this.log("12310");
                    this.replacementsb++;
                    return p1 + "logen";
                }); //unregelmäßiger Dativ bei eine/n Psycholog/in
                s = s.replace(/([skgvwzSKGVWZ]|ert|[Bb]rit|[Kk]und|ach)In(?!(\w{1,2}\b)|[A-Z]|[cf]o|te[gr]|act|clu|dex|di|line|ner|put|sert|stall|stan|stru|val|vent|v?it|voice)/g, (match, p1) => {
                    this.log("12311");
                    this.replacementsb++;
                    return p1 + "e";
                }); //ExpertIn, BritIn, KundIn, WachIn
                s = s.replace(/([nrtmdbplhfcNRTMDBPLHFC])In(?!(\w{1,2}\b)|[A-Z]|[cf]o|te[gr]|act|clu|dex|di|line|ner|put|sert|stall|stan|stru|val|vent|v?it|voice)/g, (match, p1) => {
                    this.log("12312");
                    this.replacementsb++;
                    return p1;
                });
            }

        }

        return s;
    }

    private entferneDoppelformen(s: string): string {
        this.log("20000");
        let replacementsd = 0;
        if (/\b(und|oder|bzw)|[a-zA-ZäöüßÄÖÜ][\/\*&_\(][a-zA-ZäöüßÄÖÜ]/.test(s)) {
            this.log("21000");
            s = s.replace(/\b((von |für |mit )?((d|jed|ein|ihr|zum|sein)(e[rn]?|ie) )?([a-zäöüß]{4,20} )?)([a-zäöüß]{2,})innen( und | oder | & | bzw\.? |[\/\*_\(-])\2?((d|jed|ein|ihr|zum|sein)(e[rmns]?|ie) )?\6?(\7(e?n?))\b/ig, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => {
                replacementsd++;
                if (p1) {
                    this.log("21001");
                    return p1 + p12;
                } else {
                    this.log("21002");
                    return p12;
                }
            }); //Bürgerinnen und Bürger
            s = s.replace(/\b(von |für |mit |als )?(((zu )?d|jed|ein|ihr|zur|sein)(e|er|ie) )?(([a-zäöüß]{4,20}[enr]) )?([a-zäöüß]{2,})(en?|in)( und | oder | & | bzw\.? |[\/\*_\(-])(\1|vom )?((((zu )?d|jed|ein|ihr|zum|sein)(e[nrms])? )?(\7[nrms]? )?(\8(e?(s|n|r)?)))\b/ig, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18) => {
                replacementsd++;
                if (p1) {
                    if (p6 && !p17) {
                        this.log("21003");
                        return p1 + p13 + p6 + p18;
                    } else {
                        this.log("21004");
                        return p1 + p12;
                    }
                } else if (p6 && !p17) {
                    this.log("21005");
                    return p13 + p6 + p18;
                } else {
                    this.log("21006");
                    return p12;
                }
            }); //die Bürgerin und der Bürger
            s = s.replace(/\b(von |für |mit |als )?(((zu )?d|jed|ein|ihr|sein)(e|er|ie) |zur )?(([a-zäöüß]{4,20}[enr]) )?([a-zäöüß]{4,20})?(ärztin|anwältin|bäue?rin|rätin|fränkin|schwäbin|schwägerin)( und | oder | & | bzw\.? |[\/\*_\(-])(\1|vom )?((((zu )?d|jed|ein|ihr|zum|sein)(e[nrms])? )?(\7[nrms]? )?(\8(e?(s|n|r)?))(arzt|anwalt|bauer|rat|frank|schwab|schwager)(e(n|s)?)?)\b/ig, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => {
                replacementsd++;
                if (p1) {
                    this.log("21007");
                    return p1 + p12;
                } else {
                    this.log("21008");
                    return p12;
                }
            }); //unregelmäßiger Singular: die Ärztin und der Arzt
            s = s.replace(/\b((von |für |mit |als )?(((zu )?d|jed|ein|ihr|zur|sein)(e|er|ie) )?((zur|[a-zäöüß]{4,20}[enr]) ))?([a-zäöüß]{4,20})?((bäue?r|jüd|fränk|schwäb)innen)( und | oder | & | bzw\.? |[\/\*_\(-])(\1|vom )?((((zu )?d|jed|ein|ihr|zum|sein)(e[nrms])? )?(\7[nrms]? )?(\8(e?(s|n|r)?))(bauer|jude|franke|schwabe)([ns])?)\b/ig, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14) => {
                replacementsd++;
                if (p1) {
                    this.log("21009");
                    return p1 + p14;
                } else {
                    this.log("21010");
                    return p14;
                }
            }); //unregelmäßiger Plural: Bäuerinnen und Bauern
            s = s.replace(/\b((von |für |mit |als )?((d|jed|ein|ihr|zum|sein)(e[rnms]?|ie) )?([a-zäöüß]{4,20}[enr] )?([a-zäöüß]{2,})(e?(n|s|r)?))( und | oder | & | bzw\.? |[\/\*_\(-])(\2|von der )?(((von |zu )?d|jed|ein|ihr|zur|sein)(e[rn]?|ie) )?\6?\7(in(nen)?|en?)\b/ig, (match, p1) => {
                this.log("21011");
                replacementsd++;
                return p1;
            }); //Bürger und Bürgerinnen, Bürger und Bürgerin
            s = s.replace(/\b((von |für |mit |als )?((d|jed|ein|ihr|sein)(e[rnms]?|ie) |zum )?([a-zäöüß]{4,20}[enr] )?([a-zäöüß]{4,20})?(arzt|anwalt|bauer|rat|frank|schwab|schwager)(e?(s)?))( und | oder | & | bzw\.? |[\/\*_\(-])(\2|von der )?(((von |zu )?d|jed|ein|ihr|sein)(e[rn]?|ie) |zur )?\6?\7(ärzt|anwält|bäue?rin|rät|fränk|schwäb|schwäger)(in(nen)?)\b/ig, (match, p1) => {
                this.log("21012");
                replacementsd++;
                return p1;
            }); //unregelmäßiger Singular: der Arzt und die Ärztin
            s = s.replace(/\b((von |für |mit |als )?((d|jed|ein|ihr|zum|sein)(e[rnms]?|ie) )?([a-zäöüß]{4,20}[enr] )?([a-zäöüß]{4,20})?(bauer|jud|frank|schwab)(e?n)?)( und | oder | & | bzw\.? |[\/\*_\(-])(\2|von der )?(((von |zu )?d|jed|ein|ihr|zur|sein)(e[rn]?|ie) )?\6?\7(bäue?r|jüd|fränk|schwäb)(in(nen)?)\b/ig, (match, p1) => {
                this.log("21013");
                replacementsd++;
                return p1;
            });//unregelmäßiger Plural: Bauern und Bäuerinnen
            s = s.replace(/\b([A-Z][a-zäöüß]{2,})([a-zäöüß]{2,})innen( und | oder | & | bzw\.? )-(\2(e*n)*)\b/g, (match, p1, p2, p3, p4) => {
                this.log("21014");
                replacementsd++;
                return p1 + p4;
            }); //Bürgervertreterinnen und -vertreter
        }
        return s;
    }

    private entfernePartizip(s: string): string {
        let replacementsp = 0;
        if (/(ier|arbeit|orsch|fahr)ende/.test(s)) {
            s = s.replace(/der Studierende\b/g, () => {
                replacementsp++;
                return "der Student";
            });
            s = s.replace(/Studierende(r|n?)?/g, () => {
                replacementsp++;
                return "Studenten";
            });
            s = s.replace(/Dozierende(r|n?)?/g, () => {
                replacementsp++;
                return "Dozenten";
            });
            s = s.replace(/Assistierende(r|n?)?/g, () => {
                replacementsp++;
                return "Assistenten";
            });
            s = s.replace(/Mitarbeitende(r|n?)?/g, () => {
                replacementsp++;
                return "Mitarbeiter";
            });
            s = s.replace(/Forschende(r|n?)?/g, () => {
                replacementsp++;
                return "Forscher";
            });
            s = s.replace(/([A-Z]+[a-zäöü]+)fahrende(r|n?)?/g, (match, p1) => {
                replacementsp++;
                return p1 + "fahrer";
            });
        }

        return s;
    }

    private probeDocument(bodyTextContent: string = document.body.textContent ? document.body.textContent : ""): 
    {
        probeBinnenI: boolean,
        probeRedundancy: boolean,
        probePartizip: boolean

    } {
        let probeBinnenI = false;
        let probeRedundancy = false;
        let probePartizip = false;
        if (!this.settings.skip_topic || this.settings.skip_topic && this.mtype || this.settings.skip_topic && !/Binnen-I/.test(bodyTextContent)) {
            probeBinnenI = /[a-zäöüß]{2}((\/-?|_|\*|:|\.| und -)?In|(\/-?|_|\*|:|\.| und -)in(n[\*|\.]en)?|INNen|\([Ii]n+(en\)|\)en)?|\/inne?)(?!(\w{1,2}\b)|[A-Z]|[cf]o|t|act|clu|dex|di|line|ner|put|sert|stall|stan|stru|val|vent|v?it|voice)|[A-ZÄÖÜß]{3}(\/-?|_|\*|:|\.)IN\b|(der|die|dessen|ein|sie|ihr|sein|zu[rm]|jede|frau|man|eR\b|em?[\/\*.&_\(])/.test(bodyTextContent);

            if (this.settings.redundancy) {
                probeRedundancy = /\b(und|oder|bzw)\b/.test(bodyTextContent);
            }
            if (this.settings.partizip) {
                probePartizip = /ierende|Mitarbeitende|Forschende|fahrende/.test(bodyTextContent);
            }
        }

        return {
            probeBinnenI: probeBinnenI,
            probeRedundancy: probeRedundancy,
            probePartizip: probePartizip
        }
    }

    private applyToNodes(nodes: Array<CharacterData>, modifyData: (s: string) => string) {
        var textnodes = nodes;
        for (var i = 0; i < textnodes.length; i++) {
            var node = textnodes[i];
            var s = node.data;

            s = modifyData.call(this, s);

            if (node.data !== s) {
                node.data = s;
            }
        }
    }

    public entferneInitial() {
        const probeResult = this.probeDocument()

        if (probeResult.probeBinnenI || this.settings.redundancy && probeResult.probeRedundancy || this.settings.partizip && probeResult.probePartizip) {
            this.nodes = this.textNodesUnder(document)
            if (this.settings.redundancy && probeResult.probeRedundancy) {
                this.applyToNodes(this.nodes, this.entferneDoppelformen);
            }
            if (this.settings.partizip && probeResult.probePartizip) {
                this.applyToNodes(this.nodes, this.entfernePartizip);
            }
            if (probeResult.probeBinnenI) {
                this.applyToNodes(this.nodes, this.entferneBinnenIs);
            }
            // if (counter) {
            //     sendCounttoBackgroundScript();
            // }
        }
    }

    public entferneInitialForTesting(s: string): string {
        const probeResult = this.probeDocument(s)

        if (probeResult.probeBinnenI || this.settings.redundancy && probeResult.probeRedundancy || this.settings.partizip && probeResult.probePartizip) {
            if (this.settings.redundancy && probeResult.probeRedundancy) {
                s = this.entferneDoppelformen(s);
            }
            if (this.settings.partizip && probeResult.probePartizip) {
                s = this.entfernePartizip(s);
            }
            if (probeResult.probeBinnenI) {
                s = this.entferneBinnenIs(s);
            }
            // if (counter) {
            //     sendCounttoBackgroundScript();
            // }
        }
        return s;
    }    

    private entferneInserted(nodes: Array<CharacterData>) {
        if (!this.settings.skip_topic || this.settings.skip_topic && this.mtype || this.settings.skip_topic && !/Binnen-I/.test(document.body.textContent ? document.body.textContent : "")) {
                if (this.settings.redundancy) {
                    this.applyToNodes(nodes, this.entferneDoppelformen);
                }
                if (this.settings.partizip) {
                    this.applyToNodes(nodes, this.entfernePartizip);
                }
                this.applyToNodes(nodes, this.entferneBinnenIs);
                // if (counter) {
                //     sendCounttoBackgroundScript();
                // }
        }
    }

    public notifyBackgroundScript() {
        chrome.runtime.sendMessage({
            action: 'needOptions'
        }, (res: { type?: string, response: string }) => {
            this.handleResponse(res);
        });
    }
    
    private sendCounttoBackgroundScript() {
        chrome.runtime.sendMessage({
            countBinnenIreplacements: this.replacementsb,
            countDoppelformreplacements: this.replacementsd,
            countPartizipreplacements: this.replacementsp,
            type: "count"
        });
    }    
}

if (typeof document != "undefined" && document.body.textContent) {
    const beGone = new BeGone();
    //Einstellungen laden
    beGone.notifyBackgroundScript();
    chrome.runtime.onMessage.addListener((message: { type?: string, response: string }) => {
        beGone.handleResponse(message);
    });
}