class UI {
    constructor() {
        this.backdrop = document.getElementById('backdrop');
        this.wnd = document.getElementById('game_wnd');
        this.game = [];
        this.wrong_antwort = 0;
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
        const newGameBtn = document.createElement('div');
        newGameBtn.classList.add('fragblock__btn');
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
        this.stat.classList.add('stat')

        this.frag = document.createElement('div');
        this.frag.classList.add('frag')
        this.frag_text = document.createElement('p');
        this.frag_text.classList.add('frag_text')
        this.frag.appendChild(this.frag_text);

        this.frag_verb = document.createElement('p');
        this.frag_verb.classList.add('frag_verb')
        this.frag.appendChild(this.frag_verb);

        this.frag_text = document.createElement('p');
        this.frag_text.classList.add('frag_text')
        this.frag.appendChild(this.frag_text);

        this.frag_trans = document.createElement('p');
        this.frag_trans.classList.add('frag_trans')
        this.frag.appendChild(this.frag_trans);

        div.appendChild(this.stat);
        div.appendChild(this.frag);
        this.fragblock = document.createElement('div');
        this.fragblock.classList.add('fragblock');
        for (let i = 0; i < 4; i++) {
            const testBtn = document.createElement('div');
            testBtn.classList.add('fragblock__btn');
            testBtn.addEventListener('click', function () {
                if (ui.em.pris.toUpperCase() === this.innerText.toUpperCase()) {
                    if (ui.game.length) {
                        ui.em = ui.next();
                        ui.redrawFrags();
                    } else {
                        ui.drawScore();
                    }
                } else {
                    ui.wrong(ui.em.id);
                    ui.wrong_antwort++;
                    ui.em = ui.next();
                    ui.redrawFrags();
                }
            })
            this.fragblock.appendChild(testBtn);
        }
        div.appendChild(this.fragblock);
        ui.redrawFrags();
        // draw score temporary
        // const endGameBtn = document.createElement('button');
        // endGameBtn.innerText = 'endgame';
        // endGameBtn.addEventListener('click', e => {
        //     this.drawScore()
        // })
        // div.appendChild(endGameBtn);
        // 
        this.wnd.appendChild(div);
    }

    redrawFrags() {
        this.frag_verb.innerText = this.em.trans;
        this.frag_trans.innerText = this.em.transFrag;
        this.stat.innerText = `${this.em.pris} Вопрос ${this.all - this.game.length} из ${this.all} неправильных ${this.wrong_antwort}`;
        this.frag_text.innerHTML = `${this.em.frag} <span>????</span>`;
        [...this.fragblock.children].forEach((e, i) => {
            e.innerText = this.em.frags[i]
        })
    }

    drawScore() {
        this.wnd.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('score');
        div.innerHTML = `<h2>Неправильных ответов:${this.wrong_antwort}</h2>`;
        const newGameBtn = document.createElement('button');
        newGameBtn.classList.add('fragblock__btn');
        newGameBtn.innerText = 'НОВЫЙ ТЕСТ'
        newGameBtn.addEventListener('click', e => {
            this.drawGame();
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
        this.all = this.game.length;
    }

    next() {
        this.turn++;
        const id = this.game.shift();
        const curQuest = this.data[id];
        const frag = curQuest.frag.split(' ').slice(0, -1).join(' ');
        const pris = curQuest.pris;
        const trans = curQuest.trans;
        const transFrag = curQuest.transFrag;
        const frags = [...[...this.prists].filter(e => e !== pris).sort(() => .5 - Math.random()).slice(0, 3), pris].sort(() => .5 - Math.random());
        debugger
        const quests = this.game.length + 1;
        return { id, frag, pris, frags, quests, trans, transFrag };
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
            ui.drawMenu();
            // ui.drawGame();
            // ui.drawScore();
        })
        .finally(e => ui.back(false))
})