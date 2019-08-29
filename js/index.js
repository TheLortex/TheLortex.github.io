/* Dynamic page loader */

$.ajaxSetup({
  cache: true
});

let pages = ["main", "pics", "systems", "ai"];
let hasjs = {
  main: true,
  pics: false,
  systems: false,
  ai: false
};

let speed = 100;

function hmm(str) {
  if (!pages.includes(str)) {
    str = "main";
  }
  return str;
}

function loadPage(which_one, first) {
  which_one = hmm(which_one);

  if (!first) {
    let current_one = hmm(
      $(location)
        .attr("hash")
        .slice(1)
    );

    if (which_one == current_one) {
      return false;
    }

    if (which_one == "main") {
      window.location = "#";
    } else {
      window.location = "#" + which_one;
    }
  }

  for (p of pages) {
    if (p != which_one) {
      $("#menu-" + p).removeClass("selected");
    }
  }

  $("#menu-" + which_one).addClass("selected");

  let cont = function() {
    $("#content").load("pages/" + which_one + ".html", function() {
      if (hasjs[which_one]) {
        $.getScript("pages/" + which_one + ".js");
      }

      if (!first) {
        $("#content").fadeIn(speed);
      } else {
        $("#content").show();
      }
    });
  };

  if (!first) {
    $("#content").fadeOut(speed, cont);
  } else {
    cont();
  }
}

$(document).ready(function() {
  if ($(location).attr("href").includes("#")) {
    loadPage(
      $(location)
        .attr("hash")
        .slice(1),
      true
    );
  } else if ($(location).attr("pathname") == "/") {
    loadPage(
      "main",
      true
    );
  }
});

$(document).ready(function() {
  /* Textfill */
  $("#title").textfill({
    maxFontPixels: 100,
    widthOnly: true
  });


/* Background animation button */

function updateButton() {
  if (window.animationEnabled) {
    $("#disable_button").text("Disable animation");
  } else {
    $("#disable_button").text("Enable animation");
  }
}

window.animationEnabled = window.localStorage.getItem("animate") != "false";
updateButton();
  $("#disable_button").click(function() {
    window.animationEnabled = !window.animationEnabled;
    updateButton();
    window.localStorage.setItem("animate", window.animationEnabled);
  });
});

$(window).resize(function() {
  $("#title").textfill({
    maxFontPixels: 100,
    widthOnly: true
  });
});
