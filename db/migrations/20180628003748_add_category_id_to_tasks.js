
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('tasks', function (table) {
            table.integer('category_id').unsigned()
            table.foreign('category_id').references('categories.id')

          })
        ]); 
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('tasks', function (table) {
            table.dropForeign('category_id')
            table.dropColumn('category_id')

          })
        ]); 
};
