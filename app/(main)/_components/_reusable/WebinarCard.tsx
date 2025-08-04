// src/components/webinar-card.tsx
import React from 'react';

export interface Webinar {
  id: string;
  title: string;
  subtitle: string;
  date: string; // human-readable
  duration: string;
  imageUrl: string;
}

export function WebinarCard({ webinar }: { webinar: Webinar }) {
  return (
    <div className="w-full rounded-lg shadow-md overflow-hidden bg-white">
      <div className="h-40 bg-[#eef0ff] flex items-center justify-center">
        <img
          src={webinar.imageUrl}
          alt="webinar"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{webinar.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{webinar.subtitle}</p>
        <div className="flex flex-wrap gap-6 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#f0f4ff] rounded-md">
              <span role="img" aria-label="calendar">
                📅
              </span>
            </div>
            <div>
              <div className="font-medium">Date</div>
              <div className="text-gray-600">{webinar.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#f0f4ff] rounded-md">
              <span role="img" aria-label="clock">
                ⏱️
              </span>
            </div>
            <div>
              <div className="font-medium">Duration</div>
              <div className="text-gray-600">{webinar.duration}</div>
            </div>
          </div>
        </div>
        <button className="w-full py-2 rounded-md bg-primary text-white font-medium hover:brightness-105 transition">
          Join the event
        </button>
      </div>
    </div>
  );
}
