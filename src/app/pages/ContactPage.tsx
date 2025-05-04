import React from 'react';

function ContactPage() {
  return (
    <section className="py-12 mt-14 w-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center  mb-4">Contact Us</h2>
        <p className="text-center mb-8">Get in touch with us. We are always here to help you.</p>
      </div>
      <div className="container mx-auto grid md:grid-cols-1 max-w-[800px] gap-8 px-6">
        <div className="bg-white dark:bg-slate-950 p-6 rounded-lg">
          <form action="https://formspree.io/f/xyyqadeb" method="POST" className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium">Name :</label>
              <input type="text" name="username" id="username" placeholder="Enter your name"
                autoComplete="off" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none capitalize" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">Email :</label>
              <input type="email" name="email" id="email" placeholder="Enter your email"
                autoComplete="off" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium">Subject :</label>
              <input type="text" name="subject" id="subject" placeholder="Your message title"
                autoComplete="off" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium">Message:</label>
              <textarea name="message" id="message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition">Send message</button>
            </div>
          </form>
        </div>
        {/* <div className="rounded-lg overflow-hidden shadow-md">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58320.839869331496!2d85.32409319159922!3d23.993923413259726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f49c114f26548f%3A0xbd45e868bb61961f!2sHazaribagh%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700206998381!5m2!1sen!2sin" 
            width="100%" height="400px" style={{ border: 0 }} allowFullScreen loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div> */}
      </div>
    </section>
  );
}

export default ContactPage;
