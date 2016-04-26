(function( $ ) {

    $.fn.colorDrop = function( action, options ) {
     
        var hasAction = typeof(action) !== 'object' && action != undefined;

        // Build main options before element iteration.
        $.fn.colorDrop.defaults = {
            colors: {
                'Donald Trump': '#trump'
                ,'Gym': '#gym'
                ,'Music' : '#music'
                ,'Food' : '#food'
                ,'IPL': '#ipl'
                ,'USA': '#usa'
                ,'Life': '#life'
                ,'Body': '#body'
                                
            }
        };

        if (!hasAction) { options = action; };

        var opts = $.extend( {}, $.fn.colorDrop.defaults, options );
		
        var ColorDropUtils = (function() {
            function ColorDropUtils() {}

            ColorDropUtils.prototype.createAnchor = function( text, hex ) {
                var lowerText = text.toLowerCase()
                    ,pieces = lowerText.split( ' ' )
                    ,cssClass = pieces.join( '-' );
                return '<a class="' + cssClass + '" data-hex="' + hex + '">' + text + '&nbsp;' +  hex + '</a>';
            };

            ColorDropUtils.prototype.createListItem = function( text, hex ) {
                return "<li>" + this.createAnchor(text, hex) + "</li>";
            };

            ColorDropUtils.prototype.bindListItems = function( parent, colors ) {
                var self = this;
                $.each( colors, function( text, hex ) {
                    var item = self.createListItem( text, hex );
                    parent.append( item );
                });
            };            
            return ColorDropUtils;
        })();


        var ColorDrop = (function() {
            function ColorDrop( element, options, utils ) {
                var self = this;

                self.element = element
                self.options = options;

                self.utils = utils;

                self.bindListItems = function() {
                    self.utils.bindListItems( self.element.children( '.dropdown-menu' ), self.options.colors );
                };
                  
                self.changeSelectedButtonText = function() {

                    self.element.on('click', 'a', function() {
                        var $selectedAnchor = $( this )
                        , $menu = $selectedAnchor.parent().parent()
                        , $button = $menu.parent().find( 'button' )
                        , $filterOption = $button.children( '.filter-option' )
                        , buttonText = $button.text().split( '#' )
                        , buttonTitle = buttonText[0].trim()
                        , selectedText = $selectedAnchor.text()
                        , newHex = $selectedAnchor.data( 'hex' )
                        , newClass = $selectedAnchor.attr( 'class' );

                        $menu.find('a.selected').removeClass('selected');
                        $selectedAnchor.addClass( 'selected' );
                        $filterOption.html( newHex );

                        // change button color and text color
                        // refactor this to use a color value in a more complex
                        // object for the colors rather than adding and removing
                        // these classes with the !important keyword
                        $button
                            .animate( { 'background-color': newHex }, 200 )
                            .children()
                                .addClass(newClass)
                                .removeClass(newClass)
                                .animate( { 'color' : $( '.' + newClass ).css( 'color' ) } );


                        // fire on change event if available
                        if (self.options.onChange) {
                            self.options.onChange.call( this );
                        };
                    });

                };

                self.bindUIActions = function() {
                    self.changeSelectedButtonText();
                };

                self.init = function() {
                    self.bindListItems();
                    self.bindUIActions();
                };

                self.getSelected = function() {
                    var $selected = self.element.children( '.dropdown-menu' ).find( 'a.selected' )
                    if (!$selected[ 0 ]) {
                        return self.element.find( 'button' );
                    }
                    return $selected;
                };

                self.val = function() {
                    var $selectedAnchor = self.getSelected()
                        ,hex = $selectedAnchor.data( 'hex' );
                    return hex;
                };

                self.text = function() {
                    var $selectedAnchor = self.getSelected()
                        ,text = $selectedAnchor.text();
                    return text;
                };
            };  
            return ColorDrop;
        })();

        if (hasAction) {
            var element = $( this )
                ,colorDrop = new ColorDrop( $( this ) );
            return colorDrop[ action ]();
        };

        var utils = new ColorDropUtils();
        return this.each(function() {

            var $this = $( this )
                ,colorDrop = new ColorDrop( $this, opts, utils );
                
            colorDrop.init();

        });
     
    };
})( jQuery );