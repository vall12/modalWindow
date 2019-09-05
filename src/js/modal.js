const MODAL_SELECTOR = '#modal';

const BOX_SELECTOR = '.modal__front';
const TOP_SELECTOR = '.modal__top';
const MIDDlE_SELECTOR = '.modal__content';
const BOTTOM_SELECTOR = '.modal__bottom';
const CLOSE_SELECTOR = '.modal, .modal__close';

const SHOW_CLASS = 'js-shown';
const HIDDEN_CLASS = 'js-hidden';

const TOP_TEMPLATE = "<div class=\"modal__top\"></div>";
const BOTTOM_TEMPLATE = "<div class=\"modal__bottom\"></div>";

// ###### POLIFILL
require("./element.matches.polifill");


// ###### HELPER FUNCTIONS

function show(el) {
    let cls = el.classList;
    cls.add(SHOW_CLASS);
    cls.remove(HIDDEN_CLASS);
}

function hide(el) {
    let cls = el.classList;
    cls.remove(SHOW_CLASS);
    cls.add(HIDDEN_CLASS);
}

function inject(el, html) {
    while (el.hasChildNodes()) {
        el.removeChild(el.firstChild);
    }
    if (html instanceof Node) {
        el.append(html);
    }
    if (typeof html === 'string') {
        el.insertAdjacentHTML("afterbegin", html);
    }
}

// ######  GLOBAL PARAMS AND FLAGS
let modalEl = null; // modal element instance
let modalObj = null; // Object of class Modal
let isCloseListening = false; //flag indicates is close listening started

// ###### CLASS
class Modal {
    constructor(el) {
        if (!el) {
            throw new Error('modal window element is not found with selector ' + MODAL_SELECTOR);
        }
        this.el = el;
        this.titleText = '';
        this.bottomHtml = '';
        this.listenCloseClick();

    }

    listenCloseClick() {
        if (!isCloseListening) {
            document.addEventListener('click', function (click) {
                if (click.target.matches(CLOSE_SELECTOR)) {
                    modal().hide()
                }
            });
            isCloseListening = true;
        }
    }

    get boxEl() {
        return this.el.querySelector(BOX_SELECTOR);
    }

    get topEl() {
        return this.el.querySelector(TOP_SELECTOR);
    }

    get middleEl() {
        return this.el.querySelector(MIDDlE_SELECTOR);
    }

    get bottomEl() {
        return this.el.querySelector(BOTTOM_SELECTOR);
    }

    createTop() {
        if (!this.topEl) {
            this.boxEl.insertAdjacentHTML('afterbegin', TOP_TEMPLATE);
            this.hideTop();
        }
        return this;
    }

    createBottom() {
        if (!this.bottomEl) {
            this.boxEl.insertAdjacentHTML('beforeend', BOTTOM_TEMPLATE);
            this.hideBottom();
        }
        return this;
    }

    showTop() {
        this.createTop();
        show(this.topEl);
        return this;
    }

    showBottom() {
        this.createBottom();
        show(this.bottomEl);
        return this;
    }


    hideTop() {
        if (this.topEl) {
            hide(this.topEl);
        }
        return this;
    }


    hideBottom() {
        if (this.bottomEl) {
            hide(this.bottomEl);
        }
        return this;
    }

    show() {
        show(this.el);
        return this;
    }


    hide() {
        hide(this.el);
        return this;
    }

    setTitle(text) {
        this.titleText = text;
        let titleEl = this.topEl;
        if (!titleEl) {
            this.createTop();
            titleEl = this.topEl;
        }
        titleEl.innerText = this.titleText;
        return this;
    }

    injectBottom(html) {
        this.createBottom();
        inject(this.bottomEl, html);
        return this;
    }

    injectContent(html) {
        inject(this.middleEl, html);
        return this;
    }
}
function modal() {
    if (!modalObj) {
        modalEl = document.querySelector(MODAL_SELECTOR);
        if (!modalEl) {
            throw new Error('modal window element is not found with selector ' + selector);
        }
        modalObj = new Modal(modalEl);
    }
    return modalObj;
}

document.addEventListener('DOMContentLoaded',()=>{
    modal();
});


module.exports = {modal, Modal};

// document.addEventListener('DOMContentLoaded', function () {
//     let mod = modal();
//     mod.show()
//         .setTitle("Привет")
//         .showTop()
//         .hideTop()
//         .showTop()
//         .setTitle('Привет, привет!')
//         .injectBottom("<ul><li>1</li><li>2</li><li>3</li></ul>")
//         .injectBottom('text')
//         .injectBottom('<h2>Заголовок</h2>')
//         .showBottom()
//         .hide()
//         .show()
//         .injectContent('<h1>hkjlkj</h1>')
//         .injectContent(
//             document.createDocumentFragment('div')
//                 .appendChild(document.createTextNode("ntcn")
//                 ))
//     ;
//
// });




