import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePeacePledges, useSubmitPledge } from "@/hooks/useQueries";
import {
  CheckCircle2,
  Facebook,
  Link2,
  Loader2,
  MessageCircle,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ShareButtons() {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(
    "I just signed the Global Peace Pledge! Join me in building a more peaceful world. 🕊️ #OnePeace #GlobalPeace",
  );

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        size="sm"
        className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white border-0 gap-2"
        asChild
      >
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="w-3.5 h-3.5" /> X / Twitter
        </a>
      </Button>
      <Button
        size="sm"
        className="bg-[#1877F2] hover:bg-[#1666d0] text-white border-0 gap-2"
        asChild
      >
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="w-3.5 h-3.5" /> Facebook
        </a>
      </Button>
      <Button
        size="sm"
        className="bg-[#25D366] hover:bg-[#20b858] text-white border-0 gap-2"
        asChild
      >
        <a
          href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
        </a>
      </Button>
      <Button size="sm" variant="outline" className="gap-2" onClick={copyLink}>
        <Link2 className="w-3.5 h-3.5" /> Copy Link
      </Button>
    </div>
  );
}

export function ActionSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [pledged, setPledged] = useState(false);
  const { mutateAsync: submitPledge, isPending } = useSubmitPledge();
  const { data: pledges } = usePeacePledges();
  const pledgeCount = pledges ? pledges.length : 1247;

  const handlePledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!message.trim()) {
      toast.error("Please write a peace message");
      return;
    }
    try {
      await submitPledge({ name: name.trim(), message: message.trim() });
      setPledged(true);
      toast.success("Your peace pledge has been recorded! 🕊️");
    } catch {
      toast.error("Failed to submit pledge. Please try again.");
    }
  };

  return (
    <section id="action" className="py-24 section-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full">
            Take Action
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Be the Change <span className="gradient-text">You Wish to See</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every pledge, every shared message, every act of solidarity matters.
            Together we create a movement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Pledge form */}
          <div className="rounded-2xl border border-border bg-card shadow-peace p-8">
            <h3 className="font-display text-2xl font-bold mb-2">
              Sign the Peace Pledge
            </h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-display font-bold gradient-text">
                {(pledgeCount + (pledged ? 1 : 0)).toLocaleString()}
              </span>
              <span className="text-muted-foreground text-sm">
                people have pledged their commitment to peace
              </span>
            </div>

            {pledged ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-16 h-16 text-peace-green mx-auto mb-4" />
                <h4 className="font-display text-xl font-bold mb-2">
                  Thank You, {name}!
                </h4>
                <p className="text-muted-foreground text-sm mb-6">
                  Your pledge has been added to the movement. Share it with the
                  world.
                </p>
                <ShareButtons />
              </div>
            ) : (
              <form onSubmit={handlePledge} className="space-y-4">
                <div>
                  <Label htmlFor="pledge-name">Your Name</Label>
                  <Input
                    id="pledge-name"
                    data-ocid="pledge.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pledge-message">Your Peace Message</Label>
                  <Textarea
                    id="pledge-message"
                    data-ocid="pledge.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share why peace matters to you..."
                    className="mt-1.5 min-h-[100px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="pledge.submit_button"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white border-0 py-6 text-base font-semibold rounded-xl"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                      Signing...
                    </>
                  ) : (
                    "✦ Sign the Peace Pledge"
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Share & campaigns */}
          <div className="space-y-6">
            {/* Share */}
            <div className="rounded-2xl border border-border bg-card shadow-peace p-6">
              <h3 className="font-display text-xl font-bold mb-2">
                Spread the Message
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Share the peace initiative with your network and help us reach
                more people across the globe.
              </p>
              <ShareButtons />
            </div>

            {/* Volunteer */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-accent/10 to-primary/5 p-6">
              <h3 className="font-display text-xl font-bold mb-2">Volunteer</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Join our global network of 50,000+ volunteers working on local
                and international peace projects. No experience needed — just a
                willing heart.
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                asChild
              >
                <a href="#contact">Apply to Volunteer →</a>
              </Button>
            </div>

            {/* Campaign */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/10 to-accent/5 p-6">
              <h3 className="font-display text-xl font-bold mb-2">
                #PeaceInAction Campaign
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Post a photo or video of an act of kindness, unity, or cultural
                exchange on social media with <strong>#PeaceInAction</strong>{" "}
                and inspire others.
              </p>
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
              >
                Learn More About the Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
