const prisma = require("../data/prisma");

async function criarLocalizacaoTeste() {
  const local = await prisma.localizacaoPA.create({
    data: {
      filial: "J1",
      andar: "0",
      espinha: "32",
      pa: "478",
      carteira: "INFRA",
      RelacionamentoPA: {
        create: {
          localCompleto: "J1-A00-E32-PA478",
          patrimonioPC: "NT016236",
          patrimonioMNT1: "",
          patrimonioMNT2: "",
        },
      },
    },
    include: {
      RelacionamentoPA: true,
    },
  });

  console.log("Local criado:", local);
}

// criarLocalizacaoTeste();

async function criarHistoricoTeste() {
  const historico = await prisma.historicoPA.create({
    data: {
      localizacaoPAId: 2, // ID do local criado
      relacionamentoPAId: 2, // ID do relacionamento criado
      acao: "INSERCAO",
      valorAnterior: null,
      valorNovo: "NT016236",
      //status: "ATIVO",
    },
  });

  console.log("Histórico criado:", historico);
}

// criarHistoricoTeste();

async function criarAlteracaoTeste() {
  const historico = await prisma.historicoPA.create({
    data: {
      localizacaoPAId: 2,
      relacionamentoPAId: 2,
      acao: "ALTERACAO",
      valorAnterior: "NT027500",
      valorNovo: "NT021356",
      // status: "ATIVO",
    },
  });

  console.log("Alteração criada:", historico);
}

criarAlteracaoTeste();
