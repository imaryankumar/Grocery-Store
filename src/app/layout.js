import { Outfit } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./globals.css";
import Headers from "@/components/Headers";
const inter = Outfit({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import DarkModeProvider from "@/config/DarkModeProvider";

export const metadata = {
  title: "Grocery Store",
  description: "Online Grocery Store App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <DarkModeProvider>
            <Headers />
            {children}
          </DarkModeProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
