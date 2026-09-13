from django.contrib import admin
from .models import Campus, Membership, Permission, Role, RolePermission, Tenant


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active", "student_price_per_term", "created_at")
    search_fields = ("name", "slug", "billing_email")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Campus)
class CampusAdmin(admin.ModelAdmin):
    list_display = ("name", "tenant", "code", "is_main", "is_active")
    list_filter = ("tenant", "is_main", "is_active")


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("name", "tenant", "key", "is_system")
    list_filter = ("tenant", "is_system")


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ("user", "tenant", "campus", "role", "status", "created_at")
    list_filter = ("tenant", "role", "status")
    search_fields = ("user__username", "user__email", "tenant__name")


admin.site.register(Permission)
admin.site.register(RolePermission)
