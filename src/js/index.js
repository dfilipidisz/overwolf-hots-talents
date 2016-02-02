$(document).ready(function() {
  "use strict";
  
  var talentData;
  var selectedType = 'popularity';
  var selectedHero = "";
  var sessionID = null;
  var hearthbeatID = null;
  var Config = {
    analyticsURL: "http://owanalytics.noip.me/event"
    //analyticsURL: "http://127.0.0.1:3800/event"
  };
  
  var callbacks = {
    onCloseApp: function() {
      
      clearInterval(hearthbeatID);
      
      sendAnalytics({event: "close-app", sessionid: sessionID});
      
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
      
      sendAnalytics({sessionid: sessionID, event: "custom", data: {name: "open-panel"}});
      
      $(this).animate({width: '-=60', height: '-=60'}, 100, function() {
        $(this).addClass('hidden');
        $('#talents-container').removeClass('hidden');
        $('#talents-container').animate({width: '100%', height: '100%', padding: '+=10'}, 100);
      });
    },
    
    onLeaveContainer: function() {

      sendAnalytics({sessionid: sessionID, event: "custom", data: {name: "hide-panel"}});
      
      $('#talents-container').animate({width: '0', height: '0', padding: '-=10'}, 100, function() {
        $('#talents-container').addClass('hidden');
        $('#minimized').removeClass('hidden');
        $('#minimized').animate({width: '+=60', height: '+=60'}, 100, function() {
          
        });
      });
    },
    
    onSelectHero: function(e) {
      sendAnalytics({sessionid: sessionID, event: "custom", data: {name: "select-hero", value: $(this).val()}});
      
      if ($(this).val() !== 'none') { 
        selectedHero = makeStringSafe($(this).val());
        window.localStorage.setItem('selectedHero', selectedHero);
        
        switch(selectedType) {
          case 'popularity':
          case 'winrate':
            $('[data-toggle="tooltip"]').tooltip('destroy');
            buildTalentRows();
            break;
          case 'popbuilds':
            buildPopularBuilds();
            break;
        }
        
      }
      else {
        //console.log('Reset display');
        window.localStorage.removeItem('selectedHero');
        //$('#popularity').empty();
        //$('#winrate').empty();
      }
    },
    
    changeTypeToPopularity: function() {
      sendAnalytics({sessionid: sessionID, event: "click", data: {element: "popularity"}});
      
      selectedType = 'popularity';
      changePopularityDOM();
      $('[data-toggle="tooltip"]').tooltip('destroy');
      buildTalentRows();
    },
    
    changeTypeToWinrate: function() {
      sendAnalytics({sessionid: sessionID, event: "click", data: {element: "winrate"}});
      
      selectedType = 'winrate';
      changePopularityDOM();
      $('[data-toggle="tooltip"]').tooltip('destroy');
      buildTalentRows();
    },
    
    changeTypeToPopbuilds: function() {
      sendAnalytics({sessionid: sessionID, event: "click", data: {element: "popbuilds"}});
      
      selectedType = 'popbuilds';
      changePopularityDOM();
      buildPopularBuilds();
    },
    
    switchSubrows: function() {
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
  
  function sendAnalytics(dataToSend) {
    $.ajax({
      url: Config.analyticsURL,
      method: "POST",
      data: dataToSend,
      crossDomain: true,
      error: function(jqxhr, status, error) {
        console.log("error");
        console.log(status);
        console.log(error);
      }
    });
  }
  
  function changePopularityDOM() {
    $('#popularity').removeClass('active');
    $('#winrate').removeClass('active');
    $('#popbuilds').removeClass('active');
    
    switch(selectedType) {
      case 'popularity':
        $('#popularity').addClass('active');
        break;
      case 'winrate':
        $('#winrate').addClass('active');
        break;
      case 'popbuilds':
        $('#popbuilds').addClass('active');
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
    var d = talentData[selectedHero];
    var buffer = "";
    
    buffer += buildLevelRows(d, 1);
    buffer += buildLevelRows(d, 4);
    buffer += buildLevelRows(d, 7);
    buffer += buildLevelRows(d, 10);
    buffer += buildLevelRows(d, 13);
    buffer += buildLevelRows(d, 16);
    buffer += buildLevelRows(d, 20);
    
    $('#popular-builds').empty();
    $('#talents').empty().append(buffer);
  }
  
  function buildLevelRows(d, lvl) {
    var buffer = "";
    var talent = getTalent(d, lvl, 1);
    
    buffer += "<div class=talent-row>";
    buffer += "<div class=main-row>";
    buffer += "<div class='hexagon'><span><span class=talent-text>"+lvl+"</span></span></div>";
    buffer += "<div class=talent-holder>";
    buffer += "<span class=title><img src='img/"+lookupTalentPic(talent.title)+".png' />"+talent.title+"</span>";
    buffer += "<span class=percent>"+talent[selectedType]+"%</span>";
    buffer += "<span class=switch data-lvl="+lvl+"><i class='glyphicon glyphicon-chevron-down'></i></span>";
    buffer += "</div>";
    buffer += "</div>";
    
    for (var i = 1; i < d['lvl'+lvl].length; i++) {
      talent = getTalent(d, lvl, i+1);
      buffer += "<div class='sub-row hidden lvl"+lvl+"'>";
      buffer += "<div class=talent-holder>";
      buffer += "<span class=title><img src='img/"+lookupTalentPic(talent.title)+".png' />"+talent.title+"</span>";
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
  
  function lookupTalentPic(title) {
    var slug = url_slug(title);
    
    if (typeof window.talentPics[slug] !== "undefined") {
      return slug;
    }
    else {
      return "talent-placeholder";
    }
  }
  
  function lookupTalentTitle(title) {
    var slug = url_slug(title);
    if (typeof window.talentPics[slug] !== "undefined") {
      return window.talentPics[slug];
    }
    else {
      return title;
    }
  }
  
  function buildPopularBuilds() {
    var d = talentData[selectedHero].popularBuilds;
    
    var buffer = "<table class='popbuilds-table'>";
    buffer += "<thead><tr><th>Pick #</th><th>Win %</th><th>1</th><th>4</th><th>7</th><th>10</th><th>13</th><th>16</th><th>20</th></tr></thead>";
    buffer += "<tbody>";
    
    d.forEach(function(build) {
      buffer += "<tr>";
      
      buffer += "<td>"+build.count+"</td>";
      buffer += "<td>"+(build.winp ? build.winp+"%" : "" )+"</td>";
      buffer += "<td><img src='img/"+lookupTalentPic(build.lvl1)+".png' data-toggle='tooltip' data-placement='bottom' title='"+lookupTalentTitle(build.lvl1)+"' width=25 height=30 /></td>";
      buffer += "<td><img src='img/"+lookupTalentPic(build.lvl4)+".png' data-toggle='tooltip' data-placement='bottom' title='"+lookupTalentTitle(build.lvl4)+"' width=25 height=30 /></td>";
      buffer += "<td><img src='img/"+lookupTalentPic(build.lvl7)+".png' data-toggle='tooltip' data-placement='bottom' title='"+lookupTalentTitle(build.lvl7)+"' width=25 height=30 /></td>";
      buffer += "<td><img src='img/"+lookupTalentPic(build.lvl10)+".png' data-toggle='tooltip' data-placement='bottom' title='"+lookupTalentTitle(build.lvl10)+"' width=25 height=30 /></td>";
      buffer += "<td><img src='img/"+lookupTalentPic(build.lvl13)+".png' data-toggle='tooltip' data-placement='bottom' title='"+lookupTalentTitle(build.lvl13)+"' width=25 height=30 /></td>";
      buffer += "<td><img src='img/"+lookupTalentPic(build.lvl16)+".png' data-toggle='tooltip' data-placement='bottom' title='"+lookupTalentTitle(build.lvl16)+"' width=25 height=30 /></td>";
      buffer += '<td><img src="img/' + lookupTalentPic(build.lvl20) + '.png" data-toggle="tooltip" data-placement="bottom" title=' + lookupTalentTitle(build.lvl20) + ' width=25 height=30 /></td>';
      
      buffer += "</tr>";
    });
    
    buffer += "</tbody></table>";
    
    $('#talents').empty();
    $('#popular-builds').empty().append(buffer);
    $('[data-toggle="tooltip"]').tooltip();
    
  }
  
  function sendHearthbeats() {
    sendAnalytics({sessionid: sessionID, event: "hearthbeat"});
  }
  
  //Start the app
  
  //Request session id from event server
  $.ajax({
    url: Config.analyticsURL,
    method: "POST",
    data: {event: "start-app"},
    crossDomain: true,
    success: function(data) {
      sessionID = data.sessionid;
      
      //Start off hearthbeats
      hearthbeatID = setInterval(sendHearthbeats, 60000);
    },
    error: function(jqxhr, status, error) {
      console.log("error");
      console.log(status);
      console.log(error);
    }
  });
  
  //Attach event handlers
  $('#minimized').click(callbacks.onSwitchPageToContainer);
  $('#talents-container').mouseleave(callbacks.onLeaveContainer);
  $('#heroSelect').change(callbacks.onSelectHero);
  $('#popularity').click(callbacks.changeTypeToPopularity);
  $('#winrate').click(callbacks.changeTypeToWinrate);
  $('#popbuilds').click(callbacks.changeTypeToPopbuilds);
  $(document).on('click', '.switch', callbacks.switchSubrows);
  $('#close-app').click(callbacks.onCloseApp);
  $('#minimized').mousedown(callbacks.onDragWindow);
  
  //Start init
  startUp();
  
});