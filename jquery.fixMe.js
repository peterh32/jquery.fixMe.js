/*
 *   fixMe - JQuery plugin to make element lock in place when it hits the top of the browser.
 *
 *   Approach:
 *      When you scroll the page to where the element hits the top of the browser, change
 *      the element to position:fixed. To maintain document flow, replace the element with
 *      another empty placeholder.
 *
 *   Usage:
 *      $('.my_element').fixMe(); or $('.my_element').fixMe({yPad: 60});
 *      
 *   Options:
 *      yPad: Number of pixels from the top of the page at which fixed behavior should kick in.
 */
(function( $ ){
    $.fn.fixMe = function(options) {
        if (typeof options == 'object') {
            var yPad = options.yPad || 0;
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
                'width': $self.width() + 'px',
                'height': $self.height() + 'px',
                'left': l_0 + 'px',
                'top': t_0 + 'px',
                'display': 'none'
            }).insertBefore($self);
            var left = $self.offset().left;
            // The main function
            var doFixMe = function(){
                var y =  $window.scrollTop();
                if (y >= fixAt){
                    $placeholder.css('display', 'block');
                    left = $placeholder.offset().left - $window.scrollLeft();
                    $self.css({'position':'fixed', 'top': t_0, 'left': left});
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
            doFixMe(); // in case you started out scrolled down the page
            $self.addClass('fixMeApplied');
        }
        return $self;
    };
})( jQuery );
