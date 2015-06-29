(function( $ ){
    $.fn.fixMe = function(options) {
        var yPad = 0;
        if (typeof options == 'object' && parseInt(options.yPad)) {
            var yPad = parseInt(options.yPad);
        }
        var $self = $(this);
        if ($self.length && !$self.hasClass('fixMeApplied') && $self.is(':visible')){
            var $window = $(window);
            var t_0 = (parseInt($self.css('top')) || 0) + yPad;
            var l_0 = parseInt($self.css('left')) || 0;
            var fixAt = $self.offset().top - t_0; // vertical location where you switch to fixed
            // create placeholder for element -- we will also use this to figure out the left position of the element
            var $placeholder = $('<div class="fixMePlaceHolder">&nbsp;</div>').css({
                'position': 'relative',
                'float': $self.css('float'),
                'width': $self.outerWidth() + 'px',
                'height': $self.outerHeight() + 'px',
                'left': l_0 + 'px',
                'top': t_0 + 'px',
                'display': 'none'
            }).insertBefore($self);
            var left = $self.offset().left;

            // The main function
            var doFixMe = function(yIframe){
                yIframe = (yIframe && parseInt(yIframe)) || 0;
                var y =  $window.scrollTop() + yIframe;
                if (y >= fixAt){
                    $placeholder.css('display', 'block');
                    left = $placeholder.offset().left - $window.scrollLeft();
                    $self.css({'position':'fixed', 'top': t_0 +  + yIframe, 'left': left});
                } else {
                    $self.css({'position':'relative', 'left':l_0, 'top':t_0 - yPad});
                    $placeholder.css('display', 'none');
                }
            };
            // Events
            $(window).scroll(function(e){
                doFixMe();
                return true;
            });
            $(window).resize(function(e){
                doFixMe();
                return true;
            });

            // Iframe event
            if (!window.top != window) {
                $(window).on("message", function (e) {
                    if (e.originalEvent && !e.origin) {
                        e = e.originalEvent;  // jquery does not quite handle this correctly, so we make adjustments
                    }
                    if (e.data && parseInt(e.data.y)) {
                        doFixMe(parseInt(e.data.y));
                    }
                });
            }

            doFixMe(); // in case you started out scrolled down the page
            $self.addClass('fixMeApplied');
        }
        return $self;
    };
})( jQuery );
