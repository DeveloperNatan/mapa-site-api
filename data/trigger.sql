CREATE OR REPLACE FUNCTION criar_historico()
RETURNS TRIGGER AS $$
BEGIN
IF NEW."patrimonioPC" IS DISTINCT FROM OLD."patrimonioPC" THEN
INSERT INTO "HistoricoPA"("localizacaoPAId", "relacionamentoPAId", acao, "valorAnterior", "valorNovo", "dataRegistro")
VALUES (OLD."id", OLD."id", 'ALTERACAO', OLD."patrimonioPC", NEW."patrimonioPC", NOW());
END IF;
IF NEW."patrimonioMNT1" IS DISTINCT FROM OLD."patrimonioMNT1" THEN
INSERT INTO "HistoricoPA"("localizacaoPAId", "relacionamentoPAId", acao, "valorAnterior", "valorNovo", "dataRegistro")
VALUES (OLD."id", OLD."id", 'ALTERACAO', OLD."patrimonioMNT1", NEW."patrimonioMNT1", NOW());
END IF;
IF NEW."patrimonioMNT2" IS DISTINCT FROM OLD."patrimonioMNT2" THEN
INSERT INTO "HistoricoPA"("localizacaoPAId", "relacionamentoPAId", acao, "valorAnterior", "valorNovo", "dataRegistro")
VALUES (OLD."id", OLD."id", 'ALTERACAO', OLD."patrimonioMNT2", NEW."patrimonioMNT2", NOW());
END IF;
RETURN NEW;
END;


LANGUAGE plpgsql;

CREATE TRIGGER trigger_historico
AFTER UPDATE ON "RelacionamentoPA"
FOR EACH ROW
EXECUTE FUNCTION criar_historico();
