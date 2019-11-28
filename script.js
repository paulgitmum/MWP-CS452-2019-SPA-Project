// your code // your code here

window.onload = function () {

    let to;
    let animatedId;
    let log = false;


    //let head = document.querySelector('#head');
    // login window 
    let welcome = `
     User Name <input type = "text"  placeholder="mwp"/><br><br>
Password <input type = "text" placeholder="123"/><br><br>
  <button id = "btn" class="btn btn-primary" >Login</button>
`;

    // animation window
    let animation = `  
    <h2 id= "head"></h2>
<textarea id = "animtext"rows="20" cols="50"></textarea><br><br>
<button id = "btnn"> Refresh  </button>
<button id = "button">Logout</button>
`;
    //let ae;

    // 
    // document.querySelector("#outlet").innerHTML = animation;

    let input = document.querySelector("#outlet");
    input.innerHTML = welcome;

    let nextPage = document.querySelector("#btn");
    nextPage.addEventListener("click", logIn)

    function logIn() {

        input.innerHTML = animation;
        backTo();
        addressFetch();
        logInFetch();
        animationFetch()

    }

    function display() {
        input.innerHTML = welcome;

    }

    function backTo() {
        const out = document.querySelector("#button");
        out.addEventListener("click", display);
    }

    function addressFetch() {
        navigator.geolocation.getCurrentPosition(success, failed);
        async function success(position) {
            console.log(position);

            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            
            let url = `http://open.mapquestapi.com/geocoding/v1/reverse?key=V8Fi8OQYMJJNcHAaqNuEmgdy4kQTwuB9&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`;

            let response = await fetch(url)
            response = await response.json();
            //console.log(response)
            const city = response.results[0].locations[0].adminArea5;
            const state = response.results[0].locations[0].adminArea3;
            const country = response.results[0].locations[0].adminArea1;
            const zip = response.results[0].locations[0].postalCode;

            let dis = `Welcome to ${city}, ${state}, ${country}, ${zip}`;
            let output = document.querySelector("#head");
            output.innerHTML = dis;
        }
    }

    function failed(err) {
        document.querySelector("#head").innerHTML = `Welcome all from anonymus`;
    }

    // fetching the token 
    async function logInFetch() {

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
        let rep = replyBody.to;
        console.log(rep)
    }

    to = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`;

    async function animationFetch() {
        let url = "http://www.mumstudents.org/api/animation ";

        //  if (animatedId) clearInterval(animatedId) 

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                Authorization: `Bearer ${to}`
            }

        })

        let anim = await response.text();
        let frames = anim.split('=====\n');
        let framesLength = frames.length;
        let currFrame = 0;
        animatedId = setInterval(() => {
            document.querySelector('#animtext').value = frames[currFrame];
            currFrame++;
            if (currFrame === framesLength) currFrame = 0;
        }, 200)

    }


  


}
