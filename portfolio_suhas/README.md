# Suhas G — Portfolio Website

## File Structure

```
portfolio/
├── index.html          ← Main HTML file
├── style.css           ← All styles
├── script.js           ← All interactions
├── assets/
│   ├── Suhas_G_Resume.pdf     ← Place your resume PDF here
│   └── certs/
│       ├── ceh.jpg            ← CEH certificate image
│       ├── ehe.jpg            ← EHE certificate image
│       ├── google_cs.jpg      ← Google Cybersecurity cert
│       ├── sqli.jpg           ← SQL Injection cert
│       ├── thm_web.jpg        ← TryHackMe Web Fundamentals
│       ├── thm_pt.jpg         ← TryHackMe Penetration Tester
│       └── tcs.jpg            ← TCS ION Young Professional
```

## Setup

1. **Resume** — Place your resume PDF at `assets/Suhas_G_Resume.pdf`
2. **Certificates** — Place certificate images (JPG or PNG) in `assets/certs/` with the exact filenames shown above
   - If an image is missing, the modal shows a placeholder
3. **Email** — Update `suhasg.work@gmail.com` in `index.html` if needed
4. **Run** — Open `index.html` directly in a browser (no build step needed)

## Customisation

- Colors: Edit CSS variables at the top of `style.css` (`:root { ... }`)
- Content: All text is in `index.html`
- Fonts: Orbitron (display) + Rajdhani (body) + Share Tech Mono — loaded from Google Fonts
