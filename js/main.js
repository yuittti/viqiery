'use strict';

(function($){
    $(document).ready( function(){

        // Masonry cards' grid init
        // -----------------
        setTimeout(function(){
            $('#qCardsGrid').masonry({
                itemSelector: ".question-card",
                //columnWidth: ".q-cards-sizer",
                gutter: 0,
                percentPosition: true,
                transitionDuration: '0.2s',
                stagger: 30
            });
        }, 1000);
        // --- end masonry init

        // Custom Tabs functionality for Settings page
        // -------------------------------------------
        var docHash = location.hash,
            panels = $('[data-toggle=tab]');

        [].forEach.call(panels, function(el,i) {
            var thisHash = el.href.substr(el.href.indexOf('#'));
            if (thisHash == docHash) {
                hideAllTabs();
                $(docHash).tab('show');
                $(el).addClass('active');
            }
        });

        // Settings tabs navigate from profile dropdown
        $('.user-profile-dropdown a').on('click', function(ev){
            window.location.href = $(this).attr('href');
            location.reload(true);
        });

        function hideAllTabs(){
            var panels = $('[data-toggle=tab]'),
                tabs = $('.tab-pane');

            [].forEach.call(panels, function(el,i) {
                var thisHash = el.href.substr(el.href.indexOf('#'));
                $(el).removeClass('active');
                $(thisHash).removeClass('active');
            });
        };

        // Sticky left tab menu in Settings
	    $(window).on("scroll", function() {
		    var fromTop = $("body").scrollTop();
		    if (fromTop >=60) {
			    $('.left-settings').addClass('_up');
		    } else {
			    $('.left-settings').removeClass('_up');
		    }
	    });

        // ---
        // end Custom Settings tabs

        // Modals
        // --------
        $('#answersTab').on('show.bs.tab', function (e) {
            $('#qCardsGrid1').css('opacity', '0');
            //$('#qCardsGrid1').masonry('destroy');
            setTimeout(function(){
                $('#qCardsGrid1').masonry({
                    itemSelector: ".question-card",
                    //columnWidth: ".q-cards-sizer",
                    gutter: 0,
                    percentPosition: true,
                    transitionDuration: '0.2s',
                    stagger: 30
                });
                $('#qCardsGrid1').css('opacity', '1');
            }, 1000);
        });

        $('#questionFollowers').on('show.bs.modal', function (e) {
	        var fQ = $('#questionFollowers .user-card').length,
                compare = (window.innerWidth > 767) ? 8 : 6;
	        if (fQ <= compare) {
		        $('.user-cards-list.modal-view').css('overflowY', 'hidden');
	        } else {
		        $('.user-cards-list.modal-view').css('overflowY', 'scroll');
	        }
        });

        $('.modal').on('shown.bs.modal', function(ev){
            if (!$('body').hasClass('modal-open')){
                $('body').addClass('modal-open');
            }
        });

        $('.modal').on('hidden.bs.modal', function(ev){
            if ($('body').hasClass('modal-open')){
                $('body').removeClass('modal-open');
            }
        });

        $('#questionsTab').on('show.bs.tab', function (e) {
            $('#qCardsGrid2').css('opacity', '0');
            //$('#qCardsGrid2').masonry('destroy');
            setTimeout(function(){
                $('#qCardsGrid2').masonry({
                    itemSelector: ".question-card",
                    //columnWidth: ".q-cards-sizer",
                    gutter: 0,
                    percentPosition: true,
                    transitionDuration: '0.2s',
                    stagger: 30
                });
                $('#qCardsGrid2').css('opacity', '1');
            }, 1000);
        });


        $('#sendSignUp').on('click', function(ev){
            // todo:
            // send ajax request on server for signup
            // after receiving success answer - evaluate next code to show modal with next step

            $('#signupModal').modal('hide');
            $('#signupModalStep2').modal('show');
        });

        $('#signupModal .subscription-card input').on('keydown', function(ev){
            var key = ev.keyCode;
            if (key == 13) {
                // todo:
                // send ajax request on server for signup
                // after receiving success answer - evaluate next code to show modal with next step
                $('#signupModal').modal('hide');
                $('#signupModalStep2').modal('show');
            }
        });

        $('#loginModal .subscription-card input').on('keydown', function(ev){
            var key = ev.keyCode;
            if (key == 13) {
                // todo:
                // send ajax request on server for login
                // after receiving success answer - evaluate next code to show modal with next step
                $('#loginModal').modal('hide');
            }
        });


        $('#installExtension').on('click', function(ev){
            // todo:
            // send ajax request on server for installing extension
            // after receiving success answer - evaluate next code to show modal with next step
            $('#signupModalStep2').modal('hide');
            $('#installModal').modal('show');
        });

        $('#changePass').on('click', function(ev){
            ev.preventDefault();
            $(this).next('.change-pass').slideToggle();
        });

        // Tel input with country code choose from list
        var telInp = $('#phoneNum');
        if (telInp && telInp.length) {
            telInp.intlTelInput({
                utilsScript: 'js/intl-tel-input-master/utils.js'
            });
        }


        $('#filePhoto').change(function(ev){
            if ($(this)[0].files && $(this)[0].files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.user-img img').eq(0).attr('src', e.target.result);
                }
                reader.readAsDataURL($(this)[0].files[0]);
                setTimeout(function(){
                    $('#changePhotoModal').modal('hide');
                },200)
            }
        });

        $('.right-settings input').on('focus', function(ev){
            $(this).removeClass('err');
            $(this).next('.validateErr').hide();
        });

        $('#settingsSaveBtn').click(function(ev){
           validateSettingsForm();
        });

	    $('.change-pass form button').click(function(ev){
		    validatePasswordForm();
	    });

        function validateSettingsForm(){
            var formFieldIds = ['name', 'username', 'email'];
            var valid = true;

            formFieldIds.forEach(function(el,i,arr){
                var elem = $('#'+el);
                if (!elem || !elem.val().length) {
                    elem.addClass('err');
                    elem.next('.validateErr').show();
                    valid = false;
                } else {
                    valid = true;
                }
            });

            if (!valid) {
                $('#errorModal').modal('show');

            } else {
                // todo: AJAX save goes HERE - after success do next code
                $('#saveSuccessModal').modal('show');
            }
        };

	    function validatePasswordForm(){
            var formFieldIds = ['oldPass', 'newPass', 'newPass1'];
            var valid = true;

            formFieldIds.forEach(function(el,i,arr){
                var elem = $('#'+el);
                if (!elem || !elem.val().length) {
                    elem.addClass('err');
                    elem.next('.validateErr').show();
                    valid = false;
                } else {
                    valid = true;
                }
            });
        };

        // User events handlers
        // --------------------

        $('.burger-btn').on('click', function(ev){
            $('body').toggleClass('menu-opened');
        });

        $('.author-more').on('click', function(ev){
            $(this).next('.author-more-info').slideToggle();
            if ($(this).text() == 'Hide') {
                $(this).text('More...');
            } else {
                $(this).text('Hide');
            }
        });

        $('.comments-counter').on('click', function(ev){
            ev.preventDefault();
            $(this).next('.comments-hidden').slideToggle();
        });

        $('.request-btn').on('click', function(ev){
            ev.preventDefault();
            $(this).closest('.answer-btns').next('.request-dropdown').slideToggle();
        });

        $('#answerModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget),
                recipient = button.data('title'),
                modal = $(this);
            modal.find('.modal-title').text(recipient);

	        recipient = button.data('answer');
	        modal.find('#answerType').text(recipient);
        });

        $('#answerModalRec').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget),
                recipient = button.data('title'),
                modal = $(this);
            modal.find('.modal-title').text(recipient);
	        recipient = button.data('answer');
	        modal.find('#answerType').text(recipient);
        });

        $('#answerModalUrl').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget),
                recipient = button.data('title'),
                modal = $(this);
            modal.find('.modal-title').text(recipient);
	        recipient = button.data('answer');
	        modal.find('#answerType').text(recipient);
        });

        $('#answerModal1').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget),
                recipient = button.data('title'),
                modal = $(this);
            modal.find('.modal-title').text(recipient);
	        recipient = button.data('answer');
	        modal.find('#answerType1').text(recipient);
        });

        $('#chooseAnswer').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget),
                recipient = button.data('title'),
                modal = $(this);
            //modal.find('.modal-title').text(recipient);
            //modal.find('.modal-body input').val(recipient)
        });

        $('#loginModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget),
                recipient = button.data('title'),
                modal = $(this);
            if (recipient && recipient.length) {
                modal.find('.modal-title').text(recipient);
            } else {
                modal.find('.modal-title').text('Sign up or login here');
            }
        });

        $('#mainSearch').on('keyup', function(ev){
            if ($(this).val().length) {
                $(this).parent().find('.search-tooltip').show();
            } else {
                $(this).parent().find('.search-tooltip').hide();
            }
        });

        $('#position').on('keyup', function(ev){
            if ($(this).val().length) {
	            $(this).next('#positionTooltip').show();
            } else {
	            $(this).next('#positionTooltip').hide();
            }
        });

        $('#position1').on('keyup', function(ev){
            if ($(this).val().length) {
	            $(this).next('#positionTooltip1').show();
            } else {
	            $(this).next('#positionTooltip1').hide();
            }
        });

        $('#mainSearch').on('blur', function(ev) {
            if (ev.relatedTarget && ev.relatedTarget.tagName != 'A') {
                $(this).parent().find('.search-tooltip').hide();
            }
        });



        $('#mainSearch').on('keydown', function(ev){
            var key = ev.keyCode,
                $p = $(this).closest('.main-search-form'),
                $dropDown = $p.find('.search-tooltip').eq(0),
                $ddElems = $dropDown.find('a'),
                curEl = 0,
                choosedLink = '';

            switch (key) {
                case 13:
                    curEl = findHovered($ddElems);
                    if (curEl != -1) {
                        ev.preventDefault();
                        choosedLink = $($ddElems[curEl]).attr('href');
                        if (choosedLink.length) {
                            window.location.href = choosedLink;
                            //location.reload(true);
                        }
                    }
                    break;
                case 38:
                    // up
                    if ($ddElems.length) {
                        curEl = findHovered($ddElems);
                        if (curEl == -1) {
                            curEl = $ddElems.length - 1;
                        } else {
                            $ddElems.removeClass('_hovered');
                            if (curEl+1 <= $ddElems.length) {
                                --curEl;
                            }
                        }
                        $($ddElems[curEl]).addClass('_hovered');
                    }
                    break;
                case 40:
                    if ($ddElems.length) {
                        curEl = findHovered($ddElems);
                        if (curEl == -1) {
                            curEl = 0;
                        } else {
                            $ddElems.removeClass('_hovered');
                            if (curEl+1 <= $ddElems.length) {
                                ++curEl;
                            }
                        }
                        $($ddElems[curEl]).addClass('_hovered');
                    }
                    break;
            }
        });

        function findHovered (elemsArr) {
            for (var i=0; i < elemsArr.length; i++) {
                var elem = elemsArr[i];
                if ($(elem).hasClass('_hovered')) {
                    return i;
                }
            }
            return -1;
        };

        $('#searchInput').on('blur', function(ev) {
            if (ev.relatedTarget && ev.relatedTarget.tagName != 'A') {
                //$(this).parent().find('.search-tooltip').hide();
                //console.log($('.main-search-form .search-tooltip a'));
                //$('.main-search-form .search-tooltip a').removeClass('_hovered');
            }
        });

        $('#sendFile').on('click', function(ev) {
            var type = $(this).data('type');
            $(this).closest('.modal').modal('hide');
            if (type && type == 'video-upload') {
                $('#mediaVideoModal').modal('show');
            } else {
                $('#mediaModal').modal('show');
            }
        });

        $('#sendMediaUrl').on('click', function(ev) {
            $(this).closest('.modal').modal('hide');
            $('#mediaVideoModal').modal('show');
        });

        $('.reply-comment').on('click', function(ev){
            ev.preventDefault();
            var authorName = $(this).closest('.comment-item').find('.comment-uname a').html();
            $('#commentInput').val('@' + authorName + ': ').focus();
        });

        $('#mobBtn').on('click', function(ev) {
            ev.preventDefault();
            $('body').toggleClass('mob-menu-opened');
        });

        $(document).on('click', function(ev){
            var elem = $('#mainSearch'),
                searchTooltip = $('.main-search-form .search-tooltip'),
                position = $('#position'),
                positionTooltip = $('#positionTooltip'),
                position1 = $('#position1'),
                positionTooltip1 = $('#positionTooltip1'),
                uAvatar = $('#uAvatar'),
                uMenuDropdown = $('.user-profile-dropdown'),
                uNotif = $('#uNotifications'),
                uNotifDropdown = $('.user-notifications-dropdown');

            if (elem[0] && searchTooltip[0] && elem != ev.target
                    && !elem[0].contains(ev.target)
                    && searchTooltip != ev.target
                    && !searchTooltip[0].contains(ev.target)) {
                searchTooltip.hide()
                $('.main-search-form .search-tooltip a').removeClass('_hovered');
            }

            if (position[0] && positionTooltip[0] && position != ev.target
                    && !position[0].contains(ev.target)
                    && positionTooltip != ev.target
                    && !positionTooltip[0].contains(ev.target)) {
                positionTooltip.hide();
            }

            if (position1[0] && positionTooltip1[0] && position1 != ev.target
                    && !position1[0].contains(ev.target)
                    && positionTooltip1 != ev.target
                    && !positionTooltip1[0].contains(ev.target)) {
                positionTooltip1.hide();
            }

            if (uAvatar[0] && uMenuDropdown[0] && uAvatar != ev.target
                    && !uAvatar[0].contains(ev.target)
                    && uMenuDropdown != ev.target
                    && !uMenuDropdown[0].contains(ev.target)) {
                uMenuDropdown.hide();
            }

            if (uNotif[0] && uNotifDropdown[0] && uNotif != ev.target
                    && !uNotif[0].contains(ev.target)
                    && uNotifDropdown != ev.target
                    && !uNotifDropdown[0].contains(ev.target)) {
                uNotifDropdown.hide();
                uNotifDropdown.removeClass('notify-opened');
            }
        });

        $('#positionTooltip .position-item a').on('click', function(ev){
           $('#position').val($(this).find('.position-area').eq(0).text());
            $('#positionTooltip').hide();
        });

        $('#positionTooltip1 .position-item a').on('click', function(ev){
           $('#position1').val($(this).find('.position-area').eq(0).text());
            $('#positionTooltip1').hide();
        });

        $('.user-notifications-dropdown a').on('mouseout', function(ev){
           var self = $(this);
           setTimeout(function(){
               self.addClass('notifications-viewed');
           }, 100);
        });

        $('#comingSoonForm').on('submit', function(ev){
            ev.preventDefault();
            var uMail = $(this).find('input').val();
            if (uMail && uMail.length) {
                $.ajax({
                    type: "post",
                    url: "file.php",
                    data: {'email': uMail},
                    // dataType: "text",
                    success: function(data){
                        //alert(data);
                        if (data == -1) {
                            $('.splash-slogan h2').text('Your email is already stored!');
                            $('#comingSoonForm').hide();
                        } else if (data == 1) {
                            $('.splash-slogan h2').text('Thank you! we will send you invitation soon!');
                            $('#comingSoonForm').hide();
                        } else {
                            alert("An error has occured, please try later");
                        }
                    },
                    error: function(xhr, str){
                        alert("An error has occured, try later: \n"+xhr.responseCode);
                    }
                });
            }
        });

        $('#editQuestion').on('click', function(ev){
            ev.preventDefault();
            $('#questionInput').val($('#questionTitle span').text());
            $('#questionForm').fadeIn();
            $('#questionTitle').hide();
	        $('#searchForm1').hide();
            $('#questionInput').focus();
        });

        $('#questionForm').on('submit', function(ev){
            ev.preventDefault();
            $('#questionTitle span').text($('#questionInput').val());
            $('#questionForm').hide();
            $('#questionTitle').fadeIn();
	        $('#searchForm1').fadeIn();
        });

        $('#questionInput').on('keydown', function(ev){
            if (ev.keyCode === 27){
                $('#questionForm').hide();
                $('#questionTitle').fadeIn();
	            $('#searchForm1').fadeIn();
            }
        });

        $('#editQuestion1').on('click', function(ev){
            ev.preventDefault();
            $('#questionInput1').val($('#questionTitle1 span').text());
            $('#questionForm1').fadeIn();
            $('#questionTitle1').hide();
	        $('#searchForm1').hide();
            $('#questionInput1').focus();
        });

        $('#questionForm1').on('submit', function(ev){
            ev.preventDefault();
            $('#questionTitle1 span').text($('#questionInput1').val());
            $('#questionForm1').hide();
            $('#questionTitle1').fadeIn();
	        $('#searchForm1').fadeIn();
        });

        $('#questionInput1').on('keydown', function(ev){
            if (ev.keyCode === 27){
                $('#questionForm1').hide();
                $('#questionTitle1').fadeIn();
	            $('#searchForm1').fadeIn();
            }
        });

        $('#moreTopics').on('click', function(ev){
            ev.preventDefault();
            $(this).prev('#hiddenTopics').slideToggle();
            $(this).toggleClass('topics-opened');
            if ($(this).hasClass('topics-opened')) {
                $(this).text('Show only most relevant topics');
            } else {
                $(this).text('Show more topics');
            }
        });

        // Strange fix for mdb
        $('.search-form-header').removeClass('waves-effect');

        $('#uAvatar').on('click', function(ev){
           ev.preventDefault();
            $(this).next('.user-profile-dropdown').fadeToggle();
        });

        $('#uNotifications').on('click', function(ev){
            ev.preventDefault();
            $(this).next('.user-notifications-dropdown').fadeToggle();
            $(this).next('.user-notifications-dropdown').toggleClass('notify-opened');
            if ($('.user-notifications-dropdown').hasClass('notify-opened')) {
                var h = $('.user-notifications-dropdown').height();
                var h1 = $('.user-notifications-dropdown > ul').height();
                if (h1 > h) {
                    $('.user-notifications-dropdown').css({'overflowY':'scroll', 'padding-right': '10px'});
                    $('.user-notifications-dropdown > ul').css({'marginRight':'-10px'});
                } else {
                    $('.user-notifications-dropdown').css({'marginRight': '0'});
                }
            }
        });

        $('#chooseTopicInput').on('keyup', function(ev){
            console.log($(this).val());
           if ($(this).val().length >= 3) {
               // todo: check if such or very similar topic exists - if true - evaluate next code
               // todo: ... to show same or similar topics (max 5)
               // if (response == success) {
               $('#existingTopics').show();
               $('#newTopicDesc').hide();
               $('#topicTypeBlock').hide();
               $('#newTopicBtns').hide();
               $('#newTopicInvite').hide();
               // } else {
               // $('#existingTopics').hide();
               // $('#newTopicBtns').show();
               // $('#newTopicInvite').show();
               // }
           } else {
               $('#existingTopics').hide();
               $('#newTopicDesc').show();
               $('#topicTypeBlock').show();
               $('#newTopicBtns').show();
               $('#newTopicInvite').show();
           }
        });

        $('#closeExistingTopics').on('click',function(ev){
            $('#existingTopics').hide();
            $('#newTopicDesc').show();
            $('#topicTypeBlock').show();
            $('#newTopicBtns').show();
            $('#newTopicInvite').show();
        });

        $('#searchMobBtn').on('click', function(ev){
            $(this).toggleClass('search-opened');
            $('.mid-nav').fadeToggle();
            $('body').removeClass('mob-menu-opened');
        });

        $(document).on('click', function(ev){
            //ev.preventDefault();
            var sBtn = $('#searchMobBtn');
            var midNav = $('.mid-nav');

            if (sBtn.hasClass('search-opened') && sBtn[0] && midNav[0] && sBtn != ev.target
                && !sBtn[0].contains(ev.target)
                && midNav != ev.target
                && !midNav[0].contains(ev.target)) {
                midNav.hide();
                sBtn.removeClass('search-opened');
            }
        });
    });
})(jQuery);
