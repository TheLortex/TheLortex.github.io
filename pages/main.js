
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
