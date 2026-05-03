/**
 * InAppNotification — toast-style in-app notification system
 *
 * Integration with MobileLayout.tsx:
 *   1. Wrap your layout with <NotificationProvider> at the app root.
 *   2. Render <NotificationContainer /> above the bottom nav (inside MobileLayout).
 *   3. Use the useNotifications() hook anywhere to show notifications:
 *        const { show } = useNotifications();
 *        show({ type: 'leads-ready', title: '5 hot leads ready!', body: 'Tap to view them now.' });
 */

import { AnimatePresence, motion, useMotionValue } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType =
  | "success"
  | "info"
  | "warning"
  | "leads-ready"
  | "lead-replied"
  | "streak-alert";

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body?: string;
  durationMs?: number;
}

interface NotificationItem extends NotificationPayload {
  id: string;
}

interface NotificationsContextValue {
  show: (payload: NotificationPayload) => void;
  dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used inside <NotificationProvider>",
    );
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function NotificationProvider({
  children,
}: { children: React.ReactNode }) {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const timerMap = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    clearTimeout(timerMap.current[id]);
    delete timerMap.current[id];
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const show = useCallback(
    (payload: NotificationPayload) => {
      const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const duration = payload.durationMs ?? 4000;

      setItems((prev) => [...prev.slice(-2), { ...payload, id }]);

      timerMap.current[id] = setTimeout(() => {
        dismiss(id);
      }, duration);
    },
    [dismiss],
  );

  return (
    <NotificationsContext.Provider value={{ show, dismiss }}>
      {children}
      <NotificationContainer items={items} onDismiss={dismiss} />
    </NotificationsContext.Provider>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function NotifIcon({ type }: { type: NotificationType }) {
  switch (type) {
    case "success":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-success"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "warning":
    case "streak-alert":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-warning"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "leads-ready":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-primary"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "lead-replied":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-success"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    default:
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-primary"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}

// ─── Single Toast ─────────────────────────────────────────────────────────────

function NotificationToast({
  item,
  onDismiss,
}: {
  item: NotificationItem;
  onDismiss: (id: string) => void;
}) {
  const duration = item.durationMs ?? 4000;
  const y = useMotionValue(0);

  return (
    <motion.div
      data-ocid="notification.toast"
      key={item.id}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 80 }}
      style={{ y }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 40) onDismiss(item.id);
      }}
      className="relative w-full rounded-2xl bg-card border border-border/60 shadow-elevated px-4 py-3 flex items-start gap-3 cursor-grab active:cursor-grabbing overflow-hidden select-none"
    >
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-primary/40"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />

      <div className="shrink-0 mt-0.5">
        <NotifIcon type={item.type} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-foreground leading-tight">
          {item.title}
        </p>
        {item.body && (
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
            {item.body}
          </p>
        )}
      </div>

      <button
        type="button"
        data-ocid="notification.close_button"
        onClick={() => onDismiss(item.id)}
        className="shrink-0 -mr-1 -mt-0.5 p-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </motion.div>
  );
}

// ─── Container ────────────────────────────────────────────────────────────────

function NotificationContainer({
  items,
  onDismiss,
}: {
  items: NotificationItem[];
  onDismiss: (id: string) => void;
}) {
  if (items.length === 0) return null;

  return (
    <div
      data-ocid="notification.container"
      className="fixed bottom-20 left-0 right-0 z-50 px-4 space-y-2 pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <div key={item.id} className="pointer-events-auto">
            <NotificationToast item={item} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
