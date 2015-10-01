$(document).ready(function() {
  "use strict";
  
  var talentData;
  
  var selectedHero = "";
  
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
    },
    
    onSelectHero: function(e) {
      if ($(this).val() !== 'none') { 
        selectedHero = makeStringSafe($(this).val());
        window.localStorage.setItem('selectedHero', selectedHero);
        buildHeroTalentsDOM();
      }
      else {
        console.log('Reset display');
        window.localStorage.removeItem('selectedHero');
        $('#popularity').empty();
        $('#winrate').empty();
      }
    }
  };
  
  function makeStringSafe(str) {
    var t = replaceAll(str, ' ', '');
    t = replaceAll(t, "'", '');
    t = replaceAll(t, ".", '');
    return t;
  }
  
  function escapeRegExp(string) {
      return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  
  function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }
  
  function checkSavedPrefs() {
    var sh = window.localStorage.getItem('selectedHero');
    if (sh !== null) {
      $('#heroSelect').val(sh);
      selectedHero = sh;
      buildHeroTalentsDOM();
    }
  }
  
  function startUp() {
    var lastTime = window.localStorage.getItem('lastCheckForUpdate');
    if ( lastTime !== null) {
      //Check how much time has passed by since last check
      if (checkIfExpired(lastTime)) {
        //Data expired
        fetchDataFile();
      }
      else {
        //We have data, load it
        talentData = JSON.parse(window.localStorage.getItem('talentData'));
        checkSavedPrefs();
      }
    }
    else {
      //Fetch json file
      fetchDataFile();
    }
  }
  
  function checkIfExpired(lastCheck) {
    var lastC = new Date(parseInt(lastCheck)).getTime();
    var now = new Date(Date.now());
    
    var diff = now - lastC;
    
    if (diff > 1000*60) {
      return true;
    }
    else {
      return false;
    }
  }
  
  function fetchDataFile() {
    $.getJSON( "https://raw.githubusercontent.com/dfilipidisz/hotslogs-scraper/master/data.json", function( data ) {
      talentData = data;
      
      window.localStorage.setItem('lastCheckForUpdate', Date.now());
      window.localStorage.setItem('talentData', JSON.stringify(talentData));
      
      checkSavedPrefs();
    });
  }
  
  $('#minimized').click(callbacks.onSwitchPageToContainer);
  //$('#talents-container').mouseleave(callbacks.onLeaveContainer);
  $('#heroSelect').change(callbacks.onSelectHero);
  
  startUp();
  
});