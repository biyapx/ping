import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
    console.log("Users fetched successfully:", users);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { myId: myId, receiverId: userToChatId },
        { myId: userToChatId, receiverId: myId },
      ],
    });

    if (!messages) {
      return res.status(404).json({ message: "No messages found" });
    }
    res.status(200).json(messages);
    console.log("Messages fetched successfully:", messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
