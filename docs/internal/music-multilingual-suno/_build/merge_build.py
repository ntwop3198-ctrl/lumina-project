import re, sys, os, importlib.util
from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)


def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + ".py"))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m.SONGS


SONGS = []
for p in ["part1", "part2", "part3", "part4"]:
    SONGS += load(p)
for s in SONGS:
    s["origin"] = "ko"
SONGS.sort(key=lambda s: s["id"])
for s in load("batch2"):
    s["id"] = f"{17 + int(s['id']):02d}"
    s["origin"] = "zh"
    s["ko"] = s["zh"]
    SONGS.append(s)


def load_mod(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + ".py"))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


KO = load_mod("ko").KO
ZH = load_mod("zh").ZH
SIG_ADDED = set()

LANGNAME = dict(ko=("한국어 (KO)", "Korean"), zh=("중국어 (ZH)", "Mandarin Chinese"), en=("영어 (EN)", "English"),
                ja=("일본어 (JA)", "Japanese"), vi=("베트남어 (VI)", "Vietnamese"))
TARGETS = dict(ko=["ko", "zh", "en", "ja", "vi"], zh=["zh", "ko", "en", "ja", "vi"])
SIG = dict(
    ko="구소구고구기, 밖에서 찾지 않고",
    zh="求小求苦求己, 不向外求",
    ja="小を求め 苦を求め 己を求め, 外に求めず",
    en="Seek the simple, face the hard, seek within",
    vi="Cầu điều giản dị, đương đầu gian khó, tìm trong chính mình",
)
IDOL = dict(ko="K-pop idol", zh="C-pop idol, K-pop", ja="J-pop idol, K-pop", en="pop idol, K-pop", vi="V-pop dance, K-pop")
TAGLANG = dict(ko="#韩语歌", zh="#中文歌", en="#英文歌", ja="#日语歌", vi="#越南语歌")
FORBID = set("()（）\"'’‘“”「」『』!?！？")
BANNED = dict(
    ko=r"칼|핏|^피 |\s피 |목숨|^독 |\s독 |구걸|주둥|죽[겠었어음을다]|로다$|어라$|[^고] 나니$|[^고 ]나니$|구나$|거늘|이여$|리라$|아니하고|부처|진공묘유|온 우주|세상 끝까지|기필코",
    zh=r"刀|血|毒|死|杀|乞讨|命|真空妙有",
    ja=r"刀|血|毒|死|殺|命|乞|ナイフ|真空妙有",
    en=r"\b(knife|blade|sword|blood|poison|kill\w*|death|die|dies|died|dead|beg|begs|begg\w*)\b",
    vi=r"\b(máu|độc|chết|giết|mạng)\b",
)


def add_sig(song, key, lyr):
    head, sep, rest = re.split(r"(\[Bridge[^\]]*\]\n)", lyr, maxsplit=1) if "[Bridge" in lyr else (lyr, "", "")
    if not sep:
        return lyr
    block, _, tail = rest.partition("\n\n")
    lines = block.split("\n")
    if SIG[key] in [l.strip() for l in lines]:
        return lyr
    lines.insert(4, SIG[key])
    SIG_ADDED.add(song["id"])
    return head + sep + "\n".join(lines) + ("\n\n" + tail if tail else "")


for s in SONGS:
    if s["origin"] == "ko":
        s["lyrics"]["ko"] = KO[s["id"]]["lyrics"]
        s["titles"]["ko"] = KO[s["id"]]["title"]
        s["orig_fixes"] = KO[s["id"]]["fixes"]
    else:
        s["lyrics"]["zh"] = ZH[s["id"]]["lyrics"]
        s["orig_fixes"] = ZH[s["id"]]["fixes"]
    for k in list(s["lyrics"]):
        if k != s["origin"]:
            s["lyrics"][k] = add_sig(s, k, s["lyrics"][k])
    s["notes"] = [n for n in s.get("notes", []) if not n.startswith("원본 브릿지에 시그니처가 없습니다")]


def shade(par, color="F2F2F2"):
    pPr = par._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), color)
    pPr.append(shd)


def mono(par, text, size=10):
    r = par.add_run(text)
    r.font.name = "Consolas"
    r._element.rPr.rFonts.set(qn("w:eastAsia"), "Malgun Gothic")
    r.font.size = Pt(size)


def label(doc, text):
    p = doc.add_paragraph()
    r = p.add_run(text); r.bold = True; r.font.size = Pt(11); r.font.color.rgb = RGBColor(0x1F, 0x3A, 0x5F)
    p.paragraph_format.space_before = Pt(8); p.paragraph_format.space_after = Pt(2)


def box(doc, text, size=10):
    for line in text.split("\n"):
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(0); p.paragraph_format.space_before = Pt(0)
        shade(p); mono(p, line if line else " ", size)


def plain(doc, text, size=10.5):
    p = doc.add_paragraph(); r = p.add_run(text); r.font.size = Pt(size); p.paragraph_format.space_after = Pt(2)


def base_doc():
    d = Document()
    st = d.styles["Normal"]; st.font.name = "Malgun Gothic"
    st.element.rPr.rFonts.set(qn("w:eastAsia"), "Malgun Gothic"); st.font.size = Pt(10.5)
    for s in d.sections:
        s.left_margin = s.right_margin = Cm(2.2); s.top_margin = s.bottom_margin = Cm(2)
    return d


def style_for(song, key):
    if key == song["origin"]:
        s = song["style"].replace(", Korean lyrics", "").replace("Korean lyrics, ", "")
        return f"{s}, {LANGNAME[key][1]} only"
    s = song["style"]
    for a, b in song.get("style_repl", []):
        s = s.replace(a, b)
    s = s.replace(", Korean lyrics", "").replace("Korean lyrics, ", "")
    if song["origin"] == "ko":
        s = s.replace("Korean ", "")
    return f"{s}, {LANGNAME[key][1]} only"


def exclude_for(song, key):
    e = song["exclude"]
    if key == song["origin"]:
        return e
    if song["origin"] == "ko":
        return e.replace("K-pop idol", IDOL[key])
    if "exclude_repl" in song:
        return e.replace("Cantonese pop", song["exclude_repl"][key])
    return e


problems = []


def check(song, key, lyr):
    for n, line in enumerate(lyr.split("\n"), 1):
        for ch in line:
            if ch in FORBID:
                problems.append(f"{song['id']} {key} L{n}: {ch!r}")
        body = re.sub(r"^\[[^\]]*\]\s*", "", line)
        if body and re.search(BANNED[key], body, re.I):
            problems.append(f"{song['id']} {key} L{n} banned: {line}")
        if key == "ko" and re.search(r"[\u4e00-\u9fff]", line):
            problems.append(f"{song['id']} ko L{n} hanja: {line}")
    if "[Bridge" in lyr:
        blk = re.split(r"\[Bridge[^\]]*\]\n", lyr)[1].split("\n\n")[0].split("\n")
        has = [i for i, b in enumerate(blk) if b.strip() == SIG[key]]
        if has != [4]:
            problems.append(f"{song['id']} {key}: signature position {has}")
    else:
        problems.append(f"{song['id']} {key}: no bridge")


def render(d, song, level_offset=0, page_break_first=False):
    origin = song["origin"]
    d.add_heading(f"{song['id']}  {song['ko']}", level=1 + level_offset)
    olab = "한국어" if origin == "ko" else "중국어"
    plain(d, f"원곡 언어: {olab} · 수록: {origin.upper()} 원곡 보정본 + 번역 {' / '.join(k.upper() for k in TARGETS[origin][1:])}", 10)
    label(d, "이 곡의 처리 메모")
    if song["id"] in SIG_ADDED:
        plain(d, "· 시그니처: 원본 브릿지에 없어서 다섯째 줄에 새로 넣었습니다(5개 언어 모두). 브릿지의 다른 줄은 바꾸지 않았습니다.", 10)
    for n in song.get("orig_fixes", []):
        plain(d, f"· {olab} 원곡 보정: " + n, 10)
    if not song.get("orig_fixes"):
        plain(d, f"· {olab} 원곡 보정: 규칙에 걸리는 곳이 없어 원문 그대로 두었습니다.", 10)
    for n in song.get("notes", []):
        plain(d, "· " + n, 10)
    plain(d, "· 원본 괄호 안 내용은 번역하지 않았습니다. 영어 연주 지시는 글자 그대로 두고 대괄호 태그로 옮겼습니다(가사 칸 괄호 금지)." if origin == "ko"
          else "· 제목은 규칙 7에 따라 중국어 원문을 그대로 제목으로 두고, 번역 제목은 참고용으로 따로 적었습니다.", 10)
    for key in TARGETS[origin]:
        lyr = song["lyrics"][key]
        check(song, key, lyr)
        d.add_page_break()
        lname = LANGNAME[key][0]
        kind = " · 원곡 보정본" if key == origin else ""
        d.add_heading(f"{song['id']}  {lname}{kind} — {song['zh'] if origin == 'zh' else song['titles'][key]}", level=2 + level_offset)
        if origin == "zh" and key == "zh":
            label(d, "① 제목 (중국어 원문)")
            box(d, song["zh"], 11)
        elif origin == "zh":
            label(d, "① 제목 (중국어 원문 그대로)")
            box(d, song["zh"], 11)
            plain(d, f"참고 번역 제목: {song['ref'][key]}", 10)
        else:
            label(d, "① 제목")
            box(d, song["titles"][key], 11)
        label(d, "② 스타일 입력란")
        box(d, style_for(song, key))
        if song.get("style_alt"):
            label(d, "②-b 대체 스타일 (발라드 버전)")
            s = song["style_alt"] if key == origin else song["style_alt"].replace("Korean ", "")
            box(d, f"{s}, {LANGNAME[key][1]} only")
        label(d, "③ 제외 스타일 (Exclude Styles)")
        box(d, exclude_for(song, key))
        label(d, "④ 가사 입력란")
        box(d, lyr)
        label(d, "⑤ 보컬 성별")
        plain(d, song["vocal"])
        if song.get("settings"):
            label(d, "⑥ 고급 설정")
            plain(d, song["settings"])
        label(d, "⑦ 꼬리표")
        tags = song["tags"].replace("#{TAGLANG}", TAGLANG[key]).replace("{TAGLANG}", TAGLANG[key])
        plain(d, tags + (f" / 다국어 {key.upper()}판" if "#" not in tags else ""))


COMMON = [
    "구성: 곡마다 원곡 언어 보정본을 맨 앞에 두고(한국어 원곡은 KO, 중국어 원곡은 ZH) 그 뒤에 나머지 네 언어를 붙였습니다. 20곡 모두 KO / ZH / EN / JA / VI 5개 언어입니다.",
    "시그니처: 20곡 모두 브릿지 다섯째 줄에 언어별 지정문을 넣었습니다. 원본에 없던 12곡(01·02·03·04·05·08·09·10·11·13·15·18)은 다섯째 줄에 새로 넣고 브릿지의 다른 줄은 그대로 두었습니다. 주고받기 브릿지(사계절 4곡)는 원래 다섯째 줄인 [Duet] 줄이 여섯째로 내려갑니다.",
    "괄호·따옴표·문장부호: 가사 칸에 괄호, 따옴표, 느낌표, 물음표를 쓰지 않았습니다. 영어 가사는 줄임말을 쓰지 않아 작은따옴표가 없습니다. 원본 괄호 안 내용은 번역하지 않고, 영어 연주 지시는 대괄호 태그로 옮겼습니다.",
    "후렴의 괄호 응답(놀자! (놀자!) 형태)은 [Crowd] 태그 줄로 옮기고 응답어는 그 언어로 맞췄습니다.",
    "금지어: 칼·피·독·목숨·죽음 계열은 쓰지 않았습니다. 한국어판에는 ~로다, ~어라, ~나니, ~구나, ~거늘, ~이여, ~리라, ~아니하고도 쓰지 않았습니다. 진공묘유와 부처를 찾지 않고는 불교 곡이 아니라서 쓰지 않았습니다.",
    "스타일 입력란: 번역판은 Korean·Chinese·Mandarin 표기를 빼고 끝에 언어 지정(Korean only 등)을 붙였습니다. 원곡판은 원본 스타일 끝에 언어 지정만 붙였습니다. 번역판 제외 스타일의 K-pop idol / Cantonese pop은 언어별 현지 아이돌 팝 표기로 바꿨습니다.",
    "제목: 한국어 원곡은 제목도 번역했고, 중국어 원곡(18~20)은 규칙 7에 따라 모든 언어판에서 중국어 원문을 제목으로 두고 번역 제목은 참고로 병기했습니다.",
]

# per-song files
for song in SONGS:
    d = base_doc()
    plain(d, "[LUMINA - Knowledge Engine]  다국어 수노 업로드본", 10)
    render(d, song)
    name = song.get("fname", song["ko"]).replace(" ", "_")
    d.save(os.path.join(OUT, f"{song['id']}_{name}.docx"))

# master
d = base_doc()
d.add_heading("루미나 뮤직 다국어 수노 업로드 통합본", level=0)
plain(d, "[LUMINA - Knowledge Engine]  20곡 × 5개 언어 · 한국어 원곡 17곡(KO 보정 + ZH/EN/JA/VI) + 중국어 원곡 3곡(ZH 원문 + KO/EN/JA/VI)")
label(d, "공통 처리 원칙")
for t in COMMON:
    plain(d, "· " + t, 10)
label(d, "곡 목록")
for s in SONGS:
    if s["origin"] == "ko":
        t = s["titles"]
        plain(d, f"{s['id']}  KO {t['ko']}  |  ZH {t['zh']}  |  EN {t['en']}  |  JA {t['ja']}  |  VI {t['vi']}", 10)
    else:
        r = s["ref"]
        plain(d, f"{s['id']}  {s['zh']} (중국어 원곡)  |  KO {r['ko']}  |  EN {r['en']}  |  JA {r['ja']}  |  VI {r['vi']}", 10)
for s in SONGS:
    d.add_page_break()
    render(d, s)
d.save(os.path.join(OUT, "00_통합본_전곡_20곡.docx"))

print(len(SONGS), "songs", "sig added:", sorted(SIG_ADDED))
print("\n".join(problems) if problems else "NO PROBLEMS")
