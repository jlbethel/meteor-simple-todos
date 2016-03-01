Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  //This code only runs on the client
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

Template.body.events({
  "submit .new-task": function (event) {
    //Prevent default browser form submit
    event.preventDefault();

    //Get Value from form element
    var text = event.target.text.value;
    console.log(event);

    //Insert a task into the Collection
    Tasks.insert({
      text:text,
      createdAt: new Date() //current time
    });
    //Clear form
    event.target.text.value = "";
  },
  "change .hide-completed input": function(event){
    Session.set("hideCompleted", event.target.checked);
  }
});

Template.task.events({

  "click .toggle-checked": function() {
    //Set the checked property to the opposite of it current value
    Tasks.update(this._id, {
      $set: {checked: ! this.checked}
    });
  },
  "click .delete": function () {
    Tasks.remove(this._id);
  }
});
}
