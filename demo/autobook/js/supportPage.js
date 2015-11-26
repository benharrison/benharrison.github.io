function expandTextArea(element) {
    var el = $(element),
        elHeight = el.height();
    el.height(elHeight + 100);
    }
    
function shortenTextArea(element) {
    var el = $(element),
        elHeight = el.height(),
        tempVal = elHeight - 100;
        
    if (tempVal >= 100)
        el.height(tempVal);
    else
        el.height(100);
    }
    