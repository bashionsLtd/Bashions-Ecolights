import React from 'react'

const Message = () => {
  return (
    <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let’s Talk</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Aliquam Vestibulum Mauris Eu Velit Imperdiet Venenatis. Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia Nostra, Per Inceptos Himenaeos. Sed Vestibulum Venenatis Sem Et Posuere.
          </p>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-full focus:outline-none focus:border-teal-400 placeholder:text-gray-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-full focus:outline-none focus:border-teal-400 placeholder:text-gray-500"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-full focus:outline-none focus:border-teal-400 placeholder:text-gray-500"
            />
            <textarea
              placeholder="Comment"
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-xl focus:outline-none focus:border-teal-400 placeholder:text-gray-500 h-24 resize-none"
            />
            {/* <label className="flex items-center text-sm text-gray-400 gap-2">
              <input type="checkbox" className="accent-teal-400" />
              Save my name, email, and website in this browser.
            </label> */}
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-300 text-white font-semibold px-8 py-2 rounded-full transition"
            >
              Send Message
            </button>
          </form>
        </div>
  )
}

export default Message