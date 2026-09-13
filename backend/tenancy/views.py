from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Membership, Tenant
from .serializers import MembershipSerializer, TenantSerializer


class TenantViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TenantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tenant.objects.filter(
            memberships__user=self.request.user,
            memberships__status=Membership.Status.ACTIVE,
            is_active=True,
        ).distinct()


class MembershipViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MembershipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Membership.objects.select_related("tenant", "campus", "role").filter(
            user=self.request.user,
            status=Membership.Status.ACTIVE,
        )

    @action(detail=False, methods=["get"])
    def me(self, request):
        memberships = self.get_queryset()
        return Response({
            "user": {
                "id": request.user.id,
                "username": request.user.get_username(),
                "email": request.user.email,
            },
            "memberships": MembershipSerializer(memberships, many=True).data,
        })
