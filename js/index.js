
    function setCookie(cname,cvalue,exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    
    function checkCookie() {
      let user = getCookie("username");
      if (user != "") {
        alert("Welcome again " + user);
      } else {
        user = prompt("Please enter your name:","");
        if (user != "" && user != null) {
          setCookie("username", user, 30);
        }
      }
    }

     var selectedDifficulty = "";
     var selectedTopic = "";
 
     var nameInput = document.getElementById("name");
     var title = document.getElementById("title");
 
     nameInput.addEventListener("input", function () {
       var typedName = nameInput.value;
       if (typedName.length > 0) {
         title.textContent = "Start your quiz, " + typedName + "!";
       } else {
         title.textContent = "Start Your Quiz";
       }
     });
 
     function chooseDifficulty(difficulty, element) {
       selectedDifficulty = difficulty;
       var allButtons = document.getElementById("difficulty-group").children;
       for (var i = 0; i < allButtons.length; i++) {
         allButtons[i].classList.remove("active");
       }
       element.classList.add("active");
     }
 
     function chooseTopic(topic, element) {
       selectedTopic = topic;
       var allButtons = document.getElementById("topic-group").children;
       for (var i = 0; i < allButtons.length; i++) {
         allButtons[i].classList.remove("active");
       }
       element.classList.add("active");
     }
 
     function saveInfoAndStart(event) {
       event.preventDefault();
       var name = nameInput.value;
       if (selectedDifficulty === "" || selectedTopic === "") {
         alert("Please select both difficulty and topic.");
         return;
       }
       localStorage.setItem("username", encodeURIComponent(name));
       localStorage.setItem("difficulty",selectedDifficulty);
       localStorage.setItem("topic", selectedTopic);
      
       alert("You can now proceed to your chosen quiz. Good luck, " + name + "!.");
       
       window.location.href = "quiz.html";
     }

    function clearInfo(){
      localStorage.setItem("username", null);
      localStorage.setItem("difficulty",null);
      localStorage.setItem("topic", null);

      let currentScore=localStorage.getItem("HighScore");
      if (currentScore==null) {
        currentScore=0
      }
      document.getElementById("displayScore_Label").innerHTML = `Hi score to beat ${currentScore}`;
    }

    var i = 0;
    function move() {
      if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
          elem.style.display = "none";
          clearInfo();          
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }      
      }
    }
