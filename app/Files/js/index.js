$(document).ready(function() {
  "use strict";
  
  var callbacks = {
    onSwitchPageToContainer: function() {
      $(this).animate({width: '-=60', height: '-=60'}, 200, function() {
        $(this).addClass('hidden');
        $('#talents-container').removeClass('hidden');
        $('#talents-container').animate({width: '100%', height: '100%', padding: '+=10'}, 200);
      });
    },
    
    onLeaveContainer: function() {
      $('#talents-container').animate({width: '0', height: '0', padding: '-=10'}, 200, function() {
        $('#talents-container').addClass('hidden');
        $('#minimized').removeClass('hidden');
        $('#minimized').animate({width: '+=60', height: '+=60'}, 200, function() {
          
        });
      });
    }
  };
  
  $('#minimized').click(callbacks.onSwitchPageToContainer);
  $('#talents-container').mouseleave(callbacks.onLeaveContainer);
  
});