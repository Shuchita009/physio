import React from 'react';

const cards = [
  { id: 1, title: "🎓 Master's in Physiotherapy, Orthopedic, Sports and Manual Therapy", place: 'University of South Australia 2017', year: '2007' },
  { id: 3, title: "🎓 Certification in Ergonomics", place: 'United States of America 2019', year: '2019' }
];

export default function EducationList() {
  return (
    <section id="education" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Education & Certifications</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {cards.map(card => (
              <div key={card.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-800 mb-1">{card.title}</div>
                  <div className="text-sm text-gray-500">{card.place}</div>
                  <p></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
