exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({id:1, name: 'Eat'}),
        knex('categories').insert({id:2, name: 'Watch'}),
        knex('categories').insert({id:3, name: 'Read'}),
        knex('categories').insert({id:4, name: 'Buy'})
      ]);
    });
};
