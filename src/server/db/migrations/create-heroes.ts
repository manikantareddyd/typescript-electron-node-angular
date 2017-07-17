class CreateHeroes {
  public up(queryInterface, Sequelize) {
    return queryInterface.createTable('Heroes', {
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
    return queryInterface.dropTable('Heroes');
  }
}

module.exports = new CreateHeroes();