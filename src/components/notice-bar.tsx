import { AlertTriangle } from "lucide-react";
import { avisoNaoOficial } from "@/data/portal";

export function NoticeBar() {
  return (
    <div className="notice-bar" role="status">
      <div className="notice-bar-inner">
        <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        <p>{avisoNaoOficial}</p>
      </div>
    </div>
  );
}