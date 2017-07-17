class SeedHeroes {
  public up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
            'Heroes',
            [
                { "id": "11", "name": "Superman" }, 
                { "id": "12", "name": "Wonder Woman" }, 
                { "id": "13", "name": "Supergirl" }, 
                { "id": "14", "name": "Spiderman" }, 
                { "id": "15", "name": "Ironman" }, 
                { "id": "16", "name": "Thor" }, 
                { "id": "17", "name": "Flash" }, 
                { "id": "18", "name": "Hulk" }
            ], {});
    }
    public down(queryInterface, Sequelize) {
        return queryInterface.dropTable('Heroes');
    }
}

module.exports = new SeedHeroes();