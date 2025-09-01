// Header
$(document).ready(function () {
  $(document).on("scroll", function () {
    if ($(document).scrollTop() > 200) {
      $("header").addClass("shrink");
    } else {
      $("header").removeClass("shrink");
    }
  });

  // Hamburger
  $(".menu-toggle").on("click", function () {
    $(".menu-toggle").toggleClass("active");
    $(".main-menu").toggleClass("menu-active");
  });
});

// Slider
var swiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// About Section
$(document).ready(function () {
  $(".about-box").hover(
    function () {
      $(this).animate({ marginTop: "-10px" }, 200);
    },
    function () {
      $(this).animate({ marginTop: "0px" }, 200);
    }
  );
});

// Contact Section
(function ($) {
  $(".contact-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      subject: {
        required: true,
        minlength: 2,
      },
      message: {
        required: true,
        minlength: 2,
      },
    },
    messages: {
      name: {
        required: "come on, you have a name don't you?",
        minlength: "your name must consist of at least 2 characters",
      },
      email: {
        required: "no email, no support",
      },
      subject: {
        required: "you have a reason to contact, write it here",
        minlength: "thats all? really?",
      },
      message: {
        required: "um...yea, you have to write something to send this form.",
        minlength: "thats all? really?",
      },
    },
    submitHandler: function (form) {
      $(form).ajaxSubmit({
        type: "POST",
        data: $(form).serialize(),
        url: "mail.php",
        success: function () {
          $(".contact-form").resetForm();
          $(".success").slideDown("slow");
        },
        error: function () {
          $(".error").slideDown("slow");
        },
      });
    },
  });
})(jQuery);
