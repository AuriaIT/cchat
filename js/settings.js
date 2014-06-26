

function ClearAll() {
    $.jStorage.flush();
    $('#uConfirm').show();

    window.setTimeout("HideConfirm()", 3000);
}