'use strict';

(function($){
    $(document).ready( function(){

        var docHash = location.hash;
        var panels = $('[data-toggle=tab]');

        [].forEach.call(panels, function(el,i) {

            //console.log(el.href);
            var thisHash = el.href.substr(el.href.indexOf('#'));
            console.log(thisHash);

            if (thisHash == docHash) {
                hideAllTabs();
                $(docHash).tab('show');
                $(el).addClass('active');
            }
        });

        $('.user-profile-dropdown a').on('click', function(ev){
            console.log($(this).attr('href'));
            window.location.href = $(this).attr('href');
            location.reload(true);
        });



        function hideAllTabs(){
            var panels = $('[data-toggle=tab]');
            var tabs = $('.tab-pane');

            [].forEach.call(panels, function(el,i) {

                var thisHash = el.href.substr(el.href.indexOf('#'));
                console.log(thisHash);
                $(el).removeClass('active');
                $(thisHash).removeClass('active');

            });

            //[].forEach.call(tabs, function(el,i) {
            //    $(el).removeClass('active');
            //});

        };



        $('.search-form-header').removeClass('waves-effect');

        $(window).on("scroll", function() {
            var fromTop = $("body").scrollTop();

            if (fromTop >=50) {
                console.log(fromTop);
                console.log($('.left-settings').offset());
                $('.left-settings').addClass('_up');
                //$('.left-settings').css('top', 0);
            } else {
                //$('.left-settings').css('top', 'auto');
                $('.left-settings').removeClass('_up');
            }

            //$('body').toggleClass("down", (fromTop > 200));
        });

        console.log($('#qCardsGrid'));
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
            console.log($('#questionFollowers .user-card'));
            var fQ = $('#questionFollowers .user-card').length;
            console.log(fQ);
            if (fQ <= 8) {
                $('.user-cards-list.modal-view').css('overflowY', 'hidden');
            } else {
                $('.user-cards-list.modal-view').css('overflowY', 'scroll');
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

        var telInp = $('#phoneNum');
        console.log();
        if (telInp && telInp.length) {
            telInp.intlTelInput({
                utilsScript: 'js/intl-tel-input-master/utils.js'
            });
        }


        $('#filePhoto').change(function(ev){
            console.log($(this)[0].files[0]);
            console.log($(this)[0].files);
            if ($(this)[0].files && $(this)[0].files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('.user-img img').eq(0).attr('src', e.target.result);
                    //console.log(e.target.result);
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


        //setTimeout(function(){
        //    $('.cards-answers').masonry({
        //        itemSelector: ".question-card",
        //        //columnWidth: ".q-cards-sizer",
        //        gutter: 0,
        //        percentPosition: true,
        //        transitionDuration: '0.2s',
        //        stagger: 30
        //    });
        //}, 1000);

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
            console.log($(this).closest('.answer-btns'));
            $(this).closest('.answer-btns').next('.request-dropdown').slideToggle();
        });

        $('#answerModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var recipient = button.data('title'); // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this);
            modal.find('.modal-title').text(recipient);

            recipient = button.data('answer');
            console.log(button.data('answer'));
            modal.find('#answerType').text(recipient);
            //modal.find('.modal-body input').val(recipient)
        });

        $('#answerModalUrl').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var recipient = button.data('title'); // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this);
            modal.find('.modal-title').text(recipient);

            recipient = button.data('answer');
            console.log(button.data('answer'));
            modal.find('#answerType').text(recipient);
            //modal.find('.modal-body input').val(recipient)
        });

        $('#answerModal1').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var recipient = button.data('title'); // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this);
            modal.find('.modal-title').text(recipient);

            recipient = button.data('answer');
            console.log(button.data('answer'));
            modal.find('#answerType1').text(recipient);
            //modal.find('.modal-body input').val(recipient)
        });

        $('#chooseAnswer').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var recipient = button.data('title'); // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this);
            //modal.find('.modal-title').text(recipient);


            //modal.find('.modal-body input').val(recipient)
        });

        $('#mainSearch').on('keyup', function(event){
            if (event.keyCode == 13) {
                mainSearchSubmit();
                return false;
            }
            if($(this).val().length>2){
                var keyword=$(this).val();
                var keyPreg=new RegExp(keyword,'gi');
                $(this).parent().find('.search-tooltip').show();
                $.get( "/ajax/search/?s="+$(this).val(), function( data ) {
                    if(data.results.topics!=undefined && data.results.topics!=undefined && data.results.topics!=undefined){
                        $('.search-tooltip').html('');
                        var html='';
                        if(data.results.questions.length>0){
                            html=$('.search-tooltip').html();
                            data.results.questions.forEach(function(item) {
                                var itemClass = item.answerCount>0?'search-item-found':'search-item-found-parts';
                                console.log("ac: "+item.answerCount);
                                console.log("acs: "+itemClass);
                                item.text=item.text.replace(keyPreg,function (val){return '<span class="search-matched">'+val+'</span>';});
                                var topics='';
                                item.topics.forEach(function(topic) {
                                    if(topics.length>0){
                                        topics+=', '+topic.title;
                                    } else {
                                        topics+='Topics: '+topic.title;
                                    }
                                });
                                $('.search-tooltip').html(html+'<a href="/ask/'+item.slug+'" class="'+itemClass+' s-item"><span>'+item.text+'</span><span class="related-topic-item">'+topics+'</span></a>');
                                html=$('.search-tooltip').html();
                            });
                        } else if(data.results.topics.length>0){
                            html=$('.search-tooltip').html();
                            data.results.topics.forEach(function(item) {
                                $('.search-tooltip').html(html+'<a href="/topic/'+item.slug+'" class="related-topic-item s-item">'+item.title+'</a>');
                                html=$('.search-tooltip').html();
                            });
                        } else {
                            $('.search-tooltip').html(html+'<p class="tooltip-nores s-item">No results, try to find your question in the topics or add the new one</p>');
                        }
                    }
                });
            } else {
                $(this).parent().find('.search-tooltip').hide();
                $('.search-tooltip').html('');
            }
            return false;
        });

        $('#position').on('keyup', function(ev){
            console.log($(this).next('#positionTooltip'));
            if ($(this).val().length) {
                $(this).next('#positionTooltip').show();
            } else {
                $(this).next('#positionTooltip').hide();
            }

        });

        $('#position1').on('keyup', function(ev){
            console.log($(this).next('#positionTooltip1'));
            if ($(this).val().length) {
                $(this).next('#positionTooltip1').show();
            } else {
                $(this).next('#positionTooltip1').hide();
            }

        });

        //$('#searchInput').on('keyup', function(ev){
        //    console.log($(this).parent().find('.search-tooltip'));
        //    if ($(this).val().length) {
        //        $(this).parent().find('.search-tooltip').show();
        //    } else {
        //        $(this).parent().find('.search-tooltip').hide();
        //    }
        //
        //});

        $('#mainSearch').on('blur', function(ev) {
            console.log(ev);
            if (ev.relatedTarget && ev.relatedTarget.tagName != 'A') {
                $(this).parent().find('.search-tooltip').hide();
                $('.search-tooltip').html('');
            }

        });

        $('#mainSearchBtn').on('click', function(ev){
            mainSearchSubmit();
        });

        function mainSearchSubmit(){
            if($('#mainSearch').val().length>0){
                $.get("/ajax/newquestion/?q="+$('#mainSearch').val(),function(data){
                    $('#questionInput').val($('#mainSearch').val());
                    //  $('#questionInputSpan').val($('#mainSearch').val());
                    $('#questionInputSpan').text($('#mainSearch').val())
                    $('#QuestionFormHiddenValue').val($('#mainSearch').val());


                    showAsk();



                });
            };
        };

        $('#searchInput').on('blur', function(ev) {
            console.log(ev);
            if (ev.relatedTarget && ev.relatedTarget.tagName != 'A') {
                $(this).parent().find('.search-tooltip').hide();
            }

        });

        $('#sendFile').on('click', function(ev) {
            // todo: ������� ������ � ����� � ��������� �� ���, ����� ��������� ��� ���� ��� �������� ��������
            $(this).closest('.modal').modal('hide');
            $('#mediaModal').modal('show');
        });

        $('#sendMediaUrl').on('click', function(ev) {
            // todo: ������� ������ � ����� � ��������� �� ���, ����� ��������� ��� ���� ��� �������� ��������
            $(this).closest('.modal').modal('hide');
            $('#mediaVideoModal').modal('show');
        });

        $('.reply-comment').on('click', function(ev){
            ev.preventDefault();
            var authorName = $(this).closest('.comment-item').find('.comment-uname a').html();
            $('#commentInput').val('@' + authorName + ': ').focus();
        });

        $(document).on('click', function(ev){
            console.log(ev);
            var elem = $('#mainSearch');
            var searchTooltip = $('.search-tooltip');

            var position = $('#position');
            var positionTooltip = $('#positionTooltip');

            var position1 = $('#position1');
            var positionTooltip1 = $('#positionTooltip1');

            var uAvatar = $('#uAvatar');
            var uMenuDropdown = $('.user-profile-dropdown');

            var uNotif = $('#uNotifications');
            var uNotifDropdown = $('.user-notifications-dropdown');



            if (elem[0] && searchTooltip[0] && elem != ev.target
                && !elem[0].contains(ev.target)
                && searchTooltip != ev.target
                && !searchTooltip[0].contains(ev.target)) {
                searchTooltip.hide();
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
        });


    });
})(jQuery);
