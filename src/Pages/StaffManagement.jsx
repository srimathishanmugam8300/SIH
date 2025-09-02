import React, { useState } from 'react';

const StaffManagement = ({ onBack }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    contact: '',
    classes: '',
    subject: ''
  });

  const handleAddStaff = () => {
    if (newStaff.name && newStaff.email && newStaff.contact) {
      setStaffMembers([...staffMembers, { ...newStaff, id: Date.now() }]);
      setNewStaff({ name: '', email: '', contact: '', classes: '', subject: '' });
      setShowAddForm(false);
      alert('Staff member added successfully!');
    } else {
      alert('Please fill in all required fields (Name, Email, Contact)');
    }
  };

  const handleInputChange = (e) => {
    setNewStaff({
      ...newStaff,
      [e.target.name]: e.target.value
    });
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
            Staff Management
          </h1>
          <p style={{ 
            color: "#7f8c8d",
            fontSize: "16px",
            margin: "0"
          }}>
            Manage teaching and non-teaching staff members
          </p>
        </div>
        
        <div>
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
            + Add Staff
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

      {/* Add Staff Form Modal */}
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
              Add New Staff Member
            </h2>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={newStaff.name}
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
                type="email"
                name="email"
                placeholder="Email Address *"
                value={newStaff.email}
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
                name="contact"
                placeholder="Contact Number *"
                value={newStaff.contact}
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
                type="text"
                name="classes"
                placeholder="Classes Handled (e.g., 10A, 10B)"
                value={newStaff.classes}
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
                type="text"
                name="subject"
                placeholder="Subject Handled (e.g., Mathematics, Science)"
                value={newStaff.subject}
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
                onClick={handleAddStaff}
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
                Add Staff
              </button>
              <button 
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
          </div>
        </div>
      )}

      {/* Staff List */}
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ 
          color: "#2c3e50",
          fontSize: "20px",
          marginBottom: "20px"
        }}>
          Staff Members ({staffMembers.length})
        </h3>

        {staffMembers.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px", 
            color: "#7f8c8d" 
          }}>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>No staff members added yet</p>
            <p>Click "Add Staff" to add new staff members</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {staffMembers.map((staff) => (
              <div key={staff.id} style={{
                background: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e9ecef"
              }}>
                <h4 style={{ 
                  color: "#2c3e50",
                  fontSize: "18px",
                  marginBottom: "10px"
                }}>
                  {staff.name}
                </h4>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  📧 {staff.email}
                </p>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  📞 {staff.contact}
                </p>
                {staff.classes && (
                  <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                    🏫 Classes: {staff.classes}
                  </p>
                )}
                {staff.subject && (
                  <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                    📚 Subject: {staff.subject}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;