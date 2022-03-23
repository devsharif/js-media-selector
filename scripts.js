jQuery(function ($) {
    let sort = 1;
    $('.image-checkbox').each(function () {
        $(this).attr('jms-sort', sort);
        sort++;
    });

    var mediaArray = [];
    var selectedMediasId;
    var isMultipleAllowed = false;
    var prevItem = null;
    $('#allowmultiple').click(function () {
        isMultipleAllowed = $('#allowmultiple').is(':checked') ? true : false;
        $('.image-checkbox-checked').each(function () {
            $(this).removeClass('image-checkbox-checked');
        });
        mediaArray = [];
        $('#selectedmediapreview').html('');
        prevItem = null;
    });


    $(".image-checkbox").on("click", function (e) {
        var selected = $(this).find('img').attr('su-media-id');

        if ($(this).hasClass('image-checkbox-checked')) {
            $(this).removeClass('image-checkbox-checked');
            // remove deselected item from array
            mediaArray = $.grep(mediaArray, function (value) {
                return value != selected;
            });
        }
        else {
            if (isMultipleAllowed == false) {
                $('.image-checkbox-checked').each(function () {
                    $(this).removeClass('image-checkbox-checked');
                });
                mediaArray = [];
                mediaArray.push(selected);
            } else {
                if (e.shiftKey) { //Shift+Ctrl key event
                    var psort = $(prevItem).attr('jms-sort');
                    var nsort = $(this).attr('jms-sort');
                    var d = 0;
                    console.log(psort);
                    if (psort !== 'undefined') {
                        d = nsort - psort;
                    };
                    if (d < 0) {
                        $(prevItem).prevUntil(this).each(function () {
                            $(this).addClass('image-checkbox-checked');
                        });
                    } else {
                        $(prevItem).nextUntil(this).each(function () {
                            $(this).addClass('image-checkbox-checked');
                        });
                    }
                }
            }
            $(this).addClass('image-checkbox-checked');
            prevItem = $(this);
            mediaArray = [];
            $('.image-checkbox-checked').each(function () {
                mediaArray.push(($(this).find('img').attr('su-media-id')));
            });
        }
        //console.log(selected);
        console.log(mediaArray);
        selectedMediasId = mediaArray.join(",");
        console.log(selectedMediasId);
        $('#selectedmediapreview').html('<div class="alert alert-success"><pre lang="js">' + JSON.stringify(mediaArray.join(", "), null, 4) + '</pre></div>');
        //console.log(isMultipleAllowed);
        e.preventDefault();
    });

});