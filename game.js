(function() {
  window.addEventListener("load", init, false);

  var stage = "";
  var output;

  //código dos personagens de jogo
  const character = {
    EMPTY: -1,
    FLOOR: 0,
    WALL: 1,
    STAIRE: 2,
    STAIRS: 3,
    ICESTONE: 4,
    KEY: 5,
    STONELOCK: 6,
    DOORLOCK: 7,
    QUESTION: 8,
    BONES: 9,
    HERO: 10,
    ENEMYGREEN: 11,
    ENEMYRED: 12,
    ENEMYBLUE: 13,
    ENEMYYELLOW: 14,
    PRINCESS: 15
  };

  //Mapa do jogo
  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 5, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0, 0, 3, 1],
    [1, 0, 1, 0, 1, 0, 9, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 8, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 5, 1, 7, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 4, 1, 0, 1, 0, 0, 0, 0, 5, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 6, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 4, 0, 1],
    [1, 8, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 8, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 4, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 8, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 4, 4, 1, 4, 1],
    [1, 0, 0, 0, 0, 7, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 0, 0, 0, 9, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  /*const map2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 8, 0, 0, 4, 0, 0, 1, 0, 0, 1, 0, 1, 5, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 8, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 9, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 6, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 7, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 2, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 5, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 9, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 9, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 4, 8, 8, 1, 0, 0, 1, 8, 4, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];*/

  //mapa dos objetos de jogo
  const gameObjects = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 10, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  /*const gameObjects2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];*/

  //tamanho de cada celula
  const SIZE = 32;

  const sounds = {
		somDeFundo: "",
    fight: "",
    question: "",
		door: "",
		enemy: "",
		success: "",
    death: "",
    apanhaChave: "",
    perdeVida: "",
    princess: "",
    ice: ""
	};

  //numero de linhas e colunas do mapa
  const ROWS = map.length;
  const COLUMNS = map[0].length;

  //posicoes do enemy e do hero

  var enemyGreenRow;
  var enemyGreenColumn;

  var enemyBlueRow;
  var enemyBlueColumn;

  var enemyRedRow;
  var enemyRedColumn;

  var enemyYellowRow;
  var enemyYellowColumn;

  var heroRow;
  var heroColumn;

  var princessRow;
  var princessColumn;

  //funcoes do jogo
  var lifes = 0;
  var keys = 0;
  var experiencia = 0;

  //codigo das teclas
  const teclado = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ESC: 27,
    ENTER: 13,
    LSHIFT: 16,
    RSHIFT: 16,
    LALT: 18,
    LCTRL: 17,
    KPAD_PLUS: 107,
    KPAD_MINUS: 109
  };

  window.addEventListener("load", init, false);

  function init() {
    sounds.somDeFundo = document.querySelector("#somDeFundo");
		sounds.somDeFundo.volume = 0.2;
    sounds.fight = document.querySelector("#fight");
    sounds.question = document.querySelector("#question");
    sounds.door = document.querySelector("#door");
		sounds.apanhaChave = document.querySelector("#apanhaChave");
		sounds.enemy = document.querySelector("#enemy");
		sounds.success = document.querySelector("#success");
    sounds.death = document.querySelector("#death");
    sounds.perdeVida = document.querySelector("#perdeVida");
    sounds.princess = document.querySelector("#princess");
    sounds.ice = document.querySelector("#ice");
    stage = document.querySelector("#stage");
    output = document.querySelector("#infoPanel");
    //adicionar um listener de teclado
    lifes = 5;
    keys = 0;
    energiaAtual = 100;
    gameMessage =
      "Usa as setas para mover o stanislau e tenta chegar a saída sem morreres para os zombies";
    findGameObjects();
    render();
    alert(
      "Regras:" +
        "\n" +
        "" +
        "\n" +
        "1 - Ganhas o jogo se chegares com pelo menos 1 vida as escadas descendentes" +
        "\n" +
        "2 - Perdes se ficares com 0 vidas" +
        "\n" +
        "3 - Se salvares a princesa perdes 10 de energia mas ganhas 20 de experiência e 5 vidas" +
        "\n" +
        "4 - Se combateres contra um zombie e perderes perdes 1 vida e 10 de experiência" +
        "\n" +
        "5 - Se combateres contra um zombie e ganhares não perdes vidas e ganhas 10 de experiência" +
        "\n" +
        "6 - Se partires uma icestone perdes 5 de energia e ganhas 5 de experiência" +
        "\n" +
        "7 - Se pisares ossos perdes 1 vida e 5 de energia" +
        "\n" +
        "8 - O teu score final será a soma das tuas vidas, energia restante e experiência"
    );
    window.addEventListener("keydown", keydownHandler, false);
  }

  function findGameObjects() {
    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        if (gameObjects[row][column] === character.ENEMYGREEN) {
          enemyGreenColumn = column;
          enemyGreenRow = row;
        }

        if (gameObjects[row][column] === character.ENEMYBLUE) {
          enemyBlueColumn = column;
          enemyBlueRow = row;
        }

        if (gameObjects[row][column] === character.ENEMYRED) {
          enemyRedColumn = column;
          enemyRedRow = row;
        }

        if (gameObjects[row][column] === character.ENEMYYELLOW) {
          enemyYellowColumn = column;
          enemyYellowRow = row;
        }

        if (gameObjects[row][column] === character.PRINCESS) {
          princessColumn = column;
          princessRow = row;
        }
        if (gameObjects[row][column] === character.HERO) {
          heroColumn = column;
          heroRow = row;
        }
      }
    }
  }

  function render() {
    //limpar a stage da jogada anterior
    while (stage.hasChildNodes()) stage.removeChild(stage.firstChild);

    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        //criar uma imagem
        let cell = document.createElement("div");

        //definir o estilo
        cell.setAttribute("class", "cell");
        stage.appendChild(cell);
        let secondCell = document.createElement("div");

        //determinar a imagem correcta
        switch (map[row][column]) {
          case character.FLOOR:
            cell.classList.add("floor");
          break;
          case character.WALL:
            cell.classList.add("wall");
          break;
            case character.STAIRE:
              secondCell.setAttribute("class", "cell stairsE");
              cell.appendChild(secondCell);
            break;
            case character.STAIRS:
              secondCell.setAttribute("class", "cell stairsS");
              cell.appendChild(secondCell);
            break;
          case character.ICESTONE:
            secondCell.setAttribute("class", "cell iceStone");
            cell.appendChild(secondCell);
            break;
          case character.KEY:
            secondCell.setAttribute("class", "cell key");
            cell.appendChild(secondCell);
            break;
          case character.STONELOCK:
            secondCell.setAttribute("class", "cell stoneLock");
            cell.appendChild(secondCell);
            break;
          case character.DOORLOCK:
            secondCell.setAttribute("class", "cell doorLock");
            cell.appendChild(secondCell);
            break;
          case character.QUESTION:
            secondCell.setAttribute("class", "cell question");
            cell.appendChild(secondCell);
            break;
          case character.BONES:
            secondCell.setAttribute("class", "cell bones");
            cell.appendChild(secondCell);
            break;
        }

        switch (gameObjects[row][column]) {
          //HERO
          case character.HERO:
          switch (event.keyCode) {
            case teclado.DOWN:
              secondCell.setAttribute(
                "class",
                "cell actor down animated walk"
              );
              cell.appendChild(secondCell);
              break;
            case teclado.UP:
              secondCell.setAttribute(
                "class",
                "cell actor animated walk"
              );
              cell.appendChild(secondCell);
              break;
            case teclado.RIGHT:
              secondCell.setAttribute(
                "class",
                "cell actor right animated walk"
              );
              cell.appendChild(secondCell);
              break;
            default:
              secondCell.setAttribute("class", "cell actor left animated walk");
              cell.appendChild(secondCell);
              break;
          }
          break;

          //PRINCESS
          case character.PRINCESS:
          switch (event.keyCode) {
            default:
              secondCell.setAttribute("class", "cell princess down ");
              cell.appendChild(secondCell);
              break;
          }
          break;

          //ENEMY BLUE
          case character.ENEMYBLUE:
            switch (event.keyCode) {
              case teclado.DOWN:
                secondCell.setAttribute(
                  "class",
                  "cell enemyBlue down animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.LEFT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyBlue left animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.RIGHT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyBlue right animated walk"
                );
                cell.appendChild(secondCell);
                break;
              default:
                secondCell.setAttribute(
                  "class",
                  "cell enemyBlue animated walk"
                );
                cell.appendChild(secondCell);
                break;
            }
            break;

          //ENEMY GREEN
          case character.ENEMYGREEN:
            switch (event.keyCode) {
              case teclado.DOWN:
                secondCell.setAttribute(
                  "class",
                  "cell enemyGreen down animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.LEFT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyGreen left animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.RIGHT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyGreen right animated walk"
                );
                cell.appendChild(secondCell);
                break;
              default:
                secondCell.setAttribute(
                  "class",
                  "cell enemyGreen animated walk"
                );
                cell.appendChild(secondCell);
                break;
            }
            break;

          //ENEMY RED
          case character.ENEMYRED:
            switch (event.keyCode) {
              case teclado.DOWN:
                secondCell.setAttribute(
                  "class",
                  "cell enemyRed down animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.LEFT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyRed left animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.RIGHT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyRed right animated walk"
                );
                cell.appendChild(secondCell);
                break;
              default:
                secondCell.setAttribute("class", "cell enemyRed animated walk");
                cell.appendChild(secondCell);
                break;
            }
            break;
          case character.ENEMYBLUE:
            switch (event.keyCode) {
              case teclado.DOWN:
                secondCell.setAttribute(
                  "class",
                  "cell enemyBlue down animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.LEFT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyBlue left animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.RIGHT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyBlue right animated walk"
                );
                cell.appendChild(secondCell);
                break;
              default:
                secondCell.setAttribute(
                  "class",
                  "cell enemyBlue animated walk"
                );
                cell.appendChild(secondCell);
                break;
            }
            break;

          //ENEMY YELLOW
          case character.ENEMYYELLOW:
            switch (event.keyCode) {
              case teclado.DOWN:
                secondCell.setAttribute(
                  "class",
                  "cell enemyYellow down animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.LEFT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyYellow left animated walk"
                );
                cell.appendChild(secondCell);
                break;
              case teclado.RIGHT:
                secondCell.setAttribute(
                  "class",
                  "cell enemyYellow right animated walk"
                );
                cell.appendChild(secondCell);
                break;
              default:
                secondCell.setAttribute(
                  "class",
                  "cell enemyYellow animated walk"
                );
                cell.appendChild(secondCell);
                break;
            }
            break;
        }
        cell.style.top = row * SIZE + "px";
        cell.style.left = column * SIZE + "px";
      }
    }

    //apresentar a mensagem
    output.innerHTML = gameMessage;

    output.innerHTML +=
      "<br>Experiência: " +
      experiencia +
      ", Keys: " +
      keys +
      ", Vidas: " +
      lifes +
      ", Energia: " +
      energiaAtual;
  }

  function keydownHandler(event) {
    switch (event.keyCode) {
      case teclado.UP:
        if (heroRow > 0) {
          let thingAbove = map[heroRow - 1][heroColumn];
          if (
            (heroRow === enemyBlueRow && heroColumn === enemyBlueColumn) ||
            (heroRow === enemyRedRow && heroColumn === enemyRedColumn) ||
            (heroRow === enemyGreenRow && heroColumn === enemyGreenColumn) ||
            (heroRow === enemyYellowRow && heroColumn === enemyYellowColumn)
          ) {
            encontraEnemy();
          }
          if (thingAbove === character.STAIRE) {
            heroRow--;
            endGame();
          }
          if(heroRow === princessRow && heroColumn === princessColumn){
            encontraPrincesa();
          }
          if (thingAbove === character.FLOOR) {
            gameObjects[heroRow][heroColumn] = 0;
            heroRow--;
            gameObjects[heroRow][heroColumn] = character.HERO;
          } else {
            if (thingAbove === character.WALL) {
              gameObjects[heroRow][heroColumn] = 0;
              gameObjects[heroRow][heroColumn] = character.HERO;
            }
            if (thingAbove === character.BONES) {
              gameObjects[heroRow][heroColumn] = 0;
              heroRow--;
              gameObjects[heroRow][heroColumn] = character.HERO;
              encontraBones();
            }

            if (thingAbove === character.ICESTONE) {
              gameObjects[heroRow][heroColumn] = 0;
              heroRow--;
              gameObjects[heroRow][heroColumn] = character.HERO;
              partirIceStone();
            }

            if (thingAbove === character.KEY) {
              gameObjects[heroRow][heroColumn] = 0;
              heroRow--;
              gameObjects[heroRow][heroColumn] = character.HERO;
              apanharChave();
            }

            if (thingAbove === character.STONELOCK) {
              if (keys != 0) {
                gameObjects[heroRow][heroColumn] = 0;
                heroRow--;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirStoneLock();
              } else {
                gameObjects[heroRow][heroColumn] = 0;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirStoneLock();
              }
            }

            if (thingAbove === character.DOORLOCK) {
              if (keys != 0) {
                gameObjects[heroRow][heroColumn] = 0;
                heroRow--;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirDoorLock();
              } else {
                gameObjects[heroRow][heroColumn] = 0;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirDoorLock();
              }
            }

            if (thingAbove === character.QUESTION) {
              gameObjects[heroRow][heroColumn] = 0;
              heroRow--;
              gameObjects[heroRow][heroColumn] = character.HERO;
              apanhaPergunta();
            }
          }
        }

        break;
      case teclado.DOWN:
        if (heroRow < ROWS - 1) {
          let thingBelow = map[heroRow + 1][heroColumn];
          if (
            (heroRow === enemyBlueRow && heroColumn === enemyBlueColumn) ||
            (heroRow === enemyRedRow && heroColumn === enemyRedColumn) ||
            (heroRow === enemyGreenRow && heroColumn === enemyGreenColumn) ||
            (heroRow === enemyYellowRow && heroColumn === enemyYellowColumn)
          ) {
            encontraEnemy();
          }
          if (thingBelow === character.STAIRE) {
            heroRow++;
            endGame();
          }
          if(heroRow === princessRow && heroColumn === princessColumn){
            encontraPrincesa();
          }
          if (thingBelow === character.FLOOR) {
            gameObjects[heroRow][heroColumn] = 0;
            heroRow++;
            gameObjects[heroRow][heroColumn] = character.HERO;
          } else {
            if (thingBelow === character.WALL) {
              gameObjects[heroRow][heroColumn] = 0;
              gameObjects[heroRow][heroColumn] = character.HERO;
            }

            if (thingBelow === character.ICESTONE) {
              gameObjects[heroRow][heroColumn] = 0;
              heroRow++;
              gameObjects[heroRow][heroColumn] = character.HERO;
              partirIceStone();
            }

            if (thingBelow === character.KEY) {
              gameObjects[heroRow][heroColumn] = 0;
              heroRow++;
              gameObjects[heroRow][heroColumn] = character.HERO;
              apanharChave();
            }
            if (thingBelow === character.BONES) {
              gameObjects[heroRow][heroColumn] = 0;
              heroRow++;
              gameObjects[heroRow][heroColumn] = character.HERO;
              encontraBones();
            }
            if (thingBelow === character.DOORLOCK) {
              if (keys != 0) {
                gameObjects[heroRow][heroColumn] = 0;
                heroRow++;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirDoorLock();
              } else {
                gameObjects[heroRow][heroColumn] = 0;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirDoorLock();
              }
            }

            if (thingBelow === character.STONELOCK) {
              if (keys != 0) {
                gameObjects[heroRow][heroColumn] = 0;
                heroRow++;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirStoneLock();
              } else {
                gameObjects[heroRow][heroColumn] = 0;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirStoneLock();
              }
            }

            if (thingBelow === character.QUESTION) {
              gameObjects[heroRow][heroColumn] = 0;
              heroRow++;
              gameObjects[heroRow][heroColumn] = character.HERO;
              apanhaPergunta();
            }
          }
        }

        break;

      case teclado.LEFT:
        if (heroColumn > 0) {
          let thingLeft = map[heroRow][heroColumn - 1];
          if (
            (heroRow === enemyBlueRow && heroColumn === enemyBlueColumn) ||
            (heroRow === enemyRedRow && heroColumn === enemyRedColumn) ||
            (heroRow === enemyGreenRow && heroColumn === enemyGreenColumn) ||
            (heroRow === enemyYellowRow && heroColumn === enemyYellowColumn)
          ) {
            encontraEnemy();
          }
          if(heroRow === princessRow && heroColumn === princessColumn){
            encontraPrincesa();
          }
          if (thingLeft === character.STAIRE) {
            heroColumn--;
            endGame();
          }
          if (thingLeft === character.FLOOR) {
            gameObjects[heroRow][heroColumn] = 0;
            heroColumn--;
            gameObjects[heroRow][heroColumn] = character.HERO;
          } else {
            if (thingLeft === character.WALL) {
              gameObjects[heroRow][heroColumn] = 0;
              gameObjects[heroRow][heroColumn] = character.HERO;
            }

            if (thingLeft === character.ICESTONE) {
              gameObjects[heroRow][heroColumn] = 0;
              heroColumn--;
              gameObjects[heroRow][heroColumn] = character.HERO;
              partirIceStone();
            }

            if (thingLeft === character.KEY) {
              gameObjects[heroRow][heroColumn] = 0;
              heroColumn--;
              gameObjects[heroRow][heroColumn] = character.HERO;
              apanharChave();
            }
            if (thingLeft === character.BONES) {
              gameObjects[heroRow][heroColumn] = 0;
              heroColumn--;
              gameObjects[heroRow][heroColumn] = character.HERO;
              encontraBones();
            }
            if (thingLeft === character.DOORLOCK) {
              if (keys != 0) {
                gameObjects[heroRow][heroColumn] = 0;
                heroColumn--;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirDoorLock();
              } else {
                gameObjects[heroRow][heroColumn] = 0;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirDoorLock();
              }
            }

            if (thingLeft === character.STONELOCK) {
              if (keys != 0) {
                gameObjects[heroRow][heroColumn] = 0;
                heroColumn--;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirStoneLock();
              } else {
                gameObjects[heroRow][heroColumn] = 0;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirStoneLock();
              }
            }
            if (thingLeft === character.QUESTION) {
              gameObjects[heroRow][heroColumn] = 0;
              heroColumn--;
              gameObjects[heroRow][heroColumn] = character.HERO;
              apanhaPergunta();
            }
          }
        }

        break;

      case teclado.RIGHT:
        if (heroColumn < COLUMNS - 1) {
          let thingRight = map[heroRow][heroColumn + 1];

          if (
            (heroRow === enemyBlueRow && heroColumn === enemyBlueColumn) ||
            (heroRow === enemyRedRow && heroColumn === enemyRedColumn) ||
            (heroRow === enemyGreenRow && heroColumn === enemyGreenColumn) ||
            (heroRow === enemyYellowRow && heroColumn === enemyYellowColumn)
          ) {
            encontraEnemy();
          }
          if (thingRight === character.STAIRE) {
            heroColumn++;
            endGame();
          }
          if(heroRow === princessRow && heroColumn === princessColumn){
            encontraPrincesa();
          }

          if (thingRight === character.FLOOR) {
            gameObjects[heroRow][heroColumn] = 0;
            heroColumn++;
            gameObjects[heroRow][heroColumn] = character.HERO;
          } else {
            if (thingRight === character.WALL) {
              gameObjects[heroRow][heroColumn] = 0;
              gameObjects[heroRow][heroColumn] = character.HERO;
            }
            if (thingRight === character.ICESTONE) {
              gameObjects[heroRow][heroColumn] = 0;
              heroColumn++;
              gameObjects[heroRow][heroColumn] = character.HERO;
              partirIceStone();
            }

            if (thingRight === character.KEY) {
              gameObjects[heroRow][heroColumn] = 0;
              heroColumn++;
              gameObjects[heroRow][heroColumn] = character.HERO;
              apanharChave();
            }
            if (thingRight === character.BONES) {
              gameObjects[heroRow][heroColumn] = 0;
              heroColumn++;
              gameObjects[heroRow][heroColumn] = character.HERO;
              encontraBones();
            }

            if (thingRight === character.DOORLOCK) {
              if (keys != 0) {
                gameObjects[heroRow][heroColumn] = 0;
                heroColumn++;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirDoorLock();
              } else {
                gameObjects[heroRow][heroColumn] = 0;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirDoorLock();
              }
            }
            if (thingRight === character.STONELOCK) {
              if (keys != 0) {
                gameObjects[heroRow][heroColumn] = 0;
                heroColumn++;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirStoneLock();
              } else {
                gameObjects[heroRow][heroColumn] = 0;
                gameObjects[heroRow][heroColumn] = character.HERO;
                abrirStoneLock();
              }
            }
            if (thingRight === character.QUESTION) {
              gameObjects[heroRow][heroColumn] = 0;
              heroColumn++;
              gameObjects[heroRow][heroColumn] = character.HERO;
              apanhaPergunta();
            }
          }
        }

        break;
    }
    if(lifes <=0){
      endGame();
    }
    if(energiaAtual <= 0){
      endGameEnergia();
    }

    moveEnemyGreen();
    moveEnemyRed();
    moveEnemyBlue();
    moveEnemyYellow();
    render();
  }

  //FUNCAO QUE FAZ O ENEMY ANDAR SOZINHO

  function moveEnemyGreen() {
    const LEFT = 1;
    const RIGHT = 2;
    const UP = 3;
    const DOWN = 4;
    let validDirections = [];
    let directions;

    if (enemyGreenRow === heroRow && enemyGreenColumn === heroColumn) {
      encontraEnemy();
    }

    if (enemyGreenRow > 0) {
      let thingAbove = map[enemyGreenRow - 1][enemyGreenColumn];
      if (thingAbove === character.FLOOR) {
        validDirections.push(UP);
      }
    }
    if (enemyGreenRow < ROWS - 1) {
      let thingBelow = map[enemyGreenRow + 1][enemyGreenColumn];
      if (thingBelow === character.FLOOR) {
        validDirections.push(DOWN);
      }
    }
    if (enemyGreenColumn > 0) {
      let thingLeft = map[enemyGreenRow][enemyGreenColumn - 1];
      if (thingLeft === character.FLOOR) {
        validDirections.push(LEFT);
      }
    }
    if (enemyGreenColumn < COLUMNS - 1) {
      let thingRight = map[enemyGreenRow][enemyGreenColumn + 1];
      if (thingRight === character.FLOOR) {
        validDirections.push(RIGHT);
      }
    }
    //1 - Verificar os movimentos possiveis e guardar num array
    if (validDirections.length > 0) {
      let randomNumber = Math.floor(Math.random() * validDirections.length);
      direction = validDirections[randomNumber];
    }
    switch (direction) {
      case UP:
        gameObjects[enemyGreenRow][enemyGreenColumn] = 0;
        enemyGreenRow--;
        gameObjects[enemyGreenRow][enemyGreenColumn] = character.ENEMYGREEN;
        break;
      case DOWN:
        gameObjects[enemyGreenRow][enemyGreenColumn] = 0;
        enemyGreenRow++;
        gameObjects[enemyGreenRow][enemyGreenColumn] = character.ENEMYGREEN;
        break;
      case LEFT:
        gameObjects[enemyGreenRow][enemyGreenColumn] = 0;
        enemyGreenColumn--;
        gameObjects[enemyGreenRow][enemyGreenColumn] = character.ENEMYGREEN;
        break;
      case RIGHT:
        gameObjects[enemyGreenRow][enemyGreenColumn] = 0;
        enemyGreenColumn++;
        gameObjects[enemyGreenRow][enemyGreenColumn] = character.ENEMYGREEN;
        break;
    }
  }

  function moveEnemyYellow() {
    const LEFT = 1;
    const RIGHT = 2;
    const UP = 3;
    const DOWN = 4;
    let validDirections = [];

    if (enemyYellowRow === heroRow && enemyYellowColumn === heroColumn) {
      encontraEnemy();
    }

    if (enemyYellowRow > 0) {
      let thingAbove = map[enemyYellowRow - 1][enemyYellowColumn];
      if (thingAbove === character.FLOOR) {
        validDirections.push(UP);
      }
    }
    if (enemyYellowRow < ROWS - 1) {
      let thingBelow = map[enemyYellowRow + 1][enemyYellowColumn];
      if (thingBelow === character.FLOOR) {
        validDirections.push(DOWN);
      }
    }
    if (enemyYellowColumn > 0) {
      let thingLeft = map[enemyYellowRow][enemyYellowColumn - 1];
      if (thingLeft === character.FLOOR) {
        validDirections.push(LEFT);
      }
    }
    if (enemyYellowColumn < COLUMNS - 1) {
      let thingRight = map[enemyYellowRow][enemyYellowColumn + 1];
      if (thingRight === character.FLOOR) {
        validDirections.push(RIGHT);
      }
    }
    //1 - Verificar os movimentos poss?veis e guardar num array
    if (validDirections.length > 0) {
      let randomNumber = Math.floor(Math.random() * validDirections.length);
      direction = validDirections[randomNumber];
    }
    switch (direction) {
      case UP:
        gameObjects[enemyYellowRow][enemyYellowColumn] = 0;
        enemyYellowRow--;
        gameObjects[enemyYellowRow][enemyYellowColumn] = character.ENEMYYELLOW;
        break;
      case DOWN:
        gameObjects[enemyYellowRow][enemyYellowColumn] = 0;
        enemyYellowRow++;
        gameObjects[enemyYellowRow][enemyYellowColumn] = character.ENEMYYELLOW;
        break;
      case LEFT:
        gameObjects[enemyYellowRow][enemyYellowColumn] = 0;
        enemyYellowColumn--;
        gameObjects[enemyYellowRow][enemyYellowColumn] = character.ENEMYYELLOW;
        break;
      case RIGHT:
        gameObjects[enemyYellowRow][enemyYellowColumn] = 0;
        enemyYellowColumn++;
        gameObjects[enemyYellowRow][enemyYellowColumn] = character.ENEMYYELLOW;
        break;
    }
  }

  function moveEnemyRed() {
    const LEFT = 1;
    const RIGHT = 2;
    const UP = 3;
    const DOWN = 4;
    let validDirections = [];

    if (enemyRedRow === heroRow && enemyRedColumn === heroColumn) {
      encontraEnemy();
    }

    if (enemyRedRow > 0) {
      let thingAbove = map[enemyRedRow - 1][enemyRedColumn];
      if (thingAbove === character.FLOOR) {
        validDirections.push(UP);
      }
    }
    if (enemyRedRow < ROWS - 1) {
      let thingBelow = map[enemyRedRow + 1][enemyRedColumn];
      if (thingBelow === character.FLOOR) {
        validDirections.push(DOWN);
      }
    }
    if (enemyRedColumn > 0) {
      let thingLeft = map[enemyRedRow][enemyRedColumn - 1];
      if (thingLeft === character.FLOOR) {
        validDirections.push(LEFT);
      }
    }
    if (enemyRedColumn < COLUMNS - 1) {
      let thingRight = map[enemyRedRow][enemyRedColumn + 1];
      if (thingRight === character.FLOOR) {
        validDirections.push(RIGHT);
      }
    }
    //1 - Verificar os movimentos possiveis e guardar num array
    if (validDirections.length > 0) {
      let randomNumber = Math.floor(Math.random() * validDirections.length);
      direction = validDirections[randomNumber];
    }
    switch (direction) {
      case UP:
        gameObjects[enemyRedRow][enemyRedColumn] = 0;
        enemyRedRow--;
        gameObjects[enemyRedRow][enemyRedColumn] = character.ENEMYRED;
        break;
      case DOWN:
        gameObjects[enemyRedRow][enemyRedColumn] = 0;
        enemyRedRow++;
        gameObjects[enemyRedRow][enemyRedColumn] = character.ENEMYRED;
        break;
      case LEFT:
        gameObjects[enemyRedRow][enemyRedColumn] = 0;
        enemyRedColumn--;
        gameObjects[enemyRedRow][enemyRedColumn] = character.ENEMYRED;
        break;
      case RIGHT:
        gameObjects[enemyRedRow][enemyRedColumn] = 0;
        enemyRedColumn++;
        gameObjects[enemyRedRow][enemyRedColumn] = character.ENEMYRED;
        break;
    }
  }

  function moveEnemyBlue() {
    const LEFT = 1;
    const RIGHT = 2;
    const UP = 3;
    const DOWN = 4;
    let validDirections = [];

    if (enemyBlueRow === heroRow && enemyBlueColumn === heroColumn) {
      encontraEnemy();
    }

    if (enemyBlueRow > 0) {
      let thingAbove = map[enemyBlueRow - 1][enemyBlueColumn];
      if (thingAbove === character.FLOOR) {
        validDirections.push(UP);
      }
    }
    if (enemyBlueRow < ROWS - 1) {
      let thingBelow = map[enemyBlueRow + 1][enemyBlueColumn];
      if (thingBelow === character.FLOOR) {
        validDirections.push(DOWN);
      }
    }
    if (enemyBlueColumn > 0) {
      let thingLeft = map[enemyBlueRow][enemyBlueColumn - 1];
      if (thingLeft === character.FLOOR) {
        validDirections.push(LEFT);
      }
    }
    if (enemyBlueColumn < COLUMNS - 1) {
      let thingRight = map[enemyBlueRow][enemyBlueColumn + 1];
      if (thingRight === character.FLOOR) {
        validDirections.push(RIGHT);
      }
    }
    //1 - Verificar os movimentos possiveis e guardar num array
    if (validDirections.length > 0) {
      let randomNumber = Math.floor(Math.random() * validDirections.length);
      direction = validDirections[randomNumber];
    }
    switch (direction) {
      case UP:
        gameObjects[enemyBlueRow][enemyBlueColumn] = 0;
        enemyBlueRow--;
        gameObjects[enemyBlueRow][enemyBlueColumn] = character.ENEMYBLUE;
        break;
      case DOWN:
        gameObjects[enemyBlueRow][enemyBlueColumn] = 0;
        enemyBlueRow++;
        gameObjects[enemyBlueRow][enemyBlueColumn] = character.ENEMYBLUE;
        break;
      case LEFT:
        gameObjects[enemyBlueRow][enemyBlueColumn] = 0;
        enemyBlueColumn--;
        gameObjects[enemyBlueRow][enemyBlueColumn] = character.ENEMYBLUE;
        break;
      case RIGHT:
        gameObjects[enemyBlueRow][enemyBlueColumn] = 0;
        enemyBlueColumn++;
        gameObjects[enemyBlueRow][enemyBlueColumn] = character.ENEMYBLUE;
        break;
    }
  }

  //Interacao com o mapa

  function apanharChave() {
    if (map[heroRow][heroColumn] === character.KEY) {
      map[heroRow][heroColumn] = 0;
      keys++;
      sounds.apanhaChave.play();
      if(keys != 1){
        alert("Apanhaste uma chave, agora tens " + keys + " chaves");
      }else{
        alert("Apanhaste uma chave, agora tens " + keys + " chave");
      }
    }
  }

  function apanhaPergunta(){
    if(map[heroRow][heroColumn]===character.QUESTION){
      escolhePergunta();
    }
  }

  function escolhePergunta() {
    var pergunta = Math.floor(Math.random() * 4);
    if (pergunta == "1") {
      lifes ++;
      map[heroRow][heroColumn] = 0;
      alert("Parabéns Ganhaste 1 Vida Extra, tens agora " + lifes + " vidas");
      sounds.question.play();
    } else if (pergunta == "2") {
      lifes --;
      if (lifes > 0) {
        map[heroRow][heroColumn] = 0;
        alert("Ups Perdeste 1 Vida, tens agora " + lifes + " vidas");
      } else {
        map[heroRow][heroColumn] = 0;
        alert("Ups Perdeste 1 Vida e ficaste com " + lifes + " vidas");
        endGame();
      }
    } else if (pergunta == "3") {
      energiaAtual -= 10;
      map[heroRow][heroColumn] = 0;
      alert("Ups Perdeste 10 Energias, tens agora " + energiaAtual + " energias");
      sounds.question.play();
    } else if (pergunta == "4") {
      energiaAtual += 10;
      map[heroRow][heroColumn] = 0;
      alert("Parabéns Ganhaste 10 Energias, tens agora " + energiaAtual + " energias");
      sounds.question.play();
    }
  }

  function abrirDoorLock() {
    if (keys != 0) {
      if (map[heroRow][heroColumn] === character.DOORLOCK) {
        map[heroRow][heroColumn] = 0;
        keys--;
        experiencia += 5;
        sounds.door.play();
        if(keys != 0){
          if(keys != 1){
            alert("Abriste uma Door Lock, ganhaste 5 de experiência e ainda tens " + keys + " chaves");
          }else{
            alert("Abriste uma Door Lock, ganhaste 5 de experiência e ainda tens " + keys + " chave");
          }
        }else{
          alert("Abriste uma Door Lock, ganhaste 5 de experiência e já não tens nenhuma chave");
        }
      } else {
        if (map[heroRow][heroColumn] === character.DOORLOCK) {
          map[heroRow][heroColumn] = 7;
          alert(
            "Não tens chaves suficientes para abrir esta Door Lock, procura no mapa"
          );
        }
      }
    }
  }

  function abrirStoneLock() {
    if (keys != 0) {
      if (map[heroRow][heroColumn] === character.STONELOCK) {
        map[heroRow][heroColumn] = 0;
        keys--;
        experiencia += 5;
        sounds.door.play();
        if(keys != 0){
          experiencia += 5;
          if(keys != 1){
            alert("Abriste uma Door Lock, ganhaste 5 de experiência e ainda tens " + keys + " chaves");
          }else{
            alert("Abriste uma Door Lock, ganhaste 5 de experiência e ainda tens " + keys + " chave");
          }
        }else{
          alert("Abriste uma Door Lock, ganhaste 5 de experiência e já não tens nenhuma chave");
        }
      } else {
        if (map[heroRow][heroColumn] === character.STONELOCK) {
          map[heroRow][heroColumn] = 6;
          alert(
            "Não tens chaves suficientes para abrir esta Stone Lock, procura no mapa"
          );
        }
      }
    }
  }

  function encontraPrincesa() {
    let energia = 10;
    if (energiaAtual > 0) {
      energiaAtual = energiaAtual - energia;
      experiencia += 15;
      lifes += 5;
      sounds.princess.play();
      alert("Salvaste a Princesa! E como recompensa tens agora " + lifes + " vidas e " + experiencia + " de experiência! Mas tudo tem um custo, perdeste 10 de energia e já só tens " + energiaAtual + " de energia!");
    } else {
      alert("Não tens energia suficiente para salvas a princesa");
      endGameEnergia();
    }
  }
  
  function encontraEnemy() {
    let heroStrength = Math.ceil((keys + experiencia + energiaAtual) / 3);
    let enemyStrength = Math.ceil(Math.random() * heroStrength * 2);

    if (lifes != 0) {
      if (enemyStrength > heroStrength) {
        lifes--;
        energiaAtual -= 10;
        alert("Lutaste e Perdeste, ainda tens " + lifes + " vidas e " + energiaAtual + " de energia");
        sounds.perdeVida.play();
      } else {
        if (energiaAtual <= 0) {
          endGameEnergia();
        } else {
          energiaAtual -= 10;
          experiencia += 10;
          alert("Lutaste e Ganhaste! Como recompensa ganhaste 10 de experiência e agora tens " + experiencia + " de experiência!");
          sounds.enemy.play();
        }
      }
    } else {
      if (lifes <= 0) {
        endGame();
      if (energiaAtual <= 0) {
        endGameEnergia();
      }
    }
  }
}

  function encontraBones() {
    if (map[heroRow][heroColumn] === character.BONES) {
      lifes--;
      sounds.perdeVida.play();
      map[heroRow][heroColumn] = 0;
      if (lifes != 0) {
        energiaAtual -= 5;
        alert("Pisaste Ossos! Tens de ter mais cuidado para a próxima. Ainda tens " + lifes + " vidas restantes e " + energiaAtual + " de energia");
      } else {
        alert("Pisaste Ossos! Ficaste sem vidas");
        endGame();
      }
    }
  }

  function partirIceStone() {
    let energia = 5;
    if (energiaAtual > 0) {
      map[heroRow][heroColumn] = 0;
      energiaAtual = energiaAtual - energia;
      experiencia += 5;
      sounds.ice.play();
      alert(
        "Partiste uma Icestone! Ainda tens mais " + energiaAtual + " de energia"
      );
    } else {
      endGameEnergia();
    }
  }

  function endGame() {  
    let score=lifes + energiaAtual + experiencia;
    if(lifes <= 0){
      alert("Morreste por não teres mais vidas!");
      sounds.death.play();
    }else{
      if(map[heroRow][heroColumn]===character.STAIRE){
        alert("Sobreviveste!" + "O teu score final é " + score);
        }
        sounds.success.play();
      }window.removeEventListener("keydown", keydownHandler, false);
  }

  function endGameEnergia() {
    let score = lifes + energiaAtual + experiencia;
    map[heroRow][heroColumn] = 0;
    alert("Morreste Por Falta de Energia!" + "O teu score final é " + score);
    sounds.death.play();
    window.removeEventListener("keydown", keydownHandler, false);
  }
  
})();