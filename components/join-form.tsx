"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { IN_PERSON_CITIES, VIRTUAL_MODES } from "@/content/booking-options";
import { ChoiceGroup, Field, TextArea, TextInput } from "@/components/book/fields";
import { whatsappLink } from "@/lib/site";

const CITY_OPTIONS = [...IN_PERSON_CITIES, "Other city"];

const AVAILABILITY_OPTIONS = [
  "Weekday evenings",
  "Weekends",
  "Late nights (virtual)",
  "Full-time / flexible",
];

interface JoinFormState {
  name: string;
  city: string;
  mode: string;
  availability: string;
  rate: string;
  about: string;
}

const INITIAL: JoinFormState = {
  name: "",
  city: "",
  mode: "In person",
  availability: "",
  rate: "",
  about: "",
};

export function JoinForm() {
  const [form, setForm] = useState<JoinFormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (patch: Partial<JoinFormState>) => {
    setForm((current) => ({ ...current, ...patch }));
    setErrors({});
  };

  const message = useMemo(
    () =>
      [
        "Hi PlusOne 👋 I'd like to apply to become a companion.",
        "",
        `Preferred name / alias: ${form.name.trim() || "not specified"}`,
        `City: ${form.city || "not specified"}`,
        `I'd like to work: ${form.mode}`,
        `Availability: ${form.availability || "not specified"}`,
        `Rate I'd like: ${form.rate.trim() || "happy to discuss"}`,
        "",
        `About me: ${form.about.trim() || "—"}`,
      ].join("\n"),
    [form],
  );

  const href = whatsappLink(message);

  const validate = (): boolean => {
    const found: Record<string, string> = {};
    if (form.name.trim().length < 2) found.name = "What should we call you?";
    if (!form.city) found.city = "Where are you based?";
    if (!form.availability) found.availability = "When can you work?";
    if (form.about.trim().length < 30) {
      found.about = "A couple of sentences is enough — tell us about you.";
    }
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        if (validate()) {
          window.open(href, "_blank", "noopener,noreferrer");
        }
      }}
    >
      <Field
        label="Preferred name or alias"
        htmlFor="join-name"
        error={errors.name}
        hint="This is what clients will see. Your real name stays private."
      >
        <TextInput
          id="join-name"
          value={form.name}
          onChange={(event) => update({ name: event.target.value })}
          placeholder="Aarav"
          maxLength={40}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>

      <ChoiceGroup
        legend="Your city"
        name="join-city"
        value={form.city || null}
        onChange={(value) => update({ city: value })}
        options={CITY_OPTIONS.map((city) => ({ value: city, label: city }))}
        error={errors.city}
      />

      <ChoiceGroup
        legend="What kind of work?"
        name="join-mode"
        value={form.mode}
        onChange={(value) => update({ mode: value })}
        options={[
          { value: "In person", label: "In person" },
          { value: "Virtual", label: `Virtual (${VIRTUAL_MODES.join(" / ")})` },
          { value: "Both", label: "Both" },
        ]}
      />

      <ChoiceGroup
        legend="When can you usually work?"
        name="join-availability"
        value={form.availability || null}
        onChange={(value) => update({ availability: value })}
        options={AVAILABILITY_OPTIONS.map((option) => ({
          value: option,
          label: option,
        }))}
        error={errors.availability}
      />

      <Field
        label="Rate you'd like to charge (optional)"
        htmlFor="join-rate"
        hint="In-person companions usually charge ₹399–₹499 an hour. Leave blank and we'll suggest one."
      >
        <TextInput
          id="join-rate"
          value={form.rate}
          onChange={(event) => update({ rate: event.target.value })}
          placeholder="₹450/hr"
          maxLength={30}
        />
      </Field>

      <Field
        label="About you"
        htmlFor="join-about"
        error={errors.about}
        hint="Languages you speak, what you're good at, what you'd rather avoid. This becomes your ad."
      >
        <TextArea
          id="join-about"
          value={form.about}
          onChange={(event) => update({ about: event.target.value })}
          placeholder="Hindi and English. I've survived 40+ weddings and I'm genuinely good with relatives. Available on weekends, prefer events over late nights."
          aria-invalid={Boolean(errors.about)}
          maxLength={700}
        />
      </Field>

      <button type="submit" className="btn btn-accent text-base">
        <MessageCircle size={18} aria-hidden />
        Send my application
      </button>
      <p className="text-xs text-muted">
        This opens WhatsApp with your details pre-written. A human replies, and
        we never publish your ID or real name.
      </p>
    </form>
  );
}
