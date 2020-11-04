$(document).ready(function() {
  // Loading
  $(window).on("load", function(){
    $("#loading-screen").fadeOut(750);
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
  });

  // send answer
  function sendanswer(answer, location){
    var remessagebubbel = $("<div class='received-message'></div>").click(function(){
     $("#context-menu").toggle( 'fast', function(){
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
     });
    });
    var gettime = new Date();
    var h = gettime.getHours();
    var min = gettime.getMinutes();
    var time = h + ':' + min;
    var remessagedate = $("<h5 class='received-date'>15:26, 04.10.2020</h5>").text(time);
    var remessagetext = $("<p>text</p>").text(answer);
    var placeholder = $("<div class='placeholder-chatfield'></div>");
    // if weather then add iframe
    if(answer.toUpperCase().includes('WETTER')){
      var iframelink = "https://meteo.search.ch/widget/" + location + "?days=1";
      var remessageiframe = $("<iframe scrolling='none' style='border:0;width:95%;height:320px'>Inhalt kann nicht angezeigt werden.</iframe>").attr("src", iframelink);
      remessagebubbel.append(remessagetext, remessageiframe, remessagedate);
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
    $('#newmessagesound')[0].play();
  }

  // all answers
  function getanswer(message, name, location){
    if(message.toUpperCase().includes('HI') || message.toUpperCase().includes('HALLO') || message.toUpperCase().includes('HELLO') || message.toUpperCase().includes('SALI') || message.toUpperCase().includes('GRÜEZI') || message.toUpperCase().includes('HOI') || message.toUpperCase().includes('HEY') || message.toUpperCase().includes('CIAO') || message.toUpperCase().includes('GUTEN TAG') || message.toUpperCase().includes('GUTEN ABEND') || message.toUpperCase().includes('GUTEN NACHMITTAG')){
      var answer = "Schön dich zu sehen " + name + "! 👋";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WITZ') || message.toUpperCase().includes('ETWAS LUSTIGES') || message.toUpperCase().includes('FLACHWITZ') || message.toUpperCase().includes('SCHERZ')){
      //var answer = "Witz wird geschrieben....";
      //sendanswer(answer);
      var min = 1;
      var max = 11;
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
        var answer = "Was ist eine Glühbirne wenn sie auf den Boden fällt?";
        sendanswer(answer);
        var answer = "Fassungslos";
        sendanswer(answer);
      }
      else if(witz == 8){
        var answer = "Was sind die teuresten Tomaten?";
        sendanswer(answer);
        var answer = "Geldautomaten";
        sendanswer(answer);
      }
      else if(witz == 9){
        var answer = "Ich wollte Spiderman anrufen, er hatte aber kein Netz.";
        sendanswer(answer);
      }
      else if(witz == 10){
        var answer = "Hab mir neulich ein Dach gekauft, ging aufs Haus.";
        sendanswer(answer);
      }
      else if(witz == 11){
        var answer = "Wie nennt man Minecraft Filme?";
        sendanswer(answer);
        var answer = "Blockbuster";
        sendanswer(answer);
      }
    }
    else if(message.toUpperCase().includes('GEHT ES DIR')){
      var answer = "Mir geht es gut, danke der Nachfrage.";
      sendanswer(answer);
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
    else if(message.toUpperCase().includes('KANNST DU')){
      var answer = "Ich kann noch nicht viel, lerne aber jeden Tag neues. Zurzeit kann ich dir bereits einen Witz erzählen, einige Fragen beantworten oder dir etwas über mich erzählen. 😉";
      sendanswer(answer);
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
    }
    else if(message.toUpperCase().includes('SPRACHEN') && message.toUpperCase().includes('DU')){
      var answer = "Ich spreche zurzeit nur Deutsch und kann noch nicht übersetzen.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('FUNFACT')){
      var minfact = 1;
      var maxfact = 4;
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
        var answer = "funfact";
        sendanswer(answer);
      }
      else if(funfact == 6){
        var answer = "funfact";
        sendanswer(answer);
      }
    }
    else if(message.toUpperCase().includes('HAST DU BROT')){
      var answer = "Nein und ich habe auch keine Nägel. 😉";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('ÖFFNE') && message.toUpperCase().includes('SPOTIFY')){
      var answer = "Wird gemacht....";
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
      var answer = "Wird gemacht....";
      sendanswer(answer);
      window.open('https://twitter.com/home');
    }
    else if(message.toUpperCase().includes('#INFO')){
      var answer = "Befehl noch nicht verfügbar. 😊";
      //var answer = "Letztes Update: 11.10.2020";
      sendanswer(answer);
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
      var answer = "Halloween ist dieses Jahr am 31. Oktober. 🎃";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WANN') && message.toUpperCase().includes('WEIHNACHTEN')){
      var answer = "Weihnachten ist am 25. Dezember. 🎄";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('ENTWICKLER')){
      var answer = "Ich wurde von Michi von Ah programmiert. 💻 Er heisst auf Instagram @michivonah";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('ELON MUSK')){
      var answer = "Elon Musk ist der Gründer und CEO von Tesla. ⚡ Er ist 49 Jahre alt.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('MARK ZUCKERBERG')){
      var answer = "Mark Zuckerberg ist der Gründer von Facebook. Ihm gehören zudem die Apps WhatsApp und Instagram. Er ist 36 Jahre alt.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('PRÄSIDENT')){
      var answer = "Donald Trump ist der Präsident von Amerika.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('JEFF BEZOS')){
      var answer = "Jeff Bezos ist der Gründer und CEO von Amazon. Er gilt als reichste Person der Welt. Er ist 56 Jahre alt. Quelle: wikipedia";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('WER') && message.toUpperCase().includes('BILL GATES')){
      var answer = "Bill Gates ist einer der Gründer von Microsoft. Er gilt als eine der reichsten Personen der Welt. Er ist 65 Jahre alt. Quelle: wikipedia";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('ÄLTESTER') && message.toUpperCase().includes('MENSCH')){
      var answer = "Die älteste Person die jemals lebte wurde 122 Jahre alt und starb 1997. Sie hiess Jeanne Calment und war Französin. Quelle: weser-kurier.de";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('ALT') && message.toUpperCase().includes('ICH')){
      var answer = "Du bist zwischen 0 und 122 Jahre alt. 😉";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('JA') || message.toUpperCase().includes('👍')){
      var answer = "Ok";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('NEIN') || message.toUpperCase().includes('👎')){
      var answer = "Schade";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('GUT')){
      var answer = "Toll 😀";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('DANKE')){
      var answer = "Kein Problem 😊";
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
    else if(message.toUpperCase().includes('ICH') && message.toUpperCase().includes('KEINE FREUNDE')){
      var answer = "Das stimmt doch gar nicht, ich bin doch bei dir. ❤";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('DARKMODE')){
      var answer = "Der Darkmode wird aktiviert.";
      sendanswer(answer);
      var answer = "Diese Funktion verwendet Cookies um zu speichern, dass sie den Darkmode aktiviert haben.";
      sendanswer(answer);
      darkmode("#181818");
      Cookies.set('darkmode', 'true', { expires: 86400 })
    }
    else if(message.toUpperCase().includes('TEST')){
      var answer = "Test erfolgreich. ✔";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('EIGEN') && message.toUpperCase().includes('CHAT')){
      var answer = "Eine Anleitung wie du dir selber einen Assistenten, wie mich, machen kannst kommt bald.";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('SMART') && message.toUpperCase().includes('HOME') || message.toUpperCase().includes('LICHT')){
      var answer = "Smarthome Steuerung ist noch nicht verfügbar. Ich arbeite dran...";
      sendanswer(answer);
    }
    else if(message.toUpperCase().includes('SMARTPHONE') && message.toUpperCase().includes('WELCHES')){
      var minphone = 1;
      var maxphone = 4;
      var phone = Math.round(Math.random() * (maxphone - minphone)) + minphone;
      if(phone == 1){
        var answer = "Ich empfehle dir das neue iPhone 12. Es besitzt ein OLED Display und ist in verschiedenen Farben erhältlich.";
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
      else if(phone == 4){
        var answer = "Ich hätte dir jetzt das Google Pixel 4a empfohlen, aber es ist leider nicht in der Schweiz erhältlich.";
        sendanswer(answer);
      }
      var answer = "Werbung wegen Markennenung, unbezahlt. #ad #werbung";
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
        $("#context-menu").toggle( 'fast', function(){
       });
       $('#fav').css('display', 'block');
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
      sendmessage();
    }
  });

  $("#send-btn").click(function(){
    sendmessage();
  });

  // settings
  $("#save-settings").click(function(){ // when save btn clicked
    // set cookies
    Cookies.set('name', $("#name-settings").val(), { expires: 86400 })
    Cookies.set('location', $("#plz-settings").val(), { expires: 86400 })
    // toggle settings
    $("#settings").toggle( 'fast', function(){
    });
    $("#chat").toggle( 'fast', function(){
    });
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
    $('#loading-screen').css('background', color);
    $('i').css('color', color);
    $('input').css('color', color);
    $('::placeholder').css('color', 'rgba(0, 0, 0, 0.5)');
    $('.error').css('color', 'rgba(255, 255, 255, 0.25)');
    $("meta[name=apple-mobile-web-app-status-bar-style]").attr("content", "#181818");
  }

});
