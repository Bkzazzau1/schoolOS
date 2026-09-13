from rest_framework import serializers
from .models import Campus, Membership, Role, Tenant


class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = ["id", "name", "code", "is_main", "is_active"]


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "name", "key", "is_system"]


class MembershipSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    campus = CampusSerializer(read_only=True)

    class Meta:
        model = Membership
        fields = ["id", "tenant", "campus", "role", "status", "created_at"]


class TenantSerializer(serializers.ModelSerializer):
    campuses = CampusSerializer(many=True, read_only=True)

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
            "created_at",
        ]
        read_only_fields = ["student_price_per_term"]
