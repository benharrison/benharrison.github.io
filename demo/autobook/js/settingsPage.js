// ---------------------------------------------
// General Settings
// ---------------------------------------------
$(function(){
    //$("#generalSettingsTable").addClass("borders");
    //$("#generalSettingsTable").find("tr").find("td:even").css("color", "#666");
    //$("#generalSettingsTable").find("tr").find("td:first").css("font-weight", "bold");
    
    $("#sidebar").find("ul").find("li:last").css("background-image", "none");
});


// ---------------------------------------------
// Service Department Hour sliders 
// ---------------------------------------------
$(function() {
    $(".slider").slider({
        'min' : 600,
        'max' : 2300,
        'step' : 25,
        'range' : true,
        'values' : [700,1700],
        slide : function (event, ui) {
            var currentSlider = this.id;
            var open = convertTime(ui.values[0]);
            var close = convertTime(ui.values[1]);
            
            $("#" + currentSlider + "Open").html(open.hours + ":" + open.minutes + " " + open.ampm);
            $("#" + currentSlider + "Close").html(close.hours + ":" + close.minutes + " " + close.ampm);
            
            $("#" + currentSlider + "Hours").html(((ui.values[1] - ui.values[0]) / 100));
        },
        start : function (event, ui) {
            var currentSlider = this.id;
            var open = convertTime(ui.values[0]);
            var close = convertTime(ui.values[1]);
            
            $("#" + currentSlider + "Open").addClass("highlight");
            $("#" + currentSlider + "Close").addClass("highlight");
            $("#" + currentSlider + "Hours").addClass("highlight");
        },
        stop : function (event, ui) {
            var currentSlider = this.id;
            var open = convertTime(ui.values[0]);
            var close = convertTime(ui.values[1]);
            
            $("#" + currentSlider + "Open").removeClass("highlight");
            $("#" + currentSlider + "Close").removeClass("highlight");
            $("#" + currentSlider + "Hours").removeClass("highlight");
        }
    });
    
    $("#sidebar").find("a").bind("click", function(){
        var sidebarItem = $(this);
        var displayPanel = sidebarItem.attr("href");
        $("#sidebar").find("a").removeClass("selected");
        sidebarItem.addClass("selected");
        
        $(".displayPanel").hide();
        $(displayPanel).show();
    });
});

function convertTime(time)
{
    time = time.toString();
    //if (time.length == 3) time = "0" + time;
    hourLength = (time.length == 3 ? 1 : 2);
    
    var am = true;
    var hours = parseInt(time.substring(0, hourLength));
        if (hours >= 12)
        {
            am = false;
            if (hours > 12) { hours = hours - 12; }
        }
    var minutes = parseInt(time.substring(hourLength));
        minutes = ((minutes / 100) * 60).toString();
        if (minutes.length == 1) minutes = "0" + minutes;
        
    return {
        hours : hours,
        minutes : minutes,
        ampm : (am ? "AM" : "PM")
        }
}

        
// ---------------------------------------------
// Capacity Settings
// ---------------------------------------------
$(document).ready(function(){
    $("#capacitySettingsTable").find("input").bind("keyup", function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        var inputValue = parseInt($(this).val());
        
        switch(code){
            case 38: // up arrow
                if (!isNaN(inputValue) && inputValue >= 0)
                {
                    $(this).val(inputValue + 1);
                }else{
                    $(this).val(0);
                }
                break;
            case 40: // down arrow
                if (!isNaN(inputValue) && inputValue > 0)
                {
                    $(this).val(inputValue - 1);
                }else{
                    $(this).val(0);
                }
                break;
            }
    });
});


// ---------------------------------------------
// Toggle Switches - DMS Settings
// ---------------------------------------------
function toggleSwitch(link) {
    var tempLink = $(link);
    var tempSpeed = 150;
    var tempEasing = "swing";
    if ( tempLink.hasClass("toggleSwitchOff") )
    {
        tempLink.animate({
                'background-position': '0px -19px'
            },{
                'duration': tempSpeed,
                'easing' : tempEasing,
                'complete': function(){
                        tempLink.removeClass("toggleSwitchOff").addClass("toggleSwitchOn");
                    }
            });
    } else {
        tempLink.animate({
                'background-position': '-25px -19px'
            },{
                'duration': tempSpeed,
                'easing' : tempEasing,
                'complete': function() {
                        tempLink.removeClass("toggleSwitchOn").addClass("toggleSwitchOff");
                    }
            }); 
    }
}