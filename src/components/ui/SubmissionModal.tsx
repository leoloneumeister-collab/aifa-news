"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
// In a real app we'd import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase/clientApp";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmissionModal({ isOpen, onClose }: SubmissionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "LLMs",
    content: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate Firebase Add Document
    try {
      /*
      await addDoc(collection(db, "articles"), {
        ...formData,
        trustScore: 85, // Default for user submissions till verified
        timestamp: new Date().toISOString(),
      });
      */
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({ title: "", category: "LLMs", content: "", imageUrl: "" });
      }, 2000);
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#0a0a0a]">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-black/50">
          <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase dark:text-white flex items-center">
            <span className="h-2 w-2 mr-2 bg-emerald-500 rounded-full inline-block"></span>
            Submit News
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors dark:hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {success ? (
          <div className="flex h-80 flex-col items-center justify-center p-6 text-center text-emerald-600 dark:text-emerald-400">
             <Send className="mb-4 h-12 w-12" />
             <p className="text-xl font-bold tracking-tight">News Submitted!</p>
             <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">Pending editorial review.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Headline</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-gray-800 dark:bg-black/50 dark:text-white" placeholder="Breaking AI News..." />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Desk / Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-gray-800 dark:bg-black/50 dark:text-white">
                  <option>LLMs</option>
                  <option>Robotics</option>
                  <option>Policy</option>
                  <option>Startups</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Briefing / Excerpt</label>
                <textarea required rows={4} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full resize-none border border-gray-200 bg-gray-50 p-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-gray-800 dark:bg-black/50 dark:text-white" placeholder="Provide a brief summary..."></textarea>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Source Image URL</label>
                <input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border border-gray-200 bg-gray-50 p-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-gray-800 dark:bg-black/50 dark:text-white" placeholder="https://..." />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button disabled={isSubmitting} type="submit" className="flex items-center gap-2 bg-emerald-600 px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all hover:bg-emerald-700 disabled:opacity-50 hover:shadow-lg hover:shadow-emerald-600/20">
                {isSubmitting ? "TRANSMITTING..." : "PUBLISH TO DESK"} <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
