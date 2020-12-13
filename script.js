$(document).ready(function() {

  // Loading
  $(window).on("load", function(){
    //$("#loading-screen").fadeOut(750);
    var name = ""; // default name
    var location = 6003; // default location = 6003 lucerne
    $("#name-settings").val(Cookies.get('name'));
    $("#plz-settings").val("6003");
    // check name
    if($("#name-settings").val() !== ""){
      var answer = "Willkommen zurück " + Cookies.get('name') + "!";
      sendanswer(answer);
      $("#plz-settings").val(Cookies.get('location'));
    }
    else{
      var answer = "Hallo, mein Name ist Tap. Wie kann ich dir helfen?";
      sendanswer(answer);
    }
    // check darkmode
    if(Cookies.get('darkmode') == "true"){
      darkmode("#181818"); // standard darkmode
      //darkmode("#000"); // oled mode
      //darkmode("#e74c3c"); // tomato
    }
    else if(Cookies.get('darkmode') == "oled"){
      //darkmode("#181818"); // standard darkmode
      darkmode("#000"); // oled mode
      //darkmode("#e74c3c"); // tomato
    }
    // check voice output
    if(Cookies.get('voiceoutput') == "false"){
      document.getElementById("speak-settings").checked = false;
    }
    else{
      document.getElementById("speak-settings").checked = true;
    }

    newsuggestion('Hi');
    newsuggestion('Erzähle mir einen Witz!');
    newsuggestion('Zeit');

    var messeagecounter = 0;
  });

  // send answer
  function sendanswer(answer, location){
    var remessagebubbel = $("<div class='received-message'></div>").click(function(){
     $("#context-menu").toggle(150, function(){
     });
     // trash
     $("#trash").click(function(){
       remessagebubbel.remove();
       $('#context-menu').css('display', 'none');
     });
     // copy
     $("#copy").click(function(){
       var copytext = answer;
       var $temp = $("<input>");
       $("body").append($temp);
       $temp.val(copytext).select();
       document.execCommand("copy");
       $temp.remove();
       $('#context-menu').css('display', 'none');
       $(".alert-copied").css('display', 'block');
       $(".alert-copied").delay(1500).fadeTo(10, 0);
     });
    });
    var gettime = new Date();
    var h = gettime.getHours();
    var min = gettime.getMinutes();
    var time = h + ':' + min;
    var remessagedate = $("<h5 class='received-date'>15:26, 04.10.2020</h5>").text(time);
    var remessagetext = $("<p>text</p>").text(answer);
    var placeholder = $("<div class='placeholder-chatfield'></div>");
    // add widgets
    if(answer.toUpperCase().includes('WETTER')){
      var iframelink = "https://meteo.search.ch/widget/" + location + "?days=1";
      var remessageiframe = $("<iframe scrolling='none' style='border:0;width:95%;height:320px'>Inhalt kann nicht angezeigt werden.</iframe>").attr("src", iframelink);
      remessagebubbel.append(remessagetext, remessageiframe, remessagedate);
    }
    else if(answer.toUpperCase().includes('HIER FINDEST DU EINIGE YOUTUBE TIPPS')){
      var iframelink = "https://michivonah.github.io/YT-Tipps/";
      var remessageiframe = $("<iframe scrolling='none' style='border:0;width:95%;height:320px'>Inhalt kann nicht angezeigt werden.</iframe>").attr("src", iframelink);
      remessagebubbel.append(remessagetext, remessageiframe, remessagedate);
    }
    else if(answer.toUpperCase().includes('WELCHES SPIEL MÖCHTEST DU SPIELEN')){
      var game1 = $("<button class='gamebtn'>Geoguessr</button>").attr("onclick", "window.open('https://www.geoguessr.com/');");
      var game2 = $("<button class='gamebtn'>Jass Federal</button>").attr("onclick", "window.open('https://www.jassfederal.ch/');");
      var game3 = $("<button class='gamebtn'>Dinoscape</button>").attr("onclick", "window.open('https://dinoscape.de/');");
      var game4 = $("<button class='gamebtn'>slither.io</button>").attr("onclick", "window.open('https://slither.io');");
      var game5 = $("<button class='gamebtn'>agar.io</button>").attr("onclick", "window.open('https://agar.io/');");
      var placeholder = $("<div style='height:0px;width:90%; background:transparent;'></div>");
      remessagebubbel.append(remessagetext, game1, game2, game4, placeholder, remessagedate);
    }
    else if(answer == ""){ // if answer is empty don't send an answer
      // nothing
    }
    else if(answer.toUpperCase().includes('HALLO, MEIN NAME IST TAP. WIE KANN ICH DIR HELFEN?')){
      var remessagedate = $("<h5 class='received-date'>Assistent by Michi</h5>");
      remessagebubbel.append(remessagetext, remessagedate);
    }
    else{
      remessagebubbel.append(remessagetext, remessagedate);
    }
    $('#writing').css('display', 'none');
    $('.received-message').css('margin-bottom', '10px');
    $("#chat").append(remessagebubbel);
    // replace emojis and some words for better tts
    var answer = answer.replace('👋', ''); var answer = answer.replace('😅', '');
    var answer = answer.replace('👍', ''); var answer = answer.replace('👎', '');
    var answer = answer.replace('😀', ''); var answer = answer.replace('😊', '');
    var answer = answer.replace('💡', ''); var answer = answer.replace('🍅', '');
    var answer = answer.replace('🤑', ''); var answer = answer.replace('🏠', '');
    var answer = answer.replace('🍞', ''); var answer = answer.replace('🌱', '');
    var answer = answer.replace('⌚', ''); var answer = answer.replace('📅', '');
    var answer = answer.replace('😉', ''); var answer = answer.replace('🎉', '');
    var answer = answer.replace('🎁', ''); var answer = answer.replace('🍔', '');
    var answer = answer.replace('🧃', ''); var answer = answer.replace('🍫', '');
    var answer = answer.replace('🎃', ''); var answer = answer.replace('🎄', '');
    var answer = answer.replace('🎅', ''); var answer = answer.replace('💻', '');
    var answer = answer.replace('⚡', ''); var answer = answer.replace('🍕', '');
    var answer = answer.replace('❤', ''); var answer = answer.replace('✔', '');
    var answer = answer.replace('🍪', ''); var answer = answer.replace('😂', '');
    var answer = answer.replace('🎮', ''); var answer = answer.replace('😁', '');
    var answer = answer.replace('km ', 'Kilometer'); var answer = answer.replace('cm ', 'Zentimeter');
    var answer = answer.replace('Hmm', ''); var answer = answer.replace('🗺', '');
    var answer = answer.replace('wikipedia', 'Wie kie Pee die aah'); var answer = answer.replace('Ok', 'Okay');
    var answer = answer.replace('ca', 'Zirka'); var answer = answer.replace('’', '');
    //var messeagecounter = + 1;
    //document.title = "(" + messeagecounter + ") - Assistent Tap";
    // speak
    if(document.getElementById("speak-settings").checked == true){
      if(answer != "Hallo, mein Name ist Tap. Wie kann ich dir helfen?" && answer != "Tut mir leid, das weiss ich noch nicht. " && answer != "Werbung wegen Markennenung, unbezahlt. #ads #werbung"){
        var speak = new SpeechSynthesisUtterance();
        speak.text = answer;
        speak.volume = 1; // Volume
        speak.lang = 'de-CH';  // Language
        speak.rate = 1.2; // Speed
        speak.pitch = 1; // Tonhöhe
        var answer = answer.replace('Tap', 'Täppp');
        window.speechSynthesis.speak(speak);
      }
      else{
        $('#newmessagesound')[0].play();
      }
    }
    else{
      $('#newmessagesound')[0].play();
    }
    if(Cookies.get('darkmode') == "true"){
      darkmode("#181818");
    }
  }

  // all answers
  function getanswer(message, name, location){
    if(message.toUpperCase().includes('HI') || message.toUpperCase().includes('HALLO') || message.toUpperCase().includes('HELLO') || message.toUpperCase().includes('SALI') || message.toUpperCase().includes('GRÜEZI') || message.toUpperCase().includes('HOI') || message.toUpperCase().includes('HEY') || message.toUpperCase().includes('CIAO') || message.toUpperCase().includes('GUTEN TAG') || message.toUpperCase().includes('GUTEN ABEND') || message.toUpperCase().includes('GUTEN NACHMITTAG')){
      var answer = "Schön dich zu sehen " + name + "! 👋";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('JA') || message.toUpperCase().includes('👍')){
      var answer = "";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('NEIN') || message.toUpperCase().includes('👎')){
      var answer = "";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('GUT') || message.toUpperCase().includes('SCHLECHT')){
      var answer = "Ok";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('DANKE')){
      var answer = "Kein Problem, dir helfe ich doch gerne. 😊";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('LOL') || message.toUpperCase().includes('KA') || message.toUpperCase().includes('SRY') || message.toUpperCase().includes('WHY') || message.toUpperCase().includes('OK')){
      var answer = "";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WITZ') || message.toUpperCase().includes('ETWAS LUSTIGES') || message.toUpperCase().includes('FLACHWITZ') || message.toUpperCase().includes('SCHERZ')){
      //var answer = "Witz wird geschrieben....";
      //sendanswer(answer);
      newsuggestion('noch einen Witz');
      newsuggestion('Funfact');
      var min = 1;
      var max = 22;
      var witz = Math.round(Math.random() * (max - min)) + min;
      if(witz == 1){
        var answer = "Ich habe mit der Pflanze ausgemacht, sie nur noch einmal im Monat zu gießen. Sie ist darauf eingegangen.";
        sendanswer(answer);
      }
      else if(witz == 2){
        var answer = "Ich habe einen Joghurt fallen gelassen. Er war nicht mehr haltbar.";
        sendanswer(answer);
      }
      else if(witz == 3){
        var answer = "Ich esse nicht jede Sorte Chips. Ich bin da sehr pringelig.";
        sendanswer(answer);
      }
      else if(witz == 4){
        var answer = "Hab mich vorhin ausgesperrt. War ganz aus dem Häuschen.";
        sendanswer(answer);
      }
      else if(witz == 5){
        var answer = "Was machen zwei wütende Schafe?";
        sendanswer(answer);
        var answer = "Sie kriegen sich in die Wolle.";
        sendanswer(answer);
      }
      else if(witz == 6){
        var answer = "Was hat jemand der im Kreis läuft?";
        sendanswer(answer);
        var answer = "Kreislaufprobleme";
        sendanswer(answer);
      }
      else if(witz == 7){
        var answer = "Was ist eine Glühbirne wenn sie auf den Boden fällt? 💡";
        sendanswer(answer);
        var answer = "Fassungslos";
        sendanswer(answer);
      }
      else if(witz == 8){
        var answer = "Was sind die teuresten Tomaten? 🍅";
        sendanswer(answer);
        var answer = "Geldautomaten 🤑";
        sendanswer(answer);
      }
      else if(witz == 9){
        var answer = "Ich wollte Spiderman anrufen, er hatte aber kein Netz.";
        sendanswer(answer);
      }
      else if(witz == 10){
        var answer = "Hab mir neulich ein Dach gekauft, ging aufs Haus. 🏠";
        sendanswer(answer);
      }
      else if(witz == 11){
        var answer = "Wie nennt man Minecraft Filme?";
        sendanswer(answer);
        var answer = "Blockbuster";
        sendanswer(answer);
      }
      else if(witz == 12){
        var answer = "Was macht ein Mathematiker beim Skifahren?";
        sendanswer(answer);
        var answer = "Er rechnet mit Brüchen. 😅";
        sendanswer(answer);
      }
      else if(witz == 13){
        var answer = "Warum können Geister schlecht lügen?";
        sendanswer(answer);
        var answer = "Weil sie leicht zu durchschauen sind.";
        sendanswer(answer);
      }
      else if(witz == 14){
        var answer = "Ich habe gestern ein Brötchen angerufen, aber es war belegt. 🍞";
        sendanswer(answer);
      }
      else if(witz == 15){
        var answer = "Egal wie tief du schläfst, Albert schläft wie Einstein.";
        sendanswer(answer);
      }
      else if(witz == 16){
        var answer = "Egal wie gut du fährst, Züge fahren Güter.";
        sendanswer(answer);
      }
      else if(witz == 17){
        var answer = "Was macht ein Mathematiker im Garten?";
        sendanswer(answer);
        var answer = "Wurzeln ziehen 🌱";
        sendanswer(answer);
      }
      else if(witz == 18){
        var answer = "Was ist die Steigerungsform von Buchstabensuppe?";
        sendanswer(answer);
        var answer = "Wörtersee";
        sendanswer(answer);
      }
      else if(witz == 19){
        var answer = "Was sagt eine Wand zur anderen?";
        sendanswer(answer);
        var answer = "Wir treffen uns in der Ecke.";
        sendanswer(answer);
      }
      else if(witz == 20){
        var answer = "Welches Getränk trinken Chefs?";
        sendanswer(answer);
        var answer = "Leitungswasser";
        sendanswer(answer);
      }
      else if(witz == 21){
        var answer = "Wie nennt man einen Bumerang, welcher nicht zurück kommt?";
        sendanswer(answer);
        var answer = "Stock";
        sendanswer(answer);
      }
      else if(witz == 22){
        var answer = "Was ist rot und schlecht für die Zähne?";
        sendanswer(answer);
        var answer = "Ein Ziegelstein!";
        sendanswer(answer);
      }
    }
    else if(message.toUpperCase().includes('GEHT ES DIR')){
      var answer = "Mir geht es gut, danke der Nachfrage. Wie geht es dir?";
      sendanswer(answer);
      newsuggestion('Gut');
      newsuggestion('Schlecht');
    }
    else if(message.toUpperCase().includes('HEISST DU') || message.toUpperCase().includes('DEIN') && message.toUpperCase().includes('NAME')){
      var answer = "Ich heise Tap.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('DEINE LIEBLINGSFARBE')){
      var answer = "Hmm, meine Lieblingsfarbe ist grün.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('SPÄT IST ES') || message.toUpperCase().includes('ZEIT') || message.toUpperCase().includes('DATUM')){
      var gettime = new Date();
      var h = gettime.getHours();
      var min = gettime.getMinutes();
      var time = h + ':' + min;
      var day = gettime.getDate();
      var month = gettime.getMonth() + 1;
      var year = gettime.getYear();
      var answer = "Es ist " + time + " Uhr. ⌚ Heute haben wir den " + day + "." + month + ". 📅";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('GROSS') && message.toUpperCase().includes('ERDE')){
      var answer = "Die Erde ist 510’100’000 km² gross. 🗺";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('EINWOHNER') && message.toUpperCase().includes('SCHWEIZ')){
      var answer = "Die Schweiz hat 8.6 Milionen Einwohner. Quelle: wikipedia";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WIE LANG') && message.toUpperCase().includes('MARATHON')){
      var answer = "Ein Marathon ist 42.195km lang. Ein Halbmarathon ist dementsprechen halb so lang. Quelle: wikipedia";
      sendanswer(answer);
      newsuggestion('Ist Eis gesund?');
    }
    else if(message.toUpperCase().includes('EIS') && message.toUpperCase().includes('GESUND')){
      var answer = "Ich bin mir nicht sicher ob Eis gesund ist, aber lecker ist es auf jeden Fall. 😉";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WAS KANNST DU')){
      var answer = "Ich kann noch nicht viel, lerne aber jeden Tag neues. Zurzeit kann ich dir bereits einen Witz erzählen, einige Fragen beantworten oder dir etwas über mich erzählen. 😉";
      sendanswer(answer);
      newsuggestion('öffne YouTube');
      newsuggestion('Witz erzählen');
      newsuggestion('Wer ist Donald Trump?');
    }
    else if(message.toUpperCase().includes('ICH') && message.toUpperCase().includes('GEBURTSTAG')){
      var answer = "Happy Birthday 🎁🎉";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('DU HUNGER')){
      var answer = "Nein, ich habe schon etwas gegessen. 🍔";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('FEEDBACK') || message.toUpperCase().includes('RÜCKMELDUNG') || message.toUpperCase().includes('BEWERTUNG')){
      var answer = "Gerne kannst du mir ein Feedback geben. Das Formular wird geöffnet.";
      sendanswer(answer);
      window.open('https://forms.gle/fkmXZpzzS7wssVHm6');
    }
    else if(message.toUpperCase().includes('WASSER') && message.toUpperCase().includes('TAG')){
      var answer = "An einem Tag solltest du ungefähr 2 Liter Wasser trinken. 🧃";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('ZUCKER') && message.toUpperCase().includes('TAG')){
      var answer = "Pro Tag solltest du nicht mehr als 50g Zucker zu dir nehmen. 🍫";
      sendanswer(answer);
      newsuggestion('Ist Eis gesund?');
    }
    else if(message.toUpperCase().includes('SPRACHEN') && message.toUpperCase().includes('DU')){
      var answer = "Ich spreche zurzeit nur Deutsch und kann noch nicht übersetzen.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('STIMME') && message.toUpperCase().includes('DEIN')){
      var answer = "Ich werde bald eine eigene Stimme erhalten. Bis dahin wird meinem Stimme von deinem Betriebssystem verwaltet. 😉";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('FUNFACT')){
      var minfact = 1;
      var maxfact = 5;
      var funfact = Math.round(Math.random() * (maxfact - minfact)) + minfact;
      if(funfact == 1){
        var answer = "Skorpione können bis zu einem Jahr ohne Nahrung überleben.";
        sendanswer(answer);
      }
      else if(funfact == 2){
        var answer = "Mit einer durchschnittlichen Bleistiftmine kann man eine 56km lange Linie zeichnen.";
        sendanswer(answer);
      }
      else if(funfact == 3){
        var answer = "Unsere Nasen und Ohren hören nie auf zu wachsen.";
        sendanswer(answer);
      }
      else if(funfact == 4){
        var answer = "Nebel heisst rückwärts geschrieben Leben.";
        sendanswer(answer);
      }
      else if(funfact == 5){
        var answer = "In Schottland gibt es 421 verschiedene Wörter für Schnee.";
        sendanswer(answer);
      }
      else if(funfact == 6){
        var answer = "Die amerikanische Flagge wurde von einem High School Schüler gezeichnet.";
        sendanswer(answer);
      }
      else if(funfact == 7){
        var answer = "Der erste kommerziele Passagierflug dauert 23 Minuten.";
        sendanswer(answer);
      }
      newsuggestion('noch einen Funfact');
      newsuggestion('Witz');
    }
    else if(message.toUpperCase().includes('HAST DU BROT')){
      var answer = "Nein und ich habe auch keine Nägel. 😉";
      sendanswer(answer);
      newsuggestion('Witz');
      newsuggestion('Funfact');
    }
    else if(message.toUpperCase().includes('ÖFFNE') && message.toUpperCase().includes('SPOTIFY')){
      var answer = "Wird gemacht...";
      sendanswer(answer);
      window.open('https://open.spotify.com/playlist/37i9dQZEVXbJiyhoAPEfMK?si=lZhxsrvsTqCcs0QEiREE8g');
    }
    else if(message.toUpperCase().includes('ÖFFNE') && message.toUpperCase().includes('YOUTUBE')){
      var answer = "Wird gemacht....";
      sendanswer(answer);
      window.open('https://www.youtube.com/');
    }
    else if(message.toUpperCase().includes('ÖFFNE') && message.toUpperCase().includes('INSTAGRAM')){
      var answer = "Wird gemacht....";
      sendanswer(answer);
      window.open('https://www.instagram.com/');
    }
    else if(message.toUpperCase().includes('ÖFFNE') && message.toUpperCase().includes('TWITTER')){
      var answer = "Kein Problem...";
      sendanswer(answer);
      window.open('https://twitter.com/home');
    }
    else if(message.toUpperCase().includes('ÖFFNE') && message.toUpperCase().includes('DISCORD')){
      var answer = "Wird gemacht....";
      sendanswer(answer);
      window.open('https://discord.com/app');
    }
    else if(message.toUpperCase().includes('ÖFFNE') && message.toUpperCase().includes('GITHUB')){
      var answer = "Kein Problem!";
      sendanswer(answer);
      window.open('https://github.com/michivonah/assistant');
    }
    else if(message.toUpperCase().includes('SPIEL') && message.toUpperCase().includes('SPIELEN')){
      var answer = "Welches Spiel möchtest du spielen? 🎮";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('#INFO')){
      var answer = "Das letzte Update ist am 00.00.2020 erschienen.";
      sendanswer(answer);
      newsuggestion('Einstellungen öffnen');
    }
    else if(message.toUpperCase().includes('EINSTELLUNGEN')){
      var answer = "Einstellungen werden geöffnet.";
      sendanswer(answer);
      $("#chat").toggle( 'fast', function(){
      });
      $("#settings").toggle( 'fast', function(){
      });
    }
    else if(message.toUpperCase().includes('WANN') && message.toUpperCase().includes('HALLOWEEN')){
      var answer = "Halloween ist nächstes Jahr am 31. Oktober. 🎃";
      sendanswer(answer);
      newsuggestion('Wann ist Weihnachten?');
    }
    else if(message.toUpperCase().includes('WANN') && message.toUpperCase().includes('WEIHNACHTEN')){
      var answer = "Weihnachten ist am 25. Dezember. 🎄";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WANN') && message.toUpperCase().includes('HEILIGABEND')){
      var answer = "Heiligabend ist am 24. Dezember. 🎄";
      sendanswer(answer);
      newsuggestion('Wann ist Halloween?');
    }
    else if(message.toUpperCase().includes('WANN') && message.toUpperCase().includes('NIKOLAUS')){
      var answer = "Nikolaus ist jedes Jahr am 6. Dezember. 🎅";
      sendanswer(answer);
      newsuggestion('Wann ist Weihnachten?');
    }
    else if(message.toUpperCase().includes('ENTWICKLER')){
      var answer = "Ich wurde von Michi von Ah programmiert. 💻 Er heisst auf Instagram und Twitter @michivonah";
      sendanswer(answer);
      newsuggestion('Feedback geben');
      newsuggestion('Github öffnen');
    }
    else if(message.toUpperCase().includes('WER')){
      // new function to search online for answer
        if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('ELON MUSK')){
          var answer = "Elon Musk ist der Gründer und CEO von Tesla. ⚡ Er ist 49 Jahre alt.";
          sendanswer(answer);
        }
        else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('MARK ZUCKERBERG')){
          var answer = "Mark Zuckerberg ist der Gründer von Facebook. Ihm gehören zudem die Apps WhatsApp und Instagram. Er ist 36 Jahre alt.";
          sendanswer(answer);
        }
        else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('DONALD TRUMP')){
          var answer = "Donald Trump war von 2016 bis 2020 Präsident von Amerika/USA. Er ist 74 Jahre alt.";
          sendanswer(answer);
        }
        else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('PRÄSIDENT')){
          var answer = "Joe Biden ist ab Januar 2021 Präsident von Amerika.";
          sendanswer(answer);
          newsuggestion('Wer ist Donald Trump?');
          newsuggestion('Wer ist Joe Biden?');
        }
        else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('JEFF BEZOS')){
          var answer = "Jeff Bezos ist der Gründer und CEO von Amazon. Er gilt als reichste Person der Welt. Er ist 56 Jahre alt. Quelle: wikipedia";
          sendanswer(answer);
        }
        else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('BILL GATES')){
          var answer = "Bill Gates ist einer der Gründer von Microsoft. Er gilt als eine der reichsten Personen der Welt. Er ist 65 Jahre alt. Quelle: wikipedia";
          sendanswer(answer);
        }
        else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('JOE BIDEN')){
          var answer = "Joe Biden gewann 2020 die US Wahlen und ist damit ab Januar 2021 der Präsident von Amerika. Er ist 77 Jahre alt. Quelle: wikipedia";
          sendanswer(answer);
        }
        else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('ALBERT EINSTEIN')){
          var answer = "Albert Einstein war ein deutscher Physiker. Er entdeckte viele wichtige Dinge, welche wir heuten noch brauchen. Er gewann 1921/1922 einen Nobelpreis. Er wurde 76 Jahre alt. Quelle: wikipedia";
          sendanswer(answer);
        }
        else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('KONRAD ZUSE')){
          var answer = "Konrad Zuse erfand den ersten funktionierenden Computer. Er wurde 85 Jahre alt. Quelle: wikipedia";
          sendanswer(answer);
        }
        else{
          // delete wer from message
          var message = message.replace(' ', '_');
          var message = message.replace('wer_', '');
          var message = message.replace('Wer_', '');
          var message = message.replace('WER_', '');
          var message = message.replace('wER_', '');
          var message = message.replace('ist', '');
          var message = message.replace('IST', '');
          var message = message.replace('Ist', '');
          var message = message.replace(' ', '_');
          var message = message.replace(' ', '_');
          var wikiurl = "https://de.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&titles=" + message;
          $.getJSON(wikiurl, function(data) {
                //var wikipagetitle = data.query.normalized[0].to;
                // thanks to https://stackoverflow.com/questions/30006183/get-wikipedia-pageid-from-title for code to get wikipedia pageid
                var pageid = [];
	              for( var id in data.query.pages ) {
		                pageid.push( id );
	              }
                var wikipagetext = data.query.pages[id].extract;
                var wikipagetext = wikipagetext.substr(0, wikipagetext.indexOf('='));
                var answer = wikipagetext + " Quelle: wikipedia";
                sendanswer(answer);
					});
        }
    }

    else if(message.toUpperCase().includes('ÄLTESTER') && message.toUpperCase().includes('MENSCH')){
      var answer = "Die älteste Person die jemals lebte wurde 122 Jahre alt und starb 1997. Sie hiess Jeanne Calment und war Französin. Quelle: weser-kurier.de";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('ALT') && message.toUpperCase().includes('ICH')){
      var answer = "Du bist zwischen 0 und 122 Jahre alt. 😉";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('AUF WIEDERSEHEN') || message.toUpperCase().includes('TSCHAU') || message.toUpperCase().includes('BYE') || message.toUpperCase().includes('TSCHÜSS')){
      var answer = "Bis nächstes Mal " + name + ".";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WETTER') || message.toUpperCase().includes('⛅')){
      var answer = "Das Wetter heute in " + location + ":";
      sendanswer(answer, location);
    }
    else if(message.toUpperCase().includes('WAS') && message.toUpperCase().includes('ESSEN')){
      var answer = "Wie wärs mit Pizza? 🍕";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('DU') && message.toUpperCase().includes('DURST')){
      var answer = "Nein, ich mag kein Wasser. Den Technik und Wasser ist bekantlich keine gute Kombination. ⚡";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('YOUTUBE') && message.toUpperCase().includes('EMPFEHLEN')){
      var answer = "Hier findest du einige YouTube Tipps:";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('ICH') && message.toUpperCase().includes('KEINE FREUNDE')){
      var answer = "Das stimmt doch gar nicht, ich bin doch bei dir. ❤";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WIE GROSS') && message.toUpperCase().includes('DU')){
      var answer = "Ich bin nicht grösser als 0.6 MB. 😉";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('DEAKTIVIER') && message.toUpperCase().includes('DARKMODE')){
      var answer = "Okay, der Darkmode wurde deaktivert.";
      sendanswer(answer);
      Cookies.set('darkmode', 'false', { expires: 86400 })
      darkmode("#E8F5E9");
    }
    else if(message.toUpperCase().includes('DARKMODE')){
      var answer = "Der Darkmode wird aktiviert.";
      sendanswer(answer);
      var answer = "Diese Funktion verwendet Cookies um zu speichern, dass sie den Darkmode aktiviert haben.";
      sendanswer(answer);
      darkmode("#181818");
      Cookies.set('darkmode', 'true', { expires: 86400 })
      newsuggestion('Deaktivere den Darkmode');
    }
    else if(message.toUpperCase().includes('TEST')){
      var answer = "Test erfolgreich. ✔";
      sendanswer(answer);
      newsuggestion('Witz erzählen');
    }
    else if(message.toUpperCase().includes('EIGEN') && message.toUpperCase().includes('CHAT')){
      var answer = "Eine Anleitung wie du dir selber einen Assistenten, wie mich, machen kannst kommt bald.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('SMART') && message.toUpperCase().includes('HOME') || message.toUpperCase().includes('LICHT')){
      var answer = "Die Smarthome Steuerung ist noch nicht verfügbar. Ich arbeite dran...";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('SMARTPHONE') && message.toUpperCase().includes('WELCHES')){
      var minphone = 1;
      var maxphone = 3;
      var phone = Math.round(Math.random() * (maxphone - minphone)) + minphone;
      if(phone == 1){
        var answer = "Ich empfehle dir das neue iPhone 12. Es besitzt ein OLED Display und ist in verschiedenen Farben erhältlich. Wenn du ein kleines Smartphone willst, empfehle ich dir das iPhone 12 Mini.";
        sendanswer(answer);
      }
      else if(phone == 2){
        var answer = "Wie wärs mit dem OnePlus Nord? Ein tolles Smartphone für nur 400 CHF. Es hat einen grossen Akku und ein tolles Display.";
        sendanswer(answer);
      }
      else if(phone == 3){
        var answer = "Hmm, für 250 CHF empfehle ich dir das Samsung Galaxy A41.";
        sendanswer(answer);
      }
      else if(phone == 0){
        var answer = "Ich hätte dir jetzt das Google Pixel 4a empfohlen, aber es ist leider nicht in der Schweiz erhältlich.";
        sendanswer(answer);
      }
      var answer = "Werbung wegen Markennenung, unbezahlt. #ads #werbung";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('LAPTOP') && message.toUpperCase().includes('WELCHER')){
      var minphone = 1;
      var maxphone = 1;
      var phone = Math.round(Math.random() * (maxphone - minphone)) + minphone;
      if(phone == 1){
        var answer = "";
        sendanswer(answer);
      }
      else if(phone == 2){
        var answer = "";
        sendanswer(answer);
      }
      else if(phone == 0){
        var answer = "error #laptop";
        sendanswer(answer);
      }
      var answer = "Werbung wegen Markennenung, unbezahlt. #ad #werbung";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('REZEPT')){
      var answer = "Ich kann leider noch keine Kochrezepte anzeigen. 🍪";
      sendanswer(answer);
    }
    else{
      var answer = "Tut mir leid, das weiss ich noch nicht. 😅";
      sendanswer(answer);
      newsuggestion('Feedback geben');
      //var answer = "Gib mir mit dem Befehl #Feedback eine Rückmeldung.";
      //sendanswer(answer);
    }
  }

  // send message
  function sendmessage(){
    if($("#chat-input").val() != ""){
      $('#error-empty').css('display', 'none');
      var message = $("#chat-input").val();
      var usermessagebubbel = $("<div class='user-message'></div>").click(function(){
        $("#context-menu").toggle(150, function(){
       });
       $('#fav').css('display', 'none');
       // delete
       $("#trash").click(function(){
         usermessagebubbel.remove();
         $('#context-menu').css('display', 'none');
       });
       // copy
       $("#copy").click(function(){
         var copytext = message;
         var $temp = $("<input>");
         $("body").append($temp);
         $temp.val(copytext).select();
         document.execCommand("copy");
         $temp.remove();
         $('#context-menu').css('display', 'none');
         $(".alert-copied").css('display', 'block');
         $(".alert-copied").delay(1500).fadeTo(10, 0);
       });
       // favorite
       $("#fav").click(function(){
         var usermessagebubbel = $("<div class='user-message'></div>");
         var messagetext = $("<p>test</p>").text(message);
         usermessagebubbel.append(messagetext);
         $("#favs").append(usermessagebubbel);
         $('#context-menu').css('display', 'none');
         $('#chat').css('display', 'none');
         $('#favs').css('display', 'block');
         var favcount = 0;
         localStorage.setItem('fav' + favcount, usermessagebubbel);
       });
      });;
      //time
      var gettime = new Date();
      var h = gettime.getHours();
      var min = gettime.getMinutes();
      var time = h + ':' + min;
      var messagedate = $("<h5 class='user-date'>15:26, 04.10.2020</h5>").text(time);
      var messagetext = $("<p>test</p>").text($("#chat-input").val());
      var read = $("<h5 class='user-read'><i class='far fa-check-circle'></i><i class='fas fa-check-circle'></i></h5>");
      usermessagebubbel.append(messagetext, messagedate, read);
      $("#chat").append(usermessagebubbel);
      $("#chat-input").val("");
      $("html, body").animate({ scrollTop: $(document).height() }, 1000);
      $('#writing').css('display', 'block');
      getanswer(message, $("#name-settings").val(), $("#plz-settings").val());
    }
    else{
      $('#error-empty').css('display', 'block');
    }
  }

  $("#chat-input").on("keyup", function(e){
    if(e.keyCode == 13){
      $('.chat-suggestion').css('display', 'none');
      sendmessage();
    }
  });

  $("#send-btn").click(function(){
    $('.chat-suggestion').css('display', 'none');
    sendmessage();
  });

  function newsuggestion(text){
    var suggestion = $("<div class='chat-suggestion' style='display:block;'></div>").click(function(){
      //$(".chat-suggestion").toggle( 'fast', function(){
      //});
      $('.chat-suggestion').css('display', 'none');
      $("#chat-input").val(text);
      sendmessage();
     });
    suggestion.append(text);
    $("#chat-suggestions").append(suggestion);
  }

  // settings
  $("#save-settings").click(function(){ // when save btn clicked
    // set cookies
    Cookies.set('name', $("#name-settings").val(), { expires: 86400 })
    Cookies.set('location', $("#plz-settings").val(), { expires: 86400 })
    Cookies.set('voiceoutput', document.getElementById("speak-settings").checked, { expires: 86400 })
    // toggle settings
    $("#settings").toggle( 'fast', function(){
    });
    $("#chat").toggle( 'fast', function(){
    });
    //$('#settings').css('display', 'none');
    //$('#chat').css('display', 'block');
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
  });

  $("#more").click(function(){
    $("#settings").toggle( 'fast', function(){
    });
    $("#chat").toggle( 'fast', function(){
    });
    $("#context-menu").toggle( 'fast', function(){
    });
  });

  $("#close-favs").click(function(){
    $("#favs").toggle( 'fast', function(){
    });
    $("#chat").toggle( 'fast', function(){
    });
  });

  // darkmode
  function darkmode(color){
    $('body').css('background', color);
    $('#loading-screen').css('background', color); // change loading screen color
    $('i').css('color', color);
    $('input').css('color', color);
    $('::placeholder').css('color', 'rgba(0, 0, 0, 0.5)');
    $('.error').css('color', 'rgba(255, 255, 255, 0.25)');
    $("meta[name=apple-mobile-web-app-status-bar-style]").attr("content", "#181818"); // change status bar color
    $("meta[name=mobile-web-app-status-bar-style]").attr("content", "#181818"); // change status bar color
    $('#loading p').css('color', '#fff');
    $('.received-message').css('background', '#3e3e3e');
    $('.user-message').css('background', '#3e3e3e');
    document.title = "Tap";
    var darkmode = true;
      }
    });
