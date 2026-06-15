import { useEffect, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { staffVerifyPassword } from "@/lib/staff-checkins.functions";

const KEY = "ff_staff_password";

export function useStaffPassword() {
  const [password, setPassword] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const verify = useServerFn(staffVerifyPassword);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem(KEY) : null;
    setPassword(stored);
    setReady(true);
  }, []);

  const login = useCallback(
    async (pwd: string) => {
      await verify({ data: { password: pwd } });
      sessionStorage.setItem(KEY, pwd);
      setPassword(pwd);
    },
    [verify],
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(KEY);
    setPassword(null);
  }, []);

  return { password, ready, login, logout };
}
