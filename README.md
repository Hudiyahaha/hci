# CS3014 D4 prototype: What Happens Next

Team Aloo's working prototype for D4. It shows students what happens after they contact a counselling service, using a timeline as the hub of a hub-and-spoke structure.

The wireframes in `docs/wireframes/` are grayscale for Part A. The build uses the Part B design system described in `docs/design-system.md`, with its values in `src/styles/tokens.css`.

## Run it

You need Node.js 20.19 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

| Command | What it does |
|---|---|
| `npm run dev` | Runs the prototype locally and reloads when files change |
| `npm test` | Checks the message builder and that all 24 IA cards appear on the right screens |
| `npm run build` | Creates the hostable site in `dist/` |
| `npm run preview` | Runs the built site locally |

## Project layout

| Path | What's there |
|---|---|
| `src/content/service-data.js` | **Service facts. Edit this file to add verified information.** |
| `src/content/structure.js` | Timeline stages, sections and question prompts |
| `src/screens/` | One function per screen |
| `src/components.js` | Shared timeline, fact box and button markup |
| `src/router.js` | Maps each address to its screen |
| `src/main.js` | Loading, feedback, validation and copying |
| `src/lib/` | Message builder and text escaping |
| `src/styles/` | Design tokens, base styles and components |
| `tests/` | Automated checks |
| `docs/wireframes/` | Wireframe flow to import into Figma |
| `docs/design-system.md` | Part B design system notes |
| `docs/ai-accessibility-check.md` | Claude's automated check, which doesn't replace the team's audit |
| `tools/make_wireframes.py` | Regenerates the wireframe file |

## Service content

Most facts in `src/content/service-data.js` are placeholder text, shown with a "Sample" label. They aren't real information about any counselling service. A few stay "Not confirmed" to show that state.

To add a real fact, change `sample("Label", "Text")` to `verified("Label", "Real text")`, then set `lastChecked` to the date you checked. Never use sample text for `urgentContact`.

## What is built and what is simulated

| Part | Status |
|---|---|
| Navigation, message builder, validation, copying | Built |
| Service details | Simulated (Wizard-of-Oz): labeled sample text in a local file stands in for a service feed |
| Loading delay | Simulated |
| Failed load | Simulated: add `?fail=1` to the address, as in http://localhost:5173/?fail=1 |
| Sending messages | Left out on purpose: the student copies the message into their own email |

Nothing is written to cookies or browser storage. Selections stay in memory until the page reloads. The hosting provider may still keep its own access logs.

## Host it

Run `npm run build`, then publish the `dist/` folder with GitHub Pages or Netlify. The copy button needs `https` or `localhost`.

## Regenerate the wireframes

```bash
python tools/make_wireframes.py docs/wireframes/d4-wireframes.svg
```
