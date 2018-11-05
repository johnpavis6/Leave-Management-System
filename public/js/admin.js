function fetch(query = null) {
    var data = {};
    data['query'] = query || $("#query").val();
    $.ajax({
        type: 'POST',
        data: data,
        url: '/admin/process',
    }).done(function (res) {
        var results = res['results'];
        if (res.err) {
            $("#alert").attr("class", "alert alert-danger");
            $("#alert").html("Syntax Error");
            $("#alert").show();
            $("#content").html("");
            return;
        }
        if (!results.length) {
            $("#alert").attr("class", "alert alert-warning");
            $("#alert").html("Empty set");
            $("#alert").show();
            $("#content").html("");
            return;
        }
        move();
        var code = '<thead style="text-transform:capitalize;">';
        for (attr in results[0]) {
            code += '<th>' + attr + '</th>';
        }
        code += '</thead>';
        for (var i = 0; i < results.length; i++) {
            code += '<tr>';
            for (attr in results[i]) {
                code += '<td>' + results[i][attr] + '</td>';
            }
            code += '</tr>';
        }
        $("#content").html(code);
    }).fail(function () {
        $("#alert").attr("class", "alert alert-danger");
        $("#alert").html("Network Error");
        $("#alert").show();
        $("#content").html("");
    });
    $("#myBar").attr('width', '1');
    $("#alert").hide();
}

function fetchResults(table) {
    var query = "select * from " + table;
    fetch(query);
}

function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}