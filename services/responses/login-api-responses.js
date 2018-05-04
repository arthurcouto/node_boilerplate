const JsonResponse = {
  formatUserData: (user) => {
    return {
      type: `User`,
      id: user.id,
      attributes: {
        name: user.name,
        message: `O usuário ${user.name} foi criado com sucesso.`
      }
    };
  },
  formatAuthorization: (token) => {
    return {
      type: `Authorization`,
      attributes: {
        token: token.jwt
      }
    }
  }
};

module.exports = JsonResponse;
