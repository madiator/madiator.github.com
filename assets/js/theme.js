/**
 * Theme JavaScript
 */

$(document).ready(function() {
    initNavbarEffects();
    initScrollEffects();
    initSearchFunctionality();
    initSmoothScroll();
});

/**
 * Navbar scroll effects
 */
function initNavbarEffects() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function() {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) return;

        if (st > lastScrollTop && st > navbarHeight) {
            $('nav').removeClass('nav-down').addClass('nav-up');
            $('.nav-up').css('top', -$('nav').outerHeight() + 'px');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('nav').removeClass('nav-up').addClass('nav-down');
                $('.nav-up, .nav-down').css('top', '0px');
            }
        }
        lastScrollTop = st;
    }
}

/**
 * Scroll-triggered effects
 */
function initScrollEffects() {
    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 280) {
            $('.alertbar').fadeIn();
        } else {
            $('.alertbar').fadeOut();
        }
    });
}

/**
 * Search functionality
 */
function initSearchFunctionality() {
    var idx;

    function loadSearch() {
        idx = lunr(function() {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('summary');
        });

        $.getJSON('/content.json', function(data) {
            window.searchData = data;
            $.each(data, function(index, entry) {
                idx.add($.extend({ "id": index }, entry));
            });
        });
    }

    $('#search').on('click', function() {
        $('.searchForm').toggleClass('show');
        if ($('.searchForm').hasClass('show')) {
            $('#searchField').focus();
        }
    });

    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        if (!idx) return;

        var results = idx.search($('#searchField').val());
        $('#content').html('<h1>Search Results (' + results.length + ')</h1>');
        $('#content').append('<ul id="searchResults"></ul>');

        $.each(results, function(index, result) {
            var entry = window.searchData[result.ref];
            $('#searchResults').append('<li><a href="' + entry.url + '">' + entry.title + '</a></li>');
        });
    });

    if (typeof lunr !== 'undefined') {
        loadSearch();
    }
}

/**
 * Smooth scroll
 */
function initSmoothScroll() {
    setTimeout(function() {
        if (location.hash) {
            window.scrollTo(0, 0);
            var target = location.hash.split('#');
            smoothScrollTo($('#' + target[1]));
        }
    }, 1);

    $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname) {
            smoothScrollTo($(this.hash));
            return false;
        }
    });

    function smoothScrollTo(target) {
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    }
}

$(document).keydown(function(e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 75) {
        e.preventDefault();
        $('.searchForm').addClass('show');
        $('#searchField').focus();
    }
    if (e.keyCode === 27) {
        $('.searchForm').removeClass('show');
    }
});
