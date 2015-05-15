$(function () {

    var r = Raphael('map', 1200, 820),
        defaults = {
            fill: '#cccccc',
            stroke: '#fff',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        },
        arr = [],
        attributes;

    for (var country in paths) {
        var obj = r.path(paths[country].path);
        attributes = $.extend({}, defaults, paths[country].attribs || {}); // override default values with attribs, if present
        obj.attr(attributes);
        arr[obj.id] = country;

        obj.hover(function () {
            this.animate({
                fill: '#1669AD'
            }, 300);
        }, function () {
            this.animate({
                fill: attributes.fill
            }, 300);
        })
        .click(function () {
            document.location.hash = arr[this.id];

            var point = this.getBBox(0),
                map = $('#map');

            map.next('.point').remove();
            map.after($('<div />').addClass('point'));

            $('.point')
                .html(paths[arr[this.id]].name)
                .prepend($('<a />').attr('href', '#').addClass('close').text('Close'))
                .prepend($('<img />').attr('src', 'flags/' + arr[this.id] + '.png'))
                .css({
                    left: point.x + (point.width / 2) - 80,
                    top: point.y + (point.height / 2) - 20
                })
                .fadeIn();
        });

        $('.point').find('.close').live('click', function () {
            var t = $(this),
                parent = t.parent('.point');

            parent.fadeOut(function () {
                parent.remove();
            });
            return false;
        });
    }
});
