/**
 * Terminal Theme JavaScript
 * Polished terminal-inspired interactions
 */

// Wait for DOM to be ready
$(document).ready(function() {
    // Initialize all effects
    initThemeToggle();
    initNavbarEffects();
    initScrollEffects();
    initTerminalEffects();
    initSearchFunctionality();
    initSmoothScroll();
});

/**
 * Theme toggle functionality
 */
function initThemeToggle() {
    // Check for saved theme preference or default to dark
    var savedTheme = localStorage.getItem('theme') || 'dark';

    // Apply saved theme on load
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Toggle theme on click
    $('#themeToggle').on('click', function() {
        var currentTheme = document.documentElement.getAttribute('data-theme');
        var newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Apply theme with smooth transition
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';

        if (newTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        // Save preference
        localStorage.setItem('theme', newTheme);

        // Remove transition after it completes
        setTimeout(function() {
            document.documentElement.style.transition = '';
        }, 300);
    });
}

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
            // Scroll Down
            $('nav').removeClass('nav-down').addClass('nav-up');
            $('.nav-up').css('top', -$('nav').outerHeight() + 'px');
        } else {
            // Scroll Up
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
    // Alert bar fade
    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 280) {
            $('.alertbar').fadeIn();
        } else {
            $('.alertbar').fadeOut();
        }
    });

    // Terminal windows fade-in on scroll
    var terminalWindows = $('.terminal-window');

    function checkVisibility() {
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        terminalWindows.each(function() {
            var element = $(this);
            var elementTop = element.offset().top;

            if (elementTop < scrollTop + windowHeight - 100) {
                element.addClass('visible');
            }
        });
    }

    // Add CSS for animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .terminal-window {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .terminal-window.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .hero-terminal .terminal-window {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    $(window).on('scroll', checkVisibility);
    checkVisibility(); // Initial check
}

/**
 * Terminal-specific visual effects
 */
function initTerminalEffects() {
    // Add subtle glow effect on hover for terminal windows
    $('.terminal-window').hover(
        function() {
            $(this).css('box-shadow', '0 8px 32px rgba(88, 166, 255, 0.15)');
        },
        function() {
            $(this).css('box-shadow', '0 4px 20px rgba(0, 0, 0, 0.3)');
        }
    );

    // Add click effect on terminal dots
    $('.terminal-dot').click(function(e) {
        e.preventDefault();
        var dot = $(this);
        dot.css('transform', 'scale(0.8)');
        setTimeout(function() {
            dot.css('transform', 'scale(1)');
        }, 100);
    });

    // Animate command prompts on hover
    $('.cmd-prompt').hover(
        function() {
            $(this).css('color', 'var(--terminal-accent-green)');
        },
        function() {
            $(this).css('color', 'var(--terminal-text)');
        }
    );

    // Add typing cursor effect to section titles
    $('.section-title').each(function() {
        var text = $(this).text();
        $(this).html(text + '<span class="cursor"></span>');
    });

    // Add cursor blink style
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .cursor {
                display: inline-block;
                width: 2px;
                height: 1em;
                background-color: var(--terminal-accent);
                margin-left: 4px;
                animation: cursor-blink 1s step-end infinite;
                vertical-align: text-bottom;
            }
            @keyframes cursor-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `)
        .appendTo('head');

    // Publication list hover effects
    $('ol li').hover(
        function() {
            $(this).find('b').css('color', 'var(--terminal-accent)');
        },
        function() {
            $(this).find('b').css('color', 'var(--terminal-accent-green)');
        }
    );

    // Button ripple effect
    $('.btn').on('click', function(e) {
        var btn = $(this);
        var x = e.pageX - btn.offset().left;
        var y = e.pageY - btn.offset().top;

        var ripple = $('<span class="ripple"></span>');
        ripple.css({
            left: x + 'px',
            top: y + 'px'
        });

        btn.append(ripple);

        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // Add ripple style
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-effect 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-effect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `)
        .appendTo('head');
}

/**
 * Search functionality
 */
function initSearchFunctionality() {
    // Create a new Lunr Index
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

    // Toggle search box
    $('#search').on('click', function() {
        $('.searchForm').toggleClass('show');
        if ($('.searchForm').hasClass('show')) {
            $('#searchField').focus();
        }
    });

    // Handle search form submission
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

    // Initialize search
    if (typeof lunr !== 'undefined') {
        loadSearch();
    }
}

/**
 * Smooth scroll functionality
 */
function initSmoothScroll() {
    // Handle hash on page load
    setTimeout(function() {
        if (location.hash) {
            window.scrollTo(0, 0);
            var target = location.hash.split('#');
            smoothScrollTo($('#' + target[1]));
        }
    }, 1);

    // Handle anchor clicks
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

/**
 * Add some terminal-like keyboard shortcuts
 */
$(document).keydown(function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 75) {
        e.preventDefault();
        $('.searchForm').addClass('show');
        $('#searchField').focus();
    }

    // Escape to close search
    if (e.keyCode === 27) {
        $('.searchForm').removeClass('show');
    }
});

/**
 * Console easter egg
 */
console.log('%c> Welcome to my terminal! %c',
    'color: #3fb950; font-family: monospace; font-size: 14px;',
    'color: inherit;'
);
console.log('%c$ cat about.txt',
    'color: #8b949e; font-family: monospace; font-size: 12px;'
);
console.log('%cBuilt with curiosity and caffeine.',
    'color: #e6edf3; font-family: monospace; font-size: 12px;'
);
