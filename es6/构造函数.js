
    /*function User(name, pass){
      this.name=name;
      this.pass=pass;
    }

    User.prototype.showName=function (){
      alert(this.name);
    };
    User.prototype.showPass=function (){
      alert(this.pass);
    };*/

    class User{
      constructor(name, pass){
        this.name=name;
        this.pass=pass;
      }

      showName(){
        alert(this.name);
      }
      showPass(){
        alert(this.pass);
      }
    }

    var u1=new User('blue', '123456');

    u1.showName();
    u1.showPass();
