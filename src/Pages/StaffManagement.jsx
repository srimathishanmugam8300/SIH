import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const StaffManagement = ({ onBack }) => {
  // STATE HOOKS MUST BE AT THE VERY TOP
  const [showAddForm, setShowAddForm] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    contact: '',
    classes: '',
    subject: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:3001';

  // Load staff data from JSON Server when component loads
  useEffect(() => {
    fetchStaff();
  }, []);

  // Fetch all staff members from JSON Server
  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/staff`);
      if (!response.ok) {
        throw new Error('Failed to fetch staff');
      }
      const data = await response.json();
      setStaffMembers(data);
      setError('');
    } catch (err) {
      setError('Failed to load staff data. Please check if JSON Server is running.');
      console.error('Error fetching staff:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new staff member to JSON Server
  const handleAddStaff = async (e) => {
    e.preventDefault();
    
    if (!newStaff.name || !newStaff.email || !newStaff.contact) {
      setError('Please fill in Name, Email, and Contact fields! ❌');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const staffData = {
        name: newStaff.name,
        email: newStaff.email,
        contact: newStaff.contact,
        classes: newStaff.classes,
        subject: newStaff.subject,
        dateAdded: new Date().toLocaleDateString()
      };

      const response = await fetch(`${API_BASE}/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add staff');
      }
      
      const newStaffData = await response.json();
      setStaffMembers([...staffMembers, newStaffData]);
      
      setNewStaff({ name: '', email: '', contact: '', classes: '', subject: '' });
      setShowAddForm(false);
      
      alert('Staff member added successfully! ✅');
    } catch (err) {
      setError('Failed to add staff member. Please try again.');
      console.error('Error adding staff:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete staff member from JSON Server
  const handleDeleteStaff = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/staff/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete staff');
      }
      
      const updatedStaff = staffMembers.filter(staff => staff.id !== id);
      setStaffMembers(updatedStaff);
      
      alert('Staff member deleted successfully! ✅');
    } catch (err) {
      setError('Failed to delete staff member. Please try again.');
      console.error('Error deleting staff:', err);
    } finally {
      setIsLoading(false);
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
            Total Staff Members: {staffMembers.length}
          </p>
          {error && (
            <p style={{ color: "#e74c3c", margin: "10px 0 0 0", fontSize: "14px" }}>
              ⚠️ {error}
            </p>
          )}
        </div>
        
        <div>
          <button 
            onClick={() => setShowAddForm(true)}
            disabled={isLoading}
            style={{ 
              padding: "10px 20px", 
              background: "#27ae60", 
              color: "white", 
              border: "none", 
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginRight: "10px",
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? "Loading..." : "+ Add Staff"}
          </button>
          <button 
            onClick={onBack}
            disabled={isLoading}
            style={{ 
              padding: "10px 20px", 
              background: "#95a5a6", 
              color: "white", 
              border: "none", 
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              opacity: isLoading ? 0.6 : 1
            }}
          >
            ← Back
          </button>
        </div>
      </div>

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
            width: "400px",
            maxWidth: "90vw"
          }}>
            <h2 style={{ 
              color: "#2c3e50",
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              Add New Staff Member
            </h2>

            <form onSubmit={handleAddStaff}>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
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
                  required
                  disabled={isLoading}
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
                  required
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  style={{ 
                    padding: "12px 25px", 
                    background: "#27ae60", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    opacity: isLoading ? 0.6 : 1
                  }}
                >
                  {isLoading ? "Adding..." : "Add Staff"}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  disabled={isLoading}
                  style={{ 
                    padding: "12px 25px", 
                    background: "#95a5a6", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    opacity: isLoading ? 0.6 : 1
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        marginTop: "20px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ 
            color: "#2c3e50",
            fontSize: "22px",
            borderBottom: "2px solid #3498db",
            paddingBottom: "10px",
            margin: 0
          }}>
            📋 Staff Members List ({staffMembers.length})
          </h3>
          
          <button 
            onClick={fetchStaff}
            disabled={isLoading}
            style={{ 
              padding: "8px 15px", 
              background: "#3498db", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              fontSize: "14px",
              cursor: "pointer",
              opacity: isLoading ? 0.6 : 1
            }}
          >
            🔄 Refresh
          </button>
        </div>

        {isLoading && staffMembers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading staff data...</p>
          </div>
        ) : staffMembers.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px", 
            color: "#7f8c8d" 
          }}>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>No staff members yet</p>
            <p>Click "Add Staff" to add your first staff member</p>
            <p style={{ fontSize: "12px", marginTop: "10px", color: "#e74c3c" }}>
              Make sure JSON Server is running on port 3001
            </p>
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
                border: "2px solid #e9ecef",
                position: "relative"
              }}>
                <button
                  onClick={() => handleDeleteStaff(staff.id)}
                  disabled={isLoading}
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
                    fontWeight: "bold",
                    opacity: isLoading ? 0.6 : 1
                  }}
                  title="Delete Staff"
                >
                  ×
                </button>
                
                <h4 style={{ 
                  color: "#2c3e50",
                  fontSize: "18px",
                  marginBottom: "15px",
                  paddingRight: "40px"
                }}>
                  👤 {staff.name}
                </h4>
                
                <p style={{ margin: "8px 0", color: "#34495e" }}>
                  📧 <strong>Email:</strong> {staff.email}
                </p>
                
                <p style={{ margin: "8px 0", color: "#34495e" }}>
                  📞 <strong>Contact:</strong> {staff.contact}
                </p>
                
                {staff.classes && (
                  <p style={{ margin: "8px 0", color: "#34495e" }}>
                    🏫 <strong>Classes:</strong> {staff.classes}
                  </p>
                )}
                
                {staff.subject && (
                  <p style={{ margin: "8px 0", color: "#34495e" }}>
                    📚 <strong>Subject:</strong> {staff.subject}
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
                  Added on: {staff.dateAdded}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;