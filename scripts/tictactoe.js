class TicTacToe{
  constructor(selector){
    this.parrentElement = document.querySelector(selector);
    this.arrayGame = Array(9).fill('');
    this.playerList = ['x', 'o'];
    this.currentPlayer = 0;
    this.init();

    console.log(this.parrentElement);
  };

  init(){
    this.buildGameUI();
  };

  // view
  buildGameUI(){
    // gameinfo
      // Box Player
    const gameInfoEl = document.createElement('div');
    gameInfoEl.classList.add('game-info');
    let boxPlayer = '';
    this.playerList.forEach((player, index) => {
      boxPlayer += this.boxPlayer(player, index);
    });
    gameInfoEl.innerHTML = boxPlayer;

     // button Reset
    const gameControl = document.createElement('div');
    gameControl.classList.add('game-control');
    const buttonReset = document.createElement('button');
    buttonReset.classList.add('btn', 'btn-reset');
    buttonReset.textContent = 'Reset Game';
    buttonReset.addEventListener('click', ()=>{
      this.resetClickElement();
    });

    gameControl.appendChild(buttonReset);
    gameInfoEl.appendChild(gameControl);

    // gameplay
    const gamePlayEl = document.createElement('div');
    gamePlayEl.classList.add('game-play');
    this.arrayGame.forEach((_el, index) => {
      const buttonEl = document.createElement('button');
      buttonEl.classList.add('btn-tic-tac-toe');
      buttonEl.addEventListener('click', (event) => {
        this.cellClickElement(event, index);
      });
      gamePlayEl.appendChild(buttonEl);
      this.gamePlayEl = gamePlayEl;
    });


    // appent to parrent element
    this.parrentElement.append(gameInfoEl, gamePlayEl);
  }

  boxPlayer(playerName, playerNumber){
    return `<div class="box-player ${playerNumber === 0 ? 'active' : ''}">
            <p class="player-label ${playerName}">
              ${playerName.toUpperCase()}
            </p>
            <p class="player-name">
              Player ${playerNumber}
            </p>
            <p class="turn">
              Giliran mu!
            </p>
          </div>`
  };

  // modal
  getPlayer(){
    return this.playerList[this.currentPlayer];
  };

  switchPlayer(currentPlayer = undefined){
    if(currentPlayer !== undefined){
      this.currentPlayer = currentPlayer;
    }else{
      this.currentPlayer = this.currentPlayer === 1 ? 0 : 1;
    };
    const boxPlayer = document.querySelectorAll('.box-player');
    console.log(boxPlayer);
    boxPlayer.forEach((player, index) => {
      if(this.currentPlayer === index){
        player.classList.add('active');
      }else{
        player.classList.remove('active');
      };
    });
  };

  checkWin(){
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    winConditions.forEach((array, _index) => {
      const [a, b, c] = array;
      if(this.getPlayer() === this.arrayGame[a] && this.getPlayer() === this.arrayGame[b] && this.getPlayer() === this.arrayGame[c]){
        
        Swal.fire({
          title: `Selamat ${this.getPlayer()} memenangkan game!`,
          showDenyButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Reset`,
          icon: 'success',
        }).then((result) => {
          for(const btn of this.gamePlayEl.children){
            btn.disabled = true;
          };
          if (result.isDenied) {
            this.resetClickElement();
            Swal.fire('Game telah di reset', '', 'info')
          }
        })
      };
    });
  };

  // controller
  cellClickElement(event, index){
    const button = event.target;
    button.textContent = this.getPlayer().toUpperCase();
    button.classList.add(this.getPlayer());
    button.disabled = true;
    this.arrayGame[index] = this.getPlayer();
    this.checkWin();
    this.switchPlayer();
  };

  resetClickElement(){
    this.arrayGame = Array(9).fill('');
    this.currentPlayer = 0;
    this.switchPlayer(0);

    for(const btn of this.gamePlayEl.children){
      btn.textContent = '';
      btn.disabled = false;
      btn.classList.remove(...this.playerList);
    };
  };
};