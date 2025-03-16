"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import { useState, useEffect, ReactNode, useCallback, Suspense } from "react";
import MediaHeaderSection from "@/component/MediaHeader";
import HeaderSection from "@/component/Header";
import useInvalidPaths from "./hooks/invalid-path";
import { usePathname, useSearchParams } from "next/navigation";
import MainLayout from "@/component/MainLayout";

type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
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

  return (
    <main className={` ${isInvalidPath ? "mt-0" : ""} main-wrapping-container`}>
      <Provider store={store}>
        <Suspense fallback={<p>Loading...</p>}>
          <SearchParamHandler updateFullName={updateFullName} />
        </Suspense>

        {full_name !== undefined || pathname.startsWith("/dashboard") ? (
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

// Separate component for useSearchParams inside Suspense
function SearchParamHandler({
  updateFullName,
}: {
  updateFullName: (name: string | undefined) => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const name = searchParams.get("fullName") ?? undefined;
    updateFullName(name);
  }, [searchParams, updateFullName]);

  return null; // This component only handles effects
}
