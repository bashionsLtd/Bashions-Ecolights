import React from 'react';
import ContactInfo from '../../shared/contactInfo';
import Message from '../../shared/message';

const ContactSection: React.FC = () => {
  return (
    <section className="mt-22 bg-gradient-to-bl from-slate-700 via-slate-950 to-slate-800 text-white py-16 px-4">
      <div className="text-center mb-30">
        <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
          <span className="text-white uppercase before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-white after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-white">
            Contact US
          </span>
        </h2>
        <p className="text-gray-400 italic mt-2">You Can Find Us Here</p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start mb-12">
        {/* Left: Contact Form */}
        <Message />

        {/* Right: Map and Contact Info */}
        <div className="space-y-8">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=-1.69782,29.256276&hl=en&z=16&output=embed"
            width="100%"
            height="520"
            className="rounded-lg border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>


      </div>
      <ContactInfo />
    </section>
  );
};

export default ContactSection;
