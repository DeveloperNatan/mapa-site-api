const prisma = require("../data/prisma");

exports.EncontrarUm = async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    const MenuID = await prisma.localizacaoPA.findUnique({
      where: {
        id: id,
      },
      include: {
        RelacionamentoPA: true,
      },
    });
    res.json(MenuID);
  } catch (error) {
    res.status(404).json({ error: "Não encontrado" });
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
