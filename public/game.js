class UI {
    constructor() {
        this.backdrop = document.getElementById('backdrop');
        this.frag = document.getElementById('frag');
        this.antwort = document.getElementById('antwort');
        this.stat = document.getElementById('stat');
        this.game = [];
    }

    back(show, text = 'Loading') {
        if (show) {
            this.backdrop.classList.add('backdrop--visible');
        } else {
            this.backdrop.classList.remove('backdrop--visible');
        }
    }

    draw(em) {
        this.stat.innerText = em.quests;
        this.frag.innerText = em.frag;
        [...this.antwort.children].forEach((e, i) => {
            e.innerText = em.frags[i];
        })
    }
    new(data) {
        this.data = data;
        this.data = data;
        this.game = new Array(data.length).fill(0).map((e, i) => i).sort(() => .5 - Math.random());
        this.prists = new Set(this.data.map(e => e.pris));
        this.turn = 0;
    }
    next() {
        this.turn++;
        const id = this.game.shift();
        const curQuest = this.data[id];
        const frag = curQuest.frag.split(' ').slice(0, -1).join(' ');
        const pris = curQuest.pris;
        const frags = [...[...this.prists].filter(e => e !== pris).slice(2), pris].sort(() => .5 - Math.random());
        const quests = this.game.length + 1;
        return { id, frag, pris, frags, quests };
    }

    wrong(id) {
        this.game.push(id);
        this.game = this.game.sort(() => .5 - Math.random());
    }
}


window.addEventListener('load', () => {
    const ui = new UI();
    fetch('data.json')
        .then(r => r.json())
        .then(r => {
            ui.new(r);
            let em = ui.next();
            ui.draw(em);
            [...ui.antwort.children].forEach(e => {
                e.addEventListener('click', function () {
                    if (em.pris === this.innerText) {
                        if (!ui.game.length) {
                            console.log('end game:', ui.turn)
                        }
                        em = ui.next();
                        ui.draw(em);
                    } else {
                        ui.wrong(em.id)
                        em = ui.next();
                        ui.draw(em);
                    }
                })
            })
        })
        .finally(e => ui.back(false))
})