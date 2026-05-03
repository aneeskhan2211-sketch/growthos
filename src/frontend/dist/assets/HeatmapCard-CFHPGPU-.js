import { r as reactExports, j as jsxRuntimeExports, y as motion } from "./index-DcPx_5wo.js";
function HeatmapCard({
  title,
  items,
  showScreen,
  showFix,
  ocid
}) {
  const [animated, setAnimated] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  const maxCount = Math.max(...items.map((i) => i.count), 1);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "bg-card border border-border/40 rounded-xl p-4 shadow-card",
      "data-ocid": ocid ?? "heatmap.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground mb-3", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => {
          const barWidth = animated ? item.count / maxCount * 100 : 0;
          const color = item.color ?? "oklch(var(--primary))";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-1",
              "data-ocid": `${ocid ?? "heatmap"}.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground text-truncate-1 flex-1 min-w-0", children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    showScreen && item.screen && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded-full", children: item.screen }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground tabular-nums", children: item.count.toLocaleString("en-IN") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground w-10 text-right tabular-nums", children: [
                      item.percentage.toFixed(0),
                      "%"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted/30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full rounded-full",
                    style: { background: color },
                    initial: { width: 0 },
                    animate: { width: `${barWidth}%` },
                    transition: {
                      duration: 0.6,
                      delay: i * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }
                ) }),
                showFix && item.fix && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
                  "💡 ",
                  item.fix
                ] })
              ]
            },
            item.label
          );
        }) })
      ]
    }
  );
}
export {
  HeatmapCard as H
};
