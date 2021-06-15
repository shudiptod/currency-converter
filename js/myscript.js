
window.onload = function () {
    document.getElementById('input1').value = "";
    document.getElementById('input2').value = "";
}




const select = document.querySelectorAll("select")
const input = document.querySelectorAll("input")
const API_URL = "https://v2.api.forex/rates/latest.json?withCredentials=true?beautify=true&key=f485e4d4-2c33-431e-b615-f007c33ab750";
let html = "";

async function currency() {

    const res = await fetch('https://api.exchangerate.host/latest');
    console.log(res);
    const data = await res.json();


    const arrKeys = Object.keys(data.rates);
    const rates = data.rates;
    arrKeys.map(item => {
        return html += `<option value=${item}>${item}</option>`;
    });

    for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = html;
    };

    function convert(i, j) {
        input[i].value = input[j].value * rates[select[i].value] / rates[select[j].value];
    };

    input[0].addEventListener('keyup', () => convert(1, 0));

    input[1].addEventListener('keyup', () => convert(0, 1));

    select[0].addEventListener('change', () => convert(1, 0));
    select[1].addEventListener('change', () => convert(0, 1));

}
currency();