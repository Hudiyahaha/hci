"""Generates the grayscale wireframe flow as an SVG that Figma can import.

Usage: python tools/make_wireframes.py docs/wireframes/d4-wireframes.svg
"""
import sys
from xml.sax.saxutils import escape

out = sys.argv[1]
W, H = 400, 600
COLS = [80, 650, 1220, 1790, 2360]
R1, R2 = 230, 980
INK, MID, LIGHT, FILL = "#222222", "#666666", "#999999", "#EEEEEE"
FONT = "Inter, Arial, sans-serif"
parts = []


def t(x, y, s, size=15, weight=400, fill=INK, anchor="start"):
    return (f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" font-weight="{weight}" '
            f'fill="{fill}" text-anchor="{anchor}">{escape(s)}</text>')


def rect(x, y, w, h, stroke=MID, sw=1.5, dash=None, fill="none"):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>'


def box(x, y, w, h, lines, kind="solid", size=14):
    if kind == "dashed":
        s = rect(x, y, w, h, MID, 1.5, "6 4")
    elif kind == "thick":
        s = rect(x, y, w, h, INK, 3)
    else:
        s = rect(x, y, w, h, MID, 1.5)
    for i, ln in enumerate(lines):
        txt, wt, col = ln if isinstance(ln, tuple) else (ln, 400, INK)
        s += t(x + 12, y + 24 + i * 21, txt, size, wt, col)
    return s


def fact(x, y, *label, confirmed=True):
    """A fact: labeled sample text in a solid box, or Not confirmed in a dashed box."""
    answer = "[Sample text]" if confirmed else "Not confirmed"
    lines = [(ln, 600, INK) for ln in label] + [(answer, 400, MID)]
    return box(x, y, 360, 20 + 21 * len(lines), lines, "solid" if confirmed else "dashed")


def btn(x, y, w, label, primary=False):
    fill = "#CCCCCC" if primary else FILL
    return rect(x, y, w, 36, INK, 1.5, fill=fill) + t(x + w / 2, y + 23, label, 13, 600, INK, "middle")


def head(x, y, s):
    return t(x, y, s, 19, 700)


def tiny_arrow(x, y):
    return (f'<line x1="{x}" y1="{y}" x2="{x+8}" y2="{y}" stroke="{MID}" stroke-width="1.5"/>'
            f'<polygon points="{x+8},{y-4} {x+14},{y} {x+8},{y+4}" fill="{MID}"/>')


def timeline(x, y, active=None):
    names = ["Reply", "First appointment", "Cost", "Decide"]
    w = [56, 128, 50, 62]
    s, cx = "", x
    for i, n in enumerate(names):
        s += rect(cx, y, w[i], 38, INK if n == active else MID, 3 if n == active else 1.5)
        s += t(cx + w[i] / 2, y + 24, n, 12, 700 if n == active else 400, INK, "middle")
        cx += w[i]
        if i < 3:
            s += tiny_arrow(cx + 2, y + 19)
            cx += 18
    return s


def question_group(x, y, legend, questions, strong=False):
    s = rect(x, y, 360, 92, INK if strong else MID, 3 if strong else 1.5)
    s += t(x + 12, y + 22, legend, 13, 700)
    for i, q in enumerate(questions):
        yy = y + 34 + i * 26
        s += rect(x + 12, yy, 16, 16, INK, 1.5) + t(x + 38, yy + 13, q, 13)
    return s


def question_groups(x, y, strong=False):
    return (question_group(x, y, "Questions to ask before contacting the service",
                           ["What happens after I get in touch?", "How long does a reply usually take?"], strong)
            + question_group(x, y + 100, "Questions to ask about costs",
                             ["What does the first appointment cost?", "Does one appointment commit me to more?"], strong)
            + question_group(x, y + 200, "Questions to ask about privacy",
                             ["Who can see my details?", "Are parents ever told?"], strong))


def frame(num, name, col, row, inner):
    x, y = COLS[col], row
    return (f'<g id="Screen-{num}-{name.replace(" ", "-").replace("(", "").replace(")", "")}">'
            + t(x, y - 12, f"Screen {num}: {name}", 18, 700)
            + rect(x, y, W, H, INK, 2, fill="#FFFFFF")
            + inner(x + 20, y + 20) + "</g>")


def s1(x, y):
    topics = ""
    for i, (name, summary) in enumerate([
        ("Getting started", "Understanding the service"),
        ("Costs and commitment", "Financial and ongoing commitments"),
        ("Privacy and confidentiality", "How personal information is handled"),
        ("Making my decision", "Deciding what to do next"),
    ]):
        topics += box(x, y + 178 + i * 72, 360, 64, [(name, 600, INK), (summary, 400, MID)])
    return (head(x, y + 22, "What happens")
            + t(x, y + 46, "after you get in touch?", 19, 700)
            + t(x, y + 70, "Private page. No account needed.", 13, 400, MID)
            + timeline(x, y + 84)
            + t(x, y + 146, "Select any stage to see details.", 13, 400, MID)
            + t(x, y + 170, "Explore by topic", 14, 700)
            + topics
            + t(x, y + 486, "Need help right now? Urgent contact:", 13, 400, MID)
            + t(x, y + 505, "Not confirmed", 13, 400, MID))


def s2(x, y):
    return (timeline(x, y, "First appointment")
            + head(x, y + 66, "First appointment")
            + fact(x, y + 82, "What happens during the first appointment?")
            + fact(x, y + 152, "What questions might the counsellor ask?")
            + fact(x, y + 222, "What should I prepare before the appointment?")
            + fact(x, y + 292, "How long does the first appointment take?")
            + box(x, y + 362, 360, 62, [("Decision point: can you stop here?", 600, INK), ("[Sample text]", 400, MID)], "thick")
            + btn(x, y + 436, 140, "Previous stage")
            + btn(x + 155, y + 436, 170, "Back to timeline")
            + t(x, y + 496, "Reply shows cards 5 and 6, with a Next stage button.", 12, 400, MID)
            + t(x, y + 514, "Its reply time stays Not confirmed.", 12, 400, MID))


def s3(x, y):
    return (head(x, y + 22, "Getting started")
            + t(x, y + 46, "Understanding the service and beginning the process.", 13, 400, MID)
            + fact(x, y + 62, "Understanding counselling")
            + fact(x, y + 132, "Who can use counselling services?")
            + fact(x, y + 202, "How to contact the counselling service")
            + fact(x, y + 272, "What information is needed when", "contacting the service?")
            + btn(x, y + 368, 170, "Back to timeline"))


def s4(x, y):
    return (head(x, y + 22, "Costs and commitment")
            + t(x, y + 46, "University counselling. Last checked: [date].", 13, 400, MID)
            + fact(x, y + 62, "Cost of the first appointment")
            + fact(x, y + 132, "Cost of additional appointments")
            + fact(x, y + 202, "Are free support options available?", confirmed=False)
            + fact(x, y + 272, "Is attending more than one appointment", "compulsory?")
            + fact(x, y + 362, "Can I pause or stop counselling?")
            + btn(x, y + 438, 170, "Back to timeline"))


def s5(x, y):
    return (head(x, y + 22, "Privacy and confidentiality")
            + t(x, y + 46, "University counselling. Last checked: [date].", 13, 400, MID)
            + fact(x, y + 62, "Who can access my counselling information?")
            + fact(x, y + 132, "How is my information kept confidential?")
            + fact(x, y + 202, "When might confidentiality have limits?")
            + btn(x, y + 278, 170, "Back to timeline"))


def s6(x, y):
    return (head(x, y + 22, "Making my decision")
            + t(x, y + 46, "Either choice is fine. You can change your mind.", 13, 400, MID)
            + t(x, y + 76, "What are my possible next steps?", 14, 700)
            + box(x, y + 86, 360, 62, [("Ask the service a few questions", 600, INK), ("Not a booking", 400, MID)], "thick")
            + box(x, y + 158, 360, 44, [("Not yet, come back later", 600, INK)])
            + box(x, y + 214, 360, 84, [("Can I decide not to continue?", 600, INK), ("[Sample text]", 400, MID),
                                        ("Read more in costs and commitment (link)", 400, INK)])
            + fact(x, y + 310, "Where can I find further support?")
            + btn(x, y + 386, 170, "Back to timeline"))


def s7(x, y):
    return (head(x, y + 22, "What do you want to ask?")
            + question_groups(x, y + 42)
            + box(x, y + 352, 360, 44, ["Write your own question (optional)"], "dashed")
            + btn(x, y + 412, 170, "Build my message", True)
            + btn(x + 190, y + 412, 90, "Back"))


def s8(x, y):
    return (head(x, y + 22, "What do you want to ask?")
            + rect(x, y + 36, 360, 82, INK, 3)
            + t(x + 12, y + 60, "Choose at least one question, or write", 13, 600)
            + t(x + 12, y + 81, "your own, so your message has", 13, 600)
            + t(x + 12, y + 102, "something to ask.", 13, 600)
            + question_groups(x, y + 128, True)
            + box(x, y + 430, 360, 44, ["Write your own question (optional)"], "dashed")
            + btn(x, y + 486, 170, "Build my message", True)
            + btn(x + 190, y + 486, 90, "Back"))


def s9(x, y):
    return (head(x, y + 22, "Your message")
            + box(x, y + 40, 360, 84, ["Hello, I'm not booking yet. I just have", "a few questions:", ("- [selected questions]", 400, MID)])
            + btn(x, y + 138, 150, "Copy message", True)
            + btn(x + 165, y + 138, 130, "Edit questions")
            + box(x, y + 188, 360, 44, [("Copied. Nothing has been sent.", 600, INK)], "thick")
            + t(x, y + 256, "Paste it into your own email when you're ready,", 13, 400, MID)
            + t(x, y + 275, "or don't. This page never sends anything.", 13, 400, MID)
            + btn(x, y + 298, 170, "Back to timeline"))


def s10(x, y):
    return (head(x, y + 22, "That's fine. This page")
            + t(x, y + 46, "will still be here.", 19, 700)
            + box(x, y + 66, 360, 44, ["Bookmark this page to come back later."])
            + box(x, y + 122, 360, 44, ["Nothing you did here was saved."])
            + btn(x, y + 186, 170, "Back to timeline"))


def path(pts, style="forward", head_end=True):
    st = {"forward": (INK, 2, None), "error": (INK, 3, "10 6"), "back": (LIGHT, 2, "3 5")}[style]
    d = f' stroke-dasharray="{st[2]}"' if st[2] else ""
    p = " ".join(f"{a},{b}" for a, b in pts)
    s = f'<polyline points="{p}" fill="none" stroke="{st[0]}" stroke-width="{st[1]}"{d}/>'
    if head_end:
        (x0, y0), (x1, y1) = pts[-2], pts[-1]
        size = 10
        if x1 > x0:
            tri = f"{x1-size},{y1-6} {x1},{y1} {x1-size},{y1+6}"
        elif x1 < x0:
            tri = f"{x1+size},{y1-6} {x1},{y1} {x1+size},{y1+6}"
        elif y1 > y0:
            tri = f"{x1-6},{y1-size} {x1},{y1} {x1+6},{y1-size}"
        else:
            tri = f"{x1-6},{y1+size} {x1},{y1} {x1+6},{y1+size}"
        s += f'<polygon points="{tri}" fill="{st[0]}"/>'
    return s


def label(x, y, s, anchor="start", fill=INK):
    return t(x, y, s, 14, 600, fill, anchor)


T1, B1 = R1, R1 + H
T2, B2 = R2, R2 + H
MID1, MID2 = R1 + H / 2, R2 + H / 2
RAIL = 905
TOTAL_W, TOTAL_H = 2920, 2020

parts.append(t(80, 50, "What Happens Next: wireframe flow (hub-and-spoke, grayscale, low fidelity)", 26, 700))
parts.append(path([(80, 88), (140, 88)]) + t(150, 93, "Forward navigation", 14))
parts.append(path([(330, 88), (390, 88)], "error") + t(400, 93, "Error path", 14))
parts.append(path([(520, 88), (580, 88)], "back") + t(590, 93, "Back to timeline (hub)", 14))
parts.append(t(820, 93, "Every screen shows a notice that sample text isn't real service information. Dashed box: Not confirmed.", 14))

for f in [(1, "Timeline overview (hub)", 0, R1, s1), (2, "Stage details", 1, R1, s2),
          (3, "Getting started", 2, R1, s3), (4, "Costs and commitment", 3, R1, s4),
          (5, "Privacy and confidentiality", 4, R1, s5), (6, "Making my decision", 4, R2, s6),
          (7, "Question prompts", 3, R2, s7), (8, "Error state", 2, R2, s8),
          (9, "Your message", 1, R2, s9), (10, "Not yet", 0, R2, s10)]:
    parts.append(frame(*f))

a = '<g id="Navigation-arrows">'
# Hub to stage details
a += path([(480, MID1), (650, MID1)]) + label(565, MID1 - 28, "Reply or", "middle") + label(565, MID1 - 10, "First appointment", "middle")
# Hub to the three information sections
a += path([(440, T1), (440, 170), (2730, 170), (2730, T1)])
a += path([(1590, 170), (1590, T1)]) + path([(2160, 170), (2160, T1)])
a += label(1580, 162, "Getting started", "end")
a += label(2150, 162, "Costs and commitment, or Cost stage", "end")
a += label(2720, 162, "Privacy and confidentiality", "end")
# Hub to Making my decision
a += path([(400, T1), (400, 130), (2860, 130), (2860, MID2), (2760, MID2)])
a += label(1500, 122, "Making my decision, or Decide stage", "middle")
# Back to the hub
a += path([(2700, T2), (2700, RAIL), (280, RAIL), (280, B1)], "back")
for x in (850, 1420, 1990, 2430):
    a += path([(x, B1), (x, RAIL)], "back", False)
a += path([(900, T2), (900, RAIL)], "back", False)
a += path([(280, T2), (280, RAIL)], "back", False)
a += label(1135, RAIL - 10, "Back to timeline (from Screens 2, 3, 4, 5, 6, 9 and 10)", "middle", MID)
a += label(870, B1 + 28, "Previous and Next stage stay on Screen 2", "start", MID)
a += label(2440, B1 + 28, "Screen 6 also links to Screen 4", "start", MID)
# The message builder inside Making my decision
a += path([(2360, MID2 - 50), (2190, MID2 - 50)]) + label(2275, MID2 - 78, "Ask the service", "middle") + label(2275, MID2 - 60, "a few questions", "middle")
a += path([(2190, MID2 + 50), (2360, MID2 + 50)]) + label(2275, MID2 + 40, "Back", "middle")
a += path([(1790, MID2), (1620, MID2)], "error") + label(1705, MID2 - 28, "Nothing selected", "middle") + label(1705, MID2 - 10, "(error path)", "middle")
a += path([(1220, MID2), (1050, MID2)]) + label(1135, MID2 - 28, "Select a question,", "middle") + label(1135, MID2 - 10, "then Build my message", "middle")
a += path([(1900, B2), (1900, 1630), (1000, 1630), (1000, B2)]) + label(1450, 1622, "Build my message (at least one question selected)", "middle")
a += path([(900, B2), (900, 1680), (2000, 1680), (2000, B2)]) + label(1450, 1672, "Edit questions", "middle")
a += path([(2560, B2), (2560, 1730), (280, 1730), (280, B2)]) + label(1450, 1722, "Not yet, come back later", "middle")
a += "</g>"
parts.append(a)

NOTES_Y = 1800
n = '<g id="Design-notes">'
n += rect(80, NOTES_Y, 2680, 186, MID, 1.5)
n += t(104, NOTES_Y + 36, "Design notes", 20, 700)
n += t(104, NOTES_Y + 72, "Gestalt: connectedness", 16, 700)
n += t(320, NOTES_Y + 72, "Arrows join the timeline's four stages (Screens 1 and 2), so students read them as one process rather than separate options.", 16)
n += t(104, NOTES_Y + 106, "Gestalt: common region", 16, 700)
n += t(320, NOTES_Y + 106, "Each question and its answer share a box (Screens 2 to 6), and related prompts share a group (Screens 7 and 8), so it's clear what belongs together.", 16)
n += t(104, NOTES_Y + 140, "Visual hierarchy", 16, 700)
n += t(320, NOTES_Y + 140, "Screen headings are largest, thick borders mark the key item on a screen, such as a decision point, and darker filled buttons mark the main action.", 16)
n += "</g>"
parts.append(n)

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{TOTAL_W}" height="{TOTAL_H}" viewBox="0 0 {TOTAL_W} {TOTAL_H}">'
       f'<rect id="Board" width="{TOTAL_W}" height="{TOTAL_H}" fill="#FFFFFF"/>' + "".join(parts) + "</svg>")
with open(out, "w", encoding="utf-8") as f:
    f.write(svg)
print("wrote", out, len(svg))
