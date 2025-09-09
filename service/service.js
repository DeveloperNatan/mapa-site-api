const prisma = require("../data/prisma");

exports.EncontrarUm = async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    const localizacao = await prisma.localizacaoPA.findUnique({
      where: {
        id: id,
      },
      include: {
        RelacionamentoPA: {
          include: {
            HistoricoPA: true,
          },
        },
      },
    });

    if (!localizacao) {
      res.status(404).res.json({ error: "Not found", details: error.message });
    }

    res.json(localizacao);
  } catch (error) {
    res.json({ error: "Erro ao buscar", details: error.message });
  }
};

exports.EncontrarTodos = async function (req, res) {
  try {
    const localizacoesComrelacao = await prisma.localizacaoPA.findMany({
      include: {
        RelacionamentoPA: true,
      },
    });
    res.json(localizacoesComrelacao);
  } catch (error) {
    res
      .status(404)
      .json({ error: "erro ao criar produto", details: error.message });
  }
};

exports.AtualizarRelacionamento = async function (req, res) {
  try {
    const id = parseInt(req.params.id); // ID do RelacionamentoPA
    const dadosNovos = req.body; // campos enviados pelo cliente
    console.log("dadosNovos:", dadosNovos);
    console.log("atual:", atual);

    // 1️⃣ Buscar o estado atual
    const atual = await prisma.relacionamentoPA.findUnique({
      where: { id },
      include: { localizacaoPA: true },
    });

    if (!atual) {
      return res.status(404).json({ error: "Relacionamento não encontrado" });
    }

    // 2️⃣ Comparar campos e criar histórico se houver alteração
    const camposParaMonitorar = [
      "patrimonioPC",
      "patrimonioMNT1",
      "patrimonioMNT2",
    ];
    for (const campo of camposParaMonitorar) {
      if (dadosNovos[campo] && dadosNovos[campo] !== atual[campo]) {
        await prisma.historicoPA.create({
          data: {
            relacionamentoPAId: atual.id,
            localizacaoPAId: atual.localizacaoPA.id,
            acao: "ALTERACAO",
            valorAnterior: atual[campo],
            valorNovo: dadosNovos[campo],
          },
        });
      }
    }

    // 3️⃣ Atualizar o relacionamentoPA
    const atualizado = await prisma.relacionamentoPA.update({
      where: { id },
      data: dadosNovos,
    });

    res.json(atualizado);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar", details: error.message });
  }
};
