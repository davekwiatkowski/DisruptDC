(function ($) {
    "use strict";

    function injectPage(url) {
        var CONTAINER_SELECTOR = '.content';

        //Show loading indicator
        document.querySelector(CONTAINER_SELECTOR).innerHTML = '<center>Loading...</center>';

        url = decodeURI(url);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'document';
        xhr.overrideMimeType("text/html; charset=utf-8");
        xhr.onloadend = function (e) {

            if (e.target.status != 200) {
                // error handling
                return;
            }

            var injectDoc = e.target.response;

            var meta = injectDoc.head.querySelector('meta[itemprop="name"]');
            if (meta) {
                var metaContentName = injectDoc.head.querySelector('meta[itemprop="name"]').content;
                document.head.querySelector('meta[itemprop="name"]').content = metaContentName;
            }

            // Inject article body.
            var container = document.querySelector(CONTAINER_SELECTOR);
            var newDocContainer = injectDoc.querySelector(CONTAINER_SELECTOR);
            $(container).html(newDocContainer.innerHTML);

            // Scroll to top of page
            window.scrollTo(0, 0);
        };

        xhr.send();
    }

    function showBurger() {
        $('#burger').addClass('shown');
        $('#no-burger').removeClass('shown');
    }

    function hideBurger() {
        $('#burger').removeClass('shown');
        $('#no-burger').addClass('shown');
    }

    function handleBurgerClick() {
        if ($('#burger').hasClass('expand')) {
            $('#burger').removeClass('expand');
        }
        else {
            $('#burger').addClass('expand');
        }
    }

    function handleResize() {
        let w = window.innerWidth;

        if (w < 930) {
            showBurger();
        } else {
            hideBurger();
        }
    }

    function init() {
        // main
        handleResize();

        $('#burger').on('click', handleBurgerClick);

        $('.profile-select').on('click', function () {
            injectPage('profile.html')
        });

        $('.events-select').on('click', function () {
            injectPage('events.html')
        });

        $('.chat-select').on('click', function () {
            injectPage('chat.html')
        });

        injectPage('events.html');

        Parse.initialize('disruptDC');
        Parse.serverURL = 'http://52.33.25.43/parse/';

        if (!Parse.User.current()) {
            Parse.User.logIn('jmerizia', 'abcd1234')
                .then(function(user) {
                    $(window).trigger("loggedIn");
                }, function(error) {

                });
        }

    }

    window.onload = init;
    window.onresize = handleResize;
})(jQuery);
