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
      }
    });
  }
  public down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
}

module.exports = new CreateUsers();