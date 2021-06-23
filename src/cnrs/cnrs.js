import { Resource } from "./Resource";

const entityTypes = [
    'event',
    'date',
    'cardinal',
    'fac'
]

const fileName = 'long_fr_data';

const display = (section) => {
    if (!section) {
        section = 'entities';
    }

    if (section === "entities") {
        Resource.getContentEntities(fileName).then((content) => {
            document.getElementById("main-text").innerHTML = content;
        });
    } else if (section === "rtd") {
        Resource.getContentRtd(fileName).then((content) => {
            document.getElementById("main-text").innerHTML = content;
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


const init = () => {

    display('entities');

    document.getElementById("link-entities").addEventListener('click', () => { display('entities'); });
    document.getElementById("link-rtd").addEventListener('click', () => { display('rtd'); });

    const ul = document.getElementById("ul-section-entities");

    entityTypes.sort().forEach(item => {
        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.classList.add(item);
        label.htmlFor = `input-${item}`;
        label.textContent = item;

        const input = document.createElement("input");
        input.classList.add("form-check-input");
        input.type = "checkbox";
        input.id = `input-${item}`;

        const div = document.createElement("div");
        div.classList.add("form-check");
        div.classList.add("form-switch");
        div.appendChild(input);
        div.appendChild(label);

        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.appendChild(div);

        ul.appendChild(li);
    });


}

document.addEventListener('DOMContentLoaded', init);