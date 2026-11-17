//PER RIPRISTINARE IL CALENDARIO DELL'AVVENTO, CANCELLARE I PACCHI APERTI DAL LOCALSTORAGE DEL BROWSER localStorage.clear() PREMENDO F12 E POI INCOLLARE IL CODICE SOPRA NELLA CONSOLE DEL BROWSER, POI RICARICARE LA PAGINA


const griglia = document.getElementById('griglia');
const overlay = document.getElementById('biglietto-overlay');
const btnChiudi = document.getElementById('chiudi-biglietto');
const elEtichetta = document.getElementById('biglietto-etichetta');
const elTitolo = document.getElementById('biglietto-titolo');
const elTesto = document.getElementById('biglietto-testo');

// bigliettino bloccato
const TITOLO_BLOCCATO = "Regalino bloccato🔒!";
const MESSAGGIO_BLOCCATO = `Questo regalino si apre solo il {giorno} Dicembre! Non fare la furbetta e la babbaaa! 🩵<br>
                            <img src="sticker.jpeg" class="sticker" alt="Sticker">
                            Ti osservo!`;

// Per personalizzare le sorprese
const sorprese = {
    1: "Buon 1° Dicembre Amore Mio🩵🩵! Oggi inizia il nostro conto alla rovescia...",

    2: `Guarda questa fotina di noi due!<br>
        <img src="foto2.jpeg" alt="Noi due">
        <br>PS: Sembriamo due allampati...`,
    
    3: `Ti volevo dedicare questa canzoncina, anche se la ascoltiamo spesso. In quanto mi rappresenta più di quanto potessi immaginare.<br>
        <audio controls src="audio.mp3"></audio>`,

    4: `Oggi Amore ti porta a fare una cosina che a me piace tantissimo e credo anche a te! Alle 17:30 ti verrò a prendere, quindi sii prontaaa! Faremo un bel giretto da "The Best" che ci sono le cose natalizieee!!<br>
        <img src="foto4.jpeg" alt="IOOOO">`,

    5: `E siamo a sabato, quanto ti verrò a prendere scoprirai il regalino 1/2 che ti spettaa!! Abbi pazienzaaa!<br>
        PS: Se vuoi un indizio, chiedii.`,

    6: `Oggi c'è un bel giochino da fare!<br>
        Clicca qui in basso!<br>
        <a href='https://puzzel.org/it/jigsaw/play?p=-P6PR_nk8gVKCn_GKDFG' target='_blank'>Gioca</a>`,

    7: `Buono Coccole/Massaggi. Da usare quando vuoi!<br>
        Per quando sei stanca o stressataa.🩵🩵🩵`,

    8: `Amore è già passato un giorno e mi manchi tanto tanto. Per colmare quel vuoto che si crea quando non ci sei, guardo sempre questa fotina e mi fa pensare quanto sia fortunato ad averti al mio fianco.<br><br>
        <img src="foto8.jpeg" alt="Noi due">`,

    9: `Ho tanti dubbi sul mio futuro, troppe domande su ciò che sarà domani.<br><br>
        Eppure, nel mare incerto della vita, sei l'ancora che mi tiene saldo.
        La bellezza del nostro legame è la bussola che mi guida nel mondo.<br><br>
        Non ho nessuna certezza in questa vita, a parte te.<br><br>
        Voglio amarti fino all'ultimo dei miei giorni.`,

    10: `La prima volta in cui abbiamo fatto
        la ninna insieme, mi sono sentito 
        così felice e al sicuro.<br><br>
        <img src="foto10.jpeg" alt="Noi due"></img>`,

    11: `Amore oggi abbiamo fatto 4 mesetti,
        mi sembra ieri che ci siamo conosciuti, 
        eppure sono già passati 4 mesi da quel giorno.<br><br>
        Oggi qualcosa di più particolare, <br>
        clicca qui in basso!<br>
        <a href="https://puzzel.org/it/acrostic/play?p=-P6PDL_UyWjK3XBtnQOe" target="_blank">Gioca</a>`,

    12: `Amore mio dirti grazie è poco lo sai, sei la cosa migliore che potesse capitarmi, sei la mia vita. Lo sappiamo entrambi che io da un pochino non sto vivendo un periodo facile, ma nonostante ciò tu sei sempre al mio fianco, e questo mi fa sentire il ragazzo più fortunato del mondo. Quando è iniziato tutto non pensavo di trovarmi così bene e legato con una persona, te lo dico sempre e sempre te lo dirò, non potevo chiedere di meglio! Proprio come dice Kid : "Lei invece è proprio solare, è splendente, mi illumina proprio mi fa cambiare. Cioè non lo so, non ho mai vissuto qualcosa che mi mettesse così tanto in serenità il cuore"<br><br> Ti a tantissimissimo 🩵🩵`, 

    13: `E si Amore, se te lo stessi chiedendo amo anche questa versione di teee!!<br><br>
        <img src="foto13.jpeg" alt="Babba"><br>
        PS: Non cancello mai nessuna fotina che ci facciamo o che ti faccio.`,

    14: `PAGELLA UFFICIALE 2026<br><br> 
        Finalmente il mio momento preferito, vediamo com'è andata la pagellina di questa bimba monellina.<br>
        <img src="pagella.png" alt="Pagellina"><br>
        Se vuoi sapere il perchè di questi votinii, chiedimelooo. `,

    15: `Amore mio, questo video l'ho fatto scattandoti una fotina, che volevi che eliminassi. Io ogni foto che ti faccio e magari pensi che sei venuta male, me la porterei in guerra.<br>
        <video controls playsinline src="video.mp4"></video><br>` ,

    16: `PROMEMORIA PER NOI DUE <br><br>
        Fai uno screenshot a questo bigliettino. La prossima volta che sei un po' giù o stressata, rileggilo:<br><br>
        "Qualunque cosa succeda, io sono sempre dalla tua parte e sono fiero di te tantissimo."<br>
        Ti a tantissimissimo bimba mia! 🩵 `,

    17: `Questo è il disegnino che ha fatto la mia bimba, bellissimissimo. <br>
        Spero tanto che si avveriii!!<br><br>
        <img src="foto17.jpg">`,

    18: `GIRA LA RUOTA! <br><br>
        Oggi Amore vedremo quanta fortuna o sfortuna hai! Clicca qui sotto, gira la ruota e mandami lo screenshot di cosa ti è uscito! Non fare la furba!<br>
        <a href="https://wheelofnames.com/it/xvc-cjk" target="_blank">Gira la ruota</a>`,

    19: `Amore, eccoci qua, cosa possiamo fare per il 19 dicembre? Mhhh... fammi pensare un attimo...<br>
         Ecco, ho trovato! Appuntamento alle 19:00 stasera mangeremo una cosa che ti piace tantissimoo! Vediamo se indovinii... Scrivimi la risposta su WhatsApp!<br>
         PS: Se ancora non sei scesa lo recuperemo successivamente `,

    20: `Amore mio, o meglio moglie mia, si siamo già sposati. Solo che un giorno verrà festeggiato questo evento bellissimissimo, sinceramente non vedo l'ora!!<br><br>
        <img src="foto20.jpeg" alt="Noi due">`,

    21: `Amore mio, ho pensato di fare quuesto breve video in cui sono raccolte alcune fotine e alcuni video di noi due, spero che ti piaccia!<br>
        <video controls playsinline src="video2.mp4"></video><br>`,

    22: `Oggi è il 22 dicembree, ormai diventato il mio giorno preferito...Perchè? Perchè è il giorno in cui è nata la mia bimba stupenda.<br><br>
        Ti a tantissimissimo!🩵<br><br>
        <img src="foto22.jpeg" alt="Noi due">`,

    23: `Eccoci qua Amore ora siamo arrivati al 23 dicembre, non vedo l'ora di festeggiare il nostro primo Natale insieme, e spero che sia il primo di tanti altriii!! Comunque, stasera usciamooo, e scoprirai il secondo regalino 2/2 che ti spettaa!!`,

    24: `Buona Vigilia di Natale Amore Mio🩵! Ecco l'ultimo regalo...<br> 
        Domani ti aspetta un'altro regalo o altri, chi lo sa!👀`
};

// funzione bigliettino
function mostraBiglietto(etichetta, titolo, testo) {
    elEtichetta.textContent = etichetta;
    elTitolo.textContent = titolo;
    elTesto.innerHTML = testo; // <-- Usa innerHTML per supportare foto, link e <br>
    overlay.classList.add('visibile');
}

// chiusura cartellino (con la X o cliccando fuori)
function chiudiBiglietto() {
    overlay.classList.remove('visibile');
    // Ferma eventuali audio in riproduzione dentro il biglietto
    const audioAttivo = elTesto.querySelector('audio');
    if (audioAttivo) {
        audioAttivo.pause();
        audioAttivo.currentTime = 0;
    }
    const mediaAttivo = elTesto.querySelector('audio, video');
    if (mediaAttivo) {
        mediaAttivo.pause();
        mediaAttivo.currentTime = 0;
    }
}

btnChiudi.addEventListener('click', chiudiBiglietto);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) chiudiBiglietto();
});

// recupera i pacchi già aperti in precedenza
const pacchiAperti = JSON.parse(localStorage.getItem('pacchiAperti2026')) || [];

for (let i = 1; i < 25; i++) {
    const casella = document.createElement('div');
    casella.classList.add('casella');

    if (pacchiAperti.includes(i)) {
        casella.classList.add('aperta');
    }
    
    casella.innerHTML = `
      <span class="fiocco">
        <svg viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rasoRosso3D-${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff5c67"/>
              <stop offset="40%" stop-color="#d82531"/>
              <stop offset="70%" stop-color="#b01620"/>
              <stop offset="100%" stop-color="#73090f"/>
            </linearGradient>
          </defs>

          <!-- Code leggermente più larghe e morbide -->
          <path d="M 59 38 Q 27 52 20 86 L 39 76 L 54 88 Q 57 60 68 40 Z" fill="url(#rasoRosso3D-${i})" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))"/>
          <path d="M 81 38 Q 113 52 120 86 L 101 76 L 86 88 Q 83 60 72 40 Z" fill="url(#rasoRosso3D-${i})" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))"/>

          <!-- Asola sinistra più spessa (foro interno più stretto) -->
          <path d="M 64 25 C 34 -7, 0 2, 12 37 C 21 52, 48 44, 64 35 C 45 36, 26 35, 25 28 C 24 21, 45 22, 64 30 Z" fill="url(#rasoRosso3D-${i})"/>

          <!-- Asola destra più spessa (foro interno più stretto) -->
          <path d="M 76 25 C 106 -7, 140 2, 128 37 C 119 52, 92 44, 76 35 C 95 36, 114 35, 115 28 C 116 21, 95 22, 76 30 Z" fill="url(#rasoRosso3D-${i})"/>

          <!-- Nodo centrale leggermente più pieno -->
          <rect x="57" y="19" width="26" height="24" rx="8" fill="url(#rasoRosso3D-${i})" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.15))"/>
        </svg>
      </span>
      <span class="numero">${i}</span>
    `;

    casella.dataset.giorno = i;

    // Gestione del clic sul pacco
    casella.addEventListener('click', () => {
        const oggi = new Date();
        //const oggi = new Date(2026, 11, 24);
        const anno = oggi.getFullYear();
        const mese = oggi.getMonth(); // In JS: 10 = Novembre, 11 = Dicembre
        const giornoDelMese = oggi.getDate();

        // Sblocca regalini solo se è il giorno giusto o successivo
        const sbloccato = (anno > 2026) || (anno === 2026 && mese === 11 && giornoDelMese >= i);

        if (!sbloccato) {
            const testoPersonalizzato = MESSAGGIO_BLOCCATO.replace('{giorno}', i);
            mostraBiglietto(`${i} Dicembre`, TITOLO_BLOCCATO, testoPersonalizzato);
            return;
        }

        // Se è il giorno giusto: apre il pacco e mostra la sorpresa
        casella.classList.add('aperta');
        if (!pacchiAperti.includes(i)) {
            pacchiAperti.push(i);
            localStorage.setItem('pacchiAperti2026', JSON.stringify(pacchiAperti));
        }

        mostraBiglietto(
            `${i} Dicembre 2026`,
            `Sorpresa del giorno ${i}`,
            sorprese[i] || "Buon Natale amore mio!"
        );
    });

    griglia.appendChild(casella);
}