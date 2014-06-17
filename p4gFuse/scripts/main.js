(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// crude Arcana enum
var Fool = 0,
	Magician =1,
	Priestess =2,
	Empress =3,
	Emperor =4,
	Hierophant =5,
	Lovers =6,
	Chariot =7,
	Justice =8,
	Hermit =9,
	Fortune =10,
	Strength =11,
	HangedMan =12,
	Death =13,
	Temperance =14,
	Devil =15,
	Tower =16,
	Star =17,
	Moon =18,
	Sun =19,
	Judgement =20,
	Jester =21,
	Aeon =22,
	World = 23;

var NumArcana = World + 1;

function InitializeSpread() {
	var result = new Array(NumArcana);
	for( var i = 0; i < NumArcana; ++i ) {
		result[i] = new Array(NumArcana);
	}
	return result;
}

function GetResult( spread, first, second ) {
	var result = spread[first][second];
	// do commutative search if we came up short
	if( result === undefined || result === null )
		result = spread[second][first];
	return result;
}

var NormalSpread = InitializeSpread();
var TriangleSpread = InitializeSpread();


function AddSpread( spread, first, second, result, commutative ) {
	spread[first][second] = result;
	if( commutative ) {
		spread[second][first] = result;
	}
}

function AddNormalSpread( first, second, result ) {
	AddSpread(NormalSpread, first, second, result, false);
}

function AddTriangleSpread( first, second, result ) {
	AddSpread(TriangleSpread, first, second, result, true);
}

function AddSpreads() {
	var args = Array.prototype.slice.call(arguments);
	var spread = args.shift();
	var srcArcana = args.shift();

	AddSpread(spread, srcArcana, srcArcana, srcArcana);
	for (var i = 0; i < args.length; i+=2) {
		AddSpread(spread, srcArcana, args[i], args[i+1]);
	};

}

function AddNormalSpreads() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(NormalSpread);
	AddSpreads.apply(null,args);
}

function AddTriangleSpreads() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(TriangleSpread);
	AddSpreads.apply(null,args);
}

AddNormalSpreads( Fool,
	Magician, Temperance,
	Priestess, Death,
	Empress, Moon,
	Emperor, Death,
	Hierophant, Chariot,
	Lovers, Empress,
	Chariot, Sun,
	Justice, Magician,
	Hermit, Strength,
	Fortune, Magician,
	Strength, Magician,
	HangedMan, Strength,
	Death, Hermit,
	Temperance, Hierophant,
	Devil, Temperance,
	Tower, Star,
	Star, Empress,
	Moon, Emperor,
	Sun, Devil,
	Judgement, HangedMan,
	Jester, Priestess,
	Aeon, Death
);

AddNormalSpreads( Magician,
	Priestess, Moon,
	Empress, Justice,
	Emperor, Strength,
	Hierophant, Devil,
	Lovers, Death,
	Chariot, Temperance,
	Justice, Strength,
	Hermit, Empress,
	Fortune, Lovers,
	Strength, Justice,
	HangedMan, Sun,
	Death, Emperor,
	Temperance, Strength,
	Devil, Sun,
	Tower, HangedMan,
	Star, null,
	Moon, Star,
	Sun, Chariot,
	Judgement, Lovers,
	Jester, Hierophant,
	Aeon, Emperor
);

AddNormalSpreads( Priestess,
	Empress, Hermit,
	Emperor, Empress,
	Hierophant, Sun,
	Lovers, Emperor,
	Chariot, Hierophant,
	Justice, Hermit,
	Hermit, Death,
	Fortune, HangedMan,
	Strength, Justice,
	HangedMan, Moon,
	Death, Magician,
	Temperance, Hierophant,
	Devil, Justice,
	Tower, Magician,
	Star, Emperor,
	Moon, Star,
	Sun, Devil,
	Judgement, Sun,
	Jester, Devil,
	Aeon, Sun
);

AddNormalSpreads( Empress,
	Emperor, Moon,
	Hierophant, Death,
	Lovers, Justice,
	Chariot, Justice,
	Justice, Magician,
	Hermit, Magician,
	Fortune, Star,
	Strength, Hierophant,
	HangedMan, Temperance,
	Death, Chariot,
	Temperance, Devil,
	Devil, Priestess,
	Tower, Hermit,
	Star, Chariot,
	Moon, Temperance,
	Sun, Priestess,
	Judgement, Priestess,
	Jester, Strength,
	Aeon, Temperance
);

AddNormalSpreads( Emperor,
	Hierophant, Empress,
	Lovers, Justice,
	Chariot, Temperance,
	Justice, Devil,
	Hermit, Priestess,
	Fortune, Lovers,
	Strength, Hermit,
	HangedMan, Empress,
	Death, Moon,
	Temperance, Sun,
	Devil, Moon,
	Tower, Star,
	Star, Death,
	Moon, Magician, 
	Sun, Chariot,
	Judgement, Lovers,
	Jester, Justice,
	Aeon, HangedMan
);

AddNormalSpreads( Hierophant,
	Lovers, Death,
	Chariot, Sun,
	Justice, Temperance,
	Hermit, Justice,
	Fortune, Priestess,
	Strength, Sun,
	HangedMan, Death,
	Death, Devil, 
	Temperance, Magician,
	Devil, Empress,
	Tower, HangedMan,
	Star, Moon,
	Moon, Empress,
	Sun, Strength,
	Judgement, Chariot,
	Jester, Magician,
	Aeon, Moon
);

AddNormalSpreads( Lovers,
	Aeon, Justice,
	Jester, Sun,
	Judgement, Strength,
	Sun, Devil,
	Moon, HangedMan,
	Star, Hermit, 
	Tower, Star,
	Devil, Hierophant,
	Temperance, Hierophant,
	Death, Star,
	HangedMan, Moon,
	Strength, Emperor,
	Fortune, Star, 
	Hermit, Magician, 
	Justice, Priestess,
	Chariot, Hierophant
);

AddNormalSpreads( Chariot,
	Justice, Temperance,
	Hermit, Justice,
	Fortune, Devil,
	Strength, Magician,
	HangedMan, Death,
	Death, Hermit,
	Temperance, Magician,
	Devil, Moon,
	Tower, HangedMan,
	Star, Hierophant,
	Moon, Sun, 
	Sun, Strength,
	Judgement, Temperance,
	Jester, Chariot,
	Aeon, Strength
);

AddNormalSpreads( Justice,
	Hermit, Strength,
	Fortune, Lovers,
	Strength, Temperance,
	HangedMan, Priestess,
	Death, Strength,
	Temperance, Hermit,
	Devil, Magician,
	Tower, Lovers,
	Star, Moon,
	Moon, Strength,
	Sun, Temperance,
	Judgement, Lovers,
	Jester, Emperor,
	Aeon, Lovers
);

AddNormalSpreads( Hermit,
	Fortune, Empress,
	Strength, Hierophant,
	HangedMan, Moon,
	Death, Sun,
	Temperance, Magician,
	Devil, Justice,
	Tower, Death,
	Star, Justice,
	Moon, Emperor,
	Sun, Temperance,
	Judgement, Star,
	Jester, Moon,
	Aeon, Magician
);

AddNormalSpreads( Fortune,
	Strength, Star,
	HangedMan, Death,
	Death, Hermit,
	Temperance, Devil,
	Devil, Emperor,
	Tower, Chariot,
	Star, Star,
	Moon, Lovers,
	Sun, Priestess,
	Judgement, HangedMan,
	Jester, Devil,
	Aeon, Priestess
);

AddNormalSpreads( Strength,
	HangedMan, Hierophant,
	Death, HangedMan,
	Temperance, Sun,
	Devil, Hermit,
	Tower, HangedMan,
	Star, Emperor,
	Moon, Justice,
	Sun, Temperance,
	Judgement, null,
	Jester, Empress,
	Aeon, Chariot
);

AddNormalSpreads( HangedMan,
	Death, Priestess,
	Temperance, Death,
	Devil, Justice,
	Tower, Hermit,
	Star, Empress,
	Moon, Priestess,
	Sun, Devil,
	Judgement, Empress,
	Jester, Priestess,
	Aeon, Death
);

AddNormalSpreads( Death,
	Temperance, Chariot,
	Devil, Star,
	Tower, Lovers,
	Star, Lovers,
	Moon, Priestess,
	Sun, Empress,
	Judgement, null,
	Jester, Temperance,
	Aeon, HangedMan
);

AddNormalSpreads( Temperance,
	Devil, Hermit,
	Tower, Star,
	Star, Hierophant,
	Moon, HangedMan,
	Sun, Hermit,
	Judgement, null,
	Jester, Death,
	Aeon, Empress
);

AddNormalSpreads( Devil,
	Tower, Emperor,
	Star, Emperor,
	Moon, Empress,
	Sun, Hierophant,
	Judgement, null,
	Jester, Chariot,
	Aeon, Magician
);

AddNormalSpreads( Tower,
	Star, HangedMan,
	Moon, Priestess,
	Sun, Chariot,
	Judgement, null,
	Jester, Hermit,
	Aeon, Emperor
);

AddNormalSpreads( Star,
	Moon, Emperor,
	Sun, Moon,
	Judgement, null,
	Jester, Empress,
	Aeon, Chariot
);	

AddNormalSpreads( Moon,
	Sun, Strength,
	Judgement, null,
	Jester, Hermit,
	Aeon, Hierophant
);	

AddNormalSpreads( Sun,
	Judgement, null,
	Jester, Lovers,
	Aeon, Priestess
);	

AddNormalSpreads( Judgement,
	Jester, Chariot,
	Aeon, HangedMan
);	

AddNormalSpreads( Jester,
	Aeon, Devil
);	

AddNormalSpreads(Aeon);

AddTriangleSpreads( Aeon,
	Fool, Jester,
	Magician, Empress,
	Priestess, Fool,
	Empress, Star,
	Emperor, Sun,
	Hierophant, Sun,
	Lovers, Judgement,
	Chariot, Justice,
	Justice, Temperance,
	Hermit, Moon,
	Fortune, Fool,
	Strength, Hermit,
	HangedMan, Jester,
	Death, Strength,
	Temperance, Judgement,
	Devil, Lovers,
	Tower, Fortune,
	Star, Tower,
	Moon, Tower,
	Sun, Hierophant,
	Judgement, Sun,
	Jester, Judgement
);

AddTriangleSpreads( Jester,
	Fool, Priestess,
	Magician, Star,
	Priestess, Moon,
	Empress, Devil,
	Emperor, Chariot,
	Hierophant, Fortune,
	Lovers, Tower,
	Chariot, Strength,
	Justice, Hermit,
	Hermit, Aeon,
	Fortune, Emperor,
	Strength, Magician,
	HangedMan, Moon,
	Death, Fortune,
	Temperance, Priestess,
	Devil, Aeon,
	Tower, Judgement,
	Star, Death,
	Moon, HangedMan,
	Sun, Lovers,
	Judgement, Death
);

AddTriangleSpreads( Judgement,
	Fool, Temperance,
	Magician, Sun,
	Priestess, Temperance,
	Empress, Star,
	Emperor, HangedMan,
	Hierophant, Fool,
	Lovers, Emperor,
	Chariot, Tower,
	Justice, Sun,
	Hermit, Temperance,
	Fortune, Fool,
	Strength, Temperance,
	HangedMan, Fool,
	Death, Strength,
	Temperance, Chariot,
	Devil, Death,
	Tower, Aeon,
	Star, Lovers,
	Moon, Hermit,
	Sun, Chariot
);

AddTriangleSpreads( Sun,
	Fool, Empress,
	Magician, Fortune,
	Priestess, Aeon,
	Empress, Lovers,
	Emperor, Devil,
	Hierophant, Magician,
	Lovers, Jester,
	Chariot, Priestess,
	Justice, Judgement,
	Hermit, Tower,
	Fortune, Chariot,
	Strength, Tower,
	HangedMan, Empress,
	Death, Empress,
	Temperance, Fortune,
	Devil, Lovers,
	Tower, Death,
	Star, Chariot,
	Moon, Death
);

AddTriangleSpreads( Moon,
	Fool, Empress,
	Magician, Sun,
	Priestess, Empress,
	Empress, Moon,
	Emperor, Strength,
	Hierophant, Aeon,
	Lovers, HangedMan,
	Chariot, Fool,
	Justice, Star,
	Hermit, Jester,
	Fortune, Strength,
	Strength, Hierophant,
	HangedMan, Magician,
	Death, HangedMan,
	Temperance, HangedMan,
	Devil, Death,
	Tower, HangedMan,
	Star, Death
);

AddTriangleSpreads( Star,
	Fool, Hermit,
	Magician, Hierophant,
	Priestess, Empress,
	Empress, Jester,
	Emperor, Sun,
	Hierophant, Lovers,
	Lovers, Hierophant,
	Chariot, Aeon,
	Justice, Sun,
	Hermit, Death,
	Fortune, Magician,
	Strength, Devil,
	HangedMan, Sun,
	Death, Fortune,
	Temperance, Hierophant,
	Devil, Fortune,
	Tower, Hermit
);

AddTriangleSpreads( Tower,
	Fool, Fortune,
	Magician, Emperor,
	Priestess, Moon,
	Empress, Judgement,
	Emperor, Priestess,
	Hierophant, Emperor,
	Lovers, Judgement,
	Chariot, Hierophant,
	Justice, Chariot,
	Hermit, Jester,
	Fortune, Magician,
	Strength, Devil,
	HangedMan, Fortune,
	Death, Justice,
	Temperance, Judgement,
	Devil, Star
);

AddTriangleSpreads( Devil,
	Fool, Lovers,
	Magician, Chariot,
	Priestess, Hermit,
	Empress, Fool,
	Emperor, Death,
	Hierophant, Moon,
	Lovers, Tower,
	Chariot, Emperor,
	Justice, Priestess,
	Hermit, Death,
	Fortune, Tower,
	Strength, Lovers,
	HangedMan, Justice,
	Death, Lovers,
	Temperance, Justice
);

AddTriangleSpreads( Temperance,
	Fool, Justice,
	Magician, Sun,
	Priestess, Lovers,
	Empress, Aeon,
	Emperor, Devil,
	Hierophant, Emperor,
	Lovers, Fortune,
	Chariot, Moon,
	Justice, Magician,
	Hermit, Devil,
	Fortune, Tower,
	Strength, Emperor,
	HangedMan, Justice,
	Death, Jester
);	

AddTriangleSpreads( Death,
	Fool, Star,
	Magician, Fool,
	Priestess, Chariot,
	Empress, Hierophant,
	Emperor, Strength,
	Hierophant, Magician,
	Lovers, HangedMan,
	Chariot, Devil,
	Justice, Devil,
	Hermit, Magician,
	Fortune, Moon,
	Strength, Empress,
	HangedMan, Devil
);	

AddTriangleSpreads( HangedMan,
	Fool, Star,
	Magician, Fortune,
	Priestess, Chariot,
	Empress, Sun,
	Emperor, Hierophant,
	Hierophant, Star,
	Lovers, Justice,
	Chariot, Devil,
	Justice, Star,
	Hermit, Strength,
	Fortune, Fool,
	Strength, Star
);

AddTriangleSpreads( Strength,
	Fool, Empress,
	Magician, Tower,
	Priestess, Empress,
	Empress, Jester,
	Emperor, Hermit,
	Hierophant, Moon,
	Lovers, Fool,
	Chariot, Aeon,
	Justice, Hermit,
	Hermit, Justice,
	Fortune, Priestess
);	

AddTriangleSpreads( Fortune,
	Fool, Judgement,
	Magician, Strength,
	Priestess, Aeon,
	Empress, Strength,
	Emperor, Priestess,
	Hierophant, HangedMan,
	Lovers, HangedMan,
	Chariot, Temperance,
	Justice, Priestess,
	Hermit, Judgement
);		

AddTriangleSpreads( Hermit,
	Fool, Strength,
	Magician, Empress,
	Priestess, Magician,
	Empress, Fool,
	Emperor, Moon,
	Hierophant, Lovers,
	Lovers, Hierophant,
	Chariot, Priestess,
	Justice, Emperor
);	

AddTriangleSpreads( Justice,
	Fool, Chariot,
	Magician, Chariot,
	Priestess, Hermit,
	Empress, Death,
	Emperor, Jester,
	Hierophant, Magician,
	Lovers, Aeon,
	Chariot, Temperance
);		

AddTriangleSpreads( Chariot,
	Fool, Lovers,
	Magician, Emperor,
	Priestess, Magician,
	Empress, Emperor,
	Emperor, Tower,
	Hierophant, Judgement,
	Lovers, Hierophant
);	

AddTriangleSpreads( Lovers,
	Fool, Devil,
	Magician, Temperance,
	Priestess, HangedMan,
	Empress, Fool,
	Emperor, Devil,
	Hierophant, HangedMan
);	

AddTriangleSpreads( Hierophant,
	Fool, Tower,
	Magician, Jester,
	Priestess, Empress,
	Empress, Priestess,
	Emperor, Chariot
);

AddTriangleSpreads( Emperor,
	Fool, Hermit,
	Magician, Death,
	Priestess, Justice,
	Empress, Fool
);

AddTriangleSpreads( Empress,
	Fool, Judgement,
	Magician, Sun,
	Priestess, Temperance
);	

AddTriangleSpreads( Priestess,
	Fool, Lovers,
	Magician, Fortune
);		

AddTriangleSpreads( Magician,
	Fool, Fortune
);			

AddTriangleSpreads(Fool);


function GetNormalResult( first, second ) {
	if( first == second )
		return null;
	
	return GetResult(NormalSpread, first, second);
}

function GetTriangleResult( first, second, third ) {
	if( first == second || second == third || first == third )
		return null;

	var firstResult = GetNormalResult(first, second);
	if( firstResult !== null && firstResult !== undefined )
		return GetResult( TriangleSpread, firstResult, third );
	return null;
}

function BackCalc(spread,target){
	var result = [];
	for (var i = 0; i < spread.length; i++) {
		var arcanaResults = spread[i];
		for (var j = 0; j < arcanaResults.length; j++) {
			if( arcanaResults[j] === target ) {
				result.push([i,j]);
			}
		};
	};
	return result;
}

function BackCalcNormal( target ) {
	return BackCalc(NormalSpread,target);
}

function BackCalcTriangle( target ) {
//	return BackCalc(TriangleSpread,target);

	var result = [];

	for (var firstArcana = 0; firstArcana < TriangleSpread.length; firstArcana++) {
		var arcanaResults = TriangleSpread[firstArcana];

		for (var secondArcana = 0; secondArcana < arcanaResults.length; secondArcana++) {
			if( arcanaResults[secondArcana] === target ) {
				var firstPredicates = BackCalcNormal( firstArcana );
				for (var i = 0; i < firstPredicates.length; i++) {
					var pair = firstPredicates[i];
					result.push( [pair[0], pair[1], secondArcana] );
				};
			}
		}
	}

	return result;
}

function ToString( arcana ) {
	if( arcana === Fool ) return "Fool";
	if( arcana === Magician ) return "Magician";
	if( arcana === Priestess ) return "Priestess";
	if( arcana === Empress ) return "Empress";
	if( arcana === Emperor ) return "Emperor";
	if( arcana === Hierophant ) return "Hierophant";
	if( arcana === Lovers ) return "Lovers";
	if( arcana === Chariot ) return "Chariot";
	if( arcana === Justice ) return "Justice";
	if( arcana === Hermit ) return "Hermit";
	if( arcana === Fortune ) return "Fortune";
	if( arcana === Strength ) return "Strength";
	if( arcana === HangedMan ) return "HangedMan";
	if( arcana === Death ) return "Death";
	if( arcana === Temperance ) return "Temperance";
	if( arcana === Devil ) return "Devil";
	if( arcana === Tower ) return "Tower";
	if( arcana === Star ) return "Star";
	if( arcana === Moon ) return "Moon";
	if( arcana === Sun ) return "Sun";
	if( arcana === Judgement ) return "Judgement";
	if( arcana === Jester ) return "Jester";
	if( arcana === Aeon ) return "Aeon";
	if( arcana === World ) return "World";
	return "[[BAD]]";
}

module.exports = {
	// poor man's enum
	Fool: Fool,
	Magician: Magician,
	Priestess: Priestess,
	Empress: Empress,
	Emperor: Emperor,
	Hierophant: Hierophant,
	Lovers: Lovers,
	Chariot: Chariot,
	Justice: Justice,
	Hermit: Hermit,
	Fortune: Fortune,
	Strength: Strength,
	HangedMan: HangedMan,
	Death: Death,
	Temperance: Temperance,
	Devil: Devil,
	Tower: Tower,
	Star: Star,
	Moon: Moon,
	Sun: Sun,
	Judgement: Judgement,
	Jester: Jester,
	Aeon: Aeon,
	World: World,

	// ordered version, for sorting!
	Ordered: [ Fool, Magician, Priestess, Empress, Emperor, Hierophant, Lovers, Chariot, Justice, Hermit, Fortune, Strength, HangedMan, Death, Temperance, Devil, Tower, Star, Moon, Sun, Judgement, Jester, Aeon, World ],

	Count: NumArcana,

	// "static" methods
	GetNormalResult: GetNormalResult,
	GetTriangleResult: GetTriangleResult,
	BackCalcNormal: BackCalcNormal,
	BackCalcTriangle: BackCalcTriangle,
	ToString: ToString
}
},{}],2:[function(require,module,exports){
/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var $ = require('jquery');
var Arcana = require('./arcana.js');
var Persona = require('./persona.js');


var sortedByNamePersona = Persona.ByLevel.sort(function(a, b)  {
    if( a.name > b.name ) return 1;
    if( a.name < b.name ) return -1;
    return 0;
});
var personaNamesInOrder = sortedByNamePersona.map(function(persona){ return persona.name; })

function drawIndividual(result) {
    var $results = $("#results").empty();
    var resultText = "No results found";
    if( !!result ) {
        resultText = Persona.ToString(result);
    }
    $results.append($("<div class='column'></div>").text(resultText));
}

function drawResults(resultsArray) {
    var $results = $("#results").empty();
    for (var i = 0; !!resultsArray && i < resultsArray.length; i++) {
        var result = resultsArray[i];
        var $row = $("<ul></ul>").addClass('small-block-grid-'+result.length);
        for( var j = 0; j < result.length; ++j ) {
            $row.append($("<li></li>").text(Persona.ToString(result[j])));

        }
        $results.append($row);
    };
}

var triangle = false;
function recalculateFusion() {
    var result = null;
    var firstName = $("#firstFusion").val();
    var secondName = $("#secondFusion").val();
    var thirdName = $("#thirdFusion").val();

    if( !!firstName && !!secondName ) {
        var firstPersona = Persona.ByName[firstName];
        var secondPersona = Persona.ByName[secondName];
        var triangle = !!thirdName;

        if( triangle ) {
            result = Persona.TriangleCalculation(firstPersona,secondPersona,Persona.ByName[thirdName]);
        } else {
            result = Persona.NormalCalculation(firstPersona,secondPersona);
        }
    }

    drawIndividual(result);
}

function recalculateFission() {
    var results = [];
    var containingPersona = undefined;
    var fissibleName = $("#fissible").val();
    var containingName = $("#containing").val();
    if(!!containingName) {
        containingPersona = Persona.ByName[containingName];
    }

    if( !!fissibleName ) {
        var fissiblePersona = Persona.ByName[fissibleName];
        if( triangle ) {
            if( !!containingPersona ) {
                results = Persona.BackCalcTriangle(fissiblePersona,containingPersona);
            }
        } else {    
            results = Persona.BackCalcNormal(fissiblePersona,containingPersona);
        }
    }

    drawResults(results);
}

$(function(){
    var $selects = $("select.persona");
    $selects.empty();
    $selects.append($("<option></option>"));
    $.each(sortedByNamePersona, function(i,e) {
        $selects.append($("<option>"+Persona.ToString(e)+"</option>").val(e.name));
    });

    $("#trinaryFission").change(function(){
        triangle = this.checked;
        $("#containing").val("");
        recalculateFission();
    });

    $("#firstFusion, #secondFusion, #thirdFusion").change(recalculateFusion);
    $("#fissible, #containing").change(recalculateFission);
});
},{"./arcana.js":1,"./persona.js":3,"jquery":"HlZQrA"}],3:[function(require,module,exports){
'use strict';


var Arcana = require("./arcana");

var personaByLvl = 
    [{
        arcana: Arcana.Fool,
        name_jp: "イザナギ",
        name: "Izanagi",
        level: 1,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Str",
            wind: "Wk",
            light: "-",
            dark: "Nul"
        },
        skills: "Zio, Cleave, Rakukaja, Rakunda(3), Tarukaja(5)",
        inherit: "Elec",
        notes: "MC's default Persona"
    },
    {
        arcana: Arcana.Magician,
        name_jp: "ピクシー",
        name: "Pixie",
        level: 2,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Dia, Patra, Zio(3), Me Patra(4), Trafuri(8)",
        inherit: "Recovery",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "スライム",
        name: "Slime",
        fusionRecipeNames: ["Eligor", "Nata Taishi"],
        level: 2,
        elements: {
            physical: "Str",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Bash, Evil Touch, Tarunda(3), Red Wall(4), Fear Boost(5), Resist Physical(7)",
        inherit: "Phys",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "ウコバク",
        name: "Ukobach",
        fusionRecipeNames: ["Lilim", "Vetala"],
        level: 3,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agi, Sukunda, Pulinpa(4), Confuse Boost(5), Resist Fire(6), Fire Break(7)",
        inherit: "Fire",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Justice,
        name_jp: "エンジェル",
        name: "Angel",
        level: 4,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "Str",
            dark: "Wk"
        },
        skills: "Garu, Patra, Hama(5), Sukukaja(6), Regenerate 1(8), Hama Boost(9)",
        inherit: "Wind",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "アプサラス",
        name: "Apsaras",
        level: 4,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Patra, Dia, Rakunda(5), Me Patra(6), Bufu(7)",
        inherit: "Recovery",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "ザントマン",
        name: "Sandman",
        level: 5,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Garu, Pulinpa, Skull Cracker(6), Confuse Boost(7), Dekaja(8), Traesto(11)",
        inherit: "Wind",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "ナタタイシ",
        name: "Nata Taishi",
        level: 6,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "-",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Bash, Rakunda, Dekunda, Sonic Punch(7), Dodge Ice(8), Resist Dizzy(9), Soul Break(10)",
        inherit: "Phys",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "フォルネウス",
        name: "Forneus",
        level: 6,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Str",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "Nul"
        },
        skills: "Bufu, Skewer, Tarukaja, Rakunda(7), Poisma(8), Dodge Elec(10)",
        inherit: "Ice",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Fool,
        name_jp: "ヨモツシコメ",
        name: "Yomotsu-shikome",
        level: 7,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Str",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Poisma, Skewer, Evil Touch, Sukunda(9), Mudo(10), Ghastly Wail(11)",
        inherit: "Bad Stat",
        notes: "Yukiko's Castle, Steamy Bathhouse"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "オモイカネ",
        name: "Omoikane",
        level: 7,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Wk",
            electric: "Str",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Zio, Sukunda, Tarunda, Poison Mist(8), Resist Wind(9), Dodge Ice(10), Resist Poison(11), Resist Elec(12)",
        inherit: "Elec",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Magician,
        name_jp: "オロバス",
        name: "Orobas",
        level: 8,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agi, Hysterical Slap, Dekaja, Dodge Ice(10), Resist Dizzy(11), Sharp Student(12)",
        inherit: "Fire",
        notes: "Yukiko's Castle, Steamy Bathhouse"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "ヴァルキリー",
        name: "Valkyrie",
        level: 8,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Str",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Bufu, Cleave, Rakunda, Media(10), Arm Chopper(11), Mabufu(12)",
        inherit: "Ice",
        notes: "Yukiko's Castle"
    },
    {
        arcana: Arcana.Empress,
        name_jp: "センリ",
        name: "Senri",
        level: 9,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "-",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Dia, Makajam, Agi, Dekunda(10), Media(11), Trafuri(14)",
        inherit: "Recovery",
        notes: "Yukiko's Castle, Steamy Bathhouse"
    },
    {
        arcana: Arcana.Death,
        name_jp: "グール",
        name: "Ghoul",
        level: 9,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "-"
        },
        skills: "Bash, Poisma, Sukukaja(10), Enervation(11), Poisonous Skewer(12), Rakunda(13), Poison Boost(14)",
        inherit: "Bad Stat",
        notes: "Yukiko's Castle, Steamy Bathhouse"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "リリム",
        name: "Lilim",
        level: 10,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Str"
        },
        skills: "Zio, Mudo, Enervation, Enervate Boost(12), Sukukaja(13), Mamudo(15)",
        inherit: "Dark",
        notes: "Yukiko's Castle, Steamy Bathhouse"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "カーシー",
        name: "Cu Sith",
        level: 10,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Garu, Pulinpa, Rakukaja, Growth 1(11), Magaru(13), White Wall(14), Traesto(15)",
        inherit: "Wind",
        notes: "Yukiko's Castle, Steamy Bathhouse"
    },
    {
        arcana: Arcana.Priestess,
        name_jp: "サキミタマ",
        name: "Saki Mitama",
        level: 11,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Str",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Dia, Bufu, Sukunda, Alertness(13), Media(14), Null Rage(16)",
        inherit: "Recovery",
        notes: "Steamy Bathhouse"
    },
    {
        arcana: Arcana.Justice,
        name_jp: "アークエンジェル",
        name: "Archangel",
        level: 11,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Hama, Double Fangs, Patra, Media(12), Muzzle Shot(13), Sharp Student(14), Survive Dark(15)",
        inherit: "Light",
        notes: "Steamy Bathhouse"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "シルフ",
        name: "Sylph",
        level: 11,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Garu, Sukukaja, Me Patra, Regenerate 1(12), Media(13), Magaru(14)",
        inherit: "Wind",
        notes: "Steamy Bathhouse"
    },
    {
        arcana: Arcana.Emperor,
        name_jp: "オベロン",
        name: "Oberon",
        level: 12,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Zio, Arm Chopper, Makajam(13), Media(14), Elec Boost(15), Mazio(16), Dodge Wind(17)",
        inherit: "Elec",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "エリゴール",
        name: "Eligor",
        level: 12,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "Str"
        },
        skills: "Poisonous Skewer, Agi, Maragi(13), Arm Chopper(14), Fire Boost(15), Soul Break(16), Resist Exhaust(17)",
        inherit: "Phys",
        notes: "Steamy Bathhouse"
    },
    {
        arcana: Arcana.Fool,
        name_jp: "オバリヨン",
        name: "Obariyon",
        level: 13,
        elements: {
            physical: "Str",
            fire: "Str",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Sonic Punch, Tarukaja, Dekaja, Muzzle Shot(14), Silence Boost(15), Resist Physical(17), Single Shot(18)",
        inherit: "Phys",
        notes: "Steamy Bathhouse"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "ティターン",
        name: "Titan",
        level: 14,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Wk",
            electric: "Str",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Mazio, Skull Cracker, Dekunda, Dodge Ice(16), Kill Rush(18), Resist Fear(19)",
        inherit: "Elec",
        notes: "Steamy Bathhouse"
    },
    {
        arcana: Arcana.Death,
        name_jp: "モコイ",
        name: "Mokoi",
        level: 14,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Sonic Punch, Hysterical Slap, Dekaja, Valiant Dance(15), Rage Boost(16), Soul Break(18), Exhaust Boost(19)",
        inherit: "Support",
        notes: "Steamy Bathhouse"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "アンズー",
        name: "Anzu",
        level: 15,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "Str",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Garu, Balzac, Alertness, Magaru(17), Red Wall(18), Mahama(19), Auto-Sukukaja(20)",
        inherit: "Wind",
        notes: "Steamy Bathhouse"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "ベリス",
        name: "Berith",
        level: 15,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "-",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Single Shot, Mudo, Maragi(16), Mudo Boost(17), Green Wall(18), Brain Shake(19), Resist Confuse(20)",
        inherit: "Phys",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Magician,
        name_jp: "ジャックフロスト",
        name: "Jack Frost",
        level: 16,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Mabufu, Ice Break, Me Patra, Ice Boost(18), Bufula(19), Dodge Fire(20), Mind Charge(25)",
        inherit: "Ice",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "カイチ",
        name: "Xiezhai",
        level: 16,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Zio, Mazio, Rakunda, Makajam(17), Silence Boost(18), Rampage(19), Elec Boost(21)",
        inherit: "Elec",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Priestess,
        name_jp: "サラスヴァティ",
        name: "Sarasvati",
        level: 17,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Media, Mabufu, Patra, Invigorate 2(19), Resist Rage(20), Dekaja(21), Null Wind(23)",
        inherit: "Recovery",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "イッポンダタラ",
        name: "Ippon-datara",
        level: 17,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Mudo, Maragi, Mamudo(19), Agilao(20), Rampage(21), Mudo Boost(22)",
        inherit: "Dark",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Empress,
        name_jp: "ヤクシニー",
        name: "Yaksini",
        level: 18,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "Str",
            dark: "-"
        },
        skills: "Mabufu, Rakunda, Swift Strike(20), Ice Boost(21), Bufula(22), Auto-Tarukaja(23)",
        inherit: "Ice",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "アラミタマ",
        name: "Ara Mitama",
        level: 18,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Assault Dive, Rakunda, Tarukaja(20), Sharp Student(21), Blue Wall(22), Dodge Elec(23)",
        inherit: "Phys",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Aeon,
        name: "Ame-no-Uzume",
        level: 18,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Nul",
            light: "Nul",
            dark: "-"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Justice,
        name_jp: "プリンシパリティ",
        name: "Principality",
        level: 19,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Hama, Twin Shot, Mahama(21), Media(22), Resist Confuse(23), Survive Dark(24), Tetraja(25)",
        inherit: "Light",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "ヴェータラ",
        name: "Vetala",
        level: 19,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "-",
            dark: "Str"
        },
        skills: "Foolish Whisper, Evil Touch, Life Drain(20), Foul Breath(21), Brain Shake(22), Ghastly Wail(23), Fear Boost(24)",
        inherit: "Bad Stat",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "アンドラス",
        name: "Andras",
        level: 20,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Media, Mazio, Sukukaja, Blue Wall(22), Regenerate 2(23), Zionga(24), Dodge Wind(25)",
        inherit: "Recovery",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "ホウオウ",
        name: "Phoenix",
        level: 20,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Wk",
            electric: "Nul",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Garula, Maragi, Twin Shot(22), Growth 1(23), Dodge Ice(25), Fire Boost(26), Maragion(27)",
        inherit: "Wind",
        notes: "Steamy Bathhouse, Marukyu Striptease"
    },
    {
        arcana: Arcana.Jester,
        name: "Gurr",
        level: 20,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "Wk",
            dark: "Str"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Fool,
        name_jp: "レギオン",
        name: "Legion",
        level: 21,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "Str",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Str"
        },
        skills: "Tentarafoo, Mudo, Evil Smile, Rampage(23), Confuse Boost(24), Foul Breath(25), Survive Light(26)",
        inherit: "Bad Stat",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "シーサー",
        name: "Shiisaa",
        level: 21,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Str",
            electric: "Nul",
            wind: "-",
            light: "-",
            dark: "Wk"
        },
        skills: "Mazio, Balzac, Rakukaja(22), Zionga(23), Silence Boost(24), Resist Fire(25), Null Rage(26)",
        inherit: "Elec",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Priestess,
        name_jp: "ハイピクシー",
        name: "High Pixie",
        level: 22,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Wk",
            electric: "Nul",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Mazio, Sukukaja, Me Patra, Zionga(24), Invigorate 1(25), Dodge Fire(26), Trafuri(27)",
        inherit: "Elec",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Emperor,
        name_jp: "キングフロスト",
        name: "King Frost",
        level: 22,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Bufula, Mabufu, Ice Break, Rakukaja(23), Dodge Fire(24), Ice Boost(26), Null Fire(27), Anima Freeze(28)",
        inherit: "Ice",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "ヨモツイクサ",
        name: "Yomotsu-ikusa",
        level: 22,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Str",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Nul"
        },
        skills: "Cell Breaker, Mabufu, Enervate Boost(24), Foul Breath(25), Poison Mist(26), Poison Boost(27)",
        inherit: "Bad Stat",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "ラクシャーサ",
        name: "Rakshasa",
        level: 23,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Kill Rush, Brain Shake, Counter, Gale Slash(25), Auto-Tarukaja(26), Dodge Physical(27), Power Charge(28)",
        inherit: "Phys",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "ニギミタマ",
        name: "Nigi Mitama",
        level: 23,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Diarama, Me Patra, Re Patra, Recarm(25), Invigorate 2(26), Garula(28), Resist Enervate(29)",
        inherit: "Recovery",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Death,
        name_jp: "マタドール",
        name: "Matador",
        level: 24,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Rf"
        },
        skills: "Mamudo, Swift Strike, Dekunda, Mudo Boost(26), Rampage(27), Auto-Sukukaja(29), Survive Light(30)",
        inherit: "Phys",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Star,
        name_jp: "キウン",
        name: "Kaiwan",
        level: 24,
        elements: {
            physical: "Wk",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Nul"
        },
        skills: "Tetrakarn, Cell Breaker, Mamudo, Stagnant Air(26), Resist Light(27), Life Drain(28), Spirit Drain(29)",
        inherit: "Support",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Aeon,
        name: "Narcissus",
        level: 24,
        elements: {
            physical: "Wk",
            fire: "-",
            ice: "Str",
            electric: "Str",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Magician,
        name_jp: "カハク",
        name: "Hua Po",
        level: 25,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agilao, Rakukaja, Re Patra, Fire Break(26), Makajam(27), Dodge Ice(29), Fire Boost(30)",
        inherit: "Fire",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Lovers,
        name_jp: "クイーンメイブ",
        name: "Queen Mab",
        level: 25,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Zionga, Tentarafoo, Dekunda, Recarm(26), Dodge Wind(27), Mazionga(29), Resist Confuse(30)",
        inherit: "Elec",
        notes: "-"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "アレス",
        name: "Ares",
        level: 25,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Wk",
            light: "Nul",
            dark: "-"
        },
        skills: "Gale Slash, Counter, Dodge Wind(27), Rampage(28), Dekaja(29), Power Charge(30)",
        inherit: "Phys",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Empress,
        name_jp: "ティターニア",
        name: "Titania",
        level: 26,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Diarama, Magaru, Red Wall(27), Garula(29), Regenerate 2(31), Mind Charge(32)",
        inherit: "Ice",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "ラミア",
        name: "Lamia",
        level: 26,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "-",
            electric: "Str",
            wind: "-",
            light: "-",
            dark: "Nul"
        },
        skills: "Poison Mist, Agilao, Nervundi, Poison Boost(28), Null Poison(29), Soul Break(30), Maragion(32)",
        inherit: "Bad Stat",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Justice,
        name_jp: "パワー",
        name: "Power",
        level: 27,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "-",
            electric: "Wk",
            wind: "Nul",
            light: "-",
            dark: "Wk"
        },
        skills: "Hama, Tentarafoo, Mahama, Zionga(29), Power Slash(30), Hama Boost(31), Survive Dark(32), Null Confuse(33)",
        inherit: "Light",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "マカミ",
        name: "Makami",
        level: 27,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Wk",
            electric: "-",
            wind: "Str",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Agilao, Sukunda, Auto-Sukukaja(29), Diarama(30), Resist Silence(31), Dodge Physical(32), Resist Ice(33)",
        inherit: "Fire",
        notes: "Marukyu Striptease"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "ノズチ",
        name: "Nozuchi",
        level: 27,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Wk",
            electric: "Rf",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Poison Mist, Enervation, Ailment Boost, Zionga(29), Rakukaja(30), Null Poison(31), Null Enervate(32)",
        inherit: "Bad Stat",
        notes: "Marukyu Striptease, Void Quest"
    },
    {
        arcana: Arcana.Jester,
        name: "Take-Minakata",
        level: 27,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "Str",
            wind: "-",
            light: "Wk",
            dark: "Wk"
        },
        skills: "",
        inherit: "",
        notes: ""
    },    
    {
        arcana: Arcana.Strength,
        name_jp: "クシミタマ",
        name: "Kusi Mitama",
        level: 28,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Garula, Zionga, Soul Break, Survive Light(31), Survive Dark(32), Traesto(33), Exhaust Boost(34)",
        inherit: "Wind",
        notes: "Marukyu Striptease, Void Quest"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "インキュバス",
        name: "Incubus",
        level: 28,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Agilao, Evil Smile, Mind Slice, Stagnant Air(30), Spirit Drain(32), Ghastly Wail(33)",
        inherit: "Bad Stat",
        notes: "Marukyu Striptease, Void Quest"
    },
    {
        arcana: Arcana.Priestess,
        name_jp: "ガンガー",
        name: "Ganga",
        level: 29,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Wk"
        },
        skills: "Bufula, Diarama, Dekaja, Mind Slice(31), Confuse Boost(32), Mediarama(33), Evade Fire(35)",
        inherit: "Ice",
        notes: "Marukyu Striptease, Void Quest"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "ユニコーン",
        name: "Unicorn",
        level: 29,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "Wk"
        },
        skills: "Zionga, Mahama, Nervundi, Dekunda(31), Trafuri(32), Recarm(33), Mazionga(34)",
        inherit: "Elec",
        notes: "Marukyu Striptease, Void Quest"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "オニ",
        name: "Oni",
        level: 30,
        elements: {
            physical: "Str",
            fire: "Nul",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Fatal End, Counter, Cruel Attack, Atom Smasher(32), Resist Physical(33), Endure(34), Power Charge(35)",
        inherit: "Phys",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Fool,
        name_jp: "オセ",
        name: "Ose",
        level: 31,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Nul",
            light: "Wk",
            dark: "-"
        },
        skills: "Power Slash, Atom Smasher, Power Charge, Poison Mist(33), Poison Boost(34), Auto-Sukukaja(35), Survive Light(36)",
        inherit: "Phys",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "ミトラ",
        name: "Mithra",
        level: 31,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "Wk",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "Mahama, Seal Bomb, Tetra Break(33), Hamaon(34), Dodge Elec(35), Hama Boost(36), Null Silence(37)",
        inherit: "Light",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "ドゥン",
        name: "Gdon",
        level: 31,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agilao, Maragi, Fire Break, Growth 2(33), Maragion(34), Fire Boost(35), Evade Ice(36)",
        inherit: "Fire",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Aeon,
        name: "Sati",
        level: 31,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Magician,
        name_jp: "ジャックランタン",
        name: "Pyro Jack",
        level: 32,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agilao, Tarunda, Marakukaja(34), Maragion(36), Auto-Rakukaja(37), Resist Ice(38)",
        inherit: "Fire",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Star,
        name_jp: "ネコショウグン",
        name: "Neko Shogun",
        fusionRecipeNames: ["Saki Mitama", "Ara Mitama", "Kusi Mitama", "Nigi Mitama"],
        level: 32,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "Rf",
            wind: "Wk",
            light: "Nul",
            dark: "Nul"
        },
        skills: "Zionga, Elec Boost, Black Spot, Mediarama(34), Matarukaja(35), Evade Wind(36), Divine Grace(37)",
        inherit: "Support",
        notes: "Cross Spread"
    },
    {
        arcana: Arcana.Lovers,
        name_jp: "ウンディーネ",
        name: "Undine",
        level: 33,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Diarama, Bufula, Posumudi, Mabufula(34), Mediarama(36), Ice Boost(37)",
        inherit: "Recovery",
        notes: "-"
    },
    {
        arcana: Arcana.Justice,
        name_jp: "ヴァーチャー",
        name: "Virtue",
        level: 33,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Wk",
            electric: "Nul",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Mahama, Garula, Posumudi, Fatal End(35), Blue Wall(37), Hama Boost(38), Resist Dark(39)",
        inherit: "Light",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "モスマン",
        name: "Mothman",
        level: 33,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "Wk",
            electric: "Rf",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Zionga, Valiant Dance, Foul Breath(35), Elec Break(36), Mazionga(37), Rage Boost(38)",
        inherit: "Elec",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Empress,
        name_jp: "ゴルゴン",
        name: "Gorgon",
        level: 34,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "-"
        },
        skills: "Bufula, Me Patra, Crazy Chain(35), Null Confuse(36), Mabufula(38), Ice Boost(39)",
        inherit: "Ice",
        notes: "Void Quest, Secret Laboratory"
    },
    {
        arcana: Arcana.Emperor,
        name_jp: "セタンタ",
        name: "Setanta",
        level: 34,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "Nul",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Fatal End, Zionga, Sharp Student, Counterstrike(36), Power Charge(38), Auto-Maraku(39), Null Fire(40)",
        inherit: "Elec",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "ヤマタノオロチ",
        name: "Yamata-no-Orochi",
        level: 34,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Mabufula, Garula, Red Wall, Green Wall(36), Resist Enervate(38), Ice Boost(39)",
        inherit: "Ice",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Jester,
        name: "Pale Rider",
        level: 34,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "Wk",
            dark: "Nul"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Fortune,
        name_jp: "フォルトゥナ",
        name: "Fortuna",
        level: 35,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "-",
            electric: "Wk",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Garula, Rakukaja, Dodge Elec(37), Magarula(38), Auto-Sukukaja(39), Wind Boost(40)",
        inherit: "Wind",
        notes: "-"
    },
    {
        arcana: Arcana.Tower,
        name_jp: "トウテツ",
        name: "Tao Tie",
        level: 35,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Rf"
        },
        skills: "Megido, Mind Slice, Dekunda, Confuse Boost(37), Mind Charge(38), Null Enervate(40), Torrent Shot(41)",
        inherit: "Almighty",
        notes: "-"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "フラロウス",
        name: "Flauros",
        level: 36,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Wk",
            electric: "-",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Fatal End, Tarukaja, Agilao, Herculean Strike(38), Apt Pupil(39), Dodge Ice(40), Crazy Chain(41)",
        inherit: "Phys",
        notes: "Void Quest, Secret Laboratory"
    },
    {
        arcana: Arcana.Death,
        name_jp: "サマエル",
        name: "Samael",
        level: 36,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Str",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "Nul"
        },
        skills: "Mudoon, Matarunda, Poison Mist, Dekunda(38), Megido(39), Mudo Boost(40), Survive Light(41)",
        inherit: "Dark",
        notes: "Void Quest"
    },
    {
        arcana: Arcana.Priestess,
        name_jp: "パールヴァティ",
        name: "Parvati",
        level: 37,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Diarama, Nervundi, Mediarama(39), Marakukaja(40), Dodge Elec(41), Divine Grace(43)",
        inherit: "Recovery",
        notes: "Void Quest, Secret Laboratory"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "パズス",
        name: "Pazuzu",
        level: 37,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Rf",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "-"
        },
        skills: "Mudoon, Rakukaja, Bufula, Stagnant Air(39), Ailment Boost(40), Navas Nebula(41), Cool Breeze(42)",
        inherit: "Dark",
        notes: "Void Quest, Secret Laboratory"
    },
    {
        arcana: Arcana.Aeon,
        name: "Raja Naga",
        level: 37,
        elements: {
            physical: "Str",
            fire: "Wk",
            ice: "-",
            electric: "Nul",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "",
        inherit: "",
        notes: ""
    },    
    {
        arcana: Arcana.Fool,
        name_jp: "ジャアクフロスト",
        name: "Black Frost",
        fusionRecipeNames: ["Jack Frost","Pyro Jack","King Frost","Pixie","Ghoul"],
        level: 38,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "Dr",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Rf"
        },
        skills: "Maragion, Bufula, Ice Boost, Mind Charge(40), Masukunda(41), Fire Amp(42), Agidyne(43), Mudoon(44)",
        inherit: "Dark",
        notes: "Star Spread"
    },
    {
        arcana: Arcana.Justice,
        name_jp: "ドミニオン",
        name: "Dominion",
        level: 38,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "Rf",
            dark: "Wk"
        },
        skills: "Hamaon, Zionga, Hama Boost(40), Resist Exhaust(41), Mazionga(42), Survive Dark(43), Null Dark(44)",
        inherit: "Light",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Magician,
        name_jp: "ディース",
        name: "Dis",
        level: 39,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Maragion, Diarama, Dekunda, Dodge Ice(41), Masukunda(42), Agidyne(43), Mind Charge(44)",
        inherit: "Fire",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "オルトロス",
        name: "Orthrus",
        level: 39,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agilao, Black Spot, Marakukaja(41), Fire Boost(42), Maragion(44), Null Ice(45)",
        inherit: "Fire",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "ゲンブ",
        name: "Genbu",
        level: 40,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Mabufula, Marakukaja, Regenerate 2(42), Makara Break(43), Blue Wall(44), Resist Physical(45), Evade Elec(46)",
        inherit: "Ice",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "ヤタガラス",
        name: "Yatagarasu",
        level: 40,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Wk",
            electric: "-",
            wind: "Str",
            light: "Nul",
            dark: "-"
        },
        skills: "Masukukaja, Nervundi, Agilao, Null Fear(43), Growth 2(44), Diarahan(45), Cool Breeze(46)",
        inherit: "Support",
        notes: "Void Quest, Secret Laboratory"
    },
    {
        arcana: Arcana.Jester,
        name: "Loa",
        level: 40,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "Wk",
            dark: "Str"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Emperor,
        name_jp: "オオクニヌシ",
        name: "Oukuninushi",
        level: 41,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Rf",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Zionga, Blade of Fury, Counterstrike(43), Mazionga(44), Apt Pupil(45), Elec Boost(46), Null Wind(47)",
        inherit: "Elec",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "ヒトコトヌシ",
        name: "Hitokoto-Nushi",
        level: 41,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Foolish Whisper, Auto-Sukukaja, Poison Arrow, Zionga(43), Resist Fire(45), Elec Boost(46), Auto-Masuku(47)",
        inherit: "Bad Stat",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "アルラウネ",
        name: "Alraune",
        level: 41,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "Str",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "Nul"
        },
        skills: "Mediarama, Energy Shower, Old One, Makarakarn(43), Green Wall(44), Null Enervate(45), Enervate Boost(46)",
        inherit: "Recovery",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Lovers,
        name_jp: "リャナンシー",
        name: "Leanan Sidhe",
        level: 42,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Mediarama, Me Patra, Tentarafoo(43), Confuse Boost(44), Energy Shower(45), Samarecarm(46), Divine Grace(47)",
        inherit: "Recovery",
        notes: "-"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "ハヌマーン",
        name: "Hanuman",
        level: 42,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "Nul",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Mighty Swing, Rakunda, Recarm, Blade of Fury(44), Dodge Wind(46), Endure(47), Power Charge(48)",
        inherit: "Phys",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "トリグラフ",
        name: "Triglav",
        level: 43,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Heat Wave, Counterstrike, Marakukaja(45), Mustard Bomb(46), Null Dizzy(47), Blue Wall(48), Power Charge(49)",
        inherit: "Phys",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Star,
        name_jp: "フウキ",
        name: "Fuu-ki",
        level: 43,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Garula, Torrent Shot, Counterstrike, Evade Fire(45), Apt Pupil(46), Wind Boost(47), Null Exhaust(49)",
        inherit: "Wind",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Empress,
        name_jp: "ガブリエル",
        name: "Gabriel",
        level: 44,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Mabufula, Mediarama, Energy Shower(45), Survive Dark(47), Heat Wave(48), Divine Grace(50)",
        inherit: "Ice",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Fortune,
        name_jp: "クロト",
        name: "Clotho",
        level: 44,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Rf",
            light: "-",
            dark: "-"
        },
        skills: "Magarula, Mutudi, Navas Nebula(45), Makarakarn(47), Wind Boost(48), Garudyne(49), Null Enervate(50)",
        inherit: "Wind",
        notes: "-"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "サキュバス",
        name: "Succubus",
        level: 44,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Agilao, Mudoon, Maragion(46), Mudo Boost(47), Spirit Drain(48), Resist Light(49), Invigorate 3(50)",
        inherit: "Bad Stat",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Aeon,
        name: "Kushinada",
        level: 44,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Emperor,
        name_jp: "トート",
        name: "Thoth",
        level: 45,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "Rf",
            dark: "Wk"
        },
        skills: "Mazionga, Mahama, Megido, Mediarama(47), Growth 2(48), Null Silence(49), Ziodyne(51)",
        inherit: "Elec",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "ホクトセイクン",
        name: "Hokuto Seikun",
        level: 45,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "Rf",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Zionga, Elec Boost, Navas Nebula, Blade of Fury(47), Resist Exhaust(48), Counterstrike(50), Ziodyne(51)",
        inherit: "Elec",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Fool,
        name_jp: "デカラビア",
        name: "Decarabia",
        level: 46,
        elements: {
            physical: "Wk",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Str",
            light: "Nul",
            dark: "-"
        },
        skills: "Agidyne, Matarunda, Tetrakarn, Evade Physical(48), Megidola(50), Fire Amp(51), Resist Physical(52)",
        inherit: "Fire",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Death,
        name_jp: "モト",
        name: "Mot",
        level: 46,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "Rf"
        },
        skills: "Mudoon, Evil Smile, Tentarafoo, Survive Light(48), Ghastly Wail(49), Mudo Boost(50)",
        inherit: "Dark",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Tower,
        name_jp: "クー・フーリン",
        name: "Cu Chulainn",
        level: 46,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "Wk",
            electric: "-",
            wind: "Rf",
            light: "-",
            dark: "-"
        },
        skills: "Magarula, Deathbound, Matarukaja(47), Mind Charge(48), White Wall(49), Endure Dark(50), Garudyne(51), Wind Amp(53)",
        inherit: "Wind",
        notes: "-"
    },
    {
        arcana: Arcana.Magician,
        name_jp: "ランダ",
        name: "Rangda",
        level: 47,
        elements: {
            physical: "Rf",
            fire: "-",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Maragion, Tentarafoo, Agidyne(49), Dodge Ice(50), Mustard Bomb(51), Repel Physical(55)",
        inherit: "Fire",
        notes: "Secret Laboratory, Heaven"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "セイリュウ",
        name: "Seiryu",
        level: 47,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Mazionga, Matarunda, Ziodyne(49), Poison Mist(50), Elec Break(51), Elec Boost(52), Resist Exhaust(53)",
        inherit: "Ice",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "ナラシンハ",
        name: "Narasimha",
        level: 47,
        elements: {
            physical: "Str",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "Hamaon, Tempest Slash, Counterstrike(48), Evade Wind(49), Mahamaon(51), Auto-Mataru(53)",
        inherit: "Light",
        notes: "Secret Laboratory"
    },
    {
        arcana: Arcana.Jester,
        name: "Baphomet",
        level: 47,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Nul"
        },
        skills: "",
        inherit: "",
        notes: ""
    },    
    {
        arcana: Arcana.Priestess,
        name_jp: "キクリヒメ",
        name: "Kikuri-hime",
        level: 48,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "-",
            electric: "Str",
            wind: "-",
            light: "-",
            dark: "Wk"
        },
        skills: "Mediarama, Posumudi, Agilao, Samarecarm(50), Diarahan(52), Resist Dark(53), Divine Grace(54)",
        inherit: "Recovery",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "クラマテング",
        name: "Kurama Tengu",
        level: 48,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "-",
            electric: "Wk",
            wind: "Dr",
            light: "-",
            dark: "-"
        },
        skills: "Garula, Masukunda, Vicious Strike, Growth 2(50), Wind Boost(51), Red Wall(52), Resist Elec(53)",
        inherit: "Wind",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "ギリメカラ",
        name: "Girimehkala",
        level: 48,
        elements: {
            physical: "Rf",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Wk"
        },
        skills: "Power Charge, Mighty Swing, Poison Mist, Mamudoon(50), Blight(51), Tetraja(52), Endure Light(53), Repel Physical(56)",
        inherit: "Support",
        notes: "Secret Laboratory, Heaven"
    },
    {
        arcana: Arcana.Justice,
        name_jp: "ソロネ",
        name: "Throne",
        level: 49,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Hamaon, Agidyne, Hama Boost, Mind Charge(51), Regenerate 2(53), Resist Dark(54), Endure Dark(55)",
        inherit: "Light",
        notes: "Heaven"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "ヤツフサ",
        name: "Yatsufusa",
        fusionRecipeNames: ["Makami", "Orthrus", "Mothman", "Thoth", "Narasimha"],
        level: 49,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "-",
            electric: "-",
            wind: "Rf",
            light: "Nul",
            dark: "-"
        },
        skills: "Agidyne, Masukukaja, Fire Boost, Heat Wave(51), Power Charge(52), Dodge Physical(53), Maragidyne(54), Mind Charge(55)",
        inherit: "Fire",
        notes: "Star Spread"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "カーリー",
        name: "Kali",
        level: 50,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "Nul"
        },
        skills: "Bufudyne, Mudoon, Deathbound(52), Revolution(53), High Counter(54), Power Charge(55)",
        inherit: "Ice",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Star,
        name_jp: "ガネーシャ",
        name: "Ganesha",
        level: 50,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Garudyne, Mustard Bomb, Makarakarn, Power Charge(52), High Counter(54), Endure(55), Magarudyne(56)",
        inherit: "Wind",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Emperor,
        name_jp: "パピルサグ",
        name: "Pabilsag",
        level: 51,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Rf"
        },
        skills: "Blight, Foolish Whisper, Stagnant Air(53), Silence Boost(54), Mudoon(55), Arrow Rain(56)",
        inherit: "Phys",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Fortune,
        name_jp: "ラケシス",
        name: "Lachesis",
        level: 51,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Str",
            electric: "Wk",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Garudyne, Masukukaja, Recarm(53), Makara Break(54), Absorb Wind(55), Red Wall(56), Resist Exhaust(57)",
        inherit: "Wind",
        notes: "-"
    },
    {
        arcana: Arcana.Aeon,
        name: "Quetzalcoatl",
        level: 51,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "Nul",
            dark: "Wk"
        },
        skills: "",
        inherit: "",
        notes: ""
    },    
    {
        arcana: Arcana.Empress,
        name_jp: "スカディ",
        name: "Skadi",
        level: 52,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "-",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Mabufula, Aeon Rain, Bufudyne(54), Ice Amp(56), Repel Ice(57), Repel Fire(59), Spell Master(60)",
        inherit: "Ice",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "ケルベロス",
        name: "Cerberus",
        level: 52,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agidyne, Gigantic Fist, Vicious Strike(53), Maragidyne(54), Regenerate 2(55), Fire Amp(57), Auto-Sukukaja(58)",
        inherit: "Fire",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Lovers,
        name_jp: "ラファエル",
        name: "Raphael",
        level: 53,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Rf",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Diarahan, Megidola, Masukukaja(55), Amrita(56), Null Dizzy(57), Mediarahan(59)",
        inherit: "Recovery",
        notes: "-"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "リリス",
        name: "Lilith",
        level: 53,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Rf",
            wind: "-",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Ziodyne, Makarakarn, Old One(54), Maziodyne(55), Elec Break(56), Ailment Boost(57)",
        inherit: "Elec",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "タムリン",
        name: "Tam Lin",
        fusionRecipeNames: ["Phoenix", "Gdon", "Yatagarasu", "Narasimha"],
        level: 53,
        elements: {
            physical: "Str",
            fire: "Str",
            ice: "-",
            electric: "Nul",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "Ziodyne, Deathbound, High Counter, Auto-Maraku(54), Power Charge(55), Elec Amp(56), Evade Physical(58), Enduring Soul(59)",
        inherit: "Phys",
        notes: "Cross Spread"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "キンキ",
        name: "Kin-ki",
        level: 54,
        elements: {
            physical: "Nul",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Vile Assault, High Counter, Gigantic Fist(56), Seal Bomb(57), Revolution(59), Power Charge(60)",
        inherit: "Phys",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "スザク",
        name: "Suzaku",
        level: 54,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Maragion, Energy Shower, Masukukaja(55), Agidyne(56), Resist Ice(58), Fire Amp(59), Auto-Masuku(60)",
        inherit: "Fire",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "ニーズホッグ",
        name: "Nidhoggr",
        level: 55,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Mamudoon, Evil Smile, Ghastly Wail(57), Bufudyne(58), Stagnant Air(59), Resist Physical(60), Ice Boost(61)",
        inherit: "Dark",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Tower,
        name_jp: "アバドン",
        name: "Abaddon",
        level: 55,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Str",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Rf"
        },
        skills: "Old One, Mudoon, Arrow Rain, Agidyne(56), Endure Light(57), Tetra Break(60), Null Physical(62)",
        inherit: "Bad Stat",
        notes: "-"
    },
    {
        arcana: Arcana.Jester,
        name: "Kumbhanda",
        level: 55,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "-",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Fool,
        name_jp: "シキオウジ",
        name: "Shiki-Ouji",
        level: 56,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Nul",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Navas Nebula, Matarunda, Revolution, Apt Pupil(58), Growth 2(59), Null Physical(62)",
        inherit: "Fire",
        notes: "Heaven"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "トウコツ",
        name: "Taowu",
        level: 56,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "Nul",
            wind: "-",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Aeon Rain, Dekaja, Matarukaja, Null Enervate(58), Power Charge(60), Evade Physical(61), Absorb Fire(62)",
        inherit: "Recovery",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Star,
        name_jp: "ガルーダ",
        name: "Garuda",
        level: 57,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Rf",
            light: "Rf",
            dark: "-"
        },
        skills: "Diarama, Garudyne, Arrow Rain, Amrita(60), High Counter(61), Repel Wind(62), Auto-Sukukaja(63)",
        inherit: "Recovery",
        notes: "Heaven, Magatsu Inaba"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "スイキ",
        name: "Sui-ki",
        level: 57,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "Rf",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Bufudyne, Power Charge, Vicious Strike, Regenerate 2(59), Tetra Break(60), Enduring Soul(62)",
        inherit: "Ice",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Justice,
        name_jp: "ウリエル",
        name: "Uriel",
        level: 58,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Maragion, Hamaon, High Counter(60), Agidyne(61), Endure Dark(62), Fire Amp(63), Null Dark(64)",
        inherit: "Fire",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Fortune,
        name_jp: "アナンタ",
        name: "Ananta",
        level: 58,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "Dr",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Mabufula, White Wall, Marakukaja(59), Bufudyne(61), Green Wall(62), Invigorate 3(63), Null Exhaust(64)",
        inherit: "Phys",
        notes: "-"
    },
    {
        arcana: Arcana.Death,
        name_jp: "ホワイトライダー",
        name: "White Rider",
        level: 58,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Rf"
        },
        skills: "Mudoon, Hamaon, Agidyne(60), Evade Ice(62), Mahamaon(63), Mamudoon(65), Hama Boost(66), Mudo Boost(67)",
        inherit: "Dark",
        notes: "Heaven"
    },
    {
        arcana: Arcana.Aeon,
        name: "Kingu",
        level: 58,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "",
        inherit: "",
        notes: ""
    },     
    {
        arcana: Arcana.Priestess,
        name_jp: "ハリティー",
        name: "Hariti",
        level: 59,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "Wk",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Diarahan, Bufudyne, Marakukaja, Mediarahan(61), Arrow Rain(62), Samarecarm(64)",
        inherit: "Recovery",
        notes: "Magatsu Inaba"
    },
    {
        arcana: Arcana.Judgement,
        name_jp: "アヌビス",
        name: "Anubis",
        level: 59,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "Hamaon, Makarakarn, Mudoon, Poison Arrow(60), Mustard Bomb(61), Megidola(62), Mahamaon(64), Hama Boost(65)",
        inherit: "Light",
        notes: "-"
    },
    {
        arcana: Arcana.Empress,
        name_jp: "マザーハーロット",
        name: "Mother Harlot",
        level: 60,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Str",
            electric: "Rf",
            wind: "Wk",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Maziodyne, Mamudoon, Mudo Boost(62), Foolish Whisper(63), Resist Fire(64), Ailment Boost(65)",
        inherit: "Elec",
        notes: "Heaven, Magatsu Mandala"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "だいそうじょう",
        name: "Daisoujou",
        level: 60,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Hamaon, Diarahan, Makarakarn, Agidyne(62), Endure Dark(63), Mahamaon(64), Hama Boost(65), Samsara(67)",
        inherit: "Light",
        notes: "Magatsu Mandala"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "ベルフェゴール",
        name: "Belphegor",
        level: 61,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Dr",
            wind: "-",
            light: "Wk",
            dark: "Rf"
        },
        skills: "Maziodyne, Evil Smile, Marakunda(63), Fear Boost(64), Old One(65), Enervate Boost(66), Elec Amp(67)",
        inherit: "Elec",
        notes: "Magatsu Inaba"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "ジャターユ",
        name: "Jatayu",
        level: 61,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Dr",
            light: "-",
            dark: "-"
        },
        skills: "Garudyne, Null Confuse, Amrita(62), Growth 3(64), Repel Elec(65), Magarudyne(66)",
        inherit: "Wind",
        notes: "Magatsu Inaba"
    },
    {
        arcana: Arcana.Magician,
        name_jp: "ジン",
        name: "Jinn",
        level: 62,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "-",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agidyne, Foolish Whisper, Resist Physical(65), Fire Boost(66), Null Physical(67), Valiant Dance(68)",
        inherit: "Fire",
        notes: "Magatsu Mandala"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "ビャッコ",
        name: "Byakko",
        level: 62,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "Nul",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "Bufudyne, Deathbound, High Counter, Auto-Sukukaja(64), Amrita(66), Ice Amp(67), Mabufudyne(68)",
        inherit: "Ice",
        notes: "Magatsu Inaba, Magatsu Mandala"
    },
    {
        arcana: Arcana.Tower,
        name_jp: "マーラ",
        name: "Mara",
        level: 62,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "Wk",
            dark: "Rf"
        },
        skills: "Agidyne, Blight, Power Charge(63), Makarakarn(64), Absorb Physical(66), Fire Amp(67)",
        inherit: "Fire",
        notes: "-"
    },
    {
        arcana: Arcana.Jester,
        name: "Chernobog",
        level: 62,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "Nul"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "ネビロス",
        name: "Nebiros",
        level: 63,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "-",
            electric: "Wk",
            wind: "Str",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Mamudoon, Agidyne, Dekaja, Mind Charge(65), Mudo Boost(67), Null Light(69), Spell Master(70)",
        inherit: "Bad Stat",
        notes: "Magatsu Mandala"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "ジークフリード",
        name: "Siegfried",
        level: 63,
        elements: {
            physical: "Nul",
            fire: "-",
            ice: "Str",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Akasha Arts, Power Charge, Masukukaja, High Counter(65), Regenerate 3(66), Rainy Death(68), God's Hand(70)",
        inherit: "Phys",
        notes: "Magatsu Mandala"
    },
    {
        arcana: Arcana.Fool,
        name_jp: "ロキ",
        name: "Loki",
        level: 64,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Nul"
        },
        skills: "Bufudyne, Rakukaja, Sharp Student, Ice Amp(66), High Counter(67), Mabufudyne(68), Null Fire(69), Niflheim(70)",
        inherit: "Ice",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Lovers,
        name_jp: "キュベレ",
        name: "Cybele",
        level: 64,
        elements: {
            physical: "-",
            fire: "Str",
            ice: "Nul",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Mediarama, Vicious Strike, Recarm, Myriad Arrows(67), Samarecarm(68), Mediarahan(70)",
        inherit: "Recovery",
        notes: "-"
    },
    {
        arcana: Arcana.Emperor,
        name_jp: "バロン",
        name: "Barong",
        level: 65,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Ziodyne, Poison Mist, Me Patra, Marakukaja(67), Invigorate 2(69), High Counter(71), Maziodyne(72)",
        inherit: "Phys",
        notes: "Magatsu Mandala"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "トール",
        name: "Thor",
        level: 65,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "Dr",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Ziodyne, Deathbound, High Counter, Arms Master(67), Maziodyne(68), Null Physical(69), Thunder Reign(70)",
        inherit: "Elec",
        notes: "Magatsu Mandala"
    },
    {
        arcana: Arcana.Fortune,
        name_jp: "アトロポス",
        name: "Atropos",
        level: 65,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Garudyne, Wind Boost, Mind Charge(67), Magarudyne(68), Evade Fire(69), Wind Amp(70)",
        inherit: "Wind",
        notes: "-"
    },
    {
        arcana: Arcana.Aeon,
        name: "Laksmi",
        level: 65,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "",
        inherit: "",
        notes: ""
    },     
    {
        arcana: Arcana.Justice,
        name_jp: "メルキセデク",
        name: "Melchizedek",
        level: 66,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Wk"
        },
        skills: "Mediarahan, Hamaon, Akasha Arts, Matarukaja(68), Mahamaon(69), God's Hand(72)",
        inherit: "Recovery",
        notes: "Magatsu Mandala"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "ヘルズエンジェル",
        name: "Hell Biker",
        level: 66,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "-"
        },
        skills: "Agidyne, Aeon Rain, Endure(68), Mudoon(69), Maragidyne(70), Absorb Fire(71), Fire Amp(73)",
        inherit: "Fire",
        notes: "Magatsu Mandala, Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Star,
        name_jp: "カルティケーヤ",
        name: "Kartikeya",
        level: 67,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Rf",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Maziodyne, Auto-Mataru, High Counter(68), Myriad Arrows(69), Growth 2(70), Primal Force(75)",
        inherit: "Elec",
        notes: "Magatsu Mandala, Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Judgement,
        name_jp: "トランペッター",
        name: "Trumpeter",
        fusionRecipeNames: ["Matador", "White Rider", "Daisoujou", "Tao Tie", "Pabilsag", "Taowu"],
        level: 67,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Dr",
            electric: "Rf",
            wind: "-",
            light: "Rf",
            dark: "Nul"
        },
        skills: "Megidola, Ziodyne, Elec Amp, Masukukaja(68), Cool Breeze(69), Megidolaon(70), Debilitate(73), Heat Riser(74)",
        inherit: "Almighty",
        notes: "Hiranya Spread"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "ベリアル",
        name: "Belial",
        level: 68,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Rf"
        },
        skills: "Mudoon, Myriad Arrows, Agidyne(69), Endure Light(71), Fire Amp(72), Maragidyne(73)",
        inherit: "Dark",
        notes: "Magatsu Mandala, Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "セト",
        name: "Seth",
        level: 68,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Rf",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Magarudyne, Garudyne, Wind Break(71), Null Light(72), Wind Amp(73), Evade Elec(74)",
        inherit: "Wind",
        notes: "Magatsu Mandala"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "ホルス",
        name: "Horus",
        level: 68,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "Nul",
            wind: "-",
            light: "Rf",
            dark: "-"
        },
        skills: "Diarahan, Mahamaon, Magarudyne, Wind Amp(70), Matarukaja(71), Absorb Wind(73)",
        inherit: "Recovery",
        notes: "Magatsu Mandala, Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Jester,
        name: "Seiten Taisei",
        level: 68,
        elements: {
            physical: "Str",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Magician,
        name_jp: "スルト",
        name: "Surt",
        level: 69,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "Wk",
            electric: "-",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Agidyne, Deathbound, High Counter, Maragidyne(71), Ragnarok(74), Fire Amp(75), Null Ice(76)",
        inherit: "Fire",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "ユルング",
        name: "Yurlungur",
        level: 69,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "-",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Virus Wave, Bufudyne, Growth 3(71), Mediarahan(72), Samarecarm(74), Repel Light(75)",
        inherit: "Bad Stat",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Tower,
        name_jp: "マサカド",
        name: "Masakado",
        level: 69,
        elements: {
            physical: "Nul",
            fire: "Nul",
            ice: "-",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "Wk"
        },
        skills: "Mahamaon, Tempest Slash, Myriad Arrows(71), Hama Boost(73), Arms Master(74), Enduring Soul(76)",
        inherit: "Light",
        notes: "-"
    },
    {
        arcana: Arcana.Priestess,
        name_jp: "ツィツィミトル",
        name: "Tzitzimitl",
        level: 70,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Rf",
            wind: "Wk",
            light: "-",
            dark: "Nul"
        },
        skills: "Ziodyne, Virus Wave, Mustard Bomb, Silence Boost(71), Dekaja(72), Regenerate 3(73), Maziodyne(76), Repel Elec(77)",
        inherit: "Elec",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Empress,
        name_jp: "アリラト",
        name: "Alilat",
        level: 70,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Makarakarn, Mabufudyne, Regenerate 3(72), Evade Physical(73), Growth 2(74), Auto-Maraku(75)",
        inherit: "Support",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "ハチマン",
        name: "Hachiman",
        level: 70,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Nul",
            electric: "Nul",
            wind: "-",
            light: "-",
            dark: "Wk"
        },
        skills: "Maziodyne, Makarakarn, Matarukaja, Elec Break(72), Dekunda(74), Revolution(75)",
        inherit: "Elec",
        notes: "Magatsu Mandala, Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Lovers,
        name_jp: "イシュタル",
        name: "Ishtar",
        level: 71,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Wk",
            light: "-",
            dark: "-"
        },
        skills: "Mediarahan, Samarecarm, Mutudi, Maziodyne(72), Amrita(75), Spell Master(76), Absorb Wind(77), Salvation(78)",
        inherit: "Recovery",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "ヴァスキ",
        name: "Vasuki",
        level: 71,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Str",
            electric: "Nul",
            wind: "-",
            light: "-",
            dark: "Wk"
        },
        skills: "Hamaon, Virus Wave, Null Poison(73), High Counter(74), Evade Wind(75), Mahamaon(76), Ziodyne(77)",
        inherit: "Light",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "アタバク",
        name: "Atavaka",
        level: 72,
        elements: {
            physical: "Nul",
            fire: "-",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "Mahamaon, Diarahan, Amrita, Brave Blade(76), Megidolaon(77), Mind Charge(78), Arms Master(81)",
        inherit: "Light",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Fortune,
        name_jp: "ノルン",
        name: "Norn",
        fusionRecipeNames: ["Atropos", "Lachesis", "Clotho"],
        level: 72,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Str",
            electric: "Wk",
            wind: "Dr",
            light: "-",
            dark: "-"
        },
        skills: "Magarudyne, Garudyne, Diarahan, Auto-Masuku(74), Invigorate 3(75), Wind Amp(76), Insta-Heal(77), Debilitate(79)",
        inherit: "Wind",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Death,
        name_jp: "アリス",
        name: "Alice",
        fusionRecipeNames: ["Nebiros","Belial"],
        level: 72,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Rf"
        },
        skills: "Mamudoon, Mudo Boost, Dekunda, Endure Light(75), Megidola(76), Mind Charge(77), Die for Me!(79)",
        inherit: "Dark",
        notes: "Special Fusion"
    },
    {
        arcana: Arcana.Judgement,
        name_jp: "ミカエル",
        name: "Michael",
        level: 72,
        elements: {
            physical: "Str",
            fire: "Nul",
            ice: "-",
            electric: "-",
            wind: "Wk",
            light: "Nul",
            dark: "-"
        },
        skills: "Vorpal Blade, Megidola, Hamaon, Megidolaon(74), Mahamaon(75), Repel Dark(76), Heaven's Blade(79)",
        inherit: "Phys",
        notes: "-"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "アラハバキ",
        name: "Arahabaki",
        level: 73,
        elements: {
            physical: "Rf",
            fire: "Wk",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Nul"
        },
        skills: "Vicious Strike, Auto-Maraku, Null Fear, Alertness(74), Tetrakarn(76), Repel Physical(80)",
        inherit: "Phys",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Temperance,
        name_jp: "ヴィシュヌ",
        name: "Vishnu",
        level: 73,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Nul",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "Megidolaon, Akasha Arts, Mabufudyne, Regenerate 3(75), God's Hand(76), Power Charge(78), Angelic Grace(79)",
        inherit: "Almighty",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Emperor,
        name_jp: "オーディン",
        name: "Odin",
        level: 74,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "Nul",
            wind: "Dr",
            light: "-",
            dark: "-"
        },
        skills: "Ziodyne, Magarudyne, Wind Amp(76), Regenerate 3(77), Maziodyne(78), Mind Charge(80), Panta Rhei(81)",
        inherit: "Elec",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Justice,
        name_jp: "スラオシャ",
        name: "Sraosha",
        level: 74,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Dr",
            wind: "-",
            light: "Rf",
            dark: "Wk"
        },
        skills: "Mahamaon, Brave Blade, Power Charge, Ziodyne(76), Hama Boost(78), Megidolaon(80), Angelic Grace(81)",
        inherit: "Light",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Aeon,
        name: "Kaguya",
        level: 74,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "-",
            electric: "-",
            wind: "Str",
            light: "Nul",
            dark: "Nul"
        },
        skills: "",
        inherit: "",
        notes: ""
    },    
    {
        arcana: Arcana.Tower,
        name_jp: "ヨシツネ",
        name: "Yoshitsune",
        fusionRecipeNames: ["Masakado", "Shiki-Ouji", "Oukuninushi", "Hachiman", "Hitokoto-Nushi"],
        level: 75,
        elements: {
            physical: "Nul",
            fire: "Str",
            ice: "-",
            electric: "Rf",
            wind: "-",
            light: "Rf",
            dark: "-"
        },
        skills: "Brave Blade, Power Charge, Ziodyne, Heat Riser(77), Repel Elec(78), Elec Amp(79), Hassou Tobi(83)",
        inherit: "Phys",
        notes: "Star Spread"
    },
    {
        arcana: Arcana.Star,
        name_jp: "サトゥルヌス",
        name: "Saturnus",
        level: 75,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "Wk",
            electric: "-",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Agidyne, Maragidyne, Fire Amp, Evade Ice(77), Growth 3(79), Spell Master(81)",
        inherit: "Fire",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Hierophant,
        name_jp: "コウリュウ",
        name: "Kohryu",
        fusionRecipeNames: ["Genbu","Seiryu","Suzaku","Byakko"],
        level: 76,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Rf",
            wind: "-",
            light: "Nul",
            dark: "-"
        },
        skills: "Ziodyne, Mediarahan, Samarecarm, Maziodyne(78), Mind Charge(79), Elec Amp(80), Spell Master(82), Salvation(83)",
        inherit: "Elec",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Judgement,
        name_jp: "サタン",
        name: "Satan",
        level: 76,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "-",
            electric: "-",
            wind: "Wk",
            light: "-",
            dark: "Rf"
        },
        skills: "Megidolaon, Maragion, Regenerate 3(77), Invigorate 3(78), Endure Light(80), Black Viper(81), Null Wind(82)",
        inherit: "Almighty",
        notes: "-"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "バアル・ゼブル",
        name: "Baal Zebul",
        level: 77,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Nul"
        },
        skills: "Mabufudyne, Mamudoon, Old One, Tentarafoo(78), Maziodyne(79), Mudo Boost(80), Stagnant Air(82)",
        inherit: "Ice",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "スパルナ",
        name: "Suparna",
        level: 77,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Wk",
            wind: "Dr",
            light: "-",
            dark: "-"
        },
        skills: "Garudyne, Makajam, Evade Ice(79), Wind Amp(80), Magarudyne(81), Evade Fire(82), Elec Amp(83)",
        inherit: "Wind",
        notes: "Yomotsu Hirasaka"
    },
    {
        arcana: Arcana.Jester,
        name: "Magatsu-Izanagi",
        level: 77,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Nul",
            dark: "Nul"
        },
        skills: "",
        inherit: "",
        notes: ""
    },
    {
        arcana: Arcana.Magician,
        name_jp: "マダ",
        name: "Mada",
        level: 78,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "Wk",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Agidyne, Fire Boost, Foolish Whisper, Maragidyne(81), Evade Ice(82), Ailment Boost(83), Fire Amp(84)",
        inherit: "Fire",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Death,
        name_jp: "マハカーラ",
        name: "Mahakala",
        fusionRecipeNames: ["Matador","White Rider","Mother Harlot","Daisoujou","Hell Biker","Trumpeter"],
        level: 78,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "-",
            electric: "Rf",
            wind: "-",
            light: "-",
            dark: "Nul"
        },
        skills: "Agidyne, Myriad Arrows, Power Charge, Mind Charge(80), Maragidyne(82), Mamudoon(83), Fire Amp(84), Mudo Boost(85)",
        inherit: "Phys",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Priestess,
        name_jp: "スカアハ",
        name: "Scathach",
        level: 79,
        elements: {
            physical: "-",
            fire: "Wk",
            ice: "Dr",
            electric: "-",
            wind: "Nul",
            light: "-",
            dark: "-"
        },
        skills: "Mabufudyne, Garudyne, Amrita(81), Magarudyne(82), Ice Amp(83), Wind Amp(84), Mind Charge(85)",
        inherit: "Ice",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Empress,
        name_jp: "イシス",
        name: "Isis",
        level: 79,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Rf",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Mediarahan, Bufudyne, Tetrakarn, Cool Breeze(80), Absorb Ice(82), Mabufudyne(83), Salvation(85), Null Elec(86)",
        inherit: "Recovery",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Chariot,
        name_jp: "フツヌシ",
        name: "Futsunushi",
        fusionRecipeNames: ["Ares","Triglav","Kin-ki","Atavaka","Neko Shogun"],
        level: 80,
        elements: {
            physical: "Nul",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "-",
            dark: "Wk"
        },
        skills: "Primal Force, Power Charge, Matarukaja, Apt Pupil(82), Null Dizzy(83), Ali Dance(84), Arms Master(85), Firm Stance(86)",
        inherit: "Phys",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Tower,
        name_jp: "シヴァ",
        name: "Shiva",
        fusionRecipeNames: ["Rangda","Barong"],
        level: 80,
        elements: {
            physical: "-",
            fire: "-",
            ice: "Dr",
            electric: "Rf",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Ziodyne, Magarudyne, Enduring Soul, Maziodyne(82), Spell Master(83), Megidolaon(84), Pralaya(87)",
        inherit: "Elec",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Devil,
        name_jp: "ベルゼブブ",
        name: "Beelzebub",
        fusionRecipeNames: ["Belial", "Belphegor", "Baal Zebul", "Seth", "Mot", "Pazuzu"],
        level: 81,
        elements: {
            physical: "-",
            fire: "Dr",
            ice: "Nul",
            electric: "Rf",
            wind: "-",
            light: "Wk",
            dark: "Rf"
        },
        skills: "Agidyne, Mabufudyne, Mind Charge, Primal Force(83), Mamudoon(84), Endure Light(85), Mudo Boost(86), Megidolaon(87)",
        inherit: "Fire",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Hermit,
        name_jp: "オンギョウキ",
        name: "Ongyo-ki",
        fusionRecipeNames: ["Oni", "Fuu-ki", "Kin-ki", "Sui-ki"],
        level: 82,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "Nul",
            wind: "Dr",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Foolish Whisper, Ziodyne, Masukukaja, Ailment Boost(84), Elec Amp(85), Revolution(86), Firm Stance(87)",
        inherit: "Phys",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.HangedMan,
        name_jp: "アティス",
        name: "Attis",
        level: 82,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "-",
            electric: "-",
            wind: "Rf",
            light: "-",
            dark: "Wk"
        },
        skills: "Agidyne, Amrita, Marakukaja, Enduring Soul(84), Samarecarm(86), Maragidyne(87), Mamudoon(88)",
        inherit: "Fire",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Judgement,
        name_jp: "メタトロン",
        name: "Metatron",
        level: 83,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Rf",
            dark: "Wk"
        },
        skills: "Mahamaon, Heaven's Blade, Megidolaon(86), Repel Ice(87), Repel Elec(88), Repel Fire(89)",
        inherit: "Light",
        notes: "-"
    },
    {
        arcana: Arcana.Moon,
        name_jp: "サンダルフォン",
        name: "Sandalphon",
        level: 84,
        elements: {
            physical: "-",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "Nul",
            light: "Rf",
            dark: "Wk"
        },
        skills: "Mahamaon, Samarecarm, Amrita, Angelic Grace(87), Agneyastra(88), Endure Dark(89), Repel Dark(90)",
        inherit: "Light",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Sun,
        name_jp: "アスラおう",
        name: "Asura",
        level: 86,
        elements: {
            physical: "-",
            fire: "Nul",
            ice: "Str",
            electric: "-",
            wind: "Wk",
            light: "Nul",
            dark: "-"
        },
        skills: "Maragidyne, Primal Force, Marakukaja, Mahamaon(88), High Counter(89), Spell Master(90), Unshaken Will(92)",
        inherit: "Fire",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Star,
        name_jp: "ルシフェル",
        name: "Helel",
        level: 87,
        elements: {
            physical: "Str",
            fire: "Nul",
            ice: "-",
            electric: "-",
            wind: "Wk",
            light: "Nul",
            dark: "Nul"
        },
        skills: "Megidolaon, Maragidyne, God's Hand, Salvation(88), Insta-Heal(90), Repel Wind(91), Arms Master(92), Morning Star(94)",
        inherit: "Almighty",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Strength,
        name_jp: "ザオウゴンゲン",
        name: "Zaou Gongen",
        level: 90,
        elements: {
            physical: "-",
            fire: "Rf",
            ice: "-",
            electric: "Wk",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Maragidyne, Power Charge, God's Hand, Anima Freeze(92), Evade Physical(93), Enduring Soul(94), Fire Amp(95), Vorpal Blade(96)",
        inherit: "Fire",
        notes: "Unlocked by maxing social link"
    },
    {
        arcana: Arcana.Judgement,
        name_jp: "アルダー",
        name: "Ardha",
        fusionRecipeNames: ["Parvati","Shiva"],
        level: 90,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "Nul",
            electric: "Nul",
            wind: "-",
            light: "-",
            dark: "-"
        },
        skills: "Primal Force, God's Hand, Megidolaon(91), Null Dizzy(92), Auto-Rakukaja(93), Mediarahan(94), Angelic Grace(95), Null Physical(96)",
        inherit: "Almighty",
        notes: "-"
    },
    {
        arcana: Arcana.World,
        name_jp: "伊邪那岐大神",
        name: "Izanagi-no-Okami",
        fusionRecipeNames: ["Izanagi", "Sandman", "Nata Taishi", "Girimehkala", "Norn", "Oukuninushi", "Orthrus", "Kartikeya", "Mithra", "Tzitzimitl", "Cu Chulainn", "Legion"],
        level: 91,
        elements: {
            physical: "Str",
            fire: "Str",
            ice: "Str",
            electric: "Str",
            wind: "Str",
            light: "-",
            dark: "-"
        },
        skills: "Megidolaon, Victory Cry, Angelic Grace, Mind Charge, Agidyne(92), Bufudyne(93), Ziodyne(94), Garudyne(95), Fire Amp(96), Ice Amp(97), Elec Amp(98), Wind Amp(99)",
        inherit: "Null",
        notes: "Only in New Game+ with data from True Ending"
    },
    {
        arcana: Arcana.Judgement,
        name_jp: "ルシファー",
        name: "Lucifer",
        fusionRecipeNames: ["Ananta","Anubis","Trumpeter","Michael","Satan","Metatron"],
        level: 93,
        elements: {
            physical: "Str",
            fire: "-",
            ice: "-",
            electric: "-",
            wind: "-",
            light: "Wk",
            dark: "Nul"
        },
        skills: "Bufudyne, Brave Blade, Mind Charge, Ice Amp(94), Spell Master(95), Repel Light(96), Absorb Elec(98), Victory Cry(99)",
        inherit: "Ice",
        notes: "Unlocked by maxing social link"
    }];

function comparePersona(a, b) 
{
    var lvlDiff = a.level - b.level;
    if( lvlDiff != 0 ) {
        return lvlDiff;
    }
    return a.arcana - b.arcana;
}

var personaByArcana = [];
var personaByName = {};
for (var i = 0; i < Arcana.Count; i++) {
    personaByArcana.push([]);
};

for (var i = 0; i < personaByLvl.length; i++) {
    var persona = personaByLvl[i];
    personaByArcana[persona.arcana].push(persona);
    personaByName[persona.name] = persona;
};

function findPersonaByLevel( arcana, level ) {
    var resultPersona = null;
    if( arcana !== null && arcana !== undefined ) 
    {
        var arcanaPersona = personaByArcana[arcana]; 
        for (var i = 0; !resultPersona && i < arcanaPersona.length; i++) {
            var persona = arcanaPersona[i];
            if( persona.level >= level ) {
                resultPersona = persona;
            }
        }
    }
    return resultPersona;
}

function NormalCalculation( first, second ) {
    var level = ((first.level + second.level) / 2 ) + 1;
    var arcana = Arcana.GetNormalResult( first.arcana, second.arcana );
    return findPersonaByLevel(arcana, level);
}

function getTriangleLevel(first,second,third) {
    return ((first.level + second.level + third.level) / 3 ) + 5;
}

function TriangleCalculation(first,second,third) {
    var args = Array.prototype.slice.call(arguments);
    args.sort(comparePersona);

    var level = getTriangleLevel(first,second,third);
    var arcana = Arcana.GetTriangleResult( args[0].arcana, args[1].arcana, args[2].arcana );
    return findPersonaByLevel(arcana, level);
}

function convertFromNameList( nameList ) {
    var result = [];
    for (var i = 0; i < nameList.length; i++) {
        result.push( personaByName[nameList[i]] );
    }
    return result;
}

function BackCalcNormal( persona, including ) {
    // damn special persona think they own the place!
    if( persona.fusionRecipeNames )
        return [convertFromNameList(persona.fusionRecipeNames)];

    var result = [];
    var arcana = persona.arcana;

    var normalArcanaMixes = Arcana.BackCalcNormal( arcana );
    if( normalArcanaMixes.length > 1 ) {
        for (var normalIdx = 0; normalIdx < normalArcanaMixes.length; normalIdx++) {
            var mix = normalArcanaMixes[normalIdx];
            var first = mix[0], second = mix[1];

            if( first != second )
            {
                var firstList = personaByArcana[first];
                var secondList = personaByArcana[second];
                for (var i = 0; i < firstList.length; i++) {
                    for (var j = 0; j < secondList.length; j++) {
                        var firstPersona = firstList[i], secondPersona = secondList[j];
                        if( !including || firstPersona == including || secondPersona == including ) {
                            if( NormalCalculation(firstPersona, secondPersona) == persona ) {
                                result.push([firstPersona, secondPersona]);
                            }
                        }
                    }
                }
            }
        }
    } 

    return result;
}

function BackCalcTriangle( persona, including ) {
    // damn special persona think they own the place!
    if( persona.fusionRecipeNames )
        return [convertFromNameList(persona.fusionRecipeNames)];

    var result = [];
    var triangles = Arcana.BackCalcTriangle( arcana );
    var arcana = persona.arcana;
    console.log( "Trying to brute force through " + triangles.length + " combinations ...");
    for (var triangleIdx = 0; triangleIdx < triangles.length; triangleIdx++) {
        var triangle = triangles[triangleIdx];
        var firstArcana = triangle[0], secondArcana = triangle[1], thirdArcana = triangle[2];
        var firstPersonas = personaByArcana[firstArcana], secondPersonas = personaByArcana[secondArcana], thirdPersonas = personaByArcana[thirdArcana];
        for (var i = 0; i < firstPersonas.length; i++) {
            for (var j = 0; j < secondPersonas.length; j++) {
                for (var k = 0; k < thirdPersonas.length; k++) {
                    var first = firstPersonas[i], second = secondPersonas[j], third = thirdPersonas[k];
                    if( !including || first == including || second == including || third == including ) {
                        var level = getTriangleLevel(first,second,third);
                        // We have to be lte to get this fusion; punt
                        if( level > persona.level )
                            continue;

                        if( TriangleCalculation(first,second,third) == persona ) {
                            result.push([first,second,third]);
                        }
                    }
                    
                }
            }
        }
    }
    return result;
}

function ToString(persona) {
    return persona.name + " ("+Arcana.ToString(persona.arcana)+", " +persona.level+")";
}

module.exports = {
    ByLevel: personaByLvl,
    ByArcana: personaByArcana,
    ByName: personaByName,
    NormalCalculation: NormalCalculation,
    TriangleCalculation: TriangleCalculation,
    BackCalc: BackCalcNormal,
    BackCalcNormal: BackCalcNormal,
    BackCalcTriangle: BackCalcTriangle,
    ToString: ToString
}

},{"./arcana":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY29ucmFkL0RldmVsb3Blci9QZXJzb25hbC9wNGdmdXNlX2Jhay9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2NvbnJhZC9EZXZlbG9wZXIvUGVyc29uYWwvcDRnZnVzZV9iYWsvYXBwL3NjcmlwdHMvYXJjYW5hLmpzIiwiL1VzZXJzL2NvbnJhZC9EZXZlbG9wZXIvUGVyc29uYWwvcDRnZnVzZV9iYWsvYXBwL3NjcmlwdHMvbWFpbi5qcyIsIi9Vc2Vycy9jb25yYWQvRGV2ZWxvcGVyL1BlcnNvbmFsL3A0Z2Z1c2VfYmFrL2FwcC9zY3JpcHRzL3BlcnNvbmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdDFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8vIGNydWRlIEFyY2FuYSBlbnVtXG52YXIgRm9vbCA9IDAsXG5cdE1hZ2ljaWFuID0xLFxuXHRQcmllc3Rlc3MgPTIsXG5cdEVtcHJlc3MgPTMsXG5cdEVtcGVyb3IgPTQsXG5cdEhpZXJvcGhhbnQgPTUsXG5cdExvdmVycyA9Nixcblx0Q2hhcmlvdCA9Nyxcblx0SnVzdGljZSA9OCxcblx0SGVybWl0ID05LFxuXHRGb3J0dW5lID0xMCxcblx0U3RyZW5ndGggPTExLFxuXHRIYW5nZWRNYW4gPTEyLFxuXHREZWF0aCA9MTMsXG5cdFRlbXBlcmFuY2UgPTE0LFxuXHREZXZpbCA9MTUsXG5cdFRvd2VyID0xNixcblx0U3RhciA9MTcsXG5cdE1vb24gPTE4LFxuXHRTdW4gPTE5LFxuXHRKdWRnZW1lbnQgPTIwLFxuXHRKZXN0ZXIgPTIxLFxuXHRBZW9uID0yMixcblx0V29ybGQgPSAyMztcblxudmFyIE51bUFyY2FuYSA9IFdvcmxkICsgMTtcblxuZnVuY3Rpb24gSW5pdGlhbGl6ZVNwcmVhZCgpIHtcblx0dmFyIHJlc3VsdCA9IG5ldyBBcnJheShOdW1BcmNhbmEpO1xuXHRmb3IoIHZhciBpID0gMDsgaSA8IE51bUFyY2FuYTsgKytpICkge1xuXHRcdHJlc3VsdFtpXSA9IG5ldyBBcnJheShOdW1BcmNhbmEpO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIEdldFJlc3VsdCggc3ByZWFkLCBmaXJzdCwgc2Vjb25kICkge1xuXHR2YXIgcmVzdWx0ID0gc3ByZWFkW2ZpcnN0XVtzZWNvbmRdO1xuXHQvLyBkbyBjb21tdXRhdGl2ZSBzZWFyY2ggaWYgd2UgY2FtZSB1cCBzaG9ydFxuXHRpZiggcmVzdWx0ID09PSB1bmRlZmluZWQgfHwgcmVzdWx0ID09PSBudWxsIClcblx0XHRyZXN1bHQgPSBzcHJlYWRbc2Vjb25kXVtmaXJzdF07XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBOb3JtYWxTcHJlYWQgPSBJbml0aWFsaXplU3ByZWFkKCk7XG52YXIgVHJpYW5nbGVTcHJlYWQgPSBJbml0aWFsaXplU3ByZWFkKCk7XG5cblxuZnVuY3Rpb24gQWRkU3ByZWFkKCBzcHJlYWQsIGZpcnN0LCBzZWNvbmQsIHJlc3VsdCwgY29tbXV0YXRpdmUgKSB7XG5cdHNwcmVhZFtmaXJzdF1bc2Vjb25kXSA9IHJlc3VsdDtcblx0aWYoIGNvbW11dGF0aXZlICkge1xuXHRcdHNwcmVhZFtzZWNvbmRdW2ZpcnN0XSA9IHJlc3VsdDtcblx0fVxufVxuXG5mdW5jdGlvbiBBZGROb3JtYWxTcHJlYWQoIGZpcnN0LCBzZWNvbmQsIHJlc3VsdCApIHtcblx0QWRkU3ByZWFkKE5vcm1hbFNwcmVhZCwgZmlyc3QsIHNlY29uZCwgcmVzdWx0LCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIEFkZFRyaWFuZ2xlU3ByZWFkKCBmaXJzdCwgc2Vjb25kLCByZXN1bHQgKSB7XG5cdEFkZFNwcmVhZChUcmlhbmdsZVNwcmVhZCwgZmlyc3QsIHNlY29uZCwgcmVzdWx0LCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gQWRkU3ByZWFkcygpIHtcblx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHR2YXIgc3ByZWFkID0gYXJncy5zaGlmdCgpO1xuXHR2YXIgc3JjQXJjYW5hID0gYXJncy5zaGlmdCgpO1xuXG5cdEFkZFNwcmVhZChzcHJlYWQsIHNyY0FyY2FuYSwgc3JjQXJjYW5hLCBzcmNBcmNhbmEpO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKz0yKSB7XG5cdFx0QWRkU3ByZWFkKHNwcmVhZCwgc3JjQXJjYW5hLCBhcmdzW2ldLCBhcmdzW2krMV0pO1xuXHR9O1xuXG59XG5cbmZ1bmN0aW9uIEFkZE5vcm1hbFNwcmVhZHMoKSB7XG5cdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0YXJncy51bnNoaWZ0KE5vcm1hbFNwcmVhZCk7XG5cdEFkZFNwcmVhZHMuYXBwbHkobnVsbCxhcmdzKTtcbn1cblxuZnVuY3Rpb24gQWRkVHJpYW5nbGVTcHJlYWRzKCkge1xuXHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdGFyZ3MudW5zaGlmdChUcmlhbmdsZVNwcmVhZCk7XG5cdEFkZFNwcmVhZHMuYXBwbHkobnVsbCxhcmdzKTtcbn1cblxuQWRkTm9ybWFsU3ByZWFkcyggRm9vbCxcblx0TWFnaWNpYW4sIFRlbXBlcmFuY2UsXG5cdFByaWVzdGVzcywgRGVhdGgsXG5cdEVtcHJlc3MsIE1vb24sXG5cdEVtcGVyb3IsIERlYXRoLFxuXHRIaWVyb3BoYW50LCBDaGFyaW90LFxuXHRMb3ZlcnMsIEVtcHJlc3MsXG5cdENoYXJpb3QsIFN1bixcblx0SnVzdGljZSwgTWFnaWNpYW4sXG5cdEhlcm1pdCwgU3RyZW5ndGgsXG5cdEZvcnR1bmUsIE1hZ2ljaWFuLFxuXHRTdHJlbmd0aCwgTWFnaWNpYW4sXG5cdEhhbmdlZE1hbiwgU3RyZW5ndGgsXG5cdERlYXRoLCBIZXJtaXQsXG5cdFRlbXBlcmFuY2UsIEhpZXJvcGhhbnQsXG5cdERldmlsLCBUZW1wZXJhbmNlLFxuXHRUb3dlciwgU3Rhcixcblx0U3RhciwgRW1wcmVzcyxcblx0TW9vbiwgRW1wZXJvcixcblx0U3VuLCBEZXZpbCxcblx0SnVkZ2VtZW50LCBIYW5nZWRNYW4sXG5cdEplc3RlciwgUHJpZXN0ZXNzLFxuXHRBZW9uLCBEZWF0aFxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggTWFnaWNpYW4sXG5cdFByaWVzdGVzcywgTW9vbixcblx0RW1wcmVzcywgSnVzdGljZSxcblx0RW1wZXJvciwgU3RyZW5ndGgsXG5cdEhpZXJvcGhhbnQsIERldmlsLFxuXHRMb3ZlcnMsIERlYXRoLFxuXHRDaGFyaW90LCBUZW1wZXJhbmNlLFxuXHRKdXN0aWNlLCBTdHJlbmd0aCxcblx0SGVybWl0LCBFbXByZXNzLFxuXHRGb3J0dW5lLCBMb3ZlcnMsXG5cdFN0cmVuZ3RoLCBKdXN0aWNlLFxuXHRIYW5nZWRNYW4sIFN1bixcblx0RGVhdGgsIEVtcGVyb3IsXG5cdFRlbXBlcmFuY2UsIFN0cmVuZ3RoLFxuXHREZXZpbCwgU3VuLFxuXHRUb3dlciwgSGFuZ2VkTWFuLFxuXHRTdGFyLCBudWxsLFxuXHRNb29uLCBTdGFyLFxuXHRTdW4sIENoYXJpb3QsXG5cdEp1ZGdlbWVudCwgTG92ZXJzLFxuXHRKZXN0ZXIsIEhpZXJvcGhhbnQsXG5cdEFlb24sIEVtcGVyb3Jcbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIFByaWVzdGVzcyxcblx0RW1wcmVzcywgSGVybWl0LFxuXHRFbXBlcm9yLCBFbXByZXNzLFxuXHRIaWVyb3BoYW50LCBTdW4sXG5cdExvdmVycywgRW1wZXJvcixcblx0Q2hhcmlvdCwgSGllcm9waGFudCxcblx0SnVzdGljZSwgSGVybWl0LFxuXHRIZXJtaXQsIERlYXRoLFxuXHRGb3J0dW5lLCBIYW5nZWRNYW4sXG5cdFN0cmVuZ3RoLCBKdXN0aWNlLFxuXHRIYW5nZWRNYW4sIE1vb24sXG5cdERlYXRoLCBNYWdpY2lhbixcblx0VGVtcGVyYW5jZSwgSGllcm9waGFudCxcblx0RGV2aWwsIEp1c3RpY2UsXG5cdFRvd2VyLCBNYWdpY2lhbixcblx0U3RhciwgRW1wZXJvcixcblx0TW9vbiwgU3Rhcixcblx0U3VuLCBEZXZpbCxcblx0SnVkZ2VtZW50LCBTdW4sXG5cdEplc3RlciwgRGV2aWwsXG5cdEFlb24sIFN1blxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggRW1wcmVzcyxcblx0RW1wZXJvciwgTW9vbixcblx0SGllcm9waGFudCwgRGVhdGgsXG5cdExvdmVycywgSnVzdGljZSxcblx0Q2hhcmlvdCwgSnVzdGljZSxcblx0SnVzdGljZSwgTWFnaWNpYW4sXG5cdEhlcm1pdCwgTWFnaWNpYW4sXG5cdEZvcnR1bmUsIFN0YXIsXG5cdFN0cmVuZ3RoLCBIaWVyb3BoYW50LFxuXHRIYW5nZWRNYW4sIFRlbXBlcmFuY2UsXG5cdERlYXRoLCBDaGFyaW90LFxuXHRUZW1wZXJhbmNlLCBEZXZpbCxcblx0RGV2aWwsIFByaWVzdGVzcyxcblx0VG93ZXIsIEhlcm1pdCxcblx0U3RhciwgQ2hhcmlvdCxcblx0TW9vbiwgVGVtcGVyYW5jZSxcblx0U3VuLCBQcmllc3Rlc3MsXG5cdEp1ZGdlbWVudCwgUHJpZXN0ZXNzLFxuXHRKZXN0ZXIsIFN0cmVuZ3RoLFxuXHRBZW9uLCBUZW1wZXJhbmNlXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBFbXBlcm9yLFxuXHRIaWVyb3BoYW50LCBFbXByZXNzLFxuXHRMb3ZlcnMsIEp1c3RpY2UsXG5cdENoYXJpb3QsIFRlbXBlcmFuY2UsXG5cdEp1c3RpY2UsIERldmlsLFxuXHRIZXJtaXQsIFByaWVzdGVzcyxcblx0Rm9ydHVuZSwgTG92ZXJzLFxuXHRTdHJlbmd0aCwgSGVybWl0LFxuXHRIYW5nZWRNYW4sIEVtcHJlc3MsXG5cdERlYXRoLCBNb29uLFxuXHRUZW1wZXJhbmNlLCBTdW4sXG5cdERldmlsLCBNb29uLFxuXHRUb3dlciwgU3Rhcixcblx0U3RhciwgRGVhdGgsXG5cdE1vb24sIE1hZ2ljaWFuLCBcblx0U3VuLCBDaGFyaW90LFxuXHRKdWRnZW1lbnQsIExvdmVycyxcblx0SmVzdGVyLCBKdXN0aWNlLFxuXHRBZW9uLCBIYW5nZWRNYW5cbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIEhpZXJvcGhhbnQsXG5cdExvdmVycywgRGVhdGgsXG5cdENoYXJpb3QsIFN1bixcblx0SnVzdGljZSwgVGVtcGVyYW5jZSxcblx0SGVybWl0LCBKdXN0aWNlLFxuXHRGb3J0dW5lLCBQcmllc3Rlc3MsXG5cdFN0cmVuZ3RoLCBTdW4sXG5cdEhhbmdlZE1hbiwgRGVhdGgsXG5cdERlYXRoLCBEZXZpbCwgXG5cdFRlbXBlcmFuY2UsIE1hZ2ljaWFuLFxuXHREZXZpbCwgRW1wcmVzcyxcblx0VG93ZXIsIEhhbmdlZE1hbixcblx0U3RhciwgTW9vbixcblx0TW9vbiwgRW1wcmVzcyxcblx0U3VuLCBTdHJlbmd0aCxcblx0SnVkZ2VtZW50LCBDaGFyaW90LFxuXHRKZXN0ZXIsIE1hZ2ljaWFuLFxuXHRBZW9uLCBNb29uXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBMb3ZlcnMsXG5cdEFlb24sIEp1c3RpY2UsXG5cdEplc3RlciwgU3VuLFxuXHRKdWRnZW1lbnQsIFN0cmVuZ3RoLFxuXHRTdW4sIERldmlsLFxuXHRNb29uLCBIYW5nZWRNYW4sXG5cdFN0YXIsIEhlcm1pdCwgXG5cdFRvd2VyLCBTdGFyLFxuXHREZXZpbCwgSGllcm9waGFudCxcblx0VGVtcGVyYW5jZSwgSGllcm9waGFudCxcblx0RGVhdGgsIFN0YXIsXG5cdEhhbmdlZE1hbiwgTW9vbixcblx0U3RyZW5ndGgsIEVtcGVyb3IsXG5cdEZvcnR1bmUsIFN0YXIsIFxuXHRIZXJtaXQsIE1hZ2ljaWFuLCBcblx0SnVzdGljZSwgUHJpZXN0ZXNzLFxuXHRDaGFyaW90LCBIaWVyb3BoYW50XG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBDaGFyaW90LFxuXHRKdXN0aWNlLCBUZW1wZXJhbmNlLFxuXHRIZXJtaXQsIEp1c3RpY2UsXG5cdEZvcnR1bmUsIERldmlsLFxuXHRTdHJlbmd0aCwgTWFnaWNpYW4sXG5cdEhhbmdlZE1hbiwgRGVhdGgsXG5cdERlYXRoLCBIZXJtaXQsXG5cdFRlbXBlcmFuY2UsIE1hZ2ljaWFuLFxuXHREZXZpbCwgTW9vbixcblx0VG93ZXIsIEhhbmdlZE1hbixcblx0U3RhciwgSGllcm9waGFudCxcblx0TW9vbiwgU3VuLCBcblx0U3VuLCBTdHJlbmd0aCxcblx0SnVkZ2VtZW50LCBUZW1wZXJhbmNlLFxuXHRKZXN0ZXIsIENoYXJpb3QsXG5cdEFlb24sIFN0cmVuZ3RoXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBKdXN0aWNlLFxuXHRIZXJtaXQsIFN0cmVuZ3RoLFxuXHRGb3J0dW5lLCBMb3ZlcnMsXG5cdFN0cmVuZ3RoLCBUZW1wZXJhbmNlLFxuXHRIYW5nZWRNYW4sIFByaWVzdGVzcyxcblx0RGVhdGgsIFN0cmVuZ3RoLFxuXHRUZW1wZXJhbmNlLCBIZXJtaXQsXG5cdERldmlsLCBNYWdpY2lhbixcblx0VG93ZXIsIExvdmVycyxcblx0U3RhciwgTW9vbixcblx0TW9vbiwgU3RyZW5ndGgsXG5cdFN1biwgVGVtcGVyYW5jZSxcblx0SnVkZ2VtZW50LCBMb3ZlcnMsXG5cdEplc3RlciwgRW1wZXJvcixcblx0QWVvbiwgTG92ZXJzXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBIZXJtaXQsXG5cdEZvcnR1bmUsIEVtcHJlc3MsXG5cdFN0cmVuZ3RoLCBIaWVyb3BoYW50LFxuXHRIYW5nZWRNYW4sIE1vb24sXG5cdERlYXRoLCBTdW4sXG5cdFRlbXBlcmFuY2UsIE1hZ2ljaWFuLFxuXHREZXZpbCwgSnVzdGljZSxcblx0VG93ZXIsIERlYXRoLFxuXHRTdGFyLCBKdXN0aWNlLFxuXHRNb29uLCBFbXBlcm9yLFxuXHRTdW4sIFRlbXBlcmFuY2UsXG5cdEp1ZGdlbWVudCwgU3Rhcixcblx0SmVzdGVyLCBNb29uLFxuXHRBZW9uLCBNYWdpY2lhblxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggRm9ydHVuZSxcblx0U3RyZW5ndGgsIFN0YXIsXG5cdEhhbmdlZE1hbiwgRGVhdGgsXG5cdERlYXRoLCBIZXJtaXQsXG5cdFRlbXBlcmFuY2UsIERldmlsLFxuXHREZXZpbCwgRW1wZXJvcixcblx0VG93ZXIsIENoYXJpb3QsXG5cdFN0YXIsIFN0YXIsXG5cdE1vb24sIExvdmVycyxcblx0U3VuLCBQcmllc3Rlc3MsXG5cdEp1ZGdlbWVudCwgSGFuZ2VkTWFuLFxuXHRKZXN0ZXIsIERldmlsLFxuXHRBZW9uLCBQcmllc3Rlc3Ncbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIFN0cmVuZ3RoLFxuXHRIYW5nZWRNYW4sIEhpZXJvcGhhbnQsXG5cdERlYXRoLCBIYW5nZWRNYW4sXG5cdFRlbXBlcmFuY2UsIFN1bixcblx0RGV2aWwsIEhlcm1pdCxcblx0VG93ZXIsIEhhbmdlZE1hbixcblx0U3RhciwgRW1wZXJvcixcblx0TW9vbiwgSnVzdGljZSxcblx0U3VuLCBUZW1wZXJhbmNlLFxuXHRKdWRnZW1lbnQsIG51bGwsXG5cdEplc3RlciwgRW1wcmVzcyxcblx0QWVvbiwgQ2hhcmlvdFxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggSGFuZ2VkTWFuLFxuXHREZWF0aCwgUHJpZXN0ZXNzLFxuXHRUZW1wZXJhbmNlLCBEZWF0aCxcblx0RGV2aWwsIEp1c3RpY2UsXG5cdFRvd2VyLCBIZXJtaXQsXG5cdFN0YXIsIEVtcHJlc3MsXG5cdE1vb24sIFByaWVzdGVzcyxcblx0U3VuLCBEZXZpbCxcblx0SnVkZ2VtZW50LCBFbXByZXNzLFxuXHRKZXN0ZXIsIFByaWVzdGVzcyxcblx0QWVvbiwgRGVhdGhcbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIERlYXRoLFxuXHRUZW1wZXJhbmNlLCBDaGFyaW90LFxuXHREZXZpbCwgU3Rhcixcblx0VG93ZXIsIExvdmVycyxcblx0U3RhciwgTG92ZXJzLFxuXHRNb29uLCBQcmllc3Rlc3MsXG5cdFN1biwgRW1wcmVzcyxcblx0SnVkZ2VtZW50LCBudWxsLFxuXHRKZXN0ZXIsIFRlbXBlcmFuY2UsXG5cdEFlb24sIEhhbmdlZE1hblxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggVGVtcGVyYW5jZSxcblx0RGV2aWwsIEhlcm1pdCxcblx0VG93ZXIsIFN0YXIsXG5cdFN0YXIsIEhpZXJvcGhhbnQsXG5cdE1vb24sIEhhbmdlZE1hbixcblx0U3VuLCBIZXJtaXQsXG5cdEp1ZGdlbWVudCwgbnVsbCxcblx0SmVzdGVyLCBEZWF0aCxcblx0QWVvbiwgRW1wcmVzc1xuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggRGV2aWwsXG5cdFRvd2VyLCBFbXBlcm9yLFxuXHRTdGFyLCBFbXBlcm9yLFxuXHRNb29uLCBFbXByZXNzLFxuXHRTdW4sIEhpZXJvcGhhbnQsXG5cdEp1ZGdlbWVudCwgbnVsbCxcblx0SmVzdGVyLCBDaGFyaW90LFxuXHRBZW9uLCBNYWdpY2lhblxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggVG93ZXIsXG5cdFN0YXIsIEhhbmdlZE1hbixcblx0TW9vbiwgUHJpZXN0ZXNzLFxuXHRTdW4sIENoYXJpb3QsXG5cdEp1ZGdlbWVudCwgbnVsbCxcblx0SmVzdGVyLCBIZXJtaXQsXG5cdEFlb24sIEVtcGVyb3Jcbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIFN0YXIsXG5cdE1vb24sIEVtcGVyb3IsXG5cdFN1biwgTW9vbixcblx0SnVkZ2VtZW50LCBudWxsLFxuXHRKZXN0ZXIsIEVtcHJlc3MsXG5cdEFlb24sIENoYXJpb3Rcbik7XHRcblxuQWRkTm9ybWFsU3ByZWFkcyggTW9vbixcblx0U3VuLCBTdHJlbmd0aCxcblx0SnVkZ2VtZW50LCBudWxsLFxuXHRKZXN0ZXIsIEhlcm1pdCxcblx0QWVvbiwgSGllcm9waGFudFxuKTtcdFxuXG5BZGROb3JtYWxTcHJlYWRzKCBTdW4sXG5cdEp1ZGdlbWVudCwgbnVsbCxcblx0SmVzdGVyLCBMb3ZlcnMsXG5cdEFlb24sIFByaWVzdGVzc1xuKTtcdFxuXG5BZGROb3JtYWxTcHJlYWRzKCBKdWRnZW1lbnQsXG5cdEplc3RlciwgQ2hhcmlvdCxcblx0QWVvbiwgSGFuZ2VkTWFuXG4pO1x0XG5cbkFkZE5vcm1hbFNwcmVhZHMoIEplc3Rlcixcblx0QWVvbiwgRGV2aWxcbik7XHRcblxuQWRkTm9ybWFsU3ByZWFkcyhBZW9uKTtcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBBZW9uLFxuXHRGb29sLCBKZXN0ZXIsXG5cdE1hZ2ljaWFuLCBFbXByZXNzLFxuXHRQcmllc3Rlc3MsIEZvb2wsXG5cdEVtcHJlc3MsIFN0YXIsXG5cdEVtcGVyb3IsIFN1bixcblx0SGllcm9waGFudCwgU3VuLFxuXHRMb3ZlcnMsIEp1ZGdlbWVudCxcblx0Q2hhcmlvdCwgSnVzdGljZSxcblx0SnVzdGljZSwgVGVtcGVyYW5jZSxcblx0SGVybWl0LCBNb29uLFxuXHRGb3J0dW5lLCBGb29sLFxuXHRTdHJlbmd0aCwgSGVybWl0LFxuXHRIYW5nZWRNYW4sIEplc3Rlcixcblx0RGVhdGgsIFN0cmVuZ3RoLFxuXHRUZW1wZXJhbmNlLCBKdWRnZW1lbnQsXG5cdERldmlsLCBMb3ZlcnMsXG5cdFRvd2VyLCBGb3J0dW5lLFxuXHRTdGFyLCBUb3dlcixcblx0TW9vbiwgVG93ZXIsXG5cdFN1biwgSGllcm9waGFudCxcblx0SnVkZ2VtZW50LCBTdW4sXG5cdEplc3RlciwgSnVkZ2VtZW50XG4pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIEplc3Rlcixcblx0Rm9vbCwgUHJpZXN0ZXNzLFxuXHRNYWdpY2lhbiwgU3Rhcixcblx0UHJpZXN0ZXNzLCBNb29uLFxuXHRFbXByZXNzLCBEZXZpbCxcblx0RW1wZXJvciwgQ2hhcmlvdCxcblx0SGllcm9waGFudCwgRm9ydHVuZSxcblx0TG92ZXJzLCBUb3dlcixcblx0Q2hhcmlvdCwgU3RyZW5ndGgsXG5cdEp1c3RpY2UsIEhlcm1pdCxcblx0SGVybWl0LCBBZW9uLFxuXHRGb3J0dW5lLCBFbXBlcm9yLFxuXHRTdHJlbmd0aCwgTWFnaWNpYW4sXG5cdEhhbmdlZE1hbiwgTW9vbixcblx0RGVhdGgsIEZvcnR1bmUsXG5cdFRlbXBlcmFuY2UsIFByaWVzdGVzcyxcblx0RGV2aWwsIEFlb24sXG5cdFRvd2VyLCBKdWRnZW1lbnQsXG5cdFN0YXIsIERlYXRoLFxuXHRNb29uLCBIYW5nZWRNYW4sXG5cdFN1biwgTG92ZXJzLFxuXHRKdWRnZW1lbnQsIERlYXRoXG4pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIEp1ZGdlbWVudCxcblx0Rm9vbCwgVGVtcGVyYW5jZSxcblx0TWFnaWNpYW4sIFN1bixcblx0UHJpZXN0ZXNzLCBUZW1wZXJhbmNlLFxuXHRFbXByZXNzLCBTdGFyLFxuXHRFbXBlcm9yLCBIYW5nZWRNYW4sXG5cdEhpZXJvcGhhbnQsIEZvb2wsXG5cdExvdmVycywgRW1wZXJvcixcblx0Q2hhcmlvdCwgVG93ZXIsXG5cdEp1c3RpY2UsIFN1bixcblx0SGVybWl0LCBUZW1wZXJhbmNlLFxuXHRGb3J0dW5lLCBGb29sLFxuXHRTdHJlbmd0aCwgVGVtcGVyYW5jZSxcblx0SGFuZ2VkTWFuLCBGb29sLFxuXHREZWF0aCwgU3RyZW5ndGgsXG5cdFRlbXBlcmFuY2UsIENoYXJpb3QsXG5cdERldmlsLCBEZWF0aCxcblx0VG93ZXIsIEFlb24sXG5cdFN0YXIsIExvdmVycyxcblx0TW9vbiwgSGVybWl0LFxuXHRTdW4sIENoYXJpb3Rcbik7XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggU3VuLFxuXHRGb29sLCBFbXByZXNzLFxuXHRNYWdpY2lhbiwgRm9ydHVuZSxcblx0UHJpZXN0ZXNzLCBBZW9uLFxuXHRFbXByZXNzLCBMb3ZlcnMsXG5cdEVtcGVyb3IsIERldmlsLFxuXHRIaWVyb3BoYW50LCBNYWdpY2lhbixcblx0TG92ZXJzLCBKZXN0ZXIsXG5cdENoYXJpb3QsIFByaWVzdGVzcyxcblx0SnVzdGljZSwgSnVkZ2VtZW50LFxuXHRIZXJtaXQsIFRvd2VyLFxuXHRGb3J0dW5lLCBDaGFyaW90LFxuXHRTdHJlbmd0aCwgVG93ZXIsXG5cdEhhbmdlZE1hbiwgRW1wcmVzcyxcblx0RGVhdGgsIEVtcHJlc3MsXG5cdFRlbXBlcmFuY2UsIEZvcnR1bmUsXG5cdERldmlsLCBMb3ZlcnMsXG5cdFRvd2VyLCBEZWF0aCxcblx0U3RhciwgQ2hhcmlvdCxcblx0TW9vbiwgRGVhdGhcbik7XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggTW9vbixcblx0Rm9vbCwgRW1wcmVzcyxcblx0TWFnaWNpYW4sIFN1bixcblx0UHJpZXN0ZXNzLCBFbXByZXNzLFxuXHRFbXByZXNzLCBNb29uLFxuXHRFbXBlcm9yLCBTdHJlbmd0aCxcblx0SGllcm9waGFudCwgQWVvbixcblx0TG92ZXJzLCBIYW5nZWRNYW4sXG5cdENoYXJpb3QsIEZvb2wsXG5cdEp1c3RpY2UsIFN0YXIsXG5cdEhlcm1pdCwgSmVzdGVyLFxuXHRGb3J0dW5lLCBTdHJlbmd0aCxcblx0U3RyZW5ndGgsIEhpZXJvcGhhbnQsXG5cdEhhbmdlZE1hbiwgTWFnaWNpYW4sXG5cdERlYXRoLCBIYW5nZWRNYW4sXG5cdFRlbXBlcmFuY2UsIEhhbmdlZE1hbixcblx0RGV2aWwsIERlYXRoLFxuXHRUb3dlciwgSGFuZ2VkTWFuLFxuXHRTdGFyLCBEZWF0aFxuKTtcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBTdGFyLFxuXHRGb29sLCBIZXJtaXQsXG5cdE1hZ2ljaWFuLCBIaWVyb3BoYW50LFxuXHRQcmllc3Rlc3MsIEVtcHJlc3MsXG5cdEVtcHJlc3MsIEplc3Rlcixcblx0RW1wZXJvciwgU3VuLFxuXHRIaWVyb3BoYW50LCBMb3ZlcnMsXG5cdExvdmVycywgSGllcm9waGFudCxcblx0Q2hhcmlvdCwgQWVvbixcblx0SnVzdGljZSwgU3VuLFxuXHRIZXJtaXQsIERlYXRoLFxuXHRGb3J0dW5lLCBNYWdpY2lhbixcblx0U3RyZW5ndGgsIERldmlsLFxuXHRIYW5nZWRNYW4sIFN1bixcblx0RGVhdGgsIEZvcnR1bmUsXG5cdFRlbXBlcmFuY2UsIEhpZXJvcGhhbnQsXG5cdERldmlsLCBGb3J0dW5lLFxuXHRUb3dlciwgSGVybWl0XG4pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIFRvd2VyLFxuXHRGb29sLCBGb3J0dW5lLFxuXHRNYWdpY2lhbiwgRW1wZXJvcixcblx0UHJpZXN0ZXNzLCBNb29uLFxuXHRFbXByZXNzLCBKdWRnZW1lbnQsXG5cdEVtcGVyb3IsIFByaWVzdGVzcyxcblx0SGllcm9waGFudCwgRW1wZXJvcixcblx0TG92ZXJzLCBKdWRnZW1lbnQsXG5cdENoYXJpb3QsIEhpZXJvcGhhbnQsXG5cdEp1c3RpY2UsIENoYXJpb3QsXG5cdEhlcm1pdCwgSmVzdGVyLFxuXHRGb3J0dW5lLCBNYWdpY2lhbixcblx0U3RyZW5ndGgsIERldmlsLFxuXHRIYW5nZWRNYW4sIEZvcnR1bmUsXG5cdERlYXRoLCBKdXN0aWNlLFxuXHRUZW1wZXJhbmNlLCBKdWRnZW1lbnQsXG5cdERldmlsLCBTdGFyXG4pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIERldmlsLFxuXHRGb29sLCBMb3ZlcnMsXG5cdE1hZ2ljaWFuLCBDaGFyaW90LFxuXHRQcmllc3Rlc3MsIEhlcm1pdCxcblx0RW1wcmVzcywgRm9vbCxcblx0RW1wZXJvciwgRGVhdGgsXG5cdEhpZXJvcGhhbnQsIE1vb24sXG5cdExvdmVycywgVG93ZXIsXG5cdENoYXJpb3QsIEVtcGVyb3IsXG5cdEp1c3RpY2UsIFByaWVzdGVzcyxcblx0SGVybWl0LCBEZWF0aCxcblx0Rm9ydHVuZSwgVG93ZXIsXG5cdFN0cmVuZ3RoLCBMb3ZlcnMsXG5cdEhhbmdlZE1hbiwgSnVzdGljZSxcblx0RGVhdGgsIExvdmVycyxcblx0VGVtcGVyYW5jZSwgSnVzdGljZVxuKTtcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBUZW1wZXJhbmNlLFxuXHRGb29sLCBKdXN0aWNlLFxuXHRNYWdpY2lhbiwgU3VuLFxuXHRQcmllc3Rlc3MsIExvdmVycyxcblx0RW1wcmVzcywgQWVvbixcblx0RW1wZXJvciwgRGV2aWwsXG5cdEhpZXJvcGhhbnQsIEVtcGVyb3IsXG5cdExvdmVycywgRm9ydHVuZSxcblx0Q2hhcmlvdCwgTW9vbixcblx0SnVzdGljZSwgTWFnaWNpYW4sXG5cdEhlcm1pdCwgRGV2aWwsXG5cdEZvcnR1bmUsIFRvd2VyLFxuXHRTdHJlbmd0aCwgRW1wZXJvcixcblx0SGFuZ2VkTWFuLCBKdXN0aWNlLFxuXHREZWF0aCwgSmVzdGVyXG4pO1x0XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggRGVhdGgsXG5cdEZvb2wsIFN0YXIsXG5cdE1hZ2ljaWFuLCBGb29sLFxuXHRQcmllc3Rlc3MsIENoYXJpb3QsXG5cdEVtcHJlc3MsIEhpZXJvcGhhbnQsXG5cdEVtcGVyb3IsIFN0cmVuZ3RoLFxuXHRIaWVyb3BoYW50LCBNYWdpY2lhbixcblx0TG92ZXJzLCBIYW5nZWRNYW4sXG5cdENoYXJpb3QsIERldmlsLFxuXHRKdXN0aWNlLCBEZXZpbCxcblx0SGVybWl0LCBNYWdpY2lhbixcblx0Rm9ydHVuZSwgTW9vbixcblx0U3RyZW5ndGgsIEVtcHJlc3MsXG5cdEhhbmdlZE1hbiwgRGV2aWxcbik7XHRcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBIYW5nZWRNYW4sXG5cdEZvb2wsIFN0YXIsXG5cdE1hZ2ljaWFuLCBGb3J0dW5lLFxuXHRQcmllc3Rlc3MsIENoYXJpb3QsXG5cdEVtcHJlc3MsIFN1bixcblx0RW1wZXJvciwgSGllcm9waGFudCxcblx0SGllcm9waGFudCwgU3Rhcixcblx0TG92ZXJzLCBKdXN0aWNlLFxuXHRDaGFyaW90LCBEZXZpbCxcblx0SnVzdGljZSwgU3Rhcixcblx0SGVybWl0LCBTdHJlbmd0aCxcblx0Rm9ydHVuZSwgRm9vbCxcblx0U3RyZW5ndGgsIFN0YXJcbik7XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggU3RyZW5ndGgsXG5cdEZvb2wsIEVtcHJlc3MsXG5cdE1hZ2ljaWFuLCBUb3dlcixcblx0UHJpZXN0ZXNzLCBFbXByZXNzLFxuXHRFbXByZXNzLCBKZXN0ZXIsXG5cdEVtcGVyb3IsIEhlcm1pdCxcblx0SGllcm9waGFudCwgTW9vbixcblx0TG92ZXJzLCBGb29sLFxuXHRDaGFyaW90LCBBZW9uLFxuXHRKdXN0aWNlLCBIZXJtaXQsXG5cdEhlcm1pdCwgSnVzdGljZSxcblx0Rm9ydHVuZSwgUHJpZXN0ZXNzXG4pO1x0XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggRm9ydHVuZSxcblx0Rm9vbCwgSnVkZ2VtZW50LFxuXHRNYWdpY2lhbiwgU3RyZW5ndGgsXG5cdFByaWVzdGVzcywgQWVvbixcblx0RW1wcmVzcywgU3RyZW5ndGgsXG5cdEVtcGVyb3IsIFByaWVzdGVzcyxcblx0SGllcm9waGFudCwgSGFuZ2VkTWFuLFxuXHRMb3ZlcnMsIEhhbmdlZE1hbixcblx0Q2hhcmlvdCwgVGVtcGVyYW5jZSxcblx0SnVzdGljZSwgUHJpZXN0ZXNzLFxuXHRIZXJtaXQsIEp1ZGdlbWVudFxuKTtcdFx0XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggSGVybWl0LFxuXHRGb29sLCBTdHJlbmd0aCxcblx0TWFnaWNpYW4sIEVtcHJlc3MsXG5cdFByaWVzdGVzcywgTWFnaWNpYW4sXG5cdEVtcHJlc3MsIEZvb2wsXG5cdEVtcGVyb3IsIE1vb24sXG5cdEhpZXJvcGhhbnQsIExvdmVycyxcblx0TG92ZXJzLCBIaWVyb3BoYW50LFxuXHRDaGFyaW90LCBQcmllc3Rlc3MsXG5cdEp1c3RpY2UsIEVtcGVyb3Jcbik7XHRcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBKdXN0aWNlLFxuXHRGb29sLCBDaGFyaW90LFxuXHRNYWdpY2lhbiwgQ2hhcmlvdCxcblx0UHJpZXN0ZXNzLCBIZXJtaXQsXG5cdEVtcHJlc3MsIERlYXRoLFxuXHRFbXBlcm9yLCBKZXN0ZXIsXG5cdEhpZXJvcGhhbnQsIE1hZ2ljaWFuLFxuXHRMb3ZlcnMsIEFlb24sXG5cdENoYXJpb3QsIFRlbXBlcmFuY2Vcbik7XHRcdFxuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIENoYXJpb3QsXG5cdEZvb2wsIExvdmVycyxcblx0TWFnaWNpYW4sIEVtcGVyb3IsXG5cdFByaWVzdGVzcywgTWFnaWNpYW4sXG5cdEVtcHJlc3MsIEVtcGVyb3IsXG5cdEVtcGVyb3IsIFRvd2VyLFxuXHRIaWVyb3BoYW50LCBKdWRnZW1lbnQsXG5cdExvdmVycywgSGllcm9waGFudFxuKTtcdFxuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIExvdmVycyxcblx0Rm9vbCwgRGV2aWwsXG5cdE1hZ2ljaWFuLCBUZW1wZXJhbmNlLFxuXHRQcmllc3Rlc3MsIEhhbmdlZE1hbixcblx0RW1wcmVzcywgRm9vbCxcblx0RW1wZXJvciwgRGV2aWwsXG5cdEhpZXJvcGhhbnQsIEhhbmdlZE1hblxuKTtcdFxuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIEhpZXJvcGhhbnQsXG5cdEZvb2wsIFRvd2VyLFxuXHRNYWdpY2lhbiwgSmVzdGVyLFxuXHRQcmllc3Rlc3MsIEVtcHJlc3MsXG5cdEVtcHJlc3MsIFByaWVzdGVzcyxcblx0RW1wZXJvciwgQ2hhcmlvdFxuKTtcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBFbXBlcm9yLFxuXHRGb29sLCBIZXJtaXQsXG5cdE1hZ2ljaWFuLCBEZWF0aCxcblx0UHJpZXN0ZXNzLCBKdXN0aWNlLFxuXHRFbXByZXNzLCBGb29sXG4pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIEVtcHJlc3MsXG5cdEZvb2wsIEp1ZGdlbWVudCxcblx0TWFnaWNpYW4sIFN1bixcblx0UHJpZXN0ZXNzLCBUZW1wZXJhbmNlXG4pO1x0XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggUHJpZXN0ZXNzLFxuXHRGb29sLCBMb3ZlcnMsXG5cdE1hZ2ljaWFuLCBGb3J0dW5lXG4pO1x0XHRcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBNYWdpY2lhbixcblx0Rm9vbCwgRm9ydHVuZVxuKTtcdFx0XHRcblxuQWRkVHJpYW5nbGVTcHJlYWRzKEZvb2wpO1xuXG5cbmZ1bmN0aW9uIEdldE5vcm1hbFJlc3VsdCggZmlyc3QsIHNlY29uZCApIHtcblx0aWYoIGZpcnN0ID09IHNlY29uZCApXG5cdFx0cmV0dXJuIG51bGw7XG5cdFxuXHRyZXR1cm4gR2V0UmVzdWx0KE5vcm1hbFNwcmVhZCwgZmlyc3QsIHNlY29uZCk7XG59XG5cbmZ1bmN0aW9uIEdldFRyaWFuZ2xlUmVzdWx0KCBmaXJzdCwgc2Vjb25kLCB0aGlyZCApIHtcblx0aWYoIGZpcnN0ID09IHNlY29uZCB8fCBzZWNvbmQgPT0gdGhpcmQgfHwgZmlyc3QgPT0gdGhpcmQgKVxuXHRcdHJldHVybiBudWxsO1xuXG5cdHZhciBmaXJzdFJlc3VsdCA9IEdldE5vcm1hbFJlc3VsdChmaXJzdCwgc2Vjb25kKTtcblx0aWYoIGZpcnN0UmVzdWx0ICE9PSBudWxsICYmIGZpcnN0UmVzdWx0ICE9PSB1bmRlZmluZWQgKVxuXHRcdHJldHVybiBHZXRSZXN1bHQoIFRyaWFuZ2xlU3ByZWFkLCBmaXJzdFJlc3VsdCwgdGhpcmQgKTtcblx0cmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIEJhY2tDYWxjKHNwcmVhZCx0YXJnZXQpe1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3ByZWFkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGFyY2FuYVJlc3VsdHMgPSBzcHJlYWRbaV07XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhcmNhbmFSZXN1bHRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiggYXJjYW5hUmVzdWx0c1tqXSA9PT0gdGFyZ2V0ICkge1xuXHRcdFx0XHRyZXN1bHQucHVzaChbaSxqXSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gQmFja0NhbGNOb3JtYWwoIHRhcmdldCApIHtcblx0cmV0dXJuIEJhY2tDYWxjKE5vcm1hbFNwcmVhZCx0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiBCYWNrQ2FsY1RyaWFuZ2xlKCB0YXJnZXQgKSB7XG4vL1x0cmV0dXJuIEJhY2tDYWxjKFRyaWFuZ2xlU3ByZWFkLHRhcmdldCk7XG5cblx0dmFyIHJlc3VsdCA9IFtdO1xuXG5cdGZvciAodmFyIGZpcnN0QXJjYW5hID0gMDsgZmlyc3RBcmNhbmEgPCBUcmlhbmdsZVNwcmVhZC5sZW5ndGg7IGZpcnN0QXJjYW5hKyspIHtcblx0XHR2YXIgYXJjYW5hUmVzdWx0cyA9IFRyaWFuZ2xlU3ByZWFkW2ZpcnN0QXJjYW5hXTtcblxuXHRcdGZvciAodmFyIHNlY29uZEFyY2FuYSA9IDA7IHNlY29uZEFyY2FuYSA8IGFyY2FuYVJlc3VsdHMubGVuZ3RoOyBzZWNvbmRBcmNhbmErKykge1xuXHRcdFx0aWYoIGFyY2FuYVJlc3VsdHNbc2Vjb25kQXJjYW5hXSA9PT0gdGFyZ2V0ICkge1xuXHRcdFx0XHR2YXIgZmlyc3RQcmVkaWNhdGVzID0gQmFja0NhbGNOb3JtYWwoIGZpcnN0QXJjYW5hICk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlyc3RQcmVkaWNhdGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIHBhaXIgPSBmaXJzdFByZWRpY2F0ZXNbaV07XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goIFtwYWlyWzBdLCBwYWlyWzFdLCBzZWNvbmRBcmNhbmFdICk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gVG9TdHJpbmcoIGFyY2FuYSApIHtcblx0aWYoIGFyY2FuYSA9PT0gRm9vbCApIHJldHVybiBcIkZvb2xcIjtcblx0aWYoIGFyY2FuYSA9PT0gTWFnaWNpYW4gKSByZXR1cm4gXCJNYWdpY2lhblwiO1xuXHRpZiggYXJjYW5hID09PSBQcmllc3Rlc3MgKSByZXR1cm4gXCJQcmllc3Rlc3NcIjtcblx0aWYoIGFyY2FuYSA9PT0gRW1wcmVzcyApIHJldHVybiBcIkVtcHJlc3NcIjtcblx0aWYoIGFyY2FuYSA9PT0gRW1wZXJvciApIHJldHVybiBcIkVtcGVyb3JcIjtcblx0aWYoIGFyY2FuYSA9PT0gSGllcm9waGFudCApIHJldHVybiBcIkhpZXJvcGhhbnRcIjtcblx0aWYoIGFyY2FuYSA9PT0gTG92ZXJzICkgcmV0dXJuIFwiTG92ZXJzXCI7XG5cdGlmKCBhcmNhbmEgPT09IENoYXJpb3QgKSByZXR1cm4gXCJDaGFyaW90XCI7XG5cdGlmKCBhcmNhbmEgPT09IEp1c3RpY2UgKSByZXR1cm4gXCJKdXN0aWNlXCI7XG5cdGlmKCBhcmNhbmEgPT09IEhlcm1pdCApIHJldHVybiBcIkhlcm1pdFwiO1xuXHRpZiggYXJjYW5hID09PSBGb3J0dW5lICkgcmV0dXJuIFwiRm9ydHVuZVwiO1xuXHRpZiggYXJjYW5hID09PSBTdHJlbmd0aCApIHJldHVybiBcIlN0cmVuZ3RoXCI7XG5cdGlmKCBhcmNhbmEgPT09IEhhbmdlZE1hbiApIHJldHVybiBcIkhhbmdlZE1hblwiO1xuXHRpZiggYXJjYW5hID09PSBEZWF0aCApIHJldHVybiBcIkRlYXRoXCI7XG5cdGlmKCBhcmNhbmEgPT09IFRlbXBlcmFuY2UgKSByZXR1cm4gXCJUZW1wZXJhbmNlXCI7XG5cdGlmKCBhcmNhbmEgPT09IERldmlsICkgcmV0dXJuIFwiRGV2aWxcIjtcblx0aWYoIGFyY2FuYSA9PT0gVG93ZXIgKSByZXR1cm4gXCJUb3dlclwiO1xuXHRpZiggYXJjYW5hID09PSBTdGFyICkgcmV0dXJuIFwiU3RhclwiO1xuXHRpZiggYXJjYW5hID09PSBNb29uICkgcmV0dXJuIFwiTW9vblwiO1xuXHRpZiggYXJjYW5hID09PSBTdW4gKSByZXR1cm4gXCJTdW5cIjtcblx0aWYoIGFyY2FuYSA9PT0gSnVkZ2VtZW50ICkgcmV0dXJuIFwiSnVkZ2VtZW50XCI7XG5cdGlmKCBhcmNhbmEgPT09IEplc3RlciApIHJldHVybiBcIkplc3RlclwiO1xuXHRpZiggYXJjYW5hID09PSBBZW9uICkgcmV0dXJuIFwiQWVvblwiO1xuXHRpZiggYXJjYW5hID09PSBXb3JsZCApIHJldHVybiBcIldvcmxkXCI7XG5cdHJldHVybiBcIltbQkFEXV1cIjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8vIHBvb3IgbWFuJ3MgZW51bVxuXHRGb29sOiBGb29sLFxuXHRNYWdpY2lhbjogTWFnaWNpYW4sXG5cdFByaWVzdGVzczogUHJpZXN0ZXNzLFxuXHRFbXByZXNzOiBFbXByZXNzLFxuXHRFbXBlcm9yOiBFbXBlcm9yLFxuXHRIaWVyb3BoYW50OiBIaWVyb3BoYW50LFxuXHRMb3ZlcnM6IExvdmVycyxcblx0Q2hhcmlvdDogQ2hhcmlvdCxcblx0SnVzdGljZTogSnVzdGljZSxcblx0SGVybWl0OiBIZXJtaXQsXG5cdEZvcnR1bmU6IEZvcnR1bmUsXG5cdFN0cmVuZ3RoOiBTdHJlbmd0aCxcblx0SGFuZ2VkTWFuOiBIYW5nZWRNYW4sXG5cdERlYXRoOiBEZWF0aCxcblx0VGVtcGVyYW5jZTogVGVtcGVyYW5jZSxcblx0RGV2aWw6IERldmlsLFxuXHRUb3dlcjogVG93ZXIsXG5cdFN0YXI6IFN0YXIsXG5cdE1vb246IE1vb24sXG5cdFN1bjogU3VuLFxuXHRKdWRnZW1lbnQ6IEp1ZGdlbWVudCxcblx0SmVzdGVyOiBKZXN0ZXIsXG5cdEFlb246IEFlb24sXG5cdFdvcmxkOiBXb3JsZCxcblxuXHQvLyBvcmRlcmVkIHZlcnNpb24sIGZvciBzb3J0aW5nIVxuXHRPcmRlcmVkOiBbIEZvb2wsIE1hZ2ljaWFuLCBQcmllc3Rlc3MsIEVtcHJlc3MsIEVtcGVyb3IsIEhpZXJvcGhhbnQsIExvdmVycywgQ2hhcmlvdCwgSnVzdGljZSwgSGVybWl0LCBGb3J0dW5lLCBTdHJlbmd0aCwgSGFuZ2VkTWFuLCBEZWF0aCwgVGVtcGVyYW5jZSwgRGV2aWwsIFRvd2VyLCBTdGFyLCBNb29uLCBTdW4sIEp1ZGdlbWVudCwgSmVzdGVyLCBBZW9uLCBXb3JsZCBdLFxuXG5cdENvdW50OiBOdW1BcmNhbmEsXG5cblx0Ly8gXCJzdGF0aWNcIiBtZXRob2RzXG5cdEdldE5vcm1hbFJlc3VsdDogR2V0Tm9ybWFsUmVzdWx0LFxuXHRHZXRUcmlhbmdsZVJlc3VsdDogR2V0VHJpYW5nbGVSZXN1bHQsXG5cdEJhY2tDYWxjTm9ybWFsOiBCYWNrQ2FsY05vcm1hbCxcblx0QmFja0NhbGNUcmlhbmdsZTogQmFja0NhbGNUcmlhbmdsZSxcblx0VG9TdHJpbmc6IFRvU3RyaW5nXG59IiwiLyoqXG4gKiBzY3JpcHRzL21haW4uanNcbiAqXG4gKiBUaGlzIGlzIHRoZSBzdGFydGluZyBwb2ludCBmb3IgeW91ciBhcHBsaWNhdGlvbi5cbiAqIFRha2UgYSBsb29rIGF0IGh0dHA6Ly9icm93c2VyaWZ5Lm9yZy8gZm9yIG1vcmUgaW5mb1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbnZhciBBcmNhbmEgPSByZXF1aXJlKCcuL2FyY2FuYS5qcycpO1xudmFyIFBlcnNvbmEgPSByZXF1aXJlKCcuL3BlcnNvbmEuanMnKTtcblxuXG52YXIgc29ydGVkQnlOYW1lUGVyc29uYSA9IFBlcnNvbmEuQnlMZXZlbC5zb3J0KGZ1bmN0aW9uKGEsIGIpICB7XG4gICAgaWYoIGEubmFtZSA+IGIubmFtZSApIHJldHVybiAxO1xuICAgIGlmKCBhLm5hbWUgPCBiLm5hbWUgKSByZXR1cm4gLTE7XG4gICAgcmV0dXJuIDA7XG59KTtcbnZhciBwZXJzb25hTmFtZXNJbk9yZGVyID0gc29ydGVkQnlOYW1lUGVyc29uYS5tYXAoZnVuY3Rpb24ocGVyc29uYSl7IHJldHVybiBwZXJzb25hLm5hbWU7IH0pXG5cbmZ1bmN0aW9uIGRyYXdJbmRpdmlkdWFsKHJlc3VsdCkge1xuICAgIHZhciAkcmVzdWx0cyA9ICQoXCIjcmVzdWx0c1wiKS5lbXB0eSgpO1xuICAgIHZhciByZXN1bHRUZXh0ID0gXCJObyByZXN1bHRzIGZvdW5kXCI7XG4gICAgaWYoICEhcmVzdWx0ICkge1xuICAgICAgICByZXN1bHRUZXh0ID0gUGVyc29uYS5Ub1N0cmluZyhyZXN1bHQpO1xuICAgIH1cbiAgICAkcmVzdWx0cy5hcHBlbmQoJChcIjxkaXYgY2xhc3M9J2NvbHVtbic+PC9kaXY+XCIpLnRleHQocmVzdWx0VGV4dCkpO1xufVxuXG5mdW5jdGlvbiBkcmF3UmVzdWx0cyhyZXN1bHRzQXJyYXkpIHtcbiAgICB2YXIgJHJlc3VsdHMgPSAkKFwiI3Jlc3VsdHNcIikuZW1wdHkoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgISFyZXN1bHRzQXJyYXkgJiYgaSA8IHJlc3VsdHNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c0FycmF5W2ldO1xuICAgICAgICB2YXIgJHJvdyA9ICQoXCI8dWw+PC91bD5cIikuYWRkQ2xhc3MoJ3NtYWxsLWJsb2NrLWdyaWQtJytyZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2ogKSB7XG4gICAgICAgICAgICAkcm93LmFwcGVuZCgkKFwiPGxpPjwvbGk+XCIpLnRleHQoUGVyc29uYS5Ub1N0cmluZyhyZXN1bHRbal0pKSk7XG5cbiAgICAgICAgfVxuICAgICAgICAkcmVzdWx0cy5hcHBlbmQoJHJvdyk7XG4gICAgfTtcbn1cblxudmFyIHRyaWFuZ2xlID0gZmFsc2U7XG5mdW5jdGlvbiByZWNhbGN1bGF0ZUZ1c2lvbigpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICB2YXIgZmlyc3ROYW1lID0gJChcIiNmaXJzdEZ1c2lvblwiKS52YWwoKTtcbiAgICB2YXIgc2Vjb25kTmFtZSA9ICQoXCIjc2Vjb25kRnVzaW9uXCIpLnZhbCgpO1xuICAgIHZhciB0aGlyZE5hbWUgPSAkKFwiI3RoaXJkRnVzaW9uXCIpLnZhbCgpO1xuXG4gICAgaWYoICEhZmlyc3ROYW1lICYmICEhc2Vjb25kTmFtZSApIHtcbiAgICAgICAgdmFyIGZpcnN0UGVyc29uYSA9IFBlcnNvbmEuQnlOYW1lW2ZpcnN0TmFtZV07XG4gICAgICAgIHZhciBzZWNvbmRQZXJzb25hID0gUGVyc29uYS5CeU5hbWVbc2Vjb25kTmFtZV07XG4gICAgICAgIHZhciB0cmlhbmdsZSA9ICEhdGhpcmROYW1lO1xuXG4gICAgICAgIGlmKCB0cmlhbmdsZSApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFBlcnNvbmEuVHJpYW5nbGVDYWxjdWxhdGlvbihmaXJzdFBlcnNvbmEsc2Vjb25kUGVyc29uYSxQZXJzb25hLkJ5TmFtZVt0aGlyZE5hbWVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFBlcnNvbmEuTm9ybWFsQ2FsY3VsYXRpb24oZmlyc3RQZXJzb25hLHNlY29uZFBlcnNvbmEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0luZGl2aWR1YWwocmVzdWx0KTtcbn1cblxuZnVuY3Rpb24gcmVjYWxjdWxhdGVGaXNzaW9uKCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIGNvbnRhaW5pbmdQZXJzb25hID0gdW5kZWZpbmVkO1xuICAgIHZhciBmaXNzaWJsZU5hbWUgPSAkKFwiI2Zpc3NpYmxlXCIpLnZhbCgpO1xuICAgIHZhciBjb250YWluaW5nTmFtZSA9ICQoXCIjY29udGFpbmluZ1wiKS52YWwoKTtcbiAgICBpZighIWNvbnRhaW5pbmdOYW1lKSB7XG4gICAgICAgIGNvbnRhaW5pbmdQZXJzb25hID0gUGVyc29uYS5CeU5hbWVbY29udGFpbmluZ05hbWVdO1xuICAgIH1cblxuICAgIGlmKCAhIWZpc3NpYmxlTmFtZSApIHtcbiAgICAgICAgdmFyIGZpc3NpYmxlUGVyc29uYSA9IFBlcnNvbmEuQnlOYW1lW2Zpc3NpYmxlTmFtZV07XG4gICAgICAgIGlmKCB0cmlhbmdsZSApIHtcbiAgICAgICAgICAgIGlmKCAhIWNvbnRhaW5pbmdQZXJzb25hICkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBQZXJzb25hLkJhY2tDYWxjVHJpYW5nbGUoZmlzc2libGVQZXJzb25hLGNvbnRhaW5pbmdQZXJzb25hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgICAgXG4gICAgICAgICAgICByZXN1bHRzID0gUGVyc29uYS5CYWNrQ2FsY05vcm1hbChmaXNzaWJsZVBlcnNvbmEsY29udGFpbmluZ1BlcnNvbmEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd1Jlc3VsdHMocmVzdWx0cyk7XG59XG5cbiQoZnVuY3Rpb24oKXtcbiAgICB2YXIgJHNlbGVjdHMgPSAkKFwic2VsZWN0LnBlcnNvbmFcIik7XG4gICAgJHNlbGVjdHMuZW1wdHkoKTtcbiAgICAkc2VsZWN0cy5hcHBlbmQoJChcIjxvcHRpb24+PC9vcHRpb24+XCIpKTtcbiAgICAkLmVhY2goc29ydGVkQnlOYW1lUGVyc29uYSwgZnVuY3Rpb24oaSxlKSB7XG4gICAgICAgICRzZWxlY3RzLmFwcGVuZCgkKFwiPG9wdGlvbj5cIitQZXJzb25hLlRvU3RyaW5nKGUpK1wiPC9vcHRpb24+XCIpLnZhbChlLm5hbWUpKTtcbiAgICB9KTtcblxuICAgICQoXCIjdHJpbmFyeUZpc3Npb25cIikuY2hhbmdlKGZ1bmN0aW9uKCl7XG4gICAgICAgIHRyaWFuZ2xlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICAkKFwiI2NvbnRhaW5pbmdcIikudmFsKFwiXCIpO1xuICAgICAgICByZWNhbGN1bGF0ZUZpc3Npb24oKTtcbiAgICB9KTtcblxuICAgICQoXCIjZmlyc3RGdXNpb24sICNzZWNvbmRGdXNpb24sICN0aGlyZEZ1c2lvblwiKS5jaGFuZ2UocmVjYWxjdWxhdGVGdXNpb24pO1xuICAgICQoXCIjZmlzc2libGUsICNjb250YWluaW5nXCIpLmNoYW5nZShyZWNhbGN1bGF0ZUZpc3Npb24pO1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBBcmNhbmEgPSByZXF1aXJlKFwiLi9hcmNhbmFcIik7XG5cbnZhciBwZXJzb25hQnlMdmwgPSBcbiAgICBbe1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb29sLFxuICAgICAgICBuYW1lX2pwOiBcIuOCpOOCtuODiuOCrlwiLFxuICAgICAgICBuYW1lOiBcIkl6YW5hZ2lcIixcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJTdHJcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppbywgQ2xlYXZlLCBSYWt1a2FqYSwgUmFrdW5kYSgzKSwgVGFydWthamEoNSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIk1DJ3MgZGVmYXVsdCBQZXJzb25hXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTWFnaWNpYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44OU44Kv44K344O8XCIsXG4gICAgICAgIG5hbWU6IFwiUGl4aWVcIixcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJEaWEsIFBhdHJhLCBaaW8oMyksIE1lIFBhdHJhKDQpLCBUcmFmdXJpKDgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQ2hhcmlvdCxcbiAgICAgICAgbmFtZV9qcDogXCLjgrnjg6njgqTjg6BcIixcbiAgICAgICAgbmFtZTogXCJTbGltZVwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiRWxpZ29yXCIsIFwiTmF0YSBUYWlzaGlcIl0sXG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQmFzaCwgRXZpbCBUb3VjaCwgVGFydW5kYSgzKSwgUmVkIFdhbGwoNCksIEZlYXIgQm9vc3QoNSksIFJlc2lzdCBQaHlzaWNhbCg3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGV2aWwsXG4gICAgICAgIG5hbWVfanA6IFwi44Km44Kz44OQ44KvXCIsXG4gICAgICAgIG5hbWU6IFwiVWtvYmFjaFwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiTGlsaW1cIiwgXCJWZXRhbGFcIl0sXG4gICAgICAgIGxldmVsOiAzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpLCBTdWt1bmRhLCBQdWxpbnBhKDQpLCBDb25mdXNlIEJvb3N0KDUpLCBSZXNpc3QgRmlyZSg2KSwgRmlyZSBCcmVhayg3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgqjjg7Pjgrjjgqfjg6tcIixcbiAgICAgICAgbmFtZTogXCJBbmdlbFwiLFxuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCJTdHJcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydSwgUGF0cmEsIEhhbWEoNSksIFN1a3VrYWphKDYpLCBSZWdlbmVyYXRlIDEoOCksIEhhbWEgQm9vc3QoOSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIll1a2lrbydzIENhc3RsZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRlbXBlcmFuY2UsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44OX44K144Op44K5XCIsXG4gICAgICAgIG5hbWU6IFwiQXBzYXJhc1wiLFxuICAgICAgICBsZXZlbDogNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJQYXRyYSwgRGlhLCBSYWt1bmRhKDUpLCBNZSBQYXRyYSg2KSwgQnVmdSg3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIll1a2lrbydzIENhc3RsZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuOCtuODs+ODiOODnuODs1wiLFxuICAgICAgICBuYW1lOiBcIlNhbmRtYW5cIixcbiAgICAgICAgbGV2ZWw6IDUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1LCBQdWxpbnBhLCBTa3VsbCBDcmFja2VyKDYpLCBDb25mdXNlIEJvb3N0KDcpLCBEZWthamEoOCksIFRyYWVzdG8oMTEpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuODiuOCv+OCv+OCpOOCt1wiLFxuICAgICAgICBuYW1lOiBcIk5hdGEgVGFpc2hpXCIsXG4gICAgICAgIGxldmVsOiA2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQmFzaCwgUmFrdW5kYSwgRGVrdW5kYSwgU29uaWMgUHVuY2goNyksIERvZGdlIEljZSg4KSwgUmVzaXN0IERpenp5KDkpLCBTb3VsIEJyZWFrKDEwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGVybWl0LFxuICAgICAgICBuYW1lX2pwOiBcIuODleOCqeODq+ODjeOCpuOCuVwiLFxuICAgICAgICBuYW1lOiBcIkZvcm5ldXNcIixcbiAgICAgICAgbGV2ZWw6IDYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJ1ZnUsIFNrZXdlciwgVGFydWthamEsIFJha3VuZGEoNyksIFBvaXNtYSg4KSwgRG9kZ2UgRWxlYygxMClcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9vbCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6jjg6Ljg4TjgrfjgrPjg6FcIixcbiAgICAgICAgbmFtZTogXCJZb21vdHN1LXNoaWtvbWVcIixcbiAgICAgICAgbGV2ZWw6IDcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJQb2lzbWEsIFNrZXdlciwgRXZpbCBUb3VjaCwgU3VrdW5kYSg5KSwgTXVkbygxMCksIEdoYXN0bHkgV2FpbCgxMSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGUsIFN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IaWVyb3BoYW50LFxuICAgICAgICBuYW1lX2pwOiBcIuOCquODouOCpOOCq+ODjVwiLFxuICAgICAgICBuYW1lOiBcIk9tb2lrYW5lXCIsXG4gICAgICAgIGxldmVsOiA3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlN0clwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvLCBTdWt1bmRhLCBUYXJ1bmRhLCBQb2lzb24gTWlzdCg4KSwgUmVzaXN0IFdpbmQoOSksIERvZGdlIEljZSgxMCksIFJlc2lzdCBQb2lzb24oMTEpLCBSZXNpc3QgRWxlYygxMilcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIll1a2lrbydzIENhc3RsZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1hZ2ljaWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCquODreODkOOCuVwiLFxuICAgICAgICBuYW1lOiBcIk9yb2Jhc1wiLFxuICAgICAgICBsZXZlbDogOCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaSwgSHlzdGVyaWNhbCBTbGFwLCBEZWthamEsIERvZGdlIEljZSgxMCksIFJlc2lzdCBEaXp6eSgxMSksIFNoYXJwIFN0dWRlbnQoMTIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGUsIFN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdHJlbmd0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjg7TjgqHjg6vjgq3jg6rjg7xcIixcbiAgICAgICAgbmFtZTogXCJWYWxreXJpZVwiLFxuICAgICAgICBsZXZlbDogOCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJ1ZnUsIENsZWF2ZSwgUmFrdW5kYSwgTWVkaWEoMTApLCBBcm0gQ2hvcHBlcigxMSksIE1hYnVmdSgxMilcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRW1wcmVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjgrvjg7Pjg6pcIixcbiAgICAgICAgbmFtZTogXCJTZW5yaVwiLFxuICAgICAgICBsZXZlbDogOSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYSwgTWFrYWphbSwgQWdpLCBEZWt1bmRhKDEwKSwgTWVkaWEoMTEpLCBUcmFmdXJpKDE0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIll1a2lrbydzIENhc3RsZSwgU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRlYXRoLFxuICAgICAgICBuYW1lX2pwOiBcIuOCsOODvOODq1wiLFxuICAgICAgICBuYW1lOiBcIkdob3VsXCIsXG4gICAgICAgIGxldmVsOiA5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJhc2gsIFBvaXNtYSwgU3VrdWthamEoMTApLCBFbmVydmF0aW9uKDExKSwgUG9pc29ub3VzIFNrZXdlcigxMiksIFJha3VuZGEoMTMpLCBQb2lzb24gQm9vc3QoMTQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiQmFkIFN0YXRcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlLCBTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGV2aWwsXG4gICAgICAgIG5hbWVfanA6IFwi44Oq44Oq44OgXCIsXG4gICAgICAgIG5hbWU6IFwiTGlsaW1cIixcbiAgICAgICAgbGV2ZWw6IDEwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJTdHJcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvLCBNdWRvLCBFbmVydmF0aW9uLCBFbmVydmF0ZSBCb29zdCgxMiksIFN1a3VrYWphKDEzKSwgTWFtdWRvKDE1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkRhcmtcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlLCBTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3VuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCq+ODvOOCt+ODvFwiLFxuICAgICAgICBuYW1lOiBcIkN1IFNpdGhcIixcbiAgICAgICAgbGV2ZWw6IDEwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydSwgUHVsaW5wYSwgUmFrdWthamEsIEdyb3d0aCAxKDExKSwgTWFnYXJ1KDEzKSwgV2hpdGUgV2FsbCgxNCksIFRyYWVzdG8oMTUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGUsIFN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44K144Kt44Of44K/44OeXCIsXG4gICAgICAgIG5hbWU6IFwiU2FraSBNaXRhbWFcIixcbiAgICAgICAgbGV2ZWw6IDExLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRGlhLCBCdWZ1LCBTdWt1bmRhLCBBbGVydG5lc3MoMTMpLCBNZWRpYSgxNCksIE51bGwgUmFnZSgxNilcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg7zjgq/jgqjjg7Pjgrjjgqfjg6tcIixcbiAgICAgICAgbmFtZTogXCJBcmNoYW5nZWxcIixcbiAgICAgICAgbGV2ZWw6IDExLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiSGFtYSwgRG91YmxlIEZhbmdzLCBQYXRyYSwgTWVkaWEoMTIpLCBNdXp6bGUgU2hvdCgxMyksIFNoYXJwIFN0dWRlbnQoMTQpLCBTdXJ2aXZlIERhcmsoMTUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRlbXBlcmFuY2UsXG4gICAgICAgIG5hbWVfanA6IFwi44K344Or44OVXCIsXG4gICAgICAgIG5hbWU6IFwiU3lscGhcIixcbiAgICAgICAgbGV2ZWw6IDExLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydSwgU3VrdWthamEsIE1lIFBhdHJhLCBSZWdlbmVyYXRlIDEoMTIpLCBNZWRpYSgxMyksIE1hZ2FydSgxNClcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXBlcm9yLFxuICAgICAgICBuYW1lX2pwOiBcIuOCquODmeODreODs1wiLFxuICAgICAgICBuYW1lOiBcIk9iZXJvblwiLFxuICAgICAgICBsZXZlbDogMTIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppbywgQXJtIENob3BwZXIsIE1ha2FqYW0oMTMpLCBNZWRpYSgxNCksIEVsZWMgQm9vc3QoMTUpLCBNYXppbygxNiksIERvZGdlIFdpbmQoMTcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuOCqOODquOCtOODvOODq1wiLFxuICAgICAgICBuYW1lOiBcIkVsaWdvclwiLFxuICAgICAgICBsZXZlbDogMTIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiU3RyXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlBvaXNvbm91cyBTa2V3ZXIsIEFnaSwgTWFyYWdpKDEzKSwgQXJtIENob3BwZXIoMTQpLCBGaXJlIEJvb3N0KDE1KSwgU291bCBCcmVhaygxNiksIFJlc2lzdCBFeGhhdXN0KDE3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvb2wsXG4gICAgICAgIG5hbWVfanA6IFwi44Kq44OQ44Oq44Oo44OzXCIsXG4gICAgICAgIG5hbWU6IFwiT2Jhcml5b25cIixcbiAgICAgICAgbGV2ZWw6IDEzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlNvbmljIFB1bmNoLCBUYXJ1a2FqYSwgRGVrYWphLCBNdXp6bGUgU2hvdCgxNCksIFNpbGVuY2UgQm9vc3QoMTUpLCBSZXNpc3QgUGh5c2ljYWwoMTcpLCBTaW5nbGUgU2hvdCgxOClcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdHJlbmd0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjg4bjgqPjgr/jg7zjg7NcIixcbiAgICAgICAgbmFtZTogXCJUaXRhblwiLFxuICAgICAgICBsZXZlbDogMTQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiU3RyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXppbywgU2t1bGwgQ3JhY2tlciwgRGVrdW5kYSwgRG9kZ2UgSWNlKDE2KSwgS2lsbCBSdXNoKDE4KSwgUmVzaXN0IEZlYXIoMTkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGVhdGgsXG4gICAgICAgIG5hbWVfanA6IFwi44Oi44Kz44KkXCIsXG4gICAgICAgIG5hbWU6IFwiTW9rb2lcIixcbiAgICAgICAgbGV2ZWw6IDE0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiU29uaWMgUHVuY2gsIEh5c3RlcmljYWwgU2xhcCwgRGVrYWphLCBWYWxpYW50IERhbmNlKDE1KSwgUmFnZSBCb29zdCgxNiksIFNvdWwgQnJlYWsoMTgpLCBFeGhhdXN0IEJvb3N0KDE5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlN1cHBvcnRcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhpZXJvcGhhbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44Oz44K644O8XCIsXG4gICAgICAgIG5hbWU6IFwiQW56dVwiLFxuICAgICAgICBsZXZlbDogMTUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiU3RyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnUsIEJhbHphYywgQWxlcnRuZXNzLCBNYWdhcnUoMTcpLCBSZWQgV2FsbCgxOCksIE1haGFtYSgxOSksIEF1dG8tU3VrdWthamEoMjApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGFuZ2VkTWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODmeODquOCuVwiLFxuICAgICAgICBuYW1lOiBcIkJlcml0aFwiLFxuICAgICAgICBsZXZlbDogMTUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJTaW5nbGUgU2hvdCwgTXVkbywgTWFyYWdpKDE2KSwgTXVkbyBCb29zdCgxNyksIEdyZWVuIFdhbGwoMTgpLCBCcmFpbiBTaGFrZSgxOSksIFJlc2lzdCBDb25mdXNlKDIwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTWFnaWNpYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44K444Oj44OD44Kv44OV44Ot44K544OIXCIsXG4gICAgICAgIG5hbWU6IFwiSmFjayBGcm9zdFwiLFxuICAgICAgICBsZXZlbDogMTYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWJ1ZnUsIEljZSBCcmVhaywgTWUgUGF0cmEsIEljZSBCb29zdCgxOCksIEJ1ZnVsYSgxOSksIERvZGdlIEZpcmUoMjApLCBNaW5kIENoYXJnZSgyNSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZSwgTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgqvjgqTjg4FcIixcbiAgICAgICAgbmFtZTogXCJYaWV6aGFpXCIsXG4gICAgICAgIGxldmVsOiAxNixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppbywgTWF6aW8sIFJha3VuZGEsIE1ha2FqYW0oMTcpLCBTaWxlbmNlIEJvb3N0KDE4KSwgUmFtcGFnZSgxOSksIEVsZWMgQm9vc3QoMjEpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44K144Op44K544O044Kh44OG44KjXCIsXG4gICAgICAgIG5hbWU6IFwiU2FyYXN2YXRpXCIsXG4gICAgICAgIGxldmVsOiAxNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZGlhLCBNYWJ1ZnUsIFBhdHJhLCBJbnZpZ29yYXRlIDIoMTkpLCBSZXNpc3QgUmFnZSgyMCksIERla2FqYSgyMSksIE51bGwgV2luZCgyMylcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IZXJtaXQsXG4gICAgICAgIG5hbWVfanA6IFwi44Kk44OD44Od44Oz44OA44K/44OpXCIsXG4gICAgICAgIG5hbWU6IFwiSXBwb24tZGF0YXJhXCIsXG4gICAgICAgIGxldmVsOiAxNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTXVkbywgTWFyYWdpLCBNYW11ZG8oMTkpLCBBZ2lsYW8oMjApLCBSYW1wYWdlKDIxKSwgTXVkbyBCb29zdCgyMilcIixcbiAgICAgICAgaW5oZXJpdDogXCJEYXJrXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcHJlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44Ok44Kv44K344OL44O8XCIsXG4gICAgICAgIG5hbWU6IFwiWWFrc2luaVwiLFxuICAgICAgICBsZXZlbDogMTgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIlN0clwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hYnVmdSwgUmFrdW5kYSwgU3dpZnQgU3RyaWtlKDIwKSwgSWNlIEJvb3N0KDIxKSwgQnVmdWxhKDIyKSwgQXV0by1UYXJ1a2FqYSgyMylcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZSwgTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQ2hhcmlvdCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg6njg5/jgr/jg55cIixcbiAgICAgICAgbmFtZTogXCJBcmEgTWl0YW1hXCIsXG4gICAgICAgIGxldmVsOiAxOCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFzc2F1bHQgRGl2ZSwgUmFrdW5kYSwgVGFydWthamEoMjApLCBTaGFycCBTdHVkZW50KDIxKSwgQmx1ZSBXYWxsKDIyKSwgRG9kZ2UgRWxlYygyMylcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2UsIE1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkFlb24sXG4gICAgICAgIG5hbWU6IFwiQW1lLW5vLVV6dW1lXCIsXG4gICAgICAgIGxldmVsOiAxOCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1c3RpY2UsXG4gICAgICAgIG5hbWVfanA6IFwi44OX44Oq44Oz44K344OR44Oq44OG44KjXCIsXG4gICAgICAgIG5hbWU6IFwiUHJpbmNpcGFsaXR5XCIsXG4gICAgICAgIGxldmVsOiAxOSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkhhbWEsIFR3aW4gU2hvdCwgTWFoYW1hKDIxKSwgTWVkaWEoMjIpLCBSZXNpc3QgQ29uZnVzZSgyMyksIFN1cnZpdmUgRGFyaygyNCksIFRldHJhamEoMjUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZSwgTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGV2aWwsXG4gICAgICAgIG5hbWVfanA6IFwi44O044Kn44O844K/44OpXCIsXG4gICAgICAgIG5hbWU6IFwiVmV0YWxhXCIsXG4gICAgICAgIGxldmVsOiAxOSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJTdHJcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRm9vbGlzaCBXaGlzcGVyLCBFdmlsIFRvdWNoLCBMaWZlIERyYWluKDIwKSwgRm91bCBCcmVhdGgoMjEpLCBCcmFpbiBTaGFrZSgyMiksIEdoYXN0bHkgV2FpbCgyMyksIEZlYXIgQm9vc3QoMjQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiQmFkIFN0YXRcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZSwgTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg7Pjg4njg6njgrlcIixcbiAgICAgICAgbmFtZTogXCJBbmRyYXNcIixcbiAgICAgICAgbGV2ZWw6IDIwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWVkaWEsIE1hemlvLCBTdWt1a2FqYSwgQmx1ZSBXYWxsKDIyKSwgUmVnZW5lcmF0ZSAyKDIzKSwgWmlvbmdhKDI0KSwgRG9kZ2UgV2luZCgyNSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Ob44Km44Kq44KmXCIsXG4gICAgICAgIG5hbWU6IFwiUGhvZW5peFwiLFxuICAgICAgICBsZXZlbDogMjAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1bGEsIE1hcmFnaSwgVHdpbiBTaG90KDIyKSwgR3Jvd3RoIDEoMjMpLCBEb2RnZSBJY2UoMjUpLCBGaXJlIEJvb3N0KDI2KSwgTWFyYWdpb24oMjcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KZXN0ZXIsXG4gICAgICAgIG5hbWU6IFwiR3VyclwiLFxuICAgICAgICBsZXZlbDogMjAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiU3RyXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb29sLFxuICAgICAgICBuYW1lX2pwOiBcIuODrOOCruOCquODs1wiLFxuICAgICAgICBuYW1lOiBcIkxlZ2lvblwiLFxuICAgICAgICBsZXZlbDogMjEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJTdHJcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiVGVudGFyYWZvbywgTXVkbywgRXZpbCBTbWlsZSwgUmFtcGFnZSgyMyksIENvbmZ1c2UgQm9vc3QoMjQpLCBGb3VsIEJyZWF0aCgyNSksIFN1cnZpdmUgTGlnaHQoMjYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiQmFkIFN0YXRcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGllcm9waGFudCxcbiAgICAgICAgbmFtZV9qcDogXCLjgrfjg7zjgrXjg7xcIixcbiAgICAgICAgbmFtZTogXCJTaGlpc2FhXCIsXG4gICAgICAgIGxldmVsOiAyMSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hemlvLCBCYWx6YWMsIFJha3VrYWphKDIyKSwgWmlvbmdhKDIzKSwgU2lsZW5jZSBCb29zdCgyNCksIFJlc2lzdCBGaXJlKDI1KSwgTnVsbCBSYWdlKDI2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuUHJpZXN0ZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuODj+OCpOODlOOCr+OCt+ODvFwiLFxuICAgICAgICBuYW1lOiBcIkhpZ2ggUGl4aWVcIixcbiAgICAgICAgbGV2ZWw6IDIyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWF6aW8sIFN1a3VrYWphLCBNZSBQYXRyYSwgWmlvbmdhKDI0KSwgSW52aWdvcmF0ZSAxKDI1KSwgRG9kZ2UgRmlyZSgyNiksIFRyYWZ1cmkoMjcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXBlcm9yLFxuICAgICAgICBuYW1lX2pwOiBcIuOCreODs+OCsOODleODreOCueODiFwiLFxuICAgICAgICBuYW1lOiBcIktpbmcgRnJvc3RcIixcbiAgICAgICAgbGV2ZWw6IDIyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCdWZ1bGEsIE1hYnVmdSwgSWNlIEJyZWFrLCBSYWt1a2FqYSgyMyksIERvZGdlIEZpcmUoMjQpLCBJY2UgQm9vc3QoMjYpLCBOdWxsIEZpcmUoMjcpLCBBbmltYSBGcmVlemUoMjgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhhbmdlZE1hbixcbiAgICAgICAgbmFtZV9qcDogXCLjg6jjg6Ljg4TjgqTjgq/jgrVcIixcbiAgICAgICAgbmFtZTogXCJZb21vdHN1LWlrdXNhXCIsXG4gICAgICAgIGxldmVsOiAyMixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQ2VsbCBCcmVha2VyLCBNYWJ1ZnUsIEVuZXJ2YXRlIEJvb3N0KDI0KSwgRm91bCBCcmVhdGgoMjUpLCBQb2lzb24gTWlzdCgyNiksIFBvaXNvbiBCb29zdCgyNylcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdHJlbmd0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6njgq/jgrfjg6Pjg7zjgrVcIixcbiAgICAgICAgbmFtZTogXCJSYWtzaGFzYVwiLFxuICAgICAgICBsZXZlbDogMjMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJLaWxsIFJ1c2gsIEJyYWluIFNoYWtlLCBDb3VudGVyLCBHYWxlIFNsYXNoKDI1KSwgQXV0by1UYXJ1a2FqYSgyNiksIERvZGdlIFBoeXNpY2FsKDI3KSwgUG93ZXIgQ2hhcmdlKDI4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg4vjgq7jg5/jgr/jg55cIixcbiAgICAgICAgbmFtZTogXCJOaWdpIE1pdGFtYVwiLFxuICAgICAgICBsZXZlbDogMjMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJOdWxcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJEaWFyYW1hLCBNZSBQYXRyYSwgUmUgUGF0cmEsIFJlY2FybSgyNSksIEludmlnb3JhdGUgMigyNiksIEdhcnVsYSgyOCksIFJlc2lzdCBFbmVydmF0ZSgyOSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZWF0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjg57jgr/jg4njg7zjg6tcIixcbiAgICAgICAgbmFtZTogXCJNYXRhZG9yXCIsXG4gICAgICAgIGxldmVsOiAyNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFtdWRvLCBTd2lmdCBTdHJpa2UsIERla3VuZGEsIE11ZG8gQm9vc3QoMjYpLCBSYW1wYWdlKDI3KSwgQXV0by1TdWt1a2FqYSgyOSksIFN1cnZpdmUgTGlnaHQoMzApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdGFyLFxuICAgICAgICBuYW1lX2pwOiBcIuOCreOCpuODs1wiLFxuICAgICAgICBuYW1lOiBcIkthaXdhblwiLFxuICAgICAgICBsZXZlbDogMjQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJXa1wiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJUZXRyYWthcm4sIENlbGwgQnJlYWtlciwgTWFtdWRvLCBTdGFnbmFudCBBaXIoMjYpLCBSZXNpc3QgTGlnaHQoMjcpLCBMaWZlIERyYWluKDI4KSwgU3Bpcml0IERyYWluKDI5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlN1cHBvcnRcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQWVvbixcbiAgICAgICAgbmFtZTogXCJOYXJjaXNzdXNcIixcbiAgICAgICAgbGV2ZWw6IDI0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiV2tcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiU3RyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5NYWdpY2lhbixcbiAgICAgICAgbmFtZV9qcDogXCLjgqvjg4/jgq9cIixcbiAgICAgICAgbmFtZTogXCJIdWEgUG9cIixcbiAgICAgICAgbGV2ZWw6IDI1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpbGFvLCBSYWt1a2FqYSwgUmUgUGF0cmEsIEZpcmUgQnJlYWsoMjYpLCBNYWthamFtKDI3KSwgRG9kZ2UgSWNlKDI5KSwgRmlyZSBCb29zdCgzMClcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkxvdmVycyxcbiAgICAgICAgbmFtZV9qcDogXCLjgq/jgqTjg7zjg7Pjg6HjgqTjg5ZcIixcbiAgICAgICAgbmFtZTogXCJRdWVlbiBNYWJcIixcbiAgICAgICAgbGV2ZWw6IDI1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvbmdhLCBUZW50YXJhZm9vLCBEZWt1bmRhLCBSZWNhcm0oMjYpLCBEb2RnZSBXaW5kKDI3KSwgTWF6aW9uZ2EoMjkpLCBSZXNpc3QgQ29uZnVzZSgzMClcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODrOOCuVwiLFxuICAgICAgICBuYW1lOiBcIkFyZXNcIixcbiAgICAgICAgbGV2ZWw6IDI1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYWxlIFNsYXNoLCBDb3VudGVyLCBEb2RnZSBXaW5kKDI3KSwgUmFtcGFnZSgyOCksIERla2FqYSgyOSksIFBvd2VyIENoYXJnZSgzMClcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcHJlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44OG44Kj44K/44O844OL44KiXCIsXG4gICAgICAgIG5hbWU6IFwiVGl0YW5pYVwiLFxuICAgICAgICBsZXZlbDogMjYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJEaWFyYW1hLCBNYWdhcnUsIFJlZCBXYWxsKDI3KSwgR2FydWxhKDI5KSwgUmVnZW5lcmF0ZSAyKDMxKSwgTWluZCBDaGFyZ2UoMzIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhlcm1pdCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6njg5/jgqJcIixcbiAgICAgICAgbmFtZTogXCJMYW1pYVwiLFxuICAgICAgICBsZXZlbDogMjYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlN0clwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJQb2lzb24gTWlzdCwgQWdpbGFvLCBOZXJ2dW5kaSwgUG9pc29uIEJvb3N0KDI4KSwgTnVsbCBQb2lzb24oMjkpLCBTb3VsIEJyZWFrKDMwKSwgTWFyYWdpb24oMzIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiQmFkIFN0YXRcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg5Hjg6/jg7xcIixcbiAgICAgICAgbmFtZTogXCJQb3dlclwiLFxuICAgICAgICBsZXZlbDogMjcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJIYW1hLCBUZW50YXJhZm9vLCBNYWhhbWEsIFppb25nYSgyOSksIFBvd2VyIFNsYXNoKDMwKSwgSGFtYSBCb29zdCgzMSksIFN1cnZpdmUgRGFyaygzMiksIE51bGwgQ29uZnVzZSgzMylcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IYW5nZWRNYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Oe44Kr44OfXCIsXG4gICAgICAgIG5hbWU6IFwiTWFrYW1pXCIsXG4gICAgICAgIGxldmVsOiAyNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpbGFvLCBTdWt1bmRhLCBBdXRvLVN1a3VrYWphKDI5KSwgRGlhcmFtYSgzMCksIFJlc2lzdCBTaWxlbmNlKDMxKSwgRG9kZ2UgUGh5c2ljYWwoMzIpLCBSZXNpc3QgSWNlKDMzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjg47jgrrjg4FcIixcbiAgICAgICAgbmFtZTogXCJOb3p1Y2hpXCIsXG4gICAgICAgIGxldmVsOiAyNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiUG9pc29uIE1pc3QsIEVuZXJ2YXRpb24sIEFpbG1lbnQgQm9vc3QsIFppb25nYSgyOSksIFJha3VrYWphKDMwKSwgTnVsbCBQb2lzb24oMzEpLCBOdWxsIEVuZXJ2YXRlKDMyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZSwgVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkplc3RlcixcbiAgICAgICAgbmFtZTogXCJUYWtlLU1pbmFrYXRhXCIsXG4gICAgICAgIGxldmVsOiAyNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiU3RyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sICAgIFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3RyZW5ndGgsXG4gICAgICAgIG5hbWVfanA6IFwi44Kv44K344Of44K/44OeXCIsXG4gICAgICAgIG5hbWU6IFwiS3VzaSBNaXRhbWFcIixcbiAgICAgICAgbGV2ZWw6IDI4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydWxhLCBaaW9uZ2EsIFNvdWwgQnJlYWssIFN1cnZpdmUgTGlnaHQoMzEpLCBTdXJ2aXZlIERhcmsoMzIpLCBUcmFlc3RvKDMzKSwgRXhoYXVzdCBCb29zdCgzNClcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZSwgVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRldmlsLFxuICAgICAgICBuYW1lX2pwOiBcIuOCpOODs+OCreODpeODkOOCuVwiLFxuICAgICAgICBuYW1lOiBcIkluY3VidXNcIixcbiAgICAgICAgbGV2ZWw6IDI4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lsYW8sIEV2aWwgU21pbGUsIE1pbmQgU2xpY2UsIFN0YWduYW50IEFpcigzMCksIFNwaXJpdCBEcmFpbigzMiksIEdoYXN0bHkgV2FpbCgzMylcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2UsIFZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44Ks44Oz44Ks44O8XCIsXG4gICAgICAgIG5hbWU6IFwiR2FuZ2FcIixcbiAgICAgICAgbGV2ZWw6IDI5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQnVmdWxhLCBEaWFyYW1hLCBEZWthamEsIE1pbmQgU2xpY2UoMzEpLCBDb25mdXNlIEJvb3N0KDMyKSwgTWVkaWFyYW1hKDMzKSwgRXZhZGUgRmlyZSgzNSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlLCBWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGllcm9waGFudCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6bjg4vjgrPjg7zjg7NcIixcbiAgICAgICAgbmFtZTogXCJVbmljb3JuXCIsXG4gICAgICAgIGxldmVsOiAyOSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9uZ2EsIE1haGFtYSwgTmVydnVuZGksIERla3VuZGEoMzEpLCBUcmFmdXJpKDMyKSwgUmVjYXJtKDMzKSwgTWF6aW9uZ2EoMzQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2UsIFZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdHJlbmd0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqrjg4tcIixcbiAgICAgICAgbmFtZTogXCJPbmlcIixcbiAgICAgICAgbGV2ZWw6IDMwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkZhdGFsIEVuZCwgQ291bnRlciwgQ3J1ZWwgQXR0YWNrLCBBdG9tIFNtYXNoZXIoMzIpLCBSZXNpc3QgUGh5c2ljYWwoMzMpLCBFbmR1cmUoMzQpLCBQb3dlciBDaGFyZ2UoMzUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9vbCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqrjgrtcIixcbiAgICAgICAgbmFtZTogXCJPc2VcIixcbiAgICAgICAgbGV2ZWw6IDMxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJQb3dlciBTbGFzaCwgQXRvbSBTbWFzaGVyLCBQb3dlciBDaGFyZ2UsIFBvaXNvbiBNaXN0KDMzKSwgUG9pc29uIEJvb3N0KDM0KSwgQXV0by1TdWt1a2FqYSgzNSksIFN1cnZpdmUgTGlnaHQoMzYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg5/jg4jjg6lcIixcbiAgICAgICAgbmFtZTogXCJNaXRocmFcIixcbiAgICAgICAgbGV2ZWw6IDMxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWhhbWEsIFNlYWwgQm9tYiwgVGV0cmEgQnJlYWsoMzMpLCBIYW1hb24oMzQpLCBEb2RnZSBFbGVjKDM1KSwgSGFtYSBCb29zdCgzNiksIE51bGwgU2lsZW5jZSgzNylcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3VuLFxuICAgICAgICBuYW1lX2pwOiBcIuODieOCpeODs1wiLFxuICAgICAgICBuYW1lOiBcIkdkb25cIixcbiAgICAgICAgbGV2ZWw6IDMxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJEclwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lsYW8sIE1hcmFnaSwgRmlyZSBCcmVhaywgR3Jvd3RoIDIoMzMpLCBNYXJhZ2lvbigzNCksIEZpcmUgQm9vc3QoMzUpLCBFdmFkZSBJY2UoMzYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQWVvbixcbiAgICAgICAgbmFtZTogXCJTYXRpXCIsXG4gICAgICAgIGxldmVsOiAzMSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5NYWdpY2lhbixcbiAgICAgICAgbmFtZV9qcDogXCLjgrjjg6Pjg4Pjgq/jg6njg7Pjgr/jg7NcIixcbiAgICAgICAgbmFtZTogXCJQeXJvIEphY2tcIixcbiAgICAgICAgbGV2ZWw6IDMyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJEclwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lsYW8sIFRhcnVuZGEsIE1hcmFrdWthamEoMzQpLCBNYXJhZ2lvbigzNiksIEF1dG8tUmFrdWthamEoMzcpLCBSZXNpc3QgSWNlKDM4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0YXIsXG4gICAgICAgIG5hbWVfanA6IFwi44ON44Kz44K344On44Km44Kw44OzXCIsXG4gICAgICAgIG5hbWU6IFwiTmVrbyBTaG9ndW5cIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIlNha2kgTWl0YW1hXCIsIFwiQXJhIE1pdGFtYVwiLCBcIkt1c2kgTWl0YW1hXCIsIFwiTmlnaSBNaXRhbWFcIl0sXG4gICAgICAgIGxldmVsOiAzMixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiUmZcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvbmdhLCBFbGVjIEJvb3N0LCBCbGFjayBTcG90LCBNZWRpYXJhbWEoMzQpLCBNYXRhcnVrYWphKDM1KSwgRXZhZGUgV2luZCgzNiksIERpdmluZSBHcmFjZSgzNylcIixcbiAgICAgICAgaW5oZXJpdDogXCJTdXBwb3J0XCIsXG4gICAgICAgIG5vdGVzOiBcIkNyb3NzIFNwcmVhZFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkxvdmVycyxcbiAgICAgICAgbmFtZV9qcDogXCLjgqbjg7Pjg4fjgqPjg7zjg41cIixcbiAgICAgICAgbmFtZTogXCJVbmRpbmVcIixcbiAgICAgICAgbGV2ZWw6IDMzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJEaWFyYW1hLCBCdWZ1bGEsIFBvc3VtdWRpLCBNYWJ1ZnVsYSgzNCksIE1lZGlhcmFtYSgzNiksIEljZSBCb29zdCgzNylcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg7TjgqHjg7zjg4Hjg6Pjg7xcIixcbiAgICAgICAgbmFtZTogXCJWaXJ0dWVcIixcbiAgICAgICAgbGV2ZWw6IDMzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFoYW1hLCBHYXJ1bGEsIFBvc3VtdWRpLCBGYXRhbCBFbmQoMzUpLCBCbHVlIFdhbGwoMzcpLCBIYW1hIEJvb3N0KDM4KSwgUmVzaXN0IERhcmsoMzkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhlcm1pdCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6Ljgrnjg57jg7NcIixcbiAgICAgICAgbmFtZTogXCJNb3RobWFuXCIsXG4gICAgICAgIGxldmVsOiAzMyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9uZ2EsIFZhbGlhbnQgRGFuY2UsIEZvdWwgQnJlYXRoKDM1KSwgRWxlYyBCcmVhaygzNiksIE1hemlvbmdhKDM3KSwgUmFnZSBCb29zdCgzOClcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXByZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCtOODq+OCtOODs1wiLFxuICAgICAgICBuYW1lOiBcIkdvcmdvblwiLFxuICAgICAgICBsZXZlbDogMzQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCdWZ1bGEsIE1lIFBhdHJhLCBDcmF6eSBDaGFpbigzNSksIE51bGwgQ29uZnVzZSgzNiksIE1hYnVmdWxhKDM4KSwgSWNlIEJvb3N0KDM5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0LCBTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcGVyb3IsXG4gICAgICAgIG5hbWVfanA6IFwi44K744K/44Oz44K/XCIsXG4gICAgICAgIG5hbWU6IFwiU2V0YW50YVwiLFxuICAgICAgICBsZXZlbDogMzQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJGYXRhbCBFbmQsIFppb25nYSwgU2hhcnAgU3R1ZGVudCwgQ291bnRlcnN0cmlrZSgzNiksIFBvd2VyIENoYXJnZSgzOCksIEF1dG8tTWFyYWt1KDM5KSwgTnVsbCBGaXJlKDQwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1vb24sXG4gICAgICAgIG5hbWVfanA6IFwi44Ok44Oe44K/44OO44Kq44Ot44OBXCIsXG4gICAgICAgIG5hbWU6IFwiWWFtYXRhLW5vLU9yb2NoaVwiLFxuICAgICAgICBsZXZlbDogMzQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWJ1ZnVsYSwgR2FydWxhLCBSZWQgV2FsbCwgR3JlZW4gV2FsbCgzNiksIFJlc2lzdCBFbmVydmF0ZSgzOCksIEljZSBCb29zdCgzOSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkplc3RlcixcbiAgICAgICAgbmFtZTogXCJQYWxlIFJpZGVyXCIsXG4gICAgICAgIGxldmVsOiAzNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvcnR1bmUsXG4gICAgICAgIG5hbWVfanA6IFwi44OV44Kp44Or44OI44Kl44OKXCIsXG4gICAgICAgIG5hbWU6IFwiRm9ydHVuYVwiLFxuICAgICAgICBsZXZlbDogMzUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnVsYSwgUmFrdWthamEsIERvZGdlIEVsZWMoMzcpLCBNYWdhcnVsYSgzOCksIEF1dG8tU3VrdWthamEoMzkpLCBXaW5kIEJvb3N0KDQwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRvd2VyLFxuICAgICAgICBuYW1lX2pwOiBcIuODiOOCpuODhuODhFwiLFxuICAgICAgICBuYW1lOiBcIlRhbyBUaWVcIixcbiAgICAgICAgbGV2ZWw6IDM1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlJmXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZ2lkbywgTWluZCBTbGljZSwgRGVrdW5kYSwgQ29uZnVzZSBCb29zdCgzNyksIE1pbmQgQ2hhcmdlKDM4KSwgTnVsbCBFbmVydmF0ZSg0MCksIFRvcnJlbnQgU2hvdCg0MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJBbG1pZ2h0eVwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGllcm9waGFudCxcbiAgICAgICAgbmFtZV9qcDogXCLjg5Xjg6njg63jgqbjgrlcIixcbiAgICAgICAgbmFtZTogXCJGbGF1cm9zXCIsXG4gICAgICAgIGxldmVsOiAzNixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRmF0YWwgRW5kLCBUYXJ1a2FqYSwgQWdpbGFvLCBIZXJjdWxlYW4gU3RyaWtlKDM4KSwgQXB0IFB1cGlsKDM5KSwgRG9kZ2UgSWNlKDQwKSwgQ3JhenkgQ2hhaW4oNDEpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0LCBTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRlYXRoLFxuICAgICAgICBuYW1lX2pwOiBcIuOCteODnuOCqOODq1wiLFxuICAgICAgICBuYW1lOiBcIlNhbWFlbFwiLFxuICAgICAgICBsZXZlbDogMzYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTXVkb29uLCBNYXRhcnVuZGEsIFBvaXNvbiBNaXN0LCBEZWt1bmRhKDM4KSwgTWVnaWRvKDM5KSwgTXVkbyBCb29zdCg0MCksIFN1cnZpdmUgTGlnaHQoNDEpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRGFya1wiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuUHJpZXN0ZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuODkeODvOODq+ODtOOCoeODhuOCo1wiLFxuICAgICAgICBuYW1lOiBcIlBhcnZhdGlcIixcbiAgICAgICAgbGV2ZWw6IDM3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRGlhcmFtYSwgTmVydnVuZGksIE1lZGlhcmFtYSgzOSksIE1hcmFrdWthamEoNDApLCBEb2RnZSBFbGVjKDQxKSwgRGl2aW5lIEdyYWNlKDQzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3QsIFNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGV2aWwsXG4gICAgICAgIG5hbWVfanA6IFwi44OR44K644K5XCIsXG4gICAgICAgIG5hbWU6IFwiUGF6dXp1XCIsXG4gICAgICAgIGxldmVsOiAzNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlJmXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTXVkb29uLCBSYWt1a2FqYSwgQnVmdWxhLCBTdGFnbmFudCBBaXIoMzkpLCBBaWxtZW50IEJvb3N0KDQwKSwgTmF2YXMgTmVidWxhKDQxKSwgQ29vbCBCcmVlemUoNDIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRGFya1wiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0LCBTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkFlb24sXG4gICAgICAgIG5hbWU6IFwiUmFqYSBOYWdhXCIsXG4gICAgICAgIGxldmVsOiAzNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSwgICAgXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb29sLFxuICAgICAgICBuYW1lX2pwOiBcIuOCuOODo+OCouOCr+ODleODreOCueODiFwiLFxuICAgICAgICBuYW1lOiBcIkJsYWNrIEZyb3N0XCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJKYWNrIEZyb3N0XCIsXCJQeXJvIEphY2tcIixcIktpbmcgRnJvc3RcIixcIlBpeGllXCIsXCJHaG91bFwiXSxcbiAgICAgICAgbGV2ZWw6IDM4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJEclwiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFyYWdpb24sIEJ1ZnVsYSwgSWNlIEJvb3N0LCBNaW5kIENoYXJnZSg0MCksIE1hc3VrdW5kYSg0MSksIEZpcmUgQW1wKDQyKSwgQWdpZHluZSg0MyksIE11ZG9vbig0NClcIixcbiAgICAgICAgaW5oZXJpdDogXCJEYXJrXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0YXIgU3ByZWFkXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg4njg5/jg4vjgqrjg7NcIixcbiAgICAgICAgbmFtZTogXCJEb21pbmlvblwiLFxuICAgICAgICBsZXZlbDogMzgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIlJmXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkhhbWFvbiwgWmlvbmdhLCBIYW1hIEJvb3N0KDQwKSwgUmVzaXN0IEV4aGF1c3QoNDEpLCBNYXppb25nYSg0MiksIFN1cnZpdmUgRGFyayg0MyksIE51bGwgRGFyayg0NClcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1hZ2ljaWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODh+OCo+ODvOOCuVwiLFxuICAgICAgICBuYW1lOiBcIkRpc1wiLFxuICAgICAgICBsZXZlbDogMzksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlJmXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFyYWdpb24sIERpYXJhbWEsIERla3VuZGEsIERvZGdlIEljZSg0MSksIE1hc3VrdW5kYSg0MiksIEFnaWR5bmUoNDMpLCBNaW5kIENoYXJnZSg0NClcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGFuZ2VkTWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCquODq+ODiOODreOCuVwiLFxuICAgICAgICBuYW1lOiBcIk9ydGhydXNcIixcbiAgICAgICAgbGV2ZWw6IDM5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpbGFvLCBCbGFjayBTcG90LCBNYXJha3VrYWphKDQxKSwgRmlyZSBCb29zdCg0MiksIE1hcmFnaW9uKDQ0KSwgTnVsbCBJY2UoNDUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRlbXBlcmFuY2UsXG4gICAgICAgIG5hbWVfanA6IFwi44Ky44Oz44OWXCIsXG4gICAgICAgIG5hbWU6IFwiR2VuYnVcIixcbiAgICAgICAgbGV2ZWw6IDQwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFidWZ1bGEsIE1hcmFrdWthamEsIFJlZ2VuZXJhdGUgMig0MiksIE1ha2FyYSBCcmVhayg0MyksIEJsdWUgV2FsbCg0NCksIFJlc2lzdCBQaHlzaWNhbCg0NSksIEV2YWRlIEVsZWMoNDYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3VuLFxuICAgICAgICBuYW1lX2pwOiBcIuODpOOCv+OCrOODqeOCuVwiLFxuICAgICAgICBuYW1lOiBcIllhdGFnYXJhc3VcIixcbiAgICAgICAgbGV2ZWw6IDQwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXN1a3VrYWphLCBOZXJ2dW5kaSwgQWdpbGFvLCBOdWxsIEZlYXIoNDMpLCBHcm93dGggMig0NCksIERpYXJhaGFuKDQ1KSwgQ29vbCBCcmVlemUoNDYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiU3VwcG9ydFwiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0LCBTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkplc3RlcixcbiAgICAgICAgbmFtZTogXCJMb2FcIixcbiAgICAgICAgbGV2ZWw6IDQwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlN0clwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRW1wZXJvcixcbiAgICAgICAgbmFtZV9qcDogXCLjgqrjgqrjgq/jg4vjg4zjgrdcIixcbiAgICAgICAgbmFtZTogXCJPdWt1bmludXNoaVwiLFxuICAgICAgICBsZXZlbDogNDEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppb25nYSwgQmxhZGUgb2YgRnVyeSwgQ291bnRlcnN0cmlrZSg0MyksIE1hemlvbmdhKDQ0KSwgQXB0IFB1cGlsKDQ1KSwgRWxlYyBCb29zdCg0NiksIE51bGwgV2luZCg0NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGVybWl0LFxuICAgICAgICBuYW1lX2pwOiBcIuODkuODiOOCs+ODiOODjOOCt1wiLFxuICAgICAgICBuYW1lOiBcIkhpdG9rb3RvLU51c2hpXCIsXG4gICAgICAgIGxldmVsOiA0MSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRm9vbGlzaCBXaGlzcGVyLCBBdXRvLVN1a3VrYWphLCBQb2lzb24gQXJyb3csIFppb25nYSg0MyksIFJlc2lzdCBGaXJlKDQ1KSwgRWxlYyBCb29zdCg0NiksIEF1dG8tTWFzdWt1KDQ3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg6vjg6njgqbjg41cIixcbiAgICAgICAgbmFtZTogXCJBbHJhdW5lXCIsXG4gICAgICAgIGxldmVsOiA0MSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWRpYXJhbWEsIEVuZXJneSBTaG93ZXIsIE9sZCBPbmUsIE1ha2FyYWthcm4oNDMpLCBHcmVlbiBXYWxsKDQ0KSwgTnVsbCBFbmVydmF0ZSg0NSksIEVuZXJ2YXRlIEJvb3N0KDQ2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTG92ZXJzLFxuICAgICAgICBuYW1lX2pwOiBcIuODquODo+ODiuODs+OCt+ODvFwiLFxuICAgICAgICBuYW1lOiBcIkxlYW5hbiBTaWRoZVwiLFxuICAgICAgICBsZXZlbDogNDIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZGlhcmFtYSwgTWUgUGF0cmEsIFRlbnRhcmFmb28oNDMpLCBDb25mdXNlIEJvb3N0KDQ0KSwgRW5lcmd5IFNob3dlcig0NSksIFNhbWFyZWNhcm0oNDYpLCBEaXZpbmUgR3JhY2UoNDcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuODj+ODjOODnuODvOODs1wiLFxuICAgICAgICBuYW1lOiBcIkhhbnVtYW5cIixcbiAgICAgICAgbGV2ZWw6IDQyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNaWdodHkgU3dpbmcsIFJha3VuZGEsIFJlY2FybSwgQmxhZGUgb2YgRnVyeSg0NCksIERvZGdlIFdpbmQoNDYpLCBFbmR1cmUoNDcpLCBQb3dlciBDaGFyZ2UoNDgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkNoYXJpb3QsXG4gICAgICAgIG5hbWVfanA6IFwi44OI44Oq44Kw44Op44OVXCIsXG4gICAgICAgIG5hbWU6IFwiVHJpZ2xhdlwiLFxuICAgICAgICBsZXZlbDogNDMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJIZWF0IFdhdmUsIENvdW50ZXJzdHJpa2UsIE1hcmFrdWthamEoNDUpLCBNdXN0YXJkIEJvbWIoNDYpLCBOdWxsIERpenp5KDQ3KSwgQmx1ZSBXYWxsKDQ4KSwgUG93ZXIgQ2hhcmdlKDQ5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdGFyLFxuICAgICAgICBuYW1lX2pwOiBcIuODleOCpuOCrVwiLFxuICAgICAgICBuYW1lOiBcIkZ1dS1raVwiLFxuICAgICAgICBsZXZlbDogNDMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydWxhLCBUb3JyZW50IFNob3QsIENvdW50ZXJzdHJpa2UsIEV2YWRlIEZpcmUoNDUpLCBBcHQgUHVwaWwoNDYpLCBXaW5kIEJvb3N0KDQ3KSwgTnVsbCBFeGhhdXN0KDQ5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXByZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCrOODluODquOCqOODq1wiLFxuICAgICAgICBuYW1lOiBcIkdhYnJpZWxcIixcbiAgICAgICAgbGV2ZWw6IDQ0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWJ1ZnVsYSwgTWVkaWFyYW1hLCBFbmVyZ3kgU2hvd2VyKDQ1KSwgU3Vydml2ZSBEYXJrKDQ3KSwgSGVhdCBXYXZlKDQ4KSwgRGl2aW5lIEdyYWNlKDUwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvcnR1bmUsXG4gICAgICAgIG5hbWVfanA6IFwi44Kv44Ot44OIXCIsXG4gICAgICAgIG5hbWU6IFwiQ2xvdGhvXCIsXG4gICAgICAgIGxldmVsOiA0NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiUmZcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWdhcnVsYSwgTXV0dWRpLCBOYXZhcyBOZWJ1bGEoNDUpLCBNYWthcmFrYXJuKDQ3KSwgV2luZCBCb29zdCg0OCksIEdhcnVkeW5lKDQ5KSwgTnVsbCBFbmVydmF0ZSg1MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZXZpbCxcbiAgICAgICAgbmFtZV9qcDogXCLjgrXjgq3jg6Xjg5DjgrlcIixcbiAgICAgICAgbmFtZTogXCJTdWNjdWJ1c1wiLFxuICAgICAgICBsZXZlbDogNDQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlJmXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpbGFvLCBNdWRvb24sIE1hcmFnaW9uKDQ2KSwgTXVkbyBCb29zdCg0NyksIFNwaXJpdCBEcmFpbig0OCksIFJlc2lzdCBMaWdodCg0OSksIEludmlnb3JhdGUgMyg1MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkFlb24sXG4gICAgICAgIG5hbWU6IFwiS3VzaGluYWRhXCIsXG4gICAgICAgIGxldmVsOiA0NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXBlcm9yLFxuICAgICAgICBuYW1lX2pwOiBcIuODiOODvOODiFwiLFxuICAgICAgICBuYW1lOiBcIlRob3RoXCIsXG4gICAgICAgIGxldmVsOiA0NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiUmZcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWF6aW9uZ2EsIE1haGFtYSwgTWVnaWRvLCBNZWRpYXJhbWEoNDcpLCBHcm93dGggMig0OCksIE51bGwgU2lsZW5jZSg0OSksIFppb2R5bmUoNTEpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhpZXJvcGhhbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Ob44Kv44OI44K744Kk44Kv44OzXCIsXG4gICAgICAgIG5hbWU6IFwiSG9rdXRvIFNlaWt1blwiLFxuICAgICAgICBsZXZlbDogNDUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiUmZcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppb25nYSwgRWxlYyBCb29zdCwgTmF2YXMgTmVidWxhLCBCbGFkZSBvZiBGdXJ5KDQ3KSwgUmVzaXN0IEV4aGF1c3QoNDgpLCBDb3VudGVyc3RyaWtlKDUwKSwgWmlvZHluZSg1MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9vbCxcbiAgICAgICAgbmFtZV9qcDogXCLjg4fjgqvjg6njg5PjgqJcIixcbiAgICAgICAgbmFtZTogXCJEZWNhcmFiaWFcIixcbiAgICAgICAgbGV2ZWw6IDQ2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiV2tcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWR5bmUsIE1hdGFydW5kYSwgVGV0cmFrYXJuLCBFdmFkZSBQaHlzaWNhbCg0OCksIE1lZ2lkb2xhKDUwKSwgRmlyZSBBbXAoNTEpLCBSZXNpc3QgUGh5c2ljYWwoNTIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRlYXRoLFxuICAgICAgICBuYW1lX2pwOiBcIuODouODiFwiLFxuICAgICAgICBuYW1lOiBcIk1vdFwiLFxuICAgICAgICBsZXZlbDogNDYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTXVkb29uLCBFdmlsIFNtaWxlLCBUZW50YXJhZm9vLCBTdXJ2aXZlIExpZ2h0KDQ4KSwgR2hhc3RseSBXYWlsKDQ5KSwgTXVkbyBCb29zdCg1MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJEYXJrXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVG93ZXIsXG4gICAgICAgIG5hbWVfanA6IFwi44Kv44O844O744OV44O844Oq44OzXCIsXG4gICAgICAgIG5hbWU6IFwiQ3UgQ2h1bGFpbm5cIixcbiAgICAgICAgbGV2ZWw6IDQ2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJSZlwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hZ2FydWxhLCBEZWF0aGJvdW5kLCBNYXRhcnVrYWphKDQ3KSwgTWluZCBDaGFyZ2UoNDgpLCBXaGl0ZSBXYWxsKDQ5KSwgRW5kdXJlIERhcmsoNTApLCBHYXJ1ZHluZSg1MSksIFdpbmQgQW1wKDUzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1hZ2ljaWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODqeODs+ODgFwiLFxuICAgICAgICBuYW1lOiBcIlJhbmdkYVwiLFxuICAgICAgICBsZXZlbDogNDcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJSZlwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hcmFnaW9uLCBUZW50YXJhZm9vLCBBZ2lkeW5lKDQ5KSwgRG9kZ2UgSWNlKDUwKSwgTXVzdGFyZCBCb21iKDUxKSwgUmVwZWwgUGh5c2ljYWwoNTUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeSwgSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgrvjgqTjg6rjg6XjgqZcIixcbiAgICAgICAgbmFtZTogXCJTZWlyeXVcIixcbiAgICAgICAgbGV2ZWw6IDQ3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWF6aW9uZ2EsIE1hdGFydW5kYSwgWmlvZHluZSg0OSksIFBvaXNvbiBNaXN0KDUwKSwgRWxlYyBCcmVhayg1MSksIEVsZWMgQm9vc3QoNTIpLCBSZXNpc3QgRXhoYXVzdCg1MylcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44OK44Op44K344Oz44OPXCIsXG4gICAgICAgIG5hbWU6IFwiTmFyYXNpbWhhXCIsXG4gICAgICAgIGxldmVsOiA0NyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiSGFtYW9uLCBUZW1wZXN0IFNsYXNoLCBDb3VudGVyc3RyaWtlKDQ4KSwgRXZhZGUgV2luZCg0OSksIE1haGFtYW9uKDUxKSwgQXV0by1NYXRhcnUoNTMpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KZXN0ZXIsXG4gICAgICAgIG5hbWU6IFwiQmFwaG9tZXRcIixcbiAgICAgICAgbGV2ZWw6IDQ3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSwgICAgXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44Kt44Kv44Oq44OS44OhXCIsXG4gICAgICAgIG5hbWU6IFwiS2lrdXJpLWhpbWVcIixcbiAgICAgICAgbGV2ZWw6IDQ4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJTdHJcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWRpYXJhbWEsIFBvc3VtdWRpLCBBZ2lsYW8sIFNhbWFyZWNhcm0oNTApLCBEaWFyYWhhbig1MiksIFJlc2lzdCBEYXJrKDUzKSwgRGl2aW5lIEdyYWNlKDU0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhlcm1pdCxcbiAgICAgICAgbmFtZV9qcDogXCLjgq/jg6njg57jg4bjg7PjgrBcIixcbiAgICAgICAgbmFtZTogXCJLdXJhbWEgVGVuZ3VcIixcbiAgICAgICAgbGV2ZWw6IDQ4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJEclwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnVsYSwgTWFzdWt1bmRhLCBWaWNpb3VzIFN0cmlrZSwgR3Jvd3RoIDIoNTApLCBXaW5kIEJvb3N0KDUxKSwgUmVkIFdhbGwoNTIpLCBSZXNpc3QgRWxlYyg1MylcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1vb24sXG4gICAgICAgIG5hbWVfanA6IFwi44Ku44Oq44Oh44Kr44OpXCIsXG4gICAgICAgIG5hbWU6IFwiR2lyaW1laGthbGFcIixcbiAgICAgICAgbGV2ZWw6IDQ4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiUmZcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiUG93ZXIgQ2hhcmdlLCBNaWdodHkgU3dpbmcsIFBvaXNvbiBNaXN0LCBNYW11ZG9vbig1MCksIEJsaWdodCg1MSksIFRldHJhamEoNTIpLCBFbmR1cmUgTGlnaHQoNTMpLCBSZXBlbCBQaHlzaWNhbCg1NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJTdXBwb3J0XCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5LCBIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdXN0aWNlLFxuICAgICAgICBuYW1lX2pwOiBcIuOCveODreODjVwiLFxuICAgICAgICBuYW1lOiBcIlRocm9uZVwiLFxuICAgICAgICBsZXZlbDogNDksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiSGFtYW9uLCBBZ2lkeW5lLCBIYW1hIEJvb3N0LCBNaW5kIENoYXJnZSg1MSksIFJlZ2VuZXJhdGUgMig1MyksIFJlc2lzdCBEYXJrKDU0KSwgRW5kdXJlIERhcmsoNTUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGFuZ2VkTWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODpOODhOODleOCtVwiLFxuICAgICAgICBuYW1lOiBcIllhdHN1ZnVzYVwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiTWFrYW1pXCIsIFwiT3J0aHJ1c1wiLCBcIk1vdGhtYW5cIiwgXCJUaG90aFwiLCBcIk5hcmFzaW1oYVwiXSxcbiAgICAgICAgbGV2ZWw6IDQ5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJEclwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiUmZcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWR5bmUsIE1hc3VrdWthamEsIEZpcmUgQm9vc3QsIEhlYXQgV2F2ZSg1MSksIFBvd2VyIENoYXJnZSg1MiksIERvZGdlIFBoeXNpY2FsKDUzKSwgTWFyYWdpZHluZSg1NCksIE1pbmQgQ2hhcmdlKDU1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiU3RhciBTcHJlYWRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdHJlbmd0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqvjg7zjg6rjg7xcIixcbiAgICAgICAgbmFtZTogXCJLYWxpXCIsXG4gICAgICAgIGxldmVsOiA1MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQnVmdWR5bmUsIE11ZG9vbiwgRGVhdGhib3VuZCg1MiksIFJldm9sdXRpb24oNTMpLCBIaWdoIENvdW50ZXIoNTQpLCBQb3dlciBDaGFyZ2UoNTUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0YXIsXG4gICAgICAgIG5hbWVfanA6IFwi44Ks44ON44O844K344OjXCIsXG4gICAgICAgIG5hbWU6IFwiR2FuZXNoYVwiLFxuICAgICAgICBsZXZlbDogNTAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJOdWxcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1ZHluZSwgTXVzdGFyZCBCb21iLCBNYWthcmFrYXJuLCBQb3dlciBDaGFyZ2UoNTIpLCBIaWdoIENvdW50ZXIoNTQpLCBFbmR1cmUoNTUpLCBNYWdhcnVkeW5lKDU2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRW1wZXJvcixcbiAgICAgICAgbmFtZV9qcDogXCLjg5Hjg5Tjg6vjgrXjgrBcIixcbiAgICAgICAgbmFtZTogXCJQYWJpbHNhZ1wiLFxuICAgICAgICBsZXZlbDogNTEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlJmXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJsaWdodCwgRm9vbGlzaCBXaGlzcGVyLCBTdGFnbmFudCBBaXIoNTMpLCBTaWxlbmNlIEJvb3N0KDU0KSwgTXVkb29uKDU1KSwgQXJyb3cgUmFpbig1NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvcnR1bmUsXG4gICAgICAgIG5hbWVfanA6IFwi44Op44Kx44K344K5XCIsXG4gICAgICAgIG5hbWU6IFwiTGFjaGVzaXNcIixcbiAgICAgICAgbGV2ZWw6IDUxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJOdWxcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1ZHluZSwgTWFzdWt1a2FqYSwgUmVjYXJtKDUzKSwgTWFrYXJhIEJyZWFrKDU0KSwgQWJzb3JiIFdpbmQoNTUpLCBSZWQgV2FsbCg1NiksIFJlc2lzdCBFeGhhdXN0KDU3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkFlb24sXG4gICAgICAgIG5hbWU6IFwiUXVldHphbGNvYXRsXCIsXG4gICAgICAgIGxldmVsOiA1MSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSwgICAgXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXByZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCueOCq+ODh+OCo1wiLFxuICAgICAgICBuYW1lOiBcIlNrYWRpXCIsXG4gICAgICAgIGxldmVsOiA1MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJEclwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWJ1ZnVsYSwgQWVvbiBSYWluLCBCdWZ1ZHluZSg1NCksIEljZSBBbXAoNTYpLCBSZXBlbCBJY2UoNTcpLCBSZXBlbCBGaXJlKDU5KSwgU3BlbGwgTWFzdGVyKDYwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IaWVyb3BoYW50LFxuICAgICAgICBuYW1lX2pwOiBcIuOCseODq+ODmeODreOCuVwiLFxuICAgICAgICBuYW1lOiBcIkNlcmJlcnVzXCIsXG4gICAgICAgIGxldmVsOiA1MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgR2lnYW50aWMgRmlzdCwgVmljaW91cyBTdHJpa2UoNTMpLCBNYXJhZ2lkeW5lKDU0KSwgUmVnZW5lcmF0ZSAyKDU1KSwgRmlyZSBBbXAoNTcpLCBBdXRvLVN1a3VrYWphKDU4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTG92ZXJzLFxuICAgICAgICBuYW1lX2pwOiBcIuODqeODleOCoeOCqOODq1wiLFxuICAgICAgICBuYW1lOiBcIlJhcGhhZWxcIixcbiAgICAgICAgbGV2ZWw6IDUzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiUmZcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYXJhaGFuLCBNZWdpZG9sYSwgTWFzdWt1a2FqYSg1NSksIEFtcml0YSg1NiksIE51bGwgRGl6enkoNTcpLCBNZWRpYXJhaGFuKDU5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZXZpbCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6rjg6rjgrlcIixcbiAgICAgICAgbmFtZTogXCJMaWxpdGhcIixcbiAgICAgICAgbGV2ZWw6IDUzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiUmZcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppb2R5bmUsIE1ha2FyYWthcm4sIE9sZCBPbmUoNTQpLCBNYXppb2R5bmUoNTUpLCBFbGVjIEJyZWFrKDU2KSwgQWlsbWVudCBCb29zdCg1NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN1bixcbiAgICAgICAgbmFtZV9qcDogXCLjgr/jg6Djg6rjg7NcIixcbiAgICAgICAgbmFtZTogXCJUYW0gTGluXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJQaG9lbml4XCIsIFwiR2RvblwiLCBcIllhdGFnYXJhc3VcIiwgXCJOYXJhc2ltaGFcIl0sXG4gICAgICAgIGxldmVsOiA1MyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvZHluZSwgRGVhdGhib3VuZCwgSGlnaCBDb3VudGVyLCBBdXRvLU1hcmFrdSg1NCksIFBvd2VyIENoYXJnZSg1NSksIEVsZWMgQW1wKDU2KSwgRXZhZGUgUGh5c2ljYWwoNTgpLCBFbmR1cmluZyBTb3VsKDU5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiQ3Jvc3MgU3ByZWFkXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQ2hhcmlvdCxcbiAgICAgICAgbmFtZV9qcDogXCLjgq3jg7Pjgq1cIixcbiAgICAgICAgbmFtZTogXCJLaW4ta2lcIixcbiAgICAgICAgbGV2ZWw6IDU0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiTnVsXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJWaWxlIEFzc2F1bHQsIEhpZ2ggQ291bnRlciwgR2lnYW50aWMgRmlzdCg1NiksIFNlYWwgQm9tYig1NyksIFJldm9sdXRpb24oNTkpLCBQb3dlciBDaGFyZ2UoNjApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5UZW1wZXJhbmNlLFxuICAgICAgICBuYW1lX2pwOiBcIuOCueOCtuOCr1wiLFxuICAgICAgICBuYW1lOiBcIlN1emFrdVwiLFxuICAgICAgICBsZXZlbDogNTQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlJmXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hcmFnaW9uLCBFbmVyZ3kgU2hvd2VyLCBNYXN1a3VrYWphKDU1KSwgQWdpZHluZSg1NiksIFJlc2lzdCBJY2UoNTgpLCBGaXJlIEFtcCg1OSksIEF1dG8tTWFzdWt1KDYwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGVybWl0LFxuICAgICAgICBuYW1lX2pwOiBcIuODi+ODvOOCuuODm+ODg+OCsFwiLFxuICAgICAgICBuYW1lOiBcIk5pZGhvZ2dyXCIsXG4gICAgICAgIGxldmVsOiA1NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYW11ZG9vbiwgRXZpbCBTbWlsZSwgR2hhc3RseSBXYWlsKDU3KSwgQnVmdWR5bmUoNTgpLCBTdGFnbmFudCBBaXIoNTkpLCBSZXNpc3QgUGh5c2ljYWwoNjApLCBJY2UgQm9vc3QoNjEpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRGFya1wiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Ub3dlcixcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg5Djg4njg7NcIixcbiAgICAgICAgbmFtZTogXCJBYmFkZG9uXCIsXG4gICAgICAgIGxldmVsOiA1NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlJmXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk9sZCBPbmUsIE11ZG9vbiwgQXJyb3cgUmFpbiwgQWdpZHluZSg1NiksIEVuZHVyZSBMaWdodCg1NyksIFRldHJhIEJyZWFrKDYwKSwgTnVsbCBQaHlzaWNhbCg2MilcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSmVzdGVyLFxuICAgICAgICBuYW1lOiBcIkt1bWJoYW5kYVwiLFxuICAgICAgICBsZXZlbDogNTUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb29sLFxuICAgICAgICBuYW1lX2pwOiBcIuOCt+OCreOCquOCpuOCuFwiLFxuICAgICAgICBuYW1lOiBcIlNoaWtpLU91amlcIixcbiAgICAgICAgbGV2ZWw6IDU2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJOYXZhcyBOZWJ1bGEsIE1hdGFydW5kYSwgUmV2b2x1dGlvbiwgQXB0IFB1cGlsKDU4KSwgR3Jvd3RoIDIoNTkpLCBOdWxsIFBoeXNpY2FsKDYyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGFuZ2VkTWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODiOOCpuOCs+ODhFwiLFxuICAgICAgICBuYW1lOiBcIlRhb3d1XCIsXG4gICAgICAgIGxldmVsOiA1NixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFlb24gUmFpbiwgRGVrYWphLCBNYXRhcnVrYWphLCBOdWxsIEVuZXJ2YXRlKDU4KSwgUG93ZXIgQ2hhcmdlKDYwKSwgRXZhZGUgUGh5c2ljYWwoNjEpLCBBYnNvcmIgRmlyZSg2MilcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdGFyLFxuICAgICAgICBuYW1lX2pwOiBcIuOCrOODq+ODvOODgFwiLFxuICAgICAgICBuYW1lOiBcIkdhcnVkYVwiLFxuICAgICAgICBsZXZlbDogNTcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJSZlwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiUmZcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJEaWFyYW1hLCBHYXJ1ZHluZSwgQXJyb3cgUmFpbiwgQW1yaXRhKDYwKSwgSGlnaCBDb3VudGVyKDYxKSwgUmVwZWwgV2luZCg2MiksIEF1dG8tU3VrdWthamEoNjMpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuLCBNYWdhdHN1IEluYWJhXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjgrnjgqTjgq1cIixcbiAgICAgICAgbmFtZTogXCJTdWkta2lcIixcbiAgICAgICAgbGV2ZWw6IDU3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQnVmdWR5bmUsIFBvd2VyIENoYXJnZSwgVmljaW91cyBTdHJpa2UsIFJlZ2VuZXJhdGUgMig1OSksIFRldHJhIEJyZWFrKDYwKSwgRW5kdXJpbmcgU291bCg2MilcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgqbjg6rjgqjjg6tcIixcbiAgICAgICAgbmFtZTogXCJVcmllbFwiLFxuICAgICAgICBsZXZlbDogNTgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlJmXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFyYWdpb24sIEhhbWFvbiwgSGlnaCBDb3VudGVyKDYwKSwgQWdpZHluZSg2MSksIEVuZHVyZSBEYXJrKDYyKSwgRmlyZSBBbXAoNjMpLCBOdWxsIERhcmsoNjQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb3J0dW5lLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODiuODs+OCv1wiLFxuICAgICAgICBuYW1lOiBcIkFuYW50YVwiLFxuICAgICAgICBsZXZlbDogNTgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFidWZ1bGEsIFdoaXRlIFdhbGwsIE1hcmFrdWthamEoNTkpLCBCdWZ1ZHluZSg2MSksIEdyZWVuIFdhbGwoNjIpLCBJbnZpZ29yYXRlIDMoNjMpLCBOdWxsIEV4aGF1c3QoNjQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGVhdGgsXG4gICAgICAgIG5hbWVfanA6IFwi44Ob44Ov44Kk44OI44Op44Kk44OA44O8XCIsXG4gICAgICAgIG5hbWU6IFwiV2hpdGUgUmlkZXJcIixcbiAgICAgICAgbGV2ZWw6IDU4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTXVkb29uLCBIYW1hb24sIEFnaWR5bmUoNjApLCBFdmFkZSBJY2UoNjIpLCBNYWhhbWFvbig2MyksIE1hbXVkb29uKDY1KSwgSGFtYSBCb29zdCg2NiksIE11ZG8gQm9vc3QoNjcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRGFya1wiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5BZW9uLFxuICAgICAgICBuYW1lOiBcIktpbmd1XCIsXG4gICAgICAgIGxldmVsOiA1OCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSwgICAgIFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuUHJpZXN0ZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuODj+ODquODhuOCo+ODvFwiLFxuICAgICAgICBuYW1lOiBcIkhhcml0aVwiLFxuICAgICAgICBsZXZlbDogNTksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYXJhaGFuLCBCdWZ1ZHluZSwgTWFyYWt1a2FqYSwgTWVkaWFyYWhhbig2MSksIEFycm93IFJhaW4oNjIpLCBTYW1hcmVjYXJtKDY0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgSW5hYmFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdWRnZW1lbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44OM44OT44K5XCIsXG4gICAgICAgIG5hbWU6IFwiQW51YmlzXCIsXG4gICAgICAgIGxldmVsOiA1OSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiSGFtYW9uLCBNYWthcmFrYXJuLCBNdWRvb24sIFBvaXNvbiBBcnJvdyg2MCksIE11c3RhcmQgQm9tYig2MSksIE1lZ2lkb2xhKDYyKSwgTWFoYW1hb24oNjQpLCBIYW1hIEJvb3N0KDY1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkxpZ2h0XCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXByZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuODnuOCtuODvOODj+ODvOODreODg+ODiFwiLFxuICAgICAgICBuYW1lOiBcIk1vdGhlciBIYXJsb3RcIixcbiAgICAgICAgbGV2ZWw6IDYwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hemlvZHluZSwgTWFtdWRvb24sIE11ZG8gQm9vc3QoNjIpLCBGb29saXNoIFdoaXNwZXIoNjMpLCBSZXNpc3QgRmlyZSg2NCksIEFpbG1lbnQgQm9vc3QoNjUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW4sIE1hZ2F0c3UgTWFuZGFsYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhpZXJvcGhhbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Gg44GE44Gd44GG44GY44KH44GGXCIsXG4gICAgICAgIG5hbWU6IFwiRGFpc291am91XCIsXG4gICAgICAgIGxldmVsOiA2MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiSGFtYW9uLCBEaWFyYWhhbiwgTWFrYXJha2FybiwgQWdpZHluZSg2MiksIEVuZHVyZSBEYXJrKDYzKSwgTWFoYW1hb24oNjQpLCBIYW1hIEJvb3N0KDY1KSwgU2Ftc2FyYSg2NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZXZpbCxcbiAgICAgICAgbmFtZV9qcDogXCLjg5njg6vjg5XjgqfjgrTjg7zjg6tcIixcbiAgICAgICAgbmFtZTogXCJCZWxwaGVnb3JcIixcbiAgICAgICAgbGV2ZWw6IDYxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiRHJcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWF6aW9keW5lLCBFdmlsIFNtaWxlLCBNYXJha3VuZGEoNjMpLCBGZWFyIEJvb3N0KDY0KSwgT2xkIE9uZSg2NSksIEVuZXJ2YXRlIEJvb3N0KDY2KSwgRWxlYyBBbXAoNjcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IEluYWJhXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3VuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCuOODo+OCv+ODvOODplwiLFxuICAgICAgICBuYW1lOiBcIkphdGF5dVwiLFxuICAgICAgICBsZXZlbDogNjEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJEclwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnVkeW5lLCBOdWxsIENvbmZ1c2UsIEFtcml0YSg2MiksIEdyb3d0aCAzKDY0KSwgUmVwZWwgRWxlYyg2NSksIE1hZ2FydWR5bmUoNjYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IEluYWJhXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTWFnaWNpYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44K444OzXCIsXG4gICAgICAgIG5hbWU6IFwiSmlublwiLFxuICAgICAgICBsZXZlbDogNjIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWR5bmUsIEZvb2xpc2ggV2hpc3BlciwgUmVzaXN0IFBoeXNpY2FsKDY1KSwgRmlyZSBCb29zdCg2NiksIE51bGwgUGh5c2ljYWwoNjcpLCBWYWxpYW50IERhbmNlKDY4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBNYW5kYWxhXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg5Pjg6Pjg4PjgrNcIixcbiAgICAgICAgbmFtZTogXCJCeWFra29cIixcbiAgICAgICAgbGV2ZWw6IDYyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQnVmdWR5bmUsIERlYXRoYm91bmQsIEhpZ2ggQ291bnRlciwgQXV0by1TdWt1a2FqYSg2NCksIEFtcml0YSg2NiksIEljZSBBbXAoNjcpLCBNYWJ1ZnVkeW5lKDY4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IEluYWJhLCBNYWdhdHN1IE1hbmRhbGFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Ub3dlcixcbiAgICAgICAgbmFtZV9qcDogXCLjg57jg7zjg6lcIixcbiAgICAgICAgbmFtZTogXCJNYXJhXCIsXG4gICAgICAgIGxldmVsOiA2MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiRHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgQmxpZ2h0LCBQb3dlciBDaGFyZ2UoNjMpLCBNYWthcmFrYXJuKDY0KSwgQWJzb3JiIFBoeXNpY2FsKDY2KSwgRmlyZSBBbXAoNjcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSmVzdGVyLFxuICAgICAgICBuYW1lOiBcIkNoZXJub2JvZ1wiLFxuICAgICAgICBsZXZlbDogNjIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IZXJtaXQsXG4gICAgICAgIG5hbWVfanA6IFwi44ON44OT44Ot44K5XCIsXG4gICAgICAgIG5hbWU6IFwiTmViaXJvc1wiLFxuICAgICAgICBsZXZlbDogNjMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlJmXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFtdWRvb24sIEFnaWR5bmUsIERla2FqYSwgTWluZCBDaGFyZ2UoNjUpLCBNdWRvIEJvb3N0KDY3KSwgTnVsbCBMaWdodCg2OSksIFNwZWxsIE1hc3Rlcig3MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdHJlbmd0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjgrjjg7zjgq/jg5Xjg6rjg7zjg4lcIixcbiAgICAgICAgbmFtZTogXCJTaWVnZnJpZWRcIixcbiAgICAgICAgbGV2ZWw6IDYzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiTnVsXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBa2FzaGEgQXJ0cywgUG93ZXIgQ2hhcmdlLCBNYXN1a3VrYWphLCBIaWdoIENvdW50ZXIoNjUpLCBSZWdlbmVyYXRlIDMoNjYpLCBSYWlueSBEZWF0aCg2OCksIEdvZCdzIEhhbmQoNzApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb29sLFxuICAgICAgICBuYW1lX2pwOiBcIuODreOCrVwiLFxuICAgICAgICBuYW1lOiBcIkxva2lcIixcbiAgICAgICAgbGV2ZWw6IDY0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJ1ZnVkeW5lLCBSYWt1a2FqYSwgU2hhcnAgU3R1ZGVudCwgSWNlIEFtcCg2NiksIEhpZ2ggQ291bnRlcig2NyksIE1hYnVmdWR5bmUoNjgpLCBOdWxsIEZpcmUoNjkpLCBOaWZsaGVpbSg3MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTG92ZXJzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCreODpeODmeODrFwiLFxuICAgICAgICBuYW1lOiBcIkN5YmVsZVwiLFxuICAgICAgICBsZXZlbDogNjQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZGlhcmFtYSwgVmljaW91cyBTdHJpa2UsIFJlY2FybSwgTXlyaWFkIEFycm93cyg2NyksIFNhbWFyZWNhcm0oNjgpLCBNZWRpYXJhaGFuKDcwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXBlcm9yLFxuICAgICAgICBuYW1lX2pwOiBcIuODkOODreODs1wiLFxuICAgICAgICBuYW1lOiBcIkJhcm9uZ1wiLFxuICAgICAgICBsZXZlbDogNjUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9keW5lLCBQb2lzb24gTWlzdCwgTWUgUGF0cmEsIE1hcmFrdWthamEoNjcpLCBJbnZpZ29yYXRlIDIoNjkpLCBIaWdoIENvdW50ZXIoNzEpLCBNYXppb2R5bmUoNzIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuODiOODvOODq1wiLFxuICAgICAgICBuYW1lOiBcIlRob3JcIixcbiAgICAgICAgbGV2ZWw6IDY1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJEclwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppb2R5bmUsIERlYXRoYm91bmQsIEhpZ2ggQ291bnRlciwgQXJtcyBNYXN0ZXIoNjcpLCBNYXppb2R5bmUoNjgpLCBOdWxsIFBoeXNpY2FsKDY5KSwgVGh1bmRlciBSZWlnbig3MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvcnR1bmUsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44OI44Ot44Od44K5XCIsXG4gICAgICAgIG5hbWU6IFwiQXRyb3Bvc1wiLFxuICAgICAgICBsZXZlbDogNjUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJOdWxcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1ZHluZSwgV2luZCBCb29zdCwgTWluZCBDaGFyZ2UoNjcpLCBNYWdhcnVkeW5lKDY4KSwgRXZhZGUgRmlyZSg2OSksIFdpbmQgQW1wKDcwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkFlb24sXG4gICAgICAgIG5hbWU6IFwiTGFrc21pXCIsXG4gICAgICAgIGxldmVsOiA2NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSwgICAgIFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg6Hjg6vjgq3jgrvjg4fjgq9cIixcbiAgICAgICAgbmFtZTogXCJNZWxjaGl6ZWRla1wiLFxuICAgICAgICBsZXZlbDogNjYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWRpYXJhaGFuLCBIYW1hb24sIEFrYXNoYSBBcnRzLCBNYXRhcnVrYWphKDY4KSwgTWFoYW1hb24oNjkpLCBHb2QncyBIYW5kKDcyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhhbmdlZE1hbixcbiAgICAgICAgbmFtZV9qcDogXCLjg5jjg6vjgrrjgqjjg7Pjgrjjgqfjg6tcIixcbiAgICAgICAgbmFtZTogXCJIZWxsIEJpa2VyXCIsXG4gICAgICAgIGxldmVsOiA2NixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgQWVvbiBSYWluLCBFbmR1cmUoNjgpLCBNdWRvb24oNjkpLCBNYXJhZ2lkeW5lKDcwKSwgQWJzb3JiIEZpcmUoNzEpLCBGaXJlIEFtcCg3MylcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYSwgWW9tb3RzdSBIaXJhc2FrYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0YXIsXG4gICAgICAgIG5hbWVfanA6IFwi44Kr44Or44OG44Kj44Kx44O844OkXCIsXG4gICAgICAgIG5hbWU6IFwiS2FydGlrZXlhXCIsXG4gICAgICAgIGxldmVsOiA2NyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXppb2R5bmUsIEF1dG8tTWF0YXJ1LCBIaWdoIENvdW50ZXIoNjgpLCBNeXJpYWQgQXJyb3dzKDY5KSwgR3Jvd3RoIDIoNzApLCBQcmltYWwgRm9yY2UoNzUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGEsIFlvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdWRnZW1lbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44OI44Op44Oz44Oa44OD44K/44O8XCIsXG4gICAgICAgIG5hbWU6IFwiVHJ1bXBldGVyXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJNYXRhZG9yXCIsIFwiV2hpdGUgUmlkZXJcIiwgXCJEYWlzb3Vqb3VcIiwgXCJUYW8gVGllXCIsIFwiUGFiaWxzYWdcIiwgXCJUYW93dVwiXSxcbiAgICAgICAgbGV2ZWw6IDY3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIlJmXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWdpZG9sYSwgWmlvZHluZSwgRWxlYyBBbXAsIE1hc3VrdWthamEoNjgpLCBDb29sIEJyZWV6ZSg2OSksIE1lZ2lkb2xhb24oNzApLCBEZWJpbGl0YXRlKDczKSwgSGVhdCBSaXNlcig3NClcIixcbiAgICAgICAgaW5oZXJpdDogXCJBbG1pZ2h0eVwiLFxuICAgICAgICBub3RlczogXCJIaXJhbnlhIFNwcmVhZFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRldmlsLFxuICAgICAgICBuYW1lX2pwOiBcIuODmeODquOCouODq1wiLFxuICAgICAgICBuYW1lOiBcIkJlbGlhbFwiLFxuICAgICAgICBsZXZlbDogNjgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTXVkb29uLCBNeXJpYWQgQXJyb3dzLCBBZ2lkeW5lKDY5KSwgRW5kdXJlIExpZ2h0KDcxKSwgRmlyZSBBbXAoNzIpLCBNYXJhZ2lkeW5lKDczKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkRhcmtcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBNYW5kYWxhLCBZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjgrvjg4hcIixcbiAgICAgICAgbmFtZTogXCJTZXRoXCIsXG4gICAgICAgIGxldmVsOiA2OCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlJmXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFnYXJ1ZHluZSwgR2FydWR5bmUsIFdpbmQgQnJlYWsoNzEpLCBOdWxsIExpZ2h0KDcyKSwgV2luZCBBbXAoNzMpLCBFdmFkZSBFbGVjKDc0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBNYW5kYWxhXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3VuLFxuICAgICAgICBuYW1lX2pwOiBcIuODm+ODq+OCuVwiLFxuICAgICAgICBuYW1lOiBcIkhvcnVzXCIsXG4gICAgICAgIGxldmVsOiA2OCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiUmZcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJEaWFyYWhhbiwgTWFoYW1hb24sIE1hZ2FydWR5bmUsIFdpbmQgQW1wKDcwKSwgTWF0YXJ1a2FqYSg3MSksIEFic29yYiBXaW5kKDczKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYSwgWW9tb3RzdSBIaXJhc2FrYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkplc3RlcixcbiAgICAgICAgbmFtZTogXCJTZWl0ZW4gVGFpc2VpXCIsXG4gICAgICAgIGxldmVsOiA2OCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1hZ2ljaWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCueODq+ODiFwiLFxuICAgICAgICBuYW1lOiBcIlN1cnRcIixcbiAgICAgICAgbGV2ZWw6IDY5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJSZlwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWR5bmUsIERlYXRoYm91bmQsIEhpZ2ggQ291bnRlciwgTWFyYWdpZHluZSg3MSksIFJhZ25hcm9rKDc0KSwgRmlyZSBBbXAoNzUpLCBOdWxsIEljZSg3NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIllvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5UZW1wZXJhbmNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODpuODq+ODs+OCsFwiLFxuICAgICAgICBuYW1lOiBcIll1cmx1bmd1clwiLFxuICAgICAgICBsZXZlbDogNjksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiVmlydXMgV2F2ZSwgQnVmdWR5bmUsIEdyb3d0aCAzKDcxKSwgTWVkaWFyYWhhbig3MiksIFNhbWFyZWNhcm0oNzQpLCBSZXBlbCBMaWdodCg3NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVG93ZXIsXG4gICAgICAgIG5hbWVfanA6IFwi44Oe44K144Kr44OJXCIsXG4gICAgICAgIG5hbWU6IFwiTWFzYWthZG9cIixcbiAgICAgICAgbGV2ZWw6IDY5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiTnVsXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFoYW1hb24sIFRlbXBlc3QgU2xhc2gsIE15cmlhZCBBcnJvd3MoNzEpLCBIYW1hIEJvb3N0KDczKSwgQXJtcyBNYXN0ZXIoNzQpLCBFbmR1cmluZyBTb3VsKDc2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkxpZ2h0XCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44OE44Kj44OE44Kj44Of44OI44OrXCIsXG4gICAgICAgIG5hbWU6IFwiVHppdHppbWl0bFwiLFxuICAgICAgICBsZXZlbDogNzAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvZHluZSwgVmlydXMgV2F2ZSwgTXVzdGFyZCBCb21iLCBTaWxlbmNlIEJvb3N0KDcxKSwgRGVrYWphKDcyKSwgUmVnZW5lcmF0ZSAzKDczKSwgTWF6aW9keW5lKDc2KSwgUmVwZWwgRWxlYyg3NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIllvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXByZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODquODqeODiFwiLFxuICAgICAgICBuYW1lOiBcIkFsaWxhdFwiLFxuICAgICAgICBsZXZlbDogNzAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWthcmFrYXJuLCBNYWJ1ZnVkeW5lLCBSZWdlbmVyYXRlIDMoNzIpLCBFdmFkZSBQaHlzaWNhbCg3MyksIEdyb3d0aCAyKDc0KSwgQXV0by1NYXJha3UoNzUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiU3VwcG9ydFwiLFxuICAgICAgICBub3RlczogXCJZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGllcm9waGFudCxcbiAgICAgICAgbmFtZV9qcDogXCLjg4/jg4Hjg57jg7NcIixcbiAgICAgICAgbmFtZTogXCJIYWNoaW1hblwiLFxuICAgICAgICBsZXZlbDogNzAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hemlvZHluZSwgTWFrYXJha2FybiwgTWF0YXJ1a2FqYSwgRWxlYyBCcmVhayg3MiksIERla3VuZGEoNzQpLCBSZXZvbHV0aW9uKDc1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBNYW5kYWxhLCBZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTG92ZXJzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCpOOCt+ODpeOCv+ODq1wiLFxuICAgICAgICBuYW1lOiBcIklzaHRhclwiLFxuICAgICAgICBsZXZlbDogNzEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWRpYXJhaGFuLCBTYW1hcmVjYXJtLCBNdXR1ZGksIE1hemlvZHluZSg3MiksIEFtcml0YSg3NSksIFNwZWxsIE1hc3Rlcig3NiksIEFic29yYiBXaW5kKDc3KSwgU2FsdmF0aW9uKDc4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhhbmdlZE1hbixcbiAgICAgICAgbmFtZV9qcDogXCLjg7TjgqHjgrnjgq1cIixcbiAgICAgICAgbmFtZTogXCJWYXN1a2lcIixcbiAgICAgICAgbGV2ZWw6IDcxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJIYW1hb24sIFZpcnVzIFdhdmUsIE51bGwgUG9pc29uKDczKSwgSGlnaCBDb3VudGVyKDc0KSwgRXZhZGUgV2luZCg3NSksIE1haGFtYW9uKDc2KSwgWmlvZHluZSg3NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQ2hhcmlvdCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjgr/jg5Djgq9cIixcbiAgICAgICAgbmFtZTogXCJBdGF2YWthXCIsXG4gICAgICAgIGxldmVsOiA3MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIk51bFwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFoYW1hb24sIERpYXJhaGFuLCBBbXJpdGEsIEJyYXZlIEJsYWRlKDc2KSwgTWVnaWRvbGFvbig3NyksIE1pbmQgQ2hhcmdlKDc4KSwgQXJtcyBNYXN0ZXIoODEpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiWW9tb3RzdSBIaXJhc2FrYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvcnR1bmUsXG4gICAgICAgIG5hbWVfanA6IFwi44OO44Or44OzXCIsXG4gICAgICAgIG5hbWU6IFwiTm9yblwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiQXRyb3Bvc1wiLCBcIkxhY2hlc2lzXCIsIFwiQ2xvdGhvXCJdLFxuICAgICAgICBsZXZlbDogNzIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIkRyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFnYXJ1ZHluZSwgR2FydWR5bmUsIERpYXJhaGFuLCBBdXRvLU1hc3VrdSg3NCksIEludmlnb3JhdGUgMyg3NSksIFdpbmQgQW1wKDc2KSwgSW5zdGEtSGVhbCg3NyksIERlYmlsaXRhdGUoNzkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZWF0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg6rjgrlcIixcbiAgICAgICAgbmFtZTogXCJBbGljZVwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiTmViaXJvc1wiLFwiQmVsaWFsXCJdLFxuICAgICAgICBsZXZlbDogNzIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlJmXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hbXVkb29uLCBNdWRvIEJvb3N0LCBEZWt1bmRhLCBFbmR1cmUgTGlnaHQoNzUpLCBNZWdpZG9sYSg3NiksIE1pbmQgQ2hhcmdlKDc3KSwgRGllIGZvciBNZSEoNzkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRGFya1wiLFxuICAgICAgICBub3RlczogXCJTcGVjaWFsIEZ1c2lvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1ZGdlbWVudCxcbiAgICAgICAgbmFtZV9qcDogXCLjg5/jgqvjgqjjg6tcIixcbiAgICAgICAgbmFtZTogXCJNaWNoYWVsXCIsXG4gICAgICAgIGxldmVsOiA3MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJWb3JwYWwgQmxhZGUsIE1lZ2lkb2xhLCBIYW1hb24sIE1lZ2lkb2xhb24oNzQpLCBNYWhhbWFvbig3NSksIFJlcGVsIERhcmsoNzYpLCBIZWF2ZW4ncyBCbGFkZSg3OSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IZXJtaXQsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44Op44OP44OQ44KtXCIsXG4gICAgICAgIG5hbWU6IFwiQXJhaGFiYWtpXCIsXG4gICAgICAgIGxldmVsOiA3MyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlJmXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJWaWNpb3VzIFN0cmlrZSwgQXV0by1NYXJha3UsIE51bGwgRmVhciwgQWxlcnRuZXNzKDc0KSwgVGV0cmFrYXJuKDc2KSwgUmVwZWwgUGh5c2ljYWwoODApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg7TjgqPjgrfjg6Xjg4xcIixcbiAgICAgICAgbmFtZTogXCJWaXNobnVcIixcbiAgICAgICAgbGV2ZWw6IDczLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWdpZG9sYW9uLCBBa2FzaGEgQXJ0cywgTWFidWZ1ZHluZSwgUmVnZW5lcmF0ZSAzKDc1KSwgR29kJ3MgSGFuZCg3NiksIFBvd2VyIENoYXJnZSg3OCksIEFuZ2VsaWMgR3JhY2UoNzkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiQWxtaWdodHlcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRW1wZXJvcixcbiAgICAgICAgbmFtZV9qcDogXCLjgqrjg7zjg4fjgqPjg7NcIixcbiAgICAgICAgbmFtZTogXCJPZGluXCIsXG4gICAgICAgIGxldmVsOiA3NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiRHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9keW5lLCBNYWdhcnVkeW5lLCBXaW5kIEFtcCg3NiksIFJlZ2VuZXJhdGUgMyg3NyksIE1hemlvZHluZSg3OCksIE1pbmQgQ2hhcmdlKDgwKSwgUGFudGEgUmhlaSg4MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1c3RpY2UsXG4gICAgICAgIG5hbWVfanA6IFwi44K544Op44Kq44K344OjXCIsXG4gICAgICAgIG5hbWU6IFwiU3Jhb3NoYVwiLFxuICAgICAgICBsZXZlbDogNzQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJEclwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJSZlwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWhhbWFvbiwgQnJhdmUgQmxhZGUsIFBvd2VyIENoYXJnZSwgWmlvZHluZSg3NiksIEhhbWEgQm9vc3QoNzgpLCBNZWdpZG9sYW9uKDgwKSwgQW5nZWxpYyBHcmFjZSg4MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5BZW9uLFxuICAgICAgICBuYW1lOiBcIkthZ3V5YVwiLFxuICAgICAgICBsZXZlbDogNzQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSwgICAgXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Ub3dlcixcbiAgICAgICAgbmFtZV9qcDogXCLjg6jjgrfjg4Tjg41cIixcbiAgICAgICAgbmFtZTogXCJZb3NoaXRzdW5lXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJNYXNha2Fkb1wiLCBcIlNoaWtpLU91amlcIiwgXCJPdWt1bmludXNoaVwiLCBcIkhhY2hpbWFuXCIsIFwiSGl0b2tvdG8tTnVzaGlcIl0sXG4gICAgICAgIGxldmVsOiA3NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIk51bFwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJSZlwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJyYXZlIEJsYWRlLCBQb3dlciBDaGFyZ2UsIFppb2R5bmUsIEhlYXQgUmlzZXIoNzcpLCBSZXBlbCBFbGVjKDc4KSwgRWxlYyBBbXAoNzkpLCBIYXNzb3UgVG9iaSg4MylcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0YXIgU3ByZWFkXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3RhcixcbiAgICAgICAgbmFtZV9qcDogXCLjgrXjg4jjgqXjg6vjg4zjgrlcIixcbiAgICAgICAgbmFtZTogXCJTYXR1cm51c1wiLFxuICAgICAgICBsZXZlbDogNzUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgTWFyYWdpZHluZSwgRmlyZSBBbXAsIEV2YWRlIEljZSg3NyksIEdyb3d0aCAzKDc5KSwgU3BlbGwgTWFzdGVyKDgxKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiWW9tb3RzdSBIaXJhc2FrYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhpZXJvcGhhbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Kz44Km44Oq44Ol44KmXCIsXG4gICAgICAgIG5hbWU6IFwiS29ocnl1XCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJHZW5idVwiLFwiU2Vpcnl1XCIsXCJTdXpha3VcIixcIkJ5YWtrb1wiXSxcbiAgICAgICAgbGV2ZWw6IDc2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiUmZcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvZHluZSwgTWVkaWFyYWhhbiwgU2FtYXJlY2FybSwgTWF6aW9keW5lKDc4KSwgTWluZCBDaGFyZ2UoNzkpLCBFbGVjIEFtcCg4MCksIFNwZWxsIE1hc3Rlcig4MiksIFNhbHZhdGlvbig4MylcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1ZGdlbWVudCxcbiAgICAgICAgbmFtZV9qcDogXCLjgrXjgr/jg7NcIixcbiAgICAgICAgbmFtZTogXCJTYXRhblwiLFxuICAgICAgICBsZXZlbDogNzYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlJmXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWdpZG9sYW9uLCBNYXJhZ2lvbiwgUmVnZW5lcmF0ZSAzKDc3KSwgSW52aWdvcmF0ZSAzKDc4KSwgRW5kdXJlIExpZ2h0KDgwKSwgQmxhY2sgVmlwZXIoODEpLCBOdWxsIFdpbmQoODIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiQWxtaWdodHlcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1vb24sXG4gICAgICAgIG5hbWVfanA6IFwi44OQ44Ki44Or44O744K844OW44OrXCIsXG4gICAgICAgIG5hbWU6IFwiQmFhbCBaZWJ1bFwiLFxuICAgICAgICBsZXZlbDogNzcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFidWZ1ZHluZSwgTWFtdWRvb24sIE9sZCBPbmUsIFRlbnRhcmFmb28oNzgpLCBNYXppb2R5bmUoNzkpLCBNdWRvIEJvb3N0KDgwKSwgU3RhZ25hbnQgQWlyKDgyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3VuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCueODkeODq+ODilwiLFxuICAgICAgICBuYW1lOiBcIlN1cGFybmFcIixcbiAgICAgICAgbGV2ZWw6IDc3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiRHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1ZHluZSwgTWFrYWphbSwgRXZhZGUgSWNlKDc5KSwgV2luZCBBbXAoODApLCBNYWdhcnVkeW5lKDgxKSwgRXZhZGUgRmlyZSg4MiksIEVsZWMgQW1wKDgzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiWW9tb3RzdSBIaXJhc2FrYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkplc3RlcixcbiAgICAgICAgbmFtZTogXCJNYWdhdHN1LUl6YW5hZ2lcIixcbiAgICAgICAgbGV2ZWw6IDc3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5NYWdpY2lhbixcbiAgICAgICAgbmFtZV9qcDogXCLjg57jg4BcIixcbiAgICAgICAgbmFtZTogXCJNYWRhXCIsXG4gICAgICAgIGxldmVsOiA3OCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiRHJcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgRmlyZSBCb29zdCwgRm9vbGlzaCBXaGlzcGVyLCBNYXJhZ2lkeW5lKDgxKSwgRXZhZGUgSWNlKDgyKSwgQWlsbWVudCBCb29zdCg4MyksIEZpcmUgQW1wKDg0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGVhdGgsXG4gICAgICAgIG5hbWVfanA6IFwi44Oe44OP44Kr44O844OpXCIsXG4gICAgICAgIG5hbWU6IFwiTWFoYWthbGFcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIk1hdGFkb3JcIixcIldoaXRlIFJpZGVyXCIsXCJNb3RoZXIgSGFybG90XCIsXCJEYWlzb3Vqb3VcIixcIkhlbGwgQmlrZXJcIixcIlRydW1wZXRlclwiXSxcbiAgICAgICAgbGV2ZWw6IDc4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJEclwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWR5bmUsIE15cmlhZCBBcnJvd3MsIFBvd2VyIENoYXJnZSwgTWluZCBDaGFyZ2UoODApLCBNYXJhZ2lkeW5lKDgyKSwgTWFtdWRvb24oODMpLCBGaXJlIEFtcCg4NCksIE11ZG8gQm9vc3QoODUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44K544Kr44Ki44OPXCIsXG4gICAgICAgIG5hbWU6IFwiU2NhdGhhY2hcIixcbiAgICAgICAgbGV2ZWw6IDc5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hYnVmdWR5bmUsIEdhcnVkeW5lLCBBbXJpdGEoODEpLCBNYWdhcnVkeW5lKDgyKSwgSWNlIEFtcCg4MyksIFdpbmQgQW1wKDg0KSwgTWluZCBDaGFyZ2UoODUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcHJlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44Kk44K344K5XCIsXG4gICAgICAgIG5hbWU6IFwiSXNpc1wiLFxuICAgICAgICBsZXZlbDogNzksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJSZlwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZGlhcmFoYW4sIEJ1ZnVkeW5lLCBUZXRyYWthcm4sIENvb2wgQnJlZXplKDgwKSwgQWJzb3JiIEljZSg4MiksIE1hYnVmdWR5bmUoODMpLCBTYWx2YXRpb24oODUpLCBOdWxsIEVsZWMoODYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQ2hhcmlvdCxcbiAgICAgICAgbmFtZV9qcDogXCLjg5Xjg4Tjg4zjgrdcIixcbiAgICAgICAgbmFtZTogXCJGdXRzdW51c2hpXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJBcmVzXCIsXCJUcmlnbGF2XCIsXCJLaW4ta2lcIixcIkF0YXZha2FcIixcIk5la28gU2hvZ3VuXCJdLFxuICAgICAgICBsZXZlbDogODAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJOdWxcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJQcmltYWwgRm9yY2UsIFBvd2VyIENoYXJnZSwgTWF0YXJ1a2FqYSwgQXB0IFB1cGlsKDgyKSwgTnVsbCBEaXp6eSg4MyksIEFsaSBEYW5jZSg4NCksIEFybXMgTWFzdGVyKDg1KSwgRmlybSBTdGFuY2UoODYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Ub3dlcixcbiAgICAgICAgbmFtZV9qcDogXCLjgrfjg7TjgqFcIixcbiAgICAgICAgbmFtZTogXCJTaGl2YVwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiUmFuZ2RhXCIsXCJCYXJvbmdcIl0sXG4gICAgICAgIGxldmVsOiA4MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvZHluZSwgTWFnYXJ1ZHluZSwgRW5kdXJpbmcgU291bCwgTWF6aW9keW5lKDgyKSwgU3BlbGwgTWFzdGVyKDgzKSwgTWVnaWRvbGFvbig4NCksIFByYWxheWEoODcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZXZpbCxcbiAgICAgICAgbmFtZV9qcDogXCLjg5njg6vjgrzjg5bjg5ZcIixcbiAgICAgICAgbmFtZTogXCJCZWVsemVidWJcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIkJlbGlhbFwiLCBcIkJlbHBoZWdvclwiLCBcIkJhYWwgWmVidWxcIiwgXCJTZXRoXCIsIFwiTW90XCIsIFwiUGF6dXp1XCJdLFxuICAgICAgICBsZXZlbDogODEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lkeW5lLCBNYWJ1ZnVkeW5lLCBNaW5kIENoYXJnZSwgUHJpbWFsIEZvcmNlKDgzKSwgTWFtdWRvb24oODQpLCBFbmR1cmUgTGlnaHQoODUpLCBNdWRvIEJvb3N0KDg2KSwgTWVnaWRvbGFvbig4NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhlcm1pdCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqrjg7Pjgq7jg6fjgqbjgq1cIixcbiAgICAgICAgbmFtZTogXCJPbmd5by1raVwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiT25pXCIsIFwiRnV1LWtpXCIsIFwiS2luLWtpXCIsIFwiU3VpLWtpXCJdLFxuICAgICAgICBsZXZlbDogODIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiRHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJGb29saXNoIFdoaXNwZXIsIFppb2R5bmUsIE1hc3VrdWthamEsIEFpbG1lbnQgQm9vc3QoODQpLCBFbGVjIEFtcCg4NSksIFJldm9sdXRpb24oODYpLCBGaXJtIFN0YW5jZSg4NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhhbmdlZE1hbixcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg4bjgqPjgrlcIixcbiAgICAgICAgbmFtZTogXCJBdHRpc1wiLFxuICAgICAgICBsZXZlbDogODIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiUmZcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgQW1yaXRhLCBNYXJha3VrYWphLCBFbmR1cmluZyBTb3VsKDg0KSwgU2FtYXJlY2FybSg4NiksIE1hcmFnaWR5bmUoODcpLCBNYW11ZG9vbig4OClcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1ZGdlbWVudCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6Hjgr/jg4jjg63jg7NcIixcbiAgICAgICAgbmFtZTogXCJNZXRhdHJvblwiLFxuICAgICAgICBsZXZlbDogODMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiUmZcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFoYW1hb24sIEhlYXZlbidzIEJsYWRlLCBNZWdpZG9sYW9uKDg2KSwgUmVwZWwgSWNlKDg3KSwgUmVwZWwgRWxlYyg4OCksIFJlcGVsIEZpcmUoODkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1vb24sXG4gICAgICAgIG5hbWVfanA6IFwi44K144Oz44OA44Or44OV44Kp44OzXCIsXG4gICAgICAgIG5hbWU6IFwiU2FuZGFscGhvblwiLFxuICAgICAgICBsZXZlbDogODQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiUmZcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFoYW1hb24sIFNhbWFyZWNhcm0sIEFtcml0YSwgQW5nZWxpYyBHcmFjZSg4NyksIEFnbmV5YXN0cmEoODgpLCBFbmR1cmUgRGFyayg4OSksIFJlcGVsIERhcmsoOTApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3VuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouOCueODqeOBiuOBhlwiLFxuICAgICAgICBuYW1lOiBcIkFzdXJhXCIsXG4gICAgICAgIGxldmVsOiA4NixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXJhZ2lkeW5lLCBQcmltYWwgRm9yY2UsIE1hcmFrdWthamEsIE1haGFtYW9uKDg4KSwgSGlnaCBDb3VudGVyKDg5KSwgU3BlbGwgTWFzdGVyKDkwKSwgVW5zaGFrZW4gV2lsbCg5MilcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0YXIsXG4gICAgICAgIG5hbWVfanA6IFwi44Or44K344OV44Kn44OrXCIsXG4gICAgICAgIG5hbWU6IFwiSGVsZWxcIixcbiAgICAgICAgbGV2ZWw6IDg3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWVnaWRvbGFvbiwgTWFyYWdpZHluZSwgR29kJ3MgSGFuZCwgU2FsdmF0aW9uKDg4KSwgSW5zdGEtSGVhbCg5MCksIFJlcGVsIFdpbmQoOTEpLCBBcm1zIE1hc3Rlcig5MiksIE1vcm5pbmcgU3Rhcig5NClcIixcbiAgICAgICAgaW5oZXJpdDogXCJBbG1pZ2h0eVwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdHJlbmd0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjgrbjgqrjgqbjgrTjg7PjgrLjg7NcIixcbiAgICAgICAgbmFtZTogXCJaYW91IEdvbmdlblwiLFxuICAgICAgICBsZXZlbDogOTAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlJmXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hcmFnaWR5bmUsIFBvd2VyIENoYXJnZSwgR29kJ3MgSGFuZCwgQW5pbWEgRnJlZXplKDkyKSwgRXZhZGUgUGh5c2ljYWwoOTMpLCBFbmR1cmluZyBTb3VsKDk0KSwgRmlyZSBBbXAoOTUpLCBWb3JwYWwgQmxhZGUoOTYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdWRnZW1lbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44Or44OA44O8XCIsXG4gICAgICAgIG5hbWU6IFwiQXJkaGFcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIlBhcnZhdGlcIixcIlNoaXZhXCJdLFxuICAgICAgICBsZXZlbDogOTAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJQcmltYWwgRm9yY2UsIEdvZCdzIEhhbmQsIE1lZ2lkb2xhb24oOTEpLCBOdWxsIERpenp5KDkyKSwgQXV0by1SYWt1a2FqYSg5MyksIE1lZGlhcmFoYW4oOTQpLCBBbmdlbGljIEdyYWNlKDk1KSwgTnVsbCBQaHlzaWNhbCg5NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJBbG1pZ2h0eVwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuV29ybGQsXG4gICAgICAgIG5hbWVfanA6IFwi5LyK6YKq6YKj5bKQ5aSn56WeXCIsXG4gICAgICAgIG5hbWU6IFwiSXphbmFnaS1uby1Pa2FtaVwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiSXphbmFnaVwiLCBcIlNhbmRtYW5cIiwgXCJOYXRhIFRhaXNoaVwiLCBcIkdpcmltZWhrYWxhXCIsIFwiTm9yblwiLCBcIk91a3VuaW51c2hpXCIsIFwiT3J0aHJ1c1wiLCBcIkthcnRpa2V5YVwiLCBcIk1pdGhyYVwiLCBcIlR6aXR6aW1pdGxcIiwgXCJDdSBDaHVsYWlublwiLCBcIkxlZ2lvblwiXSxcbiAgICAgICAgbGV2ZWw6IDkxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiU3RyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZ2lkb2xhb24sIFZpY3RvcnkgQ3J5LCBBbmdlbGljIEdyYWNlLCBNaW5kIENoYXJnZSwgQWdpZHluZSg5MiksIEJ1ZnVkeW5lKDkzKSwgWmlvZHluZSg5NCksIEdhcnVkeW5lKDk1KSwgRmlyZSBBbXAoOTYpLCBJY2UgQW1wKDk3KSwgRWxlYyBBbXAoOTgpLCBXaW5kIEFtcCg5OSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJOdWxsXCIsXG4gICAgICAgIG5vdGVzOiBcIk9ubHkgaW4gTmV3IEdhbWUrIHdpdGggZGF0YSBmcm9tIFRydWUgRW5kaW5nXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVkZ2VtZW50LFxuICAgICAgICBuYW1lX2pwOiBcIuODq+OCt+ODleOCoeODvFwiLFxuICAgICAgICBuYW1lOiBcIkx1Y2lmZXJcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIkFuYW50YVwiLFwiQW51YmlzXCIsXCJUcnVtcGV0ZXJcIixcIk1pY2hhZWxcIixcIlNhdGFuXCIsXCJNZXRhdHJvblwiXSxcbiAgICAgICAgbGV2ZWw6IDkzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCdWZ1ZHluZSwgQnJhdmUgQmxhZGUsIE1pbmQgQ2hhcmdlLCBJY2UgQW1wKDk0KSwgU3BlbGwgTWFzdGVyKDk1KSwgUmVwZWwgTGlnaHQoOTYpLCBBYnNvcmIgRWxlYyg5OCksIFZpY3RvcnkgQ3J5KDk5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH1dO1xuXG5mdW5jdGlvbiBjb21wYXJlUGVyc29uYShhLCBiKSBcbntcbiAgICB2YXIgbHZsRGlmZiA9IGEubGV2ZWwgLSBiLmxldmVsO1xuICAgIGlmKCBsdmxEaWZmICE9IDAgKSB7XG4gICAgICAgIHJldHVybiBsdmxEaWZmO1xuICAgIH1cbiAgICByZXR1cm4gYS5hcmNhbmEgLSBiLmFyY2FuYTtcbn1cblxudmFyIHBlcnNvbmFCeUFyY2FuYSA9IFtdO1xudmFyIHBlcnNvbmFCeU5hbWUgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgQXJjYW5hLkNvdW50OyBpKyspIHtcbiAgICBwZXJzb25hQnlBcmNhbmEucHVzaChbXSk7XG59O1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IHBlcnNvbmFCeUx2bC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwZXJzb25hID0gcGVyc29uYUJ5THZsW2ldO1xuICAgIHBlcnNvbmFCeUFyY2FuYVtwZXJzb25hLmFyY2FuYV0ucHVzaChwZXJzb25hKTtcbiAgICBwZXJzb25hQnlOYW1lW3BlcnNvbmEubmFtZV0gPSBwZXJzb25hO1xufTtcblxuZnVuY3Rpb24gZmluZFBlcnNvbmFCeUxldmVsKCBhcmNhbmEsIGxldmVsICkge1xuICAgIHZhciByZXN1bHRQZXJzb25hID0gbnVsbDtcbiAgICBpZiggYXJjYW5hICE9PSBudWxsICYmIGFyY2FuYSAhPT0gdW5kZWZpbmVkICkgXG4gICAge1xuICAgICAgICB2YXIgYXJjYW5hUGVyc29uYSA9IHBlcnNvbmFCeUFyY2FuYVthcmNhbmFdOyBcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7ICFyZXN1bHRQZXJzb25hICYmIGkgPCBhcmNhbmFQZXJzb25hLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGVyc29uYSA9IGFyY2FuYVBlcnNvbmFbaV07XG4gICAgICAgICAgICBpZiggcGVyc29uYS5sZXZlbCA+PSBsZXZlbCApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRQZXJzb25hID0gcGVyc29uYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0UGVyc29uYTtcbn1cblxuZnVuY3Rpb24gTm9ybWFsQ2FsY3VsYXRpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG4gICAgdmFyIGxldmVsID0gKChmaXJzdC5sZXZlbCArIHNlY29uZC5sZXZlbCkgLyAyICkgKyAxO1xuICAgIHZhciBhcmNhbmEgPSBBcmNhbmEuR2V0Tm9ybWFsUmVzdWx0KCBmaXJzdC5hcmNhbmEsIHNlY29uZC5hcmNhbmEgKTtcbiAgICByZXR1cm4gZmluZFBlcnNvbmFCeUxldmVsKGFyY2FuYSwgbGV2ZWwpO1xufVxuXG5mdW5jdGlvbiBnZXRUcmlhbmdsZUxldmVsKGZpcnN0LHNlY29uZCx0aGlyZCkge1xuICAgIHJldHVybiAoKGZpcnN0LmxldmVsICsgc2Vjb25kLmxldmVsICsgdGhpcmQubGV2ZWwpIC8gMyApICsgNTtcbn1cblxuZnVuY3Rpb24gVHJpYW5nbGVDYWxjdWxhdGlvbihmaXJzdCxzZWNvbmQsdGhpcmQpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgYXJncy5zb3J0KGNvbXBhcmVQZXJzb25hKTtcblxuICAgIHZhciBsZXZlbCA9IGdldFRyaWFuZ2xlTGV2ZWwoZmlyc3Qsc2Vjb25kLHRoaXJkKTtcbiAgICB2YXIgYXJjYW5hID0gQXJjYW5hLkdldFRyaWFuZ2xlUmVzdWx0KCBhcmdzWzBdLmFyY2FuYSwgYXJnc1sxXS5hcmNhbmEsIGFyZ3NbMl0uYXJjYW5hICk7XG4gICAgcmV0dXJuIGZpbmRQZXJzb25hQnlMZXZlbChhcmNhbmEsIGxldmVsKTtcbn1cblxuZnVuY3Rpb24gY29udmVydEZyb21OYW1lTGlzdCggbmFtZUxpc3QgKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goIHBlcnNvbmFCeU5hbWVbbmFtZUxpc3RbaV1dICk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIEJhY2tDYWxjTm9ybWFsKCBwZXJzb25hLCBpbmNsdWRpbmcgKSB7XG4gICAgLy8gZGFtbiBzcGVjaWFsIHBlcnNvbmEgdGhpbmsgdGhleSBvd24gdGhlIHBsYWNlIVxuICAgIGlmKCBwZXJzb25hLmZ1c2lvblJlY2lwZU5hbWVzIClcbiAgICAgICAgcmV0dXJuIFtjb252ZXJ0RnJvbU5hbWVMaXN0KHBlcnNvbmEuZnVzaW9uUmVjaXBlTmFtZXMpXTtcblxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgYXJjYW5hID0gcGVyc29uYS5hcmNhbmE7XG5cbiAgICB2YXIgbm9ybWFsQXJjYW5hTWl4ZXMgPSBBcmNhbmEuQmFja0NhbGNOb3JtYWwoIGFyY2FuYSApO1xuICAgIGlmKCBub3JtYWxBcmNhbmFNaXhlcy5sZW5ndGggPiAxICkge1xuICAgICAgICBmb3IgKHZhciBub3JtYWxJZHggPSAwOyBub3JtYWxJZHggPCBub3JtYWxBcmNhbmFNaXhlcy5sZW5ndGg7IG5vcm1hbElkeCsrKSB7XG4gICAgICAgICAgICB2YXIgbWl4ID0gbm9ybWFsQXJjYW5hTWl4ZXNbbm9ybWFsSWR4XTtcbiAgICAgICAgICAgIHZhciBmaXJzdCA9IG1peFswXSwgc2Vjb25kID0gbWl4WzFdO1xuXG4gICAgICAgICAgICBpZiggZmlyc3QgIT0gc2Vjb25kIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RMaXN0ID0gcGVyc29uYUJ5QXJjYW5hW2ZpcnN0XTtcbiAgICAgICAgICAgICAgICB2YXIgc2Vjb25kTGlzdCA9IHBlcnNvbmFCeUFyY2FuYVtzZWNvbmRdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlyc3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2Vjb25kTGlzdC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0UGVyc29uYSA9IGZpcnN0TGlzdFtpXSwgc2Vjb25kUGVyc29uYSA9IHNlY29uZExpc3Rbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggIWluY2x1ZGluZyB8fCBmaXJzdFBlcnNvbmEgPT0gaW5jbHVkaW5nIHx8IHNlY29uZFBlcnNvbmEgPT0gaW5jbHVkaW5nICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBOb3JtYWxDYWxjdWxhdGlvbihmaXJzdFBlcnNvbmEsIHNlY29uZFBlcnNvbmEpID09IHBlcnNvbmEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtmaXJzdFBlcnNvbmEsIHNlY29uZFBlcnNvbmFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gQmFja0NhbGNUcmlhbmdsZSggcGVyc29uYSwgaW5jbHVkaW5nICkge1xuICAgIC8vIGRhbW4gc3BlY2lhbCBwZXJzb25hIHRoaW5rIHRoZXkgb3duIHRoZSBwbGFjZSFcbiAgICBpZiggcGVyc29uYS5mdXNpb25SZWNpcGVOYW1lcyApXG4gICAgICAgIHJldHVybiBbY29udmVydEZyb21OYW1lTGlzdChwZXJzb25hLmZ1c2lvblJlY2lwZU5hbWVzKV07XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIHRyaWFuZ2xlcyA9IEFyY2FuYS5CYWNrQ2FsY1RyaWFuZ2xlKCBhcmNhbmEgKTtcbiAgICB2YXIgYXJjYW5hID0gcGVyc29uYS5hcmNhbmE7XG4gICAgY29uc29sZS5sb2coIFwiVHJ5aW5nIHRvIGJydXRlIGZvcmNlIHRocm91Z2ggXCIgKyB0cmlhbmdsZXMubGVuZ3RoICsgXCIgY29tYmluYXRpb25zIC4uLlwiKTtcbiAgICBmb3IgKHZhciB0cmlhbmdsZUlkeCA9IDA7IHRyaWFuZ2xlSWR4IDwgdHJpYW5nbGVzLmxlbmd0aDsgdHJpYW5nbGVJZHgrKykge1xuICAgICAgICB2YXIgdHJpYW5nbGUgPSB0cmlhbmdsZXNbdHJpYW5nbGVJZHhdO1xuICAgICAgICB2YXIgZmlyc3RBcmNhbmEgPSB0cmlhbmdsZVswXSwgc2Vjb25kQXJjYW5hID0gdHJpYW5nbGVbMV0sIHRoaXJkQXJjYW5hID0gdHJpYW5nbGVbMl07XG4gICAgICAgIHZhciBmaXJzdFBlcnNvbmFzID0gcGVyc29uYUJ5QXJjYW5hW2ZpcnN0QXJjYW5hXSwgc2Vjb25kUGVyc29uYXMgPSBwZXJzb25hQnlBcmNhbmFbc2Vjb25kQXJjYW5hXSwgdGhpcmRQZXJzb25hcyA9IHBlcnNvbmFCeUFyY2FuYVt0aGlyZEFyY2FuYV07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlyc3RQZXJzb25hcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWNvbmRQZXJzb25hcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcmRQZXJzb25hcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSBmaXJzdFBlcnNvbmFzW2ldLCBzZWNvbmQgPSBzZWNvbmRQZXJzb25hc1tqXSwgdGhpcmQgPSB0aGlyZFBlcnNvbmFzW2tdO1xuICAgICAgICAgICAgICAgICAgICBpZiggIWluY2x1ZGluZyB8fCBmaXJzdCA9PSBpbmNsdWRpbmcgfHwgc2Vjb25kID09IGluY2x1ZGluZyB8fCB0aGlyZCA9PSBpbmNsdWRpbmcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSBnZXRUcmlhbmdsZUxldmVsKGZpcnN0LHNlY29uZCx0aGlyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGJlIGx0ZSB0byBnZXQgdGhpcyBmdXNpb247IHB1bnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBsZXZlbCA+IHBlcnNvbmEubGV2ZWwgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggVHJpYW5nbGVDYWxjdWxhdGlvbihmaXJzdCxzZWNvbmQsdGhpcmQpID09IHBlcnNvbmEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goW2ZpcnN0LHNlY29uZCx0aGlyZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBUb1N0cmluZyhwZXJzb25hKSB7XG4gICAgcmV0dXJuIHBlcnNvbmEubmFtZSArIFwiIChcIitBcmNhbmEuVG9TdHJpbmcocGVyc29uYS5hcmNhbmEpK1wiLCBcIiArcGVyc29uYS5sZXZlbCtcIilcIjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgQnlMZXZlbDogcGVyc29uYUJ5THZsLFxuICAgIEJ5QXJjYW5hOiBwZXJzb25hQnlBcmNhbmEsXG4gICAgQnlOYW1lOiBwZXJzb25hQnlOYW1lLFxuICAgIE5vcm1hbENhbGN1bGF0aW9uOiBOb3JtYWxDYWxjdWxhdGlvbixcbiAgICBUcmlhbmdsZUNhbGN1bGF0aW9uOiBUcmlhbmdsZUNhbGN1bGF0aW9uLFxuICAgIEJhY2tDYWxjOiBCYWNrQ2FsY05vcm1hbCxcbiAgICBCYWNrQ2FsY05vcm1hbDogQmFja0NhbGNOb3JtYWwsXG4gICAgQmFja0NhbGNUcmlhbmdsZTogQmFja0NhbGNUcmlhbmdsZSxcbiAgICBUb1N0cmluZzogVG9TdHJpbmdcbn1cbiJdfQ==
