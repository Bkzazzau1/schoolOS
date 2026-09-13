# SchoolOS AI

SchoolOS AI is a modern multi-tenant SaaS platform for private schools. One web/PWA application serves many independent schools while keeping each school's data, users, permissions, AI context, files, and operations strictly isolated.

## Product direction

- Web + PWA first
- One platform for many schools
- One account system with per-school memberships
- Role-based access for proprietors, principals, teachers, accountants, parents, students, and other staff
- AI-assisted school management, teacher activity monitoring, academic intelligence, finance insights, and communication
- Pricing direction: ₦500 per active student per academic term

## Technology stack

### Web / PWA
- Next.js
- TypeScript
- React

### Backend
- Python
- Django
- Django REST Framework

### Data and jobs
- PostgreSQL
- Redis
- Celery

### AI
- Python AI orchestration and analytics services
- External model APIs and/or self-hosted models behind an internal AI router
- Tenant- and permission-aware retrieval

### Object storage
- Wasabi S3-compatible object storage

## Repository structure

```text
schoolOS/
├── web/          # Next.js web/PWA
├── backend/      # Django + DRF API
├── ai_engine/    # Python AI services
├── docs/         # Architecture and product documentation
├── infra/        # Deployment/infrastructure configuration
└── README.md
```

## Core architectural rule

Every tenant-owned business record must be scoped to a school tenant. The backend—not the frontend—enforces tenant boundaries and permissions. AI retrieval must follow the same boundaries.

## Current phase

Foundation / Web + PWA.

Native Flutter apps will come later after the web/PWA platform is stable.
