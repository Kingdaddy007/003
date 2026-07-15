# Section Plan — Invitation / Qualified Inquiry and Footer

**Stable job:** Help the visitor name the domestic friction they want to change and determine mutual fit.  
**Current owner:** `components/FooterSection.jsx`  
**Recommended owners:** `InquirySection` + `SiteFooter`  
**Depends on:** Confirmed contact destination, privacy handling and final fit language

## Approved outcome

The page becomes quiet. The visitor is invited to describe what no longer works in the way they live at home, receives a clear fit expectation, and can submit or choose a confirmed contact route. The footer then closes the experience without competing for attention.

## Critical current correction

The current footer hardcodes `hello@studiobespoke.design`, while the evidence dossier records conflicting public addresses involving `studiobespoke` and `studiobspoke`. Do not ship any `mailto` destination until the studio confirms the correct address.

The current black rounded CTA pill also reads as generic product/SaaS UI. Replace it with a quiet text action or understated rectangular control that belongs to the editorial system.

## Reference evidence

**Observed reference behaviour**

- R2 uses a simple dark contact chapter before the footer.
- R3 combines engagement information, direct routes and a structured footer.
- R4 connects conversion, FAQ and footer through one visual language.
- R6 uses a bordered approach/contact panel followed by a photographic footer.
- R1's dense kinetic footer deliberately raises intensity, which conflicts with Studio Bespoke's desired inquiry posture.

**Recommended Studio Bespoke adaptation**

- Use a calm mineral field with one strong prompt and a clear form.
- Carry the established rule/caption cadence into the footer.
- Keep the end still; readiness has already been earned.

**Implementation inference**

- Native form controls and ordinary document flow are sufficient.
- Submission integration should be selected only after the endpoint, privacy requirements and owner workflow are known.

## Inquiry hierarchy

```text
eyebrow: Begin with the ritual
h2: Tell us what no longer works in the way you live at home.
fit note: limited annual capacity and unsuitable urgent timelines
qualified inquiry form
privacy / response expectation
success or error state
```

Do not add a room image unless testing proves the field feels empty rather than intentionally calm. If media is used, it must be a quiet edge crop that does not compete with form completion.

## Form fields

### Required base fields

- Name
- Email
- Project location
- Home type
- Scope being considered
- Desired start period
- `What no longer works in the way you live at home?` (long-form)
- How they found the studio
- Privacy acknowledgement where legally required

### Conditional fields

- Phone/WhatsApp: optional unless the studio confirms it is operationally required.
- Investment range: do not add until the studio supplies honest bands and wants to use them as a fit criterion.
- File upload: defer; it increases privacy, storage and support complexity.

Use plain-language labels above controls. Placeholders are examples, not replacements for labels.

## Fit language

Recommended posture:

- Studio Bespoke curates a limited number of projects each year.
- Projects requiring completion within one or two months may not be the right fit.
- The first conversation begins with the home, scope and daily friction—not a promise of immediate availability.

Avoid “exclusive,” “apply now,” artificial scarcity, countdowns or guaranteed response times that have not been operationally confirmed.

## Composition

### Desktop

- Introductory prompt occupies approximately columns 1–6.
- Form occupies columns 7–12 or begins below after a deliberate pause.
- Use thin rules, clear label spacing and one action control.
- Keep the submit action visually confident but not louder than the prompt.
- Success state should replace or summarize the form region without jumping the page unexpectedly.

### Footer

After Inquiry:

- confirmed Studio Bespoke name/mark;
- primary navigation;
- confirmed contact and social routes;
- location;
- privacy/terms if available;
- copyright.

No giant animated wordmark, rotating text field, modal menu or new brand motif.

## Motion contract

### Communication job

Slow the visitor into a considered action and provide clear feedback.

### Stillness comparison

Stillness is the correct choice. Form completion and trust require stability.

### Approved interaction motion

- Focus/hover transitions: approximately 200–300ms.
- Validation message appears adjacent to the field without shaking.
- Submit state may use a small inline progress indicator.
- Success confirmation uses a short opacity transition with no travel requirement.
- No scroll-bound entrance, pin, parallax, background loop or kinetic footer.

## Form states

| State | Requirement |
| --- | --- |
| Default | All labels, fit note and required indicators visible |
| Focus | High-contrast ring and persistent label |
| Invalid | Field-specific message linked with `aria-describedby`; values preserved |
| Submitting | Button disabled appropriately; status announced; no duplicate submission |
| Success | Clear confirmation and next-step expectation; no unsupported response time |
| Server/network error | Explain failure, preserve values, provide confirmed alternate route if available |

## Submission and security boundary

Before enabling production submission, decide:

- endpoint/provider;
- data owner and retention;
- spam protection that does not create an inaccessible CAPTCHA wall;
- server-side validation and sanitization;
- rate limiting;
- email notification destination;
- privacy notice and consent requirements;
- success/failure logging without exposing personal information.

The visual plan does not authorize sending messages or choosing a third-party provider.

## Mobile

- Prompt, fit note and form stack in one column.
- Controls meet touch target requirements.
- Do not create two-column name/email fields at narrow widths.
- Keyboard type matches field (`email`, `tel`).
- Submit and error messages remain visible above the mobile browser keyboard when possible.

## Reduced motion

- Identical layout; focus and status changes may use instant or very short opacity transitions.

## Accessibility

- Use a real `<form>` with labels and fieldsets where choices share a legend.
- Required status is communicated in text, not colour alone.
- Error summary links to invalid fields when multiple errors exist.
- Status region uses appropriate live announcement without repeating every keystroke.
- Colour contrast and focus remain valid on the mineral field.
- Contact links use confirmed destinations and descriptive labels.

## Performance and privacy

- No background media is required.
- Load form integration only when the visitor approaches Inquiry if the provider adds significant JavaScript.
- Do not persist form values to analytics or local storage without a documented reason and consent.
- Never expose API keys or recipient secrets in client code.

## Build steps

1. Confirm correct email, phone/social routes, response workflow and privacy requirements.
2. Finalize fields and fit language with the studio's actual qualification process.
3. Build semantic static form and all local validation states.
4. Build separate Site Footer with confirmed navigation.
5. Select/implement submission integration under a separate approved technical task.
6. Add server validation, spam controls and status handling.
7. Test keyboard, screen reader, mobile keyboard, network failure and duplicate submission.

## Acceptance criteria

- Exact approved prompt is the dominant read.
- No unverified email or contact route is active.
- Form works by keyboard and touch and preserves values on error.
- Fit language is calm, factual and not artificial scarcity.
- No pill-style SaaS CTA, kinetic footer or background video appears.
- Success and failure states are complete before production.
- Footer closes the page quietly and all links are valid.

