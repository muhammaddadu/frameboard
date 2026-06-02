# Security Policy

FrameBoard is a UI review library. It should not require secrets or privileged runtime access.

## Reporting A Vulnerability

Do not open a public issue for security-sensitive reports.

Email the maintainers or use the private vulnerability reporting channel once the GitHub repository is public. Include:

- affected package and version
- reproduction steps
- impact
- suggested mitigation if known

## Supported Versions

FrameBoard is pre-release. Security fixes will target the latest unpublished development version until a public release exists.

## Security Expectations

- Do not add secret-bearing code to browser or mobile UI packages.
- Keep host app side effects such as analytics, storage, native pickers, and network calls outside fixture-rendered screen Views.
- Keep screenshot export browser-local unless a host app explicitly adds upload or persistence.
