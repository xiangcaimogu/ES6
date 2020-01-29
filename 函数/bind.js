Function.prototype.my_bind = function(context){
    var self = this;
    console.log(self)
    return function(){
      self.apply(context,arguments);
    }
  }
  function a(){
    console.log(this.name);
  }
  a();  // ''
  var b = {
    name: 'apple'
  };
  a.bind(b)(); // apple
  a.my_bind(b)(); // apple