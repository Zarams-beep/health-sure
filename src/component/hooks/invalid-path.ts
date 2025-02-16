"use client";

import { usePathname } from "next/navigation";

export default function useInvalidPaths() {
  const pathName = usePathname();

  const invalidPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/verify",
  ];

  const isInvalid = invalidPaths.some((path) => pathName.includes(path));

  return isInvalid;
}
