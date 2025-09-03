import React, { useState, useEffect } from 'react';

const StudentManagement = ({ onBack, userRole }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    email: '',
    contact: '',
    parentContact: '',
    class: '',
    section: ''
  });

  // Load student data from localStorage when component loads
  useEffect(() => {
    const savedStudents = localStorage.getItem('schoolStudents');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Save student data to localStorage whenever students changes
  useEffect(() => {
    localStorage.setItem('schoolStudents', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (e) => {
    e.preventDefault();
    
    if (newStudent.name && newStudent.studentId && newStudent.email) {
      const studentData = {
        id: Date.now(),
        name: newStudent.name,
        studentId: newStudent.studentId,
        email: newStudent.email,
        contact: newStudent.contact,
        parentContact: newStudent.parentContact,
        class: newStudent.class,
        section: newStudent.section,
        dateAdded: new Date().toLocaleDateString()
      };

      // Add to student list
      setStudents([...students, studentData]);
      
      // Reset form
      setNewStudent({ 
        name: '', 
        studentId: '', 
        email: '', 
        contact: '', 
        parentContact: '', 
        class: '', 
        section: '' 
      });
      setShowAddForm(false);
      
      alert('Student added successfully! ✅');
    } else {
      alert('Please fill in Name, Student ID, and Email fields! ❌');
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
    }
  };

  // Filter students based on user role
  const filteredStudents = userRole === 'teacher' 
    ? students.filter(student => student.class === '10A' || student.class === '10B') // Example: Teacher only sees their classes
    : students;

  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#f4f6f8",
      padding: "20px"
    }}>
      {/* Header */}
      <div style={{ 
        background: "white", 
        padding: "20px", 
        borderRadius: "10px", 
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ 
            color: "#2c3e50",
            fontSize: "28px",
            marginBottom: "5px"
          }}>
            Student Management
          </h1>
          <p style={{ 
            color: "#7f8c8d",
            fontSize: "16px",
            margin: "0"
          }}>
            Total Students: {filteredStudents.length}
            {userRole === 'teacher' && ' (Filtered by your classes)'}
          </p>
        </div>
        
        <div>
          {userRole === 'principal' && (
            <button 
              onClick={() => setShowAddForm(true)}
              style={{ 
                padding: "10px 20px", 
                background: "#27ae60", 
                color: "white", 
                border: "none", 
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              + Add Student
            </button>
          )}
          <button 
            onClick={onBack}
            style={{ 
              padding: "10px 20px", 
              background: "#95a5a6", 
              color: "white", 
              border: "none", 
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Add Student Form Modal - Only for Principal */}
      {showAddForm && userRole === 'principal' && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1000"
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
            width: "400px",
            maxHeight: "80vh",
            overflowY: "auto"
          }}>
            <h2 style={{ 
              color: "#2c3e50",
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              Add New Student
            </h2>

            <form onSubmit={handleAddStudent}>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  name="studentId"
                  placeholder="Student ID *"
                  value={newStudent.studentId}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Student Contact Number"
                  value={newStudent.contact}
                  onChange={handleInputChange}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <input
                  type="tel"
                  name="parentContact"
                  placeholder="Parent Contact Number *"
                  value={newStudent.parentContact}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <select
                  name="class"
                  value={newStudent.class}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                >
                  <option value="">Select Class *</option>
                  <option value="9A">Class 9A</option>
                  <option value="9B">Class 9B</option>
                  <option value="10A">Class 10A</option>
                  <option value="10B">Class 10B</option>
                  <option value="11A">Class 11A</option>
                  <option value="11B">Class 11B</option>
                  <option value="12A">Class 12A</option>
                  <option value="12B">Class 12B</option>
                </select>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <select
                  name="section"
                  value={newStudent.section}
                  onChange={handleInputChange}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box" 
                  }}
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button 
                  type="submit"
                  style={{ 
                    padding: "12px 25px", 
                    background: "#27ae60", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Add Student
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  style={{ 
                    padding: "12px 25px", 
                    background: "#95a5a6", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student List Display */}
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        marginTop: "20px"
      }}>
        <h3 style={{ 
          color: "#2c3e50",
          fontSize: "22px",
          marginBottom: "20px",
          borderBottom: "2px solid #3498db",
          paddingBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          📊 Student Records ({filteredStudents.length})
          {userRole === 'teacher' && (
            <span style={{ 
              fontSize: "14px", 
              color: "#7f8c8d", 
              fontWeight: "normal" 
            }}>
              (Showing only your classes)
            </span>
          )}
        </h3>

        {filteredStudents.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px", 
            color: "#7f8c8d" 
          }}>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>No students found</p>
            <p>
              {userRole === 'principal' 
                ? 'Click "Add Student" to add your first student record'
                : 'No students assigned to your classes yet'
              }
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {filteredStudents.map((student) => (
              <div key={student.id} style={{
                background: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                border: "2px solid #e9ecef",
                position: "relative"
              }}>
                {/* Delete Button - Only for Principal */}
                {userRole === 'principal' && (
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold"
                    }}
                    title="Delete Student"
                  >
                    ×
                  </button>
                )}
                
                <h4 style={{ 
                  color: "#2c3e50",
                  fontSize: "18px",
                  marginBottom: "15px",
                  paddingRight: userRole === 'principal' ? "40px" : "0"
                }}>
                  👤 {student.name}
                  {student.class && (
                    <span style={{ 
                      fontSize: "14px", 
                      color: "#7f8c8d", 
                      marginLeft: "10px",
                      fontWeight: "normal"
                    }}>
                      (Class {student.class}{student.section && ` - Section ${student.section}`})
                    </span>
                  )}
                </h4>
                
                <p style={{ margin: "8px 0", color: "#34495e" }}>
                  🆔 <strong>Student ID:</strong> {student.studentId}
                </p>
                
                <p style={{ margin: "8px 0", color: "#34495e" }}>
                  📧 <strong>Email:</strong> {student.email}
                </p>
                
                {student.contact && (
                  <p style={{ margin: "8px 0", color: "#34495e" }}>
                    📞 <strong>Student Contact:</strong> {student.contact}
                  </p>
                )}
                
                {student.parentContact && (
                  <p style={{ margin: "8px 0", color: "#34495e" }}>
                    👨‍👩‍👧‍👦 <strong>Parent Contact:</strong> {student.parentContact}
                  </p>
                )}
                
                <p style={{ 
                  margin: "15px 0 0 0", 
                  fontSize: "12px", 
                  color: "#95a5a6",
                  fontStyle: "italic",
                  borderTop: "1px solid #ddd",
                  paddingTop: "10px"
                }}>
                  Added on: {student.dateAdded}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;