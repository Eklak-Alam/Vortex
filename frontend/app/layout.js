import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/components/Navbar"; // We will create this next
import Footer from "@/components/Footer"; // We will create this next

export const metadata = {
  title: "Vortex | Enterprise Task Manager",
  description: "Manage your projects with efficiency.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <QueryProvider>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}