import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

type Status = "pendente" | "aceito" | "recusado";

function verifyPassword(password: string) {
  const expected = process.env.STAFF_PASSWORD;
  if (!expected) throw new Error("STAFF_PASSWORD não configurado no servidor");
  if (password !== expected) throw new Error("Senha incorreta");
}

const passwordSchema = z.object({ password: z.string().min(1) });

export const staffListCheckins = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => passwordSchema.parse(input))
  .handler(async ({ data }) => {
    verifyPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("checkins")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const staffUpdateStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        password: z.string().min(1),
        id: z.string().uuid(),
        status: z.enum(["pendente", "aceito", "recusado"]),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    verifyPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("checkins")
      .update({ status: data.status as Status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const staffDeleteCheckin = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ password: z.string().min(1), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    verifyPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("checkins").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const staffVerifyPassword = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => passwordSchema.parse(input))
  .handler(async ({ data }) => {
    verifyPassword(data.password);
    return { ok: true };
  });
