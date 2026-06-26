"use client";

import { useState, useEffect } from "react";
import { Ship, Plus, Edit, Trash2, Image, X, Save } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

interface Yacht {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  capacity: number;
  price: string | number;
  categoryId: string;
  category?: { name: string };
  location?: string;
  featured: boolean;
  isActive: boolean;
  images?: { id: string; url: string; isPrimary: boolean }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function YachtsPage() {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingYacht, setEditingYacht] = useState<Yacht | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    capacity: 10,
    price: 15000,
    categoryId: "",
    location: "",
    featured: false,
    isActive: true,
    images: [] as { url: string; isPrimary: boolean }[],
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
      const [yachtsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/admin/yachts`, { headers }),
        fetch(`${API_URL}/admin/categories`, { headers }),
      ]);

      if (yachtsRes.ok) setYachts(await yachtsRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingYacht(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      capacity: 10,
      price: 15000,
      categoryId: categories[0]?.id || "",
      location: "",
      featured: false,
      isActive: true,
      images: [],
    });
    setError("");
    setShowModal(true);
  }

  function openEdit(yacht: Yacht) {
    setEditingYacht(yacht);
    setFormData({
      name: yacht.name,
      slug: yacht.slug,
      description: yacht.description,
      shortDescription: yacht.shortDescription || "",
      capacity: yacht.capacity,
      price: typeof yacht.price === "string" ? parseFloat(yacht.price) : yacht.price,
      categoryId: yacht.categoryId,
      location: yacht.location || "",
      featured: yacht.featured,
      isActive: yacht.isActive,
      images: yacht.images?.map((img) => ({ url: img.url, isPrimary: img.isPrimary })) || [],
    });
    setError("");
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = editingYacht
        ? `${API_URL}/admin/yachts`
        : `${API_URL}/admin/yachts`;
      const method = editingYacht ? "PUT" : "POST";
      const body = editingYacht ? { ...formData, id: editingYacht.id } : formData;

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to save yacht");
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      setError("Failed to save yacht. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this yacht?")) return;

    try {
      await fetch(`${API_URL}/admin/yachts?id=${id}`, {
        method: "DELETE",
        headers,
      });
      fetchData();
    } catch (err) {
      alert("Failed to delete yacht");
    }
  }

  function addImage() {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData({
        ...formData,
        images: [...formData.images, { url, isPrimary: formData.images.length === 0 }],
      });
    }
  }

  function removeImage(index: number) {
    const newImages = formData.images.filter((_, i) => i !== index);
    if (newImages.length > 0 && !newImages.some((img) => img.isPrimary)) {
      newImages[0].isPrimary = true;
    }
    setFormData({ ...formData, images: newImages });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yachts</h1>
          <p className="text-gray-500">Manage your yacht fleet</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Yacht
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : yachts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <Ship className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No yachts yet</h3>
          <p className="text-gray-500 mt-1">Get started by adding your first yacht.</p>
          <button onClick={openCreate} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Your First Yacht
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {yachts.map((yacht) => (
            <div key={yacht.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                {yacht.images?.[0] ? (
                  <img src={yacht.images[0].url} alt={yacht.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Image className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => openEdit(yacht)}
                    className="p-2 bg-white rounded-lg shadow hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(yacht.id)}
                    className="p-2 bg-white rounded-lg shadow hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                {yacht.featured && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-xs font-medium rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{yacht.name}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {yacht.category?.name || "Uncategorized"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{yacht.shortDescription}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-sm text-gray-500">₹{Number(yacht.price).toLocaleString()}</span>
                  <span className="text-sm text-gray-500">Max {yacht.capacity} guests</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold">
                {editingYacht ? "Edit Yacht" : "Add New Yacht"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Images</label>
                  <button type="button" onClick={addImage} className="text-sm text-blue-600 hover:underline">
                    + Add Image
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.images.map((img, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={img.url}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[i].url = e.target.value;
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg text-sm"
                        placeholder="Image URL"
                      />
                      <label className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={img.isPrimary}
                          onChange={(e) => {
                            const newImages = formData.images.map((img, j) => ({
                              ...img,
                              isPrimary: j === i,
                            }));
                            setFormData({ ...formData, images: newImages });
                          }}
                        />
                        Primary
                      </label>
                      <button type="button" onClick={() => removeImage(i)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
