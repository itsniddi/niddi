import { SITE } from '../config';

// Magyar jogi szövegek – ÁLTALÁNOS SABLON. A [szögletes zárójeles] részeket töltsd ki,
// és élesítés előtt egyeztess jogi szakemberrel.
const OP = '[Üzemeltető neve / cégnév]';

export const LEGAL_DOCS = {
  privacy: {
    title: 'Adatkezelési Tájékoztató (GDPR)',
    updated: '2026. október 3.',
    sections: [
      {
        h: '1. Az adatkezelő adatai',
        p: [
          `Adatkezelő: ${OP} (a továbbiakban: Adatkezelő). Weboldal: https://${SITE.domain}. Kapcsolattartási e-mail cím: ${SITE.email}.`,
          'Jelen tájékoztató az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR), valamint az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény (Infotv.) alapján készült.',
        ],
      },
      {
        h: '2. A kezelt adatok köre, célja és jogalapja',
        list: [
          'Kapcsolati űrlap – kezelt adatok: név, e-mail cím, tárgy, az üzenet szövege. Cél: a megkeresések megválaszolása, kapcsolattartás. Jogalap: az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont). Megőrzési idő: az ügy lezárásáig, de legfeljebb 12 hónapig.',
          'Technikai adatok (pl. IP-cím, böngésző típusa, időbélyeg) – a tárhelyszolgáltató szerver naplóiban keletkeznek. Cél: az oldal biztonságos és stabil működtetése. Jogalap: jogos érdek (GDPR 6. cikk (1) bekezdés f) pont).',
        ],
      },
      {
        h: '3. Adatfeldolgozók és adattovábbítás',
        list: [
          'Discord Inc. (USA) – az űrlapon elküldött üzenet Discord webhookon keresztül jut el az Adatkezelőhöz. A harmadik országba történő továbbítás az Európai Bizottság megfelelőségi határozata, illetve általános szerződési feltételek (SCC) alapján történik.',
          'Tárhelyszolgáltató: [Tárhelyszolgáltató neve, címe] – a weboldal kiszolgálása.',
          'YouTube (Google Ireland Limited) – a videók a lejátszásra kattintás után töltődnek be, az adatvédelmi szempontból kíméletesebb youtube-nocookie.com tartományon keresztül.',
        ],
      },
      {
        h: '4. Sütik és külső erőforrások',
        p: [
          'A weboldal nem használ marketing- vagy analitikai sütiket. A böngésző helyi tárolóját kizárólag technikai célra (például az űrlap ismételt elküldését korlátozó időzítő) használjuk.',
          'Az oldal a betűtípusokat saját szerveréről szolgálja ki, így ezek betöltése során nem történik adattovábbítás harmadik félnek.',
        ],
      },
      {
        h: '5. Az érintettek jogai',
        list: [
          'Hozzáférés joga (GDPR 15. cikk)',
          'Helyesbítéshez való jog (16. cikk)',
          'Törléshez való jog – „elfeledtetéshez való jog” (17. cikk)',
          'Az adatkezelés korlátozásához való jog (18. cikk)',
          'Adathordozhatósághoz való jog (20. cikk)',
          'Tiltakozáshoz való jog (21. cikk)',
          `A hozzájárulás bármikor visszavonható a ${SITE.email} címen; a visszavonás nem érinti a korábbi adatkezelés jogszerűségét.`,
        ],
      },
      {
        h: '6. Jogorvoslati lehetőségek',
        p: [
          'Panasszal fordulhatsz a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH): 1055 Budapest, Falk Miksa utca 9–11.; levelezési cím: 1363 Budapest, Pf. 9.; e-mail: ugyfelszolgalat@naih.hu; honlap: https://naih.hu.',
          'Jogaid megsértése esetén bírósághoz is fordulhatsz; a per elbírálása a törvényszék hatáskörébe tartozik, és az érintett választása szerint a lakóhelye vagy tartózkodási helye szerinti törvényszék előtt is megindítható.',
        ],
      },
      {
        h: '7. A tájékoztató módosítása',
        p: ['Az Adatkezelő fenntartja a jogot a tájékoztató módosítására. A mindenkori hatályos változat ezen az oldalon érhető el.'],
      },
    ],
  },

  terms: {
    title: 'Általános Szerződési Feltételek (ÁSZF)',
    updated: '2026. október 3.',
    sections: [
      {
        h: '1. Általános rendelkezések',
        p: [
          `Jelen Általános Szerződési Feltételek a(z) https://${SITE.domain} weboldal (a továbbiakban: Weboldal) használatának feltételeit szabályozzák. A Weboldal üzemeltetője: ${OP}.`,
          'A Weboldal használatával a látogató elfogadja jelen feltételeket. Ha nem ért egyet velük, kérjük, ne használja a Weboldalt.',
        ],
      },
      {
        h: '2. A szolgáltatás tárgya',
        p: ['A Weboldal bemutatkozó és tájékoztató jellegű: a tartalomkészítő munkáit, közösségi felületeit és kapcsolatfelvételi lehetőségét mutatja be. A Weboldal használata ingyenes, a Weboldalon közvetlen értékesítés nem történik.'],
      },
      {
        h: '3. Felhasználási feltételek',
        list: [
          'A Weboldal kizárólag jogszerű célra használható.',
          'Tilos a Weboldal működését megzavarni, azt automatizált eszközökkel túlterhelni vagy jogosulatlanul hozzáférni a rendszerhez.',
          'A kapcsolati űrlapon csak valós, saját adat adható meg; jogsértő, sértő vagy kéretlen kereskedelmi tartalom küldése tilos.',
        ],
      },
      {
        h: '4. Szerzői jogok',
        p: [
          'A Weboldal tartalma (szövegek, grafikák, logók, videók, kialakítás) szerzői jogi védelem alatt áll a szerzői jogról szóló 1999. évi LXXVI. törvény szerint. A tartalmak az üzemeltető előzetes írásbeli engedélye nélkül nem másolhatók, nem terjeszthetők és nem hasznosíthatók, kivéve a jogszabály által megengedett szabad felhasználás eseteit.',
          'A megjelenő külső márkanevek és védjegyek a jogtulajdonosaik tulajdonát képezik.',
        ],
      },
      {
        h: '5. Felelősségkorlátozás',
        p: [
          'Az üzemeltető törekszik a tartalom pontosságára és a Weboldal folyamatos elérhetőségére, de ezekért nem vállal teljes körű garanciát. A Weboldal használatából eredő károkért – a jogszabály által nem korlátozható eseteket kivéve – az üzemeltető felelőssége kizárt.',
          'A Weboldal külső hivatkozásokat (pl. YouTube, Twitch, TikTok, Instagram, Discord, X) tartalmaz; ezek tartalmáért és adatkezeléséért az üzemeltető nem felel.',
        ],
      },
      {
        h: '6. Elektronikus kereskedelem',
        p: ['A Weboldal üzemeltetésére az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény rendelkezései irányadók.'],
      },
      {
        h: '7. Az ÁSZF módosítása',
        p: ['Az üzemeltető jogosult a jelen feltételeket egyoldalúan módosítani. A módosítások a Weboldalon történő közzététellel lépnek hatályba.'],
      },
      {
        h: '8. Irányadó jog és jogviták',
        p: ['Jelen feltételekre a magyar jog az irányadó. A jogviták rendezésére a felek elsősorban egyeztetést kezdeményeznek; ennek eredménytelensége esetén a magyar bíróságok illetékesek.'],
      },
    ],
  },

  imprint: {
    title: 'Impresszum',
    updated: '2026. október 3.',
    sections: [
      {
        h: 'Üzemeltető',
        rows: [
          ['Weboldal neve', 'niddi'],
          ['Domain', SITE.domain],
          ['Üzemeltető neve', OP],
          ['Székhely / cím', '[irányítószám, település, utca, házszám]'],
          ['Nyilvántartási szám / adószám', '[adószám vagy egyéni vállalkozói nyilvántartási szám]'],
          ['Kapcsolattartási e-mail', SITE.email],
        ],
      },
      {
        h: 'Tárhelyszolgáltató',
        rows: [
          ['Név', '[Tárhelyszolgáltató neve]'],
          ['Cím', '[Tárhelyszolgáltató címe]'],
          ['E-mail', '[tárhelyszolgáltató e-mail címe]'],
          ['Weboldal', '[https://tarhelyszolgaltato.hu]'],
        ],
      },
      {
        h: 'Adatvédelem és panaszkezelés',
        p: [
          `Adatvédelmi kérdésekben és panaszok esetén a ${SITE.email} címen állunk rendelkezésre. Részletek az Adatkezelési Tájékoztatóban találhatók.`,
        ],
      },
    ],
  },
};

export const LEGAL_LIST = [
  { key: 'privacy', label: 'Adatkezelési Tájékoztató', hint: 'GDPR · személyes adatok kezelése' },
  { key: 'terms', label: 'Általános Szerződési Feltételek', hint: 'ÁSZF · a weboldal használata' },
  { key: 'imprint', label: 'Impresszum', hint: 'Üzemeltető és tárhely adatai' },
];
