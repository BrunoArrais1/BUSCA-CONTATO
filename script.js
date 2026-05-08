let baseMunicipio = [];
let baseINEP = [];

// =========================
// CARREGAR EXCEL
// =========================
fetch("dados.xlsx")
  .then(res => res.arrayBuffer())
  .then(data => {

    let workbook = XLSX.read(data);

    // ABA 1 = MUNICIPIO
    let aba1 = workbook.Sheets[workbook.SheetNames[0]];
    baseMUNICIPIO = XLSX.utils.sheet_to_json(aba1);

    // ABA 2 = INEP
    let aba2 = workbook.Sheets[workbook.SheetNames[1]];
    baseINEP = XLSX.utils.sheet_to_json(aba2);

    // 👉 gerar lista automática
    carregarMunicipios();
  });

// =========================
// GERAR LISTA AUTOMÁTICA
// =========================
function carregarMunicipios() {

    let select = document.getElementById("municipio");

    // limpar
    select.innerHTML = '<option value="">Selecione o município</option>';

    // pegar lista única
    let municipios = [...new Set(baseMunicipio.map(x => x["MUNICÍPIO"]))];

    // ordenar
    municipios.sort();

    // preencher
    municipios.forEach(m => {
        if (m) {
            let opt = document.createElement("option");
            opt.value = m;
            opt.textContent = m;
            select.appendChild(opt);
        }
    });
}

// =========================
// TROCAR ABAS
// =========================
function mostrarAba(tipo) {
    document.getElementById("abaMunicipio").style.display = tipo === 'mun' ? 'block' : 'none';
    document.getElementById("abaINEP").style.display = tipo === 'inep' ? 'block' : 'none';
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
        <b>Nome:</b> ${r["NOME - SECRETÁRIO"]}<br>
        <b>Email:</b> ${r["E-MAIL - SECRETÁRIO"]}
    `;
}

// =========================
// BUSCA INEP
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
