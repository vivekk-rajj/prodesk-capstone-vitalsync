# VitalSync Architecture Notes

## Architectural Style

VitalSync uses a modular client-server architecture:

- React/Vite provides the browser application.
- Express exposes versioned REST endpoints.
- MongoDB stores identity, scheduling, clinical timeline, and prescription documents.
- Authentication and authorization are enforced at the API boundary.
- TanStack Query manages server state, caching, invalidation, and request status.

## Core Request Flow

1. User submits an authenticated request from the React client.
2. API middleware verifies the token and attaches the authenticated user.
3. Role and resource-ownership middleware checks access.
4. Controller validates the payload and calls the relevant service.
5. Service performs conflict checks and persistence through Mongoose.
6. API returns a consistent success or error envelope.
7. Client invalidates affected queries and presents the updated state.

## Consistent API Error Envelope

```json
{
  "success": false,
  "error": {
    "code": "APPOINTMENT_SLOT_UNAVAILABLE",
    "message": "The selected time is no longer available.",
    "fieldErrors": {}
  }
}
```

## Planned Indexes

- `Users.email` — unique lookup.
- `ProviderProfiles.specialty` — provider directory filtering.
- `Appointments.providerId + startAt` — schedule queries and conflict checks.
- `Appointments.patientId + startAt` — patient appointment history.
- `MedicalRecords.patientId + occurredAt` — timeline ordering.
- `Prescriptions.patientId + status` — prescription dashboard filtering.

## Important Invariants

- A patient cannot book an appointment for another patient.
- A doctor cannot read an unrelated patient’s medical timeline.
- A provider cannot have two confirmed appointments occupying the same time range.
- Cancelled appointments cannot be silently changed back to confirmed without an explicit transition policy.
- Prescription updates require the prescribing doctor or an administrator according to policy.
- Deactivated users cannot create new appointments.
