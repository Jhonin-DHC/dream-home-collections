"""List or extract files from an All-in-One WP Migration .wpress archive."""

from __future__ import annotations

import argparse
import os
import sys

# All-in-One WP Migration: 255 name + 14 size + 12 mtime + 4096 path/crc
HEADER_SIZE = 4377
NAME_LEN = 255
SIZE_LEN = 14
MTIME_LEN = 12
PREFIX_LEN = 4096


def read_cstring(raw: bytes) -> str:
    return raw.split(b"\x00", 1)[0].decode("utf-8", errors="ignore").strip()


def parse_header(header: bytes) -> tuple[str, int] | None:
    name = read_cstring(header[:NAME_LEN]).replace("\\", "/")
    size_s = read_cstring(header[NAME_LEN : NAME_LEN + SIZE_LEN])
    if not name or not size_s:
        return None
    directory = read_cstring(header[NAME_LEN + SIZE_LEN + MTIME_LEN : HEADER_SIZE]).replace("\\", "/")
    if directory in ("", "."):
        relpath = name
    else:
        relpath = f"{directory.rstrip('/')}/{name}"
    return relpath, int(size_s)


def iter_wpress(path: str):
    with open(path, "rb") as handle:
        while True:
            header = handle.read(HEADER_SIZE)
            if len(header) < HEADER_SIZE:
                break
            parsed = parse_header(header)
            if not parsed:
                break
            relpath, size = parsed
            yield relpath, size
            handle.seek(size, os.SEEK_CUR)


def list_files(path: str) -> None:
    total = 0
    uploads = 0
    upload_bytes = 0
    names: list[tuple[str, int]] = []
    for relpath, size in iter_wpress(path):
        names.append((relpath, size))
        total += 1
        if "uploads" in relpath.lower():
            uploads += 1
            upload_bytes += size
    print(f"file_count={total}")
    print(f"uploads_count={uploads}")
    print(f"uploads_mb={round(upload_bytes / 1024 / 1024, 1)}")
    print("--- files ---")
    for relpath, size in names:
        print(f"{size:12}  {relpath}")


def should_extract(relpath: str, prefix: str | None) -> bool:
    if not prefix:
        return True
    needles = [part.strip() for part in prefix.split(",") if part.strip()]
    return any(relpath == needle or relpath.startswith(needle.rstrip("/") + "/") for needle in needles)


def extract(path: str, dest: str, prefix: str | None) -> None:
    os.makedirs(dest, exist_ok=True)
    copied = 0
    skipped = 0
    with open(path, "rb") as handle:
        while True:
            header = handle.read(HEADER_SIZE)
            if len(header) < HEADER_SIZE:
                break
            parsed = parse_header(header)
            if not parsed:
                break
            relpath, size = parsed
            if not should_extract(relpath, prefix):
                handle.seek(size, os.SEEK_CUR)
                skipped += 1
                continue
            out_path = os.path.join(dest, *relpath.split("/"))
            parent = os.path.dirname(out_path)
            if parent:
                os.makedirs(parent, exist_ok=True)
            remaining = size
            with open(out_path, "wb") as out:
                while remaining > 0:
                    chunk = handle.read(min(remaining, 1024 * 1024))
                    if not chunk:
                        break
                    out.write(chunk)
                    remaining -= len(chunk)
            copied += 1
            if copied % 200 == 0:
                print(f"extracted {copied} files...", flush=True)
    print(f"extracted={copied} skipped={skipped} dest={dest}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("wpress")
    parser.add_argument("--list", action="store_true")
    parser.add_argument("--dest")
    parser.add_argument("--prefix")
    args = parser.parse_args()
    if args.list:
        list_files(args.wpress)
        return 0
    if not args.dest:
        print("--dest is required unless --list", file=sys.stderr)
        return 1
    extract(args.wpress, args.dest, args.prefix)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
