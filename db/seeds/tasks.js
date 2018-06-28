exports.seed = function(knex, Promise) {
  return knex('tasks').del()
    .then(function () {
      return Promise.all([
        knex('tasks').insert({users_id: 1, description: 'Eat Korean bbq', category_id: 1 }),
        knex('tasks').insert({users_id: 1, description: 'Read Lord of the Flies', category_id: 3}),
        knex('tasks').insert({users_id: 1, description: 'Watch House of Cards', category_id: 2}),
        knex('tasks').insert({users_id: 1, description: 'Buy ukelele', category_id: 4}),
        knex('tasks').insert({users_id: 2, description: 'Read People Magazine', category_id: 3}),
        knex('tasks').insert({users_id: 2, description: 'Eat at Warehouse', category_id: 1}),
        knex('tasks').insert({users_id: 2, description: 'Buy toothpaste', category_id: 4}),
        knex('tasks').insert({users_id: 3, description: 'Read People Magazine', category_id: 3}),
        knex('tasks').insert({users_id: 3, description: 'Eat at Warehouse', category_id: 1}),
        knex('tasks').insert({users_id: 3, description: 'Buy toothpaste', category_id: 4}),
        knex('tasks').insert({users_id: 3, description: 'Watch Suits', category_id: 2})
      ]);
    });
};
