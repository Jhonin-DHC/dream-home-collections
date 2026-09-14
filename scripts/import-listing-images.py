"""Copy full-size listing/post images from a .wpress archive into public/images."""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

import importlib.util

_extract_spec = importlib.util.spec_from_file_location(
    "extract_wpress", Path(__file__).with_name("extract-wpress.py")
)
extract_wpress = importlib.util.module_from_spec(_extract_spec)
assert _extract_spec.loader
_extract_spec.loader.exec_module(extract_wpress)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "images"
THUMB = re.compile(r"-\d{2,4}x\d{2,4}\.(?:webp|jpe?g|png)$", re.I)

LISTING_MATCHERS: list[tuple[str, re.Pattern[str]]] = [
    ("4000-euclid-avenue", re.compile(r"4000[- ]euclid", re.I)),
    ("4517-n-versailles-avenue", re.compile(r"4517[- ]n[- ]versailles", re.I)),
    ("lexington-meadows-estate", re.compile(r"lexington", re.I)),
    ("seaside-lane", re.compile(r"seaside", re.I)),
    ("jernigan-drive", re.compile(r"jernigan", re.I)),
    ("briarwood-lane", re.compile(r"briarwood", re.I)),
    ("west-plano-pentridge-6808", re.compile(r"6808|0417415049fb316c9455fe6d437c6425fb50456b", re.I)),
    ("west-plano-pentridge-6809", re.compile(r"6809|pentridge-dr-1306", re.I)),
]

POST_MATCHERS: list[tuple[str, re.Pattern[str]]] = [
    ("dfw-best-places-to-invest-2026", re.compile(r"thumb-yt-dhc", re.I)),
    ("houston-10-homes-market-update-2026", re.compile(r"0417415049fb316c9455fe6d437c6425fb50456b", re.I)),
    ("strategically-value-your-dallas-home", re.compile(r"pentridge-dr-1306", re.I)),
    ("strategically-value-your-austin-home", re.compile(r"hillsofkings", re.I)),
]

NEIGHBORHOOD_MATCHERS: list[tuple[str, re.Pattern[str]]] = [
    ("highland-park-luxury-homes", re.compile(r"4000[- ]euclid[- ].*exterior(?!-\d)", re.I)),
    ("prestonwood-luxury-homes-for-sale", re.compile(r"briarwood", re.I)),
    ("celina-luxury-homes", re.compile(r"hillsofkings", re.I)),
]

ROOM_ORDER = [
    "hero",
    "exterior",
    "front",
    "kitchen",
    "dining",
    "living",
    "great",
    "bedroom",
    "primary",
    "bathroom",
    "gym",
    "pool",
    "yard",
    "garage",
]


def is_full_size(name: str) -> bool:
    return not THUMB.search(name)


def match_slug(name: str, matchers: list[tuple[str, re.Pattern[str]]]) -> str | None:
    for slug, pattern in matchers:
        if pattern.search(name):
            return slug
    return None


def sort_key(filename: str) -> tuple[int, str]:
    lower = filename.lower()
    for index, token in enumerate(ROOM_ORDER):
        if token in lower:
            return (index, lower)
    return (len(ROOM_ORDER), lower)


def copy_from_wpress(wpress: str) -> dict[str, list[str]]:
    written: dict[str, list[str]] = {"listings": [], "posts": [], "neighborhoods": []}
    HEADER_SIZE = extract_wpress.HEADER_SIZE
    parse_header = extract_wpress.parse_header
    with open(wpress, "rb") as handle:
        while True:
            header = handle.read(HEADER_SIZE)
            if len(header) < HEADER_SIZE:
                break
            parsed = parse_header(header)
            if not parsed:
                break
            relpath, size = parsed
            filename = os.path.basename(relpath)
            if not is_full_size(filename):
                handle.seek(size, os.SEEK_CUR)
                continue

            listing = match_slug(filename, LISTING_MATCHERS)
            post = match_slug(filename, POST_MATCHERS)
            neighborhood = match_slug(filename, NEIGHBORHOOD_MATCHERS)
            if not listing and not post and not neighborhood:
                handle.seek(size, os.SEEK_CUR)
                continue

            targets: list[Path] = []
            if listing:
                dest = PUBLIC / "listings" / listing / filename
                targets.append(dest)
                written["listings"].append(f"{listing}/{filename}")
            if post:
                dest = PUBLIC / "posts" / post / filename
                targets.append(dest)
                written["posts"].append(f"{post}/{filename}")
            if neighborhood:
                dest = PUBLIC / "neighborhoods" / neighborhood / filename
                targets.append(dest)
                written["neighborhoods"].append(f"{neighborhood}/{filename}")

            data = handle.read(size)
            for dest in targets:
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(data)
    return written


def main() -> int:
    wpress = sys.argv[1] if len(sys.argv) > 1 else ""
    if not wpress:
        print("usage: import-listing-images.py <file.wpress>", file=sys.stderr)
        return 1
    result = copy_from_wpress(wpress)
    for kind, files in result.items():
        print(f"{kind}={len(files)}")
        for item in sorted(files, key=str.lower):
            print(f"  {item}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
