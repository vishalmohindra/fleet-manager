import { useState } from "react";
import students from "./Student";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const [studentData, setStudentData] = useState(students);

  return (
    <div className="app-container">
      <Header />
      <StudentList students={studentData} />
      <Footer />
    </div>
  );
}

export default App;
