import { DataBadge } from "@/components/data-badge";
import { Card, Disclaimer, SectionHeader } from "@/components/ui";
import { fontesRegistros, ultimaAtualizacao } from "@/data/portal";
import { formatarData } from "@/lib/format";

export function MethodologySection() {
  return (
    <Card as="section" id="fontes" className="methodology-section">
      <SectionHeader eyebrow="Fontes e metodologia" title="Transparência dos dados" className="section-compact-heading" />
      <div className="methodology-grid">
        <Card as="article" padding="md">
          <p>
            O Trilha Civil PR é um projeto independente e não oficial. Informações oficiais devem vir do edital,
            da banca organizadora e dos órgãos competentes. As projeções exibidas no portal são estimativas ou
            demonstrações de interface e não representam classificação oficial.
          </p>
          <p>
            Locais para exames são referências informativas. O portal não garante preço, atendimento,
            disponibilidade ou aceitação do exame. Confirme diretamente com o estabelecimento e com o edital.
          </p>
          <strong>Última atualização: {formatarData(ultimaAtualizacao)}</strong>
        </Card>
        <div className="methodology-list">
          {fontesRegistros.map((registro) => (
            <Card key={registro.id} as="article" padding="md" interactive>
              <DataBadge tipo={registro.classificacao} />
              <h3>{registro.informacao}</h3>
              <p>{registro.observacao}</p>
            </Card>
          ))}
        </div>
      </div>
      <Disclaimer className="mt-4">Consulte sempre o edital, a banca e os canais oficiais antes de tomar decisões.</Disclaimer>
    </Card>
  );
}
