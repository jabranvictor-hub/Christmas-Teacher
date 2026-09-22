import React, { useState } from 'react';
import { ChristmasEvent } from '../types';
import { PartyPopper, Calendar, MapPin, Users, Lock, Sparkles, Clock, Trees, CheckCircle2 } from 'lucide-react';

interface EventsViewProps {
  events: ChristmasEvent[];
}

export const EventsView: React.FC<EventsViewProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<ChristmasEvent | null>(events[0] || null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <PartyPopper className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>🎉</span>
              <span>Christmas & Holiday Events</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            School activities for <span className="text-emerald-400 font-semibold">Christmas 2026 & New Year 2027</span>
          </p>
        </div>

        {/* Read-Only Restriction Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
          <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Principal-Managed Events (Teacher View Only)</span>
        </div>
      </div>

      {/* Grid: Events List on Left, Detailed Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Events Cards */}
        <div className="lg:col-span-2 space-y-3">
          {events.map((event) => {
            const isSelected = selectedEvent?.id === event.id;
            return (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-md ${
                  isSelected
                    ? 'bg-linear-to-r from-red-950/60 via-slate-900 to-emerald-950/60 border-emerald-400 ring-1 ring-emerald-500/40'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shrink-0">
                      {event.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-white">{event.title}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5 text-amber-400" />
                          <span>Principal Event</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">{event.description}</p>

                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-2.5 flex-wrap">
                        <span className="flex items-center gap-1 font-semibold text-emerald-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{event.date}</span>
                        </span>
                        <span className="flex items-center gap-1 font-mono text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{event.time}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className="shrink-0 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Event Inspector */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          {selectedEvent ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{selectedEvent.icon}</span>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedEvent.title}</h3>
                    <p className="text-xs text-emerald-400">Victor's Christmas School</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Event Overview
                  </span>
                  <p className="text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Date & Time</p>
                      <p className="text-slate-300 font-mono text-[11px]">{selectedEvent.date} • {selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Venue Location</p>
                      <p className="text-slate-300 text-[11px]">{selectedEvent.venue}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Target Attendees</p>
                      <p className="text-slate-300 text-[11px]">{selectedEvent.targetAudience}</p>
                    </div>
                  </div>
                </div>

                {/* Teacher role note */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-emerald-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Teacher Role & Coordinator</span>
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Lead: <strong>{selectedEvent.coordinator}</strong>. Teacher Aroush is responsible for student attendance, supervision, and greeting parents.
                  </p>
                </div>

                {/* Deletion lock notice */}
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/20 text-[11px] text-slate-400 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Created by Principal Victor. As a Teacher, Aroush can view details and take attendance, but cannot delete or cancel this event.
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-400">Select an event to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};
