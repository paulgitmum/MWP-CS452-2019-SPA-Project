
window.onload = function () {


    // variable declaration 
    let token, animationKey, longitude, latitude, userName, password;

    //...............login templet....................
    // login  templete with sample text
    let welcome = `
       <link href="style.css" type="text/css" rel="stylesheet" />
     User Name <input type = "text" id = "user"  placeholder="mwp"/><br><br>
     Password <input type = "text" id = "pass" placeholder="123"/><br><br>
     <button id = "btn" class="btn btn-primary" >Login</button>

     <h1 class = "big" > Welcome to our beautiful city </h1> 
     <h1 class = "big"> Enjoy your game! </h1><br>

     <p class = "big" >Fairfield is a city in, and the county seat of, Jefferson <br> 
     County, Iowa, United States. <br><br>It has a population 
     totaling 9,464 <br>people according to the 2010 census.<br><br><br> 
     It is a Midwestern city surrounded by rolling<br> farmlands filled with<br> corn, 
     soybean, cattle, and hogs with<br> a median family income of $46,138.<br><br>
     The name was suggested by Nancy Bonnifield, <br>one of the settlers, because 
     it <br>aptly described the fair fields of the area. <br>But also author Susan Welty
      suggests it was a play of<br> words on her own name (bonny field).<br> By 1840 the 
      town had a population of 110 and<br> grew to 650 in 1847. The town was the <br>site 
      of the first and second Iowa State Fair. </p>
     <hr class="new1"><br>
`;
    //...............Animation templet.................
    let animation = `  
    <link href="style.css" type="text/css" rel="stylesheet" />
    <h3 id= "head"></h3>
    <textarea id = "animtext"rows="25" cols="50" "animtext"></textarea><br><br>
    <button id = "btnn"> Refresh </button>
    <button id = "button">Logout</button>
    <h2> Welcome to our beautiful city! </h2>
    <h2> Click the Refresh button <br> to play a new game! </h2>
    <hr class="new1">
`;

    //................................................

    let input = document.querySelector("#outlet");
    input.innerHTML = welcome;

    let next = document.querySelector("#btn");
    next.addEventListener("click", logIn)

    //..............login page........................

    display()
    function logIn() {

        // DEMO AUTHENTICATION user name="mwp" password="123"
        userName = document.getElementById('user').value;
        password = document.getElementById('pass').value;
        if (userName === "mwp" && password === "123") {
            alert('WELCOME!!!')

            // loading the animation page 
            input.innerHTML = animation;
            logOut(); // calling back the logout page 
            addressFetch();  // invoking the geo- location 
            logInFetch();  // invoks the login page
            animationFetch()  // invoking the fetch animation function 

            // track history of pages
            history.pushState({ welcome: 1 }, "title 1", "?page=1");
            window.addEventListener('popstate', function (event) {
                if (event.state.welcome === 1) {
                    clearInterval(animationKey)
                    display()
                }
            })
        } else {
            alert("Enter correct password or user name");
        }

    }

// display page 
    function display() {
        input.innerHTML = welcome;
        clearInterval(animationKey); // stops the ongoing process after loging out 
        nextPage = document.querySelector("#btn");
        nextPage.addEventListener("click", logIn)

    }
    // logout page 
    function logOut() {
        // adding an event listener to the logout page 
        const out = document.querySelector("#button");
        out.addEventListener("click", display);
        document.querySelector("#btnn").addEventListener("click", animationFetch);
    }

    // fetching geo- location from the server
    function addressFetch() {
        // used to get current position of devise
        navigator.geolocation.getCurrentPosition(success, failed);
        async function success(position) {
            // savint the longitude and latitude 
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            // fetching address for the geo location 
            let url = `http://open.mapquestapi.com/geocoding/v1/reverse?key=V8Fi8OQYMJJNcHAaqNuEmgdy4kQTwuB9&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`;
            let response = await fetch(url)
            response = await response.json(); // expectin json file 
            // storing fetched elements in variables 
            const city = response.results[0].locations[0].adminArea5;
            const state = response.results[0].locations[0].adminArea3;
            const country = response.results[0].locations[0].adminArea1;
            const zip = response.results[0].locations[0].postalCode;
            let dis = `Welcome to ${city}, ${state}, ${country}, ${zip}`;
            let output = document.querySelector("#head");
            output.innerHTML = dis; // displays geo location 
        }
    }
// error handling for the geo-location 
    function failed(err) {
        document.querySelector("#head").innerHTML = `Welcome all from anonymus`;
    }
    // fetching the token from the server 
    async function logInFetch() {
        let urll = 'http://www.mumstudents.org/api/login'; // path to the fetching resource 
        const response = await fetch(urll,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    "username": "mwp",
                    "password": "123"
                })
            })
        let replyBody = await response.json();
        let rep = replyBody.token;
        console.log(rep)
    }

    // extracted token 
    token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`;
    // fetching the animations from the server 
    async function animationFetch() {
        // path to the fetching resource
        let url = "http://www.mumstudents.org/api/animation"; 
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                Authorization: `Bearer ${token}`
            }

        })
         // clears setInterval
        clearInterval(animationKey) 
        let animated = await response.text();
        let eachFrames = animated.split('=====\n');
        let framesLength = eachFrames.length;
        let frame = 0;
        animationKey = setInterval(() => {
            document.querySelector('#animtext').value = eachFrames[frame];
            frame++;
            if (frame === framesLength) frame = 0;
        }, 200)


    }
}
