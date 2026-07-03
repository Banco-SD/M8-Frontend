"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { authService } from "@/src/services/authService";
import { Sidebar } from "../../components/SideBar";
import { Topbar } from "../../components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    
    if (!user) {
      router.push("/login");
    } else {
      setTimeout(() => {
        setIsAuthorized(true);
      }, 0);
    }
  }, [router]);

  if (!isAuthorized) {
    return <Box className="min-h-screen bg-[#0b0f17]" />;
  }

  return (
    <Box className="flex min-h-screen bg-[#0b0f17] text-white">
      <Sidebar />
      <Box className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <Box className="flex-1 p-6 overflow-auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
}