const express = require("express");
const router = express.Router();
const service = require("../service/service");

router.get("/api/relacao/:id", async function (req, res) {
  await service.EncontrarUm(req, res);
});

router.get("/api/relacao/", async function (req, res) {
  await service.EncontrarTodos(req, res);
});

router.put("/api/relacao/:id", async function (req, res) {
  await service.sincronizarHistorico(req, res);
  await service.AtualizarRelacionamento(req, res);
});

module.exports = router;
