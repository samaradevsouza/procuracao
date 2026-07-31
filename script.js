function errorAlert(message) {
    alert(
        "Não foi possível gerar o documento.\n" +
        message +
        "\nVerifique os campos e tente novamente."
    );
}


function capitalizeWords(str = "") {
    if (!str) return "";
    const small = new Set(["de", "da", "do", "das", "dos", "e", "a", "o", "as", "os", "em", "para", "por", "com", "no", "na", "nos", "nas"]);
    const words = String(str).trim().toLowerCase().split(/\s+/);
    return words
        .map((w, i) => {
            if (i !== 0 && i !== words.length - 1 && small.has(w)) return w;
            return w.charAt(0).toUpperCase() + w.slice(1);
        })
        .join(" ");
}

function show(el) { if (el) el.classList.remove('hidden'); }
function hide(el) { if (el) el.classList.add('hidden'); }

function safeVal(el) { return el ? el.value : ""; }

document.addEventListener('DOMContentLoaded', () => {
    const el = (id) => document.getElementById(id);

    const tipoProcessoEl = el('tipoProcesso');
    const grupoPortugues = el('grupoPortugues');
    const grupoConjuge = el('grupoConjuge');
    const grupoDataCasamento = el('grupoDataCasamento');
    const grupoNubentes = el('grupoNubentes');
    const grupoPais = el('grupoPais');
    const procuracoesNormais = el('procuracoesNormais');
    const inputFilhosMenores = el('inputFilhosMenores');
    const inputMae = el('mae');
    const inputPai = el('pai');
    const selecaoAdv = el('selecaoAdv');
    const selectTipoProcuracao = el('tipoProcuracao');
    const homologacaoDivorcio = el('inputHomologacaoDivorcio');
    const inputGenero = el("inputGenero")



    window.atualizarCampos = function () {
        const tipo = safeVal(tipoProcessoEl);
        const tipoProcuracao = safeVal(selectTipoProcuracao);
        hide(inputFilhosMenores);
        show(procuracoesNormais);
        hide(inputMae);
        hide(inputPai);
        hide(homologacaoDivorcio);
        hide(inputGenero);

        if (tipo === 'filhosMenores' || tipo === 'netosMenor') {
            show(inputFilhosMenores);
            hide(procuracoesNormais);
            show(grupoPortugues);
            hide(grupoNubentes);
            hide(grupoPais);
            hide(grupoConjuge);
            hide(grupoDataCasamento);
            show(selecaoAdv);
            hide(homologacaoDivorcio);
            show(inputGenero);

            if (tipoProcuracao === 'm') {
                show(inputMae); hide(inputPai);
            } else if (tipoProcuracao === 'p') {
                show(inputPai); hide(inputMae);
            } else if (tipoProcuracao === 'pm') {
                show(inputMae); show(inputPai);
            } else {
                hide(inputMae); hide(inputPai);
            }
        } else if (tipo == 'homologacaoDivorcio') {
            hide(grupoPortugues);
            hide(grupoNubentes);
            hide(grupoConjuge);
            hide(grupoDataCasamento);
            hide(grupoPais);
            hide(selecaoAdv);
            show(homologacaoDivorcio);
            hide(procuracoesNormais);
            hide(inputGenero);
        }
        else {
            show(inputGenero);
            show(procuracoesNormais);
            hide(inputMae);
            hide(inputPai);
            hide(homologacaoDivorcio);

            if (tipo === 'filhosMaiores') {
                show(grupoPortugues);
                hide(grupoNubentes);
                show(grupoPais);
                hide(grupoConjuge);
                hide(grupoDataCasamento);
                show(selecaoAdv);
                hide(homologacaoDivorcio);
            } else if (tipo === 'netosMaior') {
                hide(grupoPortugues);
                hide(grupoNubentes);
                show(grupoPais);
                hide(grupoConjuge);
                hide(grupoDataCasamento);
                show(selecaoAdv);
                hide(homologacaoDivorcio);
            } else if (tipo === 'matrimonio') {
                show(grupoConjuge);
                show(grupoDataCasamento);
                hide(grupoPortugues);
                hide(grupoNubentes);
                show(grupoPais);
                show(selecaoAdv);
                hide(homologacaoDivorcio);
            } else if (tipo === 'transcricao') {
                show(grupoPortugues);
                show(grupoNubentes);
                hide(grupoConjuge);
                hide(grupoDataCasamento);
                hide(grupoPais);
                hide(selecaoAdv);
                hide(homologacaoDivorcio);
            }
            else {
                hide(grupoPortugues);
                hide(grupoNubentes);
                hide(grupoConjuge);
                hide(grupoDataCasamento);
                show(grupoPais);
                show(selecaoAdv);
                hide(homologacaoDivorcio);
                hide(procuracoesNormais);
            }
        }
    }

    if (selectTipoProcuracao) {
        selectTipoProcuracao.addEventListener('change', window.atualizarCampos);
    }
    if (tipoProcessoEl) {
        tipoProcessoEl.addEventListener('change', atualizarCampos);
    }

    window.gerarDocumento = function gerarDocumento() {
        try {
            const tipoProcesso = safeVal(el("tipoProcesso"));

            const portugues = safeVal(el("portugues"));
            const generoRadio = document.querySelector('input[name="genero"]:checked');
            const genero = generoRadio ? generoRadio.value : null;

            const nomeCru = capitalizeWords(safeVal(el("nome")));
            const nacionalidade = safeVal(el("nacionalidade"));
            const estadoCivil = safeVal(el("estadoCivil"));
            const profissao = safeVal(el("profissao"));
            const dataNascimento = safeVal(el("dataNascimento"));
            const cidadeNascimento = safeVal(el("cidadeNascimento"));
            const ufNascimento = safeVal(el("ufNascimento"));
            const nomePai = safeVal(el("nomePai"));
            const nomeMae = safeVal(el("nomeMae"));
            const nomeConjuge = capitalizeWords(safeVal(el("nomeConjuge")));
            const dataCasamento = safeVal(el("dataCasamento"));

            const nubente1Lower = capitalizeWords(safeVal(el("nubente1")));
            const nubente2Lower = capitalizeWords(safeVal(el("nubente2")));

            const endereco = safeVal(el("endereco"));
            const cidade = safeVal(el("cidade"));
            const uf = safeVal(el("uf"));
            const cep = safeVal(el("cep"));
            const pais = safeVal(el("pais"));
            const residencia = `${endereco}, ${cidade} - ${uf}, CEP ${cep}, ${pais}`.replaceAll(" ,", ",");

            const tipoDocumento = safeVal(el("tipoDocumento"));
            const documento = safeVal(el("documento"));
            const dataExpedicao = safeVal(el("dataExpedicao"));
            const orgaoExpedidor = safeVal(el("orgaoExpedidor"));

            // Menor
            const nomeMenor = capitalizeWords(safeVal(el("nomeMenor")));
            const dataNascimentoMenor = safeVal(el("dataNascimentoMenor"));
            const cidadeNascimentoMenor = safeVal(el("cidadeNascimentoMenor"));
            const estadoNascimento = safeVal(el("estadoNascimento"));
            const tipoDocumentoMenor = safeVal(el("tipoDocumentoMenor"));
            const documentoMenor = safeVal(el("documentoMenor"));
            const dataDocumentoMenor = safeVal(el("dataDocumentoMenor"));
            const orgaoExpedidorMenor = safeVal(el("orgaoExpedidorMenor"));

            // Mãe
            const nomeMaeMenor = capitalizeWords(safeVal(el("nomeMaeMenor")));
            const nacionalidadeMae = safeVal(el("nacionalidadeMae"));
            const estadoCivilMae = safeVal(el("estadoCivilMae"));
            const profissaoMae = safeVal(el("profissaoMae"));
            const enderecoMae = safeVal(el("enderecoMae"));
            const cidadeMae = safeVal(el("cidadeMae"));
            const ufMae = safeVal(el("ufMae"));
            const cepMae = safeVal(el("cepMae"));
            const paisMae = safeVal(el("paisMae"));
            const tipoDocumentoMae = safeVal(el("tipoDocumentoMae"));
            const documentoMae = safeVal(el("documentoMae"));
            const dataExpedicaoMae = safeVal(el("dataExpedicaoMae"));
            const orgaoExpedidorMae = safeVal(el("orgaoExpedidorMae"));
            const residenciaMae = `${enderecoMae}, ${cidadeMae} - ${ufMae}, CEP ${cepMae}, ${paisMae}`.replaceAll(" ,", ",");

            // Pai
            const nomePaiMenor = capitalizeWords(safeVal(el("nomePaiMenor")));
            const nacionalidadePai = safeVal(el("nacionalidadePai"));
            const estadoCivilPai = safeVal(el("estadoCivilPai"));
            const profissaoPai = safeVal(el("profissaoPai"));
            const enderecoPai = safeVal(el("enderecoPai"));
            const cidadePai = safeVal(el("cidadePai"));
            const ufPai = safeVal(el("ufPai"));
            const cepPai = safeVal(el("cepPai"));
            const paisPai = safeVal(el("paisPai"));
            const tipoDocumentoPai = safeVal(el("tipoDocumentoPai"));
            const documentoPai = safeVal(el("documentoPai"));
            const dataExpedicaoPai = safeVal(el("dataExpedicaoPai"));
            const orgaoExpedidorPai = safeVal(el("orgaoExpedidorPai"));
            const residenciaPai = `${enderecoPai}, ${cidadePai} - ${ufPai}, CEP ${cepPai}, ${paisPai}`.replaceAll(" ,", ",");

            // Homologação de divórcio
            const nomePt = safeVal(el("nomePt"));
            const profissaoPt = safeVal(el("profissaoPt"));
            const cartaoCidadao = safeVal(el("cartaoCidadao"));
            const dataValidadeCC = safeVal(el("dataValidadeCC"));
            const endPt = safeVal(el("endPt"));

            const nomeExConjuge = safeVal(el("nomeExConjuge"));
            const nacionalidadeExConjuge = safeVal(el("nacionalidadeExConjuge"));
            const profissaoExConjuge = safeVal(el("profissaoExConjuge"))
            const docIdExConjuge = safeVal(el("docIdExConjuge"));
            const dataExpedicaoExConjuge = safeVal(el("dataExpedicaoExConjuge"));
            const orgaoExpedidorExConjuge = safeVal(el("orgaoExpedidorExConjuge"));
            const endExConjuge = safeVal(el("endExConjuge"));
            const cepExConjuge = safeVal(el("cepExConjuge"));
            const estadoExConjuge = safeVal(el("estadoExConjuge"));

            const nome = capitalizeWords(nomeCru);
            const nubente1 = capitalizeWords(nubente1Lower);
            const nubente2 = capitalizeWords(nubente2Lower);
            const tipoProcuracao = safeVal(selectTipoProcuracao);

            const hoje = new Date();
            const dia = hoje.getDate();
            const mes = hoje.toLocaleString("pt-BR", { month: "long" });
            const ano = hoje.getFullYear();
            const dataFormatada = `${dia} de ${mes} de ${ano}`;

            const advRadio = document.querySelector('input[name="adv"]:checked');
            const adv = advRadio ? advRadio.value : null;


            if ((tipoProcesso !== 'homologacaoDivorcio') && !genero) {
                alert("Verifique se o campo de 'genero' está marcado.")
            }
            if (!['transcricao', 'homologacaoDivorcio'].includes(tipoProcesso) && !adv) {
                alert("Selecione um advogado.");
            }

            const generoLetra = genero === "homem" ? "o" : "a";


            const dadosDraCarlaOssuna =
                'como sua bastante procuradora a <strong>Dra. CARLA OSSUNA</strong>, advogada inscrita na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 64201L, com morada profissional na Av. Defensores de Chaves 4, 1000-117 - Edifício IDEA - Lisboa - Portugal, ';
            const dadosDrJoseAlberto =
                'como seu bastante procurador o <strong>Dr. JOSÉ ALBERTO ARAÚJO DE JESUS</strong>, advogado inscrito na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 68714P, com morada profissional na SHS Quadra 6 Conjunto A Bloco A Sala 501, Complexo Brasil 21, Asa Sul - Código Postal 70316-102, Distrito Federal - Brasil,';


            if (tipoProcesso === "netosMaior") {
                textoProcura =
                    `<strong>${nome}</strong>, ${nacionalidade}, no estado civil de ${estadoCivil}, ${profissao}, nascid${generoLetra} em ${dataNascimento}, na cidade de ${cidadeNascimento} – ${ufNascimento}, filh${generoLetra} de ${nomePai} e ${nomeMae}, residente em ${residencia}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumento}) nº ${documento}, expedido em ${dataExpedicao} pelo órgão ${orgaoExpedidor}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto}a quem confere poderes especiais e necessários para ${generoLetra} representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto ao abrigo da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica nº 2/2020, requerer a Nacionalidade Portuguesa pela via da atribuição (N. 1º, alínea d.) da Lei n. 37/81, como net${generoLetra} de português</strong>, e depois promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos. No mais, declaro que nunca fui condenado, com trânsito em julgado da sentença, pela prática de crime punível com pena de prisão de máximo igual ou superior a três anos, segundo a lei portuguesa. `;
            }

            if (tipoProcesso === "filhosMaiores") {
                textoProcura =
                    `<strong>${nome}</strong>, ${nacionalidade}, no estado civil de ${estadoCivil}, ${profissao}, nascid${generoLetra} em ${dataNascimento}, na cidade de ${cidadeNascimento} – ${ufNascimento}, filh${generoLetra} de ${nomePai} e ${nomeMae}, residente em ${residencia}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumento}) nº ${documento}, expedido em ${dataExpedicao} pelo órgão ${orgaoExpedidor}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto}a quem confere poderes especiais e necessários para ${generoLetra} representar perante a Conservatória dos Registos Centrais e/ou Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, n.º 1, al.c), da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica nº 2/2020, requerer a Nacionalidade Portuguesa pela via da atribuição, por ser filh${generoLetra} de ${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, e que seja lavrado o respetivo registo, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos.`;
            }

            if (tipoProcesso === "matrimonio") {
                textoProcura =
                    `<strong>${nome}</strong>, ${nacionalidade}, no estado civil de ${estadoCivil}, ${profissao}, nascid${generoLetra} em ${dataNascimento}, na cidade de ${cidadeNascimento} – ${ufNascimento}, casad${generoLetra} com ${nomeConjuge}, desde ${dataCasamento}, residente em ${residencia}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumento}) nº ${documento}, expedido em ${dataExpedicao} pelo órgão ${orgaoExpedidor}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto}a quem confere poderes especiais e necessários para ${generoLetra} representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 3º da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica nº 2/2020, requerer a Nacionalidade Portuguesa pela via da aquisição</strong>, e que seja lavrado o respetivo registo, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos.`;
            }

            if (tipoProcesso === "transcricao") {
                const complementoPortugues =
                    portugues === "pai" || portugues === "mãe" || portugues === "pais"
                        ? ", seus pais"
                        : portugues === "avô" || portugues === "avó" || portugues === "avós"
                            ? ", seus avós"
                            : portugues === "bisavós"
                                ? ", seus bisavós"
                                : "";
                textoProcura =
                    `<strong>${nome}</strong>, nascido em ${dataNascimento}, na cidade de ${cidadeNascimento} – ${ufNascimento}, residente ${residencia}, portador${genero === "homem" ? "" : "a"} do (${tipoDocumento}) nº ${documento}, expedido em ${dataExpedicao} pelo órgão ${orgaoExpedidor}, constitui como sua bastante procuradora a senhora, <strong>Dra. Cinthia Rocha Mello, inscrita na Ordem dos Advogados, sob n.º 64.594C</strong>, com domicilio profissional na Rua Antônio Alves do Espírito Santo, n. 3, Lote 1, 4D, Quinta da Gordalina, Código Postal 2415-440, Leiria, Portugal, a quem confere poderes especiais para requerer a transcrição de casamento entre <strong>${nubente1} e ${nubente2}</strong> ${complementoPortugues} em qualquer Conservatória do Registro Civil, em Portugal, podendo para o efeito declarar, praticar e assinar tudo o que seja necessário ao indicado fim, nomeadamente a declaração para fins de transcrição de casamento, inclusive desistir do pedido, e substabelecer os poderes que lhe foram conferidos.`;
            }

            // Filhos Menores
            if (tipoProcesso === "filhosMenores" && tipoProcuracao === "pm") {
                textoProcura =
                    `<strong>${nomeMaeMenor}</strong>, ${nacionalidadeMae}, no estado civil de ${estadoCivilMae}, ${profissaoMae}, com residência habitual em ${residenciaMae}, portadora do documento de identificação (${tipoDocumentoMae}) n.º ${documentoMae}, com data de expedição em ${dataExpedicaoMae} pelo órgão emissor ${orgaoExpedidorMae}, e <strong>${nomePaiMenor}</strong>, ${nacionalidadePai}, no estado civil de ${estadoCivilPai}, ${profissaoPai}, com residência habitual em ${residenciaPai}, portador do documento de identificação (${tipoDocumentoPai}) n.º ${documentoPai}, com data de expedição em ${dataExpedicaoPai} pelo órgão emissor ${orgaoExpedidorPai}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto} a quem confere os poderes especiais e necessários para os representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor}, e que seja lavrado o respetivo registo, por ser filh${generoLetra} de <strong>${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos. `;
            }

            if (tipoProcesso === "filhosMenores" && tipoProcuracao === "m") {
                textoProcura =
                    `<strong>${nomeMaeMenor}</strong>, ${nacionalidadeMae}, no estado civil de ${estadoCivilMae}, ${profissaoMae}, com residência habitual em ${residenciaMae}, portadora do documento de identificação (${tipoDocumentoMae}) n.º ${documentoMae}, com data de expedição em ${dataExpedicaoMae} pelo órgão emissor ${orgaoExpedidorMae}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto} a quem confere os poderes especiais e necessários para os representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor}, e que seja lavrado o respetivo registo, por ser filh${generoLetra} de <strong>${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos. `;
            }

            if (tipoProcesso === "filhosMenores" && tipoProcuracao === "p") {
                textoProcura =
                    `<strong>${nomePaiMenor}</strong>, ${nacionalidadePai}, no estado civil de ${estadoCivilPai}, ${profissaoPai}, com residência habitual em ${residenciaPai}, portador do documento de identificação (${tipoDocumentoPai}) n.º ${documentoPai}, com data de expedição em ${dataExpedicaoPai} pelo órgão emissor ${orgaoExpedidorPai}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto} a quem confere os poderes especiais e necessários para os representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.c) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor}, e que seja lavrado o respetivo registo, por ser filh${generoLetra} de <strong>${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos. `;
            }

            // Netos Menor
            if (tipoProcesso === "netosMenor" && tipoProcuracao === "pm") {
                textoProcura =
                    `<strong>${nomeMaeMenor}</strong>, ${nacionalidadeMae}, no estado civil de ${estadoCivilMae}, ${profissaoMae}, com residência habitual em ${residenciaMae}, portadora do documento de identificação (${tipoDocumentoMae}) n.º ${documentoMae}, com data de expedição em ${dataExpedicaoMae} pelo órgão emissor ${orgaoExpedidorMae}, e <strong>${nomePaiMenor}</strong>, ${nacionalidadePai}, no estado civil de ${estadoCivilPai}, ${profissaoPai}, com residência habitual em ${residenciaPai}, portador do documento de identificação (${tipoDocumentoPai}) n.º ${documentoPai}, com data de expedição em ${dataExpedicaoPai} pelo órgão emissor ${orgaoExpedidorPai}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto} a quem confere os poderes especiais e necessários para os representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.d) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor}, e que seja lavrado o respetivo registo, por ser filh${generoLetra} de <strong>${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos. `;
            }

            if (tipoProcesso === "netosMenor" && tipoProcuracao === "m") {
                textoProcura =
                    `<strong>${nomeMaeMenor}</strong>, ${nacionalidadeMae}, no estado civil de ${estadoCivilMae}, ${profissaoMae}, com residência habitual em ${residenciaMae}, portadora do documento de identificação (${tipoDocumentoMae}) n.º ${documentoMae}, com data de expedição em ${dataExpedicaoMae} pelo órgão emissor ${orgaoExpedidorMae}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto} a quem confere os poderes especiais e necessários para os representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.d) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor}, e que seja lavrado o respetivo registo, por ser filh${generoLetra} de <strong>${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos. `;
            }

            if (tipoProcesso === "netosMenor" && tipoProcuracao === "p") {
                textoProcura =
                    `<strong>${nomePaiMenor}</strong>, ${nacionalidadePai}, no estado civil de ${estadoCivilPai}, ${profissaoPai}, com residência habitual em ${residenciaPai}, portador do documento de identificação (${tipoDocumentoPai}) n.º ${documentoPai}, com data de expedição em ${dataExpedicaoPai} pelo órgão emissor ${orgaoExpedidorPai}, constitui ${adv === "carlaossuna" ? dadosDraCarlaOssuna : dadosDrJoseAlberto} a quem confere os poderes especiais e necessários para os representar perante a Conservatória dos Registos Centrais de Lisboa/Arquivo Distrital do Porto, ao abrigo do art. 1º, nº 1, al.d) da Lei da Nacionalidade nº 37/81, de 3 de Outubro, com sua posterior alteração pela Lei Orgânica n.º 2/2020, requerer a atribuição da Nacionalidade Portuguesa d${generoLetra} noss${generoLetra} filh${generoLetra} <strong>${nomeMenor}</strong>, nascid${generoLetra} em ${dataNascimentoMenor}, na cidade de ${cidadeNascimentoMenor}, no estado de ${estadoNascimento}, portador${genero === "homem" ? "" : "a"} do documento de identificação (${tipoDocumentoMenor}) n.° ${documentoMenor}, com data de expedição em ${dataDocumentoMenor} pelo órgão ${orgaoExpedidorMenor}, e que seja lavrado o respetivo registo, por ser filh${generoLetra} de <strong>${portugues} ${portugues === "pai" ? "português" : "portuguesa"}</strong>, promovendo, se necessário, a inscrição do respetivo nascimento, fixação do nome, praticando e assinando tudo o que seja necessário ao indicado fim, podendo prestar declarações e substabelecer os poderes que lhe foram conferidos. `;
            }

            if (tipoProcesso === "homologacaoDivorcio") {
                textoProcura = `<strong>${nomePt}</strong>, luso-brasileiro(a), ${profissaoPt}, Cartão do Cidadão n° ${cartaoCidadao}, com data de validade em ${dataValidadeCC}, com residência habitual em ${endPt} e <strong>${nomeExConjuge}</strong>, nacionalidade ${nacionalidadeExConjuge}, ${profissaoExConjuge}, portador(a) do documento de identificação n° ${docIdExConjuge}, com data expedição em ${dataExpedicaoExConjuge}, órgão expeditor ${orgaoExpedidorExConjuge}, com residência habitual em ${endExConjuge}, CEP ${cepExConjuge}, ${estadoExConjuge} - Brasil, constitui ${dadosDraCarlaOssuna} a quem conferem poderes especiais para, perante o Tribunal da Relação de Lisboa, requerer a Homologação da Sentença Estrangeira e posterior Transcrição do Divórcio, podendo para o efeito declarar, praticar e assinar tudo o que seja necessário ao indicado fim, nomeadamente a declaração para fins de inscrição de nascimento ou de atribuição da nacionalidade, podendo, se necessário, substabelecer os poderes que lhe forem conferidos.`
            }

            function wrapWordHtml({ titulo, corpo, rodapeLocalData, assinatura }) {
                return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>Procuração</title>
<style>
  body { font-family: "Aptos", Arial, sans-serif; font-size: 12pt; }
  h1 { font-size: 12pt; text-align: center; }
  p { text-align: justify; }
</style>
</head>
<body>
  <h1>${titulo}</h1>
  <p style="text-align: justify;">${corpo}</p>
  <p style="text-align: right;">${rodapeLocalData}</p>
  <p style="margin-top: 100px; text-align:center;">
    ${assinatura}
  </p>
</body>
</html>`;
            }

            let conteudo = "";
            const tituloPadrao =
                tipoProcesso === "filhosMaiores" ? "PROCURAÇÃO - FILHO MAIOR" :
                    tipoProcesso === "netosMaior" ? "PROCURAÇÃO - NETOS" :
                        tipoProcesso === "matrimonio" ? "PROCURAÇÃO - MATRIMÔNIO" :
                            tipoProcesso === "transcricao" ? "PROCURAÇÃO - TRANSCRIÇÃO" :
                                "PROCURAÇÃO";

            if (tipoProcesso === 'filhosMenores' && tipoProcuracao === 'pm') {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO - FILHO MENOR",
                    corpo: textoProcura,
                    rodapeLocalData: `${cidadeMae} - ${ufMae}, ${dataFormatada}`,
                    assinatura: `_______________________________________________<br>${nomeMaeMenor}<br><br><br><br>
_______________________________________________<br>${nomePaiMenor}<br>`
                });
            } else if (tipoProcesso === 'filhosMenores' && tipoProcuracao === 'm') {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO - FILHO MENOR",
                    corpo: textoProcura,
                    rodapeLocalData: `${cidadeMae} - ${ufMae}, ${dataFormatada}`,
                    assinatura: `_______________________________________________<br>${nomeMaeMenor}<br>`
                });
            } else if (tipoProcesso === 'filhosMenores' && tipoProcuracao === 'p') {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO - FILHO MENOR",
                    corpo: textoProcura,
                    rodapeLocalData: `${cidadePai} - ${ufPai}, ${dataFormatada}`,
                    assinatura: `_______________________________________________<br>${nomePaiMenor}<br>`
                });
            } else if (tipoProcesso === 'netosMenor' && tipoProcuracao === 'pm') {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO - NETOS",
                    corpo: textoProcura,
                    rodapeLocalData: `${cidadeMae} - ${ufMae}, ${dataFormatada}`,
                    assinatura: `_______________________________________________<br>${nomeMaeMenor}<br><br><br><br>
_______________________________________________<br>${nomePaiMenor}<br>`
                });
            } else if (tipoProcesso === 'netosMenor' && tipoProcuracao === 'm') {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO - NETOS",
                    corpo: textoProcura,
                    rodapeLocalData: `${cidadeMae} - ${ufMae}, ${dataFormatada}`,
                    assinatura: `_______________________________________________<br>${nomeMaeMenor}<br>`
                });
            } else if (tipoProcesso === 'netosMenor' && tipoProcuracao === 'p') {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO - NETOS",
                    corpo: textoProcura,
                    rodapeLocalData: `${cidadePai} - ${ufPai}, ${dataFormatada}`,
                    assinatura: `_______________________________________________<br>${nomePaiMenor}<br>`
                });
            } else if (tipoProcesso === 'transcricao') {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO - TRANSCRIÇÃO",
                    corpo: textoProcura,
                    rodapeLocalData: `${cidade} - ${uf}, __________ de _________________ de ${ano}`,
                    assinatura: `_______________________________________________<br>${nome}<br>(Assinatura com firma reconhecida por autenticidade)`
                });
            }
            else if (tipoProcesso === 'homologacaoDivorcio') {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO",
                    corpo: textoProcura,
                    rodapeLocalData: `___________________ - __________, __________ de _________________ de ${ano}`,
                    assinatura: `_______________________________________________<br>${nomePt}<br>(Assinatura com firma reconhecida por autenticidade)<br><br><br><br>_______________________________________________<br>${nomeExConjuge}<br>(Assinatura com firma reconhecida por autenticidade)`
                });
            }
            else {
                // Default para adultos (filhosMaiores, netosMaior, matrimonio)
                conteudo = wrapWordHtml({
                    titulo: tituloPadrao,
                    corpo: textoProcura,
                    rodapeLocalData: `${cidade} - ${uf}, ${dataFormatada}`,
                    assinatura: `_______________________________________________<br>${nome}<br>`
                });
            }

            const blob = new Blob(['\ufeff', conteudo], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `procuracao - ${nome || 'documento'}.doc`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
            let mensagem = "Ocorreu um erro inesperado.";
            if (String(error.message).includes("genero")) {
                mensagem = "Selecione o gênero.";
            } else if (String(error.message).includes("adv")) {
                mensagem = "Selecione o advogado responsável.";
            } else if (String(error.message).includes("value")) {
                mensagem = "Existem campos obrigatórios não preenchidos.";
            }
            errorAlert(mensagem);
        }
    };
});
