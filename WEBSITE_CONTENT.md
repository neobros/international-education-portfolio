# International Education Consultant — Website Content & Data

Source: https://claude.ai/artifact/77Egyc9Jo3EAdwASLNvqaf
Extracted: 2026-09-21

Everything on the original page is here: text, data, form fields and behaviour. You can rebuild it with a different UI.
Items in `[square brackets]` are placeholders in the original, so replace them with real content.

---

## 0. Site meta

| Key | Value |
|---|---|
| Page title | `Your Name — International Education Consultant` |
| Brand name | Your Name |
| Brand subtitle | International Education Consultant |
| Language | en |
| Sections (in order) | Nav → Hero → How I help → Destinations → Credentials → Partnerships → University tours → Success stories → Reviews → About / Journey → How it works → Contact form → Social → Final CTA → Footer |

### Contact config (edit before launch)
```js
const CONTACT = { whatsapp: "94XXXXXXXXX", email: "you@example.com" };
```

---

## 1. Navigation (sticky header)

- **Brand:** Your Name, with the subtitle *International Education Consultant* (links to `#top`)
- **Menu links:**
  | Label | Anchor |
  |---|---|
  | About me | `#about` |
  | Destinations | `#destinations` |
  | Success stories | `#stories` |
  | University tours | `#tours` |
  | Partnerships | `#partnerships` |
  | Contact | `#contact` |
- **Header CTA button:** 📩 Send your profile → `#contact` (hidden on mobile)
- **Mobile:** "Menu" toggle button below 980px. Clicking a link closes the menu.

---

## 2. Hero

- **Role (eyebrow):** International Education Consultant
- **H1:** Your Name
- **Promise:** Study abroad. Choose the right destination. Build your future.
- **Sub text:** Personalised guidance for students exploring study in Australia, New Zealand, the United Kingdom, Europe, Asia and North America.
- **CTAs:**
  - Send your profile (primary / amber) → `#contact`
  - Book a consultation (ghost) → `#contact`
- **Credential line:** pill with a green dot reading "Registered education agent", followed by the text "Australia, New Zealand, United Kingdom"

### Hero visual: "Departures board"
An airport-style split-flap board that lists the destinations.
- Header: **STUDY DESTINATIONS** · "Intake planning"
- Columns: (flag) | Destination | Status
- Shows 5 destinations per page across 3 pages and rotates every 6 seconds. Letters flip in with a staggered animation, which is off when reduced motion is on.
- Status badge: `REGISTERED` (green) for `reg`, `ENQUIRE` (amber outline) for `open`
- Footer: "Showing {n} of 3 · new registrations added as they're granted"
- Accessible label: "Destination board listing 14 study destinations, three with current registrations"

---

## 3. How I help (`#help`)

- **H2:** Your study abroad journey starts with the right advice.
- **Lede:** Choosing a country and university is more than submitting an application. I help you understand your options based on your academic background, budget, career goals, English level and future plans.

| Icon | Service | Description |
|---|---|---|
| 🧭 | Destination selection | Compare countries that suit your profile, not just the popular ones. |
| 🏫 | University and course selection | Find institutions and programs that fit your goals. |
| 💰 | Budget planning | Understand tuition, living costs and financial options before you commit. |
| 📄 | Application guidance | Support with your documents and the application process. |
| 🛂 | Visa guidance | Know which visa requirements and documents apply to you. |
| 🏠 | Pre-departure | Prepare for accommodation, travel and settling in overseas. |
| 🚀 | Career-focused planning | Choose study with your longer-term career in mind. |

---

## 4. Destinations finder (`#destinations`)

- **H2:** One profile. Multiple possibilities.
- **Lede:** Your academic background may open doors in more than one country. Tell us a little about yourself and see where to start the conversation.

### Quick profile card
- **Title:** Your quick profile
- **Text:** A starting point, not an assessment. Send your full profile for personal advice.
- **Field: "What do you want to study?"** (select)
  | value | label |
  |---|---|
  | `""` | Any field |
  | `it` | IT and computing |
  | `health` | Nursing and health |
  | `business` | Business and management |
  | `eng` | Engineering |
  | `hosp` | Hospitality and tourism |
- **Field: "What matters most?"** (toggle chips, multi-select)
  | value | label |
  |---|---|
  | `work` | Post-study work |
  | `cost` | Lower cost |
  | `near` | Close to home |
  | `english` | English-taught |
- **Button:** Clear (resets both fields)

### Destination data (14 countries)
> Editor note from the original: *the matching rules are illustrative placeholders. Update the tags for each country so they reflect your own advice.*

| Code | Name | Flag | Status | Fields | Priorities |
|---|---|---|---|---|---|
| AUS | Australia | 🇦🇺 | reg | it, health, business, eng, hosp | work, english |
| NZL | New Zealand | 🇳🇿 | reg | it, health, business, eng, hosp | work, english |
| GBR | United Kingdom | 🇬🇧 | reg | it, health, business, eng, hosp | work, english |
| IRL | Ireland | 🇮🇪 | open | it, business, eng | work, english |
| CAN | Canada | 🇨🇦 | open | it, health, business, eng, hosp | work, english |
| FRA | France | 🇫🇷 | open | business, hosp, eng | cost |
| FIN | Finland | 🇫🇮 | open | it, eng, business | cost |
| MLT | Malta | 🇲🇹 | open | hosp, business, it | cost, english |
| CHE | Switzerland | 🇨🇭 | open | hosp, business | — |
| ITA | Italy | 🇮🇹 | open | eng, business | cost |
| JPN | Japan | 🇯🇵 | open | it, eng, business | near |
| SGP | Singapore | 🇸🇬 | open | it, business, hosp | near, english |
| MYS | Malaysia | 🇲🇾 | open | it, business, eng, hosp | near, cost, english |
| ARE | Dubai / UAE | 🇦🇪 | open | business, hosp, it | near, english |

Same data as JSON:
```json
[
  {"c":"AUS","n":"Australia","f":"🇦🇺","st":"reg","fields":["it","health","business","eng","hosp"],"p":["work","english"]},
  {"c":"NZL","n":"New Zealand","f":"🇳🇿","st":"reg","fields":["it","health","business","eng","hosp"],"p":["work","english"]},
  {"c":"GBR","n":"United Kingdom","f":"🇬🇧","st":"reg","fields":["it","health","business","eng","hosp"],"p":["work","english"]},
  {"c":"IRL","n":"Ireland","f":"🇮🇪","st":"open","fields":["it","business","eng"],"p":["work","english"]},
  {"c":"CAN","n":"Canada","f":"🇨🇦","st":"open","fields":["it","health","business","eng","hosp"],"p":["work","english"]},
  {"c":"FRA","n":"France","f":"🇫🇷","st":"open","fields":["business","hosp","eng"],"p":["cost"]},
  {"c":"FIN","n":"Finland","f":"🇫🇮","st":"open","fields":["it","eng","business"],"p":["cost"]},
  {"c":"MLT","n":"Malta","f":"🇲🇹","st":"open","fields":["hosp","business","it"],"p":["cost","english"]},
  {"c":"CHE","n":"Switzerland","f":"🇨🇭","st":"open","fields":["hosp","business"],"p":[]},
  {"c":"ITA","n":"Italy","f":"🇮🇹","st":"open","fields":["eng","business"],"p":["cost"]},
  {"c":"JPN","n":"Japan","f":"🇯🇵","st":"open","fields":["it","eng","business"],"p":["near"]},
  {"c":"SGP","n":"Singapore","f":"🇸🇬","st":"open","fields":["it","business","hosp"],"p":["near","english"]},
  {"c":"MYS","n":"Malaysia","f":"🇲🇾","st":"open","fields":["it","business","eng","hosp"],"p":["near","cost","english"]},
  {"c":"ARE","n":"Dubai / UAE","f":"🇦🇪","st":"open","fields":["business","hosp","it"],"p":["near","english"]}
]
```

### Country card
- Flag, name
- `reg` cards show the tag "Registered" and the text "Full guidance available"
- `open` cards show the text "Enquire for options"

### Filter logic
- A country matches when (no field selected OR the country's fields include it) AND it has every selected priority.
- Non-matching cards are dimmed, not hidden. Matching cards get a highlighted border.
- Result-line messages:
  - Nothing selected: "All 14 destinations shown. Select any country for details."
  - Some matches: "{count} destination(s) worth discussing for your profile. Faded ones may still work, so ask."
  - No matches: "No close matches for this combination. Send your profile and I'll look at it personally."

### Country detail modal (opens when a card is clicked)
- Header: flag, country name, subtitle ("Registered destination" or "Enquire for current options")
- Info rows, each currently showing "Details to be added":
  1. Popular programs
  2. Entry requirements
  3. Tuition range
  4. Scholarships and finance
  5. Student work
  6. Accommodation
  7. Visa information
  8. Post-study options
  9. Universities
  10. Current intakes
- CTA: **Ask about this destination** fills the contact form's "Countries you're considering" field with the country name, closes the modal and jumps to `#contact`

---

## 5. Credentials (`#credentials`)

- **H2:** Professional credentials and registrations
- **Lede:** Education guidance backed by recognised industry registrations. Each new registration is added here as it's granted.

| Flag | Country | Status | Credential text | Badge slot |
|---|---|---|---|---|
| 🇦🇺 | Australia | Current | [Exact credential title, e.g. your QEAC certification] | Certificate or badge image · ID number |
| 🇳🇿 | New Zealand | Current | [Exact credential title as issued] | Certificate or badge image · ID number |
| 🇬🇧 | United Kingdom | Current | [Exact credential title as issued] | Certificate or badge image · ID number |
| 🌍 | More destinations | In progress | Additional country registrations are on the way. | (none, dashed "coming soon" style card) |

> Note: Only show the exact titles, numbers and logos you're authorised to use. Most schemes publish brand-use rules for their badges.

---

## 6. Partnerships (`#partnerships`)

- **H2:** Building connections across global education
- **Lede:** Relationships with universities, institutions and industry partners across multiple international markets.
- **Photo gallery** (5 images, the first one large; each is an "Add photo" placeholder):

| # | Caption | Location / date |
|---|---|---|
| 1 (featured) | Partnership meeting with [Institution] | Colombo, Sri Lanka, 2026 |
| 2 | University partnership discussion | Melbourne, Australia, 2026 |
| 3 | Industry collaboration | Sri Lanka, 2026 |
| 4 | Education fair | [City], 2026 |
| 5 | Institution visit | [City], 2026 |

---

## 7. University tours (`#tours`)

- **H2:** Explore universities with me
- **Lede:** Real campuses and first-hand information from visits.

| Video title | Country |
|---|---|
| University of West London campus tour | 🇬🇧 United Kingdom |
| University visit | 🇲🇾 Malaysia |
| University visit | 🇦🇺 Australia |
| University visit | 🇱🇰 Sri Lanka |

- **CTA:** View all university tours
- > Note: Replace each thumbnail with a YouTube embed or a short clip. Your final website host must allow embeds.

---

## 8. Success stories (`#stories`)

- **H2:** From dreams to study abroad
- **Lede:** Don't take my word for it. Hear from students I've helped.
- **Filter chips:** All · Australia · New Zealand · UK · Asia (single select, hides stories that don't match)

| Region key | Student | Destination · Program | Quote |
|---|---|---|---|
| au | [Student name] | 🇦🇺 Australia · Nursing | From my first consultation to enrolment… |
| uk | [Student name] | 🇬🇧 United Kingdom · Master's | [Short quote from the video] |
| asia | [Student name] | 🇲🇾 Malaysia · Bachelor's | [Short quote from the video] |
| nz | [Student name] | 🇳🇿 New Zealand · Business | [Short quote from the video] |

- Each card is a portrait video (4:5) with a play button.
- **CTA:** Watch more success stories

---

## 9. Reviews (`#reviews`)

- **H2:** What students say
- Horizontal scroll carousel of 5-star review cards:

| Stars | Review | Name | Country |
|---|---|---|---|
| ★★★★★ | "The guidance helped me understand my options and choose the right pathway." | [Student name] | 🇬🇧 United Kingdom |
| ★★★★★ | "From the first consultation to my application, everything was explained clearly." | [Student name] | 🇦🇺 Australia |
| ★★★★★ | "[Real review text from Google or a written testimonial]" | [Student name] | 🇳🇿 New Zealand |
| ★★★★★ | "[Real review text from Google or a written testimonial]" | [Student name] | 🇲🇾 Malaysia |

> Note: Sample wording only. Use real reviews with students' permission before launch.

---

## 10. About / My journey (`#about`)

- **Portrait:** "Add your portrait" placeholder, arch-shaped 4:5 image
- **H2:** My journey in international education
- **Paragraphs:**
  1. My journey began with a simple goal: helping students make better decisions about their future.
  2. Since then, I've worked with students, universities, institutions and industry partners across several international education markets.
  3. Today I help students explore opportunities in Australia, New Zealand, the United Kingdom, Europe, Asia and North America.
- **Motto (large):** Understand the student first. Then find the right destination, institution and pathway.
- **CTA:** Read my full story

---

## 11. How it works (`#process`)

| Step | Title | Description |
|---|---|---|
| 1 | Send your profile | Share your academic background, English level and goals. |
| 2 | Profile assessment | I review your circumstances and study objectives. |
| 3 | Explore your options | We identify suitable countries, courses and universities. |
| 4 | Choose your path | Compare options and pick the pathway that fits best. |
| 5 | Application and visa | Guidance through your application and the relevant visa process. |
| 6 | Prepare to go | Get ready for travel, accommodation and your first weeks. |

---

## 12. Contact / Lead form (`#contact`)

- **H2:** Not sure which country is right for you?
- **Lede:** Don't choose a country before you understand your options. Send your academic profile and I'll help you explore destinations that suit your background and goals.
- **Small text:** Prefer to talk first? *Book a consultation* and mention it in the form.

### Form fields

| id | Label | Type | Required | Options / placeholder | Validation error |
|---|---|---|---|---|---|
| name | Full name | text | ✅ | — | Enter your name. (min 2 chars) |
| wa | WhatsApp number | tel | ✅ | placeholder `+94 …` | Enter a WhatsApp number with country code. (≥ 8 digits) |
| email | Email | email | ✅ | — | Enter a valid email address. |
| qual | Highest qualification | select | ✅ | Select / O/L or equivalent / A/L or equivalent / Diploma / Bachelor's degree / Master's degree | Select your qualification. |
| eng | English test status | select | — | Not taken yet / Booked / IELTS completed / PTE completed / TOEFL completed / Other | — |
| area | Preferred study area | text | — | placeholder `e.g. IT, nursing` | — |
| budget | Budget range (per year) | select | — | Not sure yet / Under USD 10,000 / USD 10,000–20,000 / USD 20,000–35,000 / Over USD 35,000 | — |
| countries | Countries you're considering | text | — | placeholder `e.g. Australia, UK, open to ideas` | — |
| cv | Upload CV (optional) | file | — | accepts `.pdf, .doc, .docx` | — |

- **Submit button:** Send my profile

### After a valid submit
The form is hidden and a success panel appears:
- **Title:** Profile ready to send
- **Text:** Choose how to send it. Attach your CV in the message if you have one.
- **Buttons:**
  - **Send on WhatsApp** → `https://wa.me/{CONTACT.whatsapp}?text={message}`
  - **Send by email** → `mailto:{CONTACT.email}?subject=Study abroad profile: {name}&body={message}`
  - **Edit details** → shows the form again

**Message template:**
```
Hello, I'd like help choosing where to study.

Name: {name}
WhatsApp: {wa}
Email: {email}
Highest qualification: {qual}
English test: {eng}
Study area: {area || "-"}
Budget: {budget}
Countries considering: {countries || "-"}
```

> Note: Set your WhatsApp number and email in CONTACT. On the live site, connect this form to a CRM so CV uploads are stored. (In the original, the CV file is not sent anywhere.)

---

## 13. Social (`#social`)

- **H2:** Follow my education journey

| Platform | Handle / label |
|---|---|
| Instagram | @yourhandle |
| Facebook | Your page |
| TikTok | @yourhandle |
| YouTube | University tours |
| LinkedIn | Professional updates |

**Content topic tags:** 🎓 Study abroad · 🌍 Destination updates · 🏫 University visits · 🎥 Student stories · 📚 Education tips · 🛂 Visa updates · 💼 Careers · 🎤 Webinars and events

---

## 14. Final CTA

- **H2:** Your future has more than one destination.
- **Lede:** Let's find the option that fits your profile, goals and future.
- **Route line:** 🇦🇺 AUS ✈ 🇳🇿 NZL ✈ 🇬🇧 GBR ✈ 🇪🇺 EUR ✈ 🇯🇵 ASIA ✈ 🇨🇦 CAN ✈ 🇦🇪 UAE
- **CTAs:** Book a consultation · Send your profile (both → `#contact`)

---

## 15. Footer

- © 2026 Your Name · International Education Consultant
- Visa information is general guidance. Immigration advice is provided only by appropriately licensed professionals.

---

## Appendix: Original design (for reference only)

You're changing the UI, so treat this as reference rather than a requirement.

- **Fonts:** Bricolage Grotesque (display/body), JetBrains Mono (board, step numbers)
- **Light palette:** ink `#0F2A4A`, ink-soft `#3C5270`, paper `#F3F6F9`, card `#FFFFFF`, line `#D5DEE8`, sky `#9CC7E8`, sky-wash `#E3EFF8`, amber `#F5B301`, go/green `#2E8B6A`, board `#10233D`, muted `#5B6B7F`
- **Dark palette:** ink `#E6EEF6`, ink-soft `#B3C3D6`, paper `#0E1B2C`, card `#15263B`, line `#28405C`, sky `#5E9ACB`, sky-wash `#18314D`, board `#07121F`, muted `#91A3B8`
- **Interactive features to carry over:** rotating destinations board, destination finder with filters and a detail modal, story region filter, mobile menu, lead form with validation that builds a WhatsApp or email message.

### Placeholder checklist (before launch)
- [ ] Your name, portrait, full story
- [ ] WhatsApp number and email (CONTACT)
- [ ] Credential titles, ID numbers, badge images (AU / NZ / UK)
- [ ] Destination tags and the 10 info fields per country
- [ ] Partnership photos, institution names, cities
- [ ] University tour videos (YouTube embeds)
- [ ] Student names, videos, quotes (with consent)
- [ ] Real reviews (with permission)
- [ ] Social media handles and links
- [ ] Connect the form to a CRM for CV uploads
