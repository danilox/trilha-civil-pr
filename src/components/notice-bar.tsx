import { AlertTriangle } from "lucide-react";
import { avisoNaoOficial } from "@/data/portal";

export function NoticeBar() {
  return (
    <div className="border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex h-7 max-w-[1540px] items-center gap-2 px-4 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:px-5 xl:px-6">
        <AlertTriangle aria-hidden="true" className="h-3 w-3 shrink-0 text-zinc-400" />
        <p className="truncate">{avisoNaoOficial}</p>
      </div>
    </div>
  );
}
