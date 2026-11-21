import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Progress from "./components/Progress";
import Milestone from "./components/Milestone";

const initialStudents = [
  {
    id: 1,
    name: "Maya Chen",
    grade: "Grade 8",
    course: "Algebra I",
    progress: 86,
    averageScore: 91,
    attendance: 96,
    status: "On track",
    lastActive: "Today",
    assignments: [
      { id: 1, title: "Linear equations quiz", course: "Algebra I", due: "Nov 18", score: 92, status: "Graded" },
      { id: 2, title: "Expressions practice", course: "Algebra I", due: "Nov 21", score: null, status: "In progress" },
      { id: 3, title: "Number patterns", course: "Algebra I", due: "Nov 25", score: null, status: "Upcoming" },
    ],
  },
  {
    id: 2,
    name: "Ethan Brooks",
    grade: "Grade 8",
    course: "Algebra I",
    progress: 72,
    averageScore: 84,
    attendance: 92,
    status: "On track",
    lastActive: "Yesterday",
    assignments: [
      { id: 1, title: "Linear equations quiz", course: "Algebra I", due: "Nov 18", score: 84, status: "Graded" },
      { id: 2, title: "Expressions practice", course: "Algebra I", due: "Nov 21", score: null, status: "In progress" },
    ],
  },
  {
    id: 3,
    name: "Olivia Brooks",
    grade: "Grade 7",
    course: "Pre-algebra",
    progress: 48,
    averageScore: 67,
    attendance: 88,
    status: "Needs support",
    lastActive: "3 days ago",
    assignments: [
      { id: 1, title: "Fractions review", course: "Pre-algebra", due: "Nov 17", score: 64, status: "Graded" },
      { id: 2, title: "Decimal practice", course: "Pre-algebra", due: "Nov 20", score: null, status: "In progress" },
    ],
  },
  {
    id: 4,
    name: "Noah Williams",
    grade: "Grade 8",
    course: "Geometry",
    progress: 93,
    averageScore: 96,
    attendance: 99,
    status: "On track",
    lastActive: "Today",
    assignments: [
      { id: 1, title: "Angles and lines", course: "Geometry", due: "Nov 19", score: 96, status: "Graded" },
      { id: 2, title: "Triangle properties", course: "Geometry", due: "Nov 24", score: null, status: "Upcoming" },
    ],
  },
];

function getAverage(students, key) {
  const values = students
    .map((student) => student[key])
    .filter((value) => Number.isFinite(value));

  if (values.length === 0) return null;
  return Math.round(
    values.reduce((total, value) => total + value, 0) / values.length
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStatusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudents[0].id);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("Grade 8");

  const filteredStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch = [student.name, student.course, student.grade]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesStatus =
        statusFilter === "all" ||
        getStatusClass(student.status) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, students]);

  const selectedStudent =
    filteredStudents.find((student) => student.id === selectedStudentId) ??
    filteredStudents[0] ??
    null;

  const averageProgress = getAverage(students, "progress");
  const averageScore = getAverage(students, "averageScore");
  const averageAttendance = getAverage(students, "attendance");
  const studentsNeedingSupport = students.filter(
    (student) => student.status === "Needs support"
  ).length;

  function addStudent(event) {
    event.preventDefault();
    const name = newStudentName.trim();
    if (!name) return;

    const student = {
      id: Math.max(0, ...students.map((student) => student.id)) + 1,
      name,
      grade: newStudentGrade,
      course: "Not assigned",
      progress: 0,
      averageScore: null,
      attendance: null,
      status: "New",
      lastActive: "Just added",
      assignments: [],
    };

    setStudents((currentStudents) => [...currentStudents, student]);
    setSelectedStudentId(student.id);
    setSearch("");
    setStatusFilter("all");
    setNewStudentName("");
    setShowAddForm(false);
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="dashboard">
        <div className="page-heading">
          <div>
            <p className="eyebrow">CLASSROOM OVERVIEW</p>
            <h1>Student progress</h1>
            <p className="page-description">
              A clear view of learning progress, achievement, and attendance.
            </p>
          </div>
          <button
            className="primary-button"
            type="button"
            onClick={() => setShowAddForm((isOpen) => !isOpen)}
            aria-expanded={showAddForm}
          >
            {showAddForm ? "Close form" : "+ Add student"}
          </button>
        </div>

        {showAddForm && (
          <form className="add-student-form" onSubmit={addStudent}>
            <div className="form-heading">
              <div>
                <h2>Add a student</h2>
                <p>They’ll appear in your class roster.</p>
              </div>
            </div>
            <label>
              Student name
              <input
                autoFocus
                required
                value={newStudentName}
                onChange={(event) => setNewStudentName(event.target.value)}
                placeholder="e.g. Alex Morgan"
              />
            </label>
            <label>
              Grade
              <select
                value={newStudentGrade}
                onChange={(event) => setNewStudentGrade(event.target.value)}
              >
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
              </select>
            </label>
            <button className="primary-button" type="submit">
              Save student
            </button>
          </form>
        )}

        <section className="summary-grid" aria-label="Class summary">
          <article className="summary-card">
            <span className="summary-label">Students</span>
            <strong>{students.length}</strong>
            <span className="summary-note">In your class</span>
          </article>
          <article className="summary-card">
            <span className="summary-label">Average progress</span>
            <strong>{averageProgress === null ? "—" : `${averageProgress}%`}</strong>
            <span className="summary-note">Across all courses</span>
          </article>
          <article className="summary-card">
            <span className="summary-label">Average score</span>
            <strong>{averageScore === null ? "—" : `${averageScore}%`}</strong>
            <span className="summary-note">Graded assignments</span>
          </article>
          <article className="summary-card">
            <span className="summary-label">Need support</span>
            <strong>{studentsNeedingSupport}</strong>
            <span className="summary-note">Students to check in with</span>
          </article>
        </section>

        <div className="content-grid">
          <section className="panel roster-panel" aria-labelledby="roster-title">
            <div className="panel-heading">
              <div>
                <h2 id="roster-title">Class roster</h2>
                <p>{filteredStudents.length} students shown</p>
              </div>
            </div>

            <div className="roster-controls">
              <label className="sr-only" htmlFor="student-search">
                Search students
              </label>
              <input
                id="student-search"
                className="search-input"
                type="search"
                placeholder="Search students or courses"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <label className="sr-only" htmlFor="status-filter">
                Filter by progress status
              </label>
              <select
                id="status-filter"
                className="filter-select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All students</option>
                <option value="on-track">On track</option>
                <option value="needs-support">Needs support</option>
                <option value="new">New</option>
              </select>
            </div>

            <div className="student-list">
              {filteredStudents.map((student) => (
                <button
                  className={`student-row${selectedStudent?.id === student.id ? " is-selected" : ""}`}
                  key={student.id}
                  type="button"
                  aria-pressed={selectedStudent?.id === student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                >
                  <span className={`student-avatar avatar-${student.id % 4}`}>
                    {getInitials(student.name)}
                  </span>
                  <span className="student-row-copy">
                    <span className="student-row-name">{student.name}</span>
                    <span className="student-row-subtitle">
                      {student.grade} · {student.course}
                    </span>
                    <Progress
                      label="Course progress"
                      value={student.progress}
                      compact
                    />
                  </span>
                  <span className={`status-pill status-${getStatusClass(student.status)}`}>
                    {student.status}
                  </span>
                </button>
              ))}
              {filteredStudents.length === 0 && (
                <p className="empty-state">No students match your search.</p>
              )}
            </div>
          </section>

          <section className="panel detail-panel" aria-labelledby="detail-title">
            {selectedStudent ? (
              <>
                <div className="student-profile">
                  <span className={`student-avatar profile-avatar avatar-${selectedStudent.id % 4}`}>
                    {getInitials(selectedStudent.name)}
                  </span>
                  <div className="profile-copy">
                    <p className="eyebrow">STUDENT PROFILE</p>
                    <h2 id="detail-title">{selectedStudent.name}</h2>
                    <p>
                      {selectedStudent.grade} <span aria-hidden="true">·</span>{" "}
                      {selectedStudent.course}
                    </p>
                  </div>
                  <span className={`status-pill status-${getStatusClass(selectedStudent.status)}`}>
                    {selectedStudent.status}
                  </span>
                </div>

                <div className="student-stats">
                  <div>
                    <span>Average score</span>
                    <strong>
                      {selectedStudent.averageScore !== null
                        ? `${selectedStudent.averageScore}%`
                        : "—"}
                    </strong>
                  </div>
                  <div>
                    <span>Attendance</span>
                    <strong>
                      {selectedStudent.attendance === null
                        ? "—"
                        : `${selectedStudent.attendance}%`}
                    </strong>
                  </div>
                  <div>
                    <span>Last active</span>
                    <strong>{selectedStudent.lastActive}</strong>
                  </div>
                </div>

                <div className="detail-section">
                  <div className="section-title-row">
                    <h3>Course progress</h3>
                    <span>{selectedStudent.course}</span>
                  </div>
                  <Progress
                    label="Overall completion"
                    value={selectedStudent.progress}
                    detail={`${selectedStudent.progress}% of course completed`}
                  />
                </div>

                <div className="detail-section assignments-section">
                  <div className="section-title-row">
                    <h3>Recent assignments</h3>
                    <span>{selectedStudent.assignments.length} items</span>
                  </div>
                  {selectedStudent.assignments.length > 0 ? (
                    <div className="milestone-list">
                      {selectedStudent.assignments.map((assignment) => (
                        <Milestone key={assignment.id} milestone={assignment} />
                      ))}
                    </div>
                  ) : (
                    <p className="empty-state">
                      No assignments yet. Add course work to start tracking progress.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-profile">
                <h2 id="detail-title">No student selected</h2>
                <p>Adjust your search or filters to see a student profile.</p>
              </div>
            )}
          </section>
        </div>

        <div className="dashboard-footer">
          Class attendance average:{" "}
          <strong>
            {averageAttendance === null ? "—" : `${averageAttendance}%`}
          </strong>
        </div>
      </main>
    </div>
  );
}

export default App;
