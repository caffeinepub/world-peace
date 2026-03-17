import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSignupNewsletter, useSubmitContact } from "@/hooks/useQueries";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { toast } from "sonner";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [contactDone, setContactDone] = useState(false);

  const { mutateAsync: submitContact, isPending: submittingContact } =
    useSubmitContact();
  const { mutateAsync: signupNewsletter, isPending: signingUp } =
    useSignupNewsletter();

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      await submitContact({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setContactDone(true);
      toast.success("Message sent! We'll be in touch soon. 🕊️");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      await signupNewsletter({ email: newsletterEmail.trim() });
      setNewsletterDone(true);
      toast.success("You're subscribed! Welcome to the peace community. 🌍");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 section-ocean">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-peace-teal mb-4 px-3 py-1 bg-peace-teal/10 rounded-full">
            Contact &amp; Join Us
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Let&apos;s Build Peace{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Questions, partnerships, or just want to say hello? We&apos;d love
            to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>
            {contactDone ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-16 h-16 text-peace-green mx-auto mb-4" />
                <p className="text-white font-semibold text-lg">
                  Message Received!
                </p>
                <p className="text-white/60 text-sm mt-2">
                  We'll get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContact} className="space-y-4">
                <div>
                  <Label htmlFor="contact-name" className="text-white/80">
                    Full Name
                  </Label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-white/80">
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-message" className="text-white/80">
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    data-ocid="contact.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="mt-1.5 min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={submittingContact}
                  className="w-full bg-gradient-to-r from-peace-teal to-peace-green text-white border-0 font-semibold py-6"
                >
                  {submittingContact ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Message 🕊️"
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Newsletter */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Stay Informed
              </h3>
              <p className="text-white/60 text-sm mb-4">
                Join 250,000+ subscribers receiving our weekly peace digest —
                stories, initiatives, and actions from around the world.
              </p>
              {newsletterDone ? (
                <div className="flex items-center gap-2 text-peace-green">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    You're subscribed!
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <Input
                    type="email"
                    data-ocid="newsletter.input"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    data-ocid="newsletter.submit_button"
                    disabled={signingUp}
                    className="bg-peace-green text-white border-0 shrink-0"
                  >
                    {signingUp ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-xl font-bold text-white mb-4">
                Get in Touch
              </h3>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <Mail className="w-4 h-4 text-peace-teal shrink-0" />
                <span>contact@oneworld-peace.org</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-peace-teal shrink-0" />
                <span>+1 (800) PEACE-01</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-peace-teal shrink-0" />
                <span>New York, Geneva, Nairobi, Singapore</span>
              </div>
            </div>

            {/* Social */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-white mb-4">
                Follow Our Journey
              </h3>
              <div className="flex gap-3">
                {[
                  { icon: SiX, label: "X", href: "https://twitter.com" },
                  {
                    icon: SiFacebook,
                    label: "Facebook",
                    href: "https://facebook.com",
                  },
                  {
                    icon: SiInstagram,
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                  {
                    icon: SiLinkedin,
                    label: "LinkedIn",
                    href: "https://linkedin.com",
                  },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
