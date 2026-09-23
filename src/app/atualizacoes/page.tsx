import { InternalPage } from "@/components/internal-page";
import { UpdatesFeed } from "@/components/platform/updates-feed";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({ title: "Atualizações dos concursos de Segurança Pública", description: "Editais, retificações, inscrições, resultados e convocações em um feed com fontes oficiais.", path: "/atualizacoes" });
export default function UpdatesPage() { return <InternalPage title="Últimas movimentações" description="Publicações e marcos dos concursos acompanhados, do mais recente para o mais antigo. Consulte sempre a fonte oficial." path="/atualizacoes"><UpdatesFeed headingLevel={2} /></InternalPage>; }
