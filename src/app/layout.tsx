import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Newport News Local Hub | Your Community Connect",
  description: "Stay updated with Newport News events, city news, and local guides. Powered by AI for the Hampton Roads community.",
  openGraph: {
    title: "Newport News Local Hub",
    description: "Your daily hub for events, news, and guides in Newport News, VA.",
    url: "https://newportnews.info",
    siteName: "NN Local Hub",
    images: [
      {
        url: "/og-image.png", // Replace with a real image path later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newport News Local Hub",
    description: "Your daily hub for events, news, and guides in Newport News, VA.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight">NN<span className="text-yellow-400">Hub</span></span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                  <a href="/guides" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Local Guides</a>
                  <a href="/resources" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Resources</a>
                  <a href="/blog" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Blog</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white text-lg font-bold mb-4">Newport News Local Hub</h3>
                <p className="text-sm">Bringing the best of Newport News and Hampton Roads to your screen. Everyday, AI-curated and resident-approved.</p>
              </div>
              <div>
                <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-yellow-400">City Official Site</a></li>
                  <li><a href="#" className="hover:text-yellow-400">Virginia Open Data</a></li>
                  <li><a href="#" className="hover:text-yellow-400">Eventbrite NN</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
                <p className="text-xs">As an Amazon Associate, we earn from qualifying purchases. This site uses Google AdSense.</p>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs">
              © {new Date().getFullYear()} NN Local Hub. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
