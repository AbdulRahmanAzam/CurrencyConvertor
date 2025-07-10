const date = new Date().toISOString().split("T")[0];
const BASE_URL =`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies`;

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.getElementsByClassName("convert-btn")[0];
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")
const changeBtn = document.getElementsByClassName("change-btn")[0];

changeBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
})


for(let select of dropdown){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && code === "PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=> {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
}



const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = parseFloat(amount.value);
    if(amountVal === "" || amountVal <= 0){
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = parseFloat(amountVal * rate);
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}

btn.addEventListener("click", async (evt)=> {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})