import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Phone, Mail, ArrowRight } from "lucide-react";
import { sendForm, type FormKind } from "../lib/sendForm";
import { track } from "../lib/analytics";
import { SITE } from "../content/site";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "time" | "textarea" | "file" | "radio";
  required?: boolean;
  autoComplete?: string;
  half?: boolean;
  options?: string[];
  hint?: string;
};

const BASE: Field[] = [
  { name: "voornaam", label: "Voornaam", required: true, autoComplete: "given-name", half: true },
  { name: "achternaam", label: "Achternaam", required: true, autoComplete: "family-name", half: true },
  { name: "email", label: "E-mailadres", type: "email", required: true, autoComplete: "email", half: true },
  { name: "telefoon", label: "Telefoonnummer", type: "tel", autoComplete: "tel", half: true },
];

const FIELDS: Record<FormKind, Field[]> = {
  contact: [...BASE, { name: "bericht", label: "Bericht", type: "textarea", required: true }],
  aanmelden: [
    { name: "voornaam", label: "Voornaam jongere", required: true, half: true },
    { name: "achternaam", label: "Achternaam jongere", required: true, half: true },
    { name: "geboortedatum", label: "Geboortedatum", type: "date", half: true },
    { name: "telefoon", label: "Telefoonnummer", type: "tel", autoComplete: "tel", required: true, half: true },
    { name: "email", label: "E-mailadres", type: "email", autoComplete: "email", required: true },
    { name: "organisatie", label: "Naam organisatie", hint: "Als je via een organisatie aanmeldt", half: true },
    { name: "verwijzer", label: "Naam verwijzer", hint: "Niet verplicht", half: true },
    { name: "adres", label: "Adres", autoComplete: "street-address" },
    { name: "postcode", label: "Postcode", autoComplete: "postal-code", half: true },
    { name: "plaats", label: "Plaats", autoComplete: "address-level2", half: true },
    { name: "bericht", label: "Hulpvraag of bericht", type: "textarea" },
  ],
  sollicitatie: [
    ...BASE,
    { name: "functie", label: "Functie", options: ["Pedagogisch medewerker A", "Woonbegeleider", "Ambulant hulpverlener", "Gedragswetenschapper", "Open sollicitatie"] },
    { name: "bericht", label: "Motivatie", type: "textarea" },
    { name: "cv", label: "Cv (pdf of Word, max. 5 MB)", type: "file" },
  ],
  klacht: [
    ...BASE,
    { name: "adres", label: "Adres", autoComplete: "street-address" },
    { name: "postcode", label: "Postcode", autoComplete: "postal-code", half: true },
    { name: "plaats", label: "Woonplaats", autoComplete: "address-level2", half: true },
    { name: "voor", label: "Ik vul dit formulier in", type: "radio", options: ["voor mijzelf", "voor iemand anders"], required: true },
    { name: "bericht", label: "Informatie over de klacht", type: "textarea", required: true },
    { name: "gemeld", label: "Is de klacht al gemeld bij een medewerker? Zo ja, bij wie?" },
    { name: "datum", label: "Datum van de klacht", type: "date", half: true },
    { name: "tijd", label: "Tijdstip", type: "time", half: true },
    { name: "vertrouwenspersoon", label: "Wil je dat een vertrouwenspersoon de klacht afhandelt?", type: "radio", options: ["Ja", "Nee"] },
    { name: "oplossing", label: "Gewenste oplossing", type: "textarea" },
  ],
};

const SUBMIT: Record<FormKind, string> = {
  contact: "Bericht versturen",
  aanmelden: "Aanmelding versturen",
  sollicitatie: "Sollicitatie versturen",
  klacht: "Klacht versturen",
};

export default function ContactForm({ kind = "contact", dark = false }: { kind?: FormKind; dark?: boolean }) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fail, setFail] = useState<string | null>(null);
  const fields = FIELDS[kind];

  function validate(fd: FormData) {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = fd.get(f.name);
      if (f.required && (!v || String(v).trim() === "")) e[f.name] = `Vul ${f.label.toLowerCase()} in.`;
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v))) e[f.name] = "Vul een geldig e-mailadres in.";
      if (f.type === "file" && v instanceof File && v.size > 5 * 1024 * 1024) e[f.name] = "Je cv is groter dan 5 MB.";
    }
    if (kind === "klacht" && !fd.get("akkoord")) e.akkoord = "Ga akkoord met het privacybeleid.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    setFail(null);
    if (Object.keys(e).length) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setBusy(true);
    const res = await sendForm(kind, fd);
    setBusy(false);
    if (res.ok) {
      track("generate_lead", { form_name: kind });
      navigate("/bedankt/", { state: { name: String(fd.get("voornaam") || ""), kind } });
    } else {
      if (res.errors) setErrors(res.errors);
      setFail(res.message || "Het versturen is niet gelukt.");
    }
  }

  const lab = dark ? "label !text-white" : "label";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" encType="multipart/form-data">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${kind}-website`}>Website</label>
        <input id={`${kind}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {fields.map((f) => {
        const id = `${kind}-${f.name}`;
        const err = errors[f.name];
        const common = {
          id,
          name: f.name,
          required: f.required,
          "aria-invalid": err ? true : undefined,
          "aria-describedby": err ? `${id}-err` : f.hint ? `${id}-hint` : undefined,
        };
        return (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            {f.type === "radio" ? (
              <fieldset>
                <legend className={lab}>{f.label}{f.required && <span className="text-berry"> *</span>}</legend>
                <div className="mt-2 flex flex-wrap gap-3">
                  {f.options!.map((o) => (
                    <label key={o} className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border-2 border-line bg-white px-4 has-[:checked]:border-plum has-[:checked]:bg-plum-soft">
                      <input type="radio" name={f.name} value={o} className="accent-plum" /> {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <>
                <label htmlFor={id} className={lab}>
                  {f.label}{f.required && <span className={dark ? "text-sun" : "text-berry"}> *</span>}
                </label>
                {f.options ? (
                  <select {...common} className="field" defaultValue="">
                    <option value="" disabled>Kies een functie</option>
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea {...common} rows={5} className="field" />
                ) : f.type === "file" ? (
                  <input {...common} type="file" accept=".pdf,.doc,.docx" className="field file:mr-4 file:rounded-full file:border-0 file:bg-plum-soft file:px-4 file:py-2 file:font-bold file:text-plum" />
                ) : (
                  <input {...common} type={f.type || "text"} autoComplete={f.autoComplete} className="field" />
                )}
              </>
            )}
            {f.hint && !err && <p id={`${id}-hint`} className={`mt-1 text-[14px] ${dark ? "text-white/70" : "text-mute"}`}>{f.hint}</p>}
            {err && <p id={`${id}-err`} className={`mt-1.5 text-[14px] font-bold ${dark ? "text-sun" : "text-[#B5006B]"}`}>{err}</p>}
          </div>
        );
      })}

      {kind === "klacht" && (
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3">
            <input type="checkbox" name="akkoord" value="ja" className="mt-1.5 h-5 w-5 accent-plum" aria-invalid={errors.akkoord ? true : undefined} />
            <span>Ik ga akkoord met het <Link to="/privacy/" className="link">privacybeleid</Link>.</span>
          </label>
          {errors.akkoord && <p className="mt-1.5 text-[14px] font-bold text-[#B5006B]">{errors.akkoord}</p>}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
          {busy ? "Bezig met versturen…" : SUBMIT[kind]}
        </button>
        <p className={`text-[14px] ${dark ? "text-white/75" : "text-mute"}`}>We reageren zo snel mogelijk. Je gegevens zijn veilig bij ons.</p>
      </div>

      {fail && (
        <div role="alert" className="rounded-3xl bg-white p-5 text-ink ring-2 ring-berry sm:col-span-2">
          <p className="font-bold">{fail} Probeer het later opnieuw of neem direct contact op:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={SITE.phoneHref} className="btn-plum !min-h-[44px]"><Phone size={17} aria-hidden="true" /> {SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="btn-ghost !min-h-[44px]"><Mail size={17} aria-hidden="true" /> Mail ons</a>
          </div>
        </div>
      )}
    </form>
  );
}
