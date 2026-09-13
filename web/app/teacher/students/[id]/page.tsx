"use client";

import { useParams } from "next/navigation";
import StudentProfileView from "../../../../components/student-profile-view";

export default function TeacherStudentProfilePage() {
  const params = useParams<{ id: string }>();
  return <StudentProfileView studentId={params.id} role="teacher" />;
}
