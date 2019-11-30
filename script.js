
window.onload = function () {


    // declaration 
    let token, animationKey, longitude, latitude;

    //...............login templet....................
    let welcome = `
     User Name <input type = "text"  placeholder="mwp"/><br><br>
     Password <input type = "text" placeholder="123"/><br><br>
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
    <h2 id= "head"></h2>
    <textarea id = "animtext"rows="25" cols="50" "animtext"></textarea><br><br>
    <button id = "btnn"> Refresh </button>
    <button id = "button">Logout</button>
    <h1> Welcome to our beautiful city! </h1>
    <h2> Click the Refresh button <br> to play a new game! </h2>
    <hr class="new1">
`;

    //................................................

    let input = document.querySelector("#outlet");
    // displaying the welcome page 
    input.innerHTML = welcome;

    let nextPage = document.querySelector("#btn");
    nextPage.addEventListener("click", logIn)

    //..............login page........................

    function logIn() {
        // loading the animation page 
        input.innerHTML = animation;
        // calling back the logout page 
        backTo();
        // invoking the geo- location 
        addressFetch();
        // invoking the login 
        logInFetch();
        animationFetch()  // invoking the fetch animation function 
        // adding the event listener to the refresh button 
        document.querySelector("#btnn").addEventListener("click", animationFetch);
        // document.querySelector("button").addEventListener("click", backTo)
    }

    // displaying the log in page 
    function display() {
        input.innerHTML = welcome;    // displays the welcome page 
        clearInterval(animationKey); // stops the ongoing process after loging out 
    }
    // log in window 
    function backTo() {
        // adding an event listener to the logout page 
        const out = document.querySelector("#button");
        out.addEventListener("click", display);
        // document.querySelector("btn").addEventListener("click", logIn)
    }
    // fetching geo- location from the server
    function addressFetch() {
        navigator.geolocation.getCurrentPosition(success, failed);
        async function success(position) {
            console.log(position);
            // savint the longitude and latitude 
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            // fetching address for the geo location 
            let url = `http://open.mapquestapi.com/geocoding/v1/reverse?key=V8Fi8OQYMJJNcHAaqNuEmgdy4kQTwuB9&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`;
            let response = await fetch(url)
            response = await response.json(); // expectin json file 
            //console.log(response)
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
    function failed(err) {
        document.querySelector("#head").innerHTML = `Welcome all from anonymus`;
    }
    // fetching the token from the server 
    async function logInFetch() {
        // fetching address for token  
        let urll = 'http://www.mumstudents.org/api/login';
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
        let url = "http://www.mumstudents.org/api/animation";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                Authorization: `Bearer ${token}`
            }

        })

        if (animationKey) clearInterval(animationKey)
        let anim = await response.text();
        let frames = anim.split('=====\n');
        let framesLength = frames.length;
        let currFrame = 0;
        animationKey = setInterval(() => {
            document.querySelector('#animtext').value = frames[currFrame];
            currFrame++;
            if (currFrame === framesLength) currFrame = 0;
        }, 200)

    }

   



}
