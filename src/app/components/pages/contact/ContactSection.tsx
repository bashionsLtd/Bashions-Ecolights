'use client';

import React from 'react';
import ContactInfo from '../../shared/contactInfo';
import Message from '../../shared/message';

const ContactSection: React.FC = () => {
  return (
    <section className="mt-22 bg-gradient-to-bl from-[#000d1c] via-[#211f18] to-[#001515] text-white py-16 px-4">
      <div className="text-center mb-30">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide relative inline-block">
          <span className="text-white before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-white after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-white">
            Contacts
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">You Can Find Us Here</p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start mb-12">
        {/* Left: Contact Form */}
        <Message />

        {/* Right: Map and Contact Info */}
        <div className="space-y-8">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4803058625955!2d76.99908587505192!3d11.01784435406305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85854cefc43d9%3A0x8f5b8d55a5edfcf0!2sWeDesignTech!5e0!3m2!1sen!2sin!4v1719330881454!5m2!1sen!2sin"
            width="100%"
            height="500"
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
