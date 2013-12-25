function search() {
        alert($("#search").val());
}

$(document).ready(function() {       
    $("#search").keyup(function(event){
    if(event.keyCode === 13){
        search();
    }
    
    $("#Submit_search").click(function(){
        
            search();   
});
 
});});