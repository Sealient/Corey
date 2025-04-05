document.addEventListener('DOMContentLoaded', function() {
    // Create stars in the background
    createStars();
    
    // Initialize the reasons display
    initReasons();
    
    // Add hover effects to memory photos
    initMemories();
});

// Create starry background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        
        // Random size and animation delay
        const size = Math.random() * 2;
        const delay = Math.random() * 10;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.animationDelay = `${delay}s`;
        
        // Add twinkle animation
        star.style.position = 'absolute';
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.animation = 'twinkle 4s infinite';
        
        starsContainer.appendChild(star);
    }
    
    // Add twinkle keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Create falling hearts animation
function createFallingHearts() {
    const container = document.querySelector('.falling-hearts');
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart-fall');
            
            // Random position, size and animation duration
            const startPos = Math.random() * window.innerWidth;
            const size = Math.random() * 15 + 10;
            const duration = Math.random() * 5 + 3;
            const opacity = Math.random() * 0.5 + 0.3;
            
            heart.style.left = `${startPos}px`;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.opacity = opacity;
            
            // Set animation
            heart.style.animation = `fall ${duration}s linear infinite`;
            
            container.appendChild(heart);
            
            // Add fall animation keyframes
            if (!document.getElementById('fall-animation')) {
                const style = document.createElement('style');
                style.id = 'fall-animation';
                style.textContent = `
                    @keyframes fall {
                        0% {
                            transform: translateY(-100px) rotate(-45deg) translateX(0);
                            opacity: ${opacity};
                        }
                        100% {
                            transform: translateY(${window.innerHeight}px) rotate(-45deg) translateX(${Math.random() * 200 - 100}px);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }, i * 300);
    }
}

// Initialize reasons section
function initReasons() {
    const reasons = [
        "Your beautiful smile brightens up my darkest days.",
        "The way your eyes sparkle when you talk about something you love.",
        "How passionate you are about the color purple.",
        "Your gentle heart and kindness towards everyone you meet.",
        "The cute way you drive your Mini Cooper named Comet.",
        "Your infectious laugh that makes me smile every time.",
        "The warmth and joy you bring into my life every single day.",
        "How you always know what to say when I need comfort.",
        "Your creativity and the way you see beauty in everything.",
        "The little dance moves you do when you're happy.",
        "How adorable you look when you're focused on something.",
        "The way you say my name.",
        "Your strength and resilience when facing challenges.",
        "The trust and understanding we share.",
        "How you make even ordinary moments feel special."
    ];
    
    const reasonsContainer = document.querySelector('.reasons-container');
    const newReasonButton = document.getElementById('new-reason');
    
    // Display initial reason
    showRandomReason();
    
    // Button click event
    newReasonButton.addEventListener('click', function() {
        showRandomReason();
    });
    
    function showRandomReason() {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        
        // Fade out effect
        reasonsContainer.style.opacity = 0;
        
        setTimeout(() => {
            reasonsContainer.textContent = reasons[randomIndex];
            reasonsContainer.style.opacity = 1;
        }, 300);
    }
}

// Initialize love note functionality
function initLoveNotes() {
    const saveButton = document.getElementById('save-note');
    const noteInput = document.getElementById('love-note');
    const notesList = document.getElementById('notes-list');
    
    // Load saved notes from localStorage
    loadSavedNotes();
    
    saveButton.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            saveNote(noteText);
            noteInput.value = '';
        }
    });
    
    function saveNote(text) {
        // Get existing notes or initialize empty array
        let savedNotes = JSON.parse(localStorage.getItem('coreyLoveNotes') || '[]');
        
        // Add new note with timestamp
        savedNotes.push({
            text: text,
            date: new Date().toLocaleString()
        });
        
        // Save back to localStorage
        localStorage.setItem('coreyLoveNotes', JSON.stringify(savedNotes));
        
        // Refresh the displayed notes
        loadSavedNotes();
    }
    
    function loadSavedNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('coreyLoveNotes') || '[]');
        notesList.innerHTML = '';
        
        if (savedNotes.length === 0) {
            notesList.innerHTML = '<p>No notes yet. Write your first one!</p>';
            return;
        }
        
        savedNotes.forEach((note, index) => {
            const noteEl = document.createElement('div');
            noteEl.classList.add('saved-note');
            noteEl.innerHTML = `
                <p>${note.text}</p>
                <small>${note.date}</small>
                <button class="delete-note" data-index="${index}">×</button>
            `;
            notesList.appendChild(noteEl);
        });
        
        // Add delete functionality
        document.querySelectorAll('.delete-note').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteNote(index);
            });
        });
    }
    
    function deleteNote(index) {
        let savedNotes = JSON.parse(localStorage.getItem('coreyLoveNotes') || '[]');
        savedNotes.splice(index, 1);
        localStorage.setItem('coreyLoveNotes', JSON.stringify(savedNotes));
        loadSavedNotes();
    }
}

// Initialize relationship countdown timer
function initCountdown() {
    // Set your relationship start date here (YYYY, MM-1, DD)
    // Note: Month is 0-indexed (January = 0, December = 11)
    const startDate = new Date(2025, 2, 21); // April 21, 2025
    
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update DOM
        document.getElementById('days-together').textContent = days;
        document.getElementById('hours-together').textContent = hours;
        document.getElementById('minutes-together').textContent = minutes;
        document.getElementById('seconds-together').textContent = seconds;
    }
    
    // Update immediately and then every second
    updateCounter();
    setInterval(updateCounter, 1000);
}

// Initialize music player
function initMusicPlayer() {
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const progressFill = document.querySelector('.progress-fill');
    
    // Create an audio element
    const audio = new Audio();
    // Replace with your actual song URL - this is just a placeholder behavior
    // audio.src = 'music.mp3';
    
    let isPlaying = false;
    let progressInterval;
    
    playButton.addEventListener('click', function() {
        // In a real implementation, you would uncomment these lines
        // audio.play();
        isPlaying = true;
        
        // Simulate playback for the demo
        simulatePlayback();
    });
    
    pauseButton.addEventListener('click', function() {
        // In a real implementation, you would uncomment this line
        // audio.pause();
        isPlaying = false;
        
        // Clear the simulation interval
        clearInterval(progressInterval);
    });
    
    function simulatePlayback() {
        let progress = 0;
        clearInterval(progressInterval);
        
        progressInterval = setInterval(() => {
            if (!isPlaying) return;
            
            progress += 0.5;
            if (progress > 100) progress = 0;
            
            progressFill.style.width = `${progress}%`;
        }, 100);
    }
}

// Call all the new functions when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Original functions
    createStars();
    initReasons();
    initMemories();
    
    // New functions
    createFallingHearts();
    initLoveNotes();
    initCountdown();
    initMusicPlayer();
});

// Initialize photo memories
function initMemories() {
    const memories = document.querySelectorAll('.memory-placeholder');
    
    memories.forEach(memory => {
        memory.addEventListener('click', function() {
            // You can add functionality to view full images later
            alert(`This is where a special photo of: "${this.getAttribute('data-message')}" would be displayed.`);
        });
    });
}

// Custom cursor implementation
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  
  const follower = document.createElement('div');
  follower.classList.add('custom-cursor-follower');
  
  document.body.appendChild(cursor);
  document.body.appendChild(follower);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower follows with slight delay for nice effect
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    }, 70);
  });
  
  // Add active class on click
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.2)';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

// Scroll reveal animation
function initScrollReveal() {
  // Add the reveal-element class to sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-element');
  });
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }
  
  // Check all elements on scroll
  function checkElements() {
    document.querySelectorAll('.reveal-element').forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('visible');
      }
    });
  }
  
  // Initial check and add scroll listener
  checkElements();
  window.addEventListener('scroll', checkElements);
}

// Typing animation for title
function initTypingAnimation() {
  const title = document.querySelector('.title');
  const originalText = title.textContent;
  title.textContent = '';
  
  let i = 0;
  const typeSpeed = 150;
  
  function typeWriter() {
    if (i < originalText.length) {
      title.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, typeSpeed);
    }
  }
  
  setTimeout(typeWriter, 500);
}

// Interactive knowledge quiz about Corey
function initQuiz() {
  const quizData = [
    {
      question: "What is Corey's favorite color?",
      options: ["Purple", "Blue", "Pink", "Green"],
      correct: 0
    },
    {
      question: "What is the name of Corey's Mini Cooper?",
      options: ["Star", "Comet", "Flash", "Speedy"],
      correct: 1
    },
    {
      question: "Which of these best describes Corey?",
      options: ["Serious and reserved", "Loving and affectionate", "Strict and disciplined", "Shy and distant"],
      correct: 1
    },
    {
      question: "What quality do you admire most about Corey?",
      options: ["Her warmth", "Her intelligence", "Her creativity", "All of the above"],
      correct: 3
    },
    {
      question: "What brings the most joy to Corey's life?",
      options: ["Being alone", "Playing sports", "Spending time with you", "Working late"],
      correct: 2
    }
  ];
  
  const startBtn = document.getElementById('start-quiz');
  const retakeBtn = document.getElementById('retake-quiz');
  const quizStart = document.getElementById('quiz-start');
  const quizQuestions = document.getElementById('quiz-questions');
  const quizResults = document.getElementById('quiz-results');
  const questionText = document.getElementById('question-text');
  const currentQuestionSpan = document.getElementById('current-question');
  const scoreSpan = document.getElementById('score');
  const resultMessage = document.querySelector('.result-message');
  const optionBtns = document.querySelectorAll('.option-btn');
  
  let currentQuestion = 0;
  let score = 0;
  
  function startQuiz() {
    quizStart.style.display = 'none';
    quizQuestions.style.display = 'block';
    quizResults.style.display = 'none';
    currentQuestion = 0;
    score = 0;
    showQuestion();
  }
  
  function showQuestion() {
    resetOptions();
    currentQuestionSpan.textContent = currentQuestion + 1;
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    
    question.options.forEach((option, index) => {
      const button = document.querySelector(`.option-btn[data-index="${index}"]`);
      button.textContent = option;
      
      button.onclick = () => selectAnswer(index);
    });
  }
  
  function resetOptions() {
    optionBtns.forEach(btn => {
      btn.classList.remove('correct', 'incorrect');
      btn.disabled = false;
    });
  }
  
  function selectAnswer(index) {
    const correct = quizData[currentQuestion].correct;
    
    // Disable all buttons after selection
    optionBtns.forEach(btn => {
      btn.disabled = true;
    });
    
    // Mark the selected answer
    if (index === correct) {
      optionBtns[index].classList.add('correct');
      score++;
    } else {
      optionBtns[index].classList.add('incorrect');
      optionBtns[correct].classList.add('correct');
    }
    
    // Move to next question after delay
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }
  
  function showResults() {
    quizQuestions.style.display = 'none';
    quizResults.style.display = 'block';
    scoreSpan.textContent = score;
    
    // Custom message based on score
    if (score === 5) {
      resultMessage.textContent = "Wow! You know Corey perfectly! You're truly her perfect match!";
    } else if (score >= 3) {
      resultMessage.textContent = "Great job! You know Corey quite well. She's lucky to have you!";
    } else {
      resultMessage.textContent = "There's always more to learn about the amazing Corey. Keep getting to know her better!";
    }
  }
  
  // Event listeners
  startBtn.addEventListener('click', startQuiz);
  retakeBtn.addEventListener('click', startQuiz);
}

// Call all new functions when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Original and previously added functions here
  
  // New advanced functions
  initCustomCursor();
  initScrollReveal();
  initTypingAnimation();
  initQuiz();
  
  // Add glow effect to all headings
  document.querySelectorAll('h1, h2, h3').forEach(heading => {
    heading.classList.add('glow-on-hover');
  });
});

// Add this to enhance the car animation
function enhanceCarAnimation() {
  const miniCooper = document.querySelector('.mini-cooper');
  
  // Add headlights
  const headlights = document.createElement('div');
  headlights.classList.add('headlights');
  headlights.innerHTML = `
    <div class="left-light"></div>
    <div class="right-light"></div>
  `;
  miniCooper.appendChild(headlights);
  
  // Add this CSS through JavaScript
  const style = document.createElement('style');
  style.textContent = `
    .headlights {
      position: absolute;
      width: 100%;
      bottom: 5px;
    }
    
    .left-light, .right-light {
      position: absolute;
      width: 10px;
      height: 5px;
      background: #fff9c4;
      border-radius: 50%;
      bottom: 0;
      box-shadow: 0 0 10px 5px rgba(255, 249, 196, 0.7);
    }
    
    .left-light {
      left: 5px;
    }
    
    .right-light {
      right: 5px;
    }
    
    .mini-cooper {
      overflow: visible !important;
    }
    
    .road:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 30px;
      width: 100%;
      height: 20px;
      background: rgba(0,0,0,0.2);
      filter: blur(10px);
      border-radius: 50%;
    }
  `;
  document.head.appendChild(style);
}

// Call this function in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  // Other functions...
  enhanceCarAnimation();
});

// Add a special message on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        const specialMessage = document.createElement('div');
        specialMessage.classList.add('special-message');
        specialMessage.innerHTML = `
            <div class="message-content">
                <h3>Hey Corey!</h3>
                <p>Just wanted to remind you how special you are to me.</p>
                <button id="close-message">💜</button>
            </div>
        `;
        
        // Style the message
        specialMessage.style.position = 'fixed';
        specialMessage.style.top = '50%';
        specialMessage.style.left = '50%';
        specialMessage.style.transform = 'translate(-50%, -50%)';
        specialMessage.style.background = 'rgba(156, 39, 176, 0.9)';
        specialMessage.style.padding = '20px';
        specialMessage.style.borderRadius = '10px';
        specialMessage.style.zIndex = '100';
        specialMessage.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        specialMessage.style.textAlign = 'center';
        
        // Style the close button
        const closeButton = specialMessage.querySelector('#close-message');
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.marginTop = '15px';
        
        document.body.appendChild(specialMessage);
        
        // Close message event
        closeButton.addEventListener('click', function() {
            document.body.removeChild(specialMessage);
        });
    }, 1500);
});