let baseMunicipio = [];
let baseINEP = [];

// 🔥 ler Excel com múltiplas abas
fetch("dados.xlsx")
  .then(res => res.arrayBuffer())
  .then(data => {

    let workbook = XLSX.read(data);

    // 👉 ABA 1 (municipio)
    let aba1 = workbook.Sheets[workbook.SheetNames[0]];
    baseMunicipio = XLSX.utils.sheet_to_json(aba1);

    // 👉 ABA 2 (inep)
    let aba2 = workbook.Sheets[workbook.SheetNames[1]];
    baseINEP = XLSX.utils.sheet_to_json(aba2);
  });

// =====================
// TROCAR ABAS VISUAIS
// =====================
function mostrarAba(tipo) {
    document.getElementById("abaMunicipio").style.display = tipo === 'mun' ? 'block' : 'none';
    document.getElementById("abaINEP").style.display = tipo === 'inep' ? 'block' : 'none';
}

// =====================
// BUSCA MUNICIPIO
// =====================
function buscarMunicipio() {

    let m = document.getElementById("municipio").value.toLowerCase();

    let r = baseMunicipio.find(x =>
        x["MUNICIPIO"] && x["MUNICIPIO"].toLowerCase() === m
    );

    let div = document.getElementById("resMun");

    if (!r) {
        div.innerHTML = "NÃO LOCALIZADO";
        return;
    }

    div.innerHTML = `
        <b>Nome Secretário:</b> ${r["NOME - SECRETÁRIO"] || "NÃO LOCALIZADO"}<br>
        <b>Email:</b> ${r["E-MAIL - SECRETÁRIO"] || "NÃO LOCALIZADO"}
    `;
}

// =====================
// BUSCA INEP
// =====================
function buscarINEP() {

    let i = document.getElementById("inep").value;

    let r = baseINEP.find(x =>
        x["CODIGO INEP"] == i
    );

    let div = document.getElementById("resINEP");

    if (!r) {
        div.innerHTML = "NÃO LOCALIZADO";
        return;
    }

    div.innerHTML = `
        <b>Nome da Escola:</b> ${r["NOME ESCOLA"]}<br>
        <b>Município:</b> ${r["MUNICIPIO"]}<br>
        <b>Responsável:</b> ${r["NOME RESPONSÁVEL"]}<br>
        <b>Email Responsável:</b> ${r["EMAIL COMERCIAL"]}<br>
        <b>Telefone Responsável:</b> ${r["TELEFONE COMERCIAL"]}<br>
    `;
}
