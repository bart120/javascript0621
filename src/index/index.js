"use strict"
import { Mortgage } from '../services/mortgage';
import { RateFinder } from '../services/rate-finder';

const testNumber = (obj) => {

    const val = obj.value == '' ? '' : +obj.value;
    /*if(obj.value == ''){
        val = '';
    }else{
        val = 0 + obj.value;
        val = +obj.value;
    }*/

    /*state = "nice" if is_nice else "not nice"
    state = is_nice ? "nice" : "not nice"*/

    console.log(val);
    if (Number.isNaN(val)) {
        obj.classList.add("is-invalid");
        obj.classList.remove("is-valid");
        return false;
    } else {
        obj.classList.add("is-valid");
        obj.classList.remove("is-invalid")
        return true;
    }
}

function calculate(event) {
    //const calculate = (event) => {
    if (event) { //test l'existance d'une variable
        event.preventDefault();
    }
    let principal = document.getElementById("principal");
    let years = document.getElementById("years");
    let rate = document.getElementById("rate");

    if (!testNumber(principal) || !testNumber(years) || !testNumber(rate))
        return;

    const mg = new Mortgage(principal.value, years.value, rate.value);
    let obj = mg.calculateAmortization();
    document.getElementById("monthlyPayment").innerHTML = Math.round(obj.monthlyPayment);
    //console.log(obj.amortization);

    let html = '';
    /*let i = 1;
    for (let item of obj.amortization) {
        html += `<tr><td>${i}</td><td>${Math.round(item.principalY)}</td><td>${Math.round(item.interestY)}</td><td>${Math.round(item.balance)}</td></tr>`;
        i++;
    }*/

    obj.amortization.forEach((item, i) => {
        html += `<tr><td>${i + 1}</td><td>${Math.round(item.principalY)}</td><td>${Math.round(item.interestY)}</td><td>${Math.round(item.balance)}</td></tr>`;
    });


    document.getElementById("tableMortgage").innerHTML = html;
    document.getElementById("display").style.display = 'block';
}

const toExecuteWhenDOMIsLoaded = () => {
    /*RateFinder.getRates().then((resp) => {
        resp.json().then((data) => {
            console.log('data', data);
            for (let item of data) {
                console.log(item.name);
            }
        })
    });*/

    RateFinder.getRates().then((data) => {
        const select = document.getElementById("rate");
        for (let item of data) {
            const option = document.createElement("option");
            option.value = item.rate;
            option.text = item.name;

            select.appendChild(option);
        }
    });

    document.getElementById("formcal").addEventListener('keyup', calculate);
    document.getElementById("formcal").addEventListener('change', calculate);
    document.getElementById("formcal").addEventListener('submit', calculate);
}

document.addEventListener('DOMContentLoaded', toExecuteWhenDOMIsLoaded);
//document.getElementById("rate")

