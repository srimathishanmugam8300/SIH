import React, { useState } from 'react';

const StudentManagement = ({ onBack }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    contact: '',
    class: '',
    rollNumber: '',
    parentName: '',
    parentContact: ''
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.contact && newStudent.class && newStudent.rollNumber) {
      setStudents([...students, { 
        ...newStudent, 
        id: Date.now(),
        dateAdded: new Date().toLocaleDateString()
      }]);
      setNewStudent({ 
        name: '', 
        email: '', 
        contact: '', 
        class: '', 
        rollNumber: '', 
        parentName: '', 
        parentContact: '' 
      });
      setShowAddForm(false);
      alert('Student added successfully!');
    } else {
      alert('Please fill in all required fields! ❌');
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(students, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `students_${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          setStudents(importedData);
          alert('Students imported successfully!');
        } else {
          alert('Invalid file format!');
        }
      } catch (error) {
        alert('Error parsing JSON file!');
      }
    };
    reader.readAsText(file);
  };

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
            Total Students: {students.length}
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Export JSON Button */}
          {students.length > 0 && (
            <button 
              onClick={exportToJSON}
              style={{ 
                padding: "8px 15px", 
                background: "#9b59b6", 
                color: "white", 
                border: "none", 
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer"
              }}
              title="Export to JSON"
            >
              💾 Export JSON
            </button>
          )}
          
          {/* Import JSON Button */}
          <label style={{ 
            padding: "8px 15px", 
            background: "#f39c12", 
            color: "white", 
            border: "none", 
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer"
          }}>
            📥 Import JSON
            <input
              type="file"
              accept=".json"
              onChange={importFromJSON}
              style={{ display: 'none' }}
            />
          </label>

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
              cursor: "pointer"
            }}
          >
            + Add Student
          </button>
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
            ← Back
          </button>
        </div>
      </div>

      {/* Add Student Form Modal */}
      {showAddForm && (
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
            width: "400px"
          }}>
            <h2 style={{ 
              color: "#2c3e50",
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              Add New Student
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); handleAddStudent(); }}>
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
                  placeholder="Contact Number *"
                  value={newStudent.contact}
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
                  name="class"
                  placeholder="Class/Grade * (e.g., 10A)"
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
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Roll Number *"
                  value={newStudent.rollNumber}
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
                  name="parentName"
                  placeholder="Parent/Guardian Name"
                  value={newStudent.parentName}
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

              <div style={{ marginBottom: "25px" }}>
                <input
                  type="tel"
                  name="parentContact"
                  placeholder="Parent/Guardian Contact"
                  value={newStudent.parentContact}
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

      {/* Student List */}
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
          paddingBottom: "10px"
        }}>
          📋 Student List ({students.length})
        </h3>

        {students.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px", 
            color: "#7f8c8d" 
          }}>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>No students yet</p>
            <p>Click "Add Student" to add your first student</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {students.map((student) => (
              <div key={student.id} style={{
                background: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e9ecef"
              }}>
                <h4 style={{ 
                  color: "#2c3e50",
                  fontSize: "18px",
                  marginBottom: "15px",
                  paddingRight: "40px"
                }}>
                  👤 {student.name}
                </h4>
                
                <p style={{ margin: "8px 0", color: "#34495e" }}>
                  📧 <strong>Email:</strong> {student.email}
                </p>
                
                <p style={{ margin: "8px 0", color: "#34495e" }}>
                  📞 <strong>Contact:</strong> {student.contact}
                </p>
                
                <p style={{ margin: "8px 0", color: "#34495e" }}>
                  🏫 <strong>Class:</strong> {student.class}
                </p>
                
                <p style={{ margin: "8px 0", color: "#34495e" }}>
                  🔢 <strong>Roll No:</strong> {student.rollNumber}
                </p>
                
                {student.parentName && (
                  <p style={{ margin: "8px 0", color: "#34495e" }}>
                    👨‍👩‍👧‍👦 <strong>Parent:</strong> {student.parentName}
                  </p>
                )}
                
                {student.parentContact && (
                  <p style={{ margin: "8px 0", color: "#34495e" }}>
                    📱 <strong>Parent Contact:</strong> {student.parentContact}
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