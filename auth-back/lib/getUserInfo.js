function getUserInfo(user) {
  return {
    username: user.username,
    name: user.name,
    id: user.id || user._id,
    email: user.email, // Agregar la propiedad email
    avatarURL: user.avatarURL, // Agregar la propiedad avatarURL
  };
}

module.exports = getUserInfo;
