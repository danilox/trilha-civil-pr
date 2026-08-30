"use client";

import { Check, MapPin } from "lucide-react";
import { competitionRegionOptions } from "@/data/competition";
import type { CompetitionRegionId } from "@/types/competition";

type RegionSelectorProps = {
  selectedRegion: CompetitionRegionId | null;
  onSelect: (regionId: CompetitionRegionId) => void;
};

export function RegionSelector({ onSelect, selectedRegion }: RegionSelectorProps) {
  return (
    <fieldset className="competition-selector-group">
      <legend>Onde você está concorrendo?</legend>
      <div className="competition-region-grid" role="listbox" aria-label="Região pretendida">
        {competitionRegionOptions.map((region) => {
          const selected = selectedRegion === region.id;
          return (
            <button
              key={region.id}
              type="button"
              className="competition-region-option ds-focusable"
              aria-selected={selected}
              role="option"
              onClick={() => onSelect(region.id)}
            >
              <span className="competition-region-check" aria-hidden="true">
                {selected ? <Check /> : <MapPin />}
              </span>
              <span>{region.code}</span>
              <strong>{region.title}</strong>
              <small>{region.description}</small>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
