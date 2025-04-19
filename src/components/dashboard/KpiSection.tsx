
import React from "react";
import { GraphicalKpiCard } from "./GraphicalKpiCard";
import { KpiData } from "@/types";

interface KpiSectionProps {
  kpis: KpiData[];
}

export const KpiSection: React.FC<KpiSectionProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {kpis.map((kpi) => (
        <GraphicalKpiCard key={kpi.areaKey} data={kpi} />
      ))}
    </div>
  );
};
