﻿'use strict';

angular.module('psTweetService').directive('psTweetFilter', [
    'psTweetService',
    function (psTweetService) {
        return {

            templateUrl: 'ext-modules/psTweetFilter/psTweetFilterTemplate.html',
            link: function (scope, el, attrs) {
                scope.filter = '';
                scope.messages = [];
                scope.newMessages = 0;
                scope.autoscroll = true;
                scope.$on('psTweetService-received-tweet-event', function (evt, msg) {
                    if (msg.text.indexOf(scope.filter) >= 0) {
                        scope.messages.push(msg);
                        ++scope.newMessages;
                    }   
                });

                el.find('div').scroll(function (event, data) {
                    if (this.scrollTop < this.scrollHeight - $(this).height())
                        scope.autoscroll = false;
                    else
                        scope.autoscroll = true;
                });

                setInterval(function () {
                    if (scope.newMessages) {
                        scope.$apply();
                        scope.newMessages = 0;

                        if (scope.autoscroll)
                            el.find('div')[0].scrollTop = el.find('div')[0].scrollHeight;
                    }
                }, 500);

                if (scope.item.widgetSettings.filter)
                    scope.filter = scope.item.widgetSettings.filter;

                scope.$on('twitter-filter-changed', function (evt, newFilter) {
                    scope.filter = newFilter;
                });
            }
        };
    }]);