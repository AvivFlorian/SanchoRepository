function search() {
        alert($("#search").val());
}

$(document).ready(function() {
       
    $("#Submit_search").click(search());
    
    });

$(document).ready(function() {
       
    $("#search").keyup(function(event){
    if(event.keyCode == 13){
        search();
    }
});
 
});

