const capitalizeWords = (string) =>
    string
        .toUpperCase()
        .split(" ")
        .map((word, index, arr) => {
            if (index !== 0 && index !== arr.length - 1) {
                return word;
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
        })
        .join(" ");

const tipoProcesso = document.getElementById('tipoProcesso');
const grupoPortugues = document.getElementById('grupoPortugues');
const grupoConjuge = document.getElementById('grupoConjuge');
const grupoDataCasamento = document.getElementById('grupoDataCasamento');
const grupoNubentes = document.getElementById('grupoNubentes');
const grupoPais = document.getElementById('grupoPais');
const procuracoesNormais = document.getElementById('procuracoesNormais');
const inputFilhosMenores = document.getElementById('inputFilhosMenores');
const inputMae = document.getElementById('mae');
const inputPai = document.getElementById('pai');

function atualizarCampos() {
    const tipo = tipoProcesso.value;
    const selectTipoProcuracao = document.getElementById('tipoProcuracao');
    const tipoProcuracao = selectTipoProcuracao ? selectTipoProcuracao.value : '';

    if (tipo === 'filhosMenores') {
        inputFilhosMenores.classList.remove('hidden');
        procuracoesNormais.classList.add('hidden');
        grupoPortugues.classList.remove('hidden');
        grupoNubentes.classList.add('hidden');
        grupoPais.classList.add('hidden');
        grupoConjuge.classList.add('hidden');
        grupoDataCasamento.classList.add('hidden');

        if (tipoProcuracao === 'm') {
            inputMae.classList.remove('hidden');
            inputPai.classList.add('hidden');
        } else if (tipoProcuracao === 'p') {
            inputPai.classList.remove('hidden');
            inputMae.classList.add('hidden');
        } else if (tipoProcuracao === 'pm') {
            inputMae.classList.remove('hidden');
            inputPai.classList.remove('hidden');
        } else {
            inputMae.classList.add('hidden');
            inputPai.classList.add('hidden');
        }
        if (selectTipoProcuracao) {
            selectTipoProcuracao.addEventListener('change', atualizarCampos);
        }
    } else if (tipo === 'netosMenor') {
        inputFilhosMenores.classList.remove('hidden');
        procuracoesNormais.classList.add('hidden');
        grupoPortugues.classList.remove('hidden');
        grupoNubentes.classList.add('hidden');
        grupoPais.classList.add('hidden');
        grupoConjuge.classList.add('hidden');
        grupoDataCasamento.classList.add('hidden');

    } else {
        procuracoesNormais.classList.remove('hidden');
        inputFilhosMenores.classList.add('hidden');
        inputMae.classList.add('hidden');
        inputPai.classList.add('hidden');

        if (tipo === 'filhosMaiores') {
            grupoPortugues.classList.remove('hidden');
            grupoNubentes.classList.add('hidden');
            grupoPais.classList.remove('hidden');
            grupoConjuge.classList.add('hidden');
            grupoDataCasamento.classList.add('hidden');
        } else if (tipo === 'netosMaior') {
            grupoPortugues.classList.add('hidden');
            grupoNubentes.classList.add('hidden');
            grupoPais.classList.remove('hidden');
            grupoConjuge.classList.add('hidden');
            grupoDataCasamento.classList.add('hidden');
        } else if (tipo === 'matrimonio') {
            grupoConjuge.classList.remove('hidden');
            grupoDataCasamento.classList.remove('hidden');
            grupoPortugues.classList.add('hidden');
            grupoNubentes.classList.add('hidden');
            grupoPais.classList.remove('hidden');
        } else if (tipo === 'transcricao') {
            grupoPortugues.classList.remove('hidden');
            grupoNubentes.classList.remove('hidden');
            grupoConjuge.classList.add('hidden');
            grupoDataCasamento.classList.add('hidden');
            grupoPais.classList.add('hidden');
        } else {
            grupoPortugues.classList.add('hidden');
            grupoNubentes.classList.add('hidden');
            grupoConjuge.classList.add('hidden');
            grupoDataCasamento.classList.add('hidden');
            grupoPais.classList.remove('hidden');
        }
    }
}

tipoProcesso.addEventListener('change', atualizarCampos);

function gerarDocumento() {
    const tipoProcesso = document.getElementById("tipoProcesso").value;
    const portugues = document.getElementById("portugues").value;
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const nomeCru = capitalizeWords(document.getElementById("nome").value);
    const nacionalidade = document.getElementById("nacionalidade").value;
    const estadoCivil = document.getElementById("estadoCivil").value;
    const profissao = document.getElementById("profissao").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const cidadeNascimento = document.getElementById("cidadeNascimento").value;
    const ufNascimento = document.getElementById("ufNascimento").value;
    const nomePai = document.getElementById("nomePai").value;
    const nomeMae = document.getElementById("nomeMae").value;
    const nomeConjuge = document.getElementById("nomeConjuge").value;
    const dataCasamento = document.getElementById("dataCasamento").value;
    const nubente1Lower = capitalizeWords(document.getElementById("nubente1").value);
    const nubente2Lower = capitalizeWords(document.getElementById("nubente2").value);
    const endereco = document.getElementById("endereco").value;
    const cidade = document.getElementById("cidade").value;
    const uf = document.getElementById("uf").value;
    const cep = document.getElementById("cep").value;
    const pais = document.getElementById("pais").value;
    const residencia = `${endereco}, ${cidade} - ${uf}, CEP ${cep}, ${pais}`;
    const tipoDocumento = document.getElementById("tipoDocumento").value;
    const documento = document.getElementById("documento").value;
    const dataExpedicao = document.getElementById("dataExpedicao").value;
    const orgaoExpedidor = document.getElementById("orgaoExpedidor").value;
    const nomeMenor = document.getElementById("nomeMenor").value;
    const dataNascimentoMenor = document.getElementById("dataNascimentoMenor").value;
    const cidadeNascimentoMenor = document.getElementById("cidadeNascimentoMenor").value;
    const estadoNascimento = document.getElementById("estadoNascimento").value;
    const tipoDocumentoMenor = document.getElementById("tipoDocumentoMenor").value;
    const documentoMenor = document.getElementById("documentoMenor").value;
    const dataDocumentoMenor = document.getElementById("dataDocumentoMenor").value;
    const nomeMaeMenor = document.getElementById("nomeMaeMenor").value;
    const nacionalidadeMae = document.getElementById("nacionalidadeMae").value;
    const estadoCivilMae = document.getElementById("estadoCivilMae").value;
    const profissaoMae = document.getElementById("profissaoMae").value;
    const enderecoMae = document.getElementById("enderecoMae").value;
    const cidadeMae = document.getElementById("cidadeMae").value;
    const ufMae = document.getElementById("ufMae").value;
    const cepMae = document.getElementById("cepMae").value;
    const paisMae = document.getElementById("paisMae").value;
    const tipoDocumentoMae = document.getElementById("tipoDocumentoMae").value;
    const documentoMae = document.getElementById("documentoMae").value;
    const dataExpedicaoMae = document.getElementById("dataExpedicaoMae").value;
    const orgaoExpedidorMae = document.getElementById("orgaoExpedidorMae").value;
    const residenciaMae = `${enderecoMae}, ${cidadeMae} - ${ufMae}, CEP ${cepMae}, ${paisMae}`;
    const nomePaiMenor = document.getElementById("nomePaiMenor").value;
    const nacionalidadePai = document.getElementById("nacionalidadePai").value;
    const estadoCivilPai = document.getElementById("estadoCivilPai").value;
    const profissaoPai = document.getElementById("profissaoPai").value;
    const enderecoPai = document.getElementById("enderecoPai").value;
    const cidadePai = document.getElementById("cidadePai").value;
    const ufPai = document.getElementById("ufPai").value;
    const cepPai = document.getElementById("cepPai").value;
    const paisPai = document.getElementById("paisPai").value;
    const tipoDocumentoPai = document.getElementById("tipoDocumentoPai").value;
    const documentoPai = document.getElementById("documentoPai").value;
    const dataExpedicaoPai = document.getElementById("dataExpedicaoPai").value;
    const orgaoExpedidorPai = document.getElementById("orgaoExpedidorPai").value;
    const orgaoExpedidorMenor = document.getElementById("orgaoExpedidorMenor").value;
    const residenciaPai = `${enderecoPai}, ${cidadePai} - ${ufPai}, CEP ${cepPai}, ${paisPai}`;
    const generoLetra = genero === "homem" ? "o" : "a";
    const nome = capitalizeWords(nomeCru);
    const nubente1 = capitalizeWords(nubente1Lower);
    const nubente2 = capitalizeWords(nubente2Lower);
    const selectTipoProcuracao = document.getElementById('tipoProcuracao');
    const tipoProcuracao = selectTipoProcuracao ? selectTipoProcuracao.value : '';

    const hoje = new Date();

    const dia = hoje.getDate();
    const mes = hoje.toLocaleString("pt-BR", { month: "long" });
    const ano = hoje.getFullYear();

    const dataFormatada = `${dia} de ${mes} de ${ano}`;

    let textoProcura = "";

    if (tipoProcesso === "netosMaior") {
        textoProcura = `<strong>${nome}</strong>, ${nacionalidade}, no estado civil de ${estadoCivil}, ${profissao}, nascid${generoLetra} em ${dataNascimento}, na cidade de ${cidadeNascimento} – ${ufNascimento}, filh${generoLetra} de ${nomePai} e ${nomeMae}, residente em ${residencia}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumento}) nº ${documento}, expedido em ${dataExpedicao} pelo órgão ${orgaoExpedidor}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, <strong>a quem confere poderes especiais e necessários para ${generoLetra} representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto ao abrigo da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica nº 2/2020, requerer a Nacionalidade Portuguesa pela via da atribuição (N. 1º, alínea d.) da Lei n. 37/81, como net${generoLetra} de português</strong>, e depois promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos. No mais, declaro que nunca fui condenado, com trânsito em julgado da sentença, pela prática de crime punível com pena de prisão de máximo igual ou superior a três anos, segundo a lei portuguesa. `;
    }

    if (tipoProcesso === "filhosMaiores") {
        textoProcura = `<strong>${nome}</strong>, ${nacionalidade}, no estado civil de ${estadoCivil}, ${profissao}, nascid${generoLetra} em ${dataNascimento}, na cidade de ${cidadeNascimento} – ${ufNascimento}, filh${generoLetra} de ${nomePai} e ${nomeMae}, residente em ${residencia}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumento}) nº ${documento}, expedido em ${dataExpedicao} pelo órgão ${orgaoExpedidor}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, <strong>a quem confere poderes especiais e necessários para ${generoLetra} representar perante a Conservatória dos Registos Centrais e/ou Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, n.º 1, al.c), da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica nº 2/2020, requerer a Nacionalidade Portuguesa pela via da atribuição, por ser filh${generoLetra} de ${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, e que seja lavrado o respetivo registo, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos.`;
    }

    if (tipoProcesso === "matrimonio") {
        textoProcura = `<strong>${nome}</strong>, ${nacionalidade}, no estado civil de ${estadoCivil}, ${profissao}, nascid${generoLetra} em ${dataNascimento}, na cidade de ${cidadeNascimento} – ${ufNascimento}, casad${generoLetra} com ${nomeConjuge}, desde ${dataCasamento}, residente em ${residencia}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumento}) nº ${documento}, expedido em ${dataExpedicao} pelo órgão ${orgaoExpedidor}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, <strong>a quem confere poderes especiais e necessários para ${generoLetra} representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 3º da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica nº 2/2020, requerer a Nacionalidade Portuguesa pela via da aquisição</strong>, e que seja lavrado o respetivo registo, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos.`;
    }

    if (tipoProcesso === "transcricao") {
        const complementoPortugues = (portugues && portugues !== "proprio") ? `, de meus ${portugues}` : "";
        textoProcura = `<strong>${nome}</strong>, ${nacionalidade}, no estado civil de ${estadoCivil}, ${profissao}, nascid${generoLetra} em ${dataNascimento}, na cidade de ${cidadeNascimento} – ${ufNascimento}, residente em ${residencia}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumento}) nº ${documento}, expedido em ${dataExpedicao} pelo órgão ${orgaoExpedidor}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, <strong>a quem confere poderes especiais e necessários para ${generoLetra} representar perante a Conservatória dos Registos Centrais e/ou Conservatória dos Registos Civis e suas extensões, para proceder à Transcrição de Casamento ocorrido no estrangeiro entre ${nubente1} e ${nubente2}</strong>${complementoPortugues}, podendo para o feito declarar, praticar e assinar  tudo o que seja necessário ao indicado fim, inclusive podendo desistir do pedido, prestar declarações e substabelecer os poderes que lhe foram conferidos.`
    }

    if (tipoProcesso === "filhosMenores" && tipoProcuracao === "pm") {
        textoProcura = `<strong>${nomeMaeMenor}</strong>, ${nacionalidadeMae}, no estado civil de ${estadoCivilMae}, ${profissaoMae}, com residência habitual em ${residenciaMae}, portadora do documento de identificação (${tipoDocumentoMae}) n.º ${documentoMae}, com data de expedição em ${dataExpedicaoMae} pelo órgão emissor ${orgaoExpedidorMae}, e <br>
<strong>${nomePaiMenor}</strong>, ${nacionalidadePai}, no estado civil de ${estadoCivilPai}, ${profissaoPai}, com residência habitual em ${residenciaPai}, portadora do documento de identificação (${tipoDocumentoPai}) n.º ${documentoPai}, com data de expedição em ${dataExpedicaoPai} pelo órgão emissor ${orgaoExpedidorPai}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, a quem confere os poderes especiais e necessários para os  representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor},  e que seja lavrado o respetivo registo, por ser filh${generoLetra} de <strong> ${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo, prestar declarações e substabelecer os poderes que lhe foram conferidos. `;
    }

    if (tipoProcesso === "" && tipoProcuracao === "m") {
        textoProcura = `<strong>${nomeMaeMenor}</strong>, ${nacionalidadeMae}, no estado civil de ${estadoCivilMae}, ${profissaoMae}, com residência habitual em ${residenciaMae}, portadora do documento de identificação (${tipoDocumentoMae}) n.º ${documentoMae}, com data de expedição em ${dataExpedicaoMae} pelo órgão emissor ${orgaoExpedidorMae}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, a quem confere os poderes especiais e necessários para os  representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor}, e que seja lavrado o respetivo registo, por ser filh${generoLetra} de<strong> ${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo, prestar declarações e substabelecer os poderes que lhe foram conferidos. `
    }

    if (tipoProcesso === "filhosMenores" && tipoProcuracao === "p") {
        textoProcura = `<strong>${nomePaiMenor}</strong>, ${nacionalidadePai}, no estado civil de ${estadoCivilPai}, ${profissaoPai}, com residência habitual em ${residenciaPai}, portadora do documento de identificação (${tipoDocumentoPai}) n.º ${documentoPai}, com data de expedição em ${dataExpedicaoPai} pelo órgão emissor ${orgaoExpedidorPai}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, a quem confere os poderes especiais e necessários para os  representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor},  e que seja lavrado o respetivo registo, por ser filh${generoLetra} de<strong> ${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo, prestar declarações e substabelecer os poderes que lhe foram conferidos. `
    }
    if (tipoProcesso === "netosMenor" && tipoProcuracao === "pm") {
        textoProcura = `<strong>${nomeMaeMenor}</strong>, ${nacionalidadeMae}, no estado civil de ${estadoCivilMae}, ${profissaoMae}, com residência habitual em ${residenciaMae}, portadora do documento de identificação (${tipoDocumentoMae}) n.º ${documentoMae}, com data de expedição em ${dataExpedicaoMae} pelo órgão emissor ${orgaoExpedidorMae}, e <br>
<strong>${nomePaiMenor}</strong>, ${nacionalidadePai}, no estado civil de ${estadoCivilPai}, ${profissaoPai}, com residência habitual em ${residenciaPai}, portadora do documento de identificação (${tipoDocumentoPai}) n.º ${documentoPai}, com data de expedição em ${dataExpedicaoPai} pelo órgão emissor ${orgaoExpedidorPai}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, a quem confere os poderes especiais e necessários para os  representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor},  e que seja lavrado o respetivo registo, por ser filh${generoLetra} de <strong> ${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo, prestar declarações e substabelecer os poderes que lhe foram conferidos. `;
    }

    if (tipoProcesso === "netosMenor" && tipoProcuracao === "m") {
        textoProcura = `<strong>${nomeMaeMenor}</strong>, ${nacionalidadeMae}, no estado civil de ${estadoCivilMae}, ${profissaoMae}, com residência habitual em ${residenciaMae}, portadora do documento de identificação (${tipoDocumentoMae}) n.º ${documentoMae}, com data de expedição em ${dataExpedicaoMae} pelo órgão emissor ${orgaoExpedidorMae}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, a quem confere os poderes especiais e necessários para os  representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor}, e que seja lavrado o respetivo registo, por ser filh${generoLetra} de<strong> ${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo, prestar declarações e substabelecer os poderes que lhe foram conferidos. `
    }

    if (tipoProcesso === "netosMenor" && tipoProcuracao === "p") {
        textoProcura = `<strong>${nomePaiMenor}</strong>, ${nacionalidadePai}, no estado civil de ${estadoCivilPai}, ${profissaoPai}, com residência habitual em ${residenciaPai}, portadora do documento de identificação (${tipoDocumentoPai}) n.º ${documentoPai}, com data de expedição em ${dataExpedicaoPai} pelo órgão emissor ${orgaoExpedidorPai}, constitui como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Rua Febo Muniz, 27B, Edifício LACS Anjos - Código Postal 1150-152, Lisboa - Portugal, a quem confere os poderes especiais e necessários para os  representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor},  e que seja lavrado o respetivo registo, por ser filh${generoLetra} de<strong> ${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo, prestar declarações e substabelecer os poderes que lhe foram conferidos. `
    }

    let conteudo;

    if (tipoProcesso === 'filhosMenores' && tipoProcuracao === 'pm') {
        conteudo = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word' 
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                <style>
                    body { font-family: "Aptos", sans-serif; font-size: 12pt; }
                    h1 { font-size: 12pt; text-align: center; }
                    p { text-align: justify; }
                </style>
                <title>Procuração</title></head><body>
                                <h1>PROCURAÇÃO - FILHO MENOR</h1>
                    <p style="text-align: justify;"> ${textoProcura}</p>
                <p style="text-align: right;">${cidadeMae} - ${ufMae}, ${dataFormatada}</p>
                <p style="margin-top: 100px; text-align:center;">_______________________________________________<br>
                ${nomeMaeMenor}<br>
                (Assinatura com firma reconhecida por autenticidade)<br><br><br>
                _______________________________________________<br>
                ${nomePaiMenor}<br>
                (Assinatura com firma reconhecida por autenticidade)</p>
                </body></html> `;
    } else if (tipoProcesso === 'filhosMenores' && tipoProcuracao === 'm') {
        conteudo = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word' 
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                <style>
                    body { font-family: "Aptos", sans-serif; font-size: 12pt; }
                    h1 { font-size: 12pt; text-align: center; }
                    p { text-align: justify; }
                </style>
                <title>Procuração</title></head><body>
                                <h1>PROCURAÇÃO - FILHO MENOR</h1>
                    <p style="text-align: justify;"> ${textoProcura}</p>
                <p style="text-align: right;">${cidadeMae} - ${ufMae},${dataFormatada}</p>
                <p style="margin-top: 100px; text-align:center;">_______________________________________________<br>
                ${nomeMaeMenor}<br>
                (Assinatura com firma reconhecida por autenticidade)</p>
                </body></html> `;
    } else if (tipoProcesso === 'filhosMenores' && tipoProcuracao === 'p') {
        conteudo = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word' 
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                <style>
                    body { font-family: "Aptos", sans-serif; font-size: 12pt; }
                    h1 { font-size: 12pt; text-align: center; }
                    p { text-align: justify; }
                </style>
                <title>Procuração</title></head><body>
                                <h1>PROCURAÇÃO - FILHO MENOR</h1>
                    <p style="text-align: justify;"> ${textoProcura}</p>
                <p style="text-align: right;">${cidadeMae} - ${ufMae}, ${dataFormatada}</p>
                <p style="margin-top: 100px; text-align:center;">_______________________________________________<br>
                ${nomePaiMenor}<br>
                (Assinatura com firma reconhecida por autenticidade)</p>
                </body></html> `;
    } else if (tipoProcesso === 'netosMenor' && tipoProcuracao === 'pm') {
        conteudo = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word' 
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                <style>
                    body { font-family: "Aptos", sans-serif; font-size: 12pt; }
                    h1 { font-size: 12pt; text-align: center; }
                    p { text-align: justify; }
                </style>
                <title>Procuração</title></head><body>
                                <h1>PROCURAÇÃO - NETOS</h1>
                    <p style="text-align: justify;"> ${textoProcura}</p>
                <p style="text-align: right;">${cidadeMae} - ${ufMae}, ${dataFormatada}</p>
                <p style="margin-top: 100px; text-align:center;">_______________________________________________<br>
                ${nomeMaeMenor}<br>
                (Assinatura com firma reconhecida por autenticidade)<br><br><br>
                _______________________________________________<br>
                ${nomePaiMenor}<br>
                (Assinatura com firma reconhecida por autenticidade)</p>
                </body></html> `;
    } else if (tipoProcesso === 'netosMenor' && tipoProcuracao === 'm') {
        conteudo = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word' 
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                <style>
                    body { font-family: "Aptos", sans-serif; font-size: 12pt; }
                    h1 { font-size: 12pt; text-align: center; }
                    p { text-align: justify; }
                </style>
                <title>Procuração</title></head><body>
                                <h1>PROCURAÇÃO - NETOS</h1>
                    <p style="text-align: justify;"> ${textoProcura}</p>
                <p style="text-align: right;">${cidadeMae} - ${ufMae},${dataFormatada}</p>
                <p style="margin-top: 100px; text-align:center;">_______________________________________________<br>
                ${nomeMaeMenor}<br>
                (Assinatura com firma reconhecida por autenticidade)</p>
                </body></html> `;
    } else if (tipoProcesso === 'netosMenor' && tipoProcuracao === 'p') {
        conteudo = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word' 
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                <style>
                    body { font-family: "Aptos", sans-serif; font-size: 12pt; }
                    h1 { font-size: 12pt; text-align: center; }
                    p { text-align: justify; }
                </style>
                <title>Procuração</title></head><body>
                                <h1>PROCURAÇÃO - NETOS</h1>
                    <p style="text-align: justify;"> ${textoProcura}</p>
                <p style="text-align: right;">${cidadePai} - ${ufPai}, ${dataFormatada}</p>
                <p style="margin-top: 100px; text-align:center;">_______________________________________________<br>
                ${nomePaiMenor}<br>
                (Assinatura com firma reconhecida por autenticidade)</p>
                </body></html> `;
    }
    else if (tipoProcesso === 'transcricao') {
        conteudo = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word' 
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                <style>
                    body { font-family: "Aptos", sans-serif; font-size: 12pt; }
                    h1 { font-size: 12pt; text-align: center; }
                    p { text-align: justify; }
                </style>
                <title>Procuração</title></head><body>

                <h1>PROCURAÇÃO - TRANSCRIÇÃO</h1>
                    <p style="text-align: justify;"> ${textoProcura}</p>
                <p style="text-align: right;">${cidade} - ${uf}, __________ de _________________ de 2025</p>
                <p style="margin-top: 100px; text-align:center;">_______________________________________________<br>
                ${nome}<br>
                (Assinatura com firma reconhecida por autenticidade) 
                </p>

                </body></html>
            `;
    } else {
        conteudo = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word' 
                xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                <style>
                    body { font-family: "Aptos", sans-serif; font-size: 12pt; }
                    h1 { font-size: 12pt; text-align: center; }
                    p { text-align: justify; }
                </style>
                <title>Procuração</title></head><body>

                <h1>PROCURAÇÃO - ${tipoProcesso === "filhosMaiores" ? "FILHO MAIOR" : tipoProcesso === "netosMaior" ? "NETOS" : tipoProcesso === "matrimonio" ? "MATRIMÔNIO" : "FILHO MENOR"}</h1>
                    <p style="text-align: justify;"> ${textoProcura}</p>
                <p style="text-align: right;">${cidade} - ${uf}, ${dataFormatada}</p>
                <p style="margin-top: 100px; text-align:center;">_______________________________________________<br>
                ${nome}<br>
                </p>

                </body></html>
            `;
    }

    const blob = new Blob(['\ufeff', conteudo], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `procuracao - ${nome}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}