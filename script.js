let baseMunicipio = [];
let baseINEP = [];

// =========================
// ESPERAR CARREGAR A PÁGINA
// =========================
document.addEventListener("DOMContentLoaded", () => {

    fetch("dados.xlsx")
        .then(res => res.arrayBuffer())
        .then(data => {

            let workbook = XLSX.read(data);

            // ABA 1 (Secretaria / Municipio)
            let aba1 = workbook.Sheets[workbook.SheetNames[0]];
            baseMunicipio = XLSX.utils.sheet_to_json(aba1);

            // ABA 2 (Escolas / INEP)
            let aba2 = workbook.Sheets[workbook.SheetNames[1]];
            baseINEP = XLSX.utils.sheet_to_json(aba2);

            console.log("Municipios carregados:", baseMunicipio.length);

