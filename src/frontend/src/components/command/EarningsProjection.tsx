import { TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  niche: string;
  city: string;
  budget: number;
  leadCount: number;
}

export function EarningsProjection({ niche, city, budget, leadCount }: Props) {
  const conservative = Math.round(leadCount * 0.02 * budget);
  const realistic = Math.round(leadCount * 0.03 * budget);
  const optimistic = Math.round(leadCount * 0.06 * budget);

  const fmt = (v: number) =>
    v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${(v / 1000).toFixed(0)}k`;

  const data = [
    {
      label: "Conservative",
      value: conservative,
      color: "oklch(0.68 0.18 86)",
    },
    { label: "Realistic", value: realistic, color: "oklch(0.56 0.15 170)" },
    { label: "Optimistic", value: optimistic, color: "oklch(0.53 0.22 253)" },
  ];

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 shadow-subtle"
      data-ocid="earnings_projection.card"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-premium-accent" />
            <h3 className="font-semibold text-foreground">
              Earnings Projection
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Based on {leadCount} {niche.toLowerCase()} leads in {city} at ₹
            {(budget / 1000).toFixed(0)}k target budget
          </p>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-right"
        >
          <div className="font-display text-2xl font-bold text-premium-accent">
            {fmt(realistic)}
          </div>
          <div className="text-xs text-muted-foreground">realistic / month</div>
        </motion.div>
      </div>

      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={40}
            margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
          >
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              formatter={(v: number) => [fmt(v), "Monthly Earnings"]}
              contentStyle={{
                background: "oklch(0.16 0 0)",
                border: "1px solid oklch(0.26 0 0)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static chart data
                <Cell key={idx} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {data.map((d) => (
          <div key={d.label} className="text-center">
            <div className="font-semibold text-sm text-foreground">
              {fmt(d.value)}
            </div>
            <div className="text-xs text-muted-foreground">{d.label}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Assumes 2–6% close rate. Actual results depend on outreach quality and
        follow-up.
      </p>
    </div>
  );
}
