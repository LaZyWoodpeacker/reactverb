class UI {
    constructor() {
        this.backdrop = document.getElementById('backdrop');
        this.frag = document.getElementById('frag');
        this.antwort = document.getElementById('antwort');
        this.stat = document.getElementById('stat');
        this.wnd = document.getElementById('game_wnd');
        this.game = [];
    }

    back(show, text = 'Loading') {
        if (show) {
            this.backdrop.classList.add('backdrop--visible');
        } else {
            this.backdrop.classList.remove('backdrop--visible');
        }
    }

    drawMenu() {
        this.wnd.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('game_menu');
        const newGameBtn = document.createElement('button');
        newGameBtn.innerText = 'НОВЫЙ ТЕСТ'
        newGameBtn.addEventListener('click', e => {
            this.drawGame()
        })
        div.appendChild(newGameBtn);
        this.wnd.appendChild(div);
    }

    drawGame() {
        this.wnd.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('game_test');
        const ui = this;
        ui.new();
        ui.em = ui.next();
        this.stat = document.createElement('div');
        this.frag = document.createElement('div');
        div.appendChild(this.stat);
        div.appendChild(this.frag);
        this.fragblock = document.createElement('div');
        for (let i = 0; i < 4; i++) {
            const testBtn = document.createElement('button');
            testBtn.classList.add('game_test__btn');
            testBtn.addEventListener('click', function () {
                if (ui.em.pris.toUpperCase() === this.innerText.toUpperCase()) {
                    if (ui.game.length) {
                        ui.em = ui.next();
                        ui.redrawFrags();
                    } else {
                        ui.drawScore();
                    }
                } else {
                    ui.wrong(ui.em.id)
                    ui.em = ui.next();
                    ui.redrawFrags();
                }
            })
            this.fragblock.appendChild(testBtn);
        }
        div.appendChild(this.fragblock);
        ui.redrawFrags();
        // draw score temporary
        const endGameBtn = document.createElement('button');
        endGameBtn.innerText = 'endgame';
        endGameBtn.addEventListener('click', e => {
            this.drawScore()
        })
        div.appendChild(endGameBtn);
        // 
        this.wnd.appendChild(div);
    }

    redrawFrags() {
        this.stat.innerText = `${this.em.pris} ${this.turn} ${this.game.length + 1}`
        this.frag.innerHTML = `${this.em.frag} <span style="color:red">____</span>`;
        [...this.fragblock.children].forEach((e, i) => {
            e.innerText = this.em.frags[i]
        })
    }

    drawScore() {
        this.wnd.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('score');
        div.innerText = 'test'
        const newGameBtn = document.createElement('button');
        newGameBtn.innerText = 'НОВЫЙ ТЕСТ'
        newGameBtn.addEventListener('click', e => {
            this.drawGame()
        })
        div.appendChild(newGameBtn);
        this.wnd.appendChild(div);
    }

    setData(data) {
        this.data = data;
    }

    new() {
        this.game = new Array(this.data.length).fill(0).map((e, i) => i).sort(() => .5 - Math.random());
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
            ui.setData(r);
            ui.drawGame();
            // ui.drawMenu();
        })
        .finally(e => ui.back(false))
})