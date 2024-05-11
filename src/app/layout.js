import { Outfit } from "next/font/google";
import "./globals.css";
import Headers from "@/components/Headers";
const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Grocery Store",
  description: "Online Grocery Store App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Headers />
        {children}
      </body>
    </html>
  );
}
