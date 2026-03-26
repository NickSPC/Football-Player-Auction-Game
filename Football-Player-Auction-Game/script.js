const MIN_INCREMENT = 5;
let consecutivePasses = 0; 

const samplePlayers = [
    // Leyendas
    { name: 'Pelé', pos: 'Delantero', base: 60, img: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Pele_con_brasil_%28cropped%29.jpg' },
    { name: 'Diego Maradona', pos: 'Centrocampista', base: 55, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/330px-Maradona-Mundial_86_con_la_copa.JPG' },
    { name: 'Lionel Messi', pos: 'Delantero', base: 55, img: 'https://phantom-elmundo.unidadeditorial.es/8d6c90dde49bf93101f6ce0dcf98565c/resize/1200/f/jpg/assets/multimedia/imagenes/2022/12/19/16714678174157.jpg' },
    { name: 'Cristiano Ronaldo', pos: 'Delantero', base: 50, img: 'https://www.shutterstock.com/image-photo/leipzig-germany-june-18-2024-600nw-2480563319.jpg' },
    { name: 'Paolo Maldini', pos: 'Defensa', base: 38, img: 'https://footballmakeshistory.eu/wp-content/uploads/2022/12/Paolo-Maldini-585x775.jpg' },
    { name: 'Iker Casillas', pos: 'Portero', base: 28, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhhQjtoS23t8ce3q2NuxddAmWOAp-XzpDQxw&s' },
    { name: 'Gianluigi Buffon', pos: 'Portero', base: 30, img: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/EFBA/production/_95307316_gettyimages-473188312.jpg.webp' },
    { name: 'Zinedine Zidane', pos: 'Centrocampista', base: 45, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdTkgPqFfnmNDrzqXZaeUIAwtnjuxyDqVpeg&s' },
    { name: 'Ronaldinho', pos: 'Delantero', base: 42, img: 'https://assets.goal.com/images/v3/bltbb4f0acadc12a3eb/b49b1ff92300a66a3adc1fab39e8bca60bca5918.jpg?auto=webp&format=pjpg&width=3840&quality=60' },
    { name: 'Thierry Henry', pos: 'Delantero', base: 40, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlTg6kxZXVvU7PsnQwC9DcpIsK2WrZCs0GA&s' },
    { name: 'Johan Cruyff', pos: 'Centrocampista', base: 50, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSmXzq8CZ-OheoGqmvNLSFZccwJjc49Bgu2g&s' },
    { name: 'Franz Beckenbauer', pos: 'Defensa', base: 42, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6F0sldLnFbweQPtl2-sC7AEEnXJoNR4ILvw&s' },
    { name: 'Paolo Rossi', pos: 'Delantero', base: 35, img: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Paolo_Rossi_at_the_1982_FIFA_World_Cup.jpg' },
    { name: 'Andrea Pirlo', pos: 'Centrocampista', base: 40, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDzEz3oUxzNc1UNgZ8uSvOptJSpyyHUIMqfg&s' },
    { name: 'Sergio Ramos', pos: 'Defensa', base: 45, img: 'https://assets.goal.com/images/v3/blte3a1144221f24e2/e1bcc3a821bfff285d68586b8ae436ffc75b5f95.jpg?auto=webp&format=pjpg&width=3840&quality=60' },
    { name: 'Manuel Neuer', pos: 'Portero', base: 35, img: 'https://i.pinimg.com/736x/72/b4/77/72b477150d9bdb8c5f9d313c6ac3d85a.jpg' },
    { name: 'Xavi Hernández', pos: 'Centrocampista', base: 40, img: 'https://thumbs.dreamstime.com/b/xavi-hern%C3%A1ndez-de-barcelona-16187434.jpg' },
    { name: 'Andrés Iniesta', pos: 'Centrocampista', base: 42, img: 'https://www.fcbarcelona.com/photo-resources/2019/03/29/d626d1f9-bc41-436d-8840-b7825185200c/fmkRGsYS.jpg?width=1200&height=750' },
    { name: 'Roberto Carlos', pos: 'Defensa', base: 36, img: 'https://tn.com.ar/resizer/v2/el-exlateral-izquierdo-roberto-carlos-salio-campeon-del-mundo-con-brasil-en-2022-foto-reuterssergio-moraes-VFPGXWHHSL5LH5FO3LWJWFWM6E.jpg' },
    { name: 'Carlos Puyol', pos: 'Defensa', base: 37, img: 'https://media.gettyimages.com/id/87215316/es/foto/valencia-spain-carles-puyol-of-barcelona-looks-on-before-the-copa-del-rey-final-match-between.jpg?s=612x612&w=gi&k=20&c=9cK85rkVSdbXFAsxh6Z1s2aTX3EiEbF2kanr7rcrFCw=' },
    { name: 'George Best', pos: 'Delantero', base: 47, img: 'https://assets.manutd.com/AssetPicker/images/0/0/10/126/687734/Legends-Profile_George-Best1523521862880.jpg' },
    { name: 'Alfredo Di Stéfano', pos: 'Delantero', base: 52, img: 'https://images.ecestaticos.com/WXZLQMCVkx7qWAVRFsHqAsT1y7s=/0x0:1200x670/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F535%2F7c0%2F58c%2F5357c058c81464876d8c297b59e08cf9.jpg' },

    // Jugadores actuales 
    { name: 'Kylian Mbappé', pos: 'Delantero', base: 65, img: 'https://assets-es.imgfoot.com/media/cache/642x382/mbappem.jpg' },
    { name: 'Erling Haaland', pos: 'Delantero', base: 65, img: 'https://www.reuters.com/resizer/v2/3JXVY4LNLJPVNKBBF7QNXIFZOA.jpg?auth=f04927057c872379c74902db033c88d57861599a46dde0035943cad41cdf80f5&width=4606&quality=80' },
    { name: 'Kevin De Bruyne', pos: 'Centrocampista', base: 60, img: 'https://s.hs-data.com/bilder/spieler/gross/142263.jpg' },
    { name: 'Vinícius Jr.', pos: 'Delantero', base: 58, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI4Lu34wIhI1a8D9K3SxhizHhnL9KWGpX-hQ&s' },
    { name: 'Jude Bellingham', pos: 'Centrocampista', base: 57, img: 'https://assets.bundesliga.com/contender/2024/4/imago1034602594h.jpg?crop=0px,234px,4500px,2531px&fit=1200,675' },
    { name: 'Phil Foden', pos: 'Centrocampista', base: 55, img: 'https://www.planetsport.com/image-library/land/1200/1347648_phil-foden-manchester-city-apr24.webp' },
    { name: 'Alisson Becker', pos: 'Portero', base: 52, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBvwuTwzu9ZbdboVy6_aokJm_wlFI8qJcEfA&s' },
    { name: 'Thibaut Courtois', pos: 'Portero', base: 54, img: 'https://assets.goal.com/images/v3/blte34ffa77834129b9/311d5702a20515af3907f0add1d2fa4d46a1e1bd.jpg' },
    { name: 'Trent Alexander-Arnold', pos: 'Defensa', base: 55, img: 'https://www.defensacentral.com/uploads/s1/43/65/69/6/trent-alexander-arnold-realmadrid-partido.jpeg' },
    { name: 'Joshua Kimmich', pos: 'Centrocampista', base: 55, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vgV4teK3e9P1kPOKgKBrxv8aeEHZAQgpUw&s' },
    { name: 'Rúben Dias', pos: 'Defensa', base: 53, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWYL5_l9Yc53QsyNbu99dYe4S-Lhz1YJj6A&s' },
    { name: 'Robert Lewandowski', pos: 'Delantero', base: 60, img: 'https://assets-es.imgfoot.com/media/cache/1200x1200/robert-lewandowski-2425-67ac48cb24e16.jpg' },
    { name: 'Karim Benzema', pos: 'Delantero', base: 58, img: 'https://s.hs-data.com/bilder/spieler/gross/29566.jpg?fallback=png' },
    { name: 'Luka Modric', pos: 'Centrocampista', base: 54, img: 'https://fotos.perfil.com/2025/05/22/trim/720/410/luka-modric-2028058.jpg' },
    { name: 'Alphonso Davies', pos: 'Defensa', base: 50, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Alphonso_Davies_-_cropped.jpg/250px-Alphonso_Davies_-_cropped.jpg' },
    { name: 'Pedri', pos: 'Centrocampista', base: 53, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ6AtXWbHTsQymgEc-GMZkgCpjJT198MTdlg&s' }
];

// === Estado ===
let players = [], teams = [], currentIndex = 0, currentBid = 0, currentBidder = null;
let roundNumber = 0, activeBidders = [], turn = 0;

// === DOM ===
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const exportCSVBtn = document.getElementById('exportCSVBtn');
const teamsContainer = document.getElementById('teamsContainer');
const playerName = document.getElementById('playerName');
const playerMeta = document.getElementById('playerMeta');
const bidAmount = document.getElementById('bidAmount');
const bidBtn = document.getElementById('bidBtn');
const passBtn = document.getElementById('passBtn');
const historyEl = document.getElementById('history');
const currentBidEl = document.getElementById('currentBid');
const currentBidderEl = document.getElementById('currentBidder');
const roundLabel = document.getElementById('roundLabel');
const showFieldBtn = document.getElementById('showFieldBtn');
const fieldModal = document.getElementById('fieldModal');
const closeModal = document.getElementById('closeModal');
const initialBudgetInput = document.getElementById('initialBudget');
const turnIndicator = document.getElementById('turnIndicator');
const silhouette = document.getElementById('playerImg');

// === Utilidades ===
function M(x) { return x + ' M€'; }
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a; }
function showToast(msg, type = 'info') {
    const t = document.createElement('div');
    t.textContent = msg;
    t.className = `toast ${type}`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}

// === Inicialización ===
function initGame() {
    const initialBudget = Number(initialBudgetInput.value) || 300;
    teams = [
        { name: 'Jugador 1', budget: initialBudget, roster: [], human: true },
        { name: 'Jugador 2', budget: initialBudget, roster: [], human: true }
    ];
    players = shuffle(samplePlayers.slice());
    currentIndex = 0; roundNumber = 0; currentBid = 0; currentBidder = null; activeBidders = []; turn = 0;
    renderTeams();
    resetRoundUI();
}

function resetRoundUI() {
    playerName.textContent = '-';
    playerMeta.textContent = 'Posición · Valor base';
    currentBidEl.textContent = '-';
    currentBidderEl.textContent = '-';
    historyEl.innerHTML = '';
    roundLabel.textContent = '-';
    turnIndicator.textContent = 'Turno: -';
    silhouette.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
        <path d="M4 22s1-4 8-4 8 4 8 4"/>
        <path d="M7 13c.5-1.5 3-2 5-2s4.5.5 5 2"/>
    </svg>`;
}

// === Render equipos ===
function renderTeams() {
    teamsContainer.innerHTML = '';
    const initialBudget = Number(initialBudgetInput.value) || 300;
    teams.forEach(t => {
        const div = document.createElement('div');
        div.className = 'team-card';
        const rosterList = t.roster.map(r => `${r.name} (${r.pos}) - ${M(r.price)}`).join('<br>');
        div.innerHTML = `<strong>${t.name}</strong><br>Presupuesto: ${M(t.budget)}<br>
            <div style="margin-top:6px" class="small">${rosterList || '(sin jugadores)'}</div>`;
        const progress = Math.max(0, (t.budget / initialBudget) * 100);
        div.innerHTML += `<div class="team-progress" style="width:${progress}%"></div>`;
        teamsContainer.appendChild(div);
    });
}

// === Flujo subasta ===
function nextPlayer() {
    if (currentIndex >= players.length) {
        showToast('¡Subasta finalizada!', 'success');
        renderField();
        fieldModal.style.display = 'flex';
        return;
    }

    roundNumber++;
    const p = players[currentIndex];
    playerName.textContent = '?';
    playerMeta.textContent = `${p.pos} · Valor base ${M(p.base)}`;
    roundLabel.textContent = roundNumber;
    activeBidders = [0, 1];
    currentBid = p.base;
    currentBidder = null;
    currentBidEl.textContent = M(currentBid);
    currentBidderEl.textContent = '-';
    turn = 0;

    consecutivePasses = 0;   

    showTurn();
    renderTeams();
}


function showTurn() {
    if (activeBidders.length <= 1) {
        concludeRound();
        return;
    }
    turn = activeBidders.find(i => i >= turn) ?? activeBidders[0];
    const name = teams[turn].name;
    turnIndicator.textContent = 'Turno: ' + name;
    historyEl.innerHTML += `<div class='info'><em>Turno de ${name}</em></div>`;
    historyEl.scrollTop = historyEl.scrollHeight;
}

// === Pujar y pasar ===
function humanBid() {
    const teamIndex = turn;
    const amount = Number(bidAmount.value);

    if (!amount || amount < currentBid + MIN_INCREMENT) {
        showToast('Oferta inválida', 'error');
        return;
    }
    if (amount > teams[teamIndex].budget) {
        showToast('Presupuesto insuficiente', 'error');
        return;
    }

    currentBid = amount;
    currentBidder = teamIndex;
    currentBidEl.textContent = M(currentBid);
    currentBidderEl.textContent = teams[teamIndex].name;
    historyEl.innerHTML += `<div class='bid'><strong>${teams[teamIndex].name}</strong> puja ${M(amount)}</div>`;
    historyEl.scrollTop = historyEl.scrollHeight;

    consecutivePasses = 0; // 🔑 se reinicia porque hubo puja

    const next = activeBidders.find(i => i !== teamIndex);
    turn = next ?? teamIndex;
    showTurn();
}


function humanPass() {
    const teamIndex = turn;
    historyEl.innerHTML += `<div class='pass'>${teams[teamIndex].name} pasa</div>`;
    historyEl.scrollTop = historyEl.scrollHeight;

    if (currentBidder !== null && teamIndex !== currentBidder) {
        concludeRound();
        return;
    }

    consecutivePasses++;

    if (consecutivePasses >= teams.length) {
        concludeRound();
        return;
    }

    const next = activeBidders.find(i => i !== teamIndex);
    if (next !== undefined) {
        turn = next;
        showTurn();
    }
}



// === Concluir ronda ===
function concludeRound() {
    const p = players[currentIndex];
    if (currentBidder === null) {
        historyEl.innerHTML += `<div class='info'>Nadie compró a ${p.pos}</div>`;
        currentIndex++; setTimeout(nextPlayer, 500);
        return;
    }
    const winner = teams[currentBidder];
    winner.roster.push({ ...p, price: currentBid });
    winner.budget -= currentBid;
    showToast(`${winner.name} ficha a ${p.name} por ${M(currentBid)}`, 'success');
    silhouette.innerHTML = `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px">`;
    playerName.textContent = p.name;
    playerName.classList.add("highlight");
    setTimeout(() => playerName.classList.remove("highlight"), 2000);
    renderTeams();
    currentIndex++;
    setTimeout(nextPlayer, 2000);
}

// === Render cancha sin repetir jugadores ===
function renderField() {
    const f1 = document.getElementById('field1');
    const f2 = document.getElementById('field2');
    f1.innerHTML = `<h3>${teams[0].name}</h3>`;
    f2.innerHTML = `<h3>${teams[1].name}</h3>`;

    const positions = ['Portero', 'Defensa', 'Defensa', 'Defensa', 'Defensa', 'Centrocampista', 'Centrocampista', 'Centrocampista', 'Delantero', 'Delantero', 'Delantero'];

    teams.forEach((t, i) => {
        const container = i === 0 ? f1 : f2;
        const used = new Set();
        positions.forEach(pos => {
            const slot = document.createElement('div');
            slot.className = 'slot';
            const found = t.roster.find(r => r.pos === pos && !used.has(r.name));
            if (found) {
                slot.innerHTML = `<img src="${found.img}" alt="${found.name}"> ${found.name}`;
                used.add(found.name);
            } else slot.textContent = pos;
            container.appendChild(slot);
        });
    });
}

// === Exportar ===
function exportData(asCSV = false) {
    if (asCSV) {
        let rows = [["Equipo", "Jugador", "Posición", "Precio"]];
        teams.forEach(t => t.roster.forEach(r => rows.push([t.name, r.name, r.pos, r.price])));
        const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'equipos.csv'; a.click();
    } else {
        const data = JSON.stringify(teams, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'equipos.json'; a.click();
    }
}

// === Listeners ===
startBtn.onclick = () => { initGame(); nextPlayer(); };
resetBtn.onclick = () => { initGame(); };
exportBtn.onclick = () => exportData(false);
exportCSVBtn.onclick = () => exportData(true);
bidBtn.onclick = humanBid;
passBtn.onclick = humanPass;
showFieldBtn.onclick = () => { renderField(); fieldModal.style.display = 'flex'; };
closeModal.onclick = () => { fieldModal.style.display = 'none'; };