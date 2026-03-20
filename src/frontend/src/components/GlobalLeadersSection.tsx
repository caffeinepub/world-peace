const leaders = [
  {
    name: "Malala Yousafzai",
    country: "Pakistan",
    photo: "/assets/generated/leader-malala.dim_300x300.jpg",
    awards: [
      "Nobel Peace Prize (2014)",
      "Sakharov Prize",
      "UN Messenger of Peace",
    ],
    impact:
      "The youngest Nobel laureate, Malala defied Taliban threats to champion girls' education worldwide and founded the Malala Fund, giving millions of girls access to schooling.",
  },
  {
    name: "Nelson Mandela",
    country: "South Africa",
    photo: "/assets/generated/leader-mandela.dim_300x300.jpg",
    awards: [
      "Nobel Peace Prize (1993)",
      "Presidential Medal of Freedom",
      "Bharat Ratna",
    ],
    impact:
      "After 27 years of imprisonment, Mandela led South Africa's peaceful transition from apartheid to democracy, becoming a global symbol of reconciliation and justice.",
  },
  {
    name: "Leymah Gbowee",
    country: "Liberia",
    photo: "/assets/generated/leader-leymah.dim_300x300.jpg",
    awards: [
      "Nobel Peace Prize (2011)",
      "John F. Kennedy Profile in Courage Award",
    ],
    impact:
      "Gbowee mobilized thousands of women across religious divides to peacefully end the Second Liberian Civil War, proving that grassroots women-led movements can stop armed conflict.",
  },
  {
    name: "Aung San Suu Kyi",
    country: "Myanmar",
    photo: "/assets/generated/leader-aungsansuu.dim_300x300.jpg",
    awards: [
      "Nobel Peace Prize (1991)",
      "Sakharov Prize",
      "Presidential Medal of Freedom",
    ],
    impact:
      "Spent over 15 years under house arrest as the face of Myanmar's non-violent pro-democracy movement, inspiring millions to resist authoritarian rule through peaceful civil disobedience.",
  },
];

export function GlobalLeadersSection() {
  return (
    <section
      id="leaders"
      className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">
            Voices of Peace
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Global Peace Leaders
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
            Courageous individuals whose lives have been devoted to building a
            more peaceful, just world.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              {/* Photo */}
              <div className="w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    {leader.country}
                  </p>
                </div>

                {/* Awards */}
                <div className="flex flex-wrap gap-1.5">
                  {leader.awards.map((award) => (
                    <span
                      key={award}
                      className="text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 rounded-full px-2.5 py-0.5"
                    >
                      {award}
                    </span>
                  ))}
                </div>

                {/* Impact */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                  {leader.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
