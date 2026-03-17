import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";

actor {
  // Types
  type PeaceStory = {
    id : Nat;
    title : Text;
    summary : Text;
    region : Text;
    author : Text;
    imageHint : Text;
  };

  type WorldInitiative = {
    id : Nat;
    country : Text;
    title : Text;
    description : Text;
    latitude : Float;
    longitude : Float;
  };

  type Resource = {
    id : Nat;
    title : Text;
    typ : Text;
    description : Text;
    url : Text;
  };

  type CommunityMessage = {
    author : Text;
    message : Text;
    timestamp : Int;
  };

  type PeacePledge = {
    name : Text;
    message : Text;
  };

  type ContactSignup = {
    name : Text;
    email : Text;
    message : Text;
  };

  // Seed Data
  let peaceStories = [
    {
      id = 1;
      title = "Seeds of Peace";
      summary = "Children from conflict regions unite at a summer camp.";
      region = "Middle East";
      author = "Peace Initiative";
      imageHint = "Children holding hands";
    },
    {
      id = 2;
      title = "Women for Peace";
      summary = "Women lead protests to end civil war in Liberia.";
      region = "Africa";
      author = "Leymah Gbowee";
      imageHint = "Women in white outfits";
    },
    {
      id = 3;
      title = "Hand of Friendship";
      summary = "India and Pakistan artists collaborate on mural.";
      region = "Asia";
      author = "Art Collective";
      imageHint = "Colorful mural";
    },
    {
      id = 4;
      title = "Bridging Borders";
      summary = "Students in US and Mexico build technology projects together.";
      region = "Americas";
      author = "Tech for Peace";
      imageHint = "Students collaborating";
    },
    {
      id = 5;
      title = "Music Across Borders";
      summary = "Classical musicians from North and South Korea perform together.";
      region = "Asia";
      author = "Harmony Orchestra";
      imageHint = "Musicians performing";
    },
    {
      id = 6;
      title = "Sports for Unity";
      summary = "Joint football tournament between Bosnia, Croatia, and Serbia.";
      region = "Europe";
      author = "SportUnity League";
      imageHint = "Football teams";
    },
  ];

  let worldInitiatives = [
    {
      id = 1;
      country = "Norway";
      title = "Oslo Peace Accords";
      description = "Negotiation talks supported by Norwegian government.";
      latitude = 59.9139;
      longitude = 10.7522;
    },
    {
      id = 2;
      country = "Rwanda";
      title = "Gacaca Courts";
      description = "Community justice system post-genocide.";
      latitude = -1.9403;
      longitude = 29.8739;
    },
    {
      id = 3;
      country = "Philippines";
      title = "Bangsamoro Peace";
      description = "Autonomous government formation.";
      latitude = 13.1438;
      longitude = 123.7464;
    },
    {
      id = 4;
      country = "Ireland";
      title = "Good Friday Agreement";
      description = "Northern Ireland peace treaty.";
      latitude = 53.1424;
      longitude = -7.6921;
    },
    {
      id = 5;
      country = "South Africa";
      title = "Truth and Reconciliation";
      description = "Post-apartheid justice hearings.";
      latitude = -30.5595;
      longitude = 22.9375;
    },
    {
      id = 6;
      country = "Colombia";
      title = "FARC Peace Talks";
      description = "Demobilization of armed group.";
      latitude = 4.5709;
      longitude = -74.2973;
    },
    {
      id = 7;
      country = "Israel/Palestine";
      title = "Geneva Initiative";
      description = "Framework for peace agreement.";
      latitude = 31.0461;
      longitude = 34.8516;
    },
    {
      id = 8;
      country = "Nepal";
      title = "Comprehensive Peace Accord";
      description = "Integration of Maoist fighters.";
      latitude = 28.3949;
      longitude = 84.1240;
    },
  ];

  let resources = [
    {
      id = 1;
      title = "The Moral Imagination";
      typ = "Book";
      description = "Book on peacebuilding by John Paul Lederach.";
      url = "https://amzn.to/3jK3Q3m";
    },
    {
      id = 2;
      title = "Peace is Every Step";
      typ = "Book";
      description = "Mindfulness and peace.";
      url = "https://amzn.to/3AHyaXV";
    },
    {
      id = 3;
      title = "Ted Talk: Reconciliation";
      typ = "Video";
      description = "Power of forgiveness after conflict.";
      url = "https://ted.com/talks/peace_reconciliation";
    },
    {
      id = 4;
      title = "Practitioner’s Guide to Peacebuilding";
      typ = "Article";
      description = "Care International report.";
      url = "https://care.org/peacebuilding.pdf";
    },
    {
      id = 5;
      title = "World Beyond War Toolkit";
      typ = "Website";
      description = "Resources for activists.";
      url = "https://worldbeyondwar.org/toolkit";
    },
    {
      id = 6;
      title = "Peacemakers Podcast";
      typ = "Podcast";
      description = "Interviews with peacebuilders.";
      url = "https://peacemakerspodcast.com";
    },
    {
      id = 7;
      title = "Rethinking Global Peace";
      typ = "Article";
      description = "Journal of Conflict Resolution.";
      url = "https://journals.sagepub.com/gpjournal";
    },
    {
      id = 8;
      title = "Pathways to Peace";
      typ = "Book";
      description = "Strategies for community action.";
      url = "https://amzn.to/3sss4Pe";
    },
    {
      id = 9;
      title = "Peacebuilding Fundamentals";
      typ = "Course";
      description = "Global Learning Platform course.";
      url = "https://glearning.org/peacebuilding";
    },
  ];

  let newsletterSignups = List.empty<Text>();
  let communityMessages = List.empty<CommunityMessage>();
  let peacePledges = List.empty<PeacePledge>();
  let contactSignups = List.empty<ContactSignup>();

  let communityMessagesMap = Map.empty<Int, CommunityMessage>();
  var nextCommunityMessageId = 0;

  public shared ({ caller }) func submitPeacePledge(name : Text, message : Text) : async () {
    peacePledges.add({
      name;
      message;
    });
  };

  public shared ({ caller }) func postCommunityMessage(author : Text, message : Text) : async () {
    let newMessage = {
      author;
      message;
      timestamp = Time.now();
    };

    // Add new message with incremental ID
    communityMessagesMap.add(nextCommunityMessageId, newMessage);
    nextCommunityMessageId += 1;

    maintainMessageLimit();
  };

  func maintainMessageLimit() {
    if (communityMessagesMap.size() > 50) {
      // Find the message with the smallest ID (oldest message) using foldLeft
      let idsArray = communityMessagesMap.keys().toArray();
      if (idsArray.size() > 0) {
        let minId = idsArray.foldLeft(idsArray[0], func(min, x) { if (x < min) { x } else { min } });
        ignore communityMessagesMap.remove(minId);
      };
    };
  };

  public shared ({ caller }) func signupNewsletter(email : Text) : async () {
    newsletterSignups.add(email);
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    contactSignups.add({
      name;
      email;
      message;
    });
  };

  module CommunityMessage {
    public func compare(a : (Int, CommunityMessage), b : (Int, CommunityMessage)) : Order.Order {
      Int.compare(b.1.timestamp, a.1.timestamp);
    };
  };

  public query ({ caller }) func getRecentCommunityMessages() : async [CommunityMessage] {
    let sortedMessages = communityMessagesMap.toArray().sort();

    let messagesArray = sortedMessages.map(
      func(pair) { pair.1 }
    );

    let arraySize = messagesArray.size();
    let takeSize = if (arraySize < 50) { arraySize } else { 50 };

    messagesArray.sliceToArray(0, takeSize);
  };

  public query ({ caller }) func getPeacePledges() : async [PeacePledge] {
    peacePledges.toArray();
  };

  public query ({ caller }) func getContactSignups() : async [ContactSignup] {
    contactSignups.toArray();
  };

  public query ({ caller }) func getNewsletterSignups() : async [Text] {
    newsletterSignups.toArray();
  };

  public query ({ caller }) func getPeaceStories() : async [PeaceStory] {
    peaceStories;
  };

  public query ({ caller }) func getWorldInitiatives() : async [WorldInitiative] {
    worldInitiatives;
  };

  public query ({ caller }) func getResources() : async [Resource] {
    resources;
  };
};
