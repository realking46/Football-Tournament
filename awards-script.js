// Retrieve awards data from localStorage
const awardsData = JSON.parse(localStorage.getItem('awardsData'));

if (awardsData) {
    // Display the award data
    document.getElementById('ballonDOr').querySelector('img').src = awardsData.ballonDOr.img;
    document.getElementById('ballonDOr').querySelector('p').textContent = awardsData.ballonDOr.player;
    document.getElementById('ballonDOr').querySelector('.num').textContent = `( ${awardsData.ballonDOr.points} )`;

    document.getElementById('runnerUp1').querySelector('img').src = awardsData.runnerUp1.img;
    document.getElementById('runnerUp1').querySelector('p').textContent = awardsData.runnerUp1.player;
    document.getElementById('runnerUp1').querySelector('.num').textContent = `( ${awardsData.runnerUp1.points} )`;

    document.getElementById('runnerUp2').querySelector('img').src = awardsData.runnerUp2.img;
    document.getElementById('runnerUp2').querySelector('p').textContent = awardsData.runnerUp2.player;
    document.getElementById('runnerUp2').querySelector('.num').textContent = `( ${awardsData.runnerUp2.points} )`;

    document.getElementById('goldenBoot').querySelector('img').src = awardsData.goldenBoot.img;
    document.getElementById('goldenBoot').querySelector('p').textContent = awardsData.goldenBoot.player;
    document.getElementById('goldenBoot').querySelector('.num').textContent = `Goals - ${awardsData.goldenBoot.goals} `;

    document.getElementById('bestPlaymaker').querySelector('img').src =awardsData.bestPlaymaker.img ;
    document.getElementById('bestPlaymaker').querySelector('p').textContent = awardsData.bestPlaymaker.player;
    document.getElementById('bestPlaymaker').querySelector('.num').textContent = `Assists - ${awardsData.bestPlaymaker.assists} `;
} else {
    console.error("No awards data found in localStorage.");
}