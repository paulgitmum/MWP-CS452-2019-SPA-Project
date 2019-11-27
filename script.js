// your code // your code here

window.onload = function () {


    // login window 
    let welcome = `
     User Name <input type = "text"  placeholder="mwp"/><br><br>
Password <input type = "text" placeholder="123"/><br><br>
  <button id = "btn" class="btn btn-primary" >Login</button>
`;

    // animation window

    let animation = ` <h2 id = "new" ></h2> 
<textarea rows="20" cols="50"></textarea><br><br>
<button id = "btn">Refresh Animation</button>
<button id = "button">Logout</button>
`;

    // 
    document.querySelector("#outlet").innerHTML = animation;
    let input = document.querySelector("#outlet");
    input.innerHTML = welcome;

    let nextPage = document.querySelector("#btn");
    nextPage.addEventListener("click", logIn)

    function logIn() {

        input.innerHTML = animation;
        backTo();

    }

    function display() {
        input.innerHTML = welcome;
    }

    
    function backTo() {
        const out = document.querySelector("#button");
        out.addEventListener("click", display);

    }

    
}
