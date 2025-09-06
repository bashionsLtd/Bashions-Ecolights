'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiChevronDown } from 'react-icons/fi'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How do I place an order?',
    answer:
      'Browse our products, add items to your cart, and proceed to checkout. You’ll be guided through the payment and shipping steps.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept major credit/debit cards, PayPal, and mobile money depending on your region.',
  },
  {
    question: 'Can I return or exchange a product?',
    answer:
      'Yes. You can return or exchange items within 30 days of delivery. Please ensure products are unused and in original packaging.',
  },
  {
    question: 'Is online shopping safe on your site?',
    answer:
      'Absolutely. We use end-to-end SSL encryption and never store sensitive payment details.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order is shipped, we’ll send you a tracking number via email or SMS.',
  },
  {
    question: 'Can I return or exchange a product?',
    answer:
      'Yes. You can return or exchange items within 30 days of delivery. Please ensure products are unused and in original packaging.',
  },
  {
    question: 'Is online shopping safe on your site?',
    answer:
      'Absolutely. We use end-to-end SSL encryption and never store sensitive payment details.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order is shipped, we’ll send you a tracking number via email or SMS.',
  },
]

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full px-6 md:px-12 py-20 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
          <span className="before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-black after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-black">
            FAQ
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">Below are some of are common questions about orders</p>
      </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Image */}
        <div className="relative rounded-xl w-full h-72 sm:h-96 md:h-[500px] lg:h-[750px] hidden lg:block">
          <Image
            src="/images/dream.jpeg" // Replace with your image path
            alt="Tattoo machine"
            fill
            className="object-cover rounded-md"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-900 font-medium hover:bg-gray-100 focus:outline-none transition"
              >
                <span>{faq.question}</span>
                <FiChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`px-6 pb-4 text-gray-700 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
    </section>
  )
}

export default FaqSection
