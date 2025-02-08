"use client";

import { usePathname } from "next/navigation";

export default function useInvalidPaths() {
  const PathName = usePathname();
  const invalidPaths = ["studio", "admin"];
  const isInvalid = invalidPaths.some((path) => PathName.includes(path));
  return isInvalid
}
