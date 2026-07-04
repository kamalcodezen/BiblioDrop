"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { authClient } from "@/lib/auth-client";
import {
  BookOpen,
  Mail,
  Lock,
  User,
  Upload,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

export default function SignupForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  //  INDUSTRY STANDARD: অবজেক্ট স্টেট
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoUrl: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // input field change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // role change handler
  const handleRoleChange = (selectedRole) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
  };

  // imgBB image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //  সেফটি গার্ড: ফাইল ফরম্যাট এবং সাইজ চেক
    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload a valid image file! ");
    }

    setUploadingImage(true);
    const toastId = toast.loading("Uploading profile avatar to imgBB... ");

    const imgBBFormData = new FormData();
    imgBBFormData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imgBBFormData,
        },
      );

      const data = await response.json();

      if (data.success) {
        // আপলোড হলে ডাইরেক্ট লিঙ্কটি স্টেটে পুশ করে দিচ্ছি
        setFormData((prev) => ({
          ...prev,
          photoUrl: data.data.url,
        }));
        toast.update(toastId, {
          render: "Avatar uploaded successfully! ",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        throw new Error("imgBB response error");
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Image upload failed! Please try again. ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার (ইমেইল সাইন-আপ)
  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match! ❌", {
        position: "top-right",
      });
    }

    // ছবি আপলোড সম্পূর্ণ হওয়ার জন্য অপেক্ষা
    if (uploadingImage) {
      return toast.warn("Please wait until the image upload finishes! ⏳");
    }

    setLoading(true);

    try {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          image: formData.photoUrl || "https://ibb.co/pTrv3HT",
          role: formData.role,
        },
        {
          onSuccess: async (ctx) => {
            if (ctx?.data?.token || ctx?.data?.user) {
              fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: formData.email,
                  name: formData.name,
                  image: formData.photoUrl,
                  role: formData.role,
                }),
              }).catch((err) => console.error("Error sending email:", err));

              toast.success(
                `Welcome  Registered successfully as ${formData.role === "librarian" ? "Librarian" : "Reader"}!`,
                { position: "top-right", autoClose: 2000 },
              );
            }

            setLoading(false);
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Registration encountered an error! ❌",
            );
          },
        },
      );
    } catch (error) {
      toast.error(error?.message || "Internal network synchronizer error! ");
    } finally {
      setLoading(false);
    }
  };

  // google login
  const googleSignUp = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  if (!mounted) return null;

  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div
        className="relative hidden lg:flex overflow-hidden"
        style={{
          backgroundImage: "url('/images/signup.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="mt-10 max-w-xl">
              <h2 className="text-6xl font-semibold leading-tight">
                Your Local Library, Delivered.
              </h2>
              <p className="mt-6 text-lg text-white/80">
                Discover thousands of books, connect with local libraries, and
                get knowledge delivered straight to your door.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl p-5">
              <h3 className="text-3xl font-bold">12K+</h3>
              <p className="text-lg sm:text-base text-white/70">Books</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl p-5">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-lg sm:text-base text-white/70">Readers</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl p-5">
              <h3 className="text-3xl font-bold">120+</h3>
              <p className="text-lg sm:text-base text-white/70">Libraries</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center justify-center px-5 py-10 bg-background">
        <div className="absolute inset-0 hero-gradient" />

        <div className="relative w-full max-w-xl rounded-lg border border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-3xl shadow-2xl p-8 md:p-10">
          {/*  LOGO */}
          <div className="flex  items-center justify-center gap-3 mb-3">
            <svg
              viewBox="0 0 24 24"
              className="w-9 h-9 text-primary transition-transform duration-300 group-hover:scale-105"
              fill="currentColor"
            >
              <path d="M2 7h5v2H2zm-1 4h7v2H1zm2 4h5v2H3z" />
              <path d="M20 8h-3V4H9v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM14 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4V7h2v6h-2zm4 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
            <h2 className="text-2xl font-bold">BiblioDrop</h2>
          </div>

          {/* HEADING */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Create Account</h2>
            <p className="mt-1 text-muted-foreground">
              Join BiblioDrop and start exploring thousands of books.
            </p>
          </div>

          {/* FORM */}
          <form className="mt-8 space-y-4" onSubmit={handleSignup}>
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="input-field pl-11"
              />
            </div>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input-field pl-11"
              />
            </div>

            {/* Real time image upload input */}
            <div className="relative">
              <Upload
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="input-field pl-11 pt-2.5 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-base sm:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer text-muted-foreground"
              />
            </div>

            {/* image upload success message */}
            {formData.photoUrl && (
              <p className="text-[11px] text-emerald-500 font-medium pl-2">
                ✓ Live Avatar Sync Complete! URL secure inside state matrix.
              </p>
            )}

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="input-field pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer z-10"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input-field pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer z-10"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* ROLE BUTTONS SECTION */}
            <div>
              <h3 className="font-semibold mb-3">Choose Your Role</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleChange("user")}
                  className={`rounded-xl border p-4 transition-all cursor-pointer ${
                    formData.role === "user"
                      ? "btn-primary"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  Reader
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("librarian")}
                  className={`rounded-2xl border p-4 transition-all cursor-pointer ${
                    formData.role === "librarian"
                      ? "btn-primary"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  Librarian
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || googleLoading || uploadingImage}
              className="btn-primary w-full h-12 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-lg sm:text-base text-muted-foreground">
              OR
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Google login button */}
          <button
            onClick={() => {
              googleSignUp();
              toast.info("Google signup coming soon! ", {
                position: "top-right",
                autoClose: 3000,
              });
            }}
            disabled={loading || googleLoading || uploadingImage}
            type="button"
            className="w-full rounded-xl border border-border bg-card py-3 font-medium hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {googleLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Signup with Google...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.253-3.133C18.41 1.945 15.56 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.345 0 10.565-4.444 10.565-10.76 0-.726-.08-1.282-.175-1.67H12.24z"
                  />
                </svg>
                <span>Continue With Google</span>
              </>
            )}
          </button>

          {/* LOGIN DIRECTION */}
          <p className="text-center mt-6 text-lg sm:text-base">
            Already have an account?
            <Link
              href="/signin"
              className="ml-2 text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
