"use client";
import React, { useEffect, useState } from "react";
import DashboardSideBarPage from "./DashBoardSideBar";
import DashboardNavBarPage from "./DashBoardNavBar";
import MobileSidebar from "./MediaDashBoardSideBar";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { RootState } from "@/store/store";
import { useMediaQuery } from "react-responsive";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // Get fullName from Redux store
  const fullName = useAppSelector((state: RootState) => state.auth.fullName);

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     if (!fullName) {
  //       setLoading(true);
  //       setTimeout(() => router.push("/page-not-found"), 1000); 
  //       return;
  //     }
  //     setLoading(false); 
  //   };

  //   verifyToken();
  // }, [fullName, router]);

  // if (loading) {
  //   return (
  //     <div className="">
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  return (
    <div className="dashboard-main-container">
      {
        isMobile?<MobileSidebar/>:<DashboardSideBarPage />
      }
      
      <div className="dashboard-main-container-2">
        <DashboardNavBarPage />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
