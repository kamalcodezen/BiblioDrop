"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Truck,
  ChevronLeft,
  User,
  Hash,
  Edit3,
  Trash2,
  EyeOff,
  Star,
  MessageSquare,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import EditBookModal from "../dashboard/librarian/EditBookModal";
import { useRouter } from "next/navigation";
import DeleteBookModal from "../dashboard/librarian/DeleteBookModal";
import DeletedAssetScreen from "./DeletedAssetScreen";

import { toast } from "react-toastify";
import Loader from "../shared/Loader";
import { toggleBooksStatusById } from "@/lib/actions/librarian";
import AIInsightsCard from "./AIInsightsCard";

export default function BookDetails({ books, userComments }) {
  const router = useRouter();

  // console.log(books);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const { data: session, isPending } = authClient.useSession();
  const loggedInUser = session?.user;

  // Date Format
  const formattedDate = books?.createdAt
    ? new Date(books.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  // status & librarian check & button disable
  const isBookCheckedOut = books?.status === "Checked Out";
  const isOwnerLibrarian =
    loggedInUser && books && loggedInUser.id === books.librarianId;
  const isButtonDisabled = isBookCheckedOut || isOwnerLibrarian;

  // book edit modal function
  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <EditBookModal
        selectedBook={selectedBook}
        onCancel={() => setIsEditing(false)}
        onUpdateSuccess={() => router.refresh()}
      />
    );
  }

  // book delete modal function
  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsDeleteOpen(true);
  };

  // status change publish/unpublish librarian only
  const handleToggleStatus = async (bookId, currentStatus) => {
    try {
      const res = await toggleBooksStatusById({ bookId, currentStatus });
      if (res?.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Something went wrong while toggling status ");
    }
  };

  // page load
  if (isPending) {
    return <Loader />;
  }

  // book none exist
  if (!books) {
    return <DeletedAssetScreen />;
  }

  // চেক করছি ইউজার লগইন আছে কি না
  const checkAuthBeforeDelivery = (e) => {
    if (!session || !session.user) {
      e.preventDefault();
      toast.warn("Please login to request a book delivery! 🔐", {
        position: "top-right",
      });
      router.push("/signin");
      return false;
    }

    if (isButtonDisabled || isSubmitting) {
      e.preventDefault();
      return false;
    }

    setIsSubmitting(true);
    return true;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 font-urbanist text-foreground space-y-10">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-base sm:text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all mb-2 group"
      >
        <ChevronLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back
      </Button>

      {/* banner frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[32px] overflow-hidden border border-border/50 bg-card/40 backdrop-blur-xl"
      >
        {/* left side image */}
        <div className="lg:col-span-5 relative min-h-[350px] md:min-h-[500px] flex items-center justify-center p-8 bg-card-soft/30 overflow-hidden border-b lg:border-b-0 lg:border-r border-border/40">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 blur-[40px] opacity-25 dark:opacity-15 pointer-events-none"
            style={{ backgroundImage: `url(${books?.cover})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card-soft/40 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 90 }}
            className="w-full aspect-[3/4.2] max-w-[280px] rounded-2xl overflow-hidden bg-card border border-border/80 shadow-2xl z-10"
          >
            {books?.cover ? (
              <img
                src={books.cover}
                alt={books.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30">
                <BookOpen size={48} />
              </div>
            )}
          </motion.div>
        </div>

        {/* right side content */}
        <div className="lg:col-span-7 p-6 md:p-12 flex flex-col justify-between bg-transparent relative z-10">
          <div className="space-y-6">
            <div className="flex justify-between items-center w-full">
              <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest border border-primary/20">
                {books?.category || "General"}
              </span>

              <div className="flex items-center gap-1.5 text-base sm:text-sm font-bold text-muted-foreground">
                <Hash size={14} className="text-primary/70" />
                <span>
                  Popularity:{" "}
                  <span className="text-foreground">
                    {books?.requests || 0} requests
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-semibold font-poppins text-foreground tracking-tight leading-none">
                {books?.title || "Untitled Asset"}
              </h1>
              <p className="text-lg sm:text-base md:text-lg sm:text-base text-muted-foreground font-medium flex items-center gap-2 pt-1">
                <User size={16} className="text-primary/70" />
                <span>
                  By{" "}
                  <span className="text-foreground font-bold">
                    {books?.author || "Unknown Author"}
                  </span>
                </span>
              </p>
            </div>

            <div className="pt-6 border-t border-border/40 space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${!isBookCheckedOut ? "bg-green-500" : "bg-red-500"}`}
                />
                <span className="text-base sm:text-sm font-black uppercase tracking-wider text-muted-foreground">
                  Status:{" "}
                  {!isBookCheckedOut ? "Available For Delivery" : "Checked Out"}
                </span>
              </div>
              <p className="text-lg sm:text-base md:text-lg sm:text-base text-foreground/80 leading-relaxed font-urbanist antialiased">
                {books?.description ||
                  "No index description is registered for this ledger asset."}
              </p>
            </div>

            {/* ✨ AI Reader Insights ("Should I Read This?") */}
            <AIInsightsCard book={books} />
          </div>

          <div className="mt-10 space-y-6">
            {/* dynamic Fee & Date */}
            <div className="grid grid-cols-2 gap-4 border-t border-border/40 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center text-primary shadow-sm">
                  <Truck size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-widest block font-bold">
                    Delivery Fee
                  </span>
                  <span className="text-lg sm:text-base font-black font-poppins text-foreground">
                    ${books?.fee ? books.fee.toFixed(2) : "0.00"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center text-muted-foreground shadow-sm">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-widest block font-bold">
                    Date Cataloged
                  </span>
                  <span className="text-base sm:text-sm font-bold text-foreground/90">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* conditional buttons */}
            {isOwnerLibrarian ? (
              <div className="grid grid-cols-3 gap-3 pt-2 w-full">
                <Button
                  onClick={() => handleEditClick(books)}
                  className="bg-blue-500/10 px-8 text-blue-500 border border-blue-500/20 h-10 font-bold rounded-lg text-base sm:text-sm uppercase font-poppins tracking-wider cursor-pointer transition-transform active:scale-95"
                  startContent={<Edit3 size={14} />}
                >
                  Edit
                </Button>

                <Button
                  onClick={() => handleToggleStatus(books?._id, books?.status)}
                  className={`h-10 px-3  font-poppins tracking-wider text-base sm:text-sm uppercase cursor-pointer transition-transform active:scale-95 border rounded-lg ${
                    books?.status === "Published"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20"
                      : books?.status === "Unpublished"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                  }`}
                >
                  {books?.status === "Published" ? "Unpublish" : "Publish"}
                </Button>

                <Button
                  onClick={() => handleDeleteClick(books)}
                  className="px-5 bg-red-500/10 text-red-500 border border-red-500/20 h-10 font-bold rounded-lg text-base sm:text-sm uppercase font-poppins tracking-wider cursor-pointer transition-transform active:scale-95"
                  startContent={<Trash2 size={14} />}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <form
                action={`/api/payment`}
                method="POST"
                onSubmit={checkAuthBeforeDelivery} // 🎯 ওপরে তৈরি করা অথ কন্ডিশন এখানে ট্রিগার করে দেওয়া হলো ভাই
              >
                <input type="hidden" name="bookId" value={books?._id} />
                <input type="hidden" name="title" value={books?.title} />
                <input type="hidden" name="cover" value={books?.cover} />
                <input type="hidden" name="fee" value={books?.fee} />
                <input
                  type="hidden"
                  name="librarianId"
                  value={books?.librarianId}
                />
                <input
                  type="hidden"
                  name="librarianEmail"
                  value={books?.librarianEmail}
                />
                <input type="hidden" name="userId" value={loggedInUser?.id} />
                <input
                  type="hidden"
                  name="userEmail"
                  value={loggedInUser?.email}
                />

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={
                    isBookCheckedOut || isOwnerLibrarian || isSubmitting
                  } // লগইন না থাকলেও বাটন এনাবল থাকবে পাবলিক এক্সেসের জন্য
                  className={`w-full h-14 text-base sm:text-sm font-black font-poppins uppercase tracking-widest transition-all rounded-xl ${
                    !(isBookCheckedOut || isOwnerLibrarian || isSubmitting)
                      ? "btn-primary active:scale-[0.98] shadow-lg cursor-pointer"
                      : "bg-border/60 text-muted-foreground cursor-not-allowed border border-border/20 shadow-none opacity-60"
                  }`}
                  startContent={
                    !isSubmitting &&
                    !isBookCheckedOut &&
                    !isOwnerLibrarian && <Truck size={16} />
                  }
                >
                  {/* dynamic button text */}
                  {isBookCheckedOut
                    ? "Currently Checked Out"
                    : isSubmitting
                      ? "Opening Stripe Gateway..."
                      : "Request Home Delivery Now"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>

      {/* Reviews Section */}
      <div className="dashboard-card p-6 md:p-8 rounded-[24px] border border-border/50 bg-card/20 backdrop-blur-md space-y-6">
        <h3 className="text-lg font-black font-poppins text-foreground flex items-center gap-2 border-b border-border/40 pb-4">
          <MessageSquare size={20} className="text-primary" />
          Reader Reviews ({userComments.length})
        </h3>

        {/* comment/review section */}
        {userComments.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border/60 rounded-2xl bg-card-soft/20 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <MessageSquare size={32} className="opacity-30" />
            <p className="text-lg sm:text-base font-bold">
              No reviews posted yet
            </p>
            <p className="text-lg sm:text-base opacity-70">
              Be the first reader to share your insights on this book!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userComments.map((review) => (
              <div
                key={review._id}
                className="p-5 rounded-2xl border border-border/30 bg-card-soft/40 space-y-3 shadow-sm hover:border-border/60 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg sm:text-base text-foreground">
                    {review.userName}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    {review.date}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg sm:text-base text-foreground/80 font-urbanist leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Book Modal */}
      <DeleteBookModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setBookToDelete(null);
        }}
        bookToDelete={bookToDelete}
        onDeleteSuccess={() => router.refresh()}
      />
    </div>
  );
}
