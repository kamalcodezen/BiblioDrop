"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenText, ChevronLeft } from "lucide-react";

import BookCard from "../shared/BookCard";
import BooksFilter from "./BookFilter";
import Pagination from "./Pagination";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

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
        />
      </motion.div>

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

      <AnimatePresence mode="popLayout">
        {paginatedBooks.length > 0 ? (
          <motion.div
            key="books-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 mt-4 items-start"
          >
            {paginatedBooks.map((bookItem, index) => (
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
                setSearchQuery("");
                setSelectedCategory("all");
                setMinFee("");
                setMaxFee("");
                setAvailability("all");
                setPage(1);
              }}
              className="mt-8 text-base sm:text-sm font-semibold text-primary/80 cursor-pointer border-b border-primary/30 pb-0.5"
            >
              Reset Search & Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {paginatedBooks.length > 0 && (
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
        Showing {paginatedBooks.length} of{" "}
        {serverMeta ? serverMeta.totalItems : books.length} available
        repository items
      </div>
    </>
  );
}
