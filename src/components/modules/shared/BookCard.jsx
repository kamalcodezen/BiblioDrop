"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

const BookCard = ({ book }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card h-[375px] shadow-sm transition-all duration-300 ">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      {/* ================= Normal View ================= */}
      <div className="h-full p-5 flex flex-col transition-all duration-500 group-hover:-translate-y-full">
        <div className="space-y-4">
          {/* Book Cover */}
          <div className="h-30 w-full overflow-hidden rounded-lg border border-border/30">
            <img
              src={book?.cover || "https://ibb.co/xKfqCQm9"}
              alt={book?.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="text-center space-y-1">
            <h3
              className="text-lg font-bold font-poppins text-foreground line-clamp-1"
              title={book?.title}
            >
              {book?.title || "Untitled Book"}
            </h3>

            <p className="text-lg sm:text-base text-muted-foreground line-clamp-1">
              by {book?.author || "Unknown Author"}
            </p>
          </div>

          {/* AI Match Reason Badge */}
          {book?.matchReason && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/15 border border-primary/30 text-primary text-[11px] font-bold font-poppins"
              title={book.matchReason}
            >
              <Sparkles size={12} className="shrink-0 text-primary animate-pulse" />
              <span className="truncate">{book.matchReason}</span>
            </div>
          )}

          {/* Category + Fee */}
          <div className="flex items-center justify-between rounded-xl border border-border/40 bg-card-soft/50 px-4 py-3">
            <span className="text-base sm:text-sm text-muted-foreground">
              {book?.category || "General"}
            </span>

            <span className="font-bold text-primary">${book?.fee || 0}</span>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/books/${book?._id}`}
          className="btn-primary mt-auto w-full inline-flex items-center justify-center text-lg sm:text-base font-semibold"
        >
          View Details
        </Link>
      </div>

      {/* ================= Hover View ================= */}
      <div className="absolute inset-0 p-5 bg-card translate-y-full group-hover:translate-y-0 transition-all duration-500 flex flex-col justify-between z-10">
        <div>
          {/* Top Badges */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-base sm:text-sm font-semibold">
              {book?.category || "General"}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-base sm:text-sm font-semibold ${
                book?.status === "Published"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {book?.status === "Published" ? "Available" : "Checked Out"}
            </span>
          </div>

          {/* Title */}
          <div className="mt-4 sm:mt-5">
            <h3 className="text-xl font-bold font-poppins line-clamp-1">
              {book?.title}
            </h3>

            <p className="mt-1 text-lg sm:text-base text-muted-foreground">
              by {book?.author}
            </p>
          </div>

          {/* Details */}
          <div className="mt-2 sm:mt-5 space-y-2 sm:space-y-3 text-lg sm:text-base">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-semibold text-primary">
                ${book?.fee || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Added Date</span>
              <span>{book?.dateAdded || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <span>{book?.category || "General"}</span>
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/10 p-3 text-base sm:text-sm text-primary">
              ✓ Home Delivery Available
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <Link
          href={`/books/${book?._id}`}
          className="btn-primary w-full inline-flex items-center justify-center text-lg sm:text-base font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
