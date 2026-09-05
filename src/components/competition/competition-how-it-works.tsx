import { ChartNoAxesColumnIncreasing, ClipboardList, MapPin } from "lucide-react";
import { radarSteps } from "@/data/competition-presentation";

const icons = [ClipboardList, MapPin, ChartNoAxesColumnIncreasing];

export function CompetitionHowItWorks() {
  return <section className="radar-how" aria-labelledby="radar-how-title">
    <h2 id="radar-how-title">Como funciona</h2>
    <ol>{radarSteps.map((step, index) => {
      const Icon = icons[index];
      return <li key={step.title}><span className="radar-step-number">{index + 1}</span><Icon aria-hidden="true" /><div><h3>{step.title}</h3><p>{step.description}</p></div></li>;
    })}</ol>
  </section>;
}
