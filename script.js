(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            if (h < 13) {
                c.innerHTML = h + ":" + m + ":" + s + " EL";
            } else if (h >= 13) {
                h = h % 12;
                c.innerHTML = h + ":" + m + ":" + s + " PL";
            }

        };
        
    });
    
    // forms

    const radioButtons = document.querySelectorAll('input[name="pank"]');
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        let selectedBank;
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedBank = radioButton.value;
                    break;
                }
            }
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if (!eesnimi.value) {
            
            alert("Eesnimi on kohustuslik!");
            eesnimi.focus();
            return;

        } else if (!perenimi.value) {
            alert("Perekonnanimi on kohustuslik!");
            perenimi.focus();
            return;
        } else if (hasNumber(eesnimi.value)) {
            alert("Eesnimi ei tohi sisaldada numbreid!");
            eesnimi.focus();
            return;
        } else if (hasNumber(perenimi.value)) {
            alert("Perekonnanimi ei tohi sisaldada numbreid!");
            perenimi.focus();
            return;
        } else if (!selectedBank) {
            alert("Valige pank!");
            return;
        } else {
            let hind = 0;
            
            if (document.getElementById("v1").checked) hind += 5;
            if (document.getElementById("v2").checked) hind += 1;

            if (linn.value === "trt" || linn.value === "nrv") {
                hind += 2.5;
            } else if (linn.value === "prn") {
                hind += 3
            }
            
            e.innerHTML = hind + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AsdmXMpcXCodQK689HmnB2JM6Igx2OonGtaFrIYxM9RRroR2PuhlfUSmYGTN2609";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint1 = new Microsoft.Maps.Location(
        58.38104, 
        26.71992
    );
    let centerPoint2 = new Microsoft.Maps.Location(
        58.37424, 
        24.49661
    );
    let centerPoint = new Microsoft.Maps.Location(
        58.37764,
        25.60827        
    )

    //Create an infobox at the center of the map but don't show it.
    let infobox1 = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });
    infobox1.setMap(map);

    let infobox2 = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });
    infobox1.setMap(map);
    infobox2.setMap(map);

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin1 = new Microsoft.Maps.Pushpin(centerPoint1, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
        });
        
        Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked1);
        function pushpinClicked1(e) {
            //Make sure the infobox has metadata to display.
            if (e.target.metadata) {
                //Set the infobox options with the metadata of the pushpin.
                infobox1.setOptions({
                    location: e.target.getLocation(),
                    title: e.target.metadata.title,
                    description: e.target.metadata.description,
                    visible: true
                });
            }
        }

    
    let pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, { // loome markeri

        title: 'Pärnu rand',
        subTitle: 'Tore suvel käia',
        text: 'Rand'
        
        });
        
        Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked2);
        function pushpinClicked2(e) {
            //Make sure the infobox has metadata to display.
            if (e.target.metadata) {
                //Set the infobox options with the metadata of the pushpin.
                infobox2.setOptions({
                    location: e.target.getLocation(),
                    title: e.target.metadata.title,
                    description: e.target.metadata.description,
                    visible: true
                });
            }
        }
    
    map.entities.push(pushpin1); // lisame marker kaardile    
    map.entities.push(pushpin2);

    

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

// funktsioon, mis kontrollib, kas sõne sisaldab numbreid
function hasNumber(myString) {
    return /\d/.test(myString);
  }
