
//gets the list of places around me
var places = {};

$(document).on("click", ".place-btn", function(e) {
    e.preventDefault();
    var self = this;
    console.log($(this).attr("data-place-id"));
    $.each(places.data, function(key, val) {
        if (val.google_place_id == $(self).attr("data-place-id")) {
            places.current_place = val;
            console.log(places.current_place);
            $("#place").find(".name").text(places.current_place.name);
            $("#main_section").show();
            $(".my-new-list").hide();
            $("#logoPic").hide();
            $("#searchField").hide();
            $("#parking").attr('src', "../images/parking_icon" + places.current_place.parking + ".jpg");
            $("#entrance").attr('src', "../images/entrance_icon" + places.current_place.parking + ".jpg");
            $("#inside").attr('src', "../images/inside_icon" + places.current_place.parking + ".jpg");
            $("#restroom").attr('src', "../images/restroom_icon" + places.current_place.parking + ".jpg");
        }
    });
});

var x = document.getElementById("location");
function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    //console.log(position, position.coords.longitude);

    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPFL",
            {
                'lat': position.coords.latitude,
                'lng': position.coords.longitude,
                'search': getValue()
            },
    //creats the list of the restaurnt around me
    function(data) {
        console.log(data);
        places.data = data;
        var items = [];
        $.each(data, function(key, val) {
            console.log(key, val);
            items.push("<li id='" + key + "'>" +
                    "<a onclick=\"createResPage('" + val.name + "', '" + val.parking + "', '" + val.entrance + "', '" + val.inside + "', '" + val.restroom + "', '" + val.comments + "')\" data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + val.name + "</a></li>");
        });


        $("<ul/>", {
            "class": "my-new-list",
            style: 'margin-top:350px',
            html: items.join("")
        }).prependTo("body");
        //console.log(data);
    });
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
}

// sends the typed text from the search box to the server
function getValue()
{
    //console.log(searchField.value);
    //return $("#searchField").val();

    var x = document.getElementById("searchField").value;

    // call server

    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPPN",
            {
                'searchField': x
            });
}



//sends true when pressing the icon 
function changeIcon()
{
    //       document.getElementById("parking_icon").style.listStyleImage = "url("../images/space_icon.jpg")";

    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php",
            {
                'parking_icon': 'true'
            });
}


