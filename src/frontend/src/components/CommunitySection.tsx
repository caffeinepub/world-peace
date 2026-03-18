import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Bird,
  Globe,
  Loader2,
  MessageSquare,
  RefreshCw,
  Send,
} from "lucide-react";
import { useState } from "react";
import type { Message } from "../backend.d";
import { useAllMessages, useSubmitMessage } from "../hooks/useQueries";

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function formatTimestamp(ts: bigint): string {
  const date = new Date(Number(ts / 1_000_000n));
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageCard({ msg, index }: { msg: Message; index: number }) {
  return (
    <div
      data-ocid={`community_wall.item.${index}`}
      className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400/30 to-teal-400/30 border border-white/20 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-white/80">
              {msg.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm leading-tight">
              {msg.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Globe className="w-3 h-3 text-sky-300/70" />
              <span className="text-xs text-sky-300/70">{msg.country}</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-white/30 whitespace-nowrap shrink-0">
          {formatTimestamp(msg.timestamp)}
        </span>
      </div>
      <p className="text-white/75 text-sm leading-relaxed pl-11">
        {msg.message}
      </p>
    </div>
  );
}

export function CommunitySection() {
  const {
    data: messages,
    isLoading,
    isFetching,
    dataUpdatedAt,
  } = useAllMessages();
  const submitMutation = useSubmitMessage();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    country?: string;
    message?: string;
  }>({});

  const sorted = messages
    ? [...messages].sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1))
    : [];

  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!country) e.country = "Please select your country.";
    if (!message.trim()) e.message = "Message is required.";
    else if (message.trim().length > 200)
      e.message = "Message must be 200 characters or fewer.";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    await submitMutation.mutateAsync({
      name: name.trim(),
      country,
      messageText: message.trim(),
    });
    setName("");
    setCountry("");
    setMessage("");
  }

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <section
      id="community"
      className="py-24 section-ocean relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-teal-400/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/3 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-sky-300 mb-4 px-3 py-1 bg-sky-400/10 rounded-full border border-sky-400/20">
            <MessageSquare className="w-3 h-3" />
            Community Wall
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Voices of <span className="gradient-text">Peace</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Share a message of hope, unity, or kindness. Your words become part
            of a growing chorus for a more peaceful world.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          {/* Submission form */}
          <div className="glass-card rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-6">
              <Bird className="w-5 h-5 text-teal-300" />
              <h3 className="font-display text-lg font-semibold text-white">
                Share Your Message
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="wall-name"
                  className="text-white/70 text-xs font-medium uppercase tracking-wider"
                >
                  Your Name
                </Label>
                <Input
                  id="wall-name"
                  data-ocid="community_wall.name_input"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-sky-400/50 focus:ring-sky-400/20"
                />
                {errors.name && (
                  <p
                    data-ocid="community_wall.error_state"
                    className="text-red-400 text-xs"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="wall-country"
                  className="text-white/70 text-xs font-medium uppercase tracking-wider"
                >
                  Country
                </Label>
                <select
                  id="wall-country"
                  data-ocid="community_wall.country_input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-sky-400/50 focus:outline-none focus:ring-1 focus:ring-sky-400/20 appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" className="bg-slate-900 text-white/50">
                    Select your country…
                  </option>
                  {COUNTRIES.map((c) => (
                    <option
                      key={c}
                      value={c}
                      className="bg-slate-900 text-white"
                    >
                      {c}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-400 text-xs">{errors.country}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="wall-message"
                  className="text-white/70 text-xs font-medium uppercase tracking-wider"
                >
                  Peace Message
                </Label>
                <Textarea
                  id="wall-message"
                  data-ocid="community_wall.message_textarea"
                  placeholder="Write a message of peace, hope, or unity…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  maxLength={200}
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-sky-400/50 focus:ring-sky-400/20 resize-none"
                />
                <div className="flex justify-between items-center">
                  {errors.message ? (
                    <p className="text-red-400 text-xs">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span
                    className={`text-xs tabular-nums ${
                      message.length > 180 ? "text-amber-400" : "text-white/30"
                    }`}
                  >
                    {message.length}/200
                  </span>
                </div>
              </div>

              {submitMutation.isError && (
                <p
                  data-ocid="community_wall.error_state"
                  className="text-red-400 text-xs text-center"
                >
                  Something went wrong. Please try again.
                </p>
              )}

              {submitMutation.isSuccess && (
                <p
                  data-ocid="community_wall.success_state"
                  className="text-teal-300 text-xs text-center"
                >
                  ✓ Your message has been shared with the world!
                </p>
              )}

              <Button
                type="submit"
                data-ocid="community_wall.submit_button"
                disabled={submitMutation.isPending}
                className="w-full mt-1 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-semibold border-0 rounded-xl py-5 transition-all duration-300"
              >
                {submitMutation.isPending ? (
                  <span
                    data-ocid="community_wall.loading_state"
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sharing…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Share Your Peace Message
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Message cards */}
          <div className="flex flex-col gap-4">
            {/* Live refresh indicator */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-white/30">
                {sorted.length > 0
                  ? `${sorted.length} message${sorted.length !== 1 ? "s" : ""}`
                  : ""}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-teal-300/60">
                <RefreshCw
                  className={`w-3 h-3 ${isFetching ? "animate-spin" : ""}`}
                />
                {lastUpdated ? `Updated ${lastUpdated}` : "Auto-refreshing"}
              </span>
            </div>

            {isLoading && (
              <div
                data-ocid="community_wall.loading_state"
                className="flex flex-col gap-3"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="glass-card rounded-2xl p-5 animate-pulse"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-full bg-white/10" />
                      <div className="flex flex-col gap-1.5">
                        <div className="h-3 w-24 bg-white/10 rounded" />
                        <div className="h-2.5 w-16 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="h-3 bg-white/10 rounded w-full ml-11" />
                    <div className="h-3 bg-white/10 rounded w-4/5 ml-11 mt-1.5" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && sorted.length === 0 && (
              <div
                data-ocid="community_wall.empty_state"
                className="glass-card rounded-2xl p-10 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-sky-400/10 border border-sky-400/20 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-sky-300/50" />
                </div>
                <p className="text-white/40 text-sm">
                  No messages yet. Be the first to share a peace message with
                  the world!
                </p>
              </div>
            )}

            {!isLoading && sorted.length > 0 && (
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                {sorted.map((msg, i) => (
                  <MessageCard key={String(msg.id)} msg={msg} index={i + 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
