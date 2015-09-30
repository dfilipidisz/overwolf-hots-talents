$(document).ready(function() {
  "use strict";
  
  var talentData;
  
  var selectedHero = "";
  
  var callbacks = {
    onCloseApp: function() {
      overwolf.windows.getCurrentWindow(function(result){
	    if (result.status=="success"){
	      overwolf.windows.close(result.window.id);
	    }
	  });
    },
    
    onStartWindowDrag: function() {
      overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success"){
          overwolf.windows.dragMove(result.window.id);
        }
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
    },
    
    onOpenPopularSubrow: function() {
      $(this).removeClass('glyphicon-chevron-down open-subrow').addClass('glyphicon-chevron-up close-subrow');
      $('#lvl'+$(this).data('lvl')+'-sub-row1').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row2').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row3').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row4').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row5').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row6').removeClass('hidden');
    },
    
    onClosePopularSubrow: function() {
      $(this).removeClass('glyphicon-chevron-up close-subrow').addClass('glyphicon-chevron-down open-subrow');
      $('#lvl'+$(this).data('lvl')+'-sub-row1').addClass('hidden')
      $('#lvl'+$(this).data('lvl')+'-sub-row2').addClass('hidden')
      $('#lvl'+$(this).data('lvl')+'-sub-row3').addClass('hidden')
      $('#lvl'+$(this).data('lvl')+'-sub-row4').addClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row5').addClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row6').addClass('hidden');
    },
    
    onOpenPopularSubrowWinrate: function() {
      $(this).removeClass('glyphicon-chevron-down open-subrow-winrate').addClass('glyphicon-chevron-up close-subrow-winrate');
      $('#lvl'+$(this).data('lvl')+'-sub-row1-winrate').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row2-winrate').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row3-winrate').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row4-winrate').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row5-winrate').removeClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row6-winrate').removeClass('hidden');
    },
    
    onClosePopularSubrowWinrate: function() {
      $(this).removeClass('glyphicon-chevron-up close-subrow-winrate').addClass('glyphicon-chevron-down open-subrow-winrate');
      $('#lvl'+$(this).data('lvl')+'-sub-row1-winrate').addClass('hidden')
      $('#lvl'+$(this).data('lvl')+'-sub-row2-winrate').addClass('hidden')
      $('#lvl'+$(this).data('lvl')+'-sub-row3-winrate').addClass('hidden')
      $('#lvl'+$(this).data('lvl')+'-sub-row4-winrate').addClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row5-winrate').addClass('hidden');
      $('#lvl'+$(this).data('lvl')+'-sub-row6-winrate').addClass('hidden');
    }
  };
  
  function buildHeroTalentsDOM() {
    var d = talentData[selectedHero];
    console.log('Build DOM');
    console.log(d);
    
    var popBuffer = "";
    var winBuffer = "";
    
    popBuffer += buildLevelRows(d, 1, 'popularity');
    popBuffer += "<hr />";
    popBuffer += buildLevelRows(d, 4, 'popularity');
    popBuffer += "<hr />";
    popBuffer += buildLevelRows(d, 7, 'popularity');
    popBuffer += "<hr />";
    popBuffer += buildLevelRows(d, 10, 'popularity');
    popBuffer += "<hr />";
    popBuffer += buildLevelRows(d, 13, 'popularity');
    popBuffer += "<hr />";
    popBuffer += buildLevelRows(d, 16, 'popularity');
    popBuffer += "<hr />";
    popBuffer += buildLevelRows(d, 20, 'popularity');
    
    winBuffer += buildLevelRowsWinrate(d, 1, 'winrate');
    winBuffer += "<hr />";
    winBuffer += buildLevelRowsWinrate(d, 4, 'winrate');
    winBuffer += "<hr />";
    winBuffer += buildLevelRowsWinrate(d, 7, 'winrate');
    winBuffer += "<hr />";
    winBuffer += buildLevelRowsWinrate(d, 10, 'winrate');
    winBuffer += "<hr />";
    winBuffer += buildLevelRowsWinrate(d, 13, 'winrate');
    winBuffer += "<hr />";
    winBuffer += buildLevelRowsWinrate(d, 16, 'winrate');
    winBuffer += "<hr />";
    winBuffer += buildLevelRowsWinrate(d, 20, 'winrate');
    
    $('#popularity').empty().append(popBuffer);
    $('#winrate').empty().append(winBuffer);
  }
  
  function buildLevelRows(d, lvl, type) {
    var buffer = "";
    var talent = getTalent(d, lvl, type, 1);
    
    buffer += "<div class='row talent-main-row'>";
    buffer += "<div class='col-xs-2 level'><img src='img/Level"+lvl+".webp' width=25 height=25></div>";
    buffer += "<div class='col-xs-6 talent-name'>"+talent.title+"</div>";
    buffer += "<div class='col-xs-2 talent-percent'>"+talent.popularity+"%</div>";
    buffer += "<div class='col-xs-2 more-info'><i class='glyphicon glyphicon-chevron-down open-subrow' data-lvl='"+lvl+"'></i></div>";
    buffer += "</div>";
    
    for (var i = 1; i < d['lvl'+lvl].length; i++) {
      talent = getTalent(d, lvl, type, i+1);
      buffer += "<div class='row talent-sub-row hidden' id='lvl"+lvl+"-sub-row"+i+"'>";
      buffer += "<div class='col-xs-6 col-xs-offset-2 talent-name'>"+talent.title+"</div>";
      buffer += "<div class='col-xs-2 talent-percent'>"+talent.popularity+"%</div>";
      buffer += "</div>";
    }
    
    return buffer;
  }
  
  function buildLevelRowsWinrate(d, lvl, type) {
    var buffer = "";
    var talent = getTalent(d, lvl, type, 1);
    
    buffer += "<div class='row talent-main-row'>";
    buffer += "<div class='col-xs-2 level'><img src='img/Level"+lvl+".webp' width=25 height=25></div>";
    buffer += "<div class='col-xs-6 talent-name'>"+talent.title+"</div>";
    buffer += "<div class='col-xs-2 talent-percent'>"+talent.winrate+"%</div>";
    buffer += "<div class='col-xs-2 more-info'><i class='glyphicon glyphicon-chevron-down open-subrow-winrate' data-lvl='"+lvl+"'></i></div>";
    buffer += "</div>";
    
    for (var i = 1; i < d['lvl'+lvl].length; i++) {
      talent = getTalent(d, lvl, type, i+1);
      buffer += "<div class='row talent-sub-row hidden' id='lvl"+lvl+"-sub-row"+i+"-winrate'>";
      buffer += "<div class='col-xs-6 col-xs-offset-2 talent-name'>"+talent.title+"</div>";
      buffer += "<div class='col-xs-2 talent-percent'>"+talent.winrate+"%</div>";
      buffer += "</div>";
    }
    
    return buffer;
  }
  
  function getTalent(heroData, lvl, type, rank) {
    var arr = [];
    
    if (type === 'popularity') {
      arr = heroData['lvl'+lvl].sort(function compare(a, b) {
        if (parseFloat(a.popularity) < parseFloat(b.popularity)) return 1;
        if (parseFloat(a.popularity) > parseFloat(b.popularity)) return -1;
        return 0;
      });  
    }
    else if (type === 'winrate') {
      arr = heroData['lvl'+lvl].sort(function compare(a, b) {
        if (parseFloat(a.winrate) < parseFloat(b.winrate)) return 1;
        if (parseFloat(a.winrate) > parseFloat(b.winrate)) return -1;
        return 0;
      });
    }
    
    return arr[rank-1];
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
  
  $('#heroSelect').change(callbacks.onSelectHero);
  $('.close-app').click(callbacks.onCloseApp);
  $('.navigation').mousedown(callbacks.onStartWindowDrag);
  $('#popularity').on('click', '.open-subrow', callbacks.onOpenPopularSubrow);
  $('#popularity').on('click', '.close-subrow', callbacks.onClosePopularSubrow);
  $('#winrate').on('click', '.open-subrow-winrate', callbacks.onOpenPopularSubrowWinrate);
  $('#winrate').on('click', '.close-subrow-winrate', callbacks.onClosePopularSubrowWinrate);
  
  startUp();
  
});