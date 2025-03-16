"use client";
import { useState, useEffect, ReactNode } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import MediaHeaderSection from "@/component/MediaHeader";
import HeaderSection from "@/component/Header";
import MainLayout from "@/component/MainLayout";
import useInvalidPaths from "./hooks/invalid-path";
import React, { Suspense } from "react";

type ClientSideWrapperProps = {
  children: ReactNode;
};

export default function ClientSideWrapper({ children }: ClientSideWrapperProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isInvalidPath = useInvalidPaths();

  const [full_name, setFullNames] = useState<string | undefined>(undefined);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Ensure no SSR mismatch
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const name = searchParams.get("fullName");
      setFullNames(name ?? undefined);
    }
  }, [searchParams, hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      const checkScreenSize = () => setIsMobile(window.innerWidth < 920);
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, [hasMounted]);

  const isDashboard = hasMounted ? pathname.startsWith("/dashboard") : false;
  const useMainLayout = full_name !== undefined || isDashboard;

  if (!hasMounted) return <p>Loading...</p>; // Avoid hydration issues

  return (
    <main className={` ${isInvalidPath ? "mt-0" : ""} main-wrapping-container`}>
      {useMainLayout ? (
        <MainLayout>
          <Suspense fallback={<p>Loading page...</p>}>{children}</Suspense>
        </MainLayout>
      ) : (
        <>
          {!isInvalidPath && (isMobile ? <MediaHeaderSection /> : <HeaderSection />)}
          {children}
        </>
      )}
    </main>
  );
}
