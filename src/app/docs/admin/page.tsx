"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DocsState } from "@/lib/docs-state";
import {
  Save,
  ArrowLeft,
  Settings2,
  Eye,
  EyeOff,
  Calendar,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2
} from "lucide-react";

export default function DocsAdminPage() {
  const router = useRouter();
  const [state, setState] = useState<DocsState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/docs/state?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        // Format dates for datetime-local input (YYYY-MM-DDThh:mm)
        if (data.scheduleStart) data.scheduleStart = data.scheduleStart.substring(0, 16);
        if (data.scheduleEnd) data.scheduleEnd = data.scheduleEnd.substring(0, 16);
        setState(data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!state) return;
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/docs/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          // Ensure they are sent as full ISO strings
          scheduleStart: state.scheduleStart ? new Date(state.scheduleStart).toISOString() : new Date().toISOString(),
          scheduleEnd: state.scheduleEnd ? new Date(state.scheduleEnd).toISOString() : new Date(Date.now() + 365*24*60*60*1000).toISOString()
        }),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          router.push("/docs");
        }, 1500);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMessage(errorData.error || "Failed to save changes. Make sure Supabase is configured correctly.");
      }
    } catch (error: any) {
      console.error("Failed to save:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const addTeamMember = () => {
    if (!state) return;
    setState({
      ...state,
      team: [...state.team, { name: "", role: "", bio: "" }],
    });
  };

  const removeTeamMember = (index: number) => {
    if (!state) return;
    const newTeam = [...state.team];
    newTeam.splice(index, 1);
    setState({ ...state, team: newTeam });
  };

  const updateTeamMember = (index: number, field: keyof DocsState["team"][0], value: string) => {
    if (!state) return;
    const newTeam = [...state.team];
    newTeam[index][field] = value;
    setState({ ...state, team: newTeam });
  };

  if (isLoading || !state) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans pb-24">
      {/* Header */}
      <header className="border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/docs" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors border border-slate-800/80">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-indigo-400" />
              <span className="text-xl font-bold text-white">Docs Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {saveSuccess && (
              <span className="text-sm text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Saved Successfully
              </span>
            )}
            {errorMessage && (
              <span className="text-sm text-red-400 font-medium max-w-md truncate" title={errorMessage}>
                {errorMessage}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 border border-indigo-400/20 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Publish Changes
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        
        {/* Section 1: Access Controls */}
        <section className="bg-slate-950/50 rounded-2xl border border-slate-800/50 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800/80">
            <ShieldIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Access & Visibility Controls</h2>
          </div>

          <div className="max-w-md">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                Public Visibility
              </label>
              <button
                onClick={() => setState({ ...state, visibility: !state.visibility })}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  state.visibility 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  {state.visibility ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  <span className="font-semibold">{state.visibility ? "Live & Public" : "Private / Locked"}</span>
                </div>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${state.visibility ? "bg-emerald-500" : "bg-red-500"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${state.visibility ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Pitch Deck */}
        <section className="bg-slate-950/50 rounded-2xl border border-slate-800/50 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800/80">
            <PresentationIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Pitch Deck Content</h2>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-300">The Problem</label>
            <textarea
              value={state.pitchDeck.problem}
              onChange={(e) => setState({
                ...state,
                pitchDeck: { ...state.pitchDeck, problem: e.target.value }
              })}
              className="w-full h-24 bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-300">The Solution</label>
            <textarea
              value={state.pitchDeck.solution}
              onChange={(e) => setState({
                ...state,
                pitchDeck: { ...state.pitchDeck, solution: e.target.value }
              })}
              className="w-full h-24 bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </section>

        {/* Section 3: Technical Docs */}
        <section className="bg-slate-950/50 rounded-2xl border border-slate-800/50 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800/80">
            <CodeIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Technical Architecture</h2>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-300">Agentic Swarms</label>
            <textarea
              value={state.technicalArchitecture.agents}
              onChange={(e) => setState({
                ...state,
                technicalArchitecture: { ...state.technicalArchitecture, agents: e.target.value }
              })}
              className="w-full h-24 bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-300">Contextual RAG</label>
            <textarea
              value={state.technicalArchitecture.rag}
              onChange={(e) => setState({
                ...state,
                technicalArchitecture: { ...state.technicalArchitecture, rag: e.target.value }
              })}
              className="w-full h-24 bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </section>

        {/* Section 4: Team Showcase */}
        <section className="bg-slate-950/50 rounded-2xl border border-slate-800/50 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Team Showcase</h2>
            </div>
            <button
              onClick={addTeamMember}
              className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-500/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Member
            </button>
          </div>

          <div className="space-y-4">
            {state.team.map((member, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl relative group">
                <button
                  onClick={() => removeTeamMember(idx)}
                  className="absolute top-4 right-4 p-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4 pr-12">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateTeamMember(idx, "name", e.target.value)}
                      className="w-full bg-[#030712] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Role</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => updateTeamMember(idx, "role", e.target.value)}
                      className="w-full bg-[#030712] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Bio</label>
                  <input
                    type="text"
                    value={member.bio}
                    onChange={(e) => updateTeamMember(idx, "bio", e.target.value)}
                    className="w-full bg-[#030712] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
            {state.team.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-500 border border-dashed border-slate-800 rounded-xl">
                No team members added yet.
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

// Icon Components
function ShieldIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
}

function PresentationIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>;
}

function CodeIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
}

function UsersIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
