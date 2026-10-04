# Avenra

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Payment operations teams and developers connecting merchants to payment processors. This audience is inferred from the existing backend, API documentation, and the user's request to turn the fork into a fintech company.

## Product Purpose

Avenra is the working identity for this independently branded fork of Hyperswitch. It gives teams a common payments infrastructure for processor integrations, routing, payments, refunds, and payment links.

## Capabilities and Constraints

The Rust backend is the existing source of payment capabilities. Its API contracts, crate names, database names, provider integrations, and deployment image identifiers remain compatible. The upstream merchant Control Center and checkout SDK are separate projects. The new web experience in this repository provides a company homepage and an explicitly labelled, interactive demonstration workspace; it does not process payments or represent a production merchant account.

## Brand Commitments

The user requested a new name, branding, and UX/UI. Avenra is a working name chosen for this implementation after an optional naming question went unanswered; it can be changed centrally before launch. The user did not supply a legal entity, owned domain, customer evidence, pricing, or regulatory claims. None are invented.

## Evidence on Hand

Existing Rust payment/router code, API specs, deployment configuration, hosted payment link templates, and email templates. LICENSE and NOTICE record upstream authorship and remain authoritative. Demonstration data is synthetic and must be visibly identified.

## Product Principles

- Preserve the working payment engine and public integration contracts.
- Make operations legible through clear statuses, amounts, processors, and next actions.
- Distinguish demonstration actions from real payment operations.
- Keep the brand consistent across the company site, workspace, deployed dashboard theme, emails, and hosted links.
