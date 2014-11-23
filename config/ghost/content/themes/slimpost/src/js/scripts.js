$(document).ready(function() {
        // FitVids
        $('.post-excerpt').fitVids();

        // Darkbox
        $('.post-content img').each(function() {
                if ($this.parent().get(0).tagName === 'a') {
                        return;
                }

                var imageSrc = $(this).attr('src');
                var lastPeriod = imageSrc.lastIndexOf('.');
                var fullresImageSrc = imageSrc.substr(0, lastPeriod) + '.fullres' + imageSrc.substr(lastPeriod);
                $(this).wrap('<a href="' + fullresImageSrc + '" rel="darkbox"></a>');
        });

        $('a[rel=darkbox]').darkbox();

        // Highlight.js
        hljs.initHighlightingOnLoad();

        // NProgress
        NProgress.start();
});

$(window).load(function() {
        // NProgress
        NProgress.done();
});
