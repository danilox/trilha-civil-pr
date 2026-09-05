"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { radarPath } from "@/data/competition-presentation";

export function CompetitionShareActions() {
  const [message, setMessage] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  async function share() {
    const url = new URL(radarPath, window.location.origin).href;
    if (navigator.share) {
      try { await navigator.share({ title: "Radar de Concorrência — Agente PCPR 2026", text: "Ajude a mapear a concorrência entre Interior e Curitiba/RMC.", url }); setMessage("Pesquisa compartilhada."); return; }
      catch (error) { if (error instanceof Error && error.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(url); setManualUrl(""); setMessage("Link copiado! Compartilhe com outros candidatos."); }
    catch { setManualUrl(url); setMessage("Selecione e copie o link abaixo para compartilhar."); }
  }
  return <div className="radar-share">
    <button type="button" onClick={share} className="ds-focusable"><Share2 aria-hidden="true" /> Compartilhar pesquisa</button>
    <p role="status">{message || "Quanto mais pessoas participarem, mais representativo será o nosso mapa!"}</p>
    {manualUrl ? <label>Link da pesquisa<input readOnly value={manualUrl} onFocus={(event) => event.target.select()} /></label> : null}
  </div>;
}
