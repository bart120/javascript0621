import { Resource } from "./Resource";

const entityTypes = [
    'cardinal',
    'percent',
    'quantity',
    'money',
    'ordinal',
    'fac',
    'facility',
    'gpe',
    'language',
    'loc',
    'norp',
    'person',
    'org',
    'date',
    'time',
    'event',
    'product',
    'law',
    'work_of_art'
]

const fileName = 'long_fr_data';

let modal;

const display = (section, event) => {

    modal.show();
    if (event) {
        event.preventDefault();
    }

    if (!section) {
        section = 'entities';
    }

    if (section === "entities") {

        Resource.getContentEntities(fileName).then((content) => {
            document.getElementById("main-text").innerHTML = content;

            entityTypes.forEach(type => {
                const tab = Array.from(document.getElementsByClassName(type));
                //console.log(type, tab.length);
                const input = document.getElementById(`input-${type}`);
                input.nextElementSibling.textContent = `${type} (${tab.length})`;
                if (tab.length == 0) {
                    input.disabled = true;
                    input.checked = false;
                } else {
                    input.disabled = false;
                    input.checked = true;
                    tab.forEach(item => {
                        item.classList.add("active");
                    });
                }
            });
            modal.hide();
        });
    } else if (section === "rtd") {

        Resource.getContentRtd(fileName).then((content) => {
            document.getElementById("main-text").innerHTML = content;
            modal.hide();
        });
    }

    Array.from(document.getElementsByClassName("nav-link")).forEach(element => {
        element.classList.remove('active')
    });
    document.getElementById(`link-${section}`).classList.add('active');

    Array.from(document.getElementsByClassName("section")).forEach(element => {
        element.style.display = 'none';
    });
    document.getElementById(`section-${section}`).style.display = 'block';

}

const changeSwitch = (event) => {
    //console.log(event.target.id);
    //console.log(event.target.checked);
    const name = event.target.id.substring(6);
    if (event.target.checked) {
        Array.from(document.getElementsByClassName(name)).forEach(element => {
            element.classList.add('active');
        });
    } else {
        Array.from(document.getElementsByClassName(name)).forEach(element => {
            element.classList.remove('active');
        });
    }
}

let scroll = 0;
let lastScroll = '';
const scrollToElement = (event, direction) => {
    event.preventDefault();
    const name = event.target.id.substring(13);
    const tab = document.getElementsByClassName(name);
    console.log(scroll);
    if (lastScroll !== name) {
        lastScroll = name;
        scroll = 0;
    } else {
        if (direction === 'prev' && scroll > 0) {
            scroll--;
        } else if (direction === 'prev' && scroll === 0) {
            scroll = tab.length - 1;
        }

        if (direction === 'next' && scroll < tab.length - 1) {
            scroll++;
        } else if (direction === 'next' && scroll === tab.length - 1) {
            scroll = 0;
        }
    }
    console.log(scroll);
    const element = tab[scroll];
    if (element) {
        element.scrollIntoView();
    } else {
        scroll = 0;
    }

}


const init = () => {

    modal = new bootstrap.Modal(document.getElementById('wait'), {
        keyboard: false,
        backdrop: 'static'
    });



    document.getElementById("link-entities").addEventListener('click', (event) => { display('entities', event); });
    document.getElementById("link-rtd").addEventListener('click', (event) => { display('rtd', event); });

    const ul = document.getElementById("ul-section-entities");

    entityTypes.sort().forEach(item => {
        const aNext = document.createElement('a');
        aNext.id = `link-scrolln-${item}`;
        aNext.classList.add('btn');
        aNext.classList.add('btn-sm');
        aNext.textContent = '->';
        aNext.addEventListener('click', (event) => { scrollToElement(event, 'next') });

        const aPrev = document.createElement('a');
        aPrev.id = `link-scrollp-${item}`;
        aPrev.classList.add('btn');
        aPrev.classList.add('btn-sm');
        aPrev.textContent = '<-';
        aPrev.addEventListener('click', (event) => { scrollToElement(event, 'prev') });

        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.classList.add(`switch-${item}`);
        label.htmlFor = `input-${item}`;
        label.textContent = item;

        const input = document.createElement("input");
        input.classList.add("form-check-input");
        input.type = "checkbox";
        input.id = `input-${item}`;
        //input.checked = true;
        input.addEventListener('change', changeSwitch);

        const div = document.createElement("div");
        div.classList.add("form-check");
        div.classList.add("form-switch");
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(aPrev);
        div.appendChild(aNext);

        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.appendChild(div);

        ul.appendChild(li);
    });
    display('entities');

}

document.addEventListener('DOMContentLoaded', init);