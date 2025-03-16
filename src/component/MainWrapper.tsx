"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import { useState, useEffect, ReactNode, useCallback } from "react";
// import { useMediaQuery } from "react-responsive";
import MediaHeaderSection from "@/component/MediaHeader";
import HeaderSection from "@/component/Header";
import useInvalidPaths from "./hooks/invalid-path";
import { useSearchParams, usePathname } from "next/navigation";
import MainLayout from "@/component/MainLayout";
import React, { Suspense } from "react";
// Define props type
type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [full_name, setFullNames] = useState<string | undefined>(undefined);

   const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
        const checkScreenSize = () => {
          setIsMobile(window.innerWidth < 920);
        };
  
        checkScreenSize(); // Run once
        window.addEventListener("resize", checkScreenSize);
  
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
  const isInvalidPath = useInvalidPaths();

  const updateFullName = useCallback((name: string | undefined) => {
    setFullNames(name || undefined);
  }, []);

  useEffect(() => {
    const name = searchParams.get("fullName") ?? undefined; // Convert null to undefined
    updateFullName(name);
  }, [searchParams, updateFullName]);
  


  // Check if the current page is part of the dashboard
  const isDashboard = pathname.startsWith("/dashboard");

  // Use MainLayout if the user is logged in OR if it's a dashboard page
  const useMainLayout = full_name !== undefined || isDashboard;

  return (
    <main className={` ${isInvalidPath ? "mt-0" : ""} main-wrapping-container`}>
      <Provider store={store}>
        {useMainLayout ? (
          <MainLayout>
            <Suspense fallback={<p>Loading page...</p>}>{children}</Suspense>
          </MainLayout>
        ) : (
          <>
            {!isInvalidPath &&
              (isMobile ? <MediaHeaderSection /> : <HeaderSection />)}
            {children}
          </>
        )}
      </Provider>
    </main>
  );
}
