import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "TalentAI — AI-Powered Candidate Screening",
  description: "Umurava AI Hackathon — Smart talent screening powered by Gemini AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-auto">
              {children}
            </main>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#1f2937", color: "#f9fafb", border: "1px solid #374151" },
              success: { iconTheme: { primary: "#10b981", secondary: "#f9fafb" } },
              error: { iconTheme: { primary: "#ef4444", secondary: "#f9fafb" } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
