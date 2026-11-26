export type FormKind = "contact" | "aanmelden" | "sollicitatie" | "klacht";

export type SendResult = { ok: true } | { ok: false; errors?: Record<string, string>; message?: string };

// Stuurt het formulier (multipart, zodat een cv mee kan) naar het eigen PHP-endpoint.
export async function sendForm(kind: FormKind, data: FormData): Promise<SendResult> {
  data.set("form", kind);
  try {
    const res = await fetch("/api/contact.php", { method: "POST", body: data, headers: { Accept: "application/json" } });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.ok) return { ok: true };
    return { ok: false, errors: json.errors, message: json.message };
  } catch {
    return { ok: false, message: "Er ging iets mis met de verbinding." };
  }
}
