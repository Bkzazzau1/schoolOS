import uuid
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Tenant(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=180)
    slug = models.SlugField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    billing_email = models.EmailField(blank=True)
    student_price_per_term = models.PositiveIntegerField(default=500)

    def __str__(self):
        return self.name


class Campus(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="campuses")
    name = models.CharField(max_length=180)
    code = models.CharField(max_length=30)
    is_main = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["tenant", "code"], name="unique_campus_code_per_tenant"),
        ]

    def __str__(self):
        return f"{self.tenant.name} - {self.name}"


class SchoolSection(TimeStampedModel):
    class Stage(models.TextChoices):
        NURSERY = "nursery", "Nursery / Early Years"
        PRIMARY = "primary", "Primary School"
        SECONDARY = "secondary", "Secondary School"
        CUSTOM = "custom", "Custom Section"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="school_sections")
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE, related_name="school_sections")
    name = models.CharField(max_length=120)
    code = models.CharField(max_length=30)
    stage = models.CharField(max_length=20, choices=Stage.choices, default=Stage.CUSTOM)
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "name"]
        constraints = [
            models.UniqueConstraint(
                fields=["tenant", "campus", "code"],
                name="unique_school_section_code_per_campus",
            ),
        ]

    def clean(self):
        if self.campus_id and self.tenant_id and self.campus.tenant_id != self.tenant_id:
            raise ValidationError({"campus": "The section campus must belong to the same school tenant."})

    def __str__(self):
        return f"{self.campus.name} - {self.name}"


class Role(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="roles")
    name = models.CharField(max_length=80)
    key = models.SlugField(max_length=80)
    is_system = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["tenant", "key"], name="unique_role_key_per_tenant"),
        ]

    def __str__(self):
        return f"{self.tenant.name}: {self.name}"


class Permission(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=120, unique=True)
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.key


class RolePermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="role_permissions")
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, related_name="role_permissions")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["role", "permission"], name="unique_permission_per_role"),
        ]


class Membership(TimeStampedModel):
    class Status(models.TextChoices):
        INVITED = "invited", "Invited"
        ACTIVE = "active", "Active"
        SUSPENDED = "suspended", "Suspended"
        REVOKED = "revoked", "Revoked"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="school_memberships")
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="memberships")
    campus = models.ForeignKey(Campus, on_delete=models.SET_NULL, null=True, blank=True, related_name="memberships")
    section = models.ForeignKey(
        SchoolSection,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="memberships",
        help_text="Optional academic section scope. Null means the membership is not restricted to one section.",
    )
    role = models.ForeignKey(Role, on_delete=models.PROTECT, related_name="memberships")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "tenant", "role", "campus", "section"],
                name="unique_user_membership_scope",
            ),
        ]

    def clean(self):
        errors = {}
        if self.campus_id and self.tenant_id and self.campus.tenant_id != self.tenant_id:
            errors["campus"] = "The membership campus must belong to the same school tenant."
        if self.section_id:
            if self.section.tenant_id != self.tenant_id:
                errors["section"] = "The membership section must belong to the same school tenant."
            if self.campus_id and self.section.campus_id != self.campus_id:
                errors["section"] = "The membership section must belong to the selected campus."
        if errors:
            raise ValidationError(errors)

    @property
    def scope_label(self):
        if self.section_id:
            return self.section.name
        if self.campus_id:
            return self.campus.name
        return "Whole school"

    def __str__(self):
        scope = self.section.name if self.section_id else (self.campus.name if self.campus_id else "Whole school")
        return f"{self.user} @ {self.tenant} ({self.role.name} · {scope})"


class LeadershipAssignment(TimeStampedModel):
    class Level(models.TextChoices):
        SCHOOL_EXECUTIVE = "school_executive", "School Executive"
        SECTION_HEAD = "section_head", "Section Head"
        DEPUTY = "deputy", "Deputy / Vice Principal"
        DEPARTMENT_HEAD = "department_head", "Head of Department"
        COORDINATOR = "coordinator", "Coordinator"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="leadership_assignments")
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE, related_name="leadership_assignments")
    section = models.ForeignKey(
        SchoolSection,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="leadership_assignments",
        help_text="Null is allowed only for whole-school executive appointments.",
    )
    membership = models.ForeignKey(Membership, on_delete=models.CASCADE, related_name="leadership_assignments")
    title = models.CharField(max_length=100)
    level = models.CharField(max_length=30, choices=Level.choices)
    department_name = models.CharField(max_length=120, blank=True)
    reports_to = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="direct_reports",
    )
    is_primary = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    starts_on = models.DateField(null=True, blank=True)
    ends_on = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ["campus__name", "section__sort_order", "level", "title"]
        constraints = [
            models.UniqueConstraint(
                fields=["membership", "title", "section"],
                name="unique_leadership_title_per_membership_scope",
            ),
        ]

    def clean(self):
        errors = {}
        if self.campus_id and self.tenant_id and self.campus.tenant_id != self.tenant_id:
            errors["campus"] = "The leadership campus must belong to the same school tenant."
        if self.membership_id:
            if self.membership.tenant_id != self.tenant_id:
                errors["membership"] = "The leadership membership must belong to the same school tenant."
            if self.membership.campus_id and self.membership.campus_id != self.campus_id:
                errors["membership"] = "The leadership membership must belong to the selected campus."
        if self.section_id:
            if self.section.tenant_id != self.tenant_id or self.section.campus_id != self.campus_id:
                errors["section"] = "The leadership section must belong to the selected school and campus."
            if self.membership_id and self.membership.section_id and self.membership.section_id != self.section_id:
                errors["membership"] = "The membership section must match the leadership section."
        elif self.level != self.Level.SCHOOL_EXECUTIVE:
            errors["section"] = "A section is required for non-executive leadership appointments."
        if self.reports_to_id:
            if self.reports_to.tenant_id != self.tenant_id or self.reports_to.campus_id != self.campus_id:
                errors["reports_to"] = "Reporting lines cannot cross school or campus boundaries."
            if self.section_id and self.reports_to.section_id and self.reports_to.section_id != self.section_id:
                errors["reports_to"] = "Section leadership must report within the same section unless reporting to a whole-school executive."
        if self.ends_on and self.starts_on and self.ends_on < self.starts_on:
            errors["ends_on"] = "The end date cannot be earlier than the start date."
        if errors:
            raise ValidationError(errors)

    def __str__(self):
        scope = self.section.name if self.section_id else self.campus.name
        return f"{self.title} - {self.membership.user} ({scope})"
