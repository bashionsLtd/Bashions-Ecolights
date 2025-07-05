'use client';

import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaUsers } from 'react-icons/fa';

type ContactItem = {
  icon: React.ReactNode;
  title: string;
  lines: string[];
};

const contactInfo: ContactItem[] = [
  {
    icon: <FaMapMarkerAlt className="text-2xl text-orange-500" />,
    title: 'Office location',
    lines: ['16122 collins street,', 'Melbourne, Australia'],
  },
  {
    icon: <FaEnvelope className="text-2xl text-orange-500" />,
    title: 'Send a message',
    lines: ['info@yourdomain.com', 'sales@yourdomain.com'],
  },
  {
    icon: <FaPhoneAlt className="text-xl text-orange-500" />,
    title: 'Call us directly',
    lines: ['1-800–222–000', '1-800–222–002'],
  },
  {
    icon: <FaUsers className="text-2xl text-orange-500" />,
    title: 'Find us on social media',
    lines: ['hire@yourdomain.com', 'hr@yourdomain.com'],
  },
];

const ContactInfo: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((item, index) => (
          <div key={index} className='bg-gray-200 p-2 rounded-md'>
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <h3 className="font-semibold text-lg text-[#1c2a4d]">{item.title}</h3>
            </div>
            <div className="w-30 h-[2px] bg-[#1c2a4d] mb-3" />
            <div className="text-gray-500 text-sm space-y-1">
              {item.lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
  );
};

export default ContactInfo;
