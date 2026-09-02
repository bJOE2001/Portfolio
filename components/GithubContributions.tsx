"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import { profile } from "@/data/portfolio";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
  error?: string;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CELL_SIZE = 9; // px
const CELL_GAP = 2.5; // px
const STEP = 11.5; // px per week column
const LABEL_WIDTH = 22; // px for day labels column

export default function GithubContributions() {
  const username = profile.githubUsername || "bJOE2001";
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const fetchContributions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/github-contributions?username=${encodeURIComponent(username)}&year=all`
      );
      if (!res.ok) {
        throw new Error("Unable to load contributions");
      }
      const json: ApiResponse = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }
      setData(json);
    } catch (err: any) {
      setError(err?.message || "Failed to load GitHub activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, [username]);

  // Normalized list of all contributions sorted ascending by date
  const sortedContributions = useMemo(() => {
    if (!data?.contributions) return [];
    return [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  // Available year tabs (e.g. 2026, 2025, 2024, 2023)
  const availableYears = useMemo(() => {
    if (!data?.total) return ["2026", "2025", "2024", "2023"];
    return Object.keys(data.total)
      .filter((y) => /^\d{4}$/.test(y))
      .sort((a, b) => Number(b) - Number(a));
  }, [data]);

  // Filter days based on selected year
  const { filteredDays, totalForPeriod } = useMemo(() => {
    if (sortedContributions.length === 0) {
      return { filteredDays: [], totalForPeriod: 0 };
    }

    const days = sortedContributions.filter((d) =>
      d.date.startsWith(selectedYear)
    );
    const total = days.reduce((sum, d) => sum + d.count, 0);

    return {
      filteredDays: days,
      totalForPeriod: total,
    };
  }, [sortedContributions, selectedYear]);

  // Group filtered days into 7-day columns (Sunday to Saturday)
  const { weeks, monthHeaders } = useMemo(() => {
    if (filteredDays.length === 0) {
      return { weeks: [], monthHeaders: [] };
    }

    const weeksList: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Identify start day of week (0 = Sunday, 6 = Saturday)
    const firstDate = new Date(filteredDays[0].date + "T00:00:00");
    const firstDayOfWeek = firstDate.getDay();

    // Fill leading empty cells in the first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (const day of filteredDays) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksList.push(currentWeek);
    }

    // Determine month labels
    const headers: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeksList.forEach((week, wIndex) => {
      const validDay = week.find((d) => d !== null);
      if (validDay) {
        const d = new Date(validDay.date + "T00:00:00");
        const monthIndex = d.getMonth();
        if (monthIndex !== lastMonth) {
          headers.push({
            month: MONTH_NAMES[monthIndex],
            weekIndex: wIndex,
          });
          lastMonth = monthIndex;
        }
      }
    });

    return { weeks: weeksList, monthHeaders: headers };
  }, [filteredDays]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCellColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-neutral-300 dark:bg-[#3f3f46] border-neutral-300 dark:border-[#52525b]/60";
      case 2:
        return "bg-neutral-500 dark:bg-[#71717a] border-neutral-500 dark:border-[#71717a]";
      case 3:
        return "bg-neutral-700 dark:bg-[#a1a1aa] border-neutral-700 dark:border-[#a1a1aa]";
      case 4:
        return "bg-black dark:bg-white border-black dark:border-white";
      default:
        return "bg-neutral-100 dark:bg-[#18181b] border-neutral-200/70 dark:border-[#27272a]/70";
    }
  };

  return (
    <motion.section
      id="contributions"
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="section-label mb-0">
          Contributions
          {!loading && totalForPeriod > 0 && (
            <span className="normal-case font-normal text-[var(--text-muted)] ml-2">
              ({totalForPeriod.toLocaleString()} in {selectedYear})
            </span>
          )}
        </p>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--accent-light)] transition-all w-fit"
        >
          <Github size={13} />
          <span>@{username}</span>
          <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Year Filter Tabs & Legend */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {availableYears.map((year) => {
            const isActive = selectedYear === year;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[var(--text)] text-[var(--bg)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--accent-light)]"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[var(--text-light)] shrink-0">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-100 dark:bg-[#18181b] border border-neutral-200/70 dark:border-[#27272a]/70" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-300 dark:bg-[#3f3f46]" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-500 dark:bg-[#71717a]" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-700 dark:bg-[#a1a1aa]" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-black dark:bg-white" />
          <span>More</span>
        </div>
      </div>

      {/* Calendar Area */}
      <div className="relative border border-[var(--border)] rounded-lg p-3.5 bg-[var(--sidebar-bg)] overflow-hidden">
        {loading ? (
          <div className="animate-pulse space-y-2 py-6">
            <div className="h-3 bg-[var(--accent-light)] rounded w-1/4 mb-4" />
            <div className="grid grid-flow-col auto-cols-max gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-2 h-2 rounded-[2px] bg-[var(--accent-light)]"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-xs text-[var(--text-muted)] mb-3">{error}</p>
            <button
              type="button"
              onClick={fetchContributions}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--accent-light)] hover:bg-[var(--border)] text-[var(--text)] transition-colors"
            >
              <RotateCcw size={12} /> Retry
            </button>
          </div>
        ) : (
          <div
            className="overflow-x-auto pb-1 no-scrollbar select-none"
            onMouseLeave={() => setHoveredDay(null)}
          >
            <div
              className="relative mx-auto w-fit"
              style={{ minWidth: `${LABEL_WIDTH + weeks.length * STEP}px` }}
            >
              {/* Month Headers */}
              <div className="relative h-4 mb-1.5 text-[10px] text-[var(--text-light)] font-medium">
                {monthHeaders.map((header) => (
                  <span
                    key={`${header.month}-${header.weekIndex}`}
                    className="absolute top-0 whitespace-nowrap"
                    style={{ left: `${LABEL_WIDTH + header.weekIndex * STEP}px` }}
                  >
                    {header.month}
                  </span>
                ))}
              </div>

              {/* Grid with Day Labels + Week Columns */}
              <div className="flex">
                {/* Day of week labels */}
                <div
                  className="relative shrink-0 text-[9px] text-[var(--text-light)] font-medium select-none"
                  style={{
                    width: `${LABEL_WIDTH}px`,
                    height: `${7 * STEP - (STEP - CELL_SIZE)}px`,
                  }}
                >
                  <span
                    className="absolute leading-[9px]"
                    style={{ top: `${1 * STEP}px` }}
                  >
                    Mon
                  </span>
                  <span
                    className="absolute leading-[9px]"
                    style={{ top: `${3 * STEP}px` }}
                  >
                    Wed
                  </span>
                  <span
                    className="absolute leading-[9px]"
                    style={{ top: `${5 * STEP}px` }}
                  >
                    Fri
                  </span>
                </div>

                {/* Week Columns */}
                <div className="flex gap-[2.5px]">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[2.5px] shrink-0">
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={`empty-${wIdx}-${dIdx}`}
                              className="w-[9px] h-[9px] opacity-0"
                            />
                          );
                        }

                        return (
                          <div
                            key={day.date}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({
                                day,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                            className={`w-[9px] h-[9px] rounded-[2px] border transition-transform hover:scale-125 hover:z-10 cursor-pointer ${getCellColorClass(
                              day.level
                            )}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Tooltip */}
        {hoveredDay && (
          <div
            className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1.5 rounded-md bg-[var(--card)] border border-[var(--border)] shadow-lg text-[11px] text-[var(--text)] whitespace-nowrap backdrop-blur-md"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y - 6}px`,
            }}
          >
            <p className="font-semibold leading-tight">
              {hoveredDay.day.count === 0
                ? "No contributions"
                : `${hoveredDay.day.count} ${
                    hoveredDay.day.count === 1 ? "contribution" : "contributions"
                  }`}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
              {formatDate(hoveredDay.day.date)}
            </p>
          </div>
        )}
      </div>

      {/* Footer / Mobile Legend */}
      <div className="flex sm:hidden items-center justify-between text-[10px] text-[var(--text-light)] mt-2 pt-2 border-t border-[var(--border)]">
        <span>Contribution density</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <span className="w-2 h-2 rounded-[2px] bg-neutral-100 dark:bg-[#18181b] border border-neutral-200/70 dark:border-[#27272a]/70" />
          <span className="w-2 h-2 rounded-[2px] bg-neutral-300 dark:bg-[#3f3f46]" />
          <span className="w-2 h-2 rounded-[2px] bg-neutral-500 dark:bg-[#71717a]" />
          <span className="w-2 h-2 rounded-[2px] bg-neutral-700 dark:bg-[#a1a1aa]" />
          <span className="w-2 h-2 rounded-[2px] bg-black dark:bg-white" />
          <span>More</span>
        </div>
      </div>
    </motion.section>
  );
}
