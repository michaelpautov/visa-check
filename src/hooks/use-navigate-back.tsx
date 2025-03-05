import { useRouter } from "@/i18n/routing";

export function useNavigateBack() {
  const router = useRouter();
  return router.back;
}
