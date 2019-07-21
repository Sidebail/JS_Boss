//Declaring the elements
const levelCounter = document.getElementById('level');
//Player Elements
const pName = document.getElementById('pName');
const pHealth = document.getElementById('pHealth');
const pAttack = document.getElementById('pAttack');
const pArmor = document.getElementById('pArmor');
const pPicture = document.getElementById('pPicture');
//Defence buttons
const defHead = document.getElementById('defHead');
const defTorso = document.getElementById('defTorso');
const defLegs = document.getElementById('defLegs');
//Attack Butons
const atHead = document.getElementById('atHead');
const atTorso = document.getElementById('atTorso');
const atLegs = document.getElementById('atLegs');
//Enemy elements
const eName = document.getElementById('eName');
const eHealth = document.getElementById('eHealth');
const eAttack = document.getElementById('eAttack');
const eArmor = document.getElementById('eArmor');
const ePicture = document.getElementById('ePicture');
var tier = 1;

/* Creating the player object. THIS SHOULD BE GETTING THE NICKNAME FROM INITIAL INPUT! */
var playerChraracter = {
    name: "Tester",
    health: 10,
    maxHealth: 10,
    attack: 1,
    armor: 0,
    level: 1,
    takenDamage: 0,
    //pierce: Number,
    animIdle: String,
    animAttack: String,
    animDefend: String,
    //inventory: Item[3] -- NEEDS REVISE!
  
    recieveDamage: function(damage){
        if(damage-armor > 0){
            health = health - (damage-armor);
            takenDamage = takenDamage + damage;
        }else{
            console.log(`Negative value damage - armor value`);
            health = health - 1;
            takenDamage = takenDamage + 1;
        }
    },
    
    increaseStatistic: function(stringInput, value){
        switch(stringInput){
            case `health`: health = health + value; maxHealth = health + value; break;
            case `attack`: attack = attack + value; break;
            case `armor`: armor = armor + value; break;
            default: console.log(`ERROR: player.js->increaseStatistic(${stringInput},${value})`); break;
        }
    },
    
    increaseLevel: function(){
        level++;
    }
}

/* ENEMY LOGIC STARTS HERE */
var enemyNames = [`Orc`, `Elf`, `Thief`, `Skeleton`, `Dragon`];
var tier2Prefixes = [`Slick`, `Big`,`Old`,`Noob`,`Recruit`,`Half-dead`]
var tier3Prefixes = [`Warchief`,`Captain`,`Pirate`,`Wizard`,`Smart`]
var tier4Prefixes = [`Elder`,`Ancient`,`Centurion`,`King`,`Vengeful`]
var tier5Prefixes = [`Unstoppable`,`Invincible`,`Godlike`,`Magnificent`,`Super-duper`]

var healthMaxMins = [3,10,25,55,80][7,17,40,70,100];
var attackMaxMins = [1,3,8,18,30][3,7,13,26,50];

//Name is setted randomly
// Tier 1 doesnt have prefix
// Tier 2 and higher has prefix to be assigned before name

const enemyModel = {
    name: String,
    health: Number,
    maxHealth: Number,
    attack: Number,
    armor: Number,
    tier: Number,
    //pierce: Number,

    animIdle: String,
    animAttack: String,
    animDefend: String,


    makeName: function(){
        switch(tier){
            case 1: name = enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 2: name = tier2Prefixes[Math.floor(Math.random()*tier2Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 3: name = tier3Prefixes[Math.floor(Math.random()*tier3Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 4: name = tier4Prefixes[Math.floor(Math.random()*tier4Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
            case 5: name = tier5Prefixes[Math.floor(Math.random()*tier5Prefixes.length)] + enemyNames[Math.floor(Math.random()*enemyNames.length)]; break;
        }
    },

    makeStats: function(){
       health = Math.floor(Math.random() * (healthMaxMins[tier-1] - healthMaxMins[tier-1][tier-1])) + healthMaxMins[tier-1][tier-1];
       maxHealth = Math.floor(Math.random() * (healthMaxMins[tier-1] - healthMaxMins[tier-1][tier-1])) + healthMaxMins[tier-1][tier-1];
       attack = Math.floor(Math.random() * (attackMaxMins[tier-1] - attackMaxMins[tier-1][tier-1])) + attackMaxMins[tier-1][tier-1];

       if(tier>2){
           armor = Math.floor(Math.random() * ((tier + 5) - (tier - 3)) + (tier - 3));
       }
       
    },

    recieveDamage: function(damage){
        if(damage-armor > 0){
            health = health - (damage-armor);
        }else{
            console.log(`Negative value damage - armor value`);
            health = health - 1;
        }
    },

    createEnemy: function(tier, animIdle, animAttack, animDefend){
        this.tier = tier;

        makeStats();
       
        this.animIdle = animIdle;
        this.animAttack = animAttack;
        this.animDefend = animDefend;
        makeName();

    }
}

////////////////////////////////////////////

/* !Initializing the round! */
newRound = function(){
    switch(playerChraracter.level){
        case 5: tier = 2; break;
        case 15: tier = 3; break;
        case 30: tier = 4; break;
        case 50: tier = 5; break;
    }
    enemyModel.createEnemy(tier,"TEMP","TEMP");
    playerChraracter.health = Math.floor(playerChraracter.health + playerChraracter.takenDamage/2);
    updateScene();
}



/* !!!Function that updates the scene with values!!! */
updateScene = function(){
  levelCounter.textContent = `Level ${playerChraracter.level}`;
  pName.textContent = playerChraracter.name;
  pHealth.textContent = `Health: ${playerChraracter.health}/${playerChraracter}`
  pAttack.textContent = `Attack: ${playerChraracter.attack}`;
  pArmor.textContent = `Armor: ${playerChraracter.armor}`;

  eName.textContent = enemyModel.name;
  eHealth.textContent = `Health: ${enemyModel.health}/${enemyModel.maxHealth}`
  eAttack.textContent = `Attack: ${playerChraracter.attack}`;
  eArmor.textContent = `Armor: ${playerChraracter.armor}`;
}