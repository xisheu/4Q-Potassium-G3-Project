
    let difficulty = localStorage.getItem("difficulty");
    let topic = localStorage.getItem("topic");
    let username = localStorage.getItem("username");

    console.log("Difficulty: ", difficulty);
    console.log("Topic: ", topic);

    let currentQuestionIndex = 0; // Keeps track of which question we're on
    let score = 0; // Tracks the player's score
    let timer; // To hold the timer for hard difficulty questions
    let timeLeft = 60; // Timer countdown for hard questions (60 seconds)
    let playerLives = 0;

    if (difficulty=='easy'){     
      playerLives=5;
    }else if (difficulty=='medium'){
      playerLives=4;
    }else if (difficulty=='hard'){
      playerLives=3;
    }

    const questionBank = {
      easy: {
        Algebra: [
          { question: "What is 2 + 2?", answers: ["A) 3", "B) 4", "C) 5", "D) 6"], correctAnswer: 1 },
          { question: "What is 3 + 1?", answers: ["A) 2", "B) 3", "C) 4", "D) 5"], correctAnswer: 2 },
          { question: "What is 5 + 7?", answers: ["A) 12", "B) 13", "C) 14", "D) 15"], correctAnswer: 0 }
        ],
        Geometry: [
          { question: "What is the sum of angles in a triangle?", answers: ["A) 180°", "B) 360°", "C) 90°", "D) 270°"], correctAnswer: 0 },
          { question: "What is the area of a square with side length 4?", answers: ["A) 8", "B) 12", "C) 16", "D) 20"], correctAnswer: 2 },
          { question: "What is the perimeter of a rectangle with length 6 and width 4?", answers: ["A) 20", "B) 24", "C) 30", "D) 12"], correctAnswer: 0 }
        ],
        Statistics: [
          { question: "What is the mean of 2, 4, 6, 8, 10?", answers: ["A) 4", "B) 5", "C) 6", "D) 7"], correctAnswer: 1 },
          { question: "What is the median of 1, 2, 3, 4, 5?", answers: ["A) 2", "B) 3", "C) 4", "D) 5"], correctAnswer: 1 },
          { question: "What is the mode of 2, 3, 3, 4, 5?", answers: ["A) 2", "B) 3", "C) 4", "D) 5"], correctAnswer: 1 }
        ],
        Theory: [
          { question: "What is the formula for the area of a circle?", answers: ["A) πr²", "B) 2πr", "C) r²", "D) πr"], correctAnswer: 0 },
          { question: "What is the Pythagorean theorem?", answers: ["A) a² + b² = c²", "B) a² - b² = c²", "C) a + b = c", "D) a + b = 90°"], correctAnswer: 0 },
          { question: "What does E = mc² stand for?", answers: ["A) Energy equals mass times the speed of light squared", "B) Energy equals mass times the velocity squared", "C) Mass equals energy divided by the speed of light", "D) None of the above"], correctAnswer: 0 }
        ],
        Trigonometry: [
          { question: "What is sin(30°)?", answers: ["A) 1/2", "B) √3/2", "C) 1", "D) 0"], correctAnswer: 0 },
          { question: "What is cos(0°)?", answers: ["A) 1", "B) 0", "C) -1", "D) 0.5"], correctAnswer: 0 },
          { question: "What is tan(45°)?", answers: ["A) 1", "B) 0", "C) √3", "D) 0.5"], correctAnswer: 0 }
        ]
      },
      medium: {
        Algebra: [
          { question: "What is 5 + 7?", answers: ["A) 10", "B) 11", "C) 12", "D) 13", "E) 14"], correctAnswer: 2 },
          { question: "What is 9 + 3?", answers: ["A) 9", "B) 10", "C) 11", "D) 12", "E) 13"], correctAnswer: 3 },
          { question: "What is 4 * 3?", answers: ["A) 10", "B) 12", "C) 14", "D) 16", "E) 18"], correctAnswer: 1 }
        ],
        Geometry: [
          { question: "What is the volume of a cube with side length 3?", answers: ["A) 27", "B) 12", "C) 18", "D) 9", "E) 6"], correctAnswer: 0 },
          { question: "What is the area of a circle with radius 7?", answers: ["A) 49π", "B) 14π", "C) 21π", "D) 28π", "E) 35π"], correctAnswer: 0 },
          { question: "What is the perimeter of a triangle with sides 5, 7, and 9?", answers: ["A) 19", "B) 20", "C) 21", "D) 22", "E) 23"], correctAnswer: 2 }
        ],
        Statistics: [
          { question: "What is the mean of 5, 10, 15, 20?", answers: ["A) 12.5", "B) 15", "C) 16", "D) 18"], correctAnswer: 1 },
          { question: "What is the median of 3, 5, 7, 9, 11?", answers: ["A) 5", "B) 7", "C) 6", "D) 9"], correctAnswer: 1 },
          { question: "What is the standard deviation of 1, 2, 3, 4, 5?", answers: ["A) 1.58", "B) 1.71", "C) 2.0", "D) 0.5"], correctAnswer: 0 }
        ],
        Theory: [
          { question: "What is Newton's second law?", answers: ["A) F = ma", "B) F = mv", "C) E = mc²", "D) P = mv²"], correctAnswer: 0 },
          { question: "What is the formula for kinetic energy?", answers: ["A) 1/2mv²", "B) 1/2mv", "C) mv²", "D) mgh"], correctAnswer: 0 },
          { question: "What is the gravitational constant?", answers: ["A) 6.67 × 10⁻¹¹", "B) 9.81", "C) 10⁻⁸", "D) 9.5"], correctAnswer: 0 }
        ],
        Trigonometry: [
          { question: "What is sin(45°)?", answers: ["A) 1/√2", "B) √3/2", "C) 1", "D) 0"], correctAnswer: 0 },
          { question: "What is cos(30°)?", answers: ["A) √3/2", "B) 1/2", "C) 0", "D) 1"], correctAnswer: 0 },
          { question: "What is tan(60°)?", answers: ["A) √3", "B) 1", "C) 0", "D) 1/√3"], correctAnswer: 0 }
        ]
      },
      hard: {
        Algebra: [
          { question: "Solve for x: 2x + 3 = 7", correctAnswer: "x = 2" },
          { question: "Solve for x: 5x - 2 = 18", correctAnswer: "x = 4" },
          { question: "Solve for x: 3x + 5 = 20", correctAnswer: "x = 5" }
        ],
        Geometry: [
          { question: "Find the area of a triangle with base 8 and height 5.", correctAnswer: "Area = 20" },
          { question: "Find the volume of a cylinder with radius 3 and height 10.", correctAnswer: "Volume = 90π" },
          { question: "Find the perimeter of a rectangle with length 12 and width 8.", correctAnswer: "Perimeter = 40" }
        ],
        Statistics: [
          { question: "What is the probability of rolling a 6 on a die?", correctAnswer: "1/6" },
          { question: "What is the mean of 2, 4, 6, 8, 10, 12?", correctAnswer: "7" },
          { question: "What is the variance of 3, 5, 7, 9?", correctAnswer: "5.25" }
        ],
        Theory: [
          { question: "What is the second law of thermodynamics?", correctAnswer: "Entropy of an isolated system always increases" },
          { question: "What is the equation for acceleration?", correctAnswer: "a = (v - u) / t" },
          { question: "What is the law of universal gravitation?", correctAnswer: "F = G(m₁m₂) / r²" }
        ],
        Trigonometry: [
          { question: "What is the formula for the Law of Sines?", correctAnswer: "sin(A)/a = sin(B)/b = sin(C)/c" },
          { question: "What is the Law of Cosines?", correctAnswer: "c² = a² + b² - 2ab * cos(C)" },
          { question: "What is the value of sin(60°)?", correctAnswer: "√3/2" }
        ]
      }
    };

    // Function to load the questions based on selected difficulty and topic
    function loadQuestions() {
      // Check if the question bank exists for the selected difficulty and topic
      if (!questionBank[difficulty] || !questionBank[difficulty][topic]) {
        alert("No questions available for this difficulty/topic.");
        return;
      }

      

      // Get the list of questions for the current difficulty and topic
      let questions = questionBank[difficulty][topic];      

      // Display the current question on the screen
      displayQuestion(questions[currentQuestionIndex]);
    }

    // Function to display the current question and answer options
    function displayQuestion(questionData) {
      const questionContainer = document.getElementById("question-container");
      const answerButtons = document.getElementById("answer-buttons");
      const inputField = document.getElementById("input-field");

      // Set the question text
      questionContainer.innerHTML = `<p>${questionData.question}</p>`;

      // Clear any previous answer options or input field
      answerButtons.innerHTML = "";
      inputField.innerHTML = "";  // Clear any input field for non-hard questions

      // For easy and medium difficulties, create buttons for answer choices
      if (questionData.answers) {
        questionData.answers.forEach((answer, index) => {
          let button = document.createElement("button");
          button.textContent = answer;
          button.style.fontSize="40px";
          button.style.marginLeft="10px";
          
          // Add an event listener to each button to check the answer
          button.onclick = () => checkAnswer(index === questionData.correctAnswer, questionData);
          answerButtons.appendChild(button);
        });
        // alert(difficulty);
        if (difficulty=='easy'){          
        }else if (difficulty=='medium'){
          timeLeft=75;
          startTimer(); // Start the countdown timer
        }
      }
      // For hard difficulty, create an input field for the user to type their answer
      else {
        inputField.innerHTML = `
          <input type="text" id="user-answer" placeholder="Your answer" style="font-size: 40px;"">
          <button onclick="checkAnswerHard()" style="font-size: 40px;margin-top: 10px;"">Submit</button>
        `;
        timeLeft=100;
        startTimer(); // Start the countdown timer
      }
    }

    // Function to check if the answer is correct for easy and medium difficulties
    function checkAnswer(isCorrect, questionData) {
      // If the answer is correct, award points; otherwise, deduct points
      if (isCorrect) {
        score += (difficulty === "easy" ? 10 : 15);  // Different points for easy and medium difficulties
        playerLives+=1;
      } else {
        score -= (difficulty === "easy" ? 3 : 5);  // Different penalties for easy and medium difficulties
        playerLives-=1;

        if (playerLives==0){
          alert(`Game over! You answer all wrong!`);        
          window.location.href = "index.html";
        }else if (playerLives==1){
          alert(`You answered incorrect! ${playerLives} more attempt and the game will be over!`);
        }
        else{
          alert(`You answered incorrect! ${playerLives} more attempts...`);
        }
      }

      

      // Move to the next question after a short delay
      currentQuestionIndex++;
      // alert(currentQuestionIndex);

      setTimeout(() => {
        // If there are more questions, load the next one
        if (currentQuestionIndex < questionBank[difficulty][topic].length) {
          loadQuestions();
        } else {
          // If there are no more questions, end the quiz and show the score
          alert(`Game over! Your score: ${score}`);
          saveHighScore(score, username);  // Save the score to the leaderboard
          window.location.href = "index.html";  // Redirect to the main page
        }
      }, 1000);
    }

    // Function to check if the answer is correct for hard questions
    function checkAnswerHard() {
      const userAnswer = document.getElementById("user-answer").value.trim();
      const correctAnswer = questionBank[difficulty][topic][currentQuestionIndex].correctAnswer;

      // Check if the user's answer matches the correct answer
      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score += 25;  // Award points for correct answer
      } else {
        score -= 10;  // Deduct points for incorrect answer
      }

      // Move to the next question after a short delay
      currentQuestionIndex++;
      setTimeout(() => {
        // If there are more questions, load the next one
        if (currentQuestionIndex < questionBank[difficulty][topic].length) {
          loadQuestions();
        } else {
          // If there are no more questions, end the quiz and show the score
          alert(`Game over! Your score: ${score}`);
          saveHighScore(score, username);  // Save the score to the leaderboard
          window.location.href = "index.html";  // Redirect to the main page
        }
      }, 1000);
    }

    // Function to start the timer for hard questions (1-minute timer)
    function startTimer() {
      // timeLeft = 60; // Reset the timer to 60 seconds
      timer = setInterval(() => {
        timeLeft--;  // Decrease the time left by 1 each second
        if (timeLeft <= 0) {
          clearInterval(timer);  // Stop the timer when it reaches 0
          alert("Time's up!");  // Notify the player that time is up
          checkAnswer(false);  // Consider the answer incorrect if time runs out
        }
      }, 1000);  // Set the interval to 1 second (1000ms)
    }

    // Function to save the score to the leaderboard (high scores)
    function saveHighScore(score, username) {
      // Retrieve high score from localStorage or database, depending on your implementation
      let prevScore=localStorage.getItem("HighScore");
      if (prevScore<score){
        localStorage.setItem("HighScore", score);
      }
      
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
          let prevUser=localStorage.getItem("prevUser");
          let currentUser=localStorage.getItem("username");          
          if (prevUser!=currentUser) {
            document.getElementById("welcome_user").innerHTML = `<h4>Welcome to the game ${currentUser}</h4>`;  
            localStorage.setItem("prevUser", currentUser);
          }
          else{
            document.getElementById("welcome_user").innerHTML = `<h4>Welcome back to the game ${currentUser}</h4>`; 
          }
          
          
                   
          if (!difficulty || !topic) {
            alert("No difficulty or topic selected. Please go back to the main page and select one.");
            window.location.href = "index.html";
          }
          loadQuestions();
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }      
      }
    }
	