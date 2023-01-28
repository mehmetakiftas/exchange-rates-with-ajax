document.getElementById("changeButton").addEventListener("click", change);
document.getElementById("refreshButton").addEventListener("click", refresh);
let exchangeDiv = document.getElementById("exchangeDiv");
exchangeDiv.addEventListener("change", exchangeCheck);
let selectID = document.getElementById("selectID");
let tlID = document.getElementById("tl");


function change() {

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://v6.exchangerate-api.com/v6/3b70dc077ce3f7079efd7197/latest/TRY");

    xhr.onload = function () {
        if (this.status == 200) {
            const response = JSON.parse(this.responseText);

            if (document.getElementById("amountEUR")) {
                const rateEUR = response.conversion_rates.EUR;
                const amountEUR = Number(document.getElementById("amountEUR").value);
                const tlAmountforEUR = Number((amountEUR / rateEUR).toFixed(2));
                document.getElementById("tl").value = tlAmountforEUR;
            }
            else if (document.getElementById("amountUSD")) {
                const rateUSD = response.conversion_rates.USD;
                const amountUSD = Number(document.getElementById("amountUSD").value);
                const tlAmountforUSD = Number((amountUSD / rateUSD).toFixed(2));
                document.getElementById("tl").value = tlAmountforUSD;
            }
        }
    }

    xhr.send();
}



function exchangeCheck(e) {

    tlID.value = "";
    if (e.target.value === "EUR") {
        selectID.remove();
        while (exchangeDiv.lastElementChild) {
            exchangeDiv.removeChild(exchangeDiv.lastElementChild);
        }
        let img = document.createElement("img");
        img.src = "./images/european-union.png";
        img.style = "width: 25px; margin-right: 5%;"
        img.alt = "european-union";
        let input = document.createElement("input");
        input.type = "text";
        input.id = "amountEUR";
        input.min = "0";
        input.style = "margin-right: 5%";
        input.placeholder = "Enter a value";

        let select = document.createElement("select");

        let optionDefault = document.createElement("option");
        optionDefault.value = "EUR";
        optionDefault.append("EUR");
        let option = document.createElement("option");
        option.value = "USD";
        option.append("USD");
        select.appendChild(optionDefault);
        select.appendChild(option);

        exchangeDiv.appendChild(img);
        exchangeDiv.appendChild(input);
        exchangeDiv.appendChild(select);
    }
    else if (e.target.value === "USD") {
        selectID.remove();
        while (exchangeDiv.lastElementChild) {
            exchangeDiv.removeChild(exchangeDiv.lastElementChild);
        }
        let img = document.createElement("img");
        img.src = "./images/united-states.png";
        img.style = "width: 25px; margin-right: 5%;"
        img.alt = "united-states";
        let input = document.createElement("input");
        input.type = "text";
        input.id = "amountUSD";
        input.min = "0";
        input.style = "margin-right: 5%";
        input.placeholder = "Enter a value";

        let select = document.createElement("select");

        let optionDefault = document.createElement("option");
        optionDefault.value = "USD";
        optionDefault.append("USD");
        let option = document.createElement("option");
        option.value = "EUR";
        option.append("EUR");
        select.appendChild(optionDefault);
        select.appendChild(option);

        exchangeDiv.appendChild(img);
        exchangeDiv.appendChild(input);
        // exchangeDiv.append("USD");
        exchangeDiv.appendChild(select);

    }
}



function refresh() {
    location.reload();
}