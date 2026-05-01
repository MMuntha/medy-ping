import React from "react";
import Sidebar from "@/components/organisms/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="md:ml-[260px] min-h-screen">
        <div className="p-6 md:p-8 pb-24 md:pb-8 max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
