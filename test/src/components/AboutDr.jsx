import React from 'react';

const AboutDr = () => {
  return (
    <section id="about-dr" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          About Dr. Siddharth
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-lg">
              <p className="mb-4">
                Dr. Siddharth is a highly qualified and experienced physiotherapist dedicated 
                to helping patients achieve optimal physical health and well-being.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Experience & Expertise</h3>
              <p className="mb-4">
                With over several years of clinical experience, Dr. Siddharth has successfully 
                treated numerous patients with various conditions, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Sports injuries and rehabilitation</li>
                <li>Musculoskeletal disorders</li>
                <li>Post-surgical rehabilitation</li>
                <li>Chronic pain management</li>
                <li>Neurological conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDr;