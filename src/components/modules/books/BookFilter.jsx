"use client";

import React, { useState } from "react";
import { TextField, Select, ListBox, Button } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";
import { Sparkles, X, RefreshCw } from "lucide-react";

export default function BooksFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  minFee,
  setMinFee,
  maxFee,
  setMaxFee,
  availability,
  setAvailability,
  // AI Mood Search props
  isAiMode = false,
  setIsAiMode,
  aiQuery = "",
  setAiQuery,
  onAiSearch,
  isAiSearching = false,
  activeMoodQuery = "",
  onClearAiSearch,
}) {
  // Mobile Filter Toggle dropdown
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const moodChips = [
    { label: "🌙 Late-Night Thriller", query: "late night atmospheric thriller with intense twists" },
    { label: "💡 Habits & Growth", query: "life changing habits, self discipline and personal growth" },
    { label: "🚀 Sci-Fi & Cosmos", query: "space exploration, sci fi adventure and survival" },
    { label: "🧘 Calm & Peace", query: "calm, peaceful, mind relaxing and mindfulness" },
    { label: "💼 Wealth & Strategy", query: "business strategy, wealth creation and finance" },
  ];

  const handleAiSubmit = (e) => {
    if (e) e.preventDefault();
    if (aiQuery && aiQuery.trim() && onAiSearch) {
      onAiSearch(aiQuery.trim());
    }
  };

  return (
    <div className="dashboard-card max-w-7xl mx-auto mb-7 space-y-4">
      {/* Search Mode Toggle (Standard vs AI Mood Search) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-card-soft/60 border border-border/60">
            <button
              type="button"
              onClick={() => {
                if (setIsAiMode) setIsAiMode(false);
                if (onClearAiSearch) onClearAiSearch();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !isAiMode
                  ? "bg-primary text-white dark:text-gray-900 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Standard Filter
            </button>
            <button
              type="button"
              onClick={() => {
                if (setIsAiMode) setIsAiMode(true);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isAiMode
                  ? "bg-primary text-white dark:text-gray-900 shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Sparkles size={13} className="animate-pulse" />
              <span>AI Mood / Vibe Search</span>
            </button>
          </div>
        </div>

        {activeMoodQuery && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Active Vibe: <span className="font-bold text-primary italic">&ldquo;{activeMoodQuery}&rdquo;</span>
            </span>
            <button
              type="button"
              onClick={onClearAiSearch}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-card-soft text-[11px] font-bold text-muted-foreground hover:text-red-500 border border-border/50 cursor-pointer transition-colors"
            >
              <X size={12} /> Clear
            </button>
          </div>
        )}
      </div>

      {/* AI MOOD SEARCH INPUT BAR (When AI Mode is Active) */}
      {isAiMode ? (
        <div className="space-y-3">
          <form onSubmit={handleAiSubmit} className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-primary z-10">
                <Sparkles size={16} className={isAiSearching ? "animate-spin" : "animate-pulse"} />
              </span>
              <input
                type="text"
                placeholder="Search by mood, theme, or topic (e.g. 'late night thriller', 'self discipline', 'deep space survival')..."
                value={aiQuery}
                onChange={(e) => setAiQuery && setAiQuery(e.target.value)}
                className="input-field pl-10 pr-4 py-3.5 w-full text-base sm:text-sm rounded-2xl border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card/60 backdrop-blur-md"
              />
            </div>

            <Button
              type="submit"
              disabled={isAiSearching || !aiQuery.trim()}
              className="h-12 px-6 rounded-2xl bg-primary text-white dark:text-gray-900 font-bold text-sm tracking-wide shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0"
              startContent={
                isAiSearching ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <Sparkles size={15} />
                )
              }
            >
              {isAiSearching ? "Searching Vibe..." : "Match Books"}
            </Button>
          </form>

          {/* Quick Mood Inspiration Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground mr-1">
              Try Moods:
            </span>
            {moodChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (setAiQuery) setAiQuery(chip.query);
                  if (onAiSearch) onAiSearch(chip.query);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activeMoodQuery === chip.query
                    ? "bg-primary/20 text-primary border-primary font-bold shadow-sm"
                    : "bg-card-soft/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* STANDARD SEARCH & FILTER CONTROLS */
        <>
          {/*  MOBILE VIEW HEADER:*/}
          <div className="flex md:hidden items-center gap-3 w-full">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground z-10">
                  <Magnifier className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search title, author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-9 w-full text-base sm:text-sm"
                />
              </div>
            </div>

            {/* filter toggle description */}
            <Button
              onClick={() => setIsOpenMobile(!isOpenMobile)}
              className={`p-5 py-5.5 rounded-xl border transition-all text-base sm:text-sm font-bold flex items-center gap-2 ${
                isOpenMobile
                  ? "bg-primary text-white dark:text-gray-900 border-primary"
                  : "bg-card border-border text-foreground"
              }`}
            >
              <span className="w-4 h-9 flex items-center justify-center">
                <ChevronDown className="w-4 h-4" />
              </span>
              <span>Filters</span>
            </Button>
          </div>

          {/* CORE FILTER GRID PANEL (Desktop 1-Row & Mobile Expanded Dropdown) */}
          <div
            className={`${isOpenMobile ? "grid mt-4 pt-4 border-t border-border/40" : "hidden"} md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end`}
          >
            {/* Search input (Desktop Only) */}
            <div className="lg:col-span-4 hidden md:block">
              <TextField
                aria-label="Search Books"
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
                className="w-full"
              >
                <span className="text-base sm:text-sm font-bold font-poppins text-foreground uppercase tracking-wider block mb-1.5">
                  Search Books
                </span>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground z-10">
                    <Magnifier className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search title, author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-9 w-full text-base sm:text-sm"
                  />
                </div>
              </TextField>
            </div>


        {/* category filter dropdown */}
        <div className="lg:col-span-3 sm:col-span-1">
          <span className="text-base sm:text-sm font-bold font-poppins text-foreground uppercase tracking-wider block mb-1.5">
            Category
          </span>
          {/*  aria-label added to Select component */}
          <Select
            aria-label="Filter books by category"
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between input-field px-3 text-base sm:text-sm font-medium transition-all">
              <Select.Value>
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-card border border-border rounded-2xl shadow-xl mt-1 overflow-hidden z-50">
              {/* aria-label added to ListBox component */}
              <ListBox
                className="p-1 font-urbanist text-foreground"
                aria-label="Category list options"
              >
                {/*  textValue added to ListBox.Item components */}
                <ListBox.Item
                  id="all"
                  textValue="All Categories"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-base sm:text-sm cursor-pointer capitalize"
                >
                  <span>All Categories</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Fiction"
                  textValue="Fiction"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-base sm:text-sm cursor-pointer capitalize"
                >
                  <span>Fiction</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Tech"
                  textValue="Tech"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-base sm:text-sm cursor-pointer capitalize"
                >
                  <span>Tech</span>
                </ListBox.Item>
                <ListBox.Item
                  id="History"
                  textValue="History"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-base sm:text-sm cursor-pointer capitalize"
                >
                  <span>History</span>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* delivery fee min/ max filter */}
        <div className="lg:col-span-3 sm:col-span-1 grid grid-cols-2 gap-2">
          <div>
            <span className="text-base sm:text-sm font-bold font-poppins text-muted-foreground uppercase tracking-wider block mb-1.5 truncate">
              Min ($)
            </span>
            <input
              type="number"
              placeholder="0"
              value={minFee}
              onChange={(e) => setMinFee(e.target.value)}
              className="input-field w-full text-base sm:text-sm"
            />
          </div>
          <div>
            <span className="text-base sm:text-sm font-bold font-poppins text-muted-foreground uppercase tracking-wider block mb-1.5 truncate">
              Max ($)
            </span>
            <input
              type="number"
              placeholder="500"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              className="input-field w-full text-base sm:text-sm"
            />
          </div>
        </div>

        {/* status filter dropdown */}
        <div className="lg:col-span-2 sm:col-span-2">
          <span className="text-base sm:text-sm font-bold font-poppins text-foreground uppercase tracking-wider block mb-1.5">
            Status
          </span>
          {/* aria-label added to Select component */}
          <Select
            aria-label="Filter books by availability status"
            selectedKey={availability}
            onSelectionChange={(key) => setAvailability(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between input-field px-3 text-base sm:text-sm font-medium transition-all">
              <Select.Value>
                {availability === "all" ? "All Status" : availability}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-card border border-border rounded-2xl shadow-xl mt-1 overflow-hidden z-50">
              {/* aria-label added to ListBox component */}
              <ListBox
                className="p-1 font-urbanist text-foreground"
                aria-label="Availability status options"
              >
                {/*  textValue added to ListBox.Item components */}
                <ListBox.Item
                  id="all"
                  textValue="All Status"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-base sm:text-sm cursor-pointer"
                >
                  <span>All Status</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Available"
                  textValue="Available"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-base sm:text-sm cursor-pointer"
                >
                  <span>Published</span>
                </ListBox.Item>
                <ListBox.Item
                  id="Unavailable"
                  textValue="Checked Out"
                  className="flex items-center justify-between text-foreground hover:bg-primary hover:text-white dark:hover:text-gray-900 rounded-xl px-3 py-2 text-base sm:text-sm cursor-pointer"
                >
                  <span>Checked Out</span>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    </>
  )}
</div>
);
}
