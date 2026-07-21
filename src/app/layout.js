import { Urbanist, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/theme-provider";
import { ToastContainer } from 'react-toastify';
import SmoothScroll from "@/components/modules/shared/SmoothScroll";


// বডি টেক্সটের জন্য আরবানিস্ট ফন্ট লোড
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// হেডিং ও টাইটেলের জন্য পপিন্স ফন্ট লোড
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "BiblioDrop - Knowledge Delivered to Your Doorstep",
  description: "A premium and secure peer-to-peer library network. Browse global inventories, manage lists, and request physical deliveries backed by secure encrypted gateways.",
  keywords: ["BiblioDrop", "Online Library Management", "Book Delivery System", "Borrow Books Online", "Next.js Library App"],
  authors: [{ name: "Kamaluddin" }],
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${urbanist.variable} ${poppins.variable} antialiased h-full scroll-smooth`}
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{
          scrollBehavior: "smooth",
          overflowX: "hidden",
          width: "100%",
          margin: 0,
          padding: 0
        }}
      >
        <Providers>
          <SmoothScroll>
            <main className="min-h-screen transition-colors duration-300">
              {children}
            </main>
          </SmoothScroll>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}