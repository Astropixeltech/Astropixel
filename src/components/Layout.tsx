import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  flushTop?: boolean;
}

const Layout = ({ children, flushTop = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className={flushTop ? "flex-1" : "flex-1 pt-20"}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
