
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('tasks', function (table) {
            table.increments()
            table.string('description')
            table.timestamps('created_date')
            table.integer('users_id').unsigned()
            table.foreign('users_id').references('users.id')
            // table.integer('category_id').unsigned()
            // table.foreign('category_id').references('categories.id')
          })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('tasks')
    ])
};
