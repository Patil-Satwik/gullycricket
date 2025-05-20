let maxOvers = 2;
let maxWickets = 2;

let teams = {
  A: { score: 0, wickets: 0, balls: 0, history: [] },
  B: { score: 0, wickets: 0, balls: 0, history: [] }
};

let currentTeam = 'A';

function startMatch() {
  maxOvers = parseInt(document.getElementById('overs').value);
  maxWickets = parseInt(document.getElementById('wickets').value);

  document.querySelector('.setup').style.display = 'none';
  document.querySelector('.scoreboard').style.display = 'block';
  document.querySelector('.buttons').style.display = 'block';

  updateDisplay();
}

function updateDisplay() {
  ['A', 'B'].forEach(team => {
    document.getElementById('score' + team).textContent =
      `${teams[team].score} / ${teams[team].wickets}`;
    document.getElementById('balls' + team).textContent =
      `Balls: ${teams[team].balls % 6}`;
    document.getElementById('overs' + team).textContent =
      `Overs: ${Math.floor(teams[team].balls / 6)}`;
  });

  document.getElementById('teamA').classList.remove('active');
  document.getElementById('teamB').classList.remove('active');
  document.getElementById('team' + currentTeam).classList.add('active');
}

function addRun(runs) {
  let team = teams[currentTeam];
  team.score += runs;
  team.balls++;
  team.history.push({ type: 'run', value: runs });
  checkOver();
  updateDisplay();
}

function noBall() {
  let team = teams[currentTeam];
  team.score += 1;
  team.history.push({ type: 'no-ball' });
  updateDisplay();
}

function wideBall() {
  let team = teams[currentTeam];
  team.score += 1;
  team.history.push({ type: 'wide' });
  updateDisplay();
}

function dotBall() {
  let team = teams[currentTeam];
  team.balls++;
  team.history.push({ type: 'dot' });
  checkOver();
  updateDisplay();
}

function wicket() {
  let team = teams[currentTeam];
  team.wickets++;
  team.balls++;
  team.history.push({ type: 'wicket' });
  checkOver();
  updateDisplay();
}

function undo() {
  let team = teams[currentTeam];
  let last = team.history.pop();
  if (!last) return;

  switch (last.type) {
    case 'run':
      team.score -= last.value;
      team.balls--;
      break;
    case 'no-ball':
    case 'wide':
      team.score -= 1;
      break;
    case 'dot':
      team.balls--;
      break;
    case 'wicket':
      team.wickets--;
      team.balls--;
      break;
  }

  updateDisplay();
}

function checkOver() {
  let team = teams[currentTeam];
  let overLimit = maxOvers * 6;

  if (team.balls >= overLimit || team.wickets >= maxWickets) {
    alert(`Team ${currentTeam} innings over!`);
  }
}

function switchTeam() {
  currentTeam = currentTeam === 'A' ? 'B' : 'A';
  updateDisplay();
}
