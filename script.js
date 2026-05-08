let baseMunicipio = [];
let baseINEP = [];

// =========================
// ESPERAR HTML CARREGAR
// =========================
document.addEventListener("DOMContentLoaded", () => {

    fetch("dados.xlsx")
        .then(res => res.arrayBuffer())
        .then(data => {

            let workbook = XLSX.read(data);

            let aba1 = workbook.Sheets[workbook.SheetNames[0]];
            baseMunicipio = XLSX.utils.sheet_to_json(aba1);

            let aba2 = workbook.Sheets[workbook.SheetNames[1]];
            baseINEP = XLSX.utils.sheet_to_json(aba2);

            carregarMunicipios();
        });
});

// =========================
// LISTA MUNICIPIOS
// =========================
function carregarMunicipios() {

    let select = document.getElementById("municipio");

    select.innerHTML = '<option value="">Selecione o município</option>';

    let municipios = [...new Set(
        baseMunicipio.map(x => x["MUNICÍPIO"])
    )];

    municipios = municipios.filter(m => m);
    municipios.sort();

    municipios.forEach(m => {
        let opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        select.appendChild(opt);
    });
}

// =========================
// TROCAR ABAS ✅
// =========================
function mostrarAba(tipo) {

    let abaMun = document.getElementById("abaMunicipio");
    let abaInep = document.getElementById("abaINEP");

    if (tipo === "mun") {
        abaMun.style.display = "block";
        abaInep.style.display = "none";
    } else {
        abaMun.style.display = "none";
        abaInep.style.display = "block";
    }
}

// =========================
// BUSCAR MUNICIPIO
// =========================
function buscarMunicipio() {

    let m = document.getElementById("municipio").value;

    let r = baseMunicipio.find(x => x["MUNICÍPIO"] === m);

    let div = document.getElementById("resMun");

    if (!r) {
        div.innerHTML = "NÃO LOCALIZADO";
        return;
    }

    div.innerHTML = `
        <b>Secretário:</b> ${r["NOME - SECRETÁRIO"]}<br>
        <b>Email:</b> ${r["E-MAIL - SECRETÁRIO"]}
    `;
}

// =========================
// BUSCAR INEP
// =========================
function buscarINEP() {

    let i = document.getElementById("inep").value;

    let r = baseINEP.find(x => x["CODIGO INEP"] == i);

    let div = document.getElementById("resINEP");

    if (!r) {
        div.innerHTML = "NÃO LOCALIZADO";
        return;
    }

    div.innerHTML = `
        <b>Nome da Escola:</b> ${r["NOME ESCOLA"]}<br>
        <b>Município:</b> ${r["MUNICIPIO"]}<br>
        <b>Responsável:</b> ${r["NOME RESPONSÁVEL"]}<br>
        <b>Email:</b> ${r["EMAIL COMERCIAL"]}<br>
        <b>Telefone:</b> ${r["TELEFONE COMERCIAL"]}
    `;
}
