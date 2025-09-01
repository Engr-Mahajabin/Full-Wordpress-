var $window = $(window);

$(document).ready(function() {

    $(".animate-redirect a[href^='#']").click(function(e) {
        e.preventDefault();

        var position = $($(this).attr("href")).offset().top;

        $("body, html").animate({
            scrollTop: position
        }, 1000);
    });

    // scroll to top
    const scrollTopPercentage = ()=> {
        const scrollPercentage = () => {
            const scrollTopPos = document.documentElement.scrollTop;
            const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
            const scrollElementWrap = $(".scroll-top-percentage");

            scrollElementWrap.css("background", `conic-gradient( #09b850 ${scrollValue}%, #14212B ${scrollValue}%)`);

            if ( scrollTopPos > 100 ) {
                scrollElementWrap.addClass("active");
            } else {
                scrollElementWrap.removeClass("active");
            }

            if( scrollValue < 96 ) {
                $("#scroll-value").text(`${scrollValue}%`);
            } else {
                $("#scroll-value").html('<i class="fa-solid fa-angle-up"></i>');
            }
        }
        window.onscroll = scrollPercentage;
        window.onload = scrollPercentage;

        // Back to Top
        function scrollToTop() {
            document.documentElement.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        $(".scroll-top-percentage").on("click", scrollToTop);
    }
    scrollTopPercentage();

    // counter
    $('.countup').counterUp({
        delay: 50,
        time: 2000
    });     

    $('.current-year').text(new Date().getFullYear());

});
    