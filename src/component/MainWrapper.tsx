"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MediaHeaderSection from "@/component/MediaHeader";
import HeaderSection from "@/component/Header";
import useInvalidPaths from "./hooks/invalid-path";
import { ReactNode } from "react";

type MainWrapperProps = {
  children: ReactNode;
};

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

export default function MainWrapper({ children }: MainWrapperProps) {
  const mounted = useMounted();
  // Only use the media query on the client.
  const isMobile = useMediaQuery({ maxWidth: 920 });
  const isInvalidPath = useInvalidPaths();

  // Option 1: Render nothing until mounted
  if (!mounted) {
    return null;
  }

  // Option 2: Or you can assume a default, e.g., non-mobile view until mounted.
  // const isMobileOrDefault = mounted ? isMobile : false;

  return (
    <main className={isInvalidPath ? "mt-0" : ""}>
      {isMobile ? <MediaHeaderSection /> : <HeaderSection />}
      {children}
    </main>
  );
}
