class CreateVillians {
  public up(queryInterface, Sequelize) {
    return queryInterface.createTable('Villians', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    });
  }
  public down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Villians');
  }
}

module.exports = new CreateVillians();