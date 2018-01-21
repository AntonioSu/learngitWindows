/**
 * Created by Administrator on 2016/1/6.
 */
$(document).ready(function() {
    $("a").hover(function() {
        $(this).css({
            "color": $(this).attr("id"),
            "background-color": "silver"
        });
    });
    $("a").mouseout(function() {
        $(this).css({
            "color": "white",
            "background-color": "gray"
        });
    });
    $("a").click(function(event) {
        $("#colorMe").attr("class",$(this).attr("id"));
        event.preventDefault();
    });
});