import { useState, useEffect } from "react";
import Head from "next/head";

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = async () => {
    try {
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      
      if (response.ok) {
        setAuthenticated(true);
        fetchContacts();
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Authentication failed");
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      }
    } catch (err) {
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ id, status })
      });
      
      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...contact, status } : contact
        ));
      }
    } catch (err) {
      setError("Failed to update status");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            Admin Login
          </h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && authenticate()}
            />
            <button
              onClick={authenticate}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Contact Form Submissions</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Contact Form Submissions
              </h1>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No contact form submissions yet.
                    </p>
                  ) : (
                    contacts.map((contact) => (
                      <div key={contact.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                              {contact.fullName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {contact.email} • {new Date(contact.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <select
                              value={contact.status}
                              onChange={(e) => updateStatus(contact.id, e.target.value)}
                              className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="replied">Replied</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject: {contact.subject}
                          </h4>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {contact.message}
                          </p>
                        </div>
                        
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                          IP: {contact.ip} • User Agent: {contact.userAgent?.substring(0, 50)}...
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
