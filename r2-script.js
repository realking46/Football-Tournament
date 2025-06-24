const matchDetails = document.getElementById('match-details');
const goalsContainer1 = document.getElementById('goals-container1');
const addGoalButton1 = document.getElementById('add-goal1');
const goalsContainer2 = document.getElementById('goals-container2');
const addGoalButton2 = document.getElementById('add-goal2');

const tournamentData = JSON.parse(localStorage.getItem('tournamentData')) || {};

// Extract `player_names_left` and `leftPlayers`
const playerNamesLeft = tournamentData.player_names_left || [];
const leftPlayers = tournamentData.leftPlayers || [];

// Reference to the left rating container
const leftRatingContainer = document.getElementById('left-rating');

// Extract `player_names_right` and `rightPlayers`
const playerNamesRight = tournamentData.player_names_right || [];
const rightPlayers = tournamentData.rightPlayers || [];

// Reference to the right rating container
const rightRatingContainer = document.getElementById('right-rating');

// List of players for assist and "Man of the Match" selection
const players = [...playerNamesLeft,...playerNamesRight];
const playerImages = [...leftPlayers,...rightPlayers];

// Populate goals
function populateGoalsleft(goals) {
  goalsContainer1.innerHTML = '';
  goals.forEach((goal) => {
    const goalEntry = createGoalEntryleft(goal.time, goal.scorer, goal.assist);
    goalsContainer1.appendChild(goalEntry);
  });
}

function populateGoalsright(goals) {
  goalsContainer2.innerHTML = '';
  goals.forEach((goal) => {
    const goalEntry = createGoalEntryright(goal.time, goal.scorer, goal.assist);
    goalsContainer2.appendChild(goalEntry);
  });
}

// Create a goal entry element
function createGoalEntryleft(time = '', scorer = '', assist = '') {
    const goalEntry = document.createElement('div');
    goalEntry.classList.add('goal-entry1');
  
    // Create input for time (min)
    const timeInput = document.createElement('input');
    timeInput.type = 'number';
    timeInput.placeholder = 'Time (min)';
    timeInput.value = time;
  
    // Create a select dropdown for the goal scorer
    const goalSelect = document.createElement('select');
    goalSelect.classList.add('g-select');
    goalSelect.innerHTML = playerNamesLeft.map(player => `<option value="${player}" ${scorer === player ? 'selected' : ''}>${player}</option>`).join('');
  
    // Create a select dropdown for the assist
    const assistSelect = document.createElement('select');
    assistSelect.classList.add('a-select');
    assistSelect.innerHTML = `<option value="None" ${assist === 'None' ? 'selected' : ''}>None</option>`;
    assistSelect.innerHTML += playerNamesLeft
      .map(player => `<option value="${player}" ${assist === player ? 'selected' : ''}>${player}</option>`)
      .join('');
      
    // Append elements to goal entry
    goalEntry.appendChild(timeInput);
    goalEntry.appendChild(goalSelect);
    goalEntry.appendChild(assistSelect);
  
    return goalEntry;
}

function createGoalEntryright(time = '', scorer = '', assist = '') {
  const goalEntry = document.createElement('div');
  goalEntry.classList.add('goal-entry2');

  // Create input for time (min)
  const timeInput = document.createElement('input');
  timeInput.type = 'number';
  timeInput.placeholder = 'Time (min)';
  timeInput.value = time;

  // Create a select dropdown for the goal scorer
  const goalSelect = document.createElement('select');
  goalSelect.classList.add('g-select');
  goalSelect.innerHTML = playerNamesRight.map(player => `<option value="${player}" ${scorer === player ? 'selected' : ''}>${player}</option>`).join('');

  // Create a select dropdown for the assist
  const assistSelect = document.createElement('select');
  assistSelect.classList.add('a-select');
  assistSelect.innerHTML = `<option value="None" ${assist === 'None' ? 'selected' : ''}>None</option>`;
  assistSelect.innerHTML += playerNamesRight
    .map(player => `<option value="${player}" ${assist === player ? 'selected' : ''}>${player}</option>`)
    .join('');
    
  // Append elements to goal entry
  goalEntry.appendChild(timeInput);
  goalEntry.appendChild(goalSelect);
  goalEntry.appendChild(assistSelect);

  return goalEntry;
}

// Add a goal entry dynamically
addGoalButton1.addEventListener('click', () => {
    const newGoalEntry = createGoalEntryleft();
    goalsContainer1.appendChild(newGoalEntry);
});

// Add a goal entry dynamically
addGoalButton2.addEventListener('click', () => {
    const newGoalEntry = createGoalEntryright();
    goalsContainer2.appendChild(newGoalEntry);
});

// Get all buttons with the class 'remove-goal'
const removeGoalButton1 = document.getElementById('remove-goal1');
const removeGoalButton2 = document.getElementById('remove-goal2');

// Loop through all the buttons and attach event listeners
removeGoalButton1.addEventListener('click', () => {
    const lastGoalEntry = goalsContainer1.lastElementChild;
    if (lastGoalEntry) {
        lastGoalEntry.remove(); // Remove the last goal entry
    }
});

removeGoalButton2.addEventListener('click', () => {
    const lastGoalEntry = goalsContainer2.lastElementChild;
    if (lastGoalEntry) {
        lastGoalEntry.remove(); // Remove the last goal entry
    }
});


//...............................................
//motm

// Reference the dropdown container
const motmSelect = document.getElementById('man-of-the-match');
const motmImage = document.getElementById('man-of-the-match-image');

// Populate the dropdown
function populateMotmDropdown(players, names) {
    motmSelect.innerHTML = ''; // Clear existing options

    // Add the default "Select Player" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select Player';
    motmSelect.appendChild(defaultOption);

    players.forEach((player, index) => {
        // Create an option element
        const option = document.createElement('option');
        option.value = names[index];
        // ?.slice(0, -3) || player.alt; // Remove last 3 chars from name or fallback to alt
        option.textContent = names[index];
        // ?.slice(0, -3) || player.alt;
        option.setAttribute('data-image', player.src); // Attach the image as a custom attribute

        // Append the option to the dropdown
        motmSelect.appendChild(option);
    });
}
// Update the image when a player is selected
function updateMotmImage() {
  const selectedOption = motmSelect.options[motmSelect.selectedIndex];
  const playerImage = selectedOption.getAttribute('data-image');

  if (playerImage) {
      motmImage.src = playerImage;
      motmImage.style.display = 'inline'; // Show the image
  } else {
      motmImage.style.display = 'none'; // Hide the image if no selection
  }
}
// Add event listener for dropdown change
motmSelect.addEventListener('change', updateMotmImage);

// Populate the dropdown and set the initial image
populateMotmDropdown(playerImages, players);
// Call the function to populate the dropdown
populateMotmDropdown(playerImages,players);


//............................................................

//rating

// Generate rating section
function generateRatingSection(names, players, container) {
    container.innerHTML = ''; // Clear any existing content

    // Iterate through names and match with players
    names.forEach((name) => {
        // Find the corresponding player object by name
        const player = players.find((p) => p.alt === name.slice(0, -4)) || { src: '', alt: name };

        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-rating');

        // Player image
        const img = document.createElement('img');
        img.src = player.src || ''; // Image source
        img.alt = player.alt || ''; // Player name
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.borderRadius = '10px';
        img.style.marginRight = '10px';

        // Player name
        const nameSpan = document.createElement('span');
        nameSpan.textContent = name || 'Unknown Player'; // Use name from playerNamesLeft
        nameSpan.style.marginRight = '10px';

        // Rating input
        const ratingInput = document.createElement('input');
        ratingInput.type = 'number';
        ratingInput.min = '0';
        ratingInput.max = '10';
        ratingInput.placeholder = 'Rating';
        ratingInput.style.fontSize= '13pt';
        ratingInput.style.width = '30%';
        ratingInput.style.marginLeft = '10px';
        ratingInput.style.padding = '9px';
        ratingInput.style.paddingLeft = '20px';

        // Append elements to player div
        playerDiv.appendChild(img);
        playerDiv.appendChild(nameSpan);
        playerDiv.appendChild(ratingInput);

        // Append player div to container
        container.appendChild(playerDiv);
    });
}

// Generate the left rating section
generateRatingSection(playerNamesLeft, leftPlayers, leftRatingContainer);
generateRatingSection(playerNamesRight, rightPlayers, rightRatingContainer);


//.............................................................................
//logo setting at top

// Get the `leftTeamImg` value
const leftTeamImg = tournamentData.leftTeamImg || '';
const rightTeamImg = tournamentData.rightTeamImg || '';

// Reference to the `.round_logo_left` div
const roundLogoLeft = document.querySelector('.round_logo_left');
const roundLogoRight = document.querySelector('.round_logo_right');

// Set the background image dynamically using the relative path
if (leftTeamImg) {
    roundLogoLeft.style.backgroundImage = `url('${leftTeamImg}')`;
} else {
    console.log('No image found in local storage for leftTeamImg.');
}
if (rightTeamImg) {
    roundLogoRight.style.backgroundImage = `url('${rightTeamImg}')`;
} else {
    console.log('No image found in local storage for leftTeamImg.');
}

// Get the leftTeam value from the tournament data
const leftTeam = tournamentData.leftTeam || 'Unknown Team'; // Default to 'Unknown Team' if not found
const rightTeam = tournamentData.rightTeam || 'Unknown Team'; // Default to 'Unknown Team' if not found

// Reference to the left team name div
const leftTeamNameDiv = document.getElementById('left-team-name');
const rightTeamNameDiv = document.getElementById('right-team-name');

// Set the text content of the div to the left team name
leftTeamNameDiv.textContent = leftTeam;
rightTeamNameDiv.textContent = rightTeam;



//.......................................
//saving


// Function to collect data and save to localStorage
// Save match data to local storage
function saveMatchData() {
  // Get the score inputs
  const leftScoreInput = document.getElementById('left-score');
  const rightScoreInput = document.getElementById('right-score');
  const leftScore = leftScoreInput ? leftScoreInput.value : '';
  const rightScore = rightScoreInput ? rightScoreInput.value : '';

  var win;
  if(leftScore>rightScore){
    win= document.getElementById('left-team-name').textContent;
  }
  else if(leftScore<rightScore){
    win= document.getElementById('right-team-name').textContent;
  }
  else{
    win="none";
  }

  // Get the goal entries for both teams
  const goalsLeft = collectGoals(goalsContainer1);
  const goalsRight = collectGoals(goalsContainer2);

  // Get the MOTM selection
  const motmSelect = document.getElementById('man-of-the-match');
  const motm = motmSelect ? motmSelect.value : '';

  // Get the ratings for both teams
  const leftRatings = collectRatings(leftRatingContainer);
  const rightRatings = collectRatings(rightRatingContainer);

  // Create the final data object
  const r2 = {
      leftTeam: document.getElementById('left-team-name').textContent,
      rightTeam: document.getElementById('right-team-name').textContent,
      score: {
          left: leftScore,
          right: rightScore
      },
      goalsLeft: goalsLeft,
      goalsRight: goalsRight,
      manOfTheMatch: motm,
      ratingsLeft: leftRatings,
      ratingsRight: rightRatings,
      winner:win
  };

  // Save the final data to localStorage
  try {
      localStorage.setItem('r2', JSON.stringify(r2));
      console.log('Match data saved successfully!');
      alert("Data Saved");
  } catch (error) {
      console.error('Error saving match data to localStorage:', error);
  }
}

// Collect goals data from the provided container (either left or right)
function collectGoals(goalsContainer) {
  const goalEntries = goalsContainer ? goalsContainer.querySelectorAll('.goal-entry1, .goal-entry2') : [];
  const goals = [];
  goalEntries.forEach(entry => {
      const time = entry.querySelector('input[type="number"]') ? entry.querySelector('input[type="number"]').value : '';
      const scorer = entry.querySelector('select.g-select') ? entry.querySelector('select.g-select').value : '';
      const assist = entry.querySelector('select.a-select') ? entry.querySelector('select.a-select').value : '';
      if (time && scorer) {  // Ensure there is at least a time and scorer
          goals.push({ time, scorer, assist });
      }
  });
  return goals;
}

// Collect ratings data for the players in the provided container
function collectRatings(ratingContainer) {
  const ratingEntries = ratingContainer ? ratingContainer.querySelectorAll('.player-rating') : [];
  const ratings = [];

  ratingEntries.forEach(entry => {
      const nameSpan = entry.querySelector('span'); // Assuming player name is inside a <span>
      const ratingInput = entry.querySelector('input[type="number"]');
      
      const name = nameSpan ? nameSpan.textContent : '';  // Get the player name
      const rating = ratingInput ? ratingInput.value : '';  // Get the rating value

      if (name && rating) {
          ratings.push({ name, rating });  // Store both name and rating as an object
      }
  });

  return ratings;
}

// Attach event listener to the save button
const saveButton = document.getElementById('save-button');
if (saveButton) {
  saveButton.addEventListener('click', saveMatchData);
} else {
  console.error('Save button not found!');
}

// Attach the save function to a button or event (e.g., when clicking "Save" button)
document.getElementById('save-button').addEventListener('click', saveMatchData);
const savedData = JSON.parse(localStorage.getItem('r2'));
console.log(savedData);

// Function to reset the match data to its initial state
function resetMatchData() {
  // Reset score inputs
  document.getElementById('left-score').value = '';
  document.getElementById('right-score').value = '';

  // Reset goals and assists containers
  goalsContainer1.innerHTML = ''; // Clear left side goals
  goalsContainer2.innerHTML = ''; // Clear right side goals

  // Remove any added goal entries
  const initialGoalEntry1 = createGoalEntryleft();
  const initialGoalEntry2 = createGoalEntryright();
  goalsContainer1.appendChild(initialGoalEntry1);
  goalsContainer2.appendChild(initialGoalEntry2);

  // Reset Man of the Match selection
  const motmSelect = document.getElementById('man-of-the-match');
  motmSelect.value = ''; // Reset to default option
  const motmImage = document.getElementById('man-of-the-match-image');
  motmImage.style.display = 'none'; // Hide image

  // Reset ratings inputs
  const leftRatingInputs = leftRatingContainer.querySelectorAll('input[type="number"]');
  const rightRatingInputs = rightRatingContainer.querySelectorAll('input[type="number"]');
  leftRatingInputs.forEach(input => input.value = '');
  rightRatingInputs.forEach(input => input.value = '');

  // Clear match data in localStorage
  localStorage.removeItem('r2');

  // Optional: Notify user that the data has been reset
  console.log('Match data has been reset!');
  alert("Data Reset");
}

// Attach event listener to the reset button
document.getElementById('reset-button').addEventListener('click', resetMatchData);


// Load saved data on page load

// Check if saved data exists and is valid
if (savedData) {
    // Set scores if available
    if (savedData.score) {
        document.getElementById('left-score').value = savedData.score.left || '';
        document.getElementById('right-score').value = savedData.score.right || '';
    }

    // Populate goals if available
    if (savedData.goalsLeft) {
      console.log(savedData.goalsLeft)
      populateGoalsleft(savedData.goalsLeft);
    }
    
    if (savedData.goalsRight) {
      populateGoalsright(savedData.goalsRight);
    }


    // Set MOTM (Man of the Match) if available
    if (savedData.manOfTheMatch) {
        const motmSelect = document.getElementById('man-of-the-match');
        motmSelect.value = savedData.manOfTheMatch || '';
        updateMotmImage(); // Update image based on MOTM selection
    }

    // Populate ratings if available
    if (savedData.ratingsLeft && savedData.ratingsRight) {
        savedData.ratingsLeft.forEach((rating, index) => {
            const ratingInput = leftRatingContainer.querySelectorAll('input[type="number"]')[index];
            if (ratingInput) {
                ratingInput.value = rating.rating || '';
            }
        });

        savedData.ratingsRight.forEach((rating, index) => {
            const ratingInput = rightRatingContainer.querySelectorAll('input[type="number"]')[index];
            if (ratingInput) {
                ratingInput.value = rating.rating || '';
            }
        });
    }

} else {
    console.error('No saved data found in localStorage.');
    alert('No saved data found.');
}
