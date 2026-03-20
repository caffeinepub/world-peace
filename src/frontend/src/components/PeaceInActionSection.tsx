const newsItems = [
  {
    title: "UN Security Council Passes Historic Ceasefire Resolution",
    summary:
      "The United Nations Security Council unanimously adopted a landmark resolution calling for an immediate and sustained ceasefire, marking a significant step toward ending one of the world's most protracted conflicts.",
    source: "https://www.un.org/en/peace",
    tag: "Diplomacy",
    date: "March 2026",
  },
  {
    title: "Youth Peace Summit Draws 10,000 Delegates from 120 Nations",
    summary:
      "Young peacebuilders from 120 countries gathered in Geneva to draft a global youth peace charter, pledging to address climate-driven conflicts and promote intercultural dialogue in their communities.",
    source: "https://www.unfoundation.org",
    tag: "Youth",
    date: "February 2026",
  },
  {
    title: "Nobel Peace Prize Ceremony Highlights Grassroots Movements",
    summary:
      "This year's Nobel Peace Prize ceremony in Oslo celebrated community-led peace organizations working to bridge divisions through education, art, and dialogue in conflict-affected regions.",
    source: "https://www.nobelprize.org/prizes/peace",
    tag: "Recognition",
    date: "December 2025",
  },
  {
    title: "Global Non-Violence Day: Cities Pledge Zero Conflict Zones",
    summary:
      "On International Day of Non-Violence, mayors from 50 cities signed the Urban Peace Compact, committing to reduce gang violence, invest in mental health, and create safe community spaces.",
    source: "https://www.un.org/en/observances/non-violence-day",
    tag: "Cities",
    date: "October 2025",
  },
  {
    title: "Women Mediators Network Brokers Peace Deal in Sahel Region",
    summary:
      "An all-women mediation team brokered a peace agreement between rival armed factions in West Africa's Sahel region, showcasing the critical role of women in sustainable peacebuilding efforts.",
    source: "https://www.unwomen.org",
    tag: "Women & Peace",
    date: "September 2025",
  },
];

const tagColors: Record<string, string> = {
  Diplomacy:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  Youth:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
  Recognition:
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
  Cities:
    "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
  "Women & Peace":
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700",
};

export function PeaceInActionSection() {
  return (
    <section id="peace-in-action" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-widest text-green-600 dark:text-green-400 uppercase mb-3">
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Peace in Action
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
            Real stories of peace happening right now — from the United Nations
            to your neighborhood.
          </p>
        </div>

        {/* News List */}
        <div className="flex flex-col gap-5">
          {newsItems.map((item) => (
            <article
              key={item.title}
              className="flex flex-col sm:flex-row sm:items-start gap-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-sm transition-shadow duration-200"
            >
              {/* Left: tag + content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-semibold border rounded-full px-2.5 py-0.5 ${
                      tagColors[item.tag] ??
                      "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Right: button */}
              <div className="flex-shrink-0 sm:self-center">
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-full px-5 py-2 transition-colors duration-200 whitespace-nowrap"
                >
                  Read More
                  <svg
                    aria-hidden="true"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
