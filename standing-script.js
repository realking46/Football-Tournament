// Get match data from localStorage
const final = JSON.parse(localStorage.getItem('final'));
const semi = JSON.parse(localStorage.getItem('sf'));
const r2 = JSON.parse(localStorage.getItem('r2'));
const r1 = JSON.parse(localStorage.getItem('r1'));

// const finalData =[...final, ...semi,...r2,...r1];
const finalData = {};

// Combine the lists under each key
const dicts = [final,semi,r2,r1];

dicts.forEach(dict => {
  for (let key in dict) {
    if (Array.isArray(dict[key])) {
      if (finalData[key]) {
        finalData[key] = finalData[key].concat(dict[key]); // Append to existing array
      } else {
        finalData[key] = [...dict[key]]; // Initialize the array with current value
      }
    } else {
      finalData[key] = dict[key]; // Copy non-array values (e.g., strings, objects)
    }
  }
});

console.log(finalData);

if (typeof finalData !== 'object' || Array.isArray(finalData) || !finalData) {
  console.error('Invalid match data format. Expected a single match object:', finalData);
  alert('No valid match data found in localStorage.');
} else {
  console.log("Loaded match data:", finalData);
}

// Extract unique players from the match data
const playersSet = new Set();

// Add players from goalsLeft and goalsRight
if (finalData.goalsLeft && Array.isArray(finalData.goalsLeft)) {
  finalData.goalsLeft.forEach(goal => {
    if (goal.scorer) playersSet.add(goal.scorer);
    if (goal.assist && goal.assist !== "None") playersSet.add(goal.assist);
  });
}
if (finalData.goalsRight && Array.isArray(finalData.goalsRight)) {
  finalData.goalsRight.forEach(goal => {
    if (goal.scorer) playersSet.add(goal.scorer);
    if (goal.assist && goal.assist !== "None") playersSet.add(goal.assist);
  });
}

// Add players from ratingsLeft and ratingsRight
if (finalData.ratingsLeft && Array.isArray(finalData.ratingsLeft)) {
  finalData.ratingsLeft.forEach(rating => {
    if (rating.name) playersSet.add(rating.name);
  });
}
if (finalData.ratingsRight && Array.isArray(finalData.ratingsRight)) {
  finalData.ratingsRight.forEach(rating => {
    if (rating.name) playersSet.add(rating.name);
  });
}

// Add player from Man of the Match
if (finalData.manOfTheMatch) playersSet.add(finalData.manOfTheMatch);

// Convert Set to Array
const players = Array.from(playersSet);
console.log("Players:", players);

// Initialize player statistics
let playerStats = players.reduce((acc, player) => {
  acc[player] = { points: 0, goals: 0, assists: 0, motm: 0 };
  return acc;
}, {});

// Process match data

// Process goals
if (finalData.goalsLeft && Array.isArray(finalData.goalsLeft)) {
  finalData.goalsLeft.forEach(goal => {
    const scorer = goal.scorer;
    const assist = goal.assist;

    if (scorer) {
      playerStats[scorer].points += 1;
      playerStats[scorer].goals += 1;
    }
    if (assist && assist !== "None") {
      playerStats[assist].points += 0.8;
      playerStats[assist].assists += 1;
    }
  });
}
if (finalData.goalsRight && Array.isArray(finalData.goalsRight)) {
  finalData.goalsRight.forEach(goal => {
    const scorer = goal.scorer;
    const assist = goal.assist;

    if (scorer) {
      playerStats[scorer].points += 1;
      playerStats[scorer].goals += 1;
    }
    if (assist && assist !== "None") {
      playerStats[assist].points += 0.8;
      playerStats[assist].assists += 1;
    }
  });
}

// Process ratings
if (finalData.ratingsLeft && Array.isArray(finalData.ratingsLeft)) {
  finalData.ratingsLeft.forEach(rating => {
    if (rating.name) {
      playerStats[rating.name].points += parseFloat(rating.rating) * 0.2;
    }
  });
}
if (finalData.ratingsRight && Array.isArray(finalData.ratingsRight)) {
  finalData.ratingsRight.forEach(rating => {
    if (rating.name) {
      playerStats[rating.name].points += parseFloat(rating.rating) * 0.2;
    }
  });
}

// Process Man of the Match
const motm = finalData.manOfTheMatch;
if (motm) {
  playerStats[motm].points += 1;
  playerStats[motm].motm += 1;
}

// Sort players by total points, then goals, then assists
const sortedPlayers = Object.keys(playerStats).sort((a, b) => {
  const diffPoints = playerStats[b].points - playerStats[a].points;
  if (diffPoints !== 0) return diffPoints;

  const diffGoals = playerStats[b].goals - playerStats[a].goals;
  if (diffGoals !== 0) return diffGoals;

  return playerStats[b].assists - playerStats[a].assists;
});

// Fetch tournamentData from localStorage
const tournamentData = JSON.parse(localStorage.getItem('tournamentData'));
const leftPlayers = tournamentData ? tournamentData.leftPlayers : []; // Fetch leftPlayers array
const rightPlayers = tournamentData ? tournamentData.rightPlayers : []; // Fetch leftPlayers array
const L_R =[...leftPlayers,...rightPlayers]

const standingsTableBody = document.getElementById('standings-table').getElementsByTagName('tbody')[0];
// Create an array to store the player standings
const standingsData = [];
// Display standings with player images
sortedPlayers.forEach((player, index) => {
  const row = standingsTableBody.insertRow();
  const rankCell = row.insertCell(0);
  const nameCell = row.insertCell(1);
  const goalsCell = row.insertCell(2);
  const assistsCell = row.insertCell(3);
  const pointsCell = row.insertCell(4);

  rankCell.textContent = index + 1;

  // Create a container for name and image
  const nameContainer = document.createElement('div');
  nameContainer.style.display = 'flex';
  nameContainer.style.alignItems = 'center';

  // Create an image element if a match is found
  const playerImage = L_R.find(playerData => 
    player.replace(/\s*\[.*?\]$/, '') === playerData.alt
  );
  console.log(player.slice(-4))
  
  // Fetch the table body and the rows
  // const standingsTableBody = document.getElementById('standings-table').getElementsByTagName('tbody')[0];

  if (playerImage) {
    const imgElement = document.createElement('img');
    imgElement.src = playerImage.src;
    imgElement.alt = playerImage.alt;
    imgElement.style.width = '35px'; // Set the width of the image
    imgElement.style.height = '35px'; // Set the height of the image
    imgElement.style.marginRight = '8px'; // Add some spacing
    imgElement.style.borderRadius = '20%'; // Make the image circular
    imgElement.style.border = '0px';
    imgElement.style.marginLeft = '10%';
    imgElement.style.marginRight = '3%';
    nameContainer.appendChild(imgElement);
  }

  // Add the player's name
  const nameText = document.createElement('span');
  nameText.textContent = player;
  nameContainer.appendChild(nameText);
  
  console.log(nameText)
  // Append the container to the nameCell
  nameCell.appendChild(nameContainer);

  goalsCell.textContent = playerStats[player].goals;
  assistsCell.textContent = playerStats[player].assists;
  pointsCell.textContent = playerStats[player].points.toFixed(2);

  // Store each player's data into the standingsData array
  standingsData.push({
    rank: index + 1,
    player: player,
    goals: playerStats[player].goals,
    assists: playerStats[player].assists,
    points: playerStats[player].points.toFixed(2),
    img: playerImage.src 
  });  
});

// Sort standings by points (for Ballon d'Or), goals (for Golden Boot), and assists (for Best Playmaker)
const sortedByPoints = [...standingsData].sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
const sortedByGoals = [...standingsData].sort((a, b) => b.goals - a.goals);
const sortedByAssists = [...standingsData].sort((a, b) => b.assists - a.assists);

// Ballon d'Or (Highest points)
const ballonDOr = sortedByPoints[0];  // Player with the highest points
const runnerUp1 = sortedByPoints[1];  // Player with second highest points
const runnerUp2 = sortedByPoints[2];  // Player with third highest points

// Golden Boot (Highest goals)
const goldenBoot = sortedByGoals[0];  // Player with the highest goals
// Best Playmaker (Highest assists)
const bestPlaymaker = sortedByAssists[0];  // Player with the highest assists

// Store the awards in localStorage
const awardsData = {
  ballonDOr: ballonDOr,
  runnerUp1: runnerUp1,
  runnerUp2: runnerUp2,
  goldenBoot: goldenBoot,
  bestPlaymaker: bestPlaymaker
};

localStorage.setItem('awardsData', JSON.stringify(awardsData));

//................................................................
const AwardsButton = document.getElementById('awards');

AwardsButton.addEventListener("click", function () {
    if (localStorage.getItem("final")) {
      // Redirect to the awards page
      window.location.href = "awards.html"; // change this to your actual awards page
    } else {
      alert("Tournament not ended.");
    }
  });


//..........................................................

// Function to sort the table
function sortTable(columnIndex, isNumeric = true) {
  const tableBody = document.getElementById('standings-table').getElementsByTagName('tbody')[0];
  const rows = Array.from(tableBody.rows);

  // Sort rows based on the selected column
  rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[columnIndex].textContent;
    const cellB = rowB.cells[columnIndex].textContent;

    if (isNumeric) {
      return parseFloat(cellB) - parseFloat(cellA); // Descending for numbers
    } else {
      return cellA.localeCompare(cellB); // Alphabetical for strings
    }
  });

  // Append sorted rows back to the table body
  rows.forEach(row => tableBody.appendChild(row));
}

// Add event listeners to the column headers
document.querySelectorAll('#standings-table th').forEach((header, index) => {
  if (index === 0 || index === 1) return; // Skip Rank and Player Name columns

  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    const isNumeric = index > 1; // Goals, Assists, and Points are numeric
    sortTable(index, isNumeric);
  });
});
