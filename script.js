let baseMunicipio = [];
let baseINEP = [];

// =========================
// CARREGAR EXCEL
// =========================
fetch("dados.xlsx")
  .then(res => res.arrayBuffer())
  .then(data => {

    let workbook = XLSX.read(data);

    // ABA 1 (municipio)
    let aba1 = workbook.Sheets[workbook.SheetNames[0]];
    baseMunicipio = XLSX.utils.sheet_to_json(aba1);

    // ABA 2 (inep)
    let aba2 = workbook.Sheets[workbook.SheetNames[1]];
    baseINEP = XLSX.utils.sheet_to_json(aba2);

    console.log("Dados carregados:", baseMunicipio.length);

    // ✅ Só executa depois de carregar
    if (baseMunicipio.length > 0) {
        carregarMunicipios();
    }
  });

// =========================
// GERAR LISTA
// =========================
function carregarMunicipios() {

    let select = document.getElementById("municipio");

    select.innerHTML = '<option value="">Selecione o município</option>';

    // ⚡ usar nome exato com acento
    let municipios = [...new Set(
        baseMunicipio.map(x => x["MUNICÍPIO"])
    )];

    municipios = municipios.filter(m => m); // remove vazios
    municipios.sort();

    municipios.forEach(m => {
        let opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        select.appendChild(opt);
    });
}

// =========================
// BUSCA MUNICIPIO
// =========================
function buscarMunicipio() {

    let m = document.getElementById("municipio").value;

    let r = baseMunicipio.find(x =>
        x["MUNICÍPIO"] === m
    );

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
// BUSCA INEP (mantém)
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
        <b>Telefone:</b> ${r["TELEFONE COMERCIAL"]}<br>
        <b>Email Instituição:</b> ${r["EMAIL INSTITUICAO"] || "NÃO LOCALIZADO"}<br>
        <b>Telefone Instituição:</b> ${r["TELEFONE INSTITUICAO"] || "NÃO LOCALIZADO"}
    `;
}
