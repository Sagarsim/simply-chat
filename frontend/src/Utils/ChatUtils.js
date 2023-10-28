export const getSender = (loggedUser, chatUsers) => {
  return chatUsers[0]._id === loggedUser._id
    ? chatUsers[1].name
    : chatUsers[0].name;
};
