'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('matches', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            home_team: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'teams',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            home_team_goals: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            away_team: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'teams',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            away_team_goals: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            in_progress: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
        }, {
            timestamps: false,
        })
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('matches');
    }
};