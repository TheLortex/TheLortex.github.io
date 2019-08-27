$("#titlefill").textfill({
  maxFontPixels: 100,
  widthOnly: true
});
$("#titlefill").textfill({
  maxFontPixels: 100,
  widthOnly: true
});

$(window).resize(function() {
  $("#titlefill").textfill({
    maxFontPixels: 100,
    widthOnly: true
  });
});

$("#lemons").hover(
  function() {
    $("#t1").stop();
    $("#t2").stop();
    $("#t1").fadeOut(150, function() {
      $("#t2").fadeIn(150);
    });
  },
  function() {
    $("#t1").stop();
    $("#t2").stop();

    $("#t2").fadeOut(150, function() {
      $("#t1").fadeIn(150);
    });
  }
);
