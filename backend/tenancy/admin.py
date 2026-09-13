from django.contrib import admin
from .models import Campus, LeadershipAssignment, Membership, Permission, Role, RolePermission, SchoolSection, Tenant


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active", "student_price_per_term", "created_at")
    search_fields = ("name", "slug", "billing_email")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Campus)
class CampusAdmin(admin.ModelAdmin):
    list_display = ("name", "tenant", "code", "is_main", "is_active")
    list_filter = ("tenant", "is_main", "is_active")


@admin.register(SchoolSection)
class SchoolSectionAdmin(admin.ModelAdmin):
    list_display = ("name", "tenant", "campus", "stage", "code", "is_active")
    list_filter = ("tenant", "campus", "stage", "is_active")
    search_fields = ("name", "code", "tenant__name", "campus__name")


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("name", "tenant", "key", "is_system")
    list_filter = ("tenant", "is_system")


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ("user", "tenant", "campus", "section", "role", "status", "created_at")
    list_filter = ("tenant", "campus", "section", "role", "status")
    search_fields = ("user__username", "user__email", "tenant__name", "section__name")


@admin.register(LeadershipAssignment)
class LeadershipAssignmentAdmin(admin.ModelAdmin):
    list_display = ("title", "membership", "tenant", "campus", "section", "level", "reports_to", "is_active")
    list_filter = ("tenant", "campus", "section", "level", "is_active")
    search_fields = (
        "title",
        "department_name",
        "membership__user__username",
        "membership__user__email",
        "section__name",
    )


admin.site.register(Permission)
admin.site.register(RolePermission)
