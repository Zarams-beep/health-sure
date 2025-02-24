"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useIsInvalidPath() {
  const pathname = usePathname();

  const invalidPaths = [
    "/auth/log-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/verify",
  ];

  return useMemo(() => {
    return invalidPaths.includes(pathname);
  }, [pathname]);
}
