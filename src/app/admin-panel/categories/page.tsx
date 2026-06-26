"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
  _count?: { yachts: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    sortOrder: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch(`${API_URL}/admin/categories`, { headers });
      if (res.ok) setCategories(await res.json());
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingCategory(null);
    setFormData({ name: "", slug: "", description: "", icon: "", sortOrder: categories.length, isActive: true });
    setError("");
    setShowModal(true);
  }

  function openEdit(cat: Category) {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      icon: cat.icon || "",
      sortOrder: cat.sortOrder,
      isActive: cat.isActive,
    });
    setError("");
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = `${API_URL}/admin/categories`;
      const method = editingCategory ? "PUT" : "POST";
      const body = editingCategory ? { ...formData, id: editingCategory.id } : formData;

      const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Failed to save");

      setShowModal(false);
      fetchData();
    } catch (err) {
      setError("Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    try {
      await fetch(`${API_URL}/admin/categories?id=${id}`, { method: "DELETE", headers });
      fetchData();
    } catch {
      alert("Failed to delete");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500">Manage yacht categories</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Icon</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Slug</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Yachts</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xl">{cat.icon || "🚤"}</td>
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                  <td className="px-4 py-3">{cat._count?.yachts || 0}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded ${cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(cat)} className="p-2 text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{editingCategory ? "Edit" : "Add"} Category</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon (emoji)</label>
                <input type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="rounded" />
                <span className="text-sm">Active</span>
              </label>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
