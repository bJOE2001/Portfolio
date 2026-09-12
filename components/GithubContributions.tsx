"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, RotateCcw } from "lucide-react";
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
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CELL_SIZE = 9; // px
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

  const sortedContributions = useMemo(() => {
    if (!data?.contributions) return [];
    return [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  const availableYears = useMemo(() => {
    if (!data?.total) return ["2026", "2025", "2024", "2023"];
    return Object.keys(data.total)
      .filter((y) => /^\d{4}$/.test(y))
      .sort((a, b) => Number(b) - Number(a));
  }, [data]);

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

  const { weeks, monthHeaders } = useMemo(() => {
    if (filteredDays.length === 0) {
      return { weeks: [], monthHeaders: [] };
    }

    const weeksList: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    const firstDate = new Date(filteredDays[0].date + "T00:00:00");
    const firstDayOfWeek = firstDate.getDay();

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
        return "bg-surface-hover border-border-subtle";
    }
  };

  return (
    <section id="activity" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
            05 / ACTIVITY
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Building consistently.
          </h2>
          <p className="text-sm text-muted max-w-xl">
            Verified Git commits, pull requests, and codebase maintenance history.
          </p>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-colors group"
        >
          <Github size={14} />
          <span>@{username}</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Main Container */}
      <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 space-y-4">
        {/* Controls: Year Tabs & Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-1">
            {availableYears.map((year) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                    isActive
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-muted">
            {!loading && (
              <span>
                <strong className="text-foreground font-semibold">
                  {totalForPeriod.toLocaleString()}
                </strong>{" "}
                contributions in {selectedYear}
              </span>
            )}
          </div>
        </div>

        {/* Calendar Area */}
        <div className="relative overflow-hidden pt-2">
          {loading ? (
            <div className="animate-pulse space-y-3 py-8">
              <div className="h-3 bg-surface-hover rounded w-1/4 mb-4" />
              <div className="grid grid-flow-col auto-cols-max gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <div
                        key={j}
                        className="w-2.5 h-2.5 rounded-[2px] bg-surface-hover"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <p className="text-xs font-mono text-muted">{error}</p>
              <button
                type="button"
                onClick={fetchContributions}
                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-border text-foreground hover:bg-surface-hover transition-colors"
              >
                <RotateCcw size={12} /> Retry
              </button>
            </div>
          ) : (
            <div
              className="overflow-x-auto pb-2 no-scrollbar select-none"
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div
                className="relative mx-auto w-fit"
                style={{ minWidth: `${LABEL_WIDTH + weeks.length * STEP}px` }}
              >
                {/* Month Headers */}
                <div className="relative h-4 mb-2 text-[10px] font-mono text-subtle">
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

                {/* Grid */}
                <div className="flex">
                  {/* Day labels */}
                  <div
                    className="relative shrink-0 text-[9px] font-mono text-subtle select-none"
                    style={{
                      width: `${LABEL_WIDTH}px`,
                      height: `${7 * STEP - (STEP - CELL_SIZE)}px`,
                    }}
                  >
                    <span className="absolute leading-[9px]" style={{ top: `${1 * STEP}px` }}>
                      Mon
                    </span>
                    <span className="absolute leading-[9px]" style={{ top: `${3 * STEP}px` }}>
                      Wed
                    </span>
                    <span className="absolute leading-[9px]" style={{ top: `${5 * STEP}px` }}>
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
              className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1.5 rounded-md bg-surface border border-border shadow-lg text-[11px] font-mono text-foreground whitespace-nowrap backdrop-blur-md"
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
              <p className="text-[10px] text-muted mt-0.5">
                {formatDate(hoveredDay.day.date)}
              </p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] font-mono text-subtle pt-3 border-t border-border-subtle">
          <span>Activity level</span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-surface-hover border border-border-subtle" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-300 dark:bg-[#3f3f46]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-500 dark:bg-[#71717a]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-700 dark:bg-[#a1a1aa]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-black dark:bg-white" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
