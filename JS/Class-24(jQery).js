// Hide tag using jQuery:
$(document).ready(function () {
  $("h1").hide();
});

//Hide class using jQuery:
$(document).ready(function () {
  $(".boom").hide();
});

//Hide & show:
$(document).ready(function () {
  $("#hide").click(function () {
    $(".cool").hide();
  });
  $("#show").click(function () {
    $(".cool").show();
  });
});

// Mouse Enter:
$(document).ready(function () {
  $(".me").mouseenter(function () {
    alert("Mouse entered the text!");
  });
});

// Mouse Leave:
$(document).ready(function () {
  $(".ml").mouseleave(function () {
    alert("Mouse left the text!");
  });
});

// Hide & show set timing:
$(document).ready(function () {
  $("#hide2").click(function () {
    $(".hide-show").hide(3000);
  });
  $("#show2").click(function () {
    $(".hide-show").show(3000);
  });
});

//Fade toggle:
$(document).ready(function () {
  $(".fade-btn").click(function () {
    $("#div1").fadeToggle("fast");
    $("#div2").fadeToggle("slow");
    $("#div3").fadeToggle(5000);
  });
});

document.write("<br>");
document.write("<br>");
document.write("<br>");

// Click to slide:
$(document).ready(function () {
  $("#flif").click(function () {
    $("#panel").slideToggle(5000);
  });
});
