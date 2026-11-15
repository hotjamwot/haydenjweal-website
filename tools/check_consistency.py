#!/usr/bin/env python3
"""Consistency check for the Hayden J. Weal static site.

Verifies that shared blocks (nav links, contact section) are consistent
across all HTML pages, and that each page includes the shared assets.

Usage: python3 tools/check_consistency.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = sorted(ROOT.glob("*.html"))


def read(p):
    return p.read_text(encoding="utf-8")


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


def extract_nav(html):
    m = re.search(r"<nav>\s*<ul>(.*?)</ul>\s*</nav>", html, re.S)
    if not m:
        return None
    # strip active classes and any class attributes for comparison
    body = re.sub(r'\s*class="[^"]*"', "", m.group(1))
    # normalize link text spacing
    return norm(body)


def extract_contact(html):
    m = re.search(r'<section class="contact">(.*?)</section>', html, re.S)
    return norm(m.group(1)) if m else None


def main():
    errors = []
    navs = {}
    contacts = {}
    for p in PAGES:
        html = read(p)
        navs[p.name] = extract_nav(html)
        contacts[p.name] = extract_contact(html)
        # shared asset checks
        if p.name == "represent.html":
            if "css/represent.css" not in html:
                errors.append(f"{p.name}: missing css/represent.css")
        else:
            if "css/style.css" not in html:
                errors.append(f"{p.name}: missing css/style.css")
        if "script.js" not in html:
            errors.append(f"{p.name}: missing script.js")
        if "img/hjw-favicon.png" not in html:
            errors.append(f"{p.name}: missing favicon")

    # Compare navs (ignore None)
    nav_values = {k: v for k, v in navs.items() if v is not None}
    unique_navs = set(nav_values.values())
    if len(unique_navs) > 1:
        errors.append("Nav blocks differ across pages:")
        for name, val in nav_values.items():
            errors.append(f"  - {name}: {val[:120]}")

    # Compare contacts
    contact_values = {k: v for k, v in contacts.items() if v is not None}
    unique_contacts = set(contact_values.values())
    if len(unique_contacts) > 1:
        errors.append("Contact sections differ across pages:")
        for name, val in contact_values.items():
            errors.append(f"  - {name}: {val[:120]}")

    if errors:
        print("CONSISTENCY CHECK FAILED")
        for e in errors:
            print(" - " + e)
        raise SystemExit(1)
    else:
        print(f"OK: {len(PAGES)} pages consistent (nav + contact + shared assets).")


if __name__ == "__main__":
    main()