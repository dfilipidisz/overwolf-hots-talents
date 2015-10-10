$(document).ready(function() {
  "use strict";
  
  var talentData;
  var selectedType = 'popularity';
  var selectedHero = "";
  
  var callbacks = {
    onCloseApp: function() {
      overwolf.windows.getCurrentWindow(function(result){
	    if (result.status=="success"){
	      overwolf.windows.close(result.window.id);
	    }
	  });
    },
    
    onDragWindow: function() {
      overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success"){
          overwolf.windows.dragMove(result.window.id);
        }
      });
    },
    
    onSwitchPageToContainer: function() {
      $(this).animate({width: '-=60', height: '-=60'}, 100, function() {
        $(this).addClass('hidden');
        $('#talents-container').removeClass('hidden');
        $('#talents-container').animate({width: '100%', height: '100%', padding: '+=10'}, 100);
      });
    },
    
    onLeaveContainer: function() {
      $('#talents-container').animate({width: '0', height: '0', padding: '-=10'}, 100, function() {
        $('#talents-container').addClass('hidden');
        $('#minimized').removeClass('hidden');
        $('#minimized').animate({width: '+=60', height: '+=60'}, 100, function() {
          
        });
      });
    },
    
    onSelectHero: function(e) {
      if ($(this).val() !== 'none') { 
        selectedHero = makeStringSafe($(this).val());
        window.localStorage.setItem('selectedHero', selectedHero);
        buildTalentRows();
      }
      else {
        console.log('Reset display');
        window.localStorage.removeItem('selectedHero');
        //$('#popularity').empty();
        //$('#winrate').empty();
      }
    },
    
    changeTypeToPopularity: function() {
      selectedType = 'popularity';
      changePopularityDOM();
      buildTalentRows();
    },
    
    changeTypeToWinrate: function() {
      selectedType = 'winrate';
      changePopularityDOM();
      buildTalentRows();
    },
    
    switchSubrows: function() {
      console.log('switching');
      if ($(this).children('i').hasClass('glyphicon-chevron-down')) {
        //Open surows
        $(this).children('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        $('.sub-row.lvl'+$(this).data('lvl')).removeClass('hidden');
      }
      else if ($(this).children('i').hasClass('glyphicon-chevron-up')) {
        //Close subrows
        $(this).children('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        $('.sub-row.lvl'+$(this).data('lvl')).addClass('hidden');
      }
    }
  };
  
  function changePopularityDOM() {
    $('#popularity').removeClass('active');
    $('#winrate').removeClass('active');
    
    switch(selectedType) {
      case 'popularity':
        $('#popularity').addClass('active');
        break;
      case 'winrate':
        $('#winrate').addClass('active');
        break;
    }
  }
                  
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
      buildTalentRows();
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
  
  function buildTalentRows() {
    console.log('Build rows');
    
    var d = talentData[selectedHero];
    var buffer = "";
    
    buffer += buildLevelRows(d, 1);
    buffer += buildLevelRows(d, 4);
    buffer += buildLevelRows(d, 7);
    buffer += buildLevelRows(d, 10);
    buffer += buildLevelRows(d, 13);
    buffer += buildLevelRows(d, 16);
    buffer += buildLevelRows(d, 20);
    
    $('#talents').empty().append(buffer);
  }
  
  function buildLevelRows(d, lvl) {
    var buffer = "";
    var talent = getTalent(d, lvl, 1);
    
    buffer += "<div class=talent-row>";
    buffer += "<div class=main-row>";
    buffer += "<div class='hexagon'><span><span class=talent-text>"+lvl+"</span></span></div>";
    buffer += "<div class=talent-holder>";
    buffer += "<span class=title>"+talent.title+"</span>";
    buffer += "<span class=percent>"+talent[selectedType]+"%</span>";
    buffer += "<span class=switch data-lvl="+lvl+"><i class='glyphicon glyphicon-chevron-down'></i></span>";
    buffer += "</div>";
    buffer += "</div>";
    
    for (var i = 1; i < d['lvl'+lvl].length; i++) {
      talent = getTalent(d, lvl, i+1);
      buffer += "<div class='sub-row hidden lvl"+lvl+"'>";
      buffer += "<div class=talent-holder>";
      buffer += "<span class=title>"+talent.title+"</span>";
      buffer += "<span class=percent>"+talent[selectedType]+"%</span>";
      buffer += "<span class=switch-placeholder></span>";
      buffer += "</div>";
      buffer += "</div>";
    }
    
    buffer += "</div>";
    
    return buffer;
  }
  
  function getTalent(heroData, lvl, rank) {
    var arr = [];
    
    if (selectedType === 'popularity') {
      arr = heroData['lvl'+lvl].sort(function compare(a, b) {
        if (parseFloat(a.popularity) < parseFloat(b.popularity)) return 1;
        if (parseFloat(a.popularity) > parseFloat(b.popularity)) return -1;
        return 0;
      });  
    }
    else if (selectedType === 'winrate') {
      arr = heroData['lvl'+lvl].sort(function compare(a, b) {
        if (parseFloat(a.winrate) < parseFloat(b.winrate)) return 1;
        if (parseFloat(a.winrate) > parseFloat(b.winrate)) return -1;
        return 0;
      });
    }
    
    return arr[rank-1];
  }
  
  $('#minimized').click(callbacks.onSwitchPageToContainer);
  $('#talents-container').mouseleave(callbacks.onLeaveContainer);
  $('#heroSelect').change(callbacks.onSelectHero);
  $('#popularity').click(callbacks.changeTypeToPopularity);
  $('#winrate').click(callbacks.changeTypeToWinrate);
  $(document).on('click', '.switch', callbacks.switchSubrows);
  $('#close-app').click(callbacks.onCloseApp);
  $('#minimized').mousedown(callbacks.onDragWindow);
  
  startUp();
  
});