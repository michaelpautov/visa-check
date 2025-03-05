import { useRouter } from "@/i18n/routing";
import { useCallback } from "react";

export function useNavigate(path: string) {
  const router = useRouter();

  const handleNavigate = useCallback(() => {
    router.push(path);
  }, [path, router]);

  return handleNavigate;
}
