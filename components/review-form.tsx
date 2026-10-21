"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  IN_PERSON_CITIES,
  OCCASIONS,
} from "@/content/booking-options";
import { ChoiceGroup, Field, TextArea, TextInput } from "@/components/book/fields";
import { whatsappLink } from "@/lib/site";

const CITY_OPTIONS = [...IN_PERSON_CITIES, "Online"];
const RATING_OPTIONS = ["1", "2", "3", "4", "5"].map((value) => ({
  value,
  label: "★".repeat(Number(value)),
}));

interface ReviewFormState {
  alias: string;
  occasion: string;
  city: string;
  rating: string;
  text: string;
}

const INITIAL: ReviewFormState = {
  alias: "",
  occasion: "",
  city: "",
  rating: "5",
  text: "",
};

export function ReviewForm() {
  const [form, setForm] = useState<ReviewFormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (patch: Partial<ReviewFormState>) => {
    setForm((current) => ({ ...current, ...patch }));
    setErrors({});
  };

  const message = useMemo(() => {
    const alias = form.alias.trim() || "Anonymous";
    const stars = "★".repeat(Number(form.rating || 5));
    return [
      "Hi PlusOne 👋 Here's my review.",
      "",
      `Rating: ${stars} (${form.rating || 5}/5)`,
      `Name shown: ${alias}`,
      `Occasion: ${form.occasion || "not specified"}`,
      `City: ${form.city || "not specified"}`,
      "",
      `"${form.text.trim()}"`,
    ].join("\n");
  }, [form]);

  const href = whatsappLink(message);

  const validate = (): boolean => {
    const found: Record<string, string> = {};
    if (!form.occasion) found.occasion = "Which occasion was it?";
    if (!form.city) found.city = "Where did you meet?";
    if (form.text.trim().length < 20) {
      found.text = "Give us at least a sentence or two.";
    }
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  return (
    <form className="space-y-8">
      <ChoiceGroup
        legend="Your rating"
        name="review-rating"
        value={form.rating}
        onChange={(value) => update({ rating: value })}
        options={RATING_OPTIONS}
      />

      <ChoiceGroup
        legend="Occasion"
        name="review-occasion"
        value={form.occasion || null}
        onChange={(value) => update({ occasion: value })}
        options={OCCASIONS.map((occasion) => ({
          value: occasion,
          label: occasion,
        }))}
        error={errors.occasion}
      />

      <ChoiceGroup
        legend="Where did you meet?"
        name="review-city"
        value={form.city || null}
        onChange={(value) => update({ city: value })}
        options={CITY_OPTIONS.map((city) => ({ value: city, label: city }))}
        error={errors.city}
      />

      <Field
        label="Name to show (optional)"
        htmlFor="review-alias"
        hint="Leave blank and we'll publish it as Anonymous."
      >
        <TextInput
          id="review-alias"
          value={form.alias}
          onChange={(event) => update({ alias: event.target.value })}
          placeholder="Anonymous"
          maxLength={40}
        />
      </Field>

      <Field
        label="Your review"
        htmlFor="review-text"
        error={errors.text}
        hint="What happened, how it felt, would you rebook. Write it like you'd text a friend."
      >
        <TextArea
          id="review-text"
          value={form.text}
          onChange={(event) => update({ text: event.target.value })}
          placeholder="Booked someone for my office party. Showed up on time, remembered every name I whispered, and left before my manager could ask anything."
          aria-invalid={Boolean(errors.text)}
          maxLength={700}
        />
      </Field>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          if (!validate()) event.preventDefault();
        }}
        className="btn btn-accent text-base"
      >
        <MessageCircle size={18} aria-hidden />
        Send review on WhatsApp
      </a>
      <p className="text-xs text-muted">
        Reviews are read by a human before they go up. We publish them under an
        alias, never with your contact details.
      </p>
    </form>
  );
}
