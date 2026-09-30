function errorAlert(message) {
    alert(
        "Não foi possível gerar o documento.\n" +
        message +
        "\nVerifique os campos e tente novamente."
    );
}

function capitalizeWords(str = "") {
    if (!str) return "";

    const small = new Set([
        "de", "da", "do", "das", "dos",
        "e", "a", "o", "as", "os",
        "em", "para", "por", "com",
        "no", "na", "nos", "nas"
    ]);

    const words = String(str)
        .trim()
        .toLowerCase()
        .split(/\s+/);

    return words
        .map((word, index) => {
            if (
                index !== 0 &&
                index !== words.length - 1 &&
                small.has(word)
            ) {
                return word;
            }

            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}

function show(element) {
    if (element) {
        element.classList.remove("hidden");
    }
}

function hide(element) {
    if (element) {
        element.classList.add("hidden");
    }
}

function safeVal(element) {
    return element ? element.value : "";
}

function normalizarTexto(valor = "") {
    return String(valor)
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Retorna o vínculo correto com o ascendente português.
 *
 * Exemplos:
 * - por ser filho de mãe portuguesa
 * - por ser filha de pai português
 * - por ser neto de avô português
 * - por ser neta de avó portuguesa
 */
function obterVinculoPortugues(tipoProcesso, portugues, genero) {
    const processo = normalizarTexto(tipoProcesso);
    const ascendente = normalizarTexto(portugues);

    const generoMasculino = genero === "homem";
    const generoFeminino = genero === "mulher";

    if (!generoMasculino && !generoFeminino) {
        throw new Error("genero: selecione o gênero do requerente.");
    }

    const processoFilho =
        processo === "filhosmaiores" ||
        processo === "filhosmenores";

    const processoNeto =
        processo === "netosmaior" ||
        processo === "netosmenor";

    if (processoFilho) {
        const descendente = generoMasculino ? "filho" : "filha";

        if (ascendente === "mae") {
            return `por ser ${descendente} de mãe portuguesa`;
        }

        if (ascendente === "pai") {
            return `por ser ${descendente} de pai português`;
        }

        throw new Error(
            "portugues: para processos de filhos, selecione pai ou mãe."
        );
    }

    if (processoNeto) {
        const descendente = generoMasculino ? "neto" : "neta";

        if (ascendente === "avo") {
            /*
             * Como "avô" e "avó" são iguais após a remoção dos acentos,
             * primeiro utilizamos o valor original para diferenciar.
             */
            const valorOriginal = String(portugues).trim().toLowerCase();

            if (valorOriginal === "avô") {
                return `por ser ${descendente} de avô português`;
            }

            if (valorOriginal === "avó") {
                return `por ser ${descendente} de avó portuguesa`;
            }
        }

        /*
         * Suporte a valores alternativos que possam existir no HTML.
         */
        if (
            ascendente === "avo masculino" ||
            ascendente === "avo portugues"
        ) {
            return `por ser ${descendente} de avô português`;
        }

        if (
            ascendente === "avo feminino" ||
            ascendente === "avo portuguesa"
        ) {
            return `por ser ${descendente} de avó portuguesa`;
        }

        throw new Error(
            "portugues: para processos de netos, selecione avô ou avó."
        );
    }

    return "";
}

document.addEventListener("DOMContentLoaded", () => {
    const el = id => document.getElementById(id);

    const tipoProcessoEl = el("tipoProcesso");
    const grupoPortugues = el("grupoPortugues");
    const grupoConjuge = el("grupoConjuge");
    const grupoDataCasamento = el("grupoDataCasamento");
    const grupoNubentes = el("grupoNubentes");
    const grupoPais = el("grupoPais");
    const procuracoesNormais = el("procuracoesNormais");
    const inputFilhosMenores = el("inputFilhosMenores");
    const inputMae = el("mae");
    const inputPai = el("pai");
    const selecaoAdv = el("selecaoAdv");
    const selectTipoProcuracao = el("tipoProcuracao");
    const homologacaoDivorcio = el("inputHomologacaoDivorcio");
    const inputGenero = el("inputGenero");

    /**
     * Atualiza as opções do campo de ascendente português.
     *
     * Atenção:
     * se o seu campo #portugues já for preenchido por outro processo,
     * esta função pode ser removida.
     */
    function atualizarOpcoesPortugues(tipoProcesso) {
        const selectPortugues = el("portugues");

        if (!selectPortugues) {
            return;
        }

        const valorAtual = selectPortugues.value;

        if (
            tipoProcesso === "filhosMaiores" ||
            tipoProcesso === "filhosMenores"
        ) {
            selectPortugues.innerHTML = `
                <option value="">Selecione</option>
                <option value="mãe">Mãe portuguesa</option>
                <option value="pai">Pai português</option>
            `;

            if (["mãe", "pai"].includes(valorAtual)) {
                selectPortugues.value = valorAtual;
            }
        } else if (
            tipoProcesso === "netosMaior" ||
            tipoProcesso === "netosMenor"
        ) {
            selectPortugues.innerHTML = `
                <option value="">Selecione</option>
                <option value="avô">Avô português</option>
                <option value="avó">Avó portuguesa</option>
            `;

            if (["avô", "avó"].includes(valorAtual)) {
                selectPortugues.value = valorAtual;
            }
        }
    }

    window.atualizarCampos = function atualizarCampos() {
        const tipo = safeVal(tipoProcessoEl);
        const tipoProcuracao = safeVal(selectTipoProcuracao);

        hide(inputFilhosMenores);
        show(procuracoesNormais);
        hide(inputMae);
        hide(inputPai);
        hide(homologacaoDivorcio);
        hide(inputGenero);

        if (
            tipo === "filhosMenores" ||
            tipo === "netosMenor"
        ) {
            atualizarOpcoesPortugues(tipo);

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

            if (tipoProcuracao === "m") {
                show(inputMae);
                hide(inputPai);
            } else if (tipoProcuracao === "p") {
                show(inputPai);
                hide(inputMae);
            } else if (tipoProcuracao === "pm") {
                show(inputMae);
                show(inputPai);
            } else {
                hide(inputMae);
                hide(inputPai);
            }
        } else if (tipo === "homologacaoDivorcio") {
            hide(grupoPortugues);
            hide(grupoNubentes);
            hide(grupoConjuge);
            hide(grupoDataCasamento);
            hide(grupoPais);
            hide(selecaoAdv);
            show(homologacaoDivorcio);
            hide(procuracoesNormais);
            hide(inputGenero);
        } else {
            show(inputGenero);
            show(procuracoesNormais);
            hide(inputMae);
            hide(inputPai);
            hide(homologacaoDivorcio);

            if (tipo === "filhosMaiores") {
                atualizarOpcoesPortugues(tipo);

                show(grupoPortugues);
                hide(grupoNubentes);
                show(grupoPais);
                hide(grupoConjuge);
                hide(grupoDataCasamento);
                show(selecaoAdv);
            } else if (tipo === "netosMaior") {
                atualizarOpcoesPortugues(tipo);

                /*
                 * Alterado para exibir grupoPortugues, pois agora
                 * é necessário selecionar avô ou avó.
                 */
                show(grupoPortugues);
                hide(grupoNubentes);
                show(grupoPais);
                hide(grupoConjuge);
                hide(grupoDataCasamento);
                show(selecaoAdv);
            } else if (tipo === "matrimonio") {
                show(grupoConjuge);
                show(grupoDataCasamento);
                hide(grupoPortugues);
                hide(grupoNubentes);
                show(grupoPais);
                show(selecaoAdv);
            } else if (tipo === "transcricao") {
                show(grupoPortugues);
                show(grupoNubentes);
                hide(grupoConjuge);
                hide(grupoDataCasamento);
                hide(grupoPais);
                hide(selecaoAdv);
            } else {
                hide(grupoPortugues);
                hide(grupoNubentes);
                hide(grupoConjuge);
                hide(grupoDataCasamento);
                show(grupoPais);
                show(selecaoAdv);
                hide(procuracoesNormais);
            }
        }
    };

    if (selectTipoProcuracao) {
        selectTipoProcuracao.addEventListener(
            "change",
            window.atualizarCampos
        );
    }

    if (tipoProcessoEl) {
        tipoProcessoEl.addEventListener(
            "change",
            window.atualizarCampos
        );
    }

    window.gerarDocumento = function gerarDocumento() {
        try {
            const tipoProcesso = safeVal(el("tipoProcesso"));
            const portugues = safeVal(el("portugues"));

            const generoRadio = document.querySelector(
                'input[name="genero"]:checked'
            );

            const genero = generoRadio
                ? generoRadio.value
                : null;

            const nome = capitalizeWords(safeVal(el("nome")));
            const nacionalidade = safeVal(el("nacionalidade"));
            const estadoCivil = safeVal(el("estadoCivil"));
            const profissao = safeVal(el("profissao"));
            const dataNascimento = safeVal(el("dataNascimento"));
            const cidadeNascimento = safeVal(el("cidadeNascimento"));
            const ufNascimento = safeVal(el("ufNascimento"));
            const nomePai = capitalizeWords(safeVal(el("nomePai")));
            const nomeMae = capitalizeWords(safeVal(el("nomeMae")));

            const nomeConjuge = capitalizeWords(
                safeVal(el("nomeConjuge"))
            );

            const dataCasamento = safeVal(el("dataCasamento"));

            const nubente1 = capitalizeWords(
                safeVal(el("nubente1"))
            );

            const nubente2 = capitalizeWords(
                safeVal(el("nubente2"))
            );

            const endereco = safeVal(el("endereco"));
            const cidade = safeVal(el("cidade"));
            const uf = safeVal(el("uf"));
            const cep = safeVal(el("cep"));
            const pais = safeVal(el("pais"));

            const residencia =
                `${endereco}, ${cidade} - ${uf}, CEP ${cep}, ${pais}`
                    .replaceAll(" ,", ",");

            const tipoDocumento = safeVal(el("tipoDocumento"));
            const documento = safeVal(el("documento"));
            const dataExpedicao = safeVal(el("dataExpedicao"));
            const orgaoExpedidor = safeVal(el("orgaoExpedidor"));

            /*
             * Dados do menor.
             */
            const nomeMenor = capitalizeWords(
                safeVal(el("nomeMenor"))
            );

            const dataNascimentoMenor =
                safeVal(el("dataNascimentoMenor"));

            const cidadeNascimentoMenor =
                safeVal(el("cidadeNascimentoMenor"));

            const estadoNascimento =
                safeVal(el("estadoNascimento"));

            const tipoDocumentoMenor =
                safeVal(el("tipoDocumentoMenor"));

            const documentoMenor =
                safeVal(el("documentoMenor"));

            const dataDocumentoMenor =
                safeVal(el("dataDocumentoMenor"));

            const orgaoExpedidorMenor =
                safeVal(el("orgaoExpedidorMenor"));

            /*
             * Dados da mãe.
             */
            const nomeMaeMenor = capitalizeWords(
                safeVal(el("nomeMaeMenor"))
            );

            const nacionalidadeMae =
                safeVal(el("nacionalidadeMae"));

            const estadoCivilMae =
                safeVal(el("estadoCivilMae"));

            const profissaoMae =
                safeVal(el("profissaoMae"));

            const enderecoMae =
                safeVal(el("enderecoMae"));

            const cidadeMae =
                safeVal(el("cidadeMae"));

            const ufMae =
                safeVal(el("ufMae"));

            const cepMae =
                safeVal(el("cepMae"));

            const paisMae =
                safeVal(el("paisMae"));

            const tipoDocumentoMae =
                safeVal(el("tipoDocumentoMae"));

            const documentoMae =
                safeVal(el("documentoMae"));

            const dataExpedicaoMae =
                safeVal(el("dataExpedicaoMae"));

            const orgaoExpedidorMae =
                safeVal(el("orgaoExpedidorMae"));

            const residenciaMae =
                `${enderecoMae}, ${cidadeMae} - ${ufMae}, CEP ${cepMae}, ${paisMae}`
                    .replaceAll(" ,", ",");

            /*
             * Dados do pai.
             */
            const nomePaiMenor = capitalizeWords(
                safeVal(el("nomePaiMenor"))
            );

            const nacionalidadePai =
                safeVal(el("nacionalidadePai"));

            const estadoCivilPai =
                safeVal(el("estadoCivilPai"));

            const profissaoPai =
                safeVal(el("profissaoPai"));

            const enderecoPai =
                safeVal(el("enderecoPai"));

            const cidadePai =
                safeVal(el("cidadePai"));

            const ufPai =
                safeVal(el("ufPai"));

            const cepPai =
                safeVal(el("cepPai"));

            const paisPai =
                safeVal(el("paisPai"));

            const tipoDocumentoPai =
                safeVal(el("tipoDocumentoPai"));

            const documentoPai =
                safeVal(el("documentoPai"));

            const dataExpedicaoPai =
                safeVal(el("dataExpedicaoPai"));

            const orgaoExpedidorPai =
                safeVal(el("orgaoExpedidorPai"));

            const residenciaPai =
                `${enderecoPai}, ${cidadePai} - ${ufPai}, CEP ${cepPai}, ${paisPai}`
                    .replaceAll(" ,", ",");

            /*
             * Homologação de divórcio.
             */
            const nomePt = capitalizeWords(
                safeVal(el("nomePt"))
            );

            const profissaoPt =
                safeVal(el("profissaoPt"));

            const cartaoCidadao =
                safeVal(el("cartaoCidadao"));

            const dataValidadeCC =
                safeVal(el("dataValidadeCC"));

            const endPt =
                safeVal(el("endPt"));

            const nomeExConjuge = capitalizeWords(
                safeVal(el("nomeExConjuge"))
            );

            const nacionalidadeExConjuge =
                safeVal(el("nacionalidadeExConjuge"));

            const profissaoExConjuge =
                safeVal(el("profissaoExConjuge"));

            const docIdExConjuge =
                safeVal(el("docIdExConjuge"));

            const dataExpedicaoExConjuge =
                safeVal(el("dataExpedicaoExConjuge"));

            const orgaoExpedidorExConjuge =
                safeVal(el("orgaoExpedidorExConjuge"));

            const endExConjuge =
                safeVal(el("endExConjuge"));

            const cepExConjuge =
                safeVal(el("cepExConjuge"));

            const estadoExConjuge =
                safeVal(el("estadoExConjuge"));

            const tipoProcuracao =
                safeVal(selectTipoProcuracao);

            const hoje = new Date();
            const dia = hoje.getDate();

            const mes = hoje.toLocaleString("pt-BR", {
                month: "long"
            });

            const ano = hoje.getFullYear();

            const dataFormatada =
                `${dia} de ${mes} de ${ano}`;

            const advRadio = document.querySelector(
                'input[name="adv"]:checked'
            );

            const adv = advRadio
                ? advRadio.value
                : null;

            /*
             * Validações.
             */
            if (
                tipoProcesso !== "homologacaoDivorcio" &&
                !genero
            ) {
                throw new Error(
                    "genero: selecione o gênero."
                );
            }

            if (
                !["transcricao", "homologacaoDivorcio"]
                    .includes(tipoProcesso) &&
                !adv
            ) {
                throw new Error(
                    "adv: selecione o advogado responsável."
                );
            }

            if (
                [
                    "filhosMaiores",
                    "filhosMenores",
                    "netosMaior",
                    "netosMenor"
                ].includes(tipoProcesso) &&
                !portugues
            ) {
                throw new Error(
                    "portugues: selecione o ascendente português."
                );
            }

            if (
                ["filhosMenores", "netosMenor"]
                    .includes(tipoProcesso) &&
                !["m", "p", "pm"].includes(tipoProcuracao)
            ) {
                throw new Error(
                    "tipoProcuracao: selecione quem assinará a procuração."
                );
            }

            const generoLetra =
                genero === "homem" ? "o" : "a";

            const generoNosso =
                genero === "homem" ? "nosso" : "nossa";

            const generoPortador =
                genero === "homem" ? "portador" : "portadora";

            /*
             * Texto legislativo centralizado.
             */
            const textoLeiNacionalidade =
                "com sua posterior alteração pela Lei Orgânica n.º 1/2026, de 18 de maio";

            const dadosDrJoseAlberto =
                'como seu bastante procurador o <strong>Dr. JOSÉ ALBERTO ARAÚJO DE JESUS</strong>, advogado inscrito na Ordem dos Advogados de Portugal, com cédula profissional sob o Nº 68714P, com morada profissional na SHS Quadra 6 Conjunto A Bloco A Sala 501, Complexo Brasil 21, Asa Sul - Código Postal 70316-102, Distrito Federal - Brasil,';

            let vinculoPortugues = "";

            if (
                [
                    "filhosMaiores",
                    "filhosMenores",
                    "netosMaior",
                    "netosMenor"
                ].includes(tipoProcesso)
            ) {
                vinculoPortugues = obterVinculoPortugues(
                    tipoProcesso,
                    portugues,
                    genero
                );
            }

            let textoProcura = "";

            /*
             * Neto maior.
             */
            if (tipoProcesso === "netosMaior") {
                textoProcura =
                    `<strong>${nome}</strong>, ` +
                    `${nacionalidade}, no estado civil de ${estadoCivil}, ` +
                    `${profissao}, nascid${generoLetra} em ${dataNascimento}, ` +
                    `na cidade de ${cidadeNascimento} – ${ufNascimento}, ` +
                    `filh${generoLetra} de ${nomePai} e ${nomeMae}, ` +
                    `residente em ${residencia}, ` +
                    `${generoPortador} do documento de identificação ` +
                    `(${tipoDocumento}) nº ${documento}, expedido em ` +
                    `${dataExpedicao} pelo órgão ${orgaoExpedidor}, ` +
                    `constitui ${dadosDrJoseAlberto} a quem confere poderes ` +
                    `especiais e necessários para ${generoLetra} representar ` +
                    `perante a Conservatória dos Registos Centrais de Lisboa/` +
                    `Arquivo Distrital do Porto, ao abrigo da Lei da ` +
                    `Nacionalidade n.º 37/81, de 3 de outubro, ` +
                    `${textoLeiNacionalidade}, requerer a Nacionalidade ` +
                    `Portuguesa pela via da atribuição, ao abrigo do artigo ` +
                    `1.º, n.º 1, alínea d), da Lei n.º 37/81, ` +
                    `<strong>${vinculoPortugues}</strong>, e depois promovendo, ` +
                    `se necessário, a inscrição do respetivo nascimento, ` +
                    `fixação do nome, praticando e assinando tudo o que seja ` +
                    `necessário ao indicado fim, podendo prestar declarações ` +
                    `e substabelecer os poderes que lhe foram conferidos. ` +
                    `No mais, declara que nunca foi condenad${generoLetra}, ` +
                    `com trânsito em julgado da sentença, pela prática de ` +
                    `crime punível com pena de prisão nos termos da ` +
                    `legislação portuguesa aplicável.`;
            }

            /*
             * Filho maior.
             */
            if (tipoProcesso === "filhosMaiores") {
                textoProcura =
                    `<strong>${nome}</strong>, ` +
                    `${nacionalidade}, no estado civil de ${estadoCivil}, ` +
                    `${profissao}, nascid${generoLetra} em ${dataNascimento}, ` +
                    `na cidade de ${cidadeNascimento} – ${ufNascimento}, ` +
                    `filh${generoLetra} de ${nomePai} e ${nomeMae}, ` +
                    `residente em ${residencia}, ` +
                    `${generoPortador} do documento de identificação ` +
                    `(${tipoDocumento}) nº ${documento}, expedido em ` +
                    `${dataExpedicao} pelo órgão ${orgaoExpedidor}, ` +
                    `constitui ${dadosDrJoseAlberto} a quem confere poderes ` +
                    `especiais e necessários para ${generoLetra} representar ` +
                    `perante a Conservatória dos Registos Centrais e/ou ` +
                    `Conservatória dos Registos Centrais de Lisboa/Arquivo ` +
                    `Distrital do Porto, ao abrigo do artigo 1.º, n.º 1, ` +
                    `alínea c), da Lei da Nacionalidade n.º 37/81, de 3 de ` +
                    `outubro, ${textoLeiNacionalidade}, requerer a ` +
                    `Nacionalidade Portuguesa pela via da atribuição, ` +
                    `<strong>${vinculoPortugues}</strong>, e que seja lavrado ` +
                    `o respetivo registo, promovendo, se necessário, a ` +
                    `inscrição do respetivo nascimento, fixação do nome, ` +
                    `praticando e assinando tudo o que seja necessário ao ` +
                    `indicado fim, podendo prestar declarações e ` +
                    `substabelecer os poderes que lhe foram conferidos.`;
            }

            /*
             * Casamento.
             */
            if (tipoProcesso === "matrimonio") {
                textoProcura =
                    `<strong>${nome}</strong>, ${nacionalidade}, ` +
                    `no estado civil de ${estadoCivil}, ${profissao}, ` +
                    `nascid${generoLetra} em ${dataNascimento}, na cidade ` +
                    `de ${cidadeNascimento} – ${ufNascimento}, ` +
                    `casad${generoLetra} com ${nomeConjuge}, desde ` +
                    `${dataCasamento}, residente em ${residencia}, ` +
                    `${generoPortador} do documento de identificação ` +
                    `(${tipoDocumento}) nº ${documento}, expedido em ` +
                    `${dataExpedicao} pelo órgão ${orgaoExpedidor}, ` +
                    `constitui ${dadosDrJoseAlberto} a quem confere poderes ` +
                    `especiais e necessários para ${generoLetra} representar ` +
                    `perante a Conservatória dos Registos Centrais de ` +
                    `Lisboa/Arquivo Distrital do Porto, ao abrigo do artigo ` +
                    `3.º da Lei da Nacionalidade n.º 37/81, de 3 de outubro, ` +
                    `${textoLeiNacionalidade}, requerer a Nacionalidade ` +
                    `Portuguesa pela via da aquisição, e que seja lavrado o ` +
                    `respetivo registo, promovendo, se necessário, a ` +
                    `inscrição do respetivo nascimento, fixação do nome, ` +
                    `praticando e assinando tudo o que seja necessário ao ` +
                    `indicado fim, podendo prestar declarações e ` +
                    `substabelecer os poderes que lhe foram conferidos.`;
            }

            /*
             * Transcrição.
             */
            if (tipoProcesso === "transcricao") {
                let complementoPortugues = "";

                if (
                    portugues === "pai" ||
                    portugues === "mãe" ||
                    portugues === "pais"
                ) {
                    complementoPortugues = ", seus pais";
                } else if (
                    portugues === "avô" ||
                    portugues === "avó" ||
                    portugues === "avós"
                ) {
                    complementoPortugues = ", seus avós";
                } else if (portugues === "bisavós") {
                    complementoPortugues = ", seus bisavós";
                }

                textoProcura =
                    `<strong>${nome}</strong>, nascid${generoLetra} em ` +
                    `${dataNascimento}, na cidade de ${cidadeNascimento} – ` +
                    `${ufNascimento}, residente em ${residencia}, ` +
                    `${generoPortador} do documento de identificação ` +
                    `(${tipoDocumento}) nº ${documento}, expedido em ` +
                    `${dataExpedicao} pelo órgão ${orgaoExpedidor}, ` +
                    `constitui como sua bastante procuradora a senhora ` +
                    `<strong>Dra. Cinthia Rocha Mello, inscrita na Ordem ` +
                    `dos Advogados, sob n.º 64.594C</strong>, com domicílio ` +
                    `profissional na Rua Antônio Alves do Espírito Santo, ` +
                    `n.º 3, Lote 1, 4D, Quinta da Gordalina, Código Postal ` +
                    `2415-440, Leiria, Portugal, a quem confere poderes ` +
                    `especiais para requerer a transcrição de casamento ` +
                    `entre <strong>${nubente1} e ${nubente2}</strong>` +
                    `${complementoPortugues} em qualquer Conservatória do ` +
                    `Registo Civil, em Portugal, podendo para o efeito ` +
                    `declarar, praticar e assinar tudo o que seja necessário ` +
                    `ao indicado fim, nomeadamente a declaração para fins ` +
                    `de transcrição de casamento, inclusive desistir do ` +
                    `pedido, e substabelecer os poderes que lhe foram ` +
                    `conferidos.`;
            }

            /**
             * Monta o início da procuração dos responsáveis pelo menor.
             */
            function obterQualificacaoResponsaveis() {
                const qualificacaoMae =
                    `<strong>${nomeMaeMenor}</strong>, ` +
                    `${nacionalidadeMae}, no estado civil de ` +
                    `${estadoCivilMae}, ${profissaoMae}, com residência ` +
                    `habitual em ${residenciaMae}, portadora do documento ` +
                    `de identificação (${tipoDocumentoMae}) n.º ` +
                    `${documentoMae}, com data de expedição em ` +
                    `${dataExpedicaoMae} pelo órgão emissor ` +
                    `${orgaoExpedidorMae}`;

                const qualificacaoPai =
                    `<strong>${nomePaiMenor}</strong>, ` +
                    `${nacionalidadePai}, no estado civil de ` +
                    `${estadoCivilPai}, ${profissaoPai}, com residência ` +
                    `habitual em ${residenciaPai}, portador do documento ` +
                    `de identificação (${tipoDocumentoPai}) n.º ` +
                    `${documentoPai}, com data de expedição em ` +
                    `${dataExpedicaoPai} pelo órgão emissor ` +
                    `${orgaoExpedidorPai}`;

                if (tipoProcuracao === "pm") {
                    return `${qualificacaoMae}, e ${qualificacaoPai}`;
                }

                if (tipoProcuracao === "m") {
                    return qualificacaoMae;
                }

                if (tipoProcuracao === "p") {
                    return qualificacaoPai;
                }

                throw new Error(
                    "tipoProcuracao: selecione os responsáveis."
                );
            }

            /**
             * Gera filhos menores e netos menores.
             */
            if (
                tipoProcesso === "filhosMenores" ||
                tipoProcesso === "netosMenor"
            ) {
                const qualificacaoResponsaveis =
                    obterQualificacaoResponsaveis();

                const artigo =
                    tipoProcesso === "filhosMenores"
                        ? "artigo 1.º, n.º 1, alínea c)"
                        : "artigo 1.º, n.º 1, alínea d)";

                const pronomeRepresentacao =
                    tipoProcuracao === "pm"
                        ? "os representar"
                        : "o representar";

                textoProcura =
                    `${qualificacaoResponsaveis}, constitui ` +
                    `${dadosDrJoseAlberto} a quem confere os poderes ` +
                    `especiais e necessários para ${pronomeRepresentacao} ` +
                    `perante a Conservatória dos Registos Centrais de ` +
                    `Lisboa/Arquivo Distrital do Porto, ao abrigo do ` +
                    `${artigo} da Lei da Nacionalidade n.º 37/81, de 3 de ` +
                    `outubro, ${textoLeiNacionalidade}, requerer a ` +
                    `atribuição da Nacionalidade Portuguesa d${generoLetra} ` +
                    `${generoNosso} filh${generoLetra} ` +
                    `<strong>${nomeMenor}</strong>, nascid${generoLetra} em ` +
                    `${dataNascimentoMenor}, na cidade de ` +
                    `${cidadeNascimentoMenor}, no estado de ` +
                    `${estadoNascimento}, ${generoPortador} do documento ` +
                    `de identificação (${tipoDocumentoMenor}) n.º ` +
                    `${documentoMenor}, com data de expedição em ` +
                    `${dataDocumentoMenor} pelo órgão ` +
                    `${orgaoExpedidorMenor}, e que seja lavrado o respetivo ` +
                    `registo, <strong>${vinculoPortugues}</strong>, ` +
                    `promovendo, se necessário, a inscrição do respetivo ` +
                    `nascimento, fixação do nome, praticando e assinando ` +
                    `tudo o que seja necessário ao indicado fim, podendo ` +
                    `prestar declarações e substabelecer os poderes que ` +
                    `lhe foram conferidos.`;
            }

            /*
             * Homologação de divórcio.
             */
            if (tipoProcesso === "homologacaoDivorcio") {
                textoProcura =
                    `<strong>${nomePt}</strong>, luso-brasileiro(a), ` +
                    `${profissaoPt}, Cartão de Cidadão n.º ` +
                    `${cartaoCidadao}, com data de validade em ` +
                    `${dataValidadeCC}, com residência habitual em ` +
                    `${endPt}, e <strong>${nomeExConjuge}</strong>, ` +
                    `de nacionalidade ${nacionalidadeExConjuge}, ` +
                    `${profissaoExConjuge}, portador(a) do documento de ` +
                    `identificação n.º ${docIdExConjuge}, com data de ` +
                    `expedição em ${dataExpedicaoExConjuge}, pelo órgão ` +
                    `expedidor ${orgaoExpedidorExConjuge}, com residência ` +
                    `habitual em ${endExConjuge}, CEP ${cepExConjuge}, ` +
                    `${estadoExConjuge} - Brasil, constitui ` +
                    `${dadosDrJoseAlberto} a quem conferem poderes ` +
                    `especiais para, perante o Tribunal da Relação de ` +
                    `Lisboa, requerer a Homologação da Sentença Estrangeira ` +
                    `e posterior Transcrição do Divórcio, podendo para o ` +
                    `efeito declarar, praticar e assinar tudo o que seja ` +
                    `necessário ao indicado fim, nomeadamente a declaração ` +
                    `para fins de inscrição de nascimento ou de atribuição ` +
                    `da nacionalidade, podendo, se necessário, substabelecer ` +
                    `os poderes que lhe forem conferidos.`;
            }

            if (!textoProcura) {
                throw new Error(
                    "tipoProcesso: não foi possível identificar o modelo."
                );
            }

            function wrapWordHtml({
                titulo,
                corpo,
                rodapeLocalData,
                assinatura
            }) {
                return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="utf-8">
    <title>Procuração</title>
    <style>
        @page {
            size: A4;
            margin: 2.5cm;
        }

        body {
            font-family: "Aptos", Arial, sans-serif;
            font-size: 12pt;
            line-height: 1.5;
        }

        h1 {
            font-size: 12pt;
            text-align: center;
            margin-bottom: 30px;
        }

        p {
            text-align: justify;
        }
    </style>
</head>
<body>
    <h1>${titulo}</h1>

    <p style="text-align: justify;">
        ${corpo}
    </p>

    <p style="text-align: right;">
        ${rodapeLocalData}
    </p>

    <p style="margin-top: 100px; text-align: center;">
        ${assinatura}
    </p>
</body>
</html>`;
            }

            let conteudo = "";

            const tituloPadrao =
                tipoProcesso === "filhosMaiores"
                    ? "PROCURAÇÃO - FILHO MAIOR"
                    : tipoProcesso === "netosMaior"
                        ? "PROCURAÇÃO - NETOS"
                        : tipoProcesso === "matrimonio"
                            ? "PROCURAÇÃO - MATRIMÔNIO"
                            : tipoProcesso === "transcricao"
                                ? "PROCURAÇÃO - TRANSCRIÇÃO"
                                : "PROCURAÇÃO";

            if (
                ["filhosMenores", "netosMenor"]
                    .includes(tipoProcesso)
            ) {
                let rodapeLocalData = "";
                let assinatura = "";

                if (tipoProcuracao === "pm") {
                    rodapeLocalData =
                        `${cidadeMae} - ${ufMae}, ${dataFormatada}`;

                    assinatura =
                        `_______________________________________________` +
                        `<br>${nomeMaeMenor}` +
                        `<br><br><br><br>` +
                        `_______________________________________________` +
                        `<br>${nomePaiMenor}<br>`;
                } else if (tipoProcuracao === "m") {
                    rodapeLocalData =
                        `${cidadeMae} - ${ufMae}, ${dataFormatada}`;

                    assinatura =
                        `_______________________________________________` +
                        `<br>${nomeMaeMenor}<br>`;
                } else {
                    rodapeLocalData =
                        `${cidadePai} - ${ufPai}, ${dataFormatada}`;

                    assinatura =
                        `_______________________________________________` +
                        `<br>${nomePaiMenor}<br>`;
                }

                conteudo = wrapWordHtml({
                    titulo:
                        tipoProcesso === "filhosMenores"
                            ? "PROCURAÇÃO - FILHO MENOR"
                            : "PROCURAÇÃO - NETOS",
                    corpo: textoProcura,
                    rodapeLocalData,
                    assinatura
                });
            } else if (tipoProcesso === "transcricao") {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO - TRANSCRIÇÃO",
                    corpo: textoProcura,
                    rodapeLocalData:
                        `${cidade} - ${uf}, ` +
                        `__________ de _________________ de ${ano}`,
                    assinatura:
                        `_______________________________________________` +
                        `<br>${nome}` +
                        `<br>(Assinatura com firma reconhecida por autenticidade)`
                });
            } else if (
                tipoProcesso === "homologacaoDivorcio"
            ) {
                conteudo = wrapWordHtml({
                    titulo: "PROCURAÇÃO",
                    corpo: textoProcura,
                    rodapeLocalData:
                        `___________________ - __________, ` +
                        `__________ de _________________ de ${ano}`,
                    assinatura:
                        `_______________________________________________` +
                        `<br>${nomePt}` +
                        `<br>(Assinatura com firma reconhecida por autenticidade)` +
                        `<br><br><br><br>` +
                        `_______________________________________________` +
                        `<br>${nomeExConjuge}` +
                        `<br>(Assinatura com firma reconhecida por autenticidade)`
                });
            } else {
                conteudo = wrapWordHtml({
                    titulo: tituloPadrao,
                    corpo: textoProcura,
                    rodapeLocalData:
                        `${cidade} - ${uf}, ${dataFormatada}`,
                    assinatura:
                        `_______________________________________________` +
                        `<br>${nome}<br>`
                });
            }

            const blob = new Blob(
                ["\ufeff", conteudo],
                {
                    type: "application/msword;charset=utf-8"
                }
            );

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            const nomeArquivo =
                nome ||
                nomeMenor ||
                nomePt ||
                "documento";

            link.href = url;
            link.download = `procuracao - ${nomeArquivo}.doc`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
        } catch (error) {
            console.error(error);

            const erro = String(
                error && error.message
                    ? error.message
                    : error
            );

            let mensagem =
                "Ocorreu um erro inesperado.";

            if (erro.includes("genero")) {
                mensagem =
                    "Selecione o gênero do requerente.";
            } else if (erro.includes("adv")) {
                mensagem =
                    "Selecione o advogado responsável.";
            } else if (erro.includes("portugues")) {
                mensagem =
                    erro.replace("portugues:", "").trim();
            } else if (
                erro.includes("tipoProcuracao")
            ) {
                mensagem =
                    "Selecione quem assinará a procuração.";
            } else if (
                erro.includes("tipoProcesso")
            ) {
                mensagem =
                    "Selecione um tipo de processo válido.";
            } else if (erro.includes("value")) {
                mensagem =
                    "Existem campos obrigatórios não preenchidos.";
            }

            errorAlert(mensagem);
        }
    };

    /*
     * Executa ao carregar a página para garantir que os campos
     * sejam exibidos de acordo com os valores atuais.
     */
    window.atualizarCampos();
});
