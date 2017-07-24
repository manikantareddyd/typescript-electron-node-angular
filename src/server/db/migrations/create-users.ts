class CreateUsers {
  public up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      username: {
        unique: true,
        type: Sequelize.STRING
      },
      hashpass: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      provider: {
        type: Sequelize.STRING
      },
      provider_id: {
        type: Sequelize.STRING
      },
      displayName: {
        type: Sequelize.STRING
      },
      familyName: {
        type: Sequelize.STRING
      },
      givenName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        type: Sequelize.STRING
      },
      photos: {
        type: Sequelize.STRING
      }
    });
  }
  public down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
}

module.exports = new CreateUsers();