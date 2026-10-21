# Registration paused: what to restore when the next edition opens

In October 2026 the homepage was switched from Hope Camp #7 (Integro, July 2026, now finished) to the next two editions, with registration closed:

- **Winter Camp #4**: Arieșeni, județul Alba, 25 - 28 februarie 2027
- **Hope Camp #8**: Sequoia, Săcuieu, județul Cluj, 3 - 8 august 2027

Everything that pointed to the old Hope Camp #7 registration (`https://app.inrola.com/r/tso/hope-camp-7`) was **commented out, not deleted**. Every commented block has a note next to it (`Inscrierile nu sunt deschise inca` or `Urmatoarele 4 intrebari sunt despre editia trecuta`), so you can find them all with:

```
grep -rni "inscrierile nu sunt deschise inca\|Urmatoarele 4 intrebari" components lib app
```

## Checklist to re-enable registration

### 1. Registration link
Every link below still points to `hope-camp-7`. **Replace it with the new edition's inrola link** when you uncomment it.

| File | What was commented out | How to restore |
|---|---|---|
| `components/Navbar.tsx` | `registrationUrl` constant | Uncomment and update the URL |
| `components/Navbar.tsx` | "Inscrie-te acum" button in the **desktop** menu | Remove the `{/* ... */}` around the `<Link>` |
| `components/Navbar.tsx` | "Inscrie-te acum" button in the **mobile** menu | Remove the `{/* ... */}` around the `<Link>` |
| `components/Navbar.tsx` | "contul meu" entry in `navLinks` | Uncomment the line and update the URL |
| `components/Footer.tsx` | "Contul meu" link (Navigare column) | Remove the `{/* ... */}` around the `<Link>` and update the URL |
| `components/Hero.tsx` | "INSCRIE-TE" button | Uncomment the `<Link>`, delete the `null` below it, and update the URL |

### 2. Hero button logic
`components/Hero.tsx` currently forces `hasEnded` to `true`, so the banner always shows "VEZI POZE" instead of "INSCRIE-TE". Change it back so it depends on a date, e.g. the end date of the edition that is open for registration:

```ts
const [hasEnded] = useState<boolean>(() => +edition.endDate < +new Date());
```

### 3. FAQ (`lib/constants.ts`, `faqData`)
- **"Cum pot să mă înscriu?"**: the original answer is inside the comment block. The visible one currently says "Momentan înscrierile nu sunt deschise…". Swap the visible one for the original, or write a new answer.
- **4 questions inside the `/* ... */` block**. Remove the comment markers and **update the facts** first:
  - "După ce mă înscriu ce trebuie să fac?": uses `sumToPay.deposit` and `dateRange.depositPaymentDueDate`
  - "Care este taxa taberei și ce include aceasta?": uses `sumToPay` and `dateRange` (number of days/nights)
  - "Care sunt modalitățile de plată?": uses `payTaxToOptions` (names and phone numbers of who collects payments)
  - The original "Cum pot să mă înscriu?" answer

### 4. Values in `lib/constants.ts` that are still from Hope Camp #7
These are **not** on the homepage any more but are used by registration, the admin panel and the FAQ answers above. Update them for the new edition:

- `title` ("Hope Camp #7") and `editionName` ("Integro")
- `dateRange`: `startDate`, `endDate`, `depositPaymentDueDate`
- `location`: Integro, județul Mureș (also used by `CampInProgressPopup`)
- `sumToPay`: prices and deposit
- `payTaxToOptions`: who collects payments

### 5. Browser tab title (`app/layout.tsx`)
The title was changed to the generic `"Hope Camp - Tineret Speranta Oradea"`. The original (`${title}: ${editionName} - …`) is commented out right above it. Restore it once `title` and `editionName` are updated, or keep the generic one.

## What changed on the homepage (not commented out, just new)
- `lib/constants.ts`: new `upcomingEditions` list (name, number, dates, location, map links). **Edit dates and places here.**
- `components/Hero.tsx`: shows both upcoming editions instead of "#7", each with an "Adaugă în calendar" button.
- `components/AddToCalendar.tsx`: new calendar button (Google Calendar link, or a `.ics` download for Apple Calendar/Outlook).
- `components/CountdownTimer.tsx`: counts down to the next edition that hasn't started yet.
- `components/Locatie.tsx`: shows both locations with a map each, instead of Integro.
