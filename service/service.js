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
        RelacionamentoPA: {
          include: {
            HistoricoPA: true,
          }
        },
      },
    });
    res.json(localizacoesComrelacao);
  } catch (error) {
    res
      .status(404)
      .json({ error: "erro ao encontrar", details: error.message });
  }
};


