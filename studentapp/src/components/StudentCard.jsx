function StudentCard({ student }) {
  const totalMarks = Object.values(student.marks).reduce((a, b) => a + b, 0);
  const percentage = (totalMarks / 500) * 100;
  const grade =
    percentage >= 90
      ? "A+"
      : percentage >= 75
      ? "A"
      : percentage >= 60
      ? "B"
      : percentage >= 45
      ? "C"
      : "D";
  const result = percentage >= 40 ? "Pass" : "Fail";

  return (
    <div className="student-box">
      {/* Left box - Student Info */}
      <div className="info-box">
        <p><strong>Roll No:</strong> {student.rollNo}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p className={result === "Pass" ? "pass" : "fail"}>
          <strong>Result:</strong> {result}
        </p>
      </div>

      {/* Right box - Marksheet */}
      <div className="marks-box">
        <h3>Mark Sheet</h3>
        <ul>
          <li>English: {student.marks.english}</li>
          <li>Hindi: {student.marks.hindi}</li>
          <li>Social Science: {student.marks.social}</li>
          <li>Computer: {student.marks.computer}</li>
          <li>Math: {student.marks.math}</li>
        </ul>
        <p><strong>Total Marks:</strong> {totalMarks} / 500</p>
        <p><strong>Grade:</strong> {grade}</p>
        <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default StudentCard;
