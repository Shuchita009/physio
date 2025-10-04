import React from 'react';

const cards = [
  { id: 1, title: "🎓 Master's in Physiotherapy, Orthopedic, Sports and Manual Therapy", place: 'University of South Australia 2017', year: '2007' },
  { id: 3, title: "🎓 Certification in Ergonomics", place: 'United States of America 2019', year: '2019' }
];

export default function EducationList() {
  return (
    <section className="max-w-4xl mx-auto">
      <p> </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Education & Certifications</h2>
      <div className="space-y-4">
        {cards.map(card => (
          <div key={card.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">

            <div className="flex-1">
              <div className="font-semibold text-gray-800">{card.title}</div>
              <div className="text-sm text-gray-500 mt-1">{card.place}</div>
              {/* <div className="text-sm text-gray-400 mt-2">{card.year}</div> */}
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
