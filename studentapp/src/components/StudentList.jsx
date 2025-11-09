import StudentCard from "./StudentCard";

function StudentList({ students }) {
  return (
    <div className="student-list">
      {students.map((item) => (
        <StudentCard key={item.id} student={item} />
      ))}
    </div>
  );
}

export default StudentList;
