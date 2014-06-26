
$('#uConfirm').hide();
$('#uDanger').hide();



function ShowLoad () {
    $('#myModal').modal();
}
function setVal(cKey, cVal) {
    
    if ( cKey != "" && cVal != "" ) {
    
        $.ajax({
            url: "http://auria-it.de/_bodysys/_service.php",            
            type: "GET",
            data: 'ckey='+ cKey + '&cval=' + cVal,
            success: function (data) {
                var json = $.parseJSON(data);
                alert(json.hello + json.ip);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        })
    
        if ($.jStorage.storageAvailable()) {

            $.jStorage.set(cKey,cVal);
        }    

        $('#uDanger').hide();
        $('#uConfirm').show();

        window.setTimeout("HideConfirm()", 3000);
    
    } else {
    
        $('#uConfirm').hide();
        $('#uDanger').show();
        window.setTimeout("HideDanger()", 3000);
    }

}

function HideConfirm() {
    $('#uConfirm').hide();
}

function HideDanger() {
    $('#uDanger').hide();
}



