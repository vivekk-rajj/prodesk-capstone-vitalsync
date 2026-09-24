# Prompts.md

# VitalSync AI Architecture Queries

This file records the prompts used to validate product scope, architecture, data modeling, security assumptions, and delivery sequencing during the planning phase.

## 1. Product Scope

**Prompt:**

> Act as a senior product manager for a five-week fullstack capstone. Evaluate an EHR dashboard called VitalSync with patient, doctor, and administrator roles. Propose a commercially credible MVP that can be implemented in four build sprints. Separate P0, P1, and P2 features, identify scope creep, and explain what should be explicitly excluded.

**Decision:**

The MVP is limited to authentication, role-based dashboards, provider discovery, appointment scheduling, availability, medical-history timelines, prescriptions, and operational administration. Video consultation, insurance, AI diagnosis, and pharmacy fulfillment are excluded.

## 2. MongoDB Collection Design

**Prompt:**

> Design a MongoDB data model for a healthcare scheduling and EHR demonstration application with Users, ProviderProfiles, Appointments, MedicalRecords, and Prescriptions. Explain which relationships should use ObjectId references, which data can be embedded, what indexes are required, and how to prevent appointment conflicts. Keep the model to five primary collections.

**Decision:**

Use five bounded collections with references for users, providers, appointments, clinical records, and prescriptions. Embed small provider availability blocks initially, while keeping appointments independent for querying and conflict detection. Add compound indexes for provider/time and patient/time access patterns.

## 3. Authorization and Privacy

**Prompt:**

> Act as an application security architect. Define server-side authorization rules for a demo EHR application with patient, doctor, and administrator roles. Include ownership checks, audit events, password handling, token handling, sensitive logging restrictions, and negative test cases. Do not claim that a capstone is HIPAA compliant.

**Decision:**

Authorization is enforced in Express middleware and services. The API never trusts a role or patient ID supplied by the browser. The project will clearly state that it is demonstration software and not a certified production healthcare system.

## 4. REST API Contract

**Prompt:**

> Create a REST API blueprint for VitalSync. Group endpoints by authentication, providers, appointments, medical records, prescriptions, and administration. For each group, specify HTTP methods, access roles, validation expectations, and important state transitions. Use predictable error responses.

**Decision:**

The API is organized around resources and role-specific permissions. Appointment status transitions and prescription status changes are explicit operations rather than arbitrary document updates. Errors use a consistent `success` and `error.code` envelope.

## 5. UX and Responsive Design

**Prompt:**

> Design a responsive wireframe plan for an EHR dashboard used by patients, doctors, and administrators. Define the minimum desktop and mobile viewports, information hierarchy, navigation behavior, loading and error states, accessibility requirements, and how data tables should transform on small screens.

**Decision:**

The minimum wireframes are authentication, patient dashboard, doctor dashboard, appointment details, and patient timeline/prescriptions. Desktop side navigation becomes compact top/bottom navigation on mobile. Tables become labeled cards instead of forcing horizontal scrolling wherever possible.

## 6. Delivery Risk Review

**Prompt:**

> Review this five-sprint implementation roadmap for risks: Sprint 13 blueprint, Sprint 14 MVP, Sprint 15 CRUD completion, Sprint 16 UX and optional AI, Sprint 17 deployment. Identify dependencies, likely bottlenecks, and a practical definition of done for each phase.

**Decision:**

Authentication, authorization, data contracts, and appointment state transitions are dependencies for most later work. AI and optional payments are deferred until core reliability, testing, accessibility, and deployment are complete.

## 7. Testing Strategy

**Prompt:**

> Create a testing strategy for a React, Express, and MongoDB EHR capstone. Include unit tests, API integration tests, component tests, authorization tests, appointment conflict tests, responsive UI checks, and a pre-deployment smoke-test checklist.

**Decision:**

Testing prioritizes security boundaries and scheduling invariants before visual polish. Negative tests must prove that patients cannot access other patients’ records and that providers cannot double-book confirmed appointments.

## 8. Architecture Challenge

**Prompt:**

> Challenge the proposed VitalSync architecture. What are the three most likely technical debt sources, and what simple design decisions now will prevent them? Keep the recommendations appropriate for one fullstack developer working within four implementation sprints.

**Decision:**

The highest risks are uncontrolled scope, authorization scattered across controllers, and inconsistent server/client state. The plan addresses them with a locked MVP, centralized authorization utilities, service-layer business rules, a documented API contract, and TanStack Query cache invalidation.
