"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenText, ChevronLeft, Sparkles, RefreshCw, X } from "lucide-react";

import BookCard from "../shared/BookCard";
import BooksFilter from "./BookFilter";
import Pagination from "./Pagination";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { searchBooksByMood } from "@/lib/api/ai";

export default function AllBooks({ allBooks = [], filters }) {
  const router = useRouter();

  // Extract database books array and server-side metadata safely
  const books = Array.isArray(allBooks) ? allBooks : allBooks?.books || [];
  const serverMeta = !Array.isArray(allBooks) ? allBooks?.meta : null;

  // Synchronization core filter states
  const [searchQuery, setSearchQuery] = useState(filters?.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    filters?.category || "all",
  );
  const [minFee, setMinFee] = useState(filters?.minFee || "");
  const [maxFee, setMaxFee] = useState(filters?.maxFee || "");
  const [availability, setAvailability] = useState(filters?.status || "all");

  // AI Mood Search states
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiMoodResults, setAiMoodResults] = useState(null);
  const [detectedMood, setDetectedMood] = useState("");
  const [activeMoodQuery, setActiveMoodQuery] = useState("");

  const handleAiMoodSearch = async (queryToSearch) => {
    const q = queryToSearch || aiQuery;
    if (!q || !q.trim()) return;

    setIsAiSearching(true);
    try {
      const res = await searchBooksByMood(q.trim());
      if (res?.success && Array.isArray(res.books)) {
        setAiMoodResults(res.books);
        setDetectedMood(res.moodDetected || "Discovered Vibe");
        setActiveMoodQuery(q.trim());
      } else {
        setAiMoodResults([]);
      }
    } catch (err) {
      console.error("AI Mood Search error:", err);
      setAiMoodResults([]);
    } finally {
      setIsAiSearching(false);
    }
  };

  const handleClearAiSearch = () => {
    setAiMoodResults(null);
    setDetectedMood("");
    setActiveMoodQuery("");
    setAiQuery("");
  };

  // 🎯 FIXED: Synchronize active page step pointer explicitly with incoming server filters
  const [page, setPage] = useState(Number(filters?.page) || 1);
  const itemsPerPage = 8;

  // 🎯 FIXED: Listen and update local page state whenever search filters change or reset
  useEffect(() => {
    setPage(Number(filters?.page) || 1);
  }, [filters?.page]);

  // Dynamic URL query string synchronization pipeline
  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) sp.set("search", searchQuery);
    if (selectedCategory !== "all") sp.set("category", selectedCategory);
    if (availability !== "all") sp.set("status", availability);
    if (minFee && minFee.trim() !== "") sp.set("minFee", minFee);
    if (maxFee && maxFee.trim() !== "") sp.set("maxFee", maxFee);

    // 🎯 FIXED: Send "page" and "perPage" explicitly to match express route tokens
    if (page > 1) sp.set("page", page.toString());
    sp.set("perPage", itemsPerPage.toString());

    const path = `?${sp.toString()}`;
    router.push(path, { scroll: false });
  }, [
    selectedCategory,
    router,
    searchQuery,
    availability,
    minFee,
    maxFee,
    page,
  ]);

  // Reset active pagination page index pointer to 1 when criteria parameters update
  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  /* ==========================================================================
     🔒 PREVIOUS CLIENT-SIDE FILTERING LOGIC (LOCKED & COMMENTED AS REQUESTED)
     ==========================================================================
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        !searchQuery ||
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        book.category?.toLowerCase() === selectedCategory.toLowerCase();

      const bookFee = Number(book.fee) || 0;
      const matchesMinFee = minFee === "" || bookFee >= Number(minFee);
      const matchesMaxFee = maxFee === "" || bookFee <= Number(maxFee);

      const matchesAvailability =
        availability === "all" ||
        (availability === "Available" && book.status === "Published") ||
        (availability === "Unavailable" && book.status === "Checked Out");

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinFee &&
        matchesMaxFee &&
        matchesAvailability
      );
    });
  }, [searchQuery, selectedCategory, minFee, maxFee, availability, books]);
  ========================================================================== */

  // Compute total pages boundary safely from backend records
  const totalPages = serverMeta
    ? serverMeta.totalPages
    : Math.ceil(books.length / itemsPerPage);

  // Directly pass data layer items since server database executes slice offsets
  const paginatedBooks = useMemo(() => {
    if (serverMeta) return books;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return books.slice(start, end);
  }, [books, page, serverMeta]);

  const isAiSearchActive = aiMoodResults !== null;
  const displayBooks = isAiSearchActive ? aiMoodResults : paginatedBooks;

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 130, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  };

  return (
    <>
      <motion.div variants={filterVariants} initial="hidden" animate="visible">
        <BooksFilter
          searchQuery={searchQuery}
          setSearchQuery={(v) => handleFilterChange(setSearchQuery, v)}
          selectedCategory={selectedCategory}
          setSelectedCategory={(v) =>
            handleFilterChange(setSelectedCategory, v)
          }
          minFee={minFee}
          setMinFee={(v) => handleFilterChange(setMinFee, v)}
          maxFee={maxFee}
          setMaxFee={(v) => handleFilterChange(setMaxFee, v)}
          availability={availability}
          setAvailability={(v) => handleFilterChange(setAvailability, v)}
          isAiMode={isAiMode}
          setIsAiMode={setIsAiMode}
          aiQuery={aiQuery}
          setAiQuery={setAiQuery}
          onAiSearch={handleAiMoodSearch}
          isAiSearching={isAiSearching}
          activeMoodQuery={activeMoodQuery}
          onClearAiSearch={handleClearAiSearch}
        />
      </motion.div>

      {/* AI Searching Loader Banner */}
      {isAiSearching && (
        <div className="w-11/12 mx-auto py-12 flex flex-col items-center justify-center gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary">
            <Sparkles size={28} className="animate-spin" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold font-poppins text-foreground">
              Discovering Books for Your Vibe...
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              BiblioAI is scanning library synopses and finding the best thematic matches.
            </p>
          </div>
        </div>
      )}

      {/* Active AI Mood Filter Banner */}
      {isAiSearchActive && !isAiSearching && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-11/12 mx-auto mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/25 backdrop-blur-md flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-black tracking-widest text-primary">
                  AI Vibe Match
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                  {detectedMood || "Discovered"}
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                Showing {displayBooks.length} books curated for: &ldquo;<span className="italic font-bold text-primary">{activeMoodQuery}</span>&rdquo;
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleClearAiSearch}
            className="bg-card/80 hover:bg-card text-foreground border border-border/60 text-xs font-bold rounded-xl px-4 py-2 cursor-pointer transition-all"
          >
            ✕ Clear AI Mood Filter
          </Button>
        </motion.div>
      )}

      <div className="text-base sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        <Button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-base sm:text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
        >
          <ChevronLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back
        </Button>
      </div>

      {!isAiSearching && (
        <AnimatePresence mode="popLayout">
          {displayBooks.length > 0 ? (
            <motion.div
              key="books-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 mt-4 items-start"
            >
              {displayBooks.map((bookItem, index) => (
                <motion.div
                  key={bookItem?._id || bookItem?.id || `book-fallback-key-${index}`}
                  variants={cardVariants}
                  layout
                  className="h-full"
                >
                  <BookCard book={bookItem} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="books-empty"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="dashboard-card max-w-7xl mx-auto flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-border"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center text-primary">
                  <BookOpenText size={40} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                No matching items found
              </h3>
              <button
                onClick={() => {
                  if (isAiSearchActive) {
                    handleClearAiSearch();
                  } else {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setMinFee("");
                    setMaxFee("");
                    setAvailability("all");
                    setPage(1);
                  }
                }}
                className="mt-8 text-base sm:text-sm font-semibold text-primary/80 cursor-pointer border-b border-primary/30 pb-0.5"
              >
                {isAiSearchActive ? "Clear AI Filter & View All Books" : "Reset Search & Filters"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {!isAiSearchActive && paginatedBooks.length > 0 && (
        <Pagination
          page={serverMeta ? serverMeta.currentPage : page}
          total={totalPages}
          onChange={(newPage) => setPage(newPage)}
          color="success"
          showShadow={true}
          isCompact={true}
        />
      )}

      <div className="mb-4 text-base sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-8">
        Showing {displayBooks.length} of{" "}
        {isAiSearchActive
          ? `${displayBooks.length} AI matched items`
          : `${serverMeta ? serverMeta.totalItems : books.length} available repository items`}
      </div>
    </>
  );
}

