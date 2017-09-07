Build a collection manager
Using Mongoose, build an app to store information about a collection.

Take your Mongoose schema from today's activity ("Build a schema for a collection"). If you did not perform this activity, create a schema now based off of it.

Using your schema, build an Express app that lets you view your collection, add to your collection, edit items in your collection, and delete items from your collection.

When dealing with arrays, think about how you might make this user interface work. If it makes sense, write some client-side JavaScript to help add new items to your array on your create and update item pages. You can make your JavaScript available with express.static.

To deal with nested data in forms, consult the docs for the extended option in body-parser and the qs library that body-parser uses.