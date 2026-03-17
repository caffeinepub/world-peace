export function AuthorSection() {
  return (
    <section
      id="author"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      data-ocid="author.section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            About the Author
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-3 rounded-full" />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden ring-4 ring-blue-200 dark:ring-blue-700 shadow-lg">
              <img
                src="/assets/uploads/IMG_20260317_111256_792-1.jpg"
                alt="Srishty Singh Bhardwaj - Author"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-1">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                Creator &amp; Author
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">
              Srishty Singh Bhardwaj
            </h3>
            <p className="text-blue-500 dark:text-blue-400 font-medium mb-4">
              Age 16
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
              Srishty Singh Bhardwaj is a 16-year-old student and the creator of
              this Global Peace website. She believes that young people can play
              an important role in building a more peaceful and united world.
              She is passionate about learning, creativity, and exploring new
              ideas. Srishty Singh Bhardwaj describes herself as a multitalented
              and multitasking individual who enjoys working on meaningful
              projects that inspire positivity, unity, and global understanding.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
              {["Peace Advocate", "Student", "Creator", "Global Thinker"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
