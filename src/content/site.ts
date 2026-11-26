// Alle teksten en gegevens van FundamentPlus staan in deze map.
// Bron: new.fundamentplus.nl (november 2026), ingekort en aangescherpt door WebTik.

export const SITE = {
  name: "FundamentPlus",
  tagline: "Van kwetsbaar naar kansrijk",
  url: "https://fundamentplus.nl",
  phone: "(020) 737 09 05",
  phoneHref: "tel:+31207370905",
  email: "info@fundamentplus.nl",
  street: "Pierre Cuypershof 20",
  postal: "1067 LC",
  city: "Amsterdam",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pierre+Cuypershof+20+1067+LC+Amsterdam",
  regions: ["Amsterdam", "Flevoland", "Alkmaar", "Zuid-Kennemerland", "Zaanstreek/Waterland", "Haarlemmermeer"],
  intro: "Bij FundamentPlus staan we naast jongeren die een steuntje in de rug kunnen gebruiken.",
};

export type Img = { src: string; alt: string; w: number; h: number; pos?: string };
const img = (name: string, alt: string, w = 1400, h = 933, pos?: string): Img => ({
  src: `/images/${name}`,
  alt,
  w,
  h,
  pos,
});

export const IMG = {
  woonkamerGesprek: img("woonkamer-gesprek", "Een jongere op de bank in gesprek met een begeleider in de woonkamer van FundamentPlus", 1400, 933, "40% 50%"),
  portret: img("portret", "Portret van een jongere die begeleid wordt door FundamentPlus", 1400, 2100, "50% 35%"),
  gesprek: img("gesprek", "Begeleider in gesprek met een jongere aan tafel, met thee en een notitieboek", 1400, 933, "30% 40%"),
  samenOpPad: img("samen-op-pad", "Een jongere en een ambulant begeleider lopen samen door de wijk", 1400, 933, "50% 60%"),
  garageTeam: img("garage-team", "Twee jongeren poetsen samen een zwarte auto in de werkplaats van een samenwerkingspartner", 1400, 934, "50% 55%"),
  polijsten: img("polijsten", "Jongere polijst de motorkap van een auto tijdens de dagbesteding", 1400, 2100, "60% 70%"),
  polijstenDetail: img("polijsten-detail", "Close-up van een polijstmachine op een glanzende motorkap", 1400, 933),
  folie: img("folie", "Jongere verwijdert belettering van een bedrijfsbus in de werkplaats", 1400, 933, "55% 50%"),
  motorkap: img("motorkap", "Jongere maakt de motorruimte van een auto schoon", 1400, 2100, "60% 40%"),
  woonkamer: img("woonkamer", "Lichte woonkamer met bank en grote ramen op de woonlocatie in Amsterdam", 1400, 933, "45% 60%"),
  woonkamer2: img("woonkamer-2", "Woonkamer van een woonlocatie van FundamentPlus met uitzicht op het hofje", 1400, 933),
  thuis: img("thuis", "Zelf ingerichte kamer van een jongere met een zelfgemaakt schilderij met het woord thuis", 1400, 933, "40% 50%"),
  kamer: img("kamer", "Sfeervolle kamer van een jongere met planten en ledverlichting", 1400, 933),
  kamer2: img("kamer-2", "Eigen kamer van een jongere, ingericht naar eigen smaak", 1400, 933),
  kat: img("kat", "Een gestreepte kat op de woonlocatie kijkt nieuwsgierig omhoog", 1400, 934, "35% 40%"),
  katSnoepje: img("kat-snoepje", "Begeleider geeft de kat van de woonlocatie een snoepje", 1400, 933),
  schilderwand: img("schilderwand", "Kleurrijk schilderij van losse doeken, samen gemaakt door jongeren, met het woord trust", 1400, 2100, "50% 40%"),
  team: img("team-voordeur", "Drie medewerkers van FundamentPlus lachend bij de voordeur van het kantoor", 1400, 2100, "50% 55%"),
  lezen: img("lezen", "Medewerker van FundamentPlus leest een voetbalboek in een rode stoel", 1400, 933, "50% 40%"),
  locatie: img("locatie", "Het gebouw van FundamentPlus aan de Pierre Cuypershof in Amsterdam", 1400, 933),
  vr: img("vr", "Illustratie van twee jongeren met een VR-bril in een kleurrijke woonkamer", 1400, 1400, "50% 70%"),
  girlsTalk: img("girls-talk", "Illustratie van een groep meiden in een oranje glazen kubus", 1024, 1024),
};

export const NAV = [
  { to: "/begeleid-wonen/", label: "Woonbegeleiding" },
  { to: "/dagbesteding/", label: "Dagbesteding" },
  { to: "/ambulante-begeleiding/", label: "Ambulante begeleiding" },
  { to: "/over-ons/", label: "Over ons" },
  { to: "/contact/", label: "Contact" },
];

export const FOOTER_LINKS = [
  { to: "/over-ons/", label: "Over ons" },
  { to: "/werken-bij/", label: "Werken bij ons" },
  { to: "/klachtenregelement/", label: "Klachtenreglement" },
  { to: "/jeugdstem/", label: "JeugdStem" },
  { to: "/privacy/", label: "Privacybeleid" },
];

export const CERTS = [
  { src: "/images/wtzi-erkend.webp", alt: "WTZI-erkend", w: 170, h: 100 },
  { src: "/images/iso-9001.webp", alt: "ISO 9001 gecertificeerd", w: 400, h: 400 },
  { src: "/images/klachtenportaal-zorg.webp", alt: "Aangesloten bij Klachtenportaal Zorg", w: 300, h: 36 },
];

export type QA = { q: string; a: string[] };

export const PHASES = [
  { n: 1, title: "Herstel", text: "Intensieve 24-uursbegeleiding. We werken aan rust, vertrouwen en stabiliteit." },
  { n: 2, title: "Verantwoordelijkheid", text: "Minder begeleiding, meer eigen regie. Je neemt steeds meer zelf in handen." },
  { n: 3, title: "Zelfstandig", text: "Je woont zelfstandig, met een vangnet en steun waar dat nodig is." },
];

export const PILLARS = [
  {
    title: "Onvoorwaardelijk",
    text: "We zijn altijd bereikbaar en laten niemand los. Vertrouwen, veiligheid en persoonlijke aandacht staan voorop.",
    color: "plum",
  },
  {
    title: "Systeemgericht en op maat",
    text: "We begeleiden niet alleen de jongere, maar betrekken ook gezin, school en netwerk. Elk plan past bij de hulpvraag.",
    color: "sun",
  },
  {
    title: "Innovatief",
    text: "Sport, Virtual Reality en Girls' Talk: moderne methoden die jongeren motiveren en in beweging brengen.",
    color: "sky",
  },
] as const;

export const HOME = {
  eyebrow: "Jeugdhulp en begeleid wonen in Amsterdam",
  title: "Jij groeit, wij begeleiden.",
  lead: "Een stabiele basis voor een sterke toekomst. We staan naast jongeren die een steuntje in de rug kunnen gebruiken: onvoorwaardelijk, betrokken en stap voor stap richting zelfstandigheid.",
  why: {
    title: "Geen standaardtraject, wel zorg op maat",
    text: "Samen met de jongere, ouders of verzorgers en betrokken professionals maken we een plan dat past bij de hulpvraag. Ons team is ervaren, multidisciplinair en multicultureel.",
  },
  services: [
    {
      to: "/begeleid-wonen/",
      title: "Woonbegeleiding",
      text: "24-uurs begeleid wonen in drie fases, groepswonen en zelfstandig wonen met een vangnet.",
      img: "woonkamer",
      color: "plum",
    },
    {
      to: "/ambulante-begeleiding/",
      title: "Ambulante begeleiding",
      text: "Begeleiding thuis, op school of in de buurt. Licht als het kan, intensief als het moet.",
      img: "samenOpPad",
      color: "sky",
    },
    {
      to: "/dagbesteding/",
      title: "Dagbesteding",
      text: "Structuur en echte werkervaring bij lokale partners, als opstap naar school, stage of werk.",
      img: "garageTeam",
      color: "sun",
    },
  ] as const,
  approach: {
    title: "Menselijk, altijd bereikbaar en zonder voorwaarden",
    text: "Bij FundamentPlus draait alles om groei: persoonlijk, sociaal en mentaal. Verandering lukt pas echt als de omgeving meebeweegt. Daarom betrekken we ook ouders, school, vrienden en professionals.",
  },
  specials: [
    {
      id: "forensisch",
      to: "/ambulante-begeleiding/#forensisch",
      kicker: "Forensisch",
      title: "Zorg én veiligheid",
      text: "Voor jongeren op het snijvlak van zorg en justitie. We werken aan gedragsverandering, zelfreflectie en een positieve toekomst, met duidelijke grenzen en ruimte om te leren.",
      color: "plum",
    },
    {
      id: "meiden",
      to: "/ambulante-begeleiding/#meiden",
      kicker: "Meidenspecifiek",
      title: "Je kracht terugvinden",
      text: "Voor meiden die te maken hebben gehad met mensenhandel, uitbuiting of manipulatie. Met de bewezen interventie Girls' Talk bouwen we aan zelfvertrouwen en weerbaarheid.",
      color: "berry",
    },
    {
      id: "sport",
      to: "/ambulante-begeleiding/#sport",
      kicker: "Sport",
      title: "Beweging brengt verandering",
      text: "Door sport ontdekken jongeren hun doorzettingsvermogen en eigen kracht. Ze leren omgaan met succes én tegenslag en bouwen aan mentale veerkracht.",
      color: "sun",
    },
    {
      id: "vr",
      to: "/ambulante-begeleiding/#vr",
      kicker: "Virtual Reality",
      title: "Ervaren. Leren. Groeien.",
      text: "In veilige virtuele situaties oefenen jongeren met groepsdruk, stress en lastige keuzes. Zo groeien zelfinzicht en zelfvertrouwen.",
      color: "sky",
    },
  ] as const,
  personal: {
    title: "Begeleiding die past bij jouw verhaal",
    text: "Praktische vaardigheden leren, psychische klachten begrijpen, structuur vinden of relaties versterken: onze begeleiders staan klaar. We werken aan zelfinzicht en een toekomst waarin de jongere zelf de regie heeft.",
  },
  faq: [
    {
      q: "Voor wie is FundamentPlus bedoeld?",
      a: ["Voor jongeren en jongvolwassenen die extra steun nodig hebben bij zelfstandigheid, mentale gezondheid, veiligheid of sociale ontwikkeling. Ook jongeren met een forensische achtergrond en meiden die te maken hebben gehad met uitbuiting of manipulatie kunnen bij ons terecht."],
    },
    {
      q: "Hoe meld ik een jongere aan?",
      a: ["Aanmelden kan via ouders, verwijzers, jeugdbescherming, wijkteams of door de jongere zelf. Na de aanmelding plannen we een kennismakingsgesprek over de situatie, de hulpvraag en de mogelijkheden."],
    },
    {
      q: "Wordt de begeleiding vergoed?",
      a: ["Meestal wel, via de gemeente of een geldige zorgindicatie (Jeugdwet, Wmo of forensische jeugdzorg). We helpen bij het aanvragen of controleren van de juiste indicatie."],
    },
    {
      q: "Hoe lang duurt een traject?",
      a: ["Dat verschilt per jongere. We stellen samen persoonlijke doelen en begeleiden zolang het nodig is: van kort en licht tot een lang traject richting volledige zelfstandigheid."],
    },
    {
      q: "Wat is het verschil tussen ambulante begeleiding en begeleid wonen?",
      a: [
        "Bij ambulante begeleiding woont de jongere thuis of zelfstandig en komt de begeleiding naar de jongere toe.",
        "Bij begeleid wonen woont de jongere in een veilige woonvorm van FundamentPlus, met 24-uursbegeleiding of ondersteuning op maat.",
      ],
    },
    {
      q: "Hoe wordt het netwerk betrokken?",
      a: ["We werken systeemgericht. In overleg met de jongere betrekken we ouders, familie, school, vrienden en andere professionals. Samen maken we een omgeving waarin verandering wél kan slagen."],
    },
  ] as QA[],
};

export const WONEN = {
  eyebrow: "Begeleid wonen",
  title: "Begeleid wonen in Amsterdam en omgeving",
  lead: "Zoek je een begeleid wonen-traject of een crisisplek? We bieden 24-uursbegeleiding in Amsterdam, Flevoland, Alkmaar, Zuid-Kennemerland, Zaanstreek/Waterland en Haarlemmermeer.",
  phasesTitle: "In drie fases naar zelfstandigheid",
  phasesLead: "Jongeren worden sneller zelfstandig met professionele begeleiding. Begeleid wonen geeft een veilige basis met duidelijke stappen.",
  different: {
    title: "Is hier plek, past het bij mij en hoe snel kan ik starten?",
    paras: [
      "Dat zijn de vragen die ertoe doen. Naast de groepswerkers heb je bij ons een vaste persoonlijk begeleider die je helpt met je hulpvragen. Er is altijd iemand bereikbaar, ook 's nachts.",
      "Je meldt je zelf aan of samen met je begeleider. Wij kijken snel of er plek is en helpen met de indicatie als dat nodig is. Aanmeldingen van buiten onze regio's zijn ook welkom.",
    ],
  },
  fit: {
    title: "Past begeleid wonen bij jou?",
    items: [
      "Je kunt door omstandigheden niet thuis of elders wonen.",
      "Je hebt extra ondersteuning nodig bij verschillende hulpvragen.",
      "Je bent gemotiveerd om stappen te zetten.",
      "Je wilt rust, duidelijke afspraken en begeleiders die met je meedenken.",
    ],
  },
  forms: [
    {
      title: "24-uursbegeleiding",
      color: "plum",
      items: [
        "Overdag, 's avonds en 's nachts is er iemand voor je",
        "Je woont met maximaal 6 à 8 jongeren in een wooneenheid",
        "Een eigen kamer die je zelf inricht",
        "Samen koken, eten en activiteiten",
        "Een vaste persoonlijk begeleider",
      ],
    },
    {
      title: "Groepswonen",
      color: "sun",
      items: [
        "Je woont met één of twee medebewoners, soms met een hoofdbewoner",
        "Overdag en 's avonds is er begeleiding",
        "Een eigen kamer",
        "Je deelt de keuken, douche en wc",
      ],
    },
    {
      title: "Eigen woonruimte",
      color: "sky",
      items: [
        "Je hebt je eigen plek",
        "Je leert wonen met vrijheid én duidelijke afspraken",
        "Hulp bij dagbesteding, dagritme en waar je tegenaan loopt",
        "Alles gericht op zelfstandig wonen en een eigen toekomst",
      ],
    },
  ] as const,
  locationsTitle: "Onze woonlocaties",
  locations: [
    { city: "Amsterdam", setting: "24-uurs, semi-24-uurs en zelfstandig" },
    { city: "Almere", setting: "24-uurs, rustige woonlocaties met begeleiding in de buurt" },
    { city: "Haarlem", setting: "Semi-24-uurs" },
    { city: "Zwanenburg", setting: "Semi-24-uurs" },
    { city: "Zaanstad", setting: "Zelfstandig" },
  ],
  group: {
    title: "Groepswonen: samen leren en groeien",
    text: "Groepswonen is de brug tussen beschermd wonen en volledig zelfstandig leven. In een sociale, veilige omgeving leer je samenwerken, communiceren en verantwoordelijkheid delen, met begeleiding dichtbij.",
  },
  story: {
    title: "J. vond zijn eigen plek",
    text: [
      "J. kwam bij ons binnen met een lange geschiedenis bij verschillende instanties. Hij werd vaak gezien als onhandelbaar en zijn vertrouwen in hulpverlening was bijna verdwenen.",
      "We hebben eerst rust gecreëerd. Met tijd, aandacht en onvoorwaardelijke steun werkten we stap voor stap aan stabiliteit en perspectief.",
      "Twee jaar later rondde J. zijn traject positief af. Hij heeft een baan en woont zelfstandig in zijn eigen woning. Daar heeft hij zelf hard voor gewerkt, en wij zijn trots op hem.",
    ],
  },
  faq: [
    { q: "Wat kost begeleid wonen?", a: ["Met een Wmo- of Jeugdwet-indicatie betaal je meestal alleen een eigen bijdrage."] },
    { q: "Kan ik me zelf aanmelden?", a: ["Ja. Je mag je altijd zelf aanmelden, ook zonder verwijzer."] },
    { q: "Hoe snel kan ik starten?", a: ["Dat hangt af van de beschikbare plek en je indicatie. We kijken dit direct met je na."] },
    { q: "Is er 's nachts begeleiding?", a: ["Ja. Er is 24 uur per dag begeleiding bereikbaar."] },
    { q: "Kan ik later doorstromen naar zelfstandig wonen?", a: ["Ja. Dat is precies het doel van het traject."] },
  ] as QA[],
};

export const DAG = {
  eyebrow: "Dagbesteding voor jongeren",
  title: "Dagbesteding: structuur, vaardigheden en zelfvertrouwen",
  lead: "Niet elke jongere komt vanzelf tot bloei op school, stage of werk. Bij FundamentPlus krijgen jongeren structuur, echte werkervaring en persoonlijke aandacht, als opstap naar een zelfstandig en actief leven.",
  forWho: {
    title: "Voor wie is onze dagbesteding?",
    items: [
      "Jongeren die meer structuur en ritme nodig hebben",
      "Jongeren die vastlopen op school, stage of werk",
      "Jongeren die extra hulp nodig hebben bij sociale vaardigheden",
      "Jongeren die willen werken aan zelfvertrouwen en zelfstandigheid",
      "Jongeren die zich voorbereiden op onderwijs, werk of vervolgzorg",
    ],
    after: "We kijken altijd naar de persoonlijke situatie, mogelijkheden en doelen. Zo krijgt elke jongere een traject dat echt past.",
  },
  approach: {
    title: "Zo pakken we het aan",
    text: "Iedere jongere is anders en verdient maatwerk. Samen met de jongere en ouders of verzorgers stellen we haalbare doelen. Regelmatige evaluaties houden de begeleiding in lijn met het tempo van de jongere.",
    items: ["Dagelijkse structuur", "Sociale en praktische vaardigheden", "Meer zelfvertrouwen", "Verantwoordelijkheidsgevoel"],
  },
  practice: {
    title: "Echte werkervaring bij lokale partners",
    text: "We werken samen met lokale partners, zoals een poets- en wasstraat en horecaondernemingen. In een veilige leeromgeving doen jongeren echte werkervaring op.",
    learn: ["Op tijd komen en afspraken nakomen", "Samenwerken met collega's", "Doorzetten bij tegenslag", "Verantwoordelijkheid nemen voor je taken"],
  },
  skills: {
    title: "Groeien in vaardigheden en zelfvertrouwen",
    items: ["Communiceren", "Plannen en organiseren", "Omgaan met feedback", "Zelfstandig werken", "Zelfvertrouwen opbouwen"],
    text: "Elke succeservaring laat het vertrouwen in eigen kunnen groeien. Dat is een stevige basis voor de volgende stap.",
  },
  safety: {
    title: "Veilig, duidelijk en persoonlijk",
    text: "Ervaren begeleiders zorgen voor structuur, duidelijkheid en een positieve sfeer. Zo voelen jongeren zich gezien, gehoord en gesteund.",
    items: ["Professionele, betrokken begeleiding", "Kleine groepen met veel persoonlijke aandacht", "Heldere afspraken en vaste dagstructuur", "Nauwe samenwerking met ouders, verwijzers en gemeenten"],
  },
  goals: {
    title: "Waar we naartoe werken",
    items: ["Terug naar school", "Start van een stage of leerwerktraject", "Doorstroom naar werk", "Vervolgbegeleiding of passende zorg"],
  },
  faq: [
    { q: "Wat is dagbesteding voor jongeren precies?", a: ["Begeleiding waarbij jongeren overdag zinvolle activiteiten doen in een vaste structuur. Het is geen onderwijs of behandeling, maar gericht op vaardigheden, werkervaring en zelfvertrouwen. We combineren praktijkwerk met persoonlijke begeleiding."] },
    { q: "Voor welke leeftijd is de dagbesteding?", a: ["Vooral voor jongeren en jongvolwassenen. De precieze leeftijd hangt af van de situatie en de ondersteuningsbehoefte. Neem contact op, dan bekijken we samen of ons aanbod past."] },
    { q: "Wordt dagbesteding vergoed?", a: ["Dagbesteding kan vergoed worden via de Jeugdwet of de Wmo, afhankelijk van de situatie en leeftijd. Meestal is een indicatie van de gemeente nodig. We helpen je graag met de aanvraag."] },
    { q: "Hoe ziet een dagprogramma eruit?", a: ["Het programma past bij de mogelijkheden en doelen van de jongere. Denk aan praktisch werk bij onze partners, zoals de wasstraat of poetsdiensten, sociale activiteiten, vaardigheidstraining en momenten van rust. Structuur staat centraal, met ruimte voor maatwerk."] },
    { q: "Wat is het verschil met school en dagbehandeling?", a: ["School draait om onderwijs en diploma's. Dagbehandeling is een intensieve behandelvorm bij ernstige psychische problemen. Dagbesteding zit ertussenin: structuur, begeleiding en activiteiten, gericht op ontwikkeling en zelfstandigheid."] },
    { q: "Hoe meld ik mijn kind aan?", a: ["Neem contact op voor een vrijblijvend kennismakingsgesprek. We bespreken de situatie, je vragen en of ons aanbod past. Daarna kijken we samen naar de indicatie en praktische zaken."] },
  ] as QA[],
};

export const AMB = {
  eyebrow: "Ambulante begeleiding",
  title: "Ambulante begeleiding voor jongeren",
  lead: "Psychische klachten, sociale problemen of geen grip op de dag? Onze begeleiders komen naar de jongere toe: thuis, op school of in de buurt. Persoonlijk, betrokken en altijd op maat.",
  what: {
    title: "Wat is ambulante begeleiding?",
    text: "Ondersteuning in de eigen leefomgeving. We versterken vaardigheden, structuur en zelfstandigheid, laagdrempelig en gericht op blijvende verandering.",
    items: ["Psychisch welbevinden, zelfvertrouwen en toekomstplannen", "Praktische vaardigheden en sociale relaties", "School, werk en vrije tijd"],
  },
  forWho: {
    title: "Voor wie?",
    text: "Voor jongeren die vastlopen op school, stage of werk, psychische klachten ervaren, moeite hebben met structuur of problemen hebben in sociale contacten of het gezin. We bieden zowel lichte als complexe ondersteuning.",
  },
  vision: {
    title: "Vertrouwen, respect en gelijkwaardigheid",
    text: "De jongere staat centraal. Onze begeleiding is persoonlijk en doelgericht, met duidelijke afspraken en vaste evaluaties. Samen met ouders en professionals bouwen we aan een sterk netwerk.",
  },
  always: {
    title: "Er zijn, juist als het moeilijk is",
    text: "Onvoorwaardelijkheid is ons uitgangspunt. Die nabijheid zorgt voor veiligheid en vertrouwen: de basis voor herstel.",
    items: ["Goed bereikbaar", "Betrouwbaar en betrokken", "Duidelijk en voorspelbaar", "Ervaren in complexe hulpvragen"],
  },
  network: {
    title: "Samen met het netwerk",
    items: ["Ouders en verzorgers", "Scholen en onderwijsinstellingen", "Gemeenten en wijkteams", "Zorgprofessionals en behandelaren"],
    text: "Zo versterken begeleiding, behandeling en omgeving elkaar.",
  },
  forensic: {
    title: "Forensische ambulante begeleiding",
    text: [
      "Sommige jongeren komen in aanraking met justitie of maken keuzes die gevolgen hebben. Een nieuwe start is altijd mogelijk.",
      "We begeleiden jongeren op het snijvlak van zorg en veiligheid. De focus ligt op gedragsverandering, zelfreflectie en een positieve toekomst, met duidelijke grenzen en ruimte om te leren.",
    ],
  },
  sport: {
    title: "Sport als middel",
    text: "Bewegen is een krachtig hulpmiddel. Door sport ervaren jongeren succes, plezier en verbinding: bouwstenen voor mentale veerkracht.",
    items: ["Meer zelfvertrouwen", "Doorzettingsvermogen", "Samenwerken", "Omgaan met emoties en spanning", "Een gezonde leefstijl"],
  },
  testimonial: {
    text: "Dank voor alle hulp en dat jullie nooit hebben opgegeven. Jullie bleven vertrouwen houden in mijn zoon, ook toen dat moeilijk was. Zonder dat vertrouwen was hij nooit zo ver gekomen. Door jullie steun kon ik ook een betere moeder voor hem zijn.",
    who: "Saskia",
    role: "moeder",
  },
  girls: {
    title: "Meidenspecifieke begeleiding en Girls' Talk",
    text: [
      "Mensenhandel en uitbuiting laten diepe sporen na. We bieden gespecialiseerde begeleiding aan meiden die hiermee te maken hebben (gehad). We werken aan veiligheid en vertrouwen, versterken weerbaarheid en helpen risicosignalen herkennen.",
      "Met de interventie Girls' Talk leren meiden grenzen stellen, sterker in hun schoenen staan en bewuste keuzes maken. Het doel: herstel en een toekomst zonder dwang of afhankelijkheid.",
    ],
    alert: "Maak je je zorgen over de veiligheid van een jongere? Neem direct contact op met onze begeleiders.",
  },
  vr: {
    title: "Virtual Reality als ervaringsmiddel",
    text: [
      "In een veilige virtuele omgeving oefenen jongeren met realistische situaties: groepsdruk, verleiding, grenzen en risico's.",
      "VR helpt stress te reguleren en vergroot het zelfinzicht. Het vervangt de persoonlijke begeleiding niet, maar is er een waardevolle aanvulling op.",
    ],
  },
  faq: [
    { q: "Wat is ambulante begeleiding precies?", a: ["Ondersteuning in de eigen leefomgeving, gericht op ontwikkeling, structuur en zelfstandigheid."] },
    { q: "Voor welke jongeren is het geschikt?", a: ["Voor jongeren en jongvolwassenen die vastlopen op school, werk, sociaal of psychisch en extra steun nodig hebben."] },
    { q: "Wordt het vergoed via de Jeugdwet of Wmo?", a: ["In veel gevallen wel. We helpen je graag bij het regelen van de indicatie."] },
    { q: "Hoe intensief is de begeleiding?", a: ["Dat hangt af van de hulpvraag: van enkele contactmomenten per week tot intensievere begeleiding."] },
    { q: "Wat houdt meidenspecifieke begeleiding in?", a: ["Begeleiding gericht op herstel, veiligheid en weerbaarheid voor meiden die te maken hebben met mensenhandel of uitbuiting."] },
    { q: "Hoe zetten jullie sport en VR in?", a: ["Sport versterkt zelfvertrouwen, sociale vaardigheden en veerkracht. Met VR oefenen jongeren veilig met lastige situaties en vergroten ze hun zelfinzicht."] },
    { q: "Hoe meld ik mijn kind aan?", a: ["Neem contact op voor een vrijblijvend kennismakingsgesprek. Samen bekijken we welk traject past."] },
  ] as QA[],
};

export const OVER = {
  eyebrow: "Over FundamentPlus",
  title: "Een stevig fundament voor elke jongere",
  lead: "FundamentPlus Jeugdhulp is een jonge, dynamische organisatie met jarenlange ervaring in de jeugdzorg en het welzijnswerk.",
  paras: [
    "We zetten ons in voor kwalitatieve en vernieuwende ondersteuning voor jongeren en gezinnen die dat nodig hebben. Door onze ervaring begrijpen we de uitdagingen van jongeren, ouders en professionals.",
    "Tegelijk zoeken we steeds naar nieuwe manieren om zorg persoonlijker en effectiever te maken. Met een gedreven team dat betrokken, deskundig en oplossingsgericht werkt.",
    "Want iedere jongere verdient een sterke basis om zich te ontwikkelen. Samen bouwen we aan een stevig fundament voor de toekomst.",
  ],
};

export const WERKEN = {
  eyebrow: "Werken bij",
  title: "Werken bij FundamentPlus",
  lead: "Sta jij sterk in je schoenen en word je enthousiast van het begeleiden van jongeren tussen 12 en 23 jaar? Zet jij hun belangen op één? Dan zoeken we jou.",
  roles: ["Pedagogisch medewerker A", "Woonbegeleider", "Ambulant hulpverlener", "Gedragswetenschapper"],
  hours: "Parttime en fulltime",
  where: {
    title: "Waar ga je aan de slag?",
    text: "FundamentPlus is een kleinschalige organisatie met verschillende woonvoorzieningen, waaronder twee 24-uurssettingen in Amsterdam en Almere. We begeleiden jongeren met gedragsproblemen en/of een licht verstandelijke beperking die (tijdelijk) niet thuis kunnen wonen. Samen bieden we hen een veilige, vertrouwde en warme plek om zich te ontwikkelen.",
  },
};

export const KLACHT = {
  title: "Klachtenreglement",
  lead: "Ben je ontevreden over hoe je bent behandeld door FundamentPlus of een van onze medewerkers? Dat horen we graag, zodat we het kunnen oplossen.",
  intro: "Alle klachten komen centraal binnen op ons kantoor, ter attentie van de directie. De directie legt het registreren en afhandelen bij de zorgcoördinator. Alle betrokkenen krijgen schriftelijk bericht over de klacht en de afhandeling. De directie blijft inhoudelijk verantwoordelijk voor een zorgvuldige afhandeling.",
  rules: [
    "Een klacht over uitlatingen of gedragingen van medewerkers van FundamentPlus, of van door FundamentPlus ingehuurde derden, kan schriftelijk en mondeling worden gericht aan de directie van FundamentPlus.",
    "Wordt een klacht mondeling ingediend, dan kan de directie vragen om een schriftelijke weergave van de klacht voor de verdere afhandeling.",
    "De klager krijgt binnen maximaal 3 weken na schriftelijke indiening (of schriftelijke weergave) een bevestiging van de directie, met de datum van de feiten en een korte omschrijving.",
    "Wordt de klacht alleen op basis van mondelinge indiening afgehandeld, dan wordt de bevestiging onder punt 3 niet verstrekt.",
    "Bij elke klacht passen we hoor en wederhoor toe, zowel bij de klager als bij degene op wie de klacht betrekking heeft. Hiervan maken we een schriftelijk verslag dat aan beide partijen wordt gestuurd.",
    "De afhandeling van de klacht vindt plaats binnen 3 weken na de bevestiging.",
    "De klager krijgt schriftelijk en gemotiveerd bericht over de bevindingen van de directie en de maatregelen die zijn of worden genomen.",
    "FundamentPlus registreert de klachten naar aard, omvang en genomen maatregelen. Deze registratie kan op verzoek aan een eventuele opdrachtgever ter beschikking worden gesteld.",
    "Vindt een van de betrokken partijen zich benadeeld door de afhandeling of de genomen maatregelen, dan kan deze partij zich wenden tot een externe instantie voor een onafhankelijke herbeoordeling. Dat kan de ombudsman of -vrouw zijn in de gemeente waar de dienstverlening plaatsvond, of een andere instantie waarover de partijen het eens zijn.",
    "Bij een herbeoordeling respecteert de directie het oordeel van de externe instantie. De klager krijgt binnen maximaal 3 weken na de herbeoordeling schriftelijk bevestiging van de nieuwe afhandeling.",
  ],
  external: "FundamentPlus is aangesloten bij de onafhankelijke klachtencommissie Klachtenportaal Zorg. Kom je er met ons niet uit, dan kun je je klacht indienen via het formulier van Klachtenportaal Zorg of mailen naar info@klachtenportaalzorg.nl. Een onafhankelijke klachtenfunctionaris kan je daarbij helpen.",
  links: {
    indienen: "https://klachtenportaalzorg.nl/klacht-indienen/",
    functionaris: "https://klachtenportaalzorg.nl/klachtenfunctionaris/",
    mail: "info@klachtenportaalzorg.nl",
  },
  since: "Dit reglement geldt vanaf 1 mei 2021 voor onbepaalde tijd, tot het wordt vervangen door een nieuw reglement.",
};

export const JEUGDSTEM = {
  title: "JeugdStem: een vertrouwenspersoon aan jouw kant",
  lead: "JeugdStem is de organisatie van vertrouwenspersonen in de jeugdzorg. Kinderen, jongeren en volwassenen kunnen er gratis terecht met vragen of klachten.",
  paras: [
    "Een vertrouwenspersoon kan meegaan naar gesprekken met de gemeente of een hulpverlener, en helpt met het indienen van een klacht of het maken van bezwaar bij de gemeente.",
    "JeugdStem is een zelfstandige stichting. De vertrouwenspersonen zijn niet in dienst van FundamentPlus.",
  ],
  does: [
    "Geeft informatie en advies aan jongeren, ouders en verzorgers en legt uit hoe de jeugdzorg werkt",
    "Ondersteunt bij klachten over de jeugdzorg",
    "Geeft informatie over je rechten en rechtspositie in de jeugdzorg",
    "Draagt bij aan een betere kwaliteit van de jeugdzorg",
  ],
  phone: "088 555 1000",
  phoneHref: "tel:+31885551000",
  url: "https://www.jeugdstem.nl",
  chat: "Chat via jeugdstem.nl: maandag t/m donderdag 16.00 tot 20.00 uur, vrijdag 15.00 tot 17.00 uur.",
};

export const CONTACT = {
  title: "Neem contact op",
  lead: "Vragen over onze begeleiding, een aanmelding of een kennismaking? We denken graag met je mee.",
};

export const AANMELDEN = {
  title: "Aanmelden bij FundamentPlus",
  lead: "Meld een jongere aan, of meld je zelf aan. Ook zonder verwijzer.",
  steps: [
    { title: "Aanmelding", text: "Je vult het formulier in, als jongere, ouder of verwijzer." },
    { title: "Kennismaking", text: "We plannen een gesprek over de situatie, hulpvraag en mogelijkheden." },
    { title: "Plan op maat", text: "We kijken naar plek en indicatie en maken samen een plan." },
  ],
};
