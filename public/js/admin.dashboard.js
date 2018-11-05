var fetch = function (query) {
    $("#error").html("")
    $.ajax({
        url: '/admin/process',
        data: { query: query },
        type: 'post',
    }).done(function (data) {
        console.log(data)
        if (data.err) {
            $("#error").html("Syntax Error")
            return;
        }
        var html = '';
        data.rows.forEach((rows) => {
        });
    })
}
var process = function () {
    fetch($("#query").val())
}
var _process = function (table) {
    fetch(`select * from ${table}`)
}