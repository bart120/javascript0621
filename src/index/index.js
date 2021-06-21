"use strict"
import { Mortgage } from '../services/mortgage';

const testNumber = (obj) => {
    const val = obj.value == '' ? '' : +obj.value;
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

const calculate = (event) => {
    event.preventDefault();
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

document.getElementById("formcal").addEventListener('keyup', calculate);
document.getElementById("formcal").addEventListener('change', calculate);
document.getElementById("formcal").addEventListener('submit', calculate);

