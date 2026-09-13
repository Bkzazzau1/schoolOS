from rest_framework import serializers
from .models import Campus, LeadershipAssignment, Membership, Role, SchoolSection, Tenant


class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = ["id", "name", "code", "is_main", "is_active"]


class SchoolSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolSection
        fields = ["id", "campus", "name", "code", "stage", "sort_order", "is_active"]


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "name", "key", "is_system"]


class MembershipSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    campus = CampusSerializer(read_only=True)
    section = SchoolSectionSerializer(read_only=True)
    scope_label = serializers.CharField(read_only=True)

    class Meta:
        model = Membership
        fields = ["id", "tenant", "campus", "section", "scope_label", "role", "status", "created_at"]


class LeadershipAssignmentSerializer(serializers.ModelSerializer):
    membership = MembershipSerializer(read_only=True)
    section = SchoolSectionSerializer(read_only=True)

    class Meta:
        model = LeadershipAssignment
        fields = [
            "id",
            "tenant",
            "campus",
            "section",
            "membership",
            "title",
            "level",
            "department_name",
            "reports_to",
            "is_primary",
            "is_active",
            "starts_on",
            "ends_on",
            "created_at",
        ]


class TenantSerializer(serializers.ModelSerializer):
    campuses = CampusSerializer(many=True, read_only=True)
    school_sections = SchoolSectionSerializer(many=True, read_only=True)

    class Meta:
        model = Tenant
        fields = [
            "id",
            "name",
            "slug",
            "is_active",
            "billing_email",
            "student_price_per_term",
            "campuses",
            "school_sections",
            "created_at",
        ]
        read_only_fields = ["student_price_per_term"]
