import { DataBadge } from "@/components/data-badge";
import { fontesRegistros, ultimaAtualizacao } from "@/data/portal";
import { formatarData } from "@/lib/format";

export function MethodologySection() {
  return (
    <section id="fontes" className="methodology-section">
      <div className="section-compact-heading">
        <p>Fontes e metodologia</p>
        <h2>Transparência dos dados</h2>
      </div>
      <div className="methodology-grid">
        <article>
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
        </article>
        <div className="methodology-list">
          {fontesRegistros.map((registro) => (
            <div key={registro.id}>
              <DataBadge tipo={registro.classificacao} />
              <h3>{registro.informacao}</h3>
              <p>{registro.observacao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
