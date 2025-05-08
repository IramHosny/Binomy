import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  const sections = [
    { title: "Utilisateurs Étudiants", path: "/admin/etudiants" },
    { title: "Utilisateurs Bailleurs", path: "/admin/bailleurs" },
    { title: "Publications Partagées ", path: "/admin/publications" },
    { title: "Offres de location", path: "/admin/offres" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord Administrateur</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <Link to={section.path} key={section.title}>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h2>
              <p className="text-gray-600">Accéder à la gestion</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
