# Security Policy

Toolglass is designed to run **100% client-side** in your browser. No user inputs, credentials, tokens, or generated data ever leave your machine. Because developers use Toolglass to inspect JWTs, hash sensitive strings, and generate cryptographic secrets, we treat security and zero-telemetry guarantees with utmost priority.

## Supported Versions

We actively maintain and provide security patches for the latest version of Toolglass on the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x (main) | :white_check_mark: |
| < 1.0.0 | :x:                |

## Security Principles in Toolglass

- **CSPRNG Only:** Cryptographic operations strictly use `window.crypto.getRandomValues()` and `crypto.subtle`. We never use `Math.random()` for security-sensitive tools.
- **Zero Remote Storage / Analytics:** User inputs, decoded tokens, cURL auth headers, and secrets are never transmitted to any third party or remote server.
- **Client-Side Sanitization:** Rendered outputs (e.g. Markdown preview, cURL commands) use strict sanitization (`DOMPurify`, POSIX shell escaping) to prevent XSS and shell injection vulnerabilities.

## Reporting a Vulnerability

If you discover a potential security vulnerability or privacy leak within Toolglass, **please do not open a public GitHub issue.**

Instead, please report it responsibly through one of the following channels:

1. **GitHub Private Vulnerability Reporting:** Use the [Security Advisory Reporting](https://github.com/ajithakdev/toolglass/security/advisories/new) tab on this repository.
2. **Direct Email:** Contact the repository maintainer directly at **ajithakdev@gmail.com**.

### What to Include

To help us triage and resolve the issue quickly, please provide:
- A description of the vulnerability and its potential impact.
- Steps to reproduce the issue, including sample input or proof-of-concept code.
- Details regarding your environment (browser version, OS).

### Our Commitment

- **Acknowledgment:** We will acknowledge receipt of your vulnerability report within 48 hours.
- **Fix & Disclosure:** We will work promptly on a patch and coordinate a coordinated public disclosure with proper credit once the fix is deployed.
