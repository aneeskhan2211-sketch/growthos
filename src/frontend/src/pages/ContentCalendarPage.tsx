import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  Hash,
  Layers,
  Megaphone,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  getPostsForDay,
  useContentCalendars,
  useGenerateContentCalendar,
  useMarkPostPosted,
} from "../hooks/useContentCalendar";
import type {
  CalendarPost,
  ContentCalendar,
  PostType,
} from "../hooks/useContentCalendar";

// ─── Constants ────────────────────────────────────────────────────────────────

const NICHES = [
  "Salon",
  "Gym",
  "Clinic",
  "Restaurant",
  "Real Estate",
  "Coaching",
  "Other",
];
const GOALS = [
  "Get 50 new clients",
  "Increase bookings by 20%",
  "Grow Instagram to 5,000 followers",
  "Generate 100 enquiries",
  "Boost revenue by 30%",
];

const POST_TYPE_CONFIG: Record<
  PostType,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    icon: React.ReactNode;
  }
> = {
  Reel: {
    label: "Reel",
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-300/40 dark:border-purple-700/40",
    icon: <Video className="w-3 h-3" />,
  },
  Carousel: {
    label: "Carousel",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-300/40 dark:border-blue-700/40",
    icon: <Layers className="w-3 h-3" />,
  },
  Story: {
    label: "Story",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-300/40 dark:border-emerald-700/40",
    icon: <ChevronRight className="w-3 h-3" />,
  },
  Ad: {
    label: "Ad",
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-300/40 dark:border-orange-700/40",
    icon: <Megaphone className="w-3 h-3" />,
  },
  Blog: {
    label: "Blog",
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    icon: <TrendingUp className="w-3 h-3" />,
  },
  Social: {
    label: "Social",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-300/40",
    icon: <Layers className="w-3 h-3" />,
  },
  Email: {
    label: "Email",
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/20",
    icon: <Megaphone className="w-3 h-3" />,
  },
  Video: {
    label: "Video",
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    icon: <Video className="w-3 h-3" />,
  },
};

const MOTIVATIONAL = [
  "Keep going! Consistency builds enquiries.",
  "You're on a streak! Daily posts = daily leads.",
  "Every post is a touchpoint with a future client.",
  "Halfway there — keep showing up for your audience.",
  "Almost done — your best month ever starts now!",
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function copyText(text: string, label = "Copied!") {
  navigator.clipboard.writeText(text).then(() => toast.success(label));
}

function PostTypePill({ type }: { type: PostType }) {
  const cfg = POST_TYPE_CONFIG[type] ?? POST_TYPE_CONFIG.Reel;
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

// ─── Post Detail Panel ────────────────────────────────────────────────────────

interface PostDetailProps {
  post: CalendarPost;
  calendarId: string;
  onClose: () => void;
}

function PostDetailPanel({ post, calendarId, onClose }: PostDetailProps) {
  const markPosted = useMarkPostPosted();

  const cfg = POST_TYPE_CONFIG[post.postType] ?? POST_TYPE_CONFIG.Reel;

  const copyAll = () => {
    const parts = [
      post.hook ? `Hook:\n${post.hook}` : "",
      post.caption ? `Caption:\n${post.caption}` : "",
      post.hashtags?.length ? `Hashtags:\n${post.hashtags.join(" ")}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
    copyText(parts, "All content copied!");
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-card border-l border-border shadow-2xl flex flex-col"
      data-ocid="content_calendar.post_detail.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.bg}`}
          >
            <span className={cfg.text}>{cfg.icon}</span>
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Day {post.day}</p>
            <PostTypePill type={post.postType} />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-muted transition-colors"
          data-ocid="content_calendar.post_detail.close_button"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Hook */}
        {post.hook && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Hook
              </Label>
              <button
                type="button"
                onClick={() => copyText(post.hook!, "Hook copied!")}
                className="p-1 rounded hover:bg-muted transition-colors"
                data-ocid="content_calendar.post_detail.copy_hook"
              >
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-base font-semibold text-foreground leading-snug">
              {post.hook}
            </p>
          </div>
        )}

        <Separator />

        {/* Body/Script */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Script / Body
          </Label>
          <p className="text-sm text-foreground leading-relaxed">
            {post.title}
          </p>
        </div>

        {/* Caption */}
        {post.caption && (
          <>
            <Separator />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Caption
                </Label>
                <button
                  type="button"
                  onClick={() => copyText(post.caption!, "Caption copied!")}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  data-ocid="content_calendar.post_detail.copy_caption"
                >
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm text-foreground bg-muted/40 rounded-lg p-3 leading-relaxed">
                {post.caption}
              </p>
            </div>
          </>
        )}

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <>
            <Separator />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" /> Hashtags
                  </span>
                </Label>
                <button
                  type="button"
                  onClick={() =>
                    copyText(post.hashtags!.join(" "), "Hashtags copied!")
                  }
                  className="p-1 rounded hover:bg-muted transition-colors"
                  data-ocid="content_calendar.post_detail.copy_hashtags"
                >
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {post.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-primary bg-primary/10 rounded-full px-2.5 py-1 font-medium"
                  >
                    {tag.startsWith("#") ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        {post.platform && (
          <>
            <Separator />
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Platform
              </Label>
              <Badge variant="outline" className="text-xs">
                {post.platform}
              </Badge>
            </div>
          </>
        )}
      </div>

      {/* Footer actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          type="button"
          className="w-full"
          variant="outline"
          onClick={copyAll}
          data-ocid="content_calendar.post_detail.copy_all_button"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy All
        </Button>
        <Button
          type="button"
          className="w-full"
          variant={post.posted ? "outline" : "default"}
          disabled={markPosted.isPending}
          onClick={() => markPosted.mutate({ calendarId, postId: post.id })}
          data-ocid="content_calendar.post_detail.mark_posted_button"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          {post.posted ? "Marked as Posted ✓" : "Mark as Posted"}
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Calendar Grid ─────────────────────────────────────────────────────────────

interface CalendarGridProps {
  calendar: ContentCalendar;
  onDayClick: (post: CalendarPost) => void;
}

function CalendarGrid({ calendar, onDayClick }: CalendarGridProps) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDate =
    calendar.posts.length > 0 ? new Date(calendar.posts[0].date) : new Date();
  const leadingCount = firstDate.getDay();
  const today = new Date().toDateString();

  return (
    <div className="overflow-x-auto">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-border min-w-[560px]">
        {weekdays.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] font-semibold text-muted-foreground py-2 border-r last:border-r-0 border-border bg-muted/30"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 min-w-[560px]">
        {/* Leading empty cells */}
        {Array.from({ length: leadingCount }, (_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: leading empty calendar cells
            key={`empty-${i}`}
            className="min-h-[90px] border-r border-b border-border bg-muted/10"
          />
        ))}

        {calendar.posts.map((post, idx) => {
          const date = new Date(post.date);
          const isToday = date.toDateString() === today;
          return (
            <motion.button
              key={post.id}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.015, duration: 0.2 }}
              onClick={() => onDayClick(post)}
              className={[
                "min-h-[90px] border-r border-b border-border p-1.5 text-left relative group",
                "hover:bg-primary/5 transition-colors cursor-pointer",
                isToday ? "bg-primary/5 ring-1 ring-inset ring-primary/40" : "",
                post.posted ? "opacity-60" : "",
                (idx + leadingCount) % 7 === 6 ? "border-r-0" : "",
              ].join(" ")}
              data-ocid={`content_calendar.post.${idx + 1}`}
            >
              <div className="flex items-start justify-between mb-1">
                <span
                  className={`text-[11px] font-semibold ${
                    isToday ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {date.getDate()}
                </span>
                {post.posted && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                )}
              </div>
              <PostTypePill type={post.postType} />
              <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-tight">
                {post.hook ?? post.title}
              </p>
              {/* Hover indicator */}
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/30 rounded-[1px] pointer-events-none transition-all" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────

function CalendarStats({ calendar }: { calendar: ContentCalendar }) {
  const typeCounts: Record<string, number> = {};
  for (const p of calendar.posts) {
    typeCounts[p.postType] = (typeCounts[p.postType] ?? 0) + 1;
  }
  const totalPosts = calendar.posts.length;
  const postedCount = calendar.posts.filter((p) => p.posted).length;
  const pct = totalPosts > 0 ? Math.round((postedCount / totalPosts) * 100) : 0;
  const motivationalIdx = Math.min(
    Math.floor(pct / 20),
    MOTIVATIONAL.length - 1,
  );

  return (
    <div className="space-y-4">
      {/* Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-foreground">
            {postedCount} of {totalPosts} posts completed
          </p>
          <span className="text-sm font-bold text-primary">{pct}%</span>
        </div>
        <Progress
          value={pct}
          className="h-2"
          data-ocid="content_calendar.progress_bar"
        />
        <p className="text-xs text-muted-foreground mt-2">
          {MOTIVATIONAL[motivationalIdx]}
        </p>
      </Card>

      {/* Type breakdown + reach */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(typeCounts) as PostType[]).map((type) => {
          const cfg = POST_TYPE_CONFIG[type];
          return (
            <Card key={type} className="p-3">
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center mb-2 ${cfg?.bg ?? "bg-muted"}`}
              >
                <span className={cfg?.text ?? "text-foreground"}>
                  {cfg?.icon}
                </span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {typeCounts[type]}
              </p>
              <p className="text-xs text-muted-foreground">{type}s</p>
            </Card>
          );
        })}
      </div>

      {/* Estimated reach */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Estimated Monthly Reach
          </p>
        </div>
        <p className="text-2xl font-bold text-foreground">
          {(totalPosts * 1_200).toLocaleString("en-IN")}–
          {(totalPosts * 3_500).toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Based on industry averages. Actual reach may vary by niche and
          audience.
        </p>
      </Card>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ContentCalendarPage() {
  const { data: calendars = [], isLoading } = useContentCalendars();
  const generate = useGenerateContentCalendar();

  const [niche, setNiche] = useState("Salon");
  const [city, setCity] = useState("Mumbai");
  const [goal, setGoal] = useState(GOALS[0]);
  const [activeCalendarIdx, setActiveCalendarIdx] = useState(0);
  const [selectedPost, setSelectedPost] = useState<CalendarPost | null>(null);

  const activeCalendar: ContentCalendar | null =
    calendars[activeCalendarIdx] ?? null;

  const handleGenerate = async () => {
    try {
      await generate.mutateAsync({ niche, city, goal });
      toast.success("30-day content calendar generated!");
      setActiveCalendarIdx(0);
    } catch {
      toast.error("Failed to generate. Please try again.");
    }
  };

  const handleDayClick = useCallback((post: CalendarPost) => {
    setSelectedPost(post);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedPost(null);
  }, []);

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Content Calendar
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            30 posts/month, auto-generated for your niche and city.
          </p>
        </div>
        {activeCalendar && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const csv = activeCalendar.posts
                .map(
                  (p) =>
                    `Day ${p.day},${p.postType},"${p.title}","${p.caption ?? ""}","${(p.hashtags ?? []).join(" ")}"`,
                )
                .join("\n");
              const blob = new Blob(
                [`Day,Type,Title,Caption,Hashtags\n${csv}`],
                { type: "text/csv" },
              );
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = `content-calendar-${activeCalendar.niche}-${activeCalendar.city}.csv`;
              a.click();
            }}
            data-ocid="content_calendar.export_button"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV
          </Button>
        )}
      </div>

      {/* ─── Generate Panel ──────────────────────────────────────────────── */}
      <Card className="p-5 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            Generate 30 Posts
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="cal-niche" className="text-xs">
              Niche
            </Label>
            <Select value={niche} onValueChange={setNiche}>
              <SelectTrigger
                id="cal-niche"
                data-ocid="content_calendar.niche_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NICHES.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cal-city" className="text-xs">
              City
            </Label>
            <Input
              id="cal-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Mumbai"
              data-ocid="content_calendar.city_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cal-goal" className="text-xs">
              Monthly Goal
            </Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger
                id="cal-goal"
                data-ocid="content_calendar.goal_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GOALS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={generate.isPending}
            className="gap-2"
            data-ocid="content_calendar.generate_submit_button"
          >
            {generate.isPending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate 30 Posts
              </>
            )}
          </Button>
          {generate.isPending && (
            <p className="text-xs text-muted-foreground">
              Creating your personalised content plan…
            </p>
          )}
        </div>
      </Card>

      {/* ─── Loading ─────────────────────────────────────────────────────── */}
      {isLoading && (
        <div className="flex items-center justify-center h-60">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">Loading calendars…</p>
          </div>
        </div>
      )}

      {/* ─── Calendar tabs + view ─────────────────────────────────────────── */}
      {!isLoading && calendars.length > 0 && (
        <>
          {/* Multi-calendar tabs */}
          {calendars.length > 1 && (
            <Tabs
              value={String(activeCalendarIdx)}
              onValueChange={(v) => setActiveCalendarIdx(Number(v))}
            >
              <TabsList className="h-8">
                {calendars.map((cal, idx) => (
                  <TabsTrigger
                    key={cal.id}
                    value={String(idx)}
                    className="text-xs px-3"
                    data-ocid={`content_calendar.tab.${idx + 1}`}
                  >
                    {cal.niche} — {cal.city}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          {activeCalendar && (
            <motion.div
              key={activeCalendar.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Calendar header */}
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between py-3 px-5 border-b border-border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm font-semibold">
                      {activeCalendar.month} — {activeCalendar.niche} in{" "}
                      {activeCalendar.city}
                    </CardTitle>
                    {activeCalendar.goal && (
                      <Badge
                        variant="outline"
                        className="text-[10px] hidden sm:inline-flex"
                      >
                        {activeCalendar.goal}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Legend */}
                    <div className="hidden md:flex items-center gap-2">
                      {(["Reel", "Carousel", "Story", "Ad"] as PostType[]).map(
                        (t) => (
                          <PostTypePill key={t} type={t} />
                        ),
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activeCalendar.posts.filter((p) => p.posted).length}/
                      {activeCalendar.posts.length} posted
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CalendarGrid
                    calendar={activeCalendar}
                    onDayClick={handleDayClick}
                  />
                </CardContent>
              </Card>

              {/* Stats */}
              <CalendarStats calendar={activeCalendar} />
            </motion.div>
          )}
        </>
      )}

      {/* ─── Empty state ─────────────────────────────────────────────────── */}
      {!isLoading && calendars.length === 0 && (
        <Card
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="content_calendar.empty_state"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Calendar className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            No calendar yet
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Fill in your niche, city, and goal above — then generate your first
            30-day content plan.
          </p>
        </Card>
      )}

      {/* ─── Post Detail Slide-out ────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPost && activeCalendar && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={handleCloseDetail}
            />
            <PostDetailPanel
              post={selectedPost}
              calendarId={activeCalendar.id}
              onClose={handleCloseDetail}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
