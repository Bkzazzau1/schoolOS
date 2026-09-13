"use client";

import { useParams } from "next/navigation";
import StudentProfileView from "../../../../components/student-profile-view";

const teacherProfileAliases: Record<string, string> = {
  "STU-J2A-001": "STU-001",
  "STU-J2B-001": "STU-003",
};

export default function TeacherStudentProfilePage() {
  const params = useParams<{ id: string }>();
  const profileId = teacherProfileAliases[params.id] ?? params.id;
  return <StudentProfileView studentId={profileId} role="teacher" />;
}
