import { useRouter } from "@/i18n/routing";
import { useCallback } from "react";
import { useParams } from "next/navigation";

export function useNavigate(path: string) {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string;

  const handleNavigate = useCallback(() => {
    router.push(path, { locale });
  }, [path, router, locale]);

  return handleNavigate;
}
