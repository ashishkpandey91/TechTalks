const About = () => {
  return (
    <>
      <head>
        <title>About Us | TechTalks</title>
        <meta
          name="description"
          content="Learn more about our blog and our mission."
        />
      </head>

      <main className="max-w-4xl mx-auto p-6 dark:text-white text-black py-20 md:py-28">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6">
          Welcome to{" "}
          <span className="text-blue-400 font-semibold">TechTalks</span>! Our
          mission is to share insightful articles, tutorials, and resources to
          help developers stay updated with the latest trends in technology.
        </p>

        <section className="bg-gray-900 p-6 rounded-xl shadow-lg ">
          <h2 className="text-2xl font-semibold mb-3 text-gray-300">
            Why We Started
          </h2>
          <p className="text-gray-300 ">
            We started this blog to create a space where developers can learn,
            grow, and share their knowledge. Whether you're a beginner or an
            expert, we have something for everyone.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
          <ul className="list-disc pl-5 dark:text-gray-300 ">
            <li>In-depth technical articles</li>
            <li>Step-by-step tutorials</li>
            <li>Latest updates in web development</li>
            <li>Community discussions and insights</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Join Us</h2>
          <p className="text-gray-300">
            Stay connected and never miss an update! Follow us on our journey
            and be part of our growing community.
          </p>
        </section>
      </main>
    </>
  );
};

export default About;
