
var index = $.jStorage.index();
var content = "";

for (i=0; i<index.length; i++ ) {
    
    prozent = (100/60) * ($.jStorage.get(index[i]));
    
    content += '<div>' + index[i] + ' ('+$.jStorage.get(index[i])+' Min)</div><div class="progress progress-striped">';
    content += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+prozent+'" aria-valuemin="0" aria-valuemax="60" style="width: '+prozent+'%">';
    content += '<span class="sr-only">'+prozent+' Complete (success)</span>';
    content += '</div>    </div>';
    
}

$('.placeholder').html(content);

