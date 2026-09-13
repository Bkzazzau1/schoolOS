"use client";

import { useParams } from "next/navigation";
import StaffProfileView from "../../../../components/staff-profile-view";

export default function PrincipalTeacherProfilePage() {
  const params = useParams<{ id: string }>();
  return <StaffProfileView staffId={params.id} role="principal" />;
}
