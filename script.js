// function enterScore(round) {
//     let score = prompt(`Enter the score for ${round} (e.g., Team A 2 - 1 Team B):`);
//     if (score) {
//         alert(`Score for ${round} recorded: ${score}`);
//     } else {
//         alert("No score entered.");
//     }
// }

// function openImageSelector(event) {
//     const modal = document.getElementById('image-modal');
//     modal.classList.remove('hidden-modal');
//     modal.dataset.targetImage = event.currentTarget.querySelector('img').classList[0];
// }

// function selectImage(event) {
//     const modal = document.getElementById('image-modal');
//     const targetImageClass = modal.dataset.targetImage;
//     const selectedImageSrc = event.target.src;
//     document.querySelector(`.${targetImageClass}`).src = selectedImageSrc;
//     modal.classList.add('hidden-modal');
// }

// Close the modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('image-modal');
    if (event.target === modal) {
        modal.classList.add('hidden-modal');
    }
});

// function selectPlayer(imageElement) {
//     const selectedPlayersDiv = document.querySelector(".selected-players .player-displayleft");
//     if (selectedPlayersDiv.children.length < 11) {
//         const newPlayer = document.createElement("img");
//         newPlayer.src = imageElement.src;
//         selectedPlayersDiv.appendChild(newPlayer);
//     } else {
//         alert("You can only select 11 players!");
//     }
// }

// const selectedPlayers = [];

// function addPlayer(dropdown) {
//     const selectedOption = dropdown.options[dropdown.selectedIndex];
//     const playerImage = selectedOption.value;
//     const playerName = selectedOption.text;

//     // Prevent duplicate selection
//     if (selectedPlayers.includes(playerName)) {
//         alert(`${playerName} has already been selected.`);
//         dropdown.selectedIndex = 0; // Reset dropdown
//         return;
//     }

//     // Check if limit of 11 players is reached
//     const playerDisplayDiv = document.querySelector('.player-displayleft');
//     if (selectedPlayers.length >= 11) {
//         alert("You can only select 11 players!");
//         dropdown.selectedIndex = 0; // Reset dropdown
//         return;
//     }

//     // Add player to selected list
//     selectedPlayers.push(playerName);

//     // Create image element for selected player
//     const playerImg = document.createElement('img');
//     playerImg.src = playerImage;
//     playerImg.alt = playerName;
//     playerImg.title = playerName;

//     // Append player image to display div
//     playerDisplayDiv.appendChild(playerImg);

//     // Disable the selected option
//     selectedOption.disabled = true;

//     // Reset dropdown
//     dropdown.selectedIndex = 0;
// }

// ....................................................................................

const dropdownHeaderleft = document.getElementById('dropdownHeader-left');
const dropdownArrowleft = document.getElementById('dropdownArrow-left');
const dropdownleft = document.getElementById('imageDropdown-left');
const selectedBoxleft = document.querySelector('.player-displayleft');

// Toggle dropdown visibility
dropdownHeaderleft.addEventListener('click', () => {
  dropdownleft.style.display = dropdownleft.style.display === 'grid' ? 'none' : 'grid';
  dropdownArrowleft.classList.toggle('open');
});

// Handle image selection
const dropdownItemsleft = dropdownleft.querySelectorAll('.dropdownimg');

dropdownItemsleft.forEach(item => {
  item.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent dropdown from closing immediately
    const imageUrl = item.getAttribute('data-img');
    const existingImage = selectedBoxleft.querySelector(`img[src="${imageUrl}"]`);
    const img = item.querySelector('img'); // Select the <img> inside the .dropdownimg
    const playerName = img.alt;

    if (existingImage) {
      // Remove if already selected
      selectedBoxleft.removeChild(existingImage);
    } else {
        const currentSelections = selectedBoxleft.querySelectorAll('img').length;
        if (currentSelections < 11) {
          // Add new selection
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.alt = playerName;
          selectedBoxleft.appendChild(imgElement);
          // Disable the option after it's selected
          item.style.pointerEvents = 'none';
          item.style.opacity = '0.5';
        } else {
            // Display a message when the limit is reached
            alert("You can't select more than 11 players!");
        }
      }
  });
});

// Deselect image when clicked in selected box
selectedBoxleft.addEventListener('click', (event) => {
    if (event.target && event.target.tagName === 'IMG') {
      const imgToRemove = event.target;
      const imageUrl = imgToRemove.src.split('/').pop();  // Get only the file name
      // Remove the image from the selected box
      selectedBoxleft.removeChild(imgToRemove);
      
      // Re-enable the dropdown item
      const dropdownItemleft1 = dropdownleft.querySelector(`.dropdownimg[data-img="images/${imageUrl}"]`);

      if (dropdownItemleft1) {
        dropdownItemleft1.style.pointerEvents = 'auto'; // Re-enable the option
        dropdownItemleft1.style.opacity = '1';
      }else {
        console.log('Dropdown item not found for URL: ', imageUrl);
      }
    }
  });

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!dropdownHeaderleft.contains(event.target) && !dropdownleft.contains(event.target)) {
    dropdownleft.style.display = 'none';
    dropdownArrowleft.classList.remove('open');
  }
});

const dropdownHeaderright = document.getElementById('dropdownHeader-right');
const dropdownArrowright = document.getElementById('dropdownArrow-right');
const dropdownright = document.getElementById('imageDropdown-right');
const selectedBoxright = document.querySelector('.player-displayright');

// Toggle dropdown visibility
dropdownHeaderright.addEventListener('click', () => {
  dropdownright.style.display = dropdownright.style.display === 'grid' ? 'none' : 'grid';
  dropdownArrowright.classList.toggle('open');
});

// Handle image selection
const dropdownItemsright = dropdownright.querySelectorAll('.dropdownimg');
dropdownItemsright.forEach(item => {
  item.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent dropdown from closing immediately
    const imageUrl = item.getAttribute('data-img');
    const existingImage = selectedBoxright.querySelector(`img[src="${imageUrl}"]`);
    const img = item.querySelector('img'); // Select the <img> inside the .dropdownimg
    const playerName = img.alt;

    if (existingImage) {
      // Remove if already selected
      selectedBoxright.removeChild(existingImage);
    }else {
        const currentSelections = selectedBoxright.querySelectorAll('img').length;
        if (currentSelections < 11) {
          // Add new selection
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.alt = playerName;
          selectedBoxright.appendChild(imgElement);
          // Disable the option after it's selected
          item.style.pointerEvents = 'none';
          item.style.opacity = '0.5';
        } else {
            // Display a message when the limit is reached
            alert("You can't select more than 11 players!");
        }
      }

    // Disable the option after it's selected
    item.style.pointerEvents = 'none';
    item.style.opacity = '0.5';
  });
});

// Deselect image when clicked in selected box
selectedBoxright.addEventListener('click', (event) => {
    if (event.target && event.target.tagName === 'IMG') {
      const imgToRemove = event.target;
      const imageUrl = imgToRemove.src.split('/').pop();;
      
      // Remove the image from the selected box
      selectedBoxright.removeChild(imgToRemove);
      
      // Re-enable the dropdown item
      const dropdownItemright = dropdownright.querySelector(`.dropdownimg[data-img="images/${imageUrl}"]`);
      dropdownItemright.style.pointerEvents = 'auto';
      dropdownItemright.style.opacity = '1';
    }
  });

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!dropdownHeaderright.contains(event.target) && !dropdownright.contains(event.target)) {
    dropdownright.style.display = 'none';
    dropdownArrowright.classList.remove('open');
  }
});

// Function to update team image in the div above the select
function updateTeamImage(selectElement, teamImageId) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const teamImageUrl = selectedOption.getAttribute('data-image');
    const teamImageDiv = document.getElementById(teamImageId);

    // console.log("Selected Image URL:", teamImageUrl);  // Debugging line

    // Check if image div exists and update image
    if (teamImageDiv) {
        teamImageDiv.innerHTML = `<img src="${teamImageUrl}" alt="${selectedOption.value}" class="team-logo">`;
    } else {
        console.error("Team image div not found:", teamImageId);
    }

    // Update the image in all round_logo_left divs
    // Update the image in all corresponding round_logo divs
    if (teamImageId === "left-team-image") {
        // Update for left side
        const roundLogoLefts = document.querySelectorAll('.round_logo_left');
        roundLogoLefts.forEach(logoLeft => {
            logoLeft.style.backgroundImage = `url(${teamImageUrl})`;
            logoLeft.style.opacity = '1';  // Make sure it's visible
            
        });
    } else if (teamImageId === "right-team-image") {
        // Update for right side
        const roundLogoRights = document.querySelectorAll('.round_logo_right');
        roundLogoRights.forEach(logoRight => {
            logoRight.style.backgroundImage = `url(${teamImageUrl})`;
            logoRight.style.opacity = '1';  // Make sure it's visible
        });
    }

    const leftTeamSelect = document.getElementById('leftteam');
    const leftTeam = leftTeamSelect.value;
    const tableRow1 = document.querySelector('.tournament-table td:first-child');
    tableRow1.textContent= leftTeam;

    const rightTeamSelect = document.getElementById('rightteam');
    const rightTeam = rightTeamSelect.value;
    const tableRow2 = document.querySelector('.tournament-table tr:nth-child(3) td:first-child'); 
    tableRow2.textContent= rightTeam;

    // Reference to the left team name div
    const leftTeamNameDiv = document.querySelectorAll('.left-team-name');
    const rightTeamNameDiv = document.querySelectorAll('.right-team-name');

    // Set the text content of the div to the left team name
    leftTeamNameDiv.forEach(item => {
      item.textContent = leftTeam;
    });
    rightTeamNameDiv.forEach(item => {
      item.textContent = rightTeam;
    });
}

// ..............................................................................................................

//save
const player_names_left=[];
const player_names_right=[];
const saveData = () => {
  // Save table data
  const tableData = Array.from(document.querySelectorAll('.tournament-table td')).map(td => td.textContent);

  // Save round scores
  // const roundScores = Array.from(document.querySelectorAll('.score-inputs input')).map(input => input.value);

  // Save left team selection and updated image
  const leftTeamSelect = document.getElementById('leftteam');
  const leftTeam = leftTeamSelect.value;
  const leftTeamImg = leftTeamSelect.options[leftTeamSelect.selectedIndex].getAttribute('data-image');

  // Save right team selection and updated image
  const rightTeamSelect = document.querySelector('.team_selectbox:nth-of-type(3) .team_select');
  const rightTeam = rightTeamSelect.value;
  const rightTeamImg = rightTeamSelect.options[rightTeamSelect.selectedIndex].getAttribute('data-image');
  
  // Save selected players for the left team
  const leftPlayers = Array.from(document.querySelectorAll('.player-displayleft img')).map(img => ({
  src: img.src,
  alt: img.alt
  }));

  // Save selected players for right team
  const rightPlayers = Array.from(document.querySelectorAll('.player-displayright img')).map(img => ({
  src: img.src,
  alt: img.alt
  }));

  // store left players names  
   // Get the div element by class name
    const playerDisplayLeftDiv = document.querySelector('.player-displayleft');
    // Get all the image elements inside the div
    const images = playerDisplayLeftDiv.querySelectorAll('img');
    
    for (let index = 0; index < images.length; index++) {
      const image = images[index];  
      // Check if the player's alt is already in the players array
      let found = false;
      for (let i = 0; i < player_names_left.length; i++) {
        if (player_names_left[i] === image.alt+" [N]") {
          found = true; // Player already exists in the array
          break; // Exit the inner loop
        }
      }
      // Add the player to the array only if it's not already there
      if (!found) {
        player_names_left.push(image.alt + " [N]");
      }
    }
    console.log("left",player_names_left); // Logs all collected player names (alt attributes)
    
  // store right players names  
   // Get the div element by class name
   const playerDisplayRightDiv = document.querySelector('.player-displayright');
   // Get all the image elements inside the div
   const images2 = playerDisplayRightDiv.querySelectorAll('img');
   
   for (let index = 0; index < images2.length; index++) {
     const image = images2[index];
     // Check if the player's alt is already in the players array
     let found = false;
     for (let i = 0; i < player_names_right.length; i++) {
       if (player_names_right[i] === image.alt+" [P]") {
         found = true; // Player already exists in the array
         break; // Exit the inner loop
       }
     }
     // Add the player to the array only if it's not already there
     if (!found) {
       player_names_right.push(image.alt + " [P]");
     }
   }
   console.log("right",player_names_right); // Logs all collected player names (alt attributes)

  // Data object to save
  const data = {
    tableData,
    leftTeam,
    leftPlayers,
    rightTeam,
    rightPlayers,
    player_names_left,
    player_names_right,
    leftTeamImg,
    rightTeamImg,
  };
  localStorage.setItem('tournamentData', JSON.stringify(data));
  alert('Data saved successfully!');
};

//reset
const resetData = () => {
  // Clear localStorage data
  localStorage.removeItem('tournamentData');

  // Reset table data
  document.querySelectorAll('.tournament-table td').forEach(td => (td.textContent = '0'));

  // Reset round scores
  document.querySelectorAll('.score-inputs input').forEach(input => (input.value = ''));

  // Reset team selections
  document.querySelectorAll('.team_select').forEach(select => (select.value = ''));

  // Reset team images using updateTeamImage function
  updateTeamImage(document.getElementById('leftteam'), 'left-team-image');
  updateTeamImage(document.querySelector('.team_selectbox:nth-of-type(3) .team_select'), 'right-team-image');

  // Reset selected players
  document.querySelector('.player-displayleft').innerHTML = '';
  document.querySelector('.player-displayright').innerHTML = '';

  alert('Data reset successfully!');
};

// load
const loadData = () => {
  const savedData = JSON.parse(localStorage.getItem('tournamentData'));

  if (savedData) {
    const { tableData, leftTeam, leftPlayers, rightTeam, rightPlayers, player_names_left, player_names_right,  } = savedData;
    
    // Select the rows of the table (excluding the header row)
    const tableRows = document.querySelectorAll('.tournament-table tr:not(:first-child)');

    tableRows.forEach((row, rowIndex) => {
      const rowData = tableData[rowIndex]; // Get the data for this row
      if (rowData) {
        const cells = row.querySelectorAll('td:not(:first-child)'); // Get all cells in the row
        cells.forEach((cell, cellIndex) => {
          cell.textContent = rowData[cellIndex] || '0'; // Set cell content, default to '0'
        });
      } else {
        console.log(`No data found for row ${rowIndex + 1}.`);
      }
    });
    
    // Load left team selection and update image
    const leftTeamSelect = document.getElementById('leftteam');
    leftTeamSelect.value = leftTeam || '';
    updateTeamImage(leftTeamSelect, 'left-team-image');

    // Load right team selection and update image
    const rightTeamSelect = document.querySelector('.team_selectbox:nth-of-type(3) .team_select');
    rightTeamSelect.value = rightTeam || '';
    updateTeamImage(rightTeamSelect, 'right-team-image');

    // Load selected players for left team
    const leftPlayersContainer = document.querySelector('.player-displayleft');
    leftPlayersContainer.innerHTML = leftPlayers
      .map(player => `<img src="${player.src}" alt="${player.alt}">`)
      .join('');

    // Load selected players for right team
    const rightPlayersContainer = document.querySelector('.player-displayright');
    rightPlayersContainer.innerHTML = rightPlayers
      .map(player => `<img src="${player.src}" alt="${player.alt}">`)
      .join('');
  }

  // Handle image selection
  const dropdownItemsleft = dropdownleft.querySelectorAll('.dropdownimg');
  const dd_imgleft = []; // Array to store image details
  const sel_imgleft =selectedBoxleft.querySelectorAll('img')
  const dropdownItemsright = dropdownright.querySelectorAll('.dropdownimg');
  const dd_imgright = []; // Array to store image details
  const sel_imgright =selectedBoxright.querySelectorAll('img')
  const basePath = "file:///C:/Users/LENOVO/Desktop/tournament/";


  // Iterate through each dropdown item
  dropdownItemsleft.forEach(item => {
    const imgElement = item; // Select the <img> inside each .dropdownimg
    // Store the image details in the collection
    dd_imgleft.push(imgElement);
  });

  dd_imgleft.forEach(img1 => {
    sel_imgleft.forEach(img2 =>{
      // console.log(img2['src'].replace(basePath, ""), img1['dataset']['img'])
      if (img2['src'].replace(basePath, "") === img1['dataset']['img']) {
        // Disable the option after it's selected
        img1.style.pointerEvents = 'none';
        img1.style.opacity = '0.5';
      }
    })
  })
  
  // Iterate through each dropdown item
  dropdownItemsright.forEach(item => {
    const imgElement = item; // Select the <img> inside each .dropdownimg
    // Store the image details in the collection
    dd_imgright.push(imgElement);
  });

  dd_imgright.forEach(img1 => {
    sel_imgright.forEach(img2 =>{
      // console.log(img2['src'].replace(basePath, ""), img1['dataset']['img'])
      if (img2['src'].replace(basePath, "") === img1['dataset']['img']) {
        // Disable the option after it's selected
        img1.style.pointerEvents = 'none';
        img1.style.opacity = '0.5';
      }
    })
  })
  

  // Function to update the Wins, Draws, Losses, and Goals columns for each dataset
  function updateTournamentTable() {
    // List of the dataset names
    const datasets = ['final', 'sf', 'r3', 'r2', 'r1'];
    
    const tableRows = document.querySelectorAll('.tournament-table tr');
    tableRows.forEach((row, index) => {
    const teamNameCell = row.querySelector('td:first-child'); // First column (team name)
    const winsCell = row.querySelector('td:nth-child(2)'); // Second column (wins)
    const drawsCell = row.querySelector('td:nth-child(3)'); // Third column (draws)
    const lossesCell = row.querySelector('td:nth-child(4)'); // Fourth column (losses)
    const goalsCell = row.querySelector('td:nth-child(5)'); // Fifth column (goals)
    const pointsCell = row.querySelector('td:nth-child(6)'); // Sixth column (points)
    if (teamNameCell && winsCell && drawsCell && lossesCell && goalsCell && pointsCell) {
      // Reset the initial values to zero
      winsCell.textContent = 0;
      drawsCell.textContent = 0;
      lossesCell.textContent = 0;
      goalsCell.textContent = 0;
      pointsCell.textContent = 0;}
    });


    datasets.forEach((datasetName) => {
      // Retrieve the tournament data from localStorage for each dataset
      const savedData = JSON.parse(localStorage.getItem(datasetName));
  
      if (!savedData || !savedData.score || !savedData.winner) {
        console.log(`No score or winner data found for ${datasetName} in localStorage.`);
        return;
      }
  
      const winner = savedData.winner; // "Team A" or "Team B"
      const score = savedData.score; // { left: "4", right: "3" }
      const leftScore = parseInt(score.left, 10) || 0; // Convert to number, default to 0
      const rightScore = parseInt(score.right, 10) || 0; // Convert to number, default to 0
      // console.log(`Winner from ${datasetName}: ${winner}`);
      // console.log(`Scores - Left: ${leftScore}, Right: ${rightScore}`);

      // Get the table rows (skip the header row)
      const tableRows = document.querySelectorAll('.tournament-table tr');
  
      // Loop through the table rows to update Wins, Draws, Losses, and Goals
      tableRows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        
        const teamNameCell = row.querySelector('td:first-child'); // First column (team name)
        const winsCell = row.querySelector('td:nth-child(2)'); // Second column (wins)
        const drawsCell = row.querySelector('td:nth-child(3)'); // Third column (draws)
        const lossesCell = row.querySelector('td:nth-child(4)'); // Fourth column (losses)
        const goalsCell = row.querySelector('td:nth-child(5)'); // Fifth column (goals)
        const pointsCell = row.querySelector('td:nth-child(6)'); // Sixth column (points)

        if (teamNameCell && winsCell && drawsCell && lossesCell && goalsCell) {
          // Update Goals
          if (index===1) {
          goalsCell.textContent = (parseInt(goalsCell.textContent, 10) || 0) + parseInt(leftScore); // Update goals for Team A (left team)
          } else if (index===2) {
          goalsCell.textContent = (parseInt(goalsCell.textContent, 10) || 0)+ parseInt(rightScore); // Update goals for Team B (right team)
          }
  
          // Update Wins, Losses, and Draws
          if (teamNameCell.textContent === winner && winner !== "none") {
          // Increment the wins count for the winning team
          winsCell.textContent = (parseInt(winsCell.textContent, 10) || 0) + parseInt(1,10);

          // Increment the losses count for the losing team
          const opponentRow = teamNameCell.closest('tr').nextElementSibling || teamNameCell.closest('tr').previousElementSibling;
          const opponentLossesCell = opponentRow.querySelector('td:nth-child(4)');
          const currentLosses = parseInt(opponentLossesCell.textContent, 10) || 0;
          opponentLossesCell.textContent = currentLosses + 1;
          }
          // If there is a draw (scores are equal), increment the draw column
          if (winner === "none") {
          const currentDraws = parseInt(drawsCell.textContent, 10) || 0;
          drawsCell.textContent = currentDraws + 1;
          }

          // Update Points based on Win or Draw
          let currentPoints = parseInt(pointsCell.textContent, 10) || 0;
          if (winner === "none") {
            // Draw: both teams get 1 point
            pointsCell.textContent = currentPoints + 1;
          } else if (teamNameCell.textContent.trim() === winner) {
            // Win: winning team gets 3 points
            pointsCell.textContent = currentPoints + 3;
          }
        }
      });
    });
  }

  // Call the function to update the table based on multiple datasets
  updateTournamentTable();
  
};

// Add keyboard shortcuts
document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    saveData();
  }
  if (event.ctrlKey && event.key === 'r') {
    event.preventDefault();
    resetData();
  }
});

// Load data on page load
window.onload = loadData;

//.................................................................................................................................

//  other pages
const finaloverview = document.getElementById('final-Overview');
finaloverview.addEventListener('click', () => {
  window.location.href = 'final.html'; // Link to standings page
});
const sfoverview = document.getElementById('semi-final-Overview');
sfoverview.addEventListener('click', () => {
  window.location.href = 'Semi-Final.html'; // Link to standings page
});
const r3overview = document.getElementById('r3-Overview');
r3overview.addEventListener('click', () => {
  window.location.href = 'round3.html'; // Link to standings page
});
const r2overview = document.getElementById('r2-Overview');
r2overview.addEventListener('click', () => {
  window.location.href = 'round2.html'; // Link to standings page
});
const r1overview = document.getElementById('r1-Overview');
r1overview.addEventListener('click', () => {
  window.location.href = 'round1.html'; // Link to standings page
});

//..................................................................................................

//load data for rounds
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the match data from localStorage
  const finalData = JSON.parse(localStorage.getItem('final')) || {};
  const sfdata = JSON.parse(localStorage.getItem('sf')) || {};
  const r3data = JSON.parse(localStorage.getItem('r3')) || {};
  const r2data = JSON.parse(localStorage.getItem('r2')) || {};
  const r1data = JSON.parse(localStorage.getItem('r1')) || {};

  // Get the score elements
  const final_leftscore = document.querySelector('#final-left-score');
  const final_rightscore = document.querySelector('#final-right-score');

  const sf_leftscore = document.querySelector('#semi-left-score');
  const sf_rightscore = document.querySelector('#semi-right-score');

  const r3_leftscore = document.querySelector('#r3-left-score');
  const r3_rightscore = document.querySelector('#r3-right-score');

  const r2_leftscore = document.querySelector('#r2-left-score');
  const r2_rightscore = document.querySelector('#r2-right-score');

  const r1_leftscore = document.querySelector('#r1-left-score');
  const r1_rightscore = document.querySelector('#r1-right-score');
  
  // Check if final data exists and set the scores in the input fields
  if (finalData.score && final_leftscore && final_rightscore) {
    final_leftscore.textContent = finalData.score.left || '';  // Set left team score
    final_rightscore.textContent = finalData.score.right || '';  // Set right team score
  }
  if (sfdata.score && sf_leftscore && sf_rightscore) {
    sf_leftscore.textContent = sfdata.score.left || '';  // Set left team score
    sf_rightscore.textContent = sfdata.score.right || '';  // Set right team score
  }
  if (r3data.score && r3_leftscore && r3_rightscore) {
    r3_leftscore.textContent = r3data.score.left || '';  // Set left team score
    r3_rightscore.textContent = r3data.score.right || '';  // Set right team score
  }
  if (r2data.score && r2_leftscore && r2_rightscore) {
    r2_leftscore.textContent = r2data.score.left || '';  // Set left team score
    r2_rightscore.textContent = r2data.score.right || '';  // Set right team score
  }
  if (r1data.score && r1_leftscore && r1_rightscore) {
    r1_leftscore.textContent = r1data.score.left || '';  // Set left team score
    r1_rightscore.textContent = r1data.score.right || '';  // Set right team score
  }
});

const viewStandingsButton = document.getElementById('view-standings');
viewStandingsButton.addEventListener('click', () => {
  window.location.href = 'standings.html'; // Link to standings page
});

//......................................................................................

// Function to find the team with the most points
 
document.addEventListener("DOMContentLoaded", () => {
    // Delay the celebration by 1 second
 
  setTimeout(() => {
     // Retrieve and parse the match data from `final` in localStorage
    const matchData = JSON.parse(localStorage.getItem("final"));
    
    // Function to find the team with the most points
    function findTeamWithMostPoints() {
      let rematch = false;
      // Get all the rows in the table (skip the header row)
      const tableRows = document.querySelectorAll('.tournament-table tr');
       
      let maxPoints = -1; // To track the maximum points
      let teamWithMostPoints = ''; // To store the team name with the most points
      let maxgoals = -1;
      let tempwin='';
      let tempgoal=-1;
      
      // Loop through the rows (skip the header row)
      tableRows.forEach((row, index) => {
        if (index === 0) return; // Skip the header row
        
        const teamNameCell = row.querySelector('td:first-child'); // Team name cell
        const pointsCell = row.querySelector('td:nth-child(6)'); // Points cell (6th column)
        const goalsCell = row.querySelector('td:nth-child(5)'); // Points cell (6th column)
    
        // Get the points value for the current row and convert it to an integer
        const points = parseInt(pointsCell.textContent, 10) || 0;
        const goals = parseInt(goalsCell.textContent, 10) || 0;

        // Check if the current row has more points than the previous max
        if (points > maxPoints) {
          maxPoints = points;
          teamWithMostPoints = teamNameCell.textContent.trim(); // Get the team name
          maxgoals = goals; // Update goals when a new max points team is found
          rematch = false; // Reset rematch flag
          tempwin=teamWithMostPoints
          tempgoal=maxgoals;
        } 
        // If points are equal, compare goals
        else if(points<maxPoints){
          console.log(teamWithMostPoints);
        }

        else if (points === maxPoints) {
          // console.log(matchData.score.left);
          // console.log(matchData.score.right);
          // console.log(matchData.leftTeam);
          // console.log(matchData.rightTeam);
          if (goals > maxgoals) {
            maxgoals = goals;
            teamWithMostPoints = teamNameCell.textContent.trim();
            
          }
          // If both points and goals are equal, flag for rematch
          else if (goals === maxgoals) {
            
            if(matchData.score.left > matchData.score.right){
              teamWithMostPoints= matchData.leftTeam;
            }else if(matchData.score.left < matchData.score.right){
              teamWithMostPoints = matchData.rightTeam;
            }
            else{
              rematch=true;
              teamWithMostPoints=''
            }
          }
          console.log(`The team with the most points (and highest goals if tied) is: ${teamWithMostPoints}`);
        }  
      });
      // Output the team with the most points
      console.log(`The team with the most points is: ${teamWithMostPoints}`);
      return {teamWithMostPoints,rematch};
      }

    const { teamWithMostPoints, rematch } = findTeamWithMostPoints();
    console.log(teamWithMostPoints,rematch)

    if(matchData !==null  && !rematch){       
      const celebrationType = Math.floor(0); // Randomize celebration
      startCelebration(teamWithMostPoints, celebrationType);
    } 
    else if (matchData){
      // const celebrationDiv = document.getElementById("celebration");
      const banner = document.getElementById("winnerBanner");
      banner.textContent = `Rematch`;
      // Apply the styles using JavaScript
      banner.style.position = 'fixed';
      banner.style.top = '50%';
      banner.style.left = '50%';
      banner.style.transform = 'translate(-50%, -50%)';
      banner.style.fontSize = '3rem';
      banner.style.fontWeight = 'bold';
      banner.style.zIndex = '1001';
      banner.style.display = 'flex';
      banner.style.justifyContent = 'center';
      banner.style.alignItems = 'center';
      banner.style.fontFamily = 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif';
      banner.style.backgroundClip = 'text'; // For other browsers
      banner.style.color = 'rgb(0,0,0)';
      banner.style.textAlign = 'center';
      banner.style.padding = '20px';
      banner.style.backgroundColor = '#fff';
      banner.style.borderImage = 'none';
      // Add event listener for keypress to end the celebration
      document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            stopCelebration();
        }
      });
    }
    else{
      const banner = document.getElementById("winnerBanner");
      banner.style.height= '0';
      banner.style.width= '0';
      banner.style.padding = '0';
      banner.style.margin = '0'
    }
  }, 10); // 1000 milliseconds (1 second) delay
});

function startCelebration(team, type) {
    const celebrationDiv = document.getElementById("celebration");
    const banner = document.getElementById("winnerBanner");
    // const trophy = document.getElementById("trophy");
    banner.textContent = `${team} Wins the Championship!!... 🎉🎉🎉`;

    switch (type) {
        case 0: // Confetti
            generateConfetti(celebrationDiv);
            generateFireworks(celebrationDiv);
            break;
    }
    banner.style.borderImage = 'linear-gradient(to right, rgba(246, 18, 18, 0) 0%, rgb(255, 0, 0) 40%, rgb(255, 0, 0) 70%, rgba(255, 0, 0, 0) 100%) 1';
    // Add event listener for keypress to end the celebration
      document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            stopCelebration();
        }
     });
}

function generateConfetti(container) {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.backgroundColor = getRandomColor();
        container.appendChild(confetti);
    }
}

function generateFireworks(container) {
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.top = `${Math.random() * 100}vh`;
        firework.style.animationDelay = `${Math.random()}s`;
        firework.style.backgroundColor = getRandomColor();
        container.appendChild(firework);
    }
}

function getRandomColor() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to stop the celebration
function stopCelebration() {
  const celebrationDiv = document.getElementById("celebration");
  const banner = document.getElementById("winnerBanner");

  // Remove the celebration elements (confetti, fireworks, etc.)
  celebrationDiv.innerHTML = ''; // This clears out the content inside the celebration div

  // Reset the banner
  banner.textContent = '';
  banner.style.borderImage = 'none'; // Reset border image to none
  banner.style.height= 0;
  banner.style.width= 0;

  celebrationDiv.classList.add("hidden");
  banner.classList.add("hidden");

  // Optional: You can also stop any animations if you have any running.
}