/*!

=========================================================
* Leaf Non-Profit environmental Bootstrap 4 Theme
=========================================================

* Product Page: https://themesberg.com/product/web-templates/leaf-non-profit-environmental-bootstrap-4-theme
* Copyright 2019 Themesberg (https://www.themesberg.com)

* Coded by https://themesberg.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

"use strict";
$(document).ready(function () {

    // options

    var breakpoints = {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140
    };

    var $navbarCollapse = $('.navbar-main .collapse');

    // Collapse navigation
    $navbarCollapse.on('hide.bs.collapse', function () {
        var $this = $(this);
        $this.addClass('collapsing-out');
        $('html, body').css('overflow', 'initial');
    });

    $navbarCollapse.on('hidden.bs.collapse', function () {
        var $this = $(this);
        $this.removeClass('collapsing-out');
    });

    $navbarCollapse.on('shown.bs.collapse', function () {
        $('html, body').css('overflow', 'hidden');
    });

    $('.navbar-main .dropdown').on('hide.bs.dropdown', function () {
        var $this = $(this).find('.dropdown-menu');

        $this.addClass('close');

        setTimeout(function () {
            $this.removeClass('close');
        }, 200);

    });

    $(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.navbar-nav > .dropdown', function (e) {
        e.stopPropagation();
    });

    $('.dropdown-submenu > .dropdown-toggle').click(function (e) {
        e.preventDefault();
        $(this).parent('.dropdown-submenu').toggleClass('show');
    });

    // Headroom - show/hide navbar on scroll
    if ($('.headroom')[0]) {
        var headroom = new Headroom(document.querySelector("#navbar-main"), {
            offset: 0,
            tolerance: {
                up: 0,
                down: 0
            },
        });
        headroom.init();
    }

    // Background images for sections
    $('[data-background]').each(function () {
        $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
    });

    $('[data-background-color]').each(function () {
        $(this).css('background-color', $(this).attr('data-background-color'));
    });

    $('[data-color]').each(function () {
        $(this).css('color', $(this).attr('data-color'));
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Popover
    $('[data-toggle="popover"]').each(function () {
        var popoverClass = '';
        if ($(this).data('color')) {
            popoverClass = 'popover-' + $(this).data('color');
        }
        $(this).popover({
            trigger: 'focus',
            template: '<div class="popover ' + popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
    });

    // Additional .focus class on form-groups
    $('.form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    $(".progress-bar").each(function () {
        $(this).waypoint(function () {
            var progressBar = $(".progress-bar");
            progressBar.each(function (indx) {
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });
            $('.progress-bar').css({
                animation: "animate-positive 3s",
                opacity: "1"
            });
        }, {
                triggerOnce: true,
                offset: '60%'
            });
    });

    // When in viewport
    $('[data-toggle="on-screen"]')[0] && $('[data-toggle="on-screen"]').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function () {
            //alert();
        },
        doOut: function () {
            // Do something to the matched elements as they get off scren
        },
        tolerance: 200,
        throttle: 50,
        toggleClass: 'on-screen',
        debug: false
    });

    // Scroll to anchor with scroll animation
    $('[data-toggle="scroll"]').on('click', function (event) {
        var hash = $(this).attr('href');
        var offset = $(this).data('offset') ? $(this).data('offset') : 0;

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate({
            scrollTop: $(hash).offset().top - offset
        }, 600);

        event.preventDefault();
    });

    //CounterUp
    $('.counter').counterUp({
        delay: 10,
        time: 1000,
        offset: 70,
        beginAt: 100,
        formatter: function (n) {
            return n.replace(/,/g, '.');
        }
    });

    //Chart.js
    if($('.ct-chart').length) {
        var chart = new Chartist.Line('.ct-chart', {
          labels: ['Year', '200', '600', '1000', '1400', '1600', '1800', '1900', '2000', '2019', '2100', '2200'],
          series: [
            [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
            [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
            [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
            [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
          ]
        }, {
          plugins: [
            Chartist.plugins.tooltip()
          ],
          low: 0
        });
        
        // Let's put a sequence number aside so we can use it in the event callbacks
        var seq = 0,
          delays = 30,
          durations = 100;
        
        // Once the chart is fully created we reset the sequence
        chart.on('created', function() {
          seq = 0;
        });
        
        // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
        chart.on('draw', function(data) {
          seq++;
        
          if(data.type === 'line') {
            // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
            data.element.animate({
              opacity: {
                // The delay when we like to start the animation
                begin: seq * delays + 1000,
                // Duration of the animation
                dur: durations,
                // The value where the animation should start
                from: 0,
                // The value where it should end
                to: 1
              }
            });
          } else if(data.type === 'label' && data.axis === 'x') {
            data.element.animate({
              y: {
                begin: seq * delays,
                dur: durations,
                from: data.y + 100,
                to: data.y,
                // We can specify an easing function from Chartist.Svg.Easing
                easing: 'easeOutQuart'
              }
            });
          } else if(data.type === 'label' && data.axis === 'y') {
            data.element.animate({
              x: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 100,
                to: data.x,
                easing: 'easeOutQuart'
              }
            });
          } else if(data.type === 'point') {
            data.element.animate({
              x1: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
              },
              x2: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
              },
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
              }
            });
          } else if(data.type === 'grid') {
            // Using data.axis we get x or y which we can use to construct our animation definition objects
            var pos1Animation = {
              begin: seq * delays,
              dur: durations,
              from: data[data.axis.units.pos + '1'] - 30,
              to: data[data.axis.units.pos + '1'],
              easing: 'easeOutQuart'
            };
        
            var pos2Animation = {
              begin: seq * delays,
              dur: durations,
              from: data[data.axis.units.pos + '2'] - 100,
              to: data[data.axis.units.pos + '2'],
              easing: 'easeOutQuart'
            };
        
            var animations = {};
            animations[data.axis.units.pos + '1'] = pos1Animation;
            animations[data.axis.units.pos + '2'] = pos2Animation;
            animations['opacity'] = {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'easeOutQuart'
            };
        
            data.element.animate(animations);
          }
          });

        // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
        chart.on('created', function() {
          if(window.__exampleAnimateTimeout) {
            clearTimeout(window.__exampleAnimateTimeout);
            window.__exampleAnimateTimeout = null;
          }
          window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 182000);
      });
    }
    
    if($('.ct-chart-2').length) {
      // Chart 2
      new Chartist.Line('.ct-chart-2', {
        labels: [2002, 2003, 2006, 2008, 2010, 2012, 2014, 2018],
        series: [
          [0, 1, 1.5, 2.5, 3.5, 4, 5, 6]
        ]
      }, {
        low: 0,
        showArea: true,
        plugins: [
          Chartist.plugins.tooltip()
        ]
      });
    }

    if($('.ct-chart-3').length) {
      // Chart 3
        var chart = new Chartist.Line('.ct-chart-3', {
          labels: [1920, 1940, 1960, 1980, 2000, 2020],
          series: [
            [-0.5, 0, 0.125, 0.4, 0.8, 1]
          ]
        }, {
          plugins: [
            Chartist.plugins.tooltip()
          ]
        });
        
        // Listening for draw events that get emitted by the Chartist chart
        chart.on('draw', function(data) {
          // If the draw event was triggered from drawing a point on the line chart
          if(data.type === 'point') {
            // We are creating a new path SVG element that draws a triangle around the point coordinates
            var triangle = new Chartist.Svg('path', {
              d: ['M',
                data.x,
                data.y - 10,
                'L',
                data.x - 10,
                data.y + 8,
                'L',
                data.x + 10,
                data.y + 8,
                'z'].join(' '),
              style: 'fill-opacity: 1'
            }, 'ct-area');
        
            // With data.element we get the Chartist SVG wrapper and we can replace the original point drawn by Chartist with our newly created triangle
            data.element.replace(triangle);
          }
      });
    }

    if($('.ct-chart-4').length) {
      // Chart 4
      new Chartist.Line('.ct-chart-4', {
        labels: ['2004', '2006', '2008', '2010', '2012', '2014', '2016'],
        series: [
          [-0, -100, -400, -600, -800, -1000, -1200]
        ]
      }, {
        fullWidth: true,
        chartPadding: {
          right: 40
        },
        plugins: [
          Chartist.plugins.tooltip()
        ]
      });
    }

    if($('.ct-chart-5').length) {
      //Chart 5
        new Chartist.Line('.ct-chart-5', {
          labels: [1995, 2000, 2005, 2010, 2015, 2020],
          series: [
            [0.25, 1, 1.7, 2.5, 3, 3.3]
          ]
        }, {
          low: 0,
          showArea: true,
          plugins: [
            Chartist.plugins.tooltip()
          ]
      });
    }

    // Charts that are hidden first fix
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $(e.currentTarget.hash).find('.ct-chart-3, .ct-chart, .ct-chart-2, .ct-chart-4, .ct-chart-5').each(function(el, tab) {
          tab.__chartist__.update();
        });
    })

    //Smooth scroll
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500,
        speedAsDuration: true
    });

    // Equalize height to the max of the elements
    if ($(document).width() >= breakpoints.lg) {

        // object to keep track of id's and jQuery elements
        var equalize = {
            uniqueIds: [],
            elements: []
        };

        // identify all unique id's
        $('[data-equalize-height]').each(function () {
            var id = $(this).attr('data-equalize-height');
            if (!equalize.uniqueIds.includes(id)) {
                equalize.uniqueIds.push(id)
                equalize.elements.push({ id: id, elements: [] });
            }
        });

        // add elements in order
        $('[data-equalize-height]').each(function () {
            var $el = $(this);
            var id = $el.attr('data-equalize-height');
            equalize.elements.map(function (elements) {
                if (elements.id === id) {
                    elements.elements.push($el);
                }
            });
        });

        // equalize
        equalize.elements.map(function (elements) {
            var elements = elements.elements;
            if (elements.length) {
                var maxHeight = 0;

                // determine the larget height
                elements.map(function ($element) {
                    maxHeight = maxHeight < $element.outerHeight() ? $element.outerHeight() : maxHeight;
                });

                // make all elements with the same [data-equalize-height] value
                // equal the larget height
                elements.map(function ($element) {
                    $element.height(maxHeight);
                })
            }
        });
    }

    // update target element content to match number of characters
    $('[data-bind-characters-target]').each(function () {
        var $text = $($(this).attr('data-bind-characters-target'));
        var maxCharacters = parseInt($(this).attr('maxlength'));
        $text.text(maxCharacters);

        $(this).on('keyup change', function (e) {
            var string = $(this).val();
            var characters = string.length;
            var charactersRemaining = maxCharacters - characters;
            $text.text(charactersRemaining);
        })
    });

    // before & after photo
    var dragging = false,
    scrolling = false,
    resizing = false;
    //cache jQuery objects
    var imageComparisonContainers = $('.image-container');
    //check if the .cd-image-container is in the viewport 
    //if yes, animate it
    checkPosition(imageComparisonContainers);
    $(window).on('scroll', function(){
        if( !scrolling) {
            scrolling =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkPosition(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkPosition(imageComparisonContainers);});
        }
    });

    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    imageComparisonContainers.each(function(){
        var actual = $(this);
        drags(actual.find('.handle'), actual.find('.resize-img'), actual, actual.find('.image-label[data-type="original"]'), actual.find('.image-label[data-type="modified"]'));
    });

    //upadate images label visibility
    $(window).on('resize', function(){
        if( !resizing) {
            resizing =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkLabel(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkLabel(imageComparisonContainers);});
        }
    });

    function checkPosition(container) {
        container.each(function(){
            var actualContainer = $(this);
            if( $(window).scrollTop() + $(window).height()*0.5 > actualContainer.offset().top) {
                actualContainer.addClass('is-visible');
            }
        });

        scrolling = false;
    }

    function checkLabel(container) {
        container.each(function(){
            var actual = $(this);
            updateLabel(actual.find('.image-label[data-type="modified"]'), actual.find('.resize-img'), 'left');
            updateLabel(actual.find('.image-label[data-type="original"]'), actual.find('.resize-img'), 'right');
        });

        resizing = false;
    }

    //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function(e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;
            
            dragElement.parents().on("mousemove vmousemove", function(e) {
                if( !dragging) {
                    dragging =  true;
                    ( !window.requestAnimationFrame )
                        ? setTimeout(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);}, 100)
                        : requestAnimationFrame(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);});
                }
            }).on("mouseup vmouseup", function(e){
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function(e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;   
        //constrain the draggable element to move inside his container
        if(leftValue < minLeft ) {
            leftValue = minLeft;
        } else if ( leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        
        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue); 

        updateLabel(labelResizeElement, resizeElement, 'left');
        updateLabel(labelContainer, resizeElement, 'right');
        dragging =  false;
    }

    function updateLabel(label, resizeElement, position) {
        if(position == 'left') {
            ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        } else {
            ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        }
    }

    // copy docs
    $('.copy-docs').on('click', function () {
        var $copy = $(this);
        var htmlEntities = $copy.parents('.nav-wrapper').siblings('.card').find('.tab-pane:last-of-type').html();
        var htmlDecoded = $('<div/>').html(htmlEntities).text().trim();

        var $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(htmlDecoded).select();
        document.execCommand('copy');
        $temp.remove();

        $copy.text('Copied!');
        $copy.addClass('copied');

        setTimeout(function () {
            $copy.text('Copy');
            $copy.removeClass('copied');
        }, 1000);
    });

    $('#loadOnClick').click(function() {
          var $button = $(this);
          var $loadContent = $('#extraContent');
          var $allLoaded = $('#allLoadedText');
          $button.addClass('btn-loading');
          $button.attr('disabled', true);

          setTimeout(function() {
              $loadContent.show();
              $button.hide();
              $allLoaded.show();
          }, 1500);
    });

    if($('#vmap').length) {
        $('#vmap').vectorMap(
          {
              map: 'world_en',
              backgroundColor: '#ffffff',
              borderColor: '#ffffff',
              borderOpacity: 0,
              borderWidth: 1,
              color: '#e9ecef',
              enableZoom: false,
              hoverColor: '#11AB7C',
              hoverOpacity: null,
              normalizeFunction: 'linear',
              scaleColors: ['#b6d6ff', '#005ace'],
              selectedColor: '#11AB7C',
              selectedRegions: null,
              showTooltip: true,
              onLabelShow: function(event, label, code)
              {
                switch(code) {
                  case 'au':
                    label.text('Australia: $283.26m');
                    break;
                  case 'ca':
                    label.text('Canada: $277.03m');
                    break;
                  case 'fr':
                    label.text('France: $136.17m');
                    break;
                  case 'de':
                    label.text('Germany: $680.67m');
                    break;
                  case 'jp':
                    label.text('Japan: $1,234.14m');
                    break;
                  case 'us':
                    label.text('United States: $2,000.04m');
                    break;
                  case 'gb':
                    label.text('United Kingdom: $2,830.80m');
                    break;
                  case 'ru':
                    label.text('Russia: $830.80m');
                    break;
                  case 'cn':
                    label.text('China: $830.80t');
                    break;
                  default:
                    label.text('No data');
                }
              }
          });
    }
    
    $('.current-year').text(new Date().getFullYear());

});   
