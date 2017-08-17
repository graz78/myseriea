<!--
 // Project Name: SuperSantos 
 // Author: Graziano Muscas
 // Version: 0.2
  -->

var teamid;
var myteam;
var mycrest;


// NAVIGATION -----------------------------------------------------------


function loadteams(){
$.ajax({
  headers: { 'X-Auth-Token': '000e5403e46d458292c402ff8cd9d6de' },
  url: 'http://api.football-data.org/v1/competitions/456/teams',
  dataType: 'json',
  type: 'GET',

}).done(function(response) {
  for(var i = 0; i < response.teams.length; ++i){
  tshort = response.teams[i].shortName;
  //function remove(tshort){ tshort.replace(/\./g, "-");}
  if (tshort === "H. Verona"){
    tshort = "Verona"
  };
  console.log(tshort);
  tcrest = response.teams[i].crestUrl;
  $( "#tname" ).append( "<li><a class='tablinks' href='#/page' id="+tshort+" onclick='myClick(this.id)'><img width='30' height='30' src="+tcrest+" /></a></li>" );
 }
}); 
}

// PLAYERS -----------------------------------------------------------

function loadplayers()
{

  $.ajax({
  headers: { 'X-Auth-Token': '000e5403e46d458292c402ff8cd9d6de' },
  url: 'http://api.football-data.org/v1/teams/' +teamid+ '/players',
  dataType: 'json',
  type: 'GET',
  }).done(function(response) {
   var div = document.getElementById('teamtitle');
   $('#giocatori').append("Giocatori <img src='img/plus.png' />");
   $(div).append("<p>"+myteam+"</p>");
   $("#players thead").append('<tr><th>Prezzo</th><th>Giocatore</th><th>Ruolo</th></tr>');
   for(var i = 0; i < response.players.length; ++i){
     var pName = response.players[i].name;
     var pPosition = response.players[i].position;
     var pValue = response.players[i].marketValue;
     $("#players tbody").append( "<tr><td>"+pValue+"</td><td>"+pName+"</td><td>"+pPosition+"</td></tr>" );
     }
   }); 

}


// FIXTURES -----------------------------------------------------------


function loadfixtures(){
   $.ajax({
  headers: { 'X-Auth-Token': '000e5403e46d458292c402ff8cd9d6de' },
  url: 'http://api.football-data.org/v1/teams/' +teamid+ '/fixtures',
  dataType: 'json',
  type: 'GET',
  }).done(function(response) {
     $("#fixtures head").append('<tr><th>Data</th><th>Status</th><th>Risultato</th></tr>');
     $('#risultati').append("Risultati <img src='img/plus.png' />");
     for(var i = 0; i < response.fixtures.length; ++i){
     var mData = response.fixtures[i].date;
     mData = mData.substring(0,10);
     var mStatus = response.fixtures[i].status;
     var mCasa = response.fixtures[i].homeTeamName;
     var mFuori = response.fixtures[i].awayTeamName;
     var mFuoriResult = response.fixtures[i].result.goalsAwayTeam;
     var mCasaResult = response.fixtures[i].result.goalsHomeTeam;
     if (mFuoriResult === null){ mFuoriResult = 0}
     if (mCasaResult === null){ mCasaResult = 0}
     $("#fixtures tbody").append( "<tr><td>"+mData+"</td><td>"+mStatus+"</td><td>"+mCasa+"</td><td>"+mFuori+"</td><td>"+mCasaResult+"</td><td>"+mFuoriResult+"</td></tr>" );
          }
   }); 
}

// RANKING -----------------------------------------------------------

function loadclassifica(){
  console.log('classifica loaded');
  $( "#class thead" ).empty();
  $( "#class tbody" ).empty();
  //$( "#notizie" ).empty();
 $.ajax({
  headers: { 'X-Auth-Token': '000e5403e46d458292c402ff8cd9d6de' },
  url: 'http://api.football-data.org/v1/competitions/456/leagueTable',
  dataType: 'json',
  type: 'GET',
  }).done(function(response) {
    $('#class thead').append('<tr><th>Squadra</th><th>Punti</th><th>G</th><th>V</th><th>P</th><th>N</th><th class="hideme">GF</th><th class="hideme">GS</th><th class="hideme">DR</th></tr>')
   for(var i = 0; i < response.standing.length; ++i){
     var lposition = response.standing[i].position;
     var lteamname = response.standing[i].teamName;
     var lcrest = response.standing[i].crestURI;
     var lplayed = response.standing[i].playedGames;
     var lpoints = response.standing[i].points;
     var lgolfatti = response.standing[i].goals;
     var lgolsubiti = response.standing[i].goalsAgainst;
     var ldiff = response.standing[i].goalDifference;
     var lvinte = response.standing[i].wins;
     var lperse = response.standing[i].losses;
     var lpar = response.standing[i].draws;
     var lhomefatti = response.standing[i].home.goals;
     var lhomesubiti = response.standing[i].home.goalsAgainst;
     var lhomevinte = response.standing[i].home.wins;
     var lhomepar = response.standing[i].home.draws;
     var lhomeperse = response.standing[i].home.losses;
     var lfuorifatti = response.standing[i].away.goals;
     var lfuorisubiti = response.standing[i].away.goalsAgainst;
     var lfuorivinte = response.standing[i].away.wins;
     var lfuoripar = response.standing[i].away.draws;
     var lfuoriperse = response.standing[i].away.losses;
     $('#class tbody').append( "<tr><th>"+lposition+"    <img src='"+lcrest+"' width='20' height='20' />   "+lteamname+"</td><td>"+lpoints+"</td><td>"+lplayed+"</td><td>"+lvinte+"</td><td>"+lperse+"</td><td>"+lpar+"</td><td class='hideme'>"+lgolfatti+"</td><td class='hideme'>"+lgolsubiti+"</td><td class='hideme'>"+ldiff+"</td></tr>");
     }
   }); 

}

// NEWS HP FEED -----------------------------------------------------------
function loadPageNews(){
$( "#hp_news" ).empty();
$.get('http://www.corrieredellosport.it/rss/calcio/serie-a', function (data) {
    $(data).find("item").each(function () { 

        var el = $(this);
        var feedtitle = el.find("title").text();
        var feeddesc = el.find("description").text();
        var feedlink = el.find("link").text();
        //console.log(feedlink);
        $('#hp_news').append("<div class='feed_story'><a href='"+feedlink+"' target='blank'><b>"+feedtitle+"</b></a></br>"+feeddesc+"</div>");

    });
});

$.get('http://www.gazzetta.it/rss/serie-a.xml', function (data) {
    $(data).find("item").each(function () { 

        var el = $(this);
        var feedtitle = el.find("title").text();
        var feeddesc = el.find("description").text();
        var feedlink = el.find("link").text();
        //console.log(feedlink);
        $('#hp_news').append("<div class='feed_story'><a href='"+feedlink+"' target='blank'><b>"+feedtitle+"</b></a></br>"+feeddesc+"</div>");

    });
});

}

// NEWS PAGE FEED -----------------------------------------------------------
function loadNews(){

$.get('http://www.corrieredellosport.it/rss/calcio/serie-a/'+rssteam+'', function (data) {
    $('#notizie').append("Notizie <img src='img/plus.png' />");
    $(data).find("item").each(function () { 

        var el = $(this);
        var feedtitle = el.find("title").text();
        var feeddesc = el.find("description").text();
        var feedlink = el.find("link").text();
        $('#feed').append("<div class='feed_story'><a href='"+feedlink+"' target='blank'><b>"+feedtitle+"</b></a></br>"+feeddesc+"</div>");

    });
    $('.logosquadra').append("<img src='"+mycrest+"' width='90' height='90' />"); //Loading Logo squadra
});
}

// OTHER FUNCTIONS -----------------------------------------------------------

function reset(){
  console.log('resetting');
  $( ".logosquadra" ).empty();
  $( "#teamtitle" ).empty();
  $( "#notizie" ).empty();
  $( "#giocatori" ).empty();
  $( "#risultati" ).empty();
  $( "#feed" ).empty();
  $( ".feed_story" ).empty();
  $( "#players thead" ).empty();
  $( "#players tbody" ).empty();
  $( "#fixtures tbody" ).empty();
  $( "#fixtures thead" ).empty();
}


function myClick(clicked_id,event){
    if(clicked_id === "Roma"){reset();teamid=100;myteam="AS Roma";rssteam="roma";mycrest = $('#Roma').children('img').attr('src');mycheck();}
    else if(clicked_id === "Verona"){reset();teamid=450;myteam="Hellas Verona";rssteam="verona";mycrest = $('#Verona').children('img').attr('src');mycheck();}
    else if(clicked_id === "Juventus"){reset();teamid=109;myteam="Juventus";rssteam="juve";mycrest = $('#Juventus').children('img').attr('src');mycheck();}
    else if(clicked_id === "Udinese"){reset();teamid=115;myteam="Udinese Calcio";rssteam="udinese";mycrest = $('#Udinese').children('img').attr('src');mycheck();}
    else if(clicked_id === "Benevento"){reset();teamid=1106;myteam="Benevento";rssteam="benevento";mycrest = $('#Benevento').children('img').attr('src');mycheck();}
    else if(clicked_id === "Genoa"){reset();teamid=107;myteam="Genoa";rssteam="genoa";mycrest = $('#Genoa').children('img').attr('src');mycheck();}
    else if(clicked_id === "Sassuolo"){reset();teamid=471;myteam="Sassuolo";rssteam="sassuolo";mycrest = $('#Sassuolo').children('img').attr('src');mycheck();}
    else if(clicked_id === "Napoli"){reset();teamid=113;myteam="Ac Napoli";rssteam="napoli";mycrest = $('#Napoli').children('img').attr('src');mycheck();}
    else if(clicked_id === "Sampdoria"){reset();teamid=584;myteam="UC Sampdoria";rssteam="sampdoria";mycrest = $('#Sampdoria').children('img').attr('src');mycheck();}
    else if(clicked_id === "Lazio"){reset();teamid=110;myteam="SS Lazio";rssteam="lazio";mycrest = $('#Lazio').children('img').attr('src');mycheck();}  
    else if(clicked_id === "Bologna"){reset();teamid=103;myteam="Bologna FC";rssteam="bologna";mycrest = $('#Bologna').children('img').attr('src');mycheck();}
    else if(clicked_id === "Inter"){reset();teamid=108;myteam="FC Inter";rssteam="inter";mycrest = $('#Inter').children('img').attr('src');mycheck();}
    else if(clicked_id === "Atalanta"){reset();teamid=102;myteam="Atalanta";rssteam="atalanta";mycrest = $('#Atalanta').children('img').attr('src');mycheck();}
    else if(clicked_id === "Torino"){reset();teamid=586;myteam="FC Torino";rssteam="torino";mycrest = $('#Torino').children('img').attr('src');mycheck();}
    else if(clicked_id === "Fiorentina"){reset();teamid=99;myteam="ACF Fiorentina";rssteam="fiorentina";mycrest = $('#Fiorentina').children('img').attr('src');mycheck(); }
    else if(clicked_id === "Milan"){reset();teamid=98;myteam="AC Milan";rssteam="milan";mycrest = $('#Milan').children('img').attr('src');mycheck();}
    else if(clicked_id === "Spal"){reset();teamid=1107;myteam="SPAL Ferrara";rssteam="spal";mycrest = $('#Spal').children('img').attr('src');mycheck();}
    else if(clicked_id === "Chievo"){reset();teamid=106;myteam="Chievo Verona";rssteam="chievo";mycrest = $('#Chievo').children('img').attr('src');mycheck();}
    else if(clicked_id === "Cagliari"){reset();teamid=104;myteam="Cagliari";rssteam="cagliari";mycrest = $('#Cagliari').children('img').attr('src');mycheck();}
    else if(clicked_id === "Crotone"){reset();teamid=472;myteam="Crotone";rssteam="crotone";mycrest = $('#Crotone').children('img').attr('src');mycheck();}
    }

function mycheck(){
  loadNews();
  loadplayers();
  loadfixtures();
}

function init(){
  //loadteams();
  loadPageNews();
}
function home(){
  //random_imglink();
  loadPageNews();

}

function toggle_notizie() {
  var btn_feed = document.getElementById("notizie");
  var feed_toggle = document.getElementById("feed");
  if(feed_toggle.style.display == "block") {
     feed_toggle.style.display = "none";
     btn_feed.innerHTML = "Notizie <img src='img/plus.png' />";
    }
    else {
     feed_toggle.style.display = "block";
     btn_feed.innerHTML = "Notizie <img src='img/minus.png' />";
    }
} 
function toggle_players() {
  var btn_players = document.getElementById("giocatori");
  var players_toggle = document.getElementById("players");
  if(players_toggle.style.display == "") {
     players_toggle.style.display = "none";
     btn_players.innerHTML = "Giocatori <img src='img/plus.png' />";
    }
    else {
     players_toggle.style.display = "";
     btn_players.innerHTML = "Giocatori <img src='img/minus.png' />";
    }
} 
function toggle_fixtures() {
  var btn_fixtures = document.getElementById("risultati");
  var fixtures_toggle = document.getElementById("fixtures");
  if(fixtures_toggle.style.display == "") {
     fixtures_toggle.style.display = "none";
     btn_fixtures.innerHTML = "Risultati <img src='img/plus.png' />";
    }
    else {
     fixtures_toggle.style.display = "";
     btn_fixtures.innerHTML = "Risultati <img src='img/minus.png' />";
    }
} 







