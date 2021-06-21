"use strict"

export class Mortgage {
    constructor(principal, years, rate) {
        //console.log(principal);
        this.principal = principal;
        this.years = years;
        this.rate = rate;
    }

    calculateMonthlyPayment() {
        let monthlyRate = 0;
        if (this.rate) {
            monthlyRate = this.rate / 100 / 12;
        }

        let monthlyPayment = this.principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), this.years * 12)));

        return { monthlyRate, monthlyPayment }
    }

    calculateAmortization() {
        let mp = this.calculateMonthlyPayment();
        let balance = this.principal;
        //let amortization = new Array();
        let amortization = [];
        for (let y = 0; y < this.years; y++) {
            let interestY = 0;
            let principalY = 0;
            for (let m = 0; m < 12; m++) {
                const interestM = balance * mp.monthlyRate;
                const principalM = mp.monthlyPayment - interestM;
                interestY += interestM;
                principalY += principalM;
                balance -= principalM;
            }
            amortization.push({ principalY, interestY, balance });

        }
        return { monthlyPayment: mp.monthlyPayment, monthlyRate: mp.monthlyRate, amortization };

    }
}