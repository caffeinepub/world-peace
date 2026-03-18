import Text "mo:core/Text";
import Map "mo:core/Map";
import Time "mo:core/Time";



actor {
  type Message = {
    id : Nat;
    name : Text;
    country : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let messages = Map.empty<Nat, Message>();
  var nextId = 0;

  public shared ({ caller }) func submitMessage(name : Text, country : Text, messageText : Text) : async Nat {
    let id = nextId;
    let newMessage : Message = {
      id;
      name;
      country;
      message = messageText;
      timestamp = Time.now();
    };
    messages.add(id, newMessage);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.values().toArray();
  };
};
