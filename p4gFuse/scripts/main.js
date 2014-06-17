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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY29ucmFkL0RldmVsb3Blci9QZXJzb25hbC9wNGdGdXNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY29ucmFkL0RldmVsb3Blci9QZXJzb25hbC9wNGdGdXNlL2FwcC9zY3JpcHRzL2FyY2FuYS5qcyIsIi9Vc2Vycy9jb25yYWQvRGV2ZWxvcGVyL1BlcnNvbmFsL3A0Z0Z1c2UvYXBwL3NjcmlwdHMvbWFpbi5qcyIsIi9Vc2Vycy9jb25yYWQvRGV2ZWxvcGVyL1BlcnNvbmFsL3A0Z0Z1c2UvYXBwL3NjcmlwdHMvcGVyc29uYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0MUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLy8gY3J1ZGUgQXJjYW5hIGVudW1cbnZhciBGb29sID0gMCxcblx0TWFnaWNpYW4gPTEsXG5cdFByaWVzdGVzcyA9Mixcblx0RW1wcmVzcyA9Myxcblx0RW1wZXJvciA9NCxcblx0SGllcm9waGFudCA9NSxcblx0TG92ZXJzID02LFxuXHRDaGFyaW90ID03LFxuXHRKdXN0aWNlID04LFxuXHRIZXJtaXQgPTksXG5cdEZvcnR1bmUgPTEwLFxuXHRTdHJlbmd0aCA9MTEsXG5cdEhhbmdlZE1hbiA9MTIsXG5cdERlYXRoID0xMyxcblx0VGVtcGVyYW5jZSA9MTQsXG5cdERldmlsID0xNSxcblx0VG93ZXIgPTE2LFxuXHRTdGFyID0xNyxcblx0TW9vbiA9MTgsXG5cdFN1biA9MTksXG5cdEp1ZGdlbWVudCA9MjAsXG5cdEplc3RlciA9MjEsXG5cdEFlb24gPTIyLFxuXHRXb3JsZCA9IDIzO1xuXG52YXIgTnVtQXJjYW5hID0gV29ybGQgKyAxO1xuXG5mdW5jdGlvbiBJbml0aWFsaXplU3ByZWFkKCkge1xuXHR2YXIgcmVzdWx0ID0gbmV3IEFycmF5KE51bUFyY2FuYSk7XG5cdGZvciggdmFyIGkgPSAwOyBpIDwgTnVtQXJjYW5hOyArK2kgKSB7XG5cdFx0cmVzdWx0W2ldID0gbmV3IEFycmF5KE51bUFyY2FuYSk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gR2V0UmVzdWx0KCBzcHJlYWQsIGZpcnN0LCBzZWNvbmQgKSB7XG5cdHZhciByZXN1bHQgPSBzcHJlYWRbZmlyc3RdW3NlY29uZF07XG5cdC8vIGRvIGNvbW11dGF0aXZlIHNlYXJjaCBpZiB3ZSBjYW1lIHVwIHNob3J0XG5cdGlmKCByZXN1bHQgPT09IHVuZGVmaW5lZCB8fCByZXN1bHQgPT09IG51bGwgKVxuXHRcdHJlc3VsdCA9IHNwcmVhZFtzZWNvbmRdW2ZpcnN0XTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIE5vcm1hbFNwcmVhZCA9IEluaXRpYWxpemVTcHJlYWQoKTtcbnZhciBUcmlhbmdsZVNwcmVhZCA9IEluaXRpYWxpemVTcHJlYWQoKTtcblxuXG5mdW5jdGlvbiBBZGRTcHJlYWQoIHNwcmVhZCwgZmlyc3QsIHNlY29uZCwgcmVzdWx0LCBjb21tdXRhdGl2ZSApIHtcblx0c3ByZWFkW2ZpcnN0XVtzZWNvbmRdID0gcmVzdWx0O1xuXHRpZiggY29tbXV0YXRpdmUgKSB7XG5cdFx0c3ByZWFkW3NlY29uZF1bZmlyc3RdID0gcmVzdWx0O1xuXHR9XG59XG5cbmZ1bmN0aW9uIEFkZE5vcm1hbFNwcmVhZCggZmlyc3QsIHNlY29uZCwgcmVzdWx0ICkge1xuXHRBZGRTcHJlYWQoTm9ybWFsU3ByZWFkLCBmaXJzdCwgc2Vjb25kLCByZXN1bHQsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gQWRkVHJpYW5nbGVTcHJlYWQoIGZpcnN0LCBzZWNvbmQsIHJlc3VsdCApIHtcblx0QWRkU3ByZWFkKFRyaWFuZ2xlU3ByZWFkLCBmaXJzdCwgc2Vjb25kLCByZXN1bHQsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBBZGRTcHJlYWRzKCkge1xuXHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdHZhciBzcHJlYWQgPSBhcmdzLnNoaWZ0KCk7XG5cdHZhciBzcmNBcmNhbmEgPSBhcmdzLnNoaWZ0KCk7XG5cblx0QWRkU3ByZWFkKHNwcmVhZCwgc3JjQXJjYW5hLCBzcmNBcmNhbmEsIHNyY0FyY2FuYSk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrPTIpIHtcblx0XHRBZGRTcHJlYWQoc3ByZWFkLCBzcmNBcmNhbmEsIGFyZ3NbaV0sIGFyZ3NbaSsxXSk7XG5cdH07XG5cbn1cblxuZnVuY3Rpb24gQWRkTm9ybWFsU3ByZWFkcygpIHtcblx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRhcmdzLnVuc2hpZnQoTm9ybWFsU3ByZWFkKTtcblx0QWRkU3ByZWFkcy5hcHBseShudWxsLGFyZ3MpO1xufVxuXG5mdW5jdGlvbiBBZGRUcmlhbmdsZVNwcmVhZHMoKSB7XG5cdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0YXJncy51bnNoaWZ0KFRyaWFuZ2xlU3ByZWFkKTtcblx0QWRkU3ByZWFkcy5hcHBseShudWxsLGFyZ3MpO1xufVxuXG5BZGROb3JtYWxTcHJlYWRzKCBGb29sLFxuXHRNYWdpY2lhbiwgVGVtcGVyYW5jZSxcblx0UHJpZXN0ZXNzLCBEZWF0aCxcblx0RW1wcmVzcywgTW9vbixcblx0RW1wZXJvciwgRGVhdGgsXG5cdEhpZXJvcGhhbnQsIENoYXJpb3QsXG5cdExvdmVycywgRW1wcmVzcyxcblx0Q2hhcmlvdCwgU3VuLFxuXHRKdXN0aWNlLCBNYWdpY2lhbixcblx0SGVybWl0LCBTdHJlbmd0aCxcblx0Rm9ydHVuZSwgTWFnaWNpYW4sXG5cdFN0cmVuZ3RoLCBNYWdpY2lhbixcblx0SGFuZ2VkTWFuLCBTdHJlbmd0aCxcblx0RGVhdGgsIEhlcm1pdCxcblx0VGVtcGVyYW5jZSwgSGllcm9waGFudCxcblx0RGV2aWwsIFRlbXBlcmFuY2UsXG5cdFRvd2VyLCBTdGFyLFxuXHRTdGFyLCBFbXByZXNzLFxuXHRNb29uLCBFbXBlcm9yLFxuXHRTdW4sIERldmlsLFxuXHRKdWRnZW1lbnQsIEhhbmdlZE1hbixcblx0SmVzdGVyLCBQcmllc3Rlc3MsXG5cdEFlb24sIERlYXRoXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBNYWdpY2lhbixcblx0UHJpZXN0ZXNzLCBNb29uLFxuXHRFbXByZXNzLCBKdXN0aWNlLFxuXHRFbXBlcm9yLCBTdHJlbmd0aCxcblx0SGllcm9waGFudCwgRGV2aWwsXG5cdExvdmVycywgRGVhdGgsXG5cdENoYXJpb3QsIFRlbXBlcmFuY2UsXG5cdEp1c3RpY2UsIFN0cmVuZ3RoLFxuXHRIZXJtaXQsIEVtcHJlc3MsXG5cdEZvcnR1bmUsIExvdmVycyxcblx0U3RyZW5ndGgsIEp1c3RpY2UsXG5cdEhhbmdlZE1hbiwgU3VuLFxuXHREZWF0aCwgRW1wZXJvcixcblx0VGVtcGVyYW5jZSwgU3RyZW5ndGgsXG5cdERldmlsLCBTdW4sXG5cdFRvd2VyLCBIYW5nZWRNYW4sXG5cdFN0YXIsIG51bGwsXG5cdE1vb24sIFN0YXIsXG5cdFN1biwgQ2hhcmlvdCxcblx0SnVkZ2VtZW50LCBMb3ZlcnMsXG5cdEplc3RlciwgSGllcm9waGFudCxcblx0QWVvbiwgRW1wZXJvclxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggUHJpZXN0ZXNzLFxuXHRFbXByZXNzLCBIZXJtaXQsXG5cdEVtcGVyb3IsIEVtcHJlc3MsXG5cdEhpZXJvcGhhbnQsIFN1bixcblx0TG92ZXJzLCBFbXBlcm9yLFxuXHRDaGFyaW90LCBIaWVyb3BoYW50LFxuXHRKdXN0aWNlLCBIZXJtaXQsXG5cdEhlcm1pdCwgRGVhdGgsXG5cdEZvcnR1bmUsIEhhbmdlZE1hbixcblx0U3RyZW5ndGgsIEp1c3RpY2UsXG5cdEhhbmdlZE1hbiwgTW9vbixcblx0RGVhdGgsIE1hZ2ljaWFuLFxuXHRUZW1wZXJhbmNlLCBIaWVyb3BoYW50LFxuXHREZXZpbCwgSnVzdGljZSxcblx0VG93ZXIsIE1hZ2ljaWFuLFxuXHRTdGFyLCBFbXBlcm9yLFxuXHRNb29uLCBTdGFyLFxuXHRTdW4sIERldmlsLFxuXHRKdWRnZW1lbnQsIFN1bixcblx0SmVzdGVyLCBEZXZpbCxcblx0QWVvbiwgU3VuXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBFbXByZXNzLFxuXHRFbXBlcm9yLCBNb29uLFxuXHRIaWVyb3BoYW50LCBEZWF0aCxcblx0TG92ZXJzLCBKdXN0aWNlLFxuXHRDaGFyaW90LCBKdXN0aWNlLFxuXHRKdXN0aWNlLCBNYWdpY2lhbixcblx0SGVybWl0LCBNYWdpY2lhbixcblx0Rm9ydHVuZSwgU3Rhcixcblx0U3RyZW5ndGgsIEhpZXJvcGhhbnQsXG5cdEhhbmdlZE1hbiwgVGVtcGVyYW5jZSxcblx0RGVhdGgsIENoYXJpb3QsXG5cdFRlbXBlcmFuY2UsIERldmlsLFxuXHREZXZpbCwgUHJpZXN0ZXNzLFxuXHRUb3dlciwgSGVybWl0LFxuXHRTdGFyLCBDaGFyaW90LFxuXHRNb29uLCBUZW1wZXJhbmNlLFxuXHRTdW4sIFByaWVzdGVzcyxcblx0SnVkZ2VtZW50LCBQcmllc3Rlc3MsXG5cdEplc3RlciwgU3RyZW5ndGgsXG5cdEFlb24sIFRlbXBlcmFuY2Vcbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIEVtcGVyb3IsXG5cdEhpZXJvcGhhbnQsIEVtcHJlc3MsXG5cdExvdmVycywgSnVzdGljZSxcblx0Q2hhcmlvdCwgVGVtcGVyYW5jZSxcblx0SnVzdGljZSwgRGV2aWwsXG5cdEhlcm1pdCwgUHJpZXN0ZXNzLFxuXHRGb3J0dW5lLCBMb3ZlcnMsXG5cdFN0cmVuZ3RoLCBIZXJtaXQsXG5cdEhhbmdlZE1hbiwgRW1wcmVzcyxcblx0RGVhdGgsIE1vb24sXG5cdFRlbXBlcmFuY2UsIFN1bixcblx0RGV2aWwsIE1vb24sXG5cdFRvd2VyLCBTdGFyLFxuXHRTdGFyLCBEZWF0aCxcblx0TW9vbiwgTWFnaWNpYW4sIFxuXHRTdW4sIENoYXJpb3QsXG5cdEp1ZGdlbWVudCwgTG92ZXJzLFxuXHRKZXN0ZXIsIEp1c3RpY2UsXG5cdEFlb24sIEhhbmdlZE1hblxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggSGllcm9waGFudCxcblx0TG92ZXJzLCBEZWF0aCxcblx0Q2hhcmlvdCwgU3VuLFxuXHRKdXN0aWNlLCBUZW1wZXJhbmNlLFxuXHRIZXJtaXQsIEp1c3RpY2UsXG5cdEZvcnR1bmUsIFByaWVzdGVzcyxcblx0U3RyZW5ndGgsIFN1bixcblx0SGFuZ2VkTWFuLCBEZWF0aCxcblx0RGVhdGgsIERldmlsLCBcblx0VGVtcGVyYW5jZSwgTWFnaWNpYW4sXG5cdERldmlsLCBFbXByZXNzLFxuXHRUb3dlciwgSGFuZ2VkTWFuLFxuXHRTdGFyLCBNb29uLFxuXHRNb29uLCBFbXByZXNzLFxuXHRTdW4sIFN0cmVuZ3RoLFxuXHRKdWRnZW1lbnQsIENoYXJpb3QsXG5cdEplc3RlciwgTWFnaWNpYW4sXG5cdEFlb24sIE1vb25cbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIExvdmVycyxcblx0QWVvbiwgSnVzdGljZSxcblx0SmVzdGVyLCBTdW4sXG5cdEp1ZGdlbWVudCwgU3RyZW5ndGgsXG5cdFN1biwgRGV2aWwsXG5cdE1vb24sIEhhbmdlZE1hbixcblx0U3RhciwgSGVybWl0LCBcblx0VG93ZXIsIFN0YXIsXG5cdERldmlsLCBIaWVyb3BoYW50LFxuXHRUZW1wZXJhbmNlLCBIaWVyb3BoYW50LFxuXHREZWF0aCwgU3Rhcixcblx0SGFuZ2VkTWFuLCBNb29uLFxuXHRTdHJlbmd0aCwgRW1wZXJvcixcblx0Rm9ydHVuZSwgU3RhciwgXG5cdEhlcm1pdCwgTWFnaWNpYW4sIFxuXHRKdXN0aWNlLCBQcmllc3Rlc3MsXG5cdENoYXJpb3QsIEhpZXJvcGhhbnRcbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIENoYXJpb3QsXG5cdEp1c3RpY2UsIFRlbXBlcmFuY2UsXG5cdEhlcm1pdCwgSnVzdGljZSxcblx0Rm9ydHVuZSwgRGV2aWwsXG5cdFN0cmVuZ3RoLCBNYWdpY2lhbixcblx0SGFuZ2VkTWFuLCBEZWF0aCxcblx0RGVhdGgsIEhlcm1pdCxcblx0VGVtcGVyYW5jZSwgTWFnaWNpYW4sXG5cdERldmlsLCBNb29uLFxuXHRUb3dlciwgSGFuZ2VkTWFuLFxuXHRTdGFyLCBIaWVyb3BoYW50LFxuXHRNb29uLCBTdW4sIFxuXHRTdW4sIFN0cmVuZ3RoLFxuXHRKdWRnZW1lbnQsIFRlbXBlcmFuY2UsXG5cdEplc3RlciwgQ2hhcmlvdCxcblx0QWVvbiwgU3RyZW5ndGhcbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIEp1c3RpY2UsXG5cdEhlcm1pdCwgU3RyZW5ndGgsXG5cdEZvcnR1bmUsIExvdmVycyxcblx0U3RyZW5ndGgsIFRlbXBlcmFuY2UsXG5cdEhhbmdlZE1hbiwgUHJpZXN0ZXNzLFxuXHREZWF0aCwgU3RyZW5ndGgsXG5cdFRlbXBlcmFuY2UsIEhlcm1pdCxcblx0RGV2aWwsIE1hZ2ljaWFuLFxuXHRUb3dlciwgTG92ZXJzLFxuXHRTdGFyLCBNb29uLFxuXHRNb29uLCBTdHJlbmd0aCxcblx0U3VuLCBUZW1wZXJhbmNlLFxuXHRKdWRnZW1lbnQsIExvdmVycyxcblx0SmVzdGVyLCBFbXBlcm9yLFxuXHRBZW9uLCBMb3ZlcnNcbik7XG5cbkFkZE5vcm1hbFNwcmVhZHMoIEhlcm1pdCxcblx0Rm9ydHVuZSwgRW1wcmVzcyxcblx0U3RyZW5ndGgsIEhpZXJvcGhhbnQsXG5cdEhhbmdlZE1hbiwgTW9vbixcblx0RGVhdGgsIFN1bixcblx0VGVtcGVyYW5jZSwgTWFnaWNpYW4sXG5cdERldmlsLCBKdXN0aWNlLFxuXHRUb3dlciwgRGVhdGgsXG5cdFN0YXIsIEp1c3RpY2UsXG5cdE1vb24sIEVtcGVyb3IsXG5cdFN1biwgVGVtcGVyYW5jZSxcblx0SnVkZ2VtZW50LCBTdGFyLFxuXHRKZXN0ZXIsIE1vb24sXG5cdEFlb24sIE1hZ2ljaWFuXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBGb3J0dW5lLFxuXHRTdHJlbmd0aCwgU3Rhcixcblx0SGFuZ2VkTWFuLCBEZWF0aCxcblx0RGVhdGgsIEhlcm1pdCxcblx0VGVtcGVyYW5jZSwgRGV2aWwsXG5cdERldmlsLCBFbXBlcm9yLFxuXHRUb3dlciwgQ2hhcmlvdCxcblx0U3RhciwgU3Rhcixcblx0TW9vbiwgTG92ZXJzLFxuXHRTdW4sIFByaWVzdGVzcyxcblx0SnVkZ2VtZW50LCBIYW5nZWRNYW4sXG5cdEplc3RlciwgRGV2aWwsXG5cdEFlb24sIFByaWVzdGVzc1xuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggU3RyZW5ndGgsXG5cdEhhbmdlZE1hbiwgSGllcm9waGFudCxcblx0RGVhdGgsIEhhbmdlZE1hbixcblx0VGVtcGVyYW5jZSwgU3VuLFxuXHREZXZpbCwgSGVybWl0LFxuXHRUb3dlciwgSGFuZ2VkTWFuLFxuXHRTdGFyLCBFbXBlcm9yLFxuXHRNb29uLCBKdXN0aWNlLFxuXHRTdW4sIFRlbXBlcmFuY2UsXG5cdEp1ZGdlbWVudCwgbnVsbCxcblx0SmVzdGVyLCBFbXByZXNzLFxuXHRBZW9uLCBDaGFyaW90XG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBIYW5nZWRNYW4sXG5cdERlYXRoLCBQcmllc3Rlc3MsXG5cdFRlbXBlcmFuY2UsIERlYXRoLFxuXHREZXZpbCwgSnVzdGljZSxcblx0VG93ZXIsIEhlcm1pdCxcblx0U3RhciwgRW1wcmVzcyxcblx0TW9vbiwgUHJpZXN0ZXNzLFxuXHRTdW4sIERldmlsLFxuXHRKdWRnZW1lbnQsIEVtcHJlc3MsXG5cdEplc3RlciwgUHJpZXN0ZXNzLFxuXHRBZW9uLCBEZWF0aFxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggRGVhdGgsXG5cdFRlbXBlcmFuY2UsIENoYXJpb3QsXG5cdERldmlsLCBTdGFyLFxuXHRUb3dlciwgTG92ZXJzLFxuXHRTdGFyLCBMb3ZlcnMsXG5cdE1vb24sIFByaWVzdGVzcyxcblx0U3VuLCBFbXByZXNzLFxuXHRKdWRnZW1lbnQsIG51bGwsXG5cdEplc3RlciwgVGVtcGVyYW5jZSxcblx0QWVvbiwgSGFuZ2VkTWFuXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBUZW1wZXJhbmNlLFxuXHREZXZpbCwgSGVybWl0LFxuXHRUb3dlciwgU3Rhcixcblx0U3RhciwgSGllcm9waGFudCxcblx0TW9vbiwgSGFuZ2VkTWFuLFxuXHRTdW4sIEhlcm1pdCxcblx0SnVkZ2VtZW50LCBudWxsLFxuXHRKZXN0ZXIsIERlYXRoLFxuXHRBZW9uLCBFbXByZXNzXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBEZXZpbCxcblx0VG93ZXIsIEVtcGVyb3IsXG5cdFN0YXIsIEVtcGVyb3IsXG5cdE1vb24sIEVtcHJlc3MsXG5cdFN1biwgSGllcm9waGFudCxcblx0SnVkZ2VtZW50LCBudWxsLFxuXHRKZXN0ZXIsIENoYXJpb3QsXG5cdEFlb24sIE1hZ2ljaWFuXG4pO1xuXG5BZGROb3JtYWxTcHJlYWRzKCBUb3dlcixcblx0U3RhciwgSGFuZ2VkTWFuLFxuXHRNb29uLCBQcmllc3Rlc3MsXG5cdFN1biwgQ2hhcmlvdCxcblx0SnVkZ2VtZW50LCBudWxsLFxuXHRKZXN0ZXIsIEhlcm1pdCxcblx0QWVvbiwgRW1wZXJvclxuKTtcblxuQWRkTm9ybWFsU3ByZWFkcyggU3Rhcixcblx0TW9vbiwgRW1wZXJvcixcblx0U3VuLCBNb29uLFxuXHRKdWRnZW1lbnQsIG51bGwsXG5cdEplc3RlciwgRW1wcmVzcyxcblx0QWVvbiwgQ2hhcmlvdFxuKTtcdFxuXG5BZGROb3JtYWxTcHJlYWRzKCBNb29uLFxuXHRTdW4sIFN0cmVuZ3RoLFxuXHRKdWRnZW1lbnQsIG51bGwsXG5cdEplc3RlciwgSGVybWl0LFxuXHRBZW9uLCBIaWVyb3BoYW50XG4pO1x0XG5cbkFkZE5vcm1hbFNwcmVhZHMoIFN1bixcblx0SnVkZ2VtZW50LCBudWxsLFxuXHRKZXN0ZXIsIExvdmVycyxcblx0QWVvbiwgUHJpZXN0ZXNzXG4pO1x0XG5cbkFkZE5vcm1hbFNwcmVhZHMoIEp1ZGdlbWVudCxcblx0SmVzdGVyLCBDaGFyaW90LFxuXHRBZW9uLCBIYW5nZWRNYW5cbik7XHRcblxuQWRkTm9ybWFsU3ByZWFkcyggSmVzdGVyLFxuXHRBZW9uLCBEZXZpbFxuKTtcdFxuXG5BZGROb3JtYWxTcHJlYWRzKEFlb24pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIEFlb24sXG5cdEZvb2wsIEplc3Rlcixcblx0TWFnaWNpYW4sIEVtcHJlc3MsXG5cdFByaWVzdGVzcywgRm9vbCxcblx0RW1wcmVzcywgU3Rhcixcblx0RW1wZXJvciwgU3VuLFxuXHRIaWVyb3BoYW50LCBTdW4sXG5cdExvdmVycywgSnVkZ2VtZW50LFxuXHRDaGFyaW90LCBKdXN0aWNlLFxuXHRKdXN0aWNlLCBUZW1wZXJhbmNlLFxuXHRIZXJtaXQsIE1vb24sXG5cdEZvcnR1bmUsIEZvb2wsXG5cdFN0cmVuZ3RoLCBIZXJtaXQsXG5cdEhhbmdlZE1hbiwgSmVzdGVyLFxuXHREZWF0aCwgU3RyZW5ndGgsXG5cdFRlbXBlcmFuY2UsIEp1ZGdlbWVudCxcblx0RGV2aWwsIExvdmVycyxcblx0VG93ZXIsIEZvcnR1bmUsXG5cdFN0YXIsIFRvd2VyLFxuXHRNb29uLCBUb3dlcixcblx0U3VuLCBIaWVyb3BoYW50LFxuXHRKdWRnZW1lbnQsIFN1bixcblx0SmVzdGVyLCBKdWRnZW1lbnRcbik7XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggSmVzdGVyLFxuXHRGb29sLCBQcmllc3Rlc3MsXG5cdE1hZ2ljaWFuLCBTdGFyLFxuXHRQcmllc3Rlc3MsIE1vb24sXG5cdEVtcHJlc3MsIERldmlsLFxuXHRFbXBlcm9yLCBDaGFyaW90LFxuXHRIaWVyb3BoYW50LCBGb3J0dW5lLFxuXHRMb3ZlcnMsIFRvd2VyLFxuXHRDaGFyaW90LCBTdHJlbmd0aCxcblx0SnVzdGljZSwgSGVybWl0LFxuXHRIZXJtaXQsIEFlb24sXG5cdEZvcnR1bmUsIEVtcGVyb3IsXG5cdFN0cmVuZ3RoLCBNYWdpY2lhbixcblx0SGFuZ2VkTWFuLCBNb29uLFxuXHREZWF0aCwgRm9ydHVuZSxcblx0VGVtcGVyYW5jZSwgUHJpZXN0ZXNzLFxuXHREZXZpbCwgQWVvbixcblx0VG93ZXIsIEp1ZGdlbWVudCxcblx0U3RhciwgRGVhdGgsXG5cdE1vb24sIEhhbmdlZE1hbixcblx0U3VuLCBMb3ZlcnMsXG5cdEp1ZGdlbWVudCwgRGVhdGhcbik7XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggSnVkZ2VtZW50LFxuXHRGb29sLCBUZW1wZXJhbmNlLFxuXHRNYWdpY2lhbiwgU3VuLFxuXHRQcmllc3Rlc3MsIFRlbXBlcmFuY2UsXG5cdEVtcHJlc3MsIFN0YXIsXG5cdEVtcGVyb3IsIEhhbmdlZE1hbixcblx0SGllcm9waGFudCwgRm9vbCxcblx0TG92ZXJzLCBFbXBlcm9yLFxuXHRDaGFyaW90LCBUb3dlcixcblx0SnVzdGljZSwgU3VuLFxuXHRIZXJtaXQsIFRlbXBlcmFuY2UsXG5cdEZvcnR1bmUsIEZvb2wsXG5cdFN0cmVuZ3RoLCBUZW1wZXJhbmNlLFxuXHRIYW5nZWRNYW4sIEZvb2wsXG5cdERlYXRoLCBTdHJlbmd0aCxcblx0VGVtcGVyYW5jZSwgQ2hhcmlvdCxcblx0RGV2aWwsIERlYXRoLFxuXHRUb3dlciwgQWVvbixcblx0U3RhciwgTG92ZXJzLFxuXHRNb29uLCBIZXJtaXQsXG5cdFN1biwgQ2hhcmlvdFxuKTtcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBTdW4sXG5cdEZvb2wsIEVtcHJlc3MsXG5cdE1hZ2ljaWFuLCBGb3J0dW5lLFxuXHRQcmllc3Rlc3MsIEFlb24sXG5cdEVtcHJlc3MsIExvdmVycyxcblx0RW1wZXJvciwgRGV2aWwsXG5cdEhpZXJvcGhhbnQsIE1hZ2ljaWFuLFxuXHRMb3ZlcnMsIEplc3Rlcixcblx0Q2hhcmlvdCwgUHJpZXN0ZXNzLFxuXHRKdXN0aWNlLCBKdWRnZW1lbnQsXG5cdEhlcm1pdCwgVG93ZXIsXG5cdEZvcnR1bmUsIENoYXJpb3QsXG5cdFN0cmVuZ3RoLCBUb3dlcixcblx0SGFuZ2VkTWFuLCBFbXByZXNzLFxuXHREZWF0aCwgRW1wcmVzcyxcblx0VGVtcGVyYW5jZSwgRm9ydHVuZSxcblx0RGV2aWwsIExvdmVycyxcblx0VG93ZXIsIERlYXRoLFxuXHRTdGFyLCBDaGFyaW90LFxuXHRNb29uLCBEZWF0aFxuKTtcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBNb29uLFxuXHRGb29sLCBFbXByZXNzLFxuXHRNYWdpY2lhbiwgU3VuLFxuXHRQcmllc3Rlc3MsIEVtcHJlc3MsXG5cdEVtcHJlc3MsIE1vb24sXG5cdEVtcGVyb3IsIFN0cmVuZ3RoLFxuXHRIaWVyb3BoYW50LCBBZW9uLFxuXHRMb3ZlcnMsIEhhbmdlZE1hbixcblx0Q2hhcmlvdCwgRm9vbCxcblx0SnVzdGljZSwgU3Rhcixcblx0SGVybWl0LCBKZXN0ZXIsXG5cdEZvcnR1bmUsIFN0cmVuZ3RoLFxuXHRTdHJlbmd0aCwgSGllcm9waGFudCxcblx0SGFuZ2VkTWFuLCBNYWdpY2lhbixcblx0RGVhdGgsIEhhbmdlZE1hbixcblx0VGVtcGVyYW5jZSwgSGFuZ2VkTWFuLFxuXHREZXZpbCwgRGVhdGgsXG5cdFRvd2VyLCBIYW5nZWRNYW4sXG5cdFN0YXIsIERlYXRoXG4pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIFN0YXIsXG5cdEZvb2wsIEhlcm1pdCxcblx0TWFnaWNpYW4sIEhpZXJvcGhhbnQsXG5cdFByaWVzdGVzcywgRW1wcmVzcyxcblx0RW1wcmVzcywgSmVzdGVyLFxuXHRFbXBlcm9yLCBTdW4sXG5cdEhpZXJvcGhhbnQsIExvdmVycyxcblx0TG92ZXJzLCBIaWVyb3BoYW50LFxuXHRDaGFyaW90LCBBZW9uLFxuXHRKdXN0aWNlLCBTdW4sXG5cdEhlcm1pdCwgRGVhdGgsXG5cdEZvcnR1bmUsIE1hZ2ljaWFuLFxuXHRTdHJlbmd0aCwgRGV2aWwsXG5cdEhhbmdlZE1hbiwgU3VuLFxuXHREZWF0aCwgRm9ydHVuZSxcblx0VGVtcGVyYW5jZSwgSGllcm9waGFudCxcblx0RGV2aWwsIEZvcnR1bmUsXG5cdFRvd2VyLCBIZXJtaXRcbik7XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggVG93ZXIsXG5cdEZvb2wsIEZvcnR1bmUsXG5cdE1hZ2ljaWFuLCBFbXBlcm9yLFxuXHRQcmllc3Rlc3MsIE1vb24sXG5cdEVtcHJlc3MsIEp1ZGdlbWVudCxcblx0RW1wZXJvciwgUHJpZXN0ZXNzLFxuXHRIaWVyb3BoYW50LCBFbXBlcm9yLFxuXHRMb3ZlcnMsIEp1ZGdlbWVudCxcblx0Q2hhcmlvdCwgSGllcm9waGFudCxcblx0SnVzdGljZSwgQ2hhcmlvdCxcblx0SGVybWl0LCBKZXN0ZXIsXG5cdEZvcnR1bmUsIE1hZ2ljaWFuLFxuXHRTdHJlbmd0aCwgRGV2aWwsXG5cdEhhbmdlZE1hbiwgRm9ydHVuZSxcblx0RGVhdGgsIEp1c3RpY2UsXG5cdFRlbXBlcmFuY2UsIEp1ZGdlbWVudCxcblx0RGV2aWwsIFN0YXJcbik7XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggRGV2aWwsXG5cdEZvb2wsIExvdmVycyxcblx0TWFnaWNpYW4sIENoYXJpb3QsXG5cdFByaWVzdGVzcywgSGVybWl0LFxuXHRFbXByZXNzLCBGb29sLFxuXHRFbXBlcm9yLCBEZWF0aCxcblx0SGllcm9waGFudCwgTW9vbixcblx0TG92ZXJzLCBUb3dlcixcblx0Q2hhcmlvdCwgRW1wZXJvcixcblx0SnVzdGljZSwgUHJpZXN0ZXNzLFxuXHRIZXJtaXQsIERlYXRoLFxuXHRGb3J0dW5lLCBUb3dlcixcblx0U3RyZW5ndGgsIExvdmVycyxcblx0SGFuZ2VkTWFuLCBKdXN0aWNlLFxuXHREZWF0aCwgTG92ZXJzLFxuXHRUZW1wZXJhbmNlLCBKdXN0aWNlXG4pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIFRlbXBlcmFuY2UsXG5cdEZvb2wsIEp1c3RpY2UsXG5cdE1hZ2ljaWFuLCBTdW4sXG5cdFByaWVzdGVzcywgTG92ZXJzLFxuXHRFbXByZXNzLCBBZW9uLFxuXHRFbXBlcm9yLCBEZXZpbCxcblx0SGllcm9waGFudCwgRW1wZXJvcixcblx0TG92ZXJzLCBGb3J0dW5lLFxuXHRDaGFyaW90LCBNb29uLFxuXHRKdXN0aWNlLCBNYWdpY2lhbixcblx0SGVybWl0LCBEZXZpbCxcblx0Rm9ydHVuZSwgVG93ZXIsXG5cdFN0cmVuZ3RoLCBFbXBlcm9yLFxuXHRIYW5nZWRNYW4sIEp1c3RpY2UsXG5cdERlYXRoLCBKZXN0ZXJcbik7XHRcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBEZWF0aCxcblx0Rm9vbCwgU3Rhcixcblx0TWFnaWNpYW4sIEZvb2wsXG5cdFByaWVzdGVzcywgQ2hhcmlvdCxcblx0RW1wcmVzcywgSGllcm9waGFudCxcblx0RW1wZXJvciwgU3RyZW5ndGgsXG5cdEhpZXJvcGhhbnQsIE1hZ2ljaWFuLFxuXHRMb3ZlcnMsIEhhbmdlZE1hbixcblx0Q2hhcmlvdCwgRGV2aWwsXG5cdEp1c3RpY2UsIERldmlsLFxuXHRIZXJtaXQsIE1hZ2ljaWFuLFxuXHRGb3J0dW5lLCBNb29uLFxuXHRTdHJlbmd0aCwgRW1wcmVzcyxcblx0SGFuZ2VkTWFuLCBEZXZpbFxuKTtcdFxuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIEhhbmdlZE1hbixcblx0Rm9vbCwgU3Rhcixcblx0TWFnaWNpYW4sIEZvcnR1bmUsXG5cdFByaWVzdGVzcywgQ2hhcmlvdCxcblx0RW1wcmVzcywgU3VuLFxuXHRFbXBlcm9yLCBIaWVyb3BoYW50LFxuXHRIaWVyb3BoYW50LCBTdGFyLFxuXHRMb3ZlcnMsIEp1c3RpY2UsXG5cdENoYXJpb3QsIERldmlsLFxuXHRKdXN0aWNlLCBTdGFyLFxuXHRIZXJtaXQsIFN0cmVuZ3RoLFxuXHRGb3J0dW5lLCBGb29sLFxuXHRTdHJlbmd0aCwgU3RhclxuKTtcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBTdHJlbmd0aCxcblx0Rm9vbCwgRW1wcmVzcyxcblx0TWFnaWNpYW4sIFRvd2VyLFxuXHRQcmllc3Rlc3MsIEVtcHJlc3MsXG5cdEVtcHJlc3MsIEplc3Rlcixcblx0RW1wZXJvciwgSGVybWl0LFxuXHRIaWVyb3BoYW50LCBNb29uLFxuXHRMb3ZlcnMsIEZvb2wsXG5cdENoYXJpb3QsIEFlb24sXG5cdEp1c3RpY2UsIEhlcm1pdCxcblx0SGVybWl0LCBKdXN0aWNlLFxuXHRGb3J0dW5lLCBQcmllc3Rlc3Ncbik7XHRcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBGb3J0dW5lLFxuXHRGb29sLCBKdWRnZW1lbnQsXG5cdE1hZ2ljaWFuLCBTdHJlbmd0aCxcblx0UHJpZXN0ZXNzLCBBZW9uLFxuXHRFbXByZXNzLCBTdHJlbmd0aCxcblx0RW1wZXJvciwgUHJpZXN0ZXNzLFxuXHRIaWVyb3BoYW50LCBIYW5nZWRNYW4sXG5cdExvdmVycywgSGFuZ2VkTWFuLFxuXHRDaGFyaW90LCBUZW1wZXJhbmNlLFxuXHRKdXN0aWNlLCBQcmllc3Rlc3MsXG5cdEhlcm1pdCwgSnVkZ2VtZW50XG4pO1x0XHRcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBIZXJtaXQsXG5cdEZvb2wsIFN0cmVuZ3RoLFxuXHRNYWdpY2lhbiwgRW1wcmVzcyxcblx0UHJpZXN0ZXNzLCBNYWdpY2lhbixcblx0RW1wcmVzcywgRm9vbCxcblx0RW1wZXJvciwgTW9vbixcblx0SGllcm9waGFudCwgTG92ZXJzLFxuXHRMb3ZlcnMsIEhpZXJvcGhhbnQsXG5cdENoYXJpb3QsIFByaWVzdGVzcyxcblx0SnVzdGljZSwgRW1wZXJvclxuKTtcdFxuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIEp1c3RpY2UsXG5cdEZvb2wsIENoYXJpb3QsXG5cdE1hZ2ljaWFuLCBDaGFyaW90LFxuXHRQcmllc3Rlc3MsIEhlcm1pdCxcblx0RW1wcmVzcywgRGVhdGgsXG5cdEVtcGVyb3IsIEplc3Rlcixcblx0SGllcm9waGFudCwgTWFnaWNpYW4sXG5cdExvdmVycywgQWVvbixcblx0Q2hhcmlvdCwgVGVtcGVyYW5jZVxuKTtcdFx0XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggQ2hhcmlvdCxcblx0Rm9vbCwgTG92ZXJzLFxuXHRNYWdpY2lhbiwgRW1wZXJvcixcblx0UHJpZXN0ZXNzLCBNYWdpY2lhbixcblx0RW1wcmVzcywgRW1wZXJvcixcblx0RW1wZXJvciwgVG93ZXIsXG5cdEhpZXJvcGhhbnQsIEp1ZGdlbWVudCxcblx0TG92ZXJzLCBIaWVyb3BoYW50XG4pO1x0XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggTG92ZXJzLFxuXHRGb29sLCBEZXZpbCxcblx0TWFnaWNpYW4sIFRlbXBlcmFuY2UsXG5cdFByaWVzdGVzcywgSGFuZ2VkTWFuLFxuXHRFbXByZXNzLCBGb29sLFxuXHRFbXBlcm9yLCBEZXZpbCxcblx0SGllcm9waGFudCwgSGFuZ2VkTWFuXG4pO1x0XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggSGllcm9waGFudCxcblx0Rm9vbCwgVG93ZXIsXG5cdE1hZ2ljaWFuLCBKZXN0ZXIsXG5cdFByaWVzdGVzcywgRW1wcmVzcyxcblx0RW1wcmVzcywgUHJpZXN0ZXNzLFxuXHRFbXBlcm9yLCBDaGFyaW90XG4pO1xuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIEVtcGVyb3IsXG5cdEZvb2wsIEhlcm1pdCxcblx0TWFnaWNpYW4sIERlYXRoLFxuXHRQcmllc3Rlc3MsIEp1c3RpY2UsXG5cdEVtcHJlc3MsIEZvb2xcbik7XG5cbkFkZFRyaWFuZ2xlU3ByZWFkcyggRW1wcmVzcyxcblx0Rm9vbCwgSnVkZ2VtZW50LFxuXHRNYWdpY2lhbiwgU3VuLFxuXHRQcmllc3Rlc3MsIFRlbXBlcmFuY2Vcbik7XHRcblxuQWRkVHJpYW5nbGVTcHJlYWRzKCBQcmllc3Rlc3MsXG5cdEZvb2wsIExvdmVycyxcblx0TWFnaWNpYW4sIEZvcnR1bmVcbik7XHRcdFxuXG5BZGRUcmlhbmdsZVNwcmVhZHMoIE1hZ2ljaWFuLFxuXHRGb29sLCBGb3J0dW5lXG4pO1x0XHRcdFxuXG5BZGRUcmlhbmdsZVNwcmVhZHMoRm9vbCk7XG5cblxuZnVuY3Rpb24gR2V0Tm9ybWFsUmVzdWx0KCBmaXJzdCwgc2Vjb25kICkge1xuXHRpZiggZmlyc3QgPT0gc2Vjb25kIClcblx0XHRyZXR1cm4gbnVsbDtcblx0XG5cdHJldHVybiBHZXRSZXN1bHQoTm9ybWFsU3ByZWFkLCBmaXJzdCwgc2Vjb25kKTtcbn1cblxuZnVuY3Rpb24gR2V0VHJpYW5nbGVSZXN1bHQoIGZpcnN0LCBzZWNvbmQsIHRoaXJkICkge1xuXHRpZiggZmlyc3QgPT0gc2Vjb25kIHx8IHNlY29uZCA9PSB0aGlyZCB8fCBmaXJzdCA9PSB0aGlyZCApXG5cdFx0cmV0dXJuIG51bGw7XG5cblx0dmFyIGZpcnN0UmVzdWx0ID0gR2V0Tm9ybWFsUmVzdWx0KGZpcnN0LCBzZWNvbmQpO1xuXHRpZiggZmlyc3RSZXN1bHQgIT09IG51bGwgJiYgZmlyc3RSZXN1bHQgIT09IHVuZGVmaW5lZCApXG5cdFx0cmV0dXJuIEdldFJlc3VsdCggVHJpYW5nbGVTcHJlYWQsIGZpcnN0UmVzdWx0LCB0aGlyZCApO1xuXHRyZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gQmFja0NhbGMoc3ByZWFkLHRhcmdldCl7XG5cdHZhciByZXN1bHQgPSBbXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzcHJlYWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgYXJjYW5hUmVzdWx0cyA9IHNwcmVhZFtpXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFyY2FuYVJlc3VsdHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmKCBhcmNhbmFSZXN1bHRzW2pdID09PSB0YXJnZXQgKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKFtpLGpdKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBCYWNrQ2FsY05vcm1hbCggdGFyZ2V0ICkge1xuXHRyZXR1cm4gQmFja0NhbGMoTm9ybWFsU3ByZWFkLHRhcmdldCk7XG59XG5cbmZ1bmN0aW9uIEJhY2tDYWxjVHJpYW5nbGUoIHRhcmdldCApIHtcbi8vXHRyZXR1cm4gQmFja0NhbGMoVHJpYW5nbGVTcHJlYWQsdGFyZ2V0KTtcblxuXHR2YXIgcmVzdWx0ID0gW107XG5cblx0Zm9yICh2YXIgZmlyc3RBcmNhbmEgPSAwOyBmaXJzdEFyY2FuYSA8IFRyaWFuZ2xlU3ByZWFkLmxlbmd0aDsgZmlyc3RBcmNhbmErKykge1xuXHRcdHZhciBhcmNhbmFSZXN1bHRzID0gVHJpYW5nbGVTcHJlYWRbZmlyc3RBcmNhbmFdO1xuXG5cdFx0Zm9yICh2YXIgc2Vjb25kQXJjYW5hID0gMDsgc2Vjb25kQXJjYW5hIDwgYXJjYW5hUmVzdWx0cy5sZW5ndGg7IHNlY29uZEFyY2FuYSsrKSB7XG5cdFx0XHRpZiggYXJjYW5hUmVzdWx0c1tzZWNvbmRBcmNhbmFdID09PSB0YXJnZXQgKSB7XG5cdFx0XHRcdHZhciBmaXJzdFByZWRpY2F0ZXMgPSBCYWNrQ2FsY05vcm1hbCggZmlyc3RBcmNhbmEgKTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaXJzdFByZWRpY2F0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgcGFpciA9IGZpcnN0UHJlZGljYXRlc1tpXTtcblx0XHRcdFx0XHRyZXN1bHQucHVzaCggW3BhaXJbMF0sIHBhaXJbMV0sIHNlY29uZEFyY2FuYV0gKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBUb1N0cmluZyggYXJjYW5hICkge1xuXHRpZiggYXJjYW5hID09PSBGb29sICkgcmV0dXJuIFwiRm9vbFwiO1xuXHRpZiggYXJjYW5hID09PSBNYWdpY2lhbiApIHJldHVybiBcIk1hZ2ljaWFuXCI7XG5cdGlmKCBhcmNhbmEgPT09IFByaWVzdGVzcyApIHJldHVybiBcIlByaWVzdGVzc1wiO1xuXHRpZiggYXJjYW5hID09PSBFbXByZXNzICkgcmV0dXJuIFwiRW1wcmVzc1wiO1xuXHRpZiggYXJjYW5hID09PSBFbXBlcm9yICkgcmV0dXJuIFwiRW1wZXJvclwiO1xuXHRpZiggYXJjYW5hID09PSBIaWVyb3BoYW50ICkgcmV0dXJuIFwiSGllcm9waGFudFwiO1xuXHRpZiggYXJjYW5hID09PSBMb3ZlcnMgKSByZXR1cm4gXCJMb3ZlcnNcIjtcblx0aWYoIGFyY2FuYSA9PT0gQ2hhcmlvdCApIHJldHVybiBcIkNoYXJpb3RcIjtcblx0aWYoIGFyY2FuYSA9PT0gSnVzdGljZSApIHJldHVybiBcIkp1c3RpY2VcIjtcblx0aWYoIGFyY2FuYSA9PT0gSGVybWl0ICkgcmV0dXJuIFwiSGVybWl0XCI7XG5cdGlmKCBhcmNhbmEgPT09IEZvcnR1bmUgKSByZXR1cm4gXCJGb3J0dW5lXCI7XG5cdGlmKCBhcmNhbmEgPT09IFN0cmVuZ3RoICkgcmV0dXJuIFwiU3RyZW5ndGhcIjtcblx0aWYoIGFyY2FuYSA9PT0gSGFuZ2VkTWFuICkgcmV0dXJuIFwiSGFuZ2VkTWFuXCI7XG5cdGlmKCBhcmNhbmEgPT09IERlYXRoICkgcmV0dXJuIFwiRGVhdGhcIjtcblx0aWYoIGFyY2FuYSA9PT0gVGVtcGVyYW5jZSApIHJldHVybiBcIlRlbXBlcmFuY2VcIjtcblx0aWYoIGFyY2FuYSA9PT0gRGV2aWwgKSByZXR1cm4gXCJEZXZpbFwiO1xuXHRpZiggYXJjYW5hID09PSBUb3dlciApIHJldHVybiBcIlRvd2VyXCI7XG5cdGlmKCBhcmNhbmEgPT09IFN0YXIgKSByZXR1cm4gXCJTdGFyXCI7XG5cdGlmKCBhcmNhbmEgPT09IE1vb24gKSByZXR1cm4gXCJNb29uXCI7XG5cdGlmKCBhcmNhbmEgPT09IFN1biApIHJldHVybiBcIlN1blwiO1xuXHRpZiggYXJjYW5hID09PSBKdWRnZW1lbnQgKSByZXR1cm4gXCJKdWRnZW1lbnRcIjtcblx0aWYoIGFyY2FuYSA9PT0gSmVzdGVyICkgcmV0dXJuIFwiSmVzdGVyXCI7XG5cdGlmKCBhcmNhbmEgPT09IEFlb24gKSByZXR1cm4gXCJBZW9uXCI7XG5cdGlmKCBhcmNhbmEgPT09IFdvcmxkICkgcmV0dXJuIFwiV29ybGRcIjtcblx0cmV0dXJuIFwiW1tCQURdXVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Ly8gcG9vciBtYW4ncyBlbnVtXG5cdEZvb2w6IEZvb2wsXG5cdE1hZ2ljaWFuOiBNYWdpY2lhbixcblx0UHJpZXN0ZXNzOiBQcmllc3Rlc3MsXG5cdEVtcHJlc3M6IEVtcHJlc3MsXG5cdEVtcGVyb3I6IEVtcGVyb3IsXG5cdEhpZXJvcGhhbnQ6IEhpZXJvcGhhbnQsXG5cdExvdmVyczogTG92ZXJzLFxuXHRDaGFyaW90OiBDaGFyaW90LFxuXHRKdXN0aWNlOiBKdXN0aWNlLFxuXHRIZXJtaXQ6IEhlcm1pdCxcblx0Rm9ydHVuZTogRm9ydHVuZSxcblx0U3RyZW5ndGg6IFN0cmVuZ3RoLFxuXHRIYW5nZWRNYW46IEhhbmdlZE1hbixcblx0RGVhdGg6IERlYXRoLFxuXHRUZW1wZXJhbmNlOiBUZW1wZXJhbmNlLFxuXHREZXZpbDogRGV2aWwsXG5cdFRvd2VyOiBUb3dlcixcblx0U3RhcjogU3Rhcixcblx0TW9vbjogTW9vbixcblx0U3VuOiBTdW4sXG5cdEp1ZGdlbWVudDogSnVkZ2VtZW50LFxuXHRKZXN0ZXI6IEplc3Rlcixcblx0QWVvbjogQWVvbixcblx0V29ybGQ6IFdvcmxkLFxuXG5cdC8vIG9yZGVyZWQgdmVyc2lvbiwgZm9yIHNvcnRpbmchXG5cdE9yZGVyZWQ6IFsgRm9vbCwgTWFnaWNpYW4sIFByaWVzdGVzcywgRW1wcmVzcywgRW1wZXJvciwgSGllcm9waGFudCwgTG92ZXJzLCBDaGFyaW90LCBKdXN0aWNlLCBIZXJtaXQsIEZvcnR1bmUsIFN0cmVuZ3RoLCBIYW5nZWRNYW4sIERlYXRoLCBUZW1wZXJhbmNlLCBEZXZpbCwgVG93ZXIsIFN0YXIsIE1vb24sIFN1biwgSnVkZ2VtZW50LCBKZXN0ZXIsIEFlb24sIFdvcmxkIF0sXG5cblx0Q291bnQ6IE51bUFyY2FuYSxcblxuXHQvLyBcInN0YXRpY1wiIG1ldGhvZHNcblx0R2V0Tm9ybWFsUmVzdWx0OiBHZXROb3JtYWxSZXN1bHQsXG5cdEdldFRyaWFuZ2xlUmVzdWx0OiBHZXRUcmlhbmdsZVJlc3VsdCxcblx0QmFja0NhbGNOb3JtYWw6IEJhY2tDYWxjTm9ybWFsLFxuXHRCYWNrQ2FsY1RyaWFuZ2xlOiBCYWNrQ2FsY1RyaWFuZ2xlLFxuXHRUb1N0cmluZzogVG9TdHJpbmdcbn0iLCIvKipcbiAqIHNjcmlwdHMvbWFpbi5qc1xuICpcbiAqIFRoaXMgaXMgdGhlIHN0YXJ0aW5nIHBvaW50IGZvciB5b3VyIGFwcGxpY2F0aW9uLlxuICogVGFrZSBhIGxvb2sgYXQgaHR0cDovL2Jyb3dzZXJpZnkub3JnLyBmb3IgbW9yZSBpbmZvXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xudmFyIEFyY2FuYSA9IHJlcXVpcmUoJy4vYXJjYW5hLmpzJyk7XG52YXIgUGVyc29uYSA9IHJlcXVpcmUoJy4vcGVyc29uYS5qcycpO1xuXG5cbnZhciBzb3J0ZWRCeU5hbWVQZXJzb25hID0gUGVyc29uYS5CeUxldmVsLnNvcnQoZnVuY3Rpb24oYSwgYikgIHtcbiAgICBpZiggYS5uYW1lID4gYi5uYW1lICkgcmV0dXJuIDE7XG4gICAgaWYoIGEubmFtZSA8IGIubmFtZSApIHJldHVybiAtMTtcbiAgICByZXR1cm4gMDtcbn0pO1xudmFyIHBlcnNvbmFOYW1lc0luT3JkZXIgPSBzb3J0ZWRCeU5hbWVQZXJzb25hLm1hcChmdW5jdGlvbihwZXJzb25hKXsgcmV0dXJuIHBlcnNvbmEubmFtZTsgfSlcblxuZnVuY3Rpb24gZHJhd0luZGl2aWR1YWwocmVzdWx0KSB7XG4gICAgdmFyICRyZXN1bHRzID0gJChcIiNyZXN1bHRzXCIpLmVtcHR5KCk7XG4gICAgdmFyIHJlc3VsdFRleHQgPSBcIk5vIHJlc3VsdHMgZm91bmRcIjtcbiAgICBpZiggISFyZXN1bHQgKSB7XG4gICAgICAgIHJlc3VsdFRleHQgPSBQZXJzb25hLlRvU3RyaW5nKHJlc3VsdCk7XG4gICAgfVxuICAgICRyZXN1bHRzLmFwcGVuZCgkKFwiPGRpdiBjbGFzcz0nY29sdW1uJz48L2Rpdj5cIikudGV4dChyZXN1bHRUZXh0KSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdSZXN1bHRzKHJlc3VsdHNBcnJheSkge1xuICAgIHZhciAkcmVzdWx0cyA9ICQoXCIjcmVzdWx0c1wiKS5lbXB0eSgpO1xuICAgIGZvciAodmFyIGkgPSAwOyAhIXJlc3VsdHNBcnJheSAmJiBpIDwgcmVzdWx0c0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzQXJyYXlbaV07XG4gICAgICAgIHZhciAkcm93ID0gJChcIjx1bD48L3VsPlwiKS5hZGRDbGFzcygnc21hbGwtYmxvY2stZ3JpZC0nK3Jlc3VsdC5sZW5ndGgpO1xuICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7ICsraiApIHtcbiAgICAgICAgICAgICRyb3cuYXBwZW5kKCQoXCI8bGk+PC9saT5cIikudGV4dChQZXJzb25hLlRvU3RyaW5nKHJlc3VsdFtqXSkpKTtcblxuICAgICAgICB9XG4gICAgICAgICRyZXN1bHRzLmFwcGVuZCgkcm93KTtcbiAgICB9O1xufVxuXG52YXIgdHJpYW5nbGUgPSBmYWxzZTtcbmZ1bmN0aW9uIHJlY2FsY3VsYXRlRnVzaW9uKCkge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIHZhciBmaXJzdE5hbWUgPSAkKFwiI2ZpcnN0RnVzaW9uXCIpLnZhbCgpO1xuICAgIHZhciBzZWNvbmROYW1lID0gJChcIiNzZWNvbmRGdXNpb25cIikudmFsKCk7XG4gICAgdmFyIHRoaXJkTmFtZSA9ICQoXCIjdGhpcmRGdXNpb25cIikudmFsKCk7XG5cbiAgICBpZiggISFmaXJzdE5hbWUgJiYgISFzZWNvbmROYW1lICkge1xuICAgICAgICB2YXIgZmlyc3RQZXJzb25hID0gUGVyc29uYS5CeU5hbWVbZmlyc3ROYW1lXTtcbiAgICAgICAgdmFyIHNlY29uZFBlcnNvbmEgPSBQZXJzb25hLkJ5TmFtZVtzZWNvbmROYW1lXTtcbiAgICAgICAgdmFyIHRyaWFuZ2xlID0gISF0aGlyZE5hbWU7XG5cbiAgICAgICAgaWYoIHRyaWFuZ2xlICkge1xuICAgICAgICAgICAgcmVzdWx0ID0gUGVyc29uYS5UcmlhbmdsZUNhbGN1bGF0aW9uKGZpcnN0UGVyc29uYSxzZWNvbmRQZXJzb25hLFBlcnNvbmEuQnlOYW1lW3RoaXJkTmFtZV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gUGVyc29uYS5Ob3JtYWxDYWxjdWxhdGlvbihmaXJzdFBlcnNvbmEsc2Vjb25kUGVyc29uYSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3SW5kaXZpZHVhbChyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiByZWNhbGN1bGF0ZUZpc3Npb24oKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgY29udGFpbmluZ1BlcnNvbmEgPSB1bmRlZmluZWQ7XG4gICAgdmFyIGZpc3NpYmxlTmFtZSA9ICQoXCIjZmlzc2libGVcIikudmFsKCk7XG4gICAgdmFyIGNvbnRhaW5pbmdOYW1lID0gJChcIiNjb250YWluaW5nXCIpLnZhbCgpO1xuICAgIGlmKCEhY29udGFpbmluZ05hbWUpIHtcbiAgICAgICAgY29udGFpbmluZ1BlcnNvbmEgPSBQZXJzb25hLkJ5TmFtZVtjb250YWluaW5nTmFtZV07XG4gICAgfVxuXG4gICAgaWYoICEhZmlzc2libGVOYW1lICkge1xuICAgICAgICB2YXIgZmlzc2libGVQZXJzb25hID0gUGVyc29uYS5CeU5hbWVbZmlzc2libGVOYW1lXTtcbiAgICAgICAgaWYoIHRyaWFuZ2xlICkge1xuICAgICAgICAgICAgaWYoICEhY29udGFpbmluZ1BlcnNvbmEgKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IFBlcnNvbmEuQmFja0NhbGNUcmlhbmdsZShmaXNzaWJsZVBlcnNvbmEsY29udGFpbmluZ1BlcnNvbmEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAgICBcbiAgICAgICAgICAgIHJlc3VsdHMgPSBQZXJzb25hLkJhY2tDYWxjTm9ybWFsKGZpc3NpYmxlUGVyc29uYSxjb250YWluaW5nUGVyc29uYSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3UmVzdWx0cyhyZXN1bHRzKTtcbn1cblxuJChmdW5jdGlvbigpe1xuICAgIHZhciAkc2VsZWN0cyA9ICQoXCJzZWxlY3QucGVyc29uYVwiKTtcbiAgICAkc2VsZWN0cy5lbXB0eSgpO1xuICAgICRzZWxlY3RzLmFwcGVuZCgkKFwiPG9wdGlvbj48L29wdGlvbj5cIikpO1xuICAgICQuZWFjaChzb3J0ZWRCeU5hbWVQZXJzb25hLCBmdW5jdGlvbihpLGUpIHtcbiAgICAgICAgJHNlbGVjdHMuYXBwZW5kKCQoXCI8b3B0aW9uPlwiK1BlcnNvbmEuVG9TdHJpbmcoZSkrXCI8L29wdGlvbj5cIikudmFsKGUubmFtZSkpO1xuICAgIH0pO1xuXG4gICAgJChcIiN0cmluYXJ5Rmlzc2lvblwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcbiAgICAgICAgdHJpYW5nbGUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgICQoXCIjY29udGFpbmluZ1wiKS52YWwoXCJcIik7XG4gICAgICAgIHJlY2FsY3VsYXRlRmlzc2lvbigpO1xuICAgIH0pO1xuXG4gICAgJChcIiNmaXJzdEZ1c2lvbiwgI3NlY29uZEZ1c2lvbiwgI3RoaXJkRnVzaW9uXCIpLmNoYW5nZShyZWNhbGN1bGF0ZUZ1c2lvbik7XG4gICAgJChcIiNmaXNzaWJsZSwgI2NvbnRhaW5pbmdcIikuY2hhbmdlKHJlY2FsY3VsYXRlRmlzc2lvbik7XG59KTsiLCIndXNlIHN0cmljdCc7XG5cblxudmFyIEFyY2FuYSA9IHJlcXVpcmUoXCIuL2FyY2FuYVwiKTtcblxudmFyIHBlcnNvbmFCeUx2bCA9IFxuICAgIFt7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvb2wsXG4gICAgICAgIG5hbWVfanA6IFwi44Kk44K244OK44KuXCIsXG4gICAgICAgIG5hbWU6IFwiSXphbmFnaVwiLFxuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlN0clwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvLCBDbGVhdmUsIFJha3VrYWphLCBSYWt1bmRhKDMpLCBUYXJ1a2FqYSg1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiTUMncyBkZWZhdWx0IFBlcnNvbmFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5NYWdpY2lhbixcbiAgICAgICAgbmFtZV9qcDogXCLjg5Tjgq/jgrfjg7xcIixcbiAgICAgICAgbmFtZTogXCJQaXhpZVwiLFxuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYSwgUGF0cmEsIFppbygzKSwgTWUgUGF0cmEoNCksIFRyYWZ1cmkoOClcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuOCueODqeOCpOODoFwiLFxuICAgICAgICBuYW1lOiBcIlNsaW1lXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJFbGlnb3JcIiwgXCJOYXRhIFRhaXNoaVwiXSxcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCYXNoLCBFdmlsIFRvdWNoLCBUYXJ1bmRhKDMpLCBSZWQgV2FsbCg0KSwgRmVhciBCb29zdCg1KSwgUmVzaXN0IFBoeXNpY2FsKDcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZXZpbCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqbjgrPjg5Djgq9cIixcbiAgICAgICAgbmFtZTogXCJVa29iYWNoXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJMaWxpbVwiLCBcIlZldGFsYVwiXSxcbiAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2ksIFN1a3VuZGEsIFB1bGlucGEoNCksIENvbmZ1c2UgQm9vc3QoNSksIFJlc2lzdCBGaXJlKDYpLCBGaXJlIEJyZWFrKDcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdXN0aWNlLFxuICAgICAgICBuYW1lX2pwOiBcIuOCqOODs+OCuOOCp+ODq1wiLFxuICAgICAgICBuYW1lOiBcIkFuZ2VsXCIsXG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIlN0clwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1LCBQYXRyYSwgSGFtYSg1KSwgU3VrdWthamEoNiksIFJlZ2VuZXJhdGUgMSg4KSwgSGFtYSBCb29zdCg5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg5fjgrXjg6njgrlcIixcbiAgICAgICAgbmFtZTogXCJBcHNhcmFzXCIsXG4gICAgICAgIGxldmVsOiA0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlBhdHJhLCBEaWEsIFJha3VuZGEoNSksIE1lIFBhdHJhKDYpLCBCdWZ1KDcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3RyZW5ndGgsXG4gICAgICAgIG5hbWVfanA6IFwi44K244Oz44OI44Oe44OzXCIsXG4gICAgICAgIG5hbWU6IFwiU2FuZG1hblwiLFxuICAgICAgICBsZXZlbDogNSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnUsIFB1bGlucGEsIFNrdWxsIENyYWNrZXIoNiksIENvbmZ1c2UgQm9vc3QoNyksIERla2FqYSg4KSwgVHJhZXN0bygxMSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIll1a2lrbydzIENhc3RsZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkNoYXJpb3QsXG4gICAgICAgIG5hbWVfanA6IFwi44OK44K/44K/44Kk44K3XCIsXG4gICAgICAgIG5hbWU6IFwiTmF0YSBUYWlzaGlcIixcbiAgICAgICAgbGV2ZWw6IDYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCYXNoLCBSYWt1bmRhLCBEZWt1bmRhLCBTb25pYyBQdW5jaCg3KSwgRG9kZ2UgSWNlKDgpLCBSZXNpc3QgRGl6enkoOSksIFNvdWwgQnJlYWsoMTApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IZXJtaXQsXG4gICAgICAgIG5hbWVfanA6IFwi44OV44Kp44Or44ON44Km44K5XCIsXG4gICAgICAgIG5hbWU6IFwiRm9ybmV1c1wiLFxuICAgICAgICBsZXZlbDogNixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQnVmdSwgU2tld2VyLCBUYXJ1a2FqYSwgUmFrdW5kYSg3KSwgUG9pc21hKDgpLCBEb2RnZSBFbGVjKDEwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb29sLFxuICAgICAgICBuYW1lX2pwOiBcIuODqOODouODhOOCt+OCs+ODoVwiLFxuICAgICAgICBuYW1lOiBcIllvbW90c3Utc2hpa29tZVwiLFxuICAgICAgICBsZXZlbDogNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlBvaXNtYSwgU2tld2VyLCBFdmlsIFRvdWNoLCBTdWt1bmRhKDkpLCBNdWRvKDEwKSwgR2hhc3RseSBXYWlsKDExKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIll1a2lrbydzIENhc3RsZSwgU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhpZXJvcGhhbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Kq44Oi44Kk44Kr44ONXCIsXG4gICAgICAgIG5hbWU6IFwiT21vaWthbmVcIixcbiAgICAgICAgbGV2ZWw6IDcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiU3RyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW8sIFN1a3VuZGEsIFRhcnVuZGEsIFBvaXNvbiBNaXN0KDgpLCBSZXNpc3QgV2luZCg5KSwgRG9kZ2UgSWNlKDEwKSwgUmVzaXN0IFBvaXNvbigxMSksIFJlc2lzdCBFbGVjKDEyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTWFnaWNpYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Kq44Ot44OQ44K5XCIsXG4gICAgICAgIG5hbWU6IFwiT3JvYmFzXCIsXG4gICAgICAgIGxldmVsOiA4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpLCBIeXN0ZXJpY2FsIFNsYXAsIERla2FqYSwgRG9kZ2UgSWNlKDEwKSwgUmVzaXN0IERpenp5KDExKSwgU2hhcnAgU3R1ZGVudCgxMilcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIll1a2lrbydzIENhc3RsZSwgU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuODtOOCoeODq+OCreODquODvFwiLFxuICAgICAgICBuYW1lOiBcIlZhbGt5cmllXCIsXG4gICAgICAgIGxldmVsOiA4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQnVmdSwgQ2xlYXZlLCBSYWt1bmRhLCBNZWRpYSgxMCksIEFybSBDaG9wcGVyKDExKSwgTWFidWZ1KDEyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXByZXNzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCu+ODs+ODqlwiLFxuICAgICAgICBuYW1lOiBcIlNlbnJpXCIsXG4gICAgICAgIGxldmVsOiA5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRGlhLCBNYWthamFtLCBBZ2ksIERla3VuZGEoMTApLCBNZWRpYSgxMSksIFRyYWZ1cmkoMTQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiWXVraWtvJ3MgQ2FzdGxlLCBTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGVhdGgsXG4gICAgICAgIG5hbWVfanA6IFwi44Kw44O844OrXCIsXG4gICAgICAgIG5hbWU6IFwiR2hvdWxcIixcbiAgICAgICAgbGV2ZWw6IDksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQmFzaCwgUG9pc21hLCBTdWt1a2FqYSgxMCksIEVuZXJ2YXRpb24oMTEpLCBQb2lzb25vdXMgU2tld2VyKDEyKSwgUmFrdW5kYSgxMyksIFBvaXNvbiBCb29zdCgxNClcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGUsIFN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZXZpbCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6rjg6rjg6BcIixcbiAgICAgICAgbmFtZTogXCJMaWxpbVwiLFxuICAgICAgICBsZXZlbDogMTAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlN0clwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW8sIE11ZG8sIEVuZXJ2YXRpb24sIEVuZXJ2YXRlIEJvb3N0KDEyKSwgU3VrdWthamEoMTMpLCBNYW11ZG8oMTUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRGFya1wiLFxuICAgICAgICBub3RlczogXCJZdWtpa28ncyBDYXN0bGUsIFN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Kr44O844K344O8XCIsXG4gICAgICAgIG5hbWU6IFwiQ3UgU2l0aFwiLFxuICAgICAgICBsZXZlbDogMTAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1LCBQdWxpbnBhLCBSYWt1a2FqYSwgR3Jvd3RoIDEoMTEpLCBNYWdhcnUoMTMpLCBXaGl0ZSBXYWxsKDE0KSwgVHJhZXN0bygxNSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIll1a2lrbydzIENhc3RsZSwgU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlByaWVzdGVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjgrXjgq3jg5/jgr/jg55cIixcbiAgICAgICAgbmFtZTogXCJTYWtpIE1pdGFtYVwiLFxuICAgICAgICBsZXZlbDogMTEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJEaWEsIEJ1ZnUsIFN1a3VuZGEsIEFsZXJ0bmVzcygxMyksIE1lZGlhKDE0KSwgTnVsbCBSYWdlKDE2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdXN0aWNlLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODvOOCr+OCqOODs+OCuOOCp+ODq1wiLFxuICAgICAgICBuYW1lOiBcIkFyY2hhbmdlbFwiLFxuICAgICAgICBsZXZlbDogMTEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJIYW1hLCBEb3VibGUgRmFuZ3MsIFBhdHJhLCBNZWRpYSgxMiksIE11enpsZSBTaG90KDEzKSwgU2hhcnAgU3R1ZGVudCgxNCksIFN1cnZpdmUgRGFyaygxNSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgrfjg6vjg5VcIixcbiAgICAgICAgbmFtZTogXCJTeWxwaFwiLFxuICAgICAgICBsZXZlbDogMTEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1LCBTdWt1a2FqYSwgTWUgUGF0cmEsIFJlZ2VuZXJhdGUgMSgxMiksIE1lZGlhKDEzKSwgTWFnYXJ1KDE0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcGVyb3IsXG4gICAgICAgIG5hbWVfanA6IFwi44Kq44OZ44Ot44OzXCIsXG4gICAgICAgIG5hbWU6IFwiT2Jlcm9uXCIsXG4gICAgICAgIGxldmVsOiAxMixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvLCBBcm0gQ2hvcHBlciwgTWFrYWphbSgxMyksIE1lZGlhKDE0KSwgRWxlYyBCb29zdCgxNSksIE1hemlvKDE2KSwgRG9kZ2UgV2luZCgxNylcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2UsIE1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkNoYXJpb3QsXG4gICAgICAgIG5hbWVfanA6IFwi44Ko44Oq44K044O844OrXCIsXG4gICAgICAgIG5hbWU6IFwiRWxpZ29yXCIsXG4gICAgICAgIGxldmVsOiAxMixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJTdHJcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiUG9pc29ub3VzIFNrZXdlciwgQWdpLCBNYXJhZ2koMTMpLCBBcm0gQ2hvcHBlcigxNCksIEZpcmUgQm9vc3QoMTUpLCBTb3VsIEJyZWFrKDE2KSwgUmVzaXN0IEV4aGF1c3QoMTcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9vbCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqrjg5Djg6rjg6jjg7NcIixcbiAgICAgICAgbmFtZTogXCJPYmFyaXlvblwiLFxuICAgICAgICBsZXZlbDogMTMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiU29uaWMgUHVuY2gsIFRhcnVrYWphLCBEZWthamEsIE11enpsZSBTaG90KDE0KSwgU2lsZW5jZSBCb29zdCgxNSksIFJlc2lzdCBQaHlzaWNhbCgxNyksIFNpbmdsZSBTaG90KDE4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuODhuOCo+OCv+ODvOODs1wiLFxuICAgICAgICBuYW1lOiBcIlRpdGFuXCIsXG4gICAgICAgIGxldmVsOiAxNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJTdHJcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hemlvLCBTa3VsbCBDcmFja2VyLCBEZWt1bmRhLCBEb2RnZSBJY2UoMTYpLCBLaWxsIFJ1c2goMTgpLCBSZXNpc3QgRmVhcigxOSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZWF0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjg6LjgrPjgqRcIixcbiAgICAgICAgbmFtZTogXCJNb2tvaVwiLFxuICAgICAgICBsZXZlbDogMTQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJTb25pYyBQdW5jaCwgSHlzdGVyaWNhbCBTbGFwLCBEZWthamEsIFZhbGlhbnQgRGFuY2UoMTUpLCBSYWdlIEJvb3N0KDE2KSwgU291bCBCcmVhaygxOCksIEV4aGF1c3QgQm9vc3QoMTkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiU3VwcG9ydFwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGllcm9waGFudCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg7Pjgrrjg7xcIixcbiAgICAgICAgbmFtZTogXCJBbnp1XCIsXG4gICAgICAgIGxldmVsOiAxNSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJTdHJcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydSwgQmFsemFjLCBBbGVydG5lc3MsIE1hZ2FydSgxNyksIFJlZCBXYWxsKDE4KSwgTWFoYW1hKDE5KSwgQXV0by1TdWt1a2FqYSgyMClcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IYW5nZWRNYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44OZ44Oq44K5XCIsXG4gICAgICAgIG5hbWU6IFwiQmVyaXRoXCIsXG4gICAgICAgIGxldmVsOiAxNSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlNpbmdsZSBTaG90LCBNdWRvLCBNYXJhZ2koMTYpLCBNdWRvIEJvb3N0KDE3KSwgR3JlZW4gV2FsbCgxOCksIEJyYWluIFNoYWtlKDE5KSwgUmVzaXN0IENvbmZ1c2UoMjApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5NYWdpY2lhbixcbiAgICAgICAgbmFtZV9qcDogXCLjgrjjg6Pjg4Pjgq/jg5Xjg63jgrnjg4hcIixcbiAgICAgICAgbmFtZTogXCJKYWNrIEZyb3N0XCIsXG4gICAgICAgIGxldmVsOiAxNixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hYnVmdSwgSWNlIEJyZWFrLCBNZSBQYXRyYSwgSWNlIEJvb3N0KDE4KSwgQnVmdWxhKDE5KSwgRG9kZ2UgRmlyZSgyMCksIE1pbmQgQ2hhcmdlKDI1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5UZW1wZXJhbmNlLFxuICAgICAgICBuYW1lX2pwOiBcIuOCq+OCpOODgVwiLFxuICAgICAgICBuYW1lOiBcIlhpZXpoYWlcIixcbiAgICAgICAgbGV2ZWw6IDE2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvLCBNYXppbywgUmFrdW5kYSwgTWFrYWphbSgxNyksIFNpbGVuY2UgQm9vc3QoMTgpLCBSYW1wYWdlKDE5KSwgRWxlYyBCb29zdCgyMSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2UsIE1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlByaWVzdGVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjgrXjg6njgrnjg7TjgqHjg4bjgqNcIixcbiAgICAgICAgbmFtZTogXCJTYXJhc3ZhdGlcIixcbiAgICAgICAgbGV2ZWw6IDE3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWVkaWEsIE1hYnVmdSwgUGF0cmEsIEludmlnb3JhdGUgMigxOSksIFJlc2lzdCBSYWdlKDIwKSwgRGVrYWphKDIxKSwgTnVsbCBXaW5kKDIzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2UsIE1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhlcm1pdCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqTjg4Pjg53jg7Pjg4Djgr/jg6lcIixcbiAgICAgICAgbmFtZTogXCJJcHBvbi1kYXRhcmFcIixcbiAgICAgICAgbGV2ZWw6IDE3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNdWRvLCBNYXJhZ2ksIE1hbXVkbygxOSksIEFnaWxhbygyMCksIFJhbXBhZ2UoMjEpLCBNdWRvIEJvb3N0KDIyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkRhcmtcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRW1wcmVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjg6Tjgq/jgrfjg4vjg7xcIixcbiAgICAgICAgbmFtZTogXCJZYWtzaW5pXCIsXG4gICAgICAgIGxldmVsOiAxOCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFidWZ1LCBSYWt1bmRhLCBTd2lmdCBTdHJpa2UoMjApLCBJY2UgQm9vc3QoMjEpLCBCdWZ1bGEoMjIpLCBBdXRvLVRhcnVrYWphKDIzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODqeODn+OCv+ODnlwiLFxuICAgICAgICBuYW1lOiBcIkFyYSBNaXRhbWFcIixcbiAgICAgICAgbGV2ZWw6IDE4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQXNzYXVsdCBEaXZlLCBSYWt1bmRhLCBUYXJ1a2FqYSgyMCksIFNoYXJwIFN0dWRlbnQoMjEpLCBCbHVlIFdhbGwoMjIpLCBEb2RnZSBFbGVjKDIzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiU3RlYW15IEJhdGhob3VzZSwgTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQWVvbixcbiAgICAgICAgbmFtZTogXCJBbWUtbm8tVXp1bWVcIixcbiAgICAgICAgbGV2ZWw6IDE4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg5fjg6rjg7Pjgrfjg5Hjg6rjg4bjgqNcIixcbiAgICAgICAgbmFtZTogXCJQcmluY2lwYWxpdHlcIixcbiAgICAgICAgbGV2ZWw6IDE5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiSGFtYSwgVHdpbiBTaG90LCBNYWhhbWEoMjEpLCBNZWRpYSgyMiksIFJlc2lzdCBDb25mdXNlKDIzKSwgU3Vydml2ZSBEYXJrKDI0KSwgVGV0cmFqYSgyNSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZXZpbCxcbiAgICAgICAgbmFtZV9qcDogXCLjg7Tjgqfjg7zjgr/jg6lcIixcbiAgICAgICAgbmFtZTogXCJWZXRhbGFcIixcbiAgICAgICAgbGV2ZWw6IDE5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlN0clwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJGb29saXNoIFdoaXNwZXIsIEV2aWwgVG91Y2gsIExpZmUgRHJhaW4oMjApLCBGb3VsIEJyZWF0aCgyMSksIEJyYWluIFNoYWtlKDIyKSwgR2hhc3RseSBXYWlsKDIzKSwgRmVhciBCb29zdCgyNClcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJTdGVhbXkgQmF0aGhvdXNlLCBNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Nb29uLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODs+ODieODqeOCuVwiLFxuICAgICAgICBuYW1lOiBcIkFuZHJhc1wiLFxuICAgICAgICBsZXZlbDogMjAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWRpYSwgTWF6aW8sIFN1a3VrYWphLCBCbHVlIFdhbGwoMjIpLCBSZWdlbmVyYXRlIDIoMjMpLCBaaW9uZ2EoMjQpLCBEb2RnZSBXaW5kKDI1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2UsIE1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN1bixcbiAgICAgICAgbmFtZV9qcDogXCLjg5vjgqbjgqrjgqZcIixcbiAgICAgICAgbmFtZTogXCJQaG9lbml4XCIsXG4gICAgICAgIGxldmVsOiAyMCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnVsYSwgTWFyYWdpLCBUd2luIFNob3QoMjIpLCBHcm93dGggMSgyMyksIERvZGdlIEljZSgyNSksIEZpcmUgQm9vc3QoMjYpLCBNYXJhZ2lvbigyNylcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIlN0ZWFteSBCYXRoaG91c2UsIE1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkplc3RlcixcbiAgICAgICAgbmFtZTogXCJHdXJyXCIsXG4gICAgICAgIGxldmVsOiAyMCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJTdHJcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvb2wsXG4gICAgICAgIG5hbWVfanA6IFwi44Os44Ku44Kq44OzXCIsXG4gICAgICAgIG5hbWU6IFwiTGVnaW9uXCIsXG4gICAgICAgIGxldmVsOiAyMSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlN0clwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJUZW50YXJhZm9vLCBNdWRvLCBFdmlsIFNtaWxlLCBSYW1wYWdlKDIzKSwgQ29uZnVzZSBCb29zdCgyNCksIEZvdWwgQnJlYXRoKDI1KSwgU3Vydml2ZSBMaWdodCgyNilcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IaWVyb3BoYW50LFxuICAgICAgICBuYW1lX2pwOiBcIuOCt+ODvOOCteODvFwiLFxuICAgICAgICBuYW1lOiBcIlNoaWlzYWFcIixcbiAgICAgICAgbGV2ZWw6IDIxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWF6aW8sIEJhbHphYywgUmFrdWthamEoMjIpLCBaaW9uZ2EoMjMpLCBTaWxlbmNlIEJvb3N0KDI0KSwgUmVzaXN0IEZpcmUoMjUpLCBOdWxsIFJhZ2UoMjYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44OP44Kk44OU44Kv44K344O8XCIsXG4gICAgICAgIG5hbWU6IFwiSGlnaCBQaXhpZVwiLFxuICAgICAgICBsZXZlbDogMjIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXppbywgU3VrdWthamEsIE1lIFBhdHJhLCBaaW9uZ2EoMjQpLCBJbnZpZ29yYXRlIDEoMjUpLCBEb2RnZSBGaXJlKDI2KSwgVHJhZnVyaSgyNylcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcGVyb3IsXG4gICAgICAgIG5hbWVfanA6IFwi44Kt44Oz44Kw44OV44Ot44K544OIXCIsXG4gICAgICAgIG5hbWU6IFwiS2luZyBGcm9zdFwiLFxuICAgICAgICBsZXZlbDogMjIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJ1ZnVsYSwgTWFidWZ1LCBJY2UgQnJlYWssIFJha3VrYWphKDIzKSwgRG9kZ2UgRmlyZSgyNCksIEljZSBCb29zdCgyNiksIE51bGwgRmlyZSgyNyksIEFuaW1hIEZyZWV6ZSgyOClcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGFuZ2VkTWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODqOODouODhOOCpOOCr+OCtVwiLFxuICAgICAgICBuYW1lOiBcIllvbW90c3UtaWt1c2FcIixcbiAgICAgICAgbGV2ZWw6IDIyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJDZWxsIEJyZWFrZXIsIE1hYnVmdSwgRW5lcnZhdGUgQm9vc3QoMjQpLCBGb3VsIEJyZWF0aCgyNSksIFBvaXNvbiBNaXN0KDI2KSwgUG9pc29uIEJvb3N0KDI3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuODqeOCr+OCt+ODo+ODvOOCtVwiLFxuICAgICAgICBuYW1lOiBcIlJha3NoYXNhXCIsXG4gICAgICAgIGxldmVsOiAyMyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIktpbGwgUnVzaCwgQnJhaW4gU2hha2UsIENvdW50ZXIsIEdhbGUgU2xhc2goMjUpLCBBdXRvLVRhcnVrYWphKDI2KSwgRG9kZ2UgUGh5c2ljYWwoMjcpLCBQb3dlciBDaGFyZ2UoMjgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5UZW1wZXJhbmNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODi+OCruODn+OCv+ODnlwiLFxuICAgICAgICBuYW1lOiBcIk5pZ2kgTWl0YW1hXCIsXG4gICAgICAgIGxldmVsOiAyMyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYXJhbWEsIE1lIFBhdHJhLCBSZSBQYXRyYSwgUmVjYXJtKDI1KSwgSW52aWdvcmF0ZSAyKDI2KSwgR2FydWxhKDI4KSwgUmVzaXN0IEVuZXJ2YXRlKDI5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRlYXRoLFxuICAgICAgICBuYW1lX2pwOiBcIuODnuOCv+ODieODvOODq1wiLFxuICAgICAgICBuYW1lOiBcIk1hdGFkb3JcIixcbiAgICAgICAgbGV2ZWw6IDI0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYW11ZG8sIFN3aWZ0IFN0cmlrZSwgRGVrdW5kYSwgTXVkbyBCb29zdCgyNiksIFJhbXBhZ2UoMjcpLCBBdXRvLVN1a3VrYWphKDI5KSwgU3Vydml2ZSBMaWdodCgzMClcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0YXIsXG4gICAgICAgIG5hbWVfanA6IFwi44Kt44Km44OzXCIsXG4gICAgICAgIG5hbWU6IFwiS2Fpd2FuXCIsXG4gICAgICAgIGxldmVsOiAyNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIldrXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlRldHJha2FybiwgQ2VsbCBCcmVha2VyLCBNYW11ZG8sIFN0YWduYW50IEFpcigyNiksIFJlc2lzdCBMaWdodCgyNyksIExpZmUgRHJhaW4oMjgpLCBTcGlyaXQgRHJhaW4oMjkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiU3VwcG9ydFwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5BZW9uLFxuICAgICAgICBuYW1lOiBcIk5hcmNpc3N1c1wiLFxuICAgICAgICBsZXZlbDogMjQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJXa1wiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJTdHJcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1hZ2ljaWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCq+ODj+OCr1wiLFxuICAgICAgICBuYW1lOiBcIkh1YSBQb1wiLFxuICAgICAgICBsZXZlbDogMjUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lsYW8sIFJha3VrYWphLCBSZSBQYXRyYSwgRmlyZSBCcmVhaygyNiksIE1ha2FqYW0oMjcpLCBEb2RnZSBJY2UoMjkpLCBGaXJlIEJvb3N0KDMwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTG92ZXJzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCr+OCpOODvOODs+ODoeOCpOODllwiLFxuICAgICAgICBuYW1lOiBcIlF1ZWVuIE1hYlwiLFxuICAgICAgICBsZXZlbDogMjUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9uZ2EsIFRlbnRhcmFmb28sIERla3VuZGEsIFJlY2FybSgyNiksIERvZGdlIFdpbmQoMjcpLCBNYXppb25nYSgyOSksIFJlc2lzdCBDb25mdXNlKDMwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkNoYXJpb3QsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44Os44K5XCIsXG4gICAgICAgIG5hbWU6IFwiQXJlc1wiLFxuICAgICAgICBsZXZlbDogMjUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhbGUgU2xhc2gsIENvdW50ZXIsIERvZGdlIFdpbmQoMjcpLCBSYW1wYWdlKDI4KSwgRGVrYWphKDI5KSwgUG93ZXIgQ2hhcmdlKDMwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRW1wcmVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjg4bjgqPjgr/jg7zjg4vjgqJcIixcbiAgICAgICAgbmFtZTogXCJUaXRhbmlhXCIsXG4gICAgICAgIGxldmVsOiAyNixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYXJhbWEsIE1hZ2FydSwgUmVkIFdhbGwoMjcpLCBHYXJ1bGEoMjkpLCBSZWdlbmVyYXRlIDIoMzEpLCBNaW5kIENoYXJnZSgzMilcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGVybWl0LFxuICAgICAgICBuYW1lX2pwOiBcIuODqeODn+OColwiLFxuICAgICAgICBuYW1lOiBcIkxhbWlhXCIsXG4gICAgICAgIGxldmVsOiAyNixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiU3RyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlBvaXNvbiBNaXN0LCBBZ2lsYW8sIE5lcnZ1bmRpLCBQb2lzb24gQm9vc3QoMjgpLCBOdWxsIFBvaXNvbigyOSksIFNvdWwgQnJlYWsoMzApLCBNYXJhZ2lvbigzMilcIixcbiAgICAgICAgaW5oZXJpdDogXCJCYWQgU3RhdFwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdXN0aWNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODkeODr+ODvFwiLFxuICAgICAgICBuYW1lOiBcIlBvd2VyXCIsXG4gICAgICAgIGxldmVsOiAyNyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkhhbWEsIFRlbnRhcmFmb28sIE1haGFtYSwgWmlvbmdhKDI5KSwgUG93ZXIgU2xhc2goMzApLCBIYW1hIEJvb3N0KDMxKSwgU3Vydml2ZSBEYXJrKDMyKSwgTnVsbCBDb25mdXNlKDMzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkxpZ2h0XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhhbmdlZE1hbixcbiAgICAgICAgbmFtZV9qcDogXCLjg57jgqvjg59cIixcbiAgICAgICAgbmFtZTogXCJNYWthbWlcIixcbiAgICAgICAgbGV2ZWw6IDI3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lsYW8sIFN1a3VuZGEsIEF1dG8tU3VrdWthamEoMjkpLCBEaWFyYW1hKDMwKSwgUmVzaXN0IFNpbGVuY2UoMzEpLCBEb2RnZSBQaHlzaWNhbCgzMiksIFJlc2lzdCBJY2UoMzMpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Nb29uLFxuICAgICAgICBuYW1lX2pwOiBcIuODjuOCuuODgVwiLFxuICAgICAgICBuYW1lOiBcIk5venVjaGlcIixcbiAgICAgICAgbGV2ZWw6IDI3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJQb2lzb24gTWlzdCwgRW5lcnZhdGlvbiwgQWlsbWVudCBCb29zdCwgWmlvbmdhKDI5KSwgUmFrdWthamEoMzApLCBOdWxsIFBvaXNvbigzMSksIE51bGwgRW5lcnZhdGUoMzIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiQmFkIFN0YXRcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlLCBWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSmVzdGVyLFxuICAgICAgICBuYW1lOiBcIlRha2UtTWluYWthdGFcIixcbiAgICAgICAgbGV2ZWw6IDI3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJTdHJcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSwgICAgXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdHJlbmd0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjgq/jgrfjg5/jgr/jg55cIixcbiAgICAgICAgbmFtZTogXCJLdXNpIE1pdGFtYVwiLFxuICAgICAgICBsZXZlbDogMjgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJOdWxcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1bGEsIFppb25nYSwgU291bCBCcmVhaywgU3Vydml2ZSBMaWdodCgzMSksIFN1cnZpdmUgRGFyaygzMiksIFRyYWVzdG8oMzMpLCBFeGhhdXN0IEJvb3N0KDM0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiTWFydWt5dSBTdHJpcHRlYXNlLCBWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGV2aWwsXG4gICAgICAgIG5hbWVfanA6IFwi44Kk44Oz44Kt44Ol44OQ44K5XCIsXG4gICAgICAgIG5hbWU6IFwiSW5jdWJ1c1wiLFxuICAgICAgICBsZXZlbDogMjgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWxhbywgRXZpbCBTbWlsZSwgTWluZCBTbGljZSwgU3RhZ25hbnQgQWlyKDMwKSwgU3Bpcml0IERyYWluKDMyKSwgR2hhc3RseSBXYWlsKDMzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZSwgVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlByaWVzdGVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjgqzjg7Pjgqzjg7xcIixcbiAgICAgICAgbmFtZTogXCJHYW5nYVwiLFxuICAgICAgICBsZXZlbDogMjksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCdWZ1bGEsIERpYXJhbWEsIERla2FqYSwgTWluZCBTbGljZSgzMSksIENvbmZ1c2UgQm9vc3QoMzIpLCBNZWRpYXJhbWEoMzMpLCBFdmFkZSBGaXJlKDM1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJNYXJ1a3l1IFN0cmlwdGVhc2UsIFZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IaWVyb3BoYW50LFxuICAgICAgICBuYW1lX2pwOiBcIuODpuODi+OCs+ODvOODs1wiLFxuICAgICAgICBuYW1lOiBcIlVuaWNvcm5cIixcbiAgICAgICAgbGV2ZWw6IDI5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppb25nYSwgTWFoYW1hLCBOZXJ2dW5kaSwgRGVrdW5kYSgzMSksIFRyYWZ1cmkoMzIpLCBSZWNhcm0oMzMpLCBNYXppb25nYSgzNClcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hcnVreXUgU3RyaXB0ZWFzZSwgVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuOCquODi1wiLFxuICAgICAgICBuYW1lOiBcIk9uaVwiLFxuICAgICAgICBsZXZlbDogMzAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRmF0YWwgRW5kLCBDb3VudGVyLCBDcnVlbCBBdHRhY2ssIEF0b20gU21hc2hlcigzMiksIFJlc2lzdCBQaHlzaWNhbCgzMyksIEVuZHVyZSgzNCksIFBvd2VyIENoYXJnZSgzNSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb29sLFxuICAgICAgICBuYW1lX2pwOiBcIuOCquOCu1wiLFxuICAgICAgICBuYW1lOiBcIk9zZVwiLFxuICAgICAgICBsZXZlbDogMzEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlBvd2VyIFNsYXNoLCBBdG9tIFNtYXNoZXIsIFBvd2VyIENoYXJnZSwgUG9pc29uIE1pc3QoMzMpLCBQb2lzb24gQm9vc3QoMzQpLCBBdXRvLVN1a3VrYWphKDM1KSwgU3Vydml2ZSBMaWdodCgzNilcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5UZW1wZXJhbmNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODn+ODiOODqVwiLFxuICAgICAgICBuYW1lOiBcIk1pdGhyYVwiLFxuICAgICAgICBsZXZlbDogMzEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1haGFtYSwgU2VhbCBCb21iLCBUZXRyYSBCcmVhaygzMyksIEhhbWFvbigzNCksIERvZGdlIEVsZWMoMzUpLCBIYW1hIEJvb3N0KDM2KSwgTnVsbCBTaWxlbmNlKDM3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkxpZ2h0XCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44OJ44Kl44OzXCIsXG4gICAgICAgIG5hbWU6IFwiR2RvblwiLFxuICAgICAgICBsZXZlbDogMzEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWxhbywgTWFyYWdpLCBGaXJlIEJyZWFrLCBHcm93dGggMigzMyksIE1hcmFnaW9uKDM0KSwgRmlyZSBCb29zdCgzNSksIEV2YWRlIEljZSgzNilcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5BZW9uLFxuICAgICAgICBuYW1lOiBcIlNhdGlcIixcbiAgICAgICAgbGV2ZWw6IDMxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1hZ2ljaWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCuOODo+ODg+OCr+ODqeODs+OCv+ODs1wiLFxuICAgICAgICBuYW1lOiBcIlB5cm8gSmFja1wiLFxuICAgICAgICBsZXZlbDogMzIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWxhbywgVGFydW5kYSwgTWFyYWt1a2FqYSgzNCksIE1hcmFnaW9uKDM2KSwgQXV0by1SYWt1a2FqYSgzNyksIFJlc2lzdCBJY2UoMzgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3RhcixcbiAgICAgICAgbmFtZV9qcDogXCLjg43jgrPjgrfjg6fjgqbjgrDjg7NcIixcbiAgICAgICAgbmFtZTogXCJOZWtvIFNob2d1blwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiU2FraSBNaXRhbWFcIiwgXCJBcmEgTWl0YW1hXCIsIFwiS3VzaSBNaXRhbWFcIiwgXCJOaWdpIE1pdGFtYVwiXSxcbiAgICAgICAgbGV2ZWw6IDMyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9uZ2EsIEVsZWMgQm9vc3QsIEJsYWNrIFNwb3QsIE1lZGlhcmFtYSgzNCksIE1hdGFydWthamEoMzUpLCBFdmFkZSBXaW5kKDM2KSwgRGl2aW5lIEdyYWNlKDM3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlN1cHBvcnRcIixcbiAgICAgICAgbm90ZXM6IFwiQ3Jvc3MgU3ByZWFkXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTG92ZXJzLFxuICAgICAgICBuYW1lX2pwOiBcIuOCpuODs+ODh+OCo+ODvOODjVwiLFxuICAgICAgICBuYW1lOiBcIlVuZGluZVwiLFxuICAgICAgICBsZXZlbDogMzMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYXJhbWEsIEJ1ZnVsYSwgUG9zdW11ZGksIE1hYnVmdWxhKDM0KSwgTWVkaWFyYW1hKDM2KSwgSWNlIEJvb3N0KDM3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdXN0aWNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODtOOCoeODvOODgeODo+ODvFwiLFxuICAgICAgICBuYW1lOiBcIlZpcnR1ZVwiLFxuICAgICAgICBsZXZlbDogMzMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWhhbWEsIEdhcnVsYSwgUG9zdW11ZGksIEZhdGFsIEVuZCgzNSksIEJsdWUgV2FsbCgzNyksIEhhbWEgQm9vc3QoMzgpLCBSZXNpc3QgRGFyaygzOSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGVybWl0LFxuICAgICAgICBuYW1lX2pwOiBcIuODouOCueODnuODs1wiLFxuICAgICAgICBuYW1lOiBcIk1vdGhtYW5cIixcbiAgICAgICAgbGV2ZWw6IDMzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiUmZcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppb25nYSwgVmFsaWFudCBEYW5jZSwgRm91bCBCcmVhdGgoMzUpLCBFbGVjIEJyZWFrKDM2KSwgTWF6aW9uZ2EoMzcpLCBSYWdlIEJvb3N0KDM4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiVm9pZCBRdWVzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcHJlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44K044Or44K044OzXCIsXG4gICAgICAgIG5hbWU6IFwiR29yZ29uXCIsXG4gICAgICAgIGxldmVsOiAzNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJ1ZnVsYSwgTWUgUGF0cmEsIENyYXp5IENoYWluKDM1KSwgTnVsbCBDb25mdXNlKDM2KSwgTWFidWZ1bGEoMzgpLCBJY2UgQm9vc3QoMzkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3QsIFNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRW1wZXJvcixcbiAgICAgICAgbmFtZV9qcDogXCLjgrvjgr/jg7Pjgr9cIixcbiAgICAgICAgbmFtZTogXCJTZXRhbnRhXCIsXG4gICAgICAgIGxldmVsOiAzNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkZhdGFsIEVuZCwgWmlvbmdhLCBTaGFycCBTdHVkZW50LCBDb3VudGVyc3RyaWtlKDM2KSwgUG93ZXIgQ2hhcmdlKDM4KSwgQXV0by1NYXJha3UoMzkpLCBOdWxsIEZpcmUoNDApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjg6Tjg57jgr/jg47jgqrjg63jg4FcIixcbiAgICAgICAgbmFtZTogXCJZYW1hdGEtbm8tT3JvY2hpXCIsXG4gICAgICAgIGxldmVsOiAzNCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hYnVmdWxhLCBHYXJ1bGEsIFJlZCBXYWxsLCBHcmVlbiBXYWxsKDM2KSwgUmVzaXN0IEVuZXJ2YXRlKDM4KSwgSWNlIEJvb3N0KDM5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJWb2lkIFF1ZXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSmVzdGVyLFxuICAgICAgICBuYW1lOiBcIlBhbGUgUmlkZXJcIixcbiAgICAgICAgbGV2ZWw6IDM0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9ydHVuZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg5Xjgqnjg6vjg4jjgqXjg4pcIixcbiAgICAgICAgbmFtZTogXCJGb3J0dW5hXCIsXG4gICAgICAgIGxldmVsOiAzNSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydWxhLCBSYWt1a2FqYSwgRG9kZ2UgRWxlYygzNyksIE1hZ2FydWxhKDM4KSwgQXV0by1TdWt1a2FqYSgzOSksIFdpbmQgQm9vc3QoNDApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVG93ZXIsXG4gICAgICAgIG5hbWVfanA6IFwi44OI44Km44OG44OEXCIsXG4gICAgICAgIG5hbWU6IFwiVGFvIFRpZVwiLFxuICAgICAgICBsZXZlbDogMzUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWVnaWRvLCBNaW5kIFNsaWNlLCBEZWt1bmRhLCBDb25mdXNlIEJvb3N0KDM3KSwgTWluZCBDaGFyZ2UoMzgpLCBOdWxsIEVuZXJ2YXRlKDQwKSwgVG9ycmVudCBTaG90KDQxKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkFsbWlnaHR5XCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IaWVyb3BoYW50LFxuICAgICAgICBuYW1lX2pwOiBcIuODleODqeODreOCpuOCuVwiLFxuICAgICAgICBuYW1lOiBcIkZsYXVyb3NcIixcbiAgICAgICAgbGV2ZWw6IDM2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJGYXRhbCBFbmQsIFRhcnVrYWphLCBBZ2lsYW8sIEhlcmN1bGVhbiBTdHJpa2UoMzgpLCBBcHQgUHVwaWwoMzkpLCBEb2RnZSBJY2UoNDApLCBDcmF6eSBDaGFpbig0MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3QsIFNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGVhdGgsXG4gICAgICAgIG5hbWVfanA6IFwi44K144Oe44Ko44OrXCIsXG4gICAgICAgIG5hbWU6IFwiU2FtYWVsXCIsXG4gICAgICAgIGxldmVsOiAzNixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNdWRvb24sIE1hdGFydW5kYSwgUG9pc29uIE1pc3QsIERla3VuZGEoMzgpLCBNZWdpZG8oMzkpLCBNdWRvIEJvb3N0KDQwKSwgU3Vydml2ZSBMaWdodCg0MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJEYXJrXCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44OR44O844Or44O044Kh44OG44KjXCIsXG4gICAgICAgIG5hbWU6IFwiUGFydmF0aVwiLFxuICAgICAgICBsZXZlbDogMzcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJEaWFyYW1hLCBOZXJ2dW5kaSwgTWVkaWFyYW1hKDM5KSwgTWFyYWt1a2FqYSg0MCksIERvZGdlIEVsZWMoNDEpLCBEaXZpbmUgR3JhY2UoNDMpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiVm9pZCBRdWVzdCwgU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZXZpbCxcbiAgICAgICAgbmFtZV9qcDogXCLjg5HjgrrjgrlcIixcbiAgICAgICAgbmFtZTogXCJQYXp1enVcIixcbiAgICAgICAgbGV2ZWw6IDM3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiUmZcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNdWRvb24sIFJha3VrYWphLCBCdWZ1bGEsIFN0YWduYW50IEFpcigzOSksIEFpbG1lbnQgQm9vc3QoNDApLCBOYXZhcyBOZWJ1bGEoNDEpLCBDb29sIEJyZWV6ZSg0MilcIixcbiAgICAgICAgaW5oZXJpdDogXCJEYXJrXCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3QsIFNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQWVvbixcbiAgICAgICAgbmFtZTogXCJSYWphIE5hZ2FcIixcbiAgICAgICAgbGV2ZWw6IDM3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LCAgICBcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvb2wsXG4gICAgICAgIG5hbWVfanA6IFwi44K444Oj44Ki44Kv44OV44Ot44K544OIXCIsXG4gICAgICAgIG5hbWU6IFwiQmxhY2sgRnJvc3RcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIkphY2sgRnJvc3RcIixcIlB5cm8gSmFja1wiLFwiS2luZyBGcm9zdFwiLFwiUGl4aWVcIixcIkdob3VsXCJdLFxuICAgICAgICBsZXZlbDogMzgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXJhZ2lvbiwgQnVmdWxhLCBJY2UgQm9vc3QsIE1pbmQgQ2hhcmdlKDQwKSwgTWFzdWt1bmRhKDQxKSwgRmlyZSBBbXAoNDIpLCBBZ2lkeW5lKDQzKSwgTXVkb29uKDQ0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkRhcmtcIixcbiAgICAgICAgbm90ZXM6IFwiU3RhciBTcHJlYWRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdXN0aWNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODieODn+ODi+OCquODs1wiLFxuICAgICAgICBuYW1lOiBcIkRvbWluaW9uXCIsXG4gICAgICAgIGxldmVsOiAzOCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiUmZcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiSGFtYW9uLCBaaW9uZ2EsIEhhbWEgQm9vc3QoNDApLCBSZXNpc3QgRXhoYXVzdCg0MSksIE1hemlvbmdhKDQyKSwgU3Vydml2ZSBEYXJrKDQzKSwgTnVsbCBEYXJrKDQ0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkxpZ2h0XCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTWFnaWNpYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44OH44Kj44O844K5XCIsXG4gICAgICAgIG5hbWU6IFwiRGlzXCIsXG4gICAgICAgIGxldmVsOiAzOSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXJhZ2lvbiwgRGlhcmFtYSwgRGVrdW5kYSwgRG9kZ2UgSWNlKDQxKSwgTWFzdWt1bmRhKDQyKSwgQWdpZHluZSg0MyksIE1pbmQgQ2hhcmdlKDQ0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IYW5nZWRNYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Kq44Or44OI44Ot44K5XCIsXG4gICAgICAgIG5hbWU6IFwiT3J0aHJ1c1wiLFxuICAgICAgICBsZXZlbDogMzksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lsYW8sIEJsYWNrIFNwb3QsIE1hcmFrdWthamEoNDEpLCBGaXJlIEJvb3N0KDQyKSwgTWFyYWdpb24oNDQpLCBOdWxsIEljZSg0NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuVGVtcGVyYW5jZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgrLjg7Pjg5ZcIixcbiAgICAgICAgbmFtZTogXCJHZW5idVwiLFxuICAgICAgICBsZXZlbDogNDAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWJ1ZnVsYSwgTWFyYWt1a2FqYSwgUmVnZW5lcmF0ZSAyKDQyKSwgTWFrYXJhIEJyZWFrKDQzKSwgQmx1ZSBXYWxsKDQ0KSwgUmVzaXN0IFBoeXNpY2FsKDQ1KSwgRXZhZGUgRWxlYyg0NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Ok44K/44Ks44Op44K5XCIsXG4gICAgICAgIG5hbWU6IFwiWWF0YWdhcmFzdVwiLFxuICAgICAgICBsZXZlbDogNDAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hc3VrdWthamEsIE5lcnZ1bmRpLCBBZ2lsYW8sIE51bGwgRmVhcig0MyksIEdyb3d0aCAyKDQ0KSwgRGlhcmFoYW4oNDUpLCBDb29sIEJyZWV6ZSg0NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJTdXBwb3J0XCIsXG4gICAgICAgIG5vdGVzOiBcIlZvaWQgUXVlc3QsIFNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSmVzdGVyLFxuICAgICAgICBuYW1lOiBcIkxvYVwiLFxuICAgICAgICBsZXZlbDogNDAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiU3RyXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlwiLFxuICAgICAgICBpbmhlcml0OiBcIlwiLFxuICAgICAgICBub3RlczogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXBlcm9yLFxuICAgICAgICBuYW1lX2pwOiBcIuOCquOCquOCr+ODi+ODjOOCt1wiLFxuICAgICAgICBuYW1lOiBcIk91a3VuaW51c2hpXCIsXG4gICAgICAgIGxldmVsOiA0MSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvbmdhLCBCbGFkZSBvZiBGdXJ5LCBDb3VudGVyc3RyaWtlKDQzKSwgTWF6aW9uZ2EoNDQpLCBBcHQgUHVwaWwoNDUpLCBFbGVjIEJvb3N0KDQ2KSwgTnVsbCBXaW5kKDQ3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IZXJtaXQsXG4gICAgICAgIG5hbWVfanA6IFwi44OS44OI44Kz44OI44OM44K3XCIsXG4gICAgICAgIG5hbWU6IFwiSGl0b2tvdG8tTnVzaGlcIixcbiAgICAgICAgbGV2ZWw6IDQxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJOdWxcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJGb29saXNoIFdoaXNwZXIsIEF1dG8tU3VrdWthamEsIFBvaXNvbiBBcnJvdywgWmlvbmdhKDQzKSwgUmVzaXN0IEZpcmUoNDUpLCBFbGVjIEJvb3N0KDQ2KSwgQXV0by1NYXN1a3UoNDcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiQmFkIFN0YXRcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Nb29uLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODq+ODqeOCpuODjVwiLFxuICAgICAgICBuYW1lOiBcIkFscmF1bmVcIixcbiAgICAgICAgbGV2ZWw6IDQxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJTdHJcIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZGlhcmFtYSwgRW5lcmd5IFNob3dlciwgT2xkIE9uZSwgTWFrYXJha2Fybig0MyksIEdyZWVuIFdhbGwoNDQpLCBOdWxsIEVuZXJ2YXRlKDQ1KSwgRW5lcnZhdGUgQm9vc3QoNDYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Mb3ZlcnMsXG4gICAgICAgIG5hbWVfanA6IFwi44Oq44Oj44OK44Oz44K344O8XCIsXG4gICAgICAgIG5hbWU6IFwiTGVhbmFuIFNpZGhlXCIsXG4gICAgICAgIGxldmVsOiA0MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWVkaWFyYW1hLCBNZSBQYXRyYSwgVGVudGFyYWZvbyg0MyksIENvbmZ1c2UgQm9vc3QoNDQpLCBFbmVyZ3kgU2hvd2VyKDQ1KSwgU2FtYXJlY2FybSg0NiksIERpdmluZSBHcmFjZSg0NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3RyZW5ndGgsXG4gICAgICAgIG5hbWVfanA6IFwi44OP44OM44Oe44O844OzXCIsXG4gICAgICAgIG5hbWU6IFwiSGFudW1hblwiLFxuICAgICAgICBsZXZlbDogNDIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1pZ2h0eSBTd2luZywgUmFrdW5kYSwgUmVjYXJtLCBCbGFkZSBvZiBGdXJ5KDQ0KSwgRG9kZ2UgV2luZCg0NiksIEVuZHVyZSg0NyksIFBvd2VyIENoYXJnZSg0OClcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQ2hhcmlvdCxcbiAgICAgICAgbmFtZV9qcDogXCLjg4jjg6rjgrDjg6njg5VcIixcbiAgICAgICAgbmFtZTogXCJUcmlnbGF2XCIsXG4gICAgICAgIGxldmVsOiA0MyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkhlYXQgV2F2ZSwgQ291bnRlcnN0cmlrZSwgTWFyYWt1a2FqYSg0NSksIE11c3RhcmQgQm9tYig0NiksIE51bGwgRGl6enkoNDcpLCBCbHVlIFdhbGwoNDgpLCBQb3dlciBDaGFyZ2UoNDkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0YXIsXG4gICAgICAgIG5hbWVfanA6IFwi44OV44Km44KtXCIsXG4gICAgICAgIG5hbWU6IFwiRnV1LWtpXCIsXG4gICAgICAgIGxldmVsOiA0MyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJHYXJ1bGEsIFRvcnJlbnQgU2hvdCwgQ291bnRlcnN0cmlrZSwgRXZhZGUgRmlyZSg0NSksIEFwdCBQdXBpbCg0NiksIFdpbmQgQm9vc3QoNDcpLCBOdWxsIEV4aGF1c3QoNDkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcHJlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44Ks44OW44Oq44Ko44OrXCIsXG4gICAgICAgIG5hbWU6IFwiR2FicmllbFwiLFxuICAgICAgICBsZXZlbDogNDQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hYnVmdWxhLCBNZWRpYXJhbWEsIEVuZXJneSBTaG93ZXIoNDUpLCBTdXJ2aXZlIERhcmsoNDcpLCBIZWF0IFdhdmUoNDgpLCBEaXZpbmUgR3JhY2UoNTApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9ydHVuZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgq/jg63jg4hcIixcbiAgICAgICAgbmFtZTogXCJDbG90aG9cIixcbiAgICAgICAgbGV2ZWw6IDQ0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJSZlwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hZ2FydWxhLCBNdXR1ZGksIE5hdmFzIE5lYnVsYSg0NSksIE1ha2FyYWthcm4oNDcpLCBXaW5kIEJvb3N0KDQ4KSwgR2FydWR5bmUoNDkpLCBOdWxsIEVuZXJ2YXRlKDUwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRldmlsLFxuICAgICAgICBuYW1lX2pwOiBcIuOCteOCreODpeODkOOCuVwiLFxuICAgICAgICBuYW1lOiBcIlN1Y2N1YnVzXCIsXG4gICAgICAgIGxldmVsOiA0NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lsYW8sIE11ZG9vbiwgTWFyYWdpb24oNDYpLCBNdWRvIEJvb3N0KDQ3KSwgU3Bpcml0IERyYWluKDQ4KSwgUmVzaXN0IExpZ2h0KDQ5KSwgSW52aWdvcmF0ZSAzKDUwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQWVvbixcbiAgICAgICAgbmFtZTogXCJLdXNoaW5hZGFcIixcbiAgICAgICAgbGV2ZWw6IDQ0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcGVyb3IsXG4gICAgICAgIG5hbWVfanA6IFwi44OI44O844OIXCIsXG4gICAgICAgIG5hbWU6IFwiVGhvdGhcIixcbiAgICAgICAgbGV2ZWw6IDQ1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCJSZlwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXppb25nYSwgTWFoYW1hLCBNZWdpZG8sIE1lZGlhcmFtYSg0NyksIEdyb3d0aCAyKDQ4KSwgTnVsbCBTaWxlbmNlKDQ5KSwgWmlvZHluZSg1MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGllcm9waGFudCxcbiAgICAgICAgbmFtZV9qcDogXCLjg5vjgq/jg4jjgrvjgqTjgq/jg7NcIixcbiAgICAgICAgbmFtZTogXCJIb2t1dG8gU2Vpa3VuXCIsXG4gICAgICAgIGxldmVsOiA0NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvbmdhLCBFbGVjIEJvb3N0LCBOYXZhcyBOZWJ1bGEsIEJsYWRlIG9mIEZ1cnkoNDcpLCBSZXNpc3QgRXhoYXVzdCg0OCksIENvdW50ZXJzdHJpa2UoNTApLCBaaW9keW5lKDUxKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Gb29sLFxuICAgICAgICBuYW1lX2pwOiBcIuODh+OCq+ODqeODk+OColwiLFxuICAgICAgICBuYW1lOiBcIkRlY2FyYWJpYVwiLFxuICAgICAgICBsZXZlbDogNDYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJXa1wiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgTWF0YXJ1bmRhLCBUZXRyYWthcm4sIEV2YWRlIFBoeXNpY2FsKDQ4KSwgTWVnaWRvbGEoNTApLCBGaXJlIEFtcCg1MSksIFJlc2lzdCBQaHlzaWNhbCg1MilcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGVhdGgsXG4gICAgICAgIG5hbWVfanA6IFwi44Oi44OIXCIsXG4gICAgICAgIG5hbWU6IFwiTW90XCIsXG4gICAgICAgIGxldmVsOiA0NixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNdWRvb24sIEV2aWwgU21pbGUsIFRlbnRhcmFmb28sIFN1cnZpdmUgTGlnaHQoNDgpLCBHaGFzdGx5IFdhaWwoNDkpLCBNdWRvIEJvb3N0KDUwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkRhcmtcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Ub3dlcixcbiAgICAgICAgbmFtZV9qcDogXCLjgq/jg7zjg7vjg5Xjg7zjg6rjg7NcIixcbiAgICAgICAgbmFtZTogXCJDdSBDaHVsYWlublwiLFxuICAgICAgICBsZXZlbDogNDYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlJmXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFnYXJ1bGEsIERlYXRoYm91bmQsIE1hdGFydWthamEoNDcpLCBNaW5kIENoYXJnZSg0OCksIFdoaXRlIFdhbGwoNDkpLCBFbmR1cmUgRGFyayg1MCksIEdhcnVkeW5lKDUxKSwgV2luZCBBbXAoNTMpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTWFnaWNpYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Op44Oz44OAXCIsXG4gICAgICAgIG5hbWU6IFwiUmFuZ2RhXCIsXG4gICAgICAgIGxldmVsOiA0NyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlJmXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFyYWdpb24sIFRlbnRhcmFmb28sIEFnaWR5bmUoNDkpLCBEb2RnZSBJY2UoNTApLCBNdXN0YXJkIEJvbWIoNTEpLCBSZXBlbCBQaHlzaWNhbCg1NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlNlY3JldCBMYWJvcmF0b3J5LCBIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5UZW1wZXJhbmNlLFxuICAgICAgICBuYW1lX2pwOiBcIuOCu+OCpOODquODpeOCplwiLFxuICAgICAgICBuYW1lOiBcIlNlaXJ5dVwiLFxuICAgICAgICBsZXZlbDogNDcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJOdWxcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXppb25nYSwgTWF0YXJ1bmRhLCBaaW9keW5lKDQ5KSwgUG9pc29uIE1pc3QoNTApLCBFbGVjIEJyZWFrKDUxKSwgRWxlYyBCb29zdCg1MiksIFJlc2lzdCBFeGhhdXN0KDUzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN1bixcbiAgICAgICAgbmFtZV9qcDogXCLjg4rjg6njgrfjg7Pjg49cIixcbiAgICAgICAgbmFtZTogXCJOYXJhc2ltaGFcIixcbiAgICAgICAgbGV2ZWw6IDQ3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJIYW1hb24sIFRlbXBlc3QgU2xhc2gsIENvdW50ZXJzdHJpa2UoNDgpLCBFdmFkZSBXaW5kKDQ5KSwgTWFoYW1hb24oNTEpLCBBdXRvLU1hdGFydSg1MylcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJTZWNyZXQgTGFib3JhdG9yeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkplc3RlcixcbiAgICAgICAgbmFtZTogXCJCYXBob21ldFwiLFxuICAgICAgICBsZXZlbDogNDcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LCAgICBcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlByaWVzdGVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjgq3jgq/jg6rjg5Ljg6FcIixcbiAgICAgICAgbmFtZTogXCJLaWt1cmktaGltZVwiLFxuICAgICAgICBsZXZlbDogNDgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlN0clwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZGlhcmFtYSwgUG9zdW11ZGksIEFnaWxhbywgU2FtYXJlY2FybSg1MCksIERpYXJhaGFuKDUyKSwgUmVzaXN0IERhcmsoNTMpLCBEaXZpbmUgR3JhY2UoNTQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGVybWl0LFxuICAgICAgICBuYW1lX2pwOiBcIuOCr+ODqeODnuODhuODs+OCsFwiLFxuICAgICAgICBuYW1lOiBcIkt1cmFtYSBUZW5ndVwiLFxuICAgICAgICBsZXZlbDogNDgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIkRyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydWxhLCBNYXN1a3VuZGEsIFZpY2lvdXMgU3RyaWtlLCBHcm93dGggMig1MCksIFdpbmQgQm9vc3QoNTEpLCBSZWQgV2FsbCg1MiksIFJlc2lzdCBFbGVjKDUzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIldpbmRcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjgq7jg6rjg6Hjgqvjg6lcIixcbiAgICAgICAgbmFtZTogXCJHaXJpbWVoa2FsYVwiLFxuICAgICAgICBsZXZlbDogNDgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJSZlwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJQb3dlciBDaGFyZ2UsIE1pZ2h0eSBTd2luZywgUG9pc29uIE1pc3QsIE1hbXVkb29uKDUwKSwgQmxpZ2h0KDUxKSwgVGV0cmFqYSg1MiksIEVuZHVyZSBMaWdodCg1MyksIFJlcGVsIFBoeXNpY2FsKDU2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlN1cHBvcnRcIixcbiAgICAgICAgbm90ZXM6IFwiU2VjcmV0IExhYm9yYXRvcnksIEhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1c3RpY2UsXG4gICAgICAgIG5hbWVfanA6IFwi44K944Ot44ONXCIsXG4gICAgICAgIG5hbWU6IFwiVGhyb25lXCIsXG4gICAgICAgIGxldmVsOiA0OSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiRHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJIYW1hb24sIEFnaWR5bmUsIEhhbWEgQm9vc3QsIE1pbmQgQ2hhcmdlKDUxKSwgUmVnZW5lcmF0ZSAyKDUzKSwgUmVzaXN0IERhcmsoNTQpLCBFbmR1cmUgRGFyayg1NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IYW5nZWRNYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Ok44OE44OV44K1XCIsXG4gICAgICAgIG5hbWU6IFwiWWF0c3VmdXNhXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJNYWthbWlcIiwgXCJPcnRocnVzXCIsIFwiTW90aG1hblwiLCBcIlRob3RoXCIsIFwiTmFyYXNpbWhhXCJdLFxuICAgICAgICBsZXZlbDogNDksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJSZlwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgTWFzdWt1a2FqYSwgRmlyZSBCb29zdCwgSGVhdCBXYXZlKDUxKSwgUG93ZXIgQ2hhcmdlKDUyKSwgRG9kZ2UgUGh5c2ljYWwoNTMpLCBNYXJhZ2lkeW5lKDU0KSwgTWluZCBDaGFyZ2UoNTUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJTdGFyIFNwcmVhZFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuOCq+ODvOODquODvFwiLFxuICAgICAgICBuYW1lOiBcIkthbGlcIixcbiAgICAgICAgbGV2ZWw6IDUwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCdWZ1ZHluZSwgTXVkb29uLCBEZWF0aGJvdW5kKDUyKSwgUmV2b2x1dGlvbig1MyksIEhpZ2ggQ291bnRlcig1NCksIFBvd2VyIENoYXJnZSg1NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3RhcixcbiAgICAgICAgbmFtZV9qcDogXCLjgqzjg43jg7zjgrfjg6NcIixcbiAgICAgICAgbmFtZTogXCJHYW5lc2hhXCIsXG4gICAgICAgIGxldmVsOiA1MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnVkeW5lLCBNdXN0YXJkIEJvbWIsIE1ha2FyYWthcm4sIFBvd2VyIENoYXJnZSg1MiksIEhpZ2ggQ291bnRlcig1NCksIEVuZHVyZSg1NSksIE1hZ2FydWR5bmUoNTYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXBlcm9yLFxuICAgICAgICBuYW1lX2pwOiBcIuODkeODlOODq+OCteOCsFwiLFxuICAgICAgICBuYW1lOiBcIlBhYmlsc2FnXCIsXG4gICAgICAgIGxldmVsOiA1MSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQmxpZ2h0LCBGb29saXNoIFdoaXNwZXIsIFN0YWduYW50IEFpcig1MyksIFNpbGVuY2UgQm9vc3QoNTQpLCBNdWRvb24oNTUpLCBBcnJvdyBSYWluKDU2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9ydHVuZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg6njgrHjgrfjgrlcIixcbiAgICAgICAgbmFtZTogXCJMYWNoZXNpc1wiLFxuICAgICAgICBsZXZlbDogNTEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnVkeW5lLCBNYXN1a3VrYWphLCBSZWNhcm0oNTMpLCBNYWthcmEgQnJlYWsoNTQpLCBBYnNvcmIgV2luZCg1NSksIFJlZCBXYWxsKDU2KSwgUmVzaXN0IEV4aGF1c3QoNTcpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQWVvbixcbiAgICAgICAgbmFtZTogXCJRdWV0emFsY29hdGxcIixcbiAgICAgICAgbGV2ZWw6IDUxLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LCAgICBcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcHJlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44K544Kr44OH44KjXCIsXG4gICAgICAgIG5hbWU6IFwiU2thZGlcIixcbiAgICAgICAgbGV2ZWw6IDUyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIkRyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hYnVmdWxhLCBBZW9uIFJhaW4sIEJ1ZnVkeW5lKDU0KSwgSWNlIEFtcCg1NiksIFJlcGVsIEljZSg1NyksIFJlcGVsIEZpcmUoNTkpLCBTcGVsbCBNYXN0ZXIoNjApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhpZXJvcGhhbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Kx44Or44OZ44Ot44K5XCIsXG4gICAgICAgIG5hbWU6IFwiQ2VyYmVydXNcIixcbiAgICAgICAgbGV2ZWw6IDUyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJSZlwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lkeW5lLCBHaWdhbnRpYyBGaXN0LCBWaWNpb3VzIFN0cmlrZSg1MyksIE1hcmFnaWR5bmUoNTQpLCBSZWdlbmVyYXRlIDIoNTUpLCBGaXJlIEFtcCg1NyksIEF1dG8tU3VrdWthamEoNTgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Mb3ZlcnMsXG4gICAgICAgIG5hbWVfanA6IFwi44Op44OV44Kh44Ko44OrXCIsXG4gICAgICAgIG5hbWU6IFwiUmFwaGFlbFwiLFxuICAgICAgICBsZXZlbDogNTMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJSZlwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRGlhcmFoYW4sIE1lZ2lkb2xhLCBNYXN1a3VrYWphKDU1KSwgQW1yaXRhKDU2KSwgTnVsbCBEaXp6eSg1NyksIE1lZGlhcmFoYW4oNTkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRldmlsLFxuICAgICAgICBuYW1lX2pwOiBcIuODquODquOCuVwiLFxuICAgICAgICBuYW1lOiBcIkxpbGl0aFwiLFxuICAgICAgICBsZXZlbDogNTMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvZHluZSwgTWFrYXJha2FybiwgT2xkIE9uZSg1NCksIE1hemlvZHluZSg1NSksIEVsZWMgQnJlYWsoNTYpLCBBaWxtZW50IEJvb3N0KDU3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiSGVhdmVuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3VuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCv+ODoOODquODs1wiLFxuICAgICAgICBuYW1lOiBcIlRhbSBMaW5cIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIlBob2VuaXhcIiwgXCJHZG9uXCIsIFwiWWF0YWdhcmFzdVwiLCBcIk5hcmFzaW1oYVwiXSxcbiAgICAgICAgbGV2ZWw6IDUzLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9keW5lLCBEZWF0aGJvdW5kLCBIaWdoIENvdW50ZXIsIEF1dG8tTWFyYWt1KDU0KSwgUG93ZXIgQ2hhcmdlKDU1KSwgRWxlYyBBbXAoNTYpLCBFdmFkZSBQaHlzaWNhbCg1OCksIEVuZHVyaW5nIFNvdWwoNTkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUGh5c1wiLFxuICAgICAgICBub3RlczogXCJDcm9zcyBTcHJlYWRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuOCreODs+OCrVwiLFxuICAgICAgICBuYW1lOiBcIktpbi1raVwiLFxuICAgICAgICBsZXZlbDogNTQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJOdWxcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlZpbGUgQXNzYXVsdCwgSGlnaCBDb3VudGVyLCBHaWdhbnRpYyBGaXN0KDU2KSwgU2VhbCBCb21iKDU3KSwgUmV2b2x1dGlvbig1OSksIFBvd2VyIENoYXJnZSg2MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRlbXBlcmFuY2UsXG4gICAgICAgIG5hbWVfanA6IFwi44K544K244KvXCIsXG4gICAgICAgIG5hbWU6IFwiU3V6YWt1XCIsXG4gICAgICAgIGxldmVsOiA1NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFyYWdpb24sIEVuZXJneSBTaG93ZXIsIE1hc3VrdWthamEoNTUpLCBBZ2lkeW5lKDU2KSwgUmVzaXN0IEljZSg1OCksIEZpcmUgQW1wKDU5KSwgQXV0by1NYXN1a3UoNjApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IZXJtaXQsXG4gICAgICAgIG5hbWVfanA6IFwi44OL44O844K644Ob44OD44KwXCIsXG4gICAgICAgIG5hbWU6IFwiTmlkaG9nZ3JcIixcbiAgICAgICAgbGV2ZWw6IDU1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hbXVkb29uLCBFdmlsIFNtaWxlLCBHaGFzdGx5IFdhaWwoNTcpLCBCdWZ1ZHluZSg1OCksIFN0YWduYW50IEFpcig1OSksIFJlc2lzdCBQaHlzaWNhbCg2MCksIEljZSBCb29zdCg2MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJEYXJrXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRvd2VyLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODkOODieODs1wiLFxuICAgICAgICBuYW1lOiBcIkFiYWRkb25cIixcbiAgICAgICAgbGV2ZWw6IDU1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiT2xkIE9uZSwgTXVkb29uLCBBcnJvdyBSYWluLCBBZ2lkeW5lKDU2KSwgRW5kdXJlIExpZ2h0KDU3KSwgVGV0cmEgQnJlYWsoNjApLCBOdWxsIFBoeXNpY2FsKDYyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KZXN0ZXIsXG4gICAgICAgIG5hbWU6IFwiS3VtYmhhbmRhXCIsXG4gICAgICAgIGxldmVsOiA1NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiRHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvb2wsXG4gICAgICAgIG5hbWVfanA6IFwi44K344Kt44Kq44Km44K4XCIsXG4gICAgICAgIG5hbWU6IFwiU2hpa2ktT3VqaVwiLFxuICAgICAgICBsZXZlbDogNTYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk5hdmFzIE5lYnVsYSwgTWF0YXJ1bmRhLCBSZXZvbHV0aW9uLCBBcHQgUHVwaWwoNTgpLCBHcm93dGggMig1OSksIE51bGwgUGh5c2ljYWwoNjIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IYW5nZWRNYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44OI44Km44Kz44OEXCIsXG4gICAgICAgIG5hbWU6IFwiVGFvd3VcIixcbiAgICAgICAgbGV2ZWw6IDU2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWVvbiBSYWluLCBEZWthamEsIE1hdGFydWthamEsIE51bGwgRW5lcnZhdGUoNTgpLCBQb3dlciBDaGFyZ2UoNjApLCBFdmFkZSBQaHlzaWNhbCg2MSksIEFic29yYiBGaXJlKDYyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlJlY292ZXJ5XCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0YXIsXG4gICAgICAgIG5hbWVfanA6IFwi44Ks44Or44O844OAXCIsXG4gICAgICAgIG5hbWU6IFwiR2FydWRhXCIsXG4gICAgICAgIGxldmVsOiA1NyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlJmXCIsXG4gICAgICAgICAgICBsaWdodDogXCJSZlwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYXJhbWEsIEdhcnVkeW5lLCBBcnJvdyBSYWluLCBBbXJpdGEoNjApLCBIaWdoIENvdW50ZXIoNjEpLCBSZXBlbCBXaW5kKDYyKSwgQXV0by1TdWt1a2FqYSg2MylcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW4sIE1hZ2F0c3UgSW5hYmFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Nb29uLFxuICAgICAgICBuYW1lX2pwOiBcIuOCueOCpOOCrVwiLFxuICAgICAgICBuYW1lOiBcIlN1aS1raVwiLFxuICAgICAgICBsZXZlbDogNTcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCdWZ1ZHluZSwgUG93ZXIgQ2hhcmdlLCBWaWNpb3VzIFN0cmlrZSwgUmVnZW5lcmF0ZSAyKDU5KSwgVGV0cmEgQnJlYWsoNjApLCBFbmR1cmluZyBTb3VsKDYyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJIZWF2ZW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdXN0aWNlLFxuICAgICAgICBuYW1lX2pwOiBcIuOCpuODquOCqOODq1wiLFxuICAgICAgICBuYW1lOiBcIlVyaWVsXCIsXG4gICAgICAgIGxldmVsOiA1OCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXJhZ2lvbiwgSGFtYW9uLCBIaWdoIENvdW50ZXIoNjApLCBBZ2lkeW5lKDYxKSwgRW5kdXJlIERhcmsoNjIpLCBGaXJlIEFtcCg2MyksIE51bGwgRGFyayg2NClcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvcnR1bmUsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44OK44Oz44K/XCIsXG4gICAgICAgIG5hbWU6IFwiQW5hbnRhXCIsXG4gICAgICAgIGxldmVsOiA1OCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWJ1ZnVsYSwgV2hpdGUgV2FsbCwgTWFyYWt1a2FqYSg1OSksIEJ1ZnVkeW5lKDYxKSwgR3JlZW4gV2FsbCg2MiksIEludmlnb3JhdGUgMyg2MyksIE51bGwgRXhoYXVzdCg2NClcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZWF0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjg5vjg6/jgqTjg4jjg6njgqTjg4Djg7xcIixcbiAgICAgICAgbmFtZTogXCJXaGl0ZSBSaWRlclwiLFxuICAgICAgICBsZXZlbDogNTgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNdWRvb24sIEhhbWFvbiwgQWdpZHluZSg2MCksIEV2YWRlIEljZSg2MiksIE1haGFtYW9uKDYzKSwgTWFtdWRvb24oNjUpLCBIYW1hIEJvb3N0KDY2KSwgTXVkbyBCb29zdCg2NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJEYXJrXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkFlb24sXG4gICAgICAgIG5hbWU6IFwiS2luZ3VcIixcbiAgICAgICAgbGV2ZWw6IDU4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LCAgICAgXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Qcmllc3Rlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44OP44Oq44OG44Kj44O8XCIsXG4gICAgICAgIG5hbWU6IFwiSGFyaXRpXCIsXG4gICAgICAgIGxldmVsOiA1OSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiRGlhcmFoYW4sIEJ1ZnVkeW5lLCBNYXJha3VrYWphLCBNZWRpYXJhaGFuKDYxKSwgQXJyb3cgUmFpbig2MiksIFNhbWFyZWNhcm0oNjQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBJbmFiYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1ZGdlbWVudCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg4zjg5PjgrlcIixcbiAgICAgICAgbmFtZTogXCJBbnViaXNcIixcbiAgICAgICAgbGV2ZWw6IDU5LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJIYW1hb24sIE1ha2FyYWthcm4sIE11ZG9vbiwgUG9pc29uIEFycm93KDYwKSwgTXVzdGFyZCBCb21iKDYxKSwgTWVnaWRvbGEoNjIpLCBNYWhhbWFvbig2NCksIEhhbWEgQm9vc3QoNjUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcHJlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44Oe44K244O844OP44O844Ot44OD44OIXCIsXG4gICAgICAgIG5hbWU6IFwiTW90aGVyIEhhcmxvdFwiLFxuICAgICAgICBsZXZlbDogNjAsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWF6aW9keW5lLCBNYW11ZG9vbiwgTXVkbyBCb29zdCg2MiksIEZvb2xpc2ggV2hpc3Blcig2MyksIFJlc2lzdCBGaXJlKDY0KSwgQWlsbWVudCBCb29zdCg2NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIkhlYXZlbiwgTWFnYXRzdSBNYW5kYWxhXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGllcm9waGFudCxcbiAgICAgICAgbmFtZV9qcDogXCLjgaDjgYTjgZ3jgYbjgZjjgofjgYZcIixcbiAgICAgICAgbmFtZTogXCJEYWlzb3Vqb3VcIixcbiAgICAgICAgbGV2ZWw6IDYwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJIYW1hb24sIERpYXJhaGFuLCBNYWthcmFrYXJuLCBBZ2lkeW5lKDYyKSwgRW5kdXJlIERhcmsoNjMpLCBNYWhhbWFvbig2NCksIEhhbWEgQm9vc3QoNjUpLCBTYW1zYXJhKDY3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkxpZ2h0XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRldmlsLFxuICAgICAgICBuYW1lX2pwOiBcIuODmeODq+ODleOCp+OCtOODvOODq1wiLFxuICAgICAgICBuYW1lOiBcIkJlbHBoZWdvclwiLFxuICAgICAgICBsZXZlbDogNjEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJEclwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYXppb2R5bmUsIEV2aWwgU21pbGUsIE1hcmFrdW5kYSg2MyksIEZlYXIgQm9vc3QoNjQpLCBPbGQgT25lKDY1KSwgRW5lcnZhdGUgQm9vc3QoNjYpLCBFbGVjIEFtcCg2NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgSW5hYmFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44K444Oj44K/44O844OmXCIsXG4gICAgICAgIG5hbWU6IFwiSmF0YXl1XCIsXG4gICAgICAgIGxldmVsOiA2MSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIkRyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiR2FydWR5bmUsIE51bGwgQ29uZnVzZSwgQW1yaXRhKDYyKSwgR3Jvd3RoIDMoNjQpLCBSZXBlbCBFbGVjKDY1KSwgTWFnYXJ1ZHluZSg2NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgSW5hYmFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5NYWdpY2lhbixcbiAgICAgICAgbmFtZV9qcDogXCLjgrjjg7NcIixcbiAgICAgICAgbmFtZTogXCJKaW5uXCIsXG4gICAgICAgIGxldmVsOiA2MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiRHJcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgRm9vbGlzaCBXaGlzcGVyLCBSZXNpc3QgUGh5c2ljYWwoNjUpLCBGaXJlIEJvb3N0KDY2KSwgTnVsbCBQaHlzaWNhbCg2NyksIFZhbGlhbnQgRGFuY2UoNjgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5UZW1wZXJhbmNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODk+ODo+ODg+OCs1wiLFxuICAgICAgICBuYW1lOiBcIkJ5YWtrb1wiLFxuICAgICAgICBsZXZlbDogNjIsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJCdWZ1ZHluZSwgRGVhdGhib3VuZCwgSGlnaCBDb3VudGVyLCBBdXRvLVN1a3VrYWphKDY0KSwgQW1yaXRhKDY2KSwgSWNlIEFtcCg2NyksIE1hYnVmdWR5bmUoNjgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgSW5hYmEsIE1hZ2F0c3UgTWFuZGFsYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRvd2VyLFxuICAgICAgICBuYW1lX2pwOiBcIuODnuODvOODqVwiLFxuICAgICAgICBuYW1lOiBcIk1hcmFcIixcbiAgICAgICAgbGV2ZWw6IDYyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJEclwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCJXa1wiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lkeW5lLCBCbGlnaHQsIFBvd2VyIENoYXJnZSg2MyksIE1ha2FyYWthcm4oNjQpLCBBYnNvcmIgUGh5c2ljYWwoNjYpLCBGaXJlIEFtcCg2NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KZXN0ZXIsXG4gICAgICAgIG5hbWU6IFwiQ2hlcm5vYm9nXCIsXG4gICAgICAgIGxldmVsOiA2MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhlcm1pdCxcbiAgICAgICAgbmFtZV9qcDogXCLjg43jg5Pjg63jgrlcIixcbiAgICAgICAgbmFtZTogXCJOZWJpcm9zXCIsXG4gICAgICAgIGxldmVsOiA2MyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYW11ZG9vbiwgQWdpZHluZSwgRGVrYWphLCBNaW5kIENoYXJnZSg2NSksIE11ZG8gQm9vc3QoNjcpLCBOdWxsIExpZ2h0KDY5KSwgU3BlbGwgTWFzdGVyKDcwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuOCuOODvOOCr+ODleODquODvOODiVwiLFxuICAgICAgICBuYW1lOiBcIlNpZWdmcmllZFwiLFxuICAgICAgICBsZXZlbDogNjMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJOdWxcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFrYXNoYSBBcnRzLCBQb3dlciBDaGFyZ2UsIE1hc3VrdWthamEsIEhpZ2ggQ291bnRlcig2NSksIFJlZ2VuZXJhdGUgMyg2NiksIFJhaW55IERlYXRoKDY4KSwgR29kJ3MgSGFuZCg3MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkZvb2wsXG4gICAgICAgIG5hbWVfanA6IFwi44Ot44KtXCIsXG4gICAgICAgIG5hbWU6IFwiTG9raVwiLFxuICAgICAgICBsZXZlbDogNjQsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQnVmdWR5bmUsIFJha3VrYWphLCBTaGFycCBTdHVkZW50LCBJY2UgQW1wKDY2KSwgSGlnaCBDb3VudGVyKDY3KSwgTWFidWZ1ZHluZSg2OCksIE51bGwgRmlyZSg2OSksIE5pZmxoZWltKDcwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkljZVwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Mb3ZlcnMsXG4gICAgICAgIG5hbWVfanA6IFwi44Kt44Ol44OZ44OsXCIsXG4gICAgICAgIG5hbWU6IFwiQ3liZWxlXCIsXG4gICAgICAgIGxldmVsOiA2NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWVkaWFyYW1hLCBWaWNpb3VzIFN0cmlrZSwgUmVjYXJtLCBNeXJpYWQgQXJyb3dzKDY3KSwgU2FtYXJlY2FybSg2OCksIE1lZGlhcmFoYW4oNzApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcGVyb3IsXG4gICAgICAgIG5hbWVfanA6IFwi44OQ44Ot44OzXCIsXG4gICAgICAgIG5hbWU6IFwiQmFyb25nXCIsXG4gICAgICAgIGxldmVsOiA2NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppb2R5bmUsIFBvaXNvbiBNaXN0LCBNZSBQYXRyYSwgTWFyYWt1a2FqYSg2NyksIEludmlnb3JhdGUgMig2OSksIEhpZ2ggQ291bnRlcig3MSksIE1hemlvZHluZSg3MilcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkNoYXJpb3QsXG4gICAgICAgIG5hbWVfanA6IFwi44OI44O844OrXCIsXG4gICAgICAgIG5hbWU6IFwiVGhvclwiLFxuICAgICAgICBsZXZlbDogNjUsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIkRyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiWmlvZHluZSwgRGVhdGhib3VuZCwgSGlnaCBDb3VudGVyLCBBcm1zIE1hc3Rlcig2NyksIE1hemlvZHluZSg2OCksIE51bGwgUGh5c2ljYWwoNjkpLCBUaHVuZGVyIFJlaWduKDcwKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBNYW5kYWxhXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9ydHVuZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg4jjg63jg53jgrlcIixcbiAgICAgICAgbmFtZTogXCJBdHJvcG9zXCIsXG4gICAgICAgIGxldmVsOiA2NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIk51bFwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnVkeW5lLCBXaW5kIEJvb3N0LCBNaW5kIENoYXJnZSg2NyksIE1hZ2FydWR5bmUoNjgpLCBFdmFkZSBGaXJlKDY5KSwgV2luZCBBbXAoNzApXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuQWVvbixcbiAgICAgICAgbmFtZTogXCJMYWtzbWlcIixcbiAgICAgICAgbGV2ZWw6IDY1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LCAgICAgXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdXN0aWNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODoeODq+OCreOCu+ODh+OCr1wiLFxuICAgICAgICBuYW1lOiBcIk1lbGNoaXplZGVrXCIsXG4gICAgICAgIGxldmVsOiA2NixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZGlhcmFoYW4sIEhhbWFvbiwgQWthc2hhIEFydHMsIE1hdGFydWthamEoNjgpLCBNYWhhbWFvbig2OSksIEdvZCdzIEhhbmQoNzIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBNYW5kYWxhXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGFuZ2VkTWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODmOODq+OCuuOCqOODs+OCuOOCp+ODq1wiLFxuICAgICAgICBuYW1lOiBcIkhlbGwgQmlrZXJcIixcbiAgICAgICAgbGV2ZWw6IDY2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJSZlwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lkeW5lLCBBZW9uIFJhaW4sIEVuZHVyZSg2OCksIE11ZG9vbig2OSksIE1hcmFnaWR5bmUoNzApLCBBYnNvcmIgRmlyZSg3MSksIEZpcmUgQW1wKDczKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBNYW5kYWxhLCBZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3RhcixcbiAgICAgICAgbmFtZV9qcDogXCLjgqvjg6vjg4bjgqPjgrHjg7zjg6RcIixcbiAgICAgICAgbmFtZTogXCJLYXJ0aWtleWFcIixcbiAgICAgICAgbGV2ZWw6IDY3LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiUmZcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hemlvZHluZSwgQXV0by1NYXRhcnUsIEhpZ2ggQ291bnRlcig2OCksIE15cmlhZCBBcnJvd3MoNjkpLCBHcm93dGggMig3MCksIFByaW1hbCBGb3JjZSg3NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIk1hZ2F0c3UgTWFuZGFsYSwgWW9tb3RzdSBIaXJhc2FrYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1ZGdlbWVudCxcbiAgICAgICAgbmFtZV9qcDogXCLjg4jjg6njg7Pjg5rjg4Pjgr/jg7xcIixcbiAgICAgICAgbmFtZTogXCJUcnVtcGV0ZXJcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIk1hdGFkb3JcIiwgXCJXaGl0ZSBSaWRlclwiLCBcIkRhaXNvdWpvdVwiLCBcIlRhbyBUaWVcIiwgXCJQYWJpbHNhZ1wiLCBcIlRhb3d1XCJdLFxuICAgICAgICBsZXZlbDogNjcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJEclwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiUmZcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiUmZcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZ2lkb2xhLCBaaW9keW5lLCBFbGVjIEFtcCwgTWFzdWt1a2FqYSg2OCksIENvb2wgQnJlZXplKDY5KSwgTWVnaWRvbGFvbig3MCksIERlYmlsaXRhdGUoNzMpLCBIZWF0IFJpc2VyKDc0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkFsbWlnaHR5XCIsXG4gICAgICAgIG5vdGVzOiBcIkhpcmFueWEgU3ByZWFkXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRGV2aWwsXG4gICAgICAgIG5hbWVfanA6IFwi44OZ44Oq44Ki44OrXCIsXG4gICAgICAgIG5hbWU6IFwiQmVsaWFsXCIsXG4gICAgICAgIGxldmVsOiA2OCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJSZlwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNdWRvb24sIE15cmlhZCBBcnJvd3MsIEFnaWR5bmUoNjkpLCBFbmR1cmUgTGlnaHQoNzEpLCBGaXJlIEFtcCg3MiksIE1hcmFnaWR5bmUoNzMpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRGFya1wiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGEsIFlvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Nb29uLFxuICAgICAgICBuYW1lX2pwOiBcIuOCu+ODiFwiLFxuICAgICAgICBuYW1lOiBcIlNldGhcIixcbiAgICAgICAgbGV2ZWw6IDY4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiUmZcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIldrXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWdhcnVkeW5lLCBHYXJ1ZHluZSwgV2luZCBCcmVhayg3MSksIE51bGwgTGlnaHQoNzIpLCBXaW5kIEFtcCg3MyksIEV2YWRlIEVsZWMoNzQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGFcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Ob44Or44K5XCIsXG4gICAgICAgIG5hbWU6IFwiSG9ydXNcIixcbiAgICAgICAgbGV2ZWw6IDY4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJSZlwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkRpYXJhaGFuLCBNYWhhbWFvbiwgTWFnYXJ1ZHluZSwgV2luZCBBbXAoNzApLCBNYXRhcnVrYWphKDcxKSwgQWJzb3JiIFdpbmQoNzMpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiTWFnYXRzdSBNYW5kYWxhLCBZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSmVzdGVyLFxuICAgICAgICBuYW1lOiBcIlNlaXRlbiBUYWlzZWlcIixcbiAgICAgICAgbGV2ZWw6IDY4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTWFnaWNpYW4sXG4gICAgICAgIG5hbWVfanA6IFwi44K544Or44OIXCIsXG4gICAgICAgIG5hbWU6IFwiU3VydFwiLFxuICAgICAgICBsZXZlbDogNjksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlJmXCIsXG4gICAgICAgICAgICBpY2U6IFwiV2tcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgRGVhdGhib3VuZCwgSGlnaCBDb3VudGVyLCBNYXJhZ2lkeW5lKDcxKSwgUmFnbmFyb2soNzQpLCBGaXJlIEFtcCg3NSksIE51bGwgSWNlKDc2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiWW9tb3RzdSBIaXJhc2FrYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRlbXBlcmFuY2UsXG4gICAgICAgIG5hbWVfanA6IFwi44Om44Or44Oz44KwXCIsXG4gICAgICAgIG5hbWU6IFwiWXVybHVuZ3VyXCIsXG4gICAgICAgIGxldmVsOiA2OSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJEclwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJTdHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJWaXJ1cyBXYXZlLCBCdWZ1ZHluZSwgR3Jvd3RoIDMoNzEpLCBNZWRpYXJhaGFuKDcyKSwgU2FtYXJlY2FybSg3NCksIFJlcGVsIExpZ2h0KDc1KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkJhZCBTdGF0XCIsXG4gICAgICAgIG5vdGVzOiBcIllvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Ub3dlcixcbiAgICAgICAgbmFtZV9qcDogXCLjg57jgrXjgqvjg4lcIixcbiAgICAgICAgbmFtZTogXCJNYXNha2Fkb1wiLFxuICAgICAgICBsZXZlbDogNjksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJOdWxcIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWhhbWFvbiwgVGVtcGVzdCBTbGFzaCwgTXlyaWFkIEFycm93cyg3MSksIEhhbWEgQm9vc3QoNzMpLCBBcm1zIE1hc3Rlcig3NCksIEVuZHVyaW5nIFNvdWwoNzYpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiTGlnaHRcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlByaWVzdGVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjg4TjgqPjg4TjgqPjg5/jg4jjg6tcIixcbiAgICAgICAgbmFtZTogXCJUeml0emltaXRsXCIsXG4gICAgICAgIGxldmVsOiA3MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9keW5lLCBWaXJ1cyBXYXZlLCBNdXN0YXJkIEJvbWIsIFNpbGVuY2UgQm9vc3QoNzEpLCBEZWthamEoNzIpLCBSZWdlbmVyYXRlIDMoNzMpLCBNYXppb2R5bmUoNzYpLCBSZXBlbCBFbGVjKDc3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiWW9tb3RzdSBIaXJhc2FrYVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkVtcHJlc3MsXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44Oq44Op44OIXCIsXG4gICAgICAgIG5hbWU6IFwiQWxpbGF0XCIsXG4gICAgICAgIGxldmVsOiA3MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1ha2FyYWthcm4sIE1hYnVmdWR5bmUsIFJlZ2VuZXJhdGUgMyg3MiksIEV2YWRlIFBoeXNpY2FsKDczKSwgR3Jvd3RoIDIoNzQpLCBBdXRvLU1hcmFrdSg3NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJTdXBwb3J0XCIsXG4gICAgICAgIG5vdGVzOiBcIllvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5IaWVyb3BoYW50LFxuICAgICAgICBuYW1lX2pwOiBcIuODj+ODgeODnuODs1wiLFxuICAgICAgICBuYW1lOiBcIkhhY2hpbWFuXCIsXG4gICAgICAgIGxldmVsOiA3MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIk51bFwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiTnVsXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiV2tcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWF6aW9keW5lLCBNYWthcmFrYXJuLCBNYXRhcnVrYWphLCBFbGVjIEJyZWFrKDcyKSwgRGVrdW5kYSg3NCksIFJldm9sdXRpb24oNzUpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRWxlY1wiLFxuICAgICAgICBub3RlczogXCJNYWdhdHN1IE1hbmRhbGEsIFlvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Mb3ZlcnMsXG4gICAgICAgIG5hbWVfanA6IFwi44Kk44K344Ol44K/44OrXCIsXG4gICAgICAgIG5hbWU6IFwiSXNodGFyXCIsXG4gICAgICAgIGxldmVsOiA3MSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZGlhcmFoYW4sIFNhbWFyZWNhcm0sIE11dHVkaSwgTWF6aW9keW5lKDcyKSwgQW1yaXRhKDc1KSwgU3BlbGwgTWFzdGVyKDc2KSwgQWJzb3JiIFdpbmQoNzcpLCBTYWx2YXRpb24oNzgpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiUmVjb3ZlcnlcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGFuZ2VkTWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODtOOCoeOCueOCrVwiLFxuICAgICAgICBuYW1lOiBcIlZhc3VraVwiLFxuICAgICAgICBsZXZlbDogNzEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkhhbWFvbiwgVmlydXMgV2F2ZSwgTnVsbCBQb2lzb24oNzMpLCBIaWdoIENvdW50ZXIoNzQpLCBFdmFkZSBXaW5kKDc1KSwgTWFoYW1hb24oNzYpLCBaaW9keW5lKDc3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkxpZ2h0XCIsXG4gICAgICAgIG5vdGVzOiBcIllvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuOCouOCv+ODkOOCr1wiLFxuICAgICAgICBuYW1lOiBcIkF0YXZha2FcIixcbiAgICAgICAgbGV2ZWw6IDcyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiTnVsXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWhhbWFvbiwgRGlhcmFoYW4sIEFtcml0YSwgQnJhdmUgQmxhZGUoNzYpLCBNZWdpZG9sYW9uKDc3KSwgTWluZCBDaGFyZ2UoNzgpLCBBcm1zIE1hc3Rlcig4MSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRm9ydHVuZSxcbiAgICAgICAgbmFtZV9qcDogXCLjg47jg6vjg7NcIixcbiAgICAgICAgbmFtZTogXCJOb3JuXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJBdHJvcG9zXCIsIFwiTGFjaGVzaXNcIiwgXCJDbG90aG9cIl0sXG4gICAgICAgIGxldmVsOiA3MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlN0clwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiV2tcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiRHJcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWdhcnVkeW5lLCBHYXJ1ZHluZSwgRGlhcmFoYW4sIEF1dG8tTWFzdWt1KDc0KSwgSW52aWdvcmF0ZSAzKDc1KSwgV2luZCBBbXAoNzYpLCBJbnN0YS1IZWFsKDc3KSwgRGViaWxpdGF0ZSg3OSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJXaW5kXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRlYXRoLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODquOCuVwiLFxuICAgICAgICBuYW1lOiBcIkFsaWNlXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJOZWJpcm9zXCIsXCJCZWxpYWxcIl0sXG4gICAgICAgIGxldmVsOiA3MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiUmZcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFtdWRvb24sIE11ZG8gQm9vc3QsIERla3VuZGEsIEVuZHVyZSBMaWdodCg3NSksIE1lZ2lkb2xhKDc2KSwgTWluZCBDaGFyZ2UoNzcpLCBEaWUgZm9yIE1lISg3OSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJEYXJrXCIsXG4gICAgICAgIG5vdGVzOiBcIlNwZWNpYWwgRnVzaW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVkZ2VtZW50LFxuICAgICAgICBuYW1lX2pwOiBcIuODn+OCq+OCqOODq1wiLFxuICAgICAgICBuYW1lOiBcIk1pY2hhZWxcIixcbiAgICAgICAgbGV2ZWw6IDcyLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiU3RyXCIsXG4gICAgICAgICAgICBmaXJlOiBcIk51bFwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlZvcnBhbCBCbGFkZSwgTWVnaWRvbGEsIEhhbWFvbiwgTWVnaWRvbGFvbig3NCksIE1haGFtYW9uKDc1KSwgUmVwZWwgRGFyayg3NiksIEhlYXZlbidzIEJsYWRlKDc5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiLVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkhlcm1pdCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg6njg4/jg5Djgq1cIixcbiAgICAgICAgbmFtZTogXCJBcmFoYWJha2lcIixcbiAgICAgICAgbGV2ZWw6IDczLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiUmZcIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlZpY2lvdXMgU3RyaWtlLCBBdXRvLU1hcmFrdSwgTnVsbCBGZWFyLCBBbGVydG5lc3MoNzQpLCBUZXRyYWthcm4oNzYpLCBSZXBlbCBQaHlzaWNhbCg4MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIllvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5UZW1wZXJhbmNlLFxuICAgICAgICBuYW1lX2pwOiBcIuODtOOCo+OCt+ODpeODjFwiLFxuICAgICAgICBuYW1lOiBcIlZpc2hudVwiLFxuICAgICAgICBsZXZlbDogNzMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZ2lkb2xhb24sIEFrYXNoYSBBcnRzLCBNYWJ1ZnVkeW5lLCBSZWdlbmVyYXRlIDMoNzUpLCBHb2QncyBIYW5kKDc2KSwgUG93ZXIgQ2hhcmdlKDc4KSwgQW5nZWxpYyBHcmFjZSg3OSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJBbG1pZ2h0eVwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5FbXBlcm9yLFxuICAgICAgICBuYW1lX2pwOiBcIuOCquODvOODh+OCo+ODs1wiLFxuICAgICAgICBuYW1lOiBcIk9kaW5cIixcbiAgICAgICAgbGV2ZWw6IDc0LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJXa1wiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJEclwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlppb2R5bmUsIE1hZ2FydWR5bmUsIFdpbmQgQW1wKDc2KSwgUmVnZW5lcmF0ZSAzKDc3KSwgTWF6aW9keW5lKDc4KSwgTWluZCBDaGFyZ2UoODApLCBQYW50YSBSaGVpKDgxKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVzdGljZSxcbiAgICAgICAgbmFtZV9qcDogXCLjgrnjg6njgqrjgrfjg6NcIixcbiAgICAgICAgbmFtZTogXCJTcmFvc2hhXCIsXG4gICAgICAgIGxldmVsOiA3NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIkRyXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIlJmXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1haGFtYW9uLCBCcmF2ZSBCbGFkZSwgUG93ZXIgQ2hhcmdlLCBaaW9keW5lKDc2KSwgSGFtYSBCb29zdCg3OCksIE1lZ2lkb2xhb24oODApLCBBbmdlbGljIEdyYWNlKDgxKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkxpZ2h0XCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkFlb24sXG4gICAgICAgIG5hbWU6IFwiS2FndXlhXCIsXG4gICAgICAgIGxldmVsOiA3NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIlN0clwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJcIixcbiAgICAgICAgaW5oZXJpdDogXCJcIixcbiAgICAgICAgbm90ZXM6IFwiXCJcbiAgICB9LCAgICBcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRvd2VyLFxuICAgICAgICBuYW1lX2pwOiBcIuODqOOCt+ODhOODjVwiLFxuICAgICAgICBuYW1lOiBcIllvc2hpdHN1bmVcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIk1hc2FrYWRvXCIsIFwiU2hpa2ktT3VqaVwiLCBcIk91a3VuaW51c2hpXCIsIFwiSGFjaGltYW5cIiwgXCJIaXRva290by1OdXNoaVwiXSxcbiAgICAgICAgbGV2ZWw6IDc1LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiTnVsXCIsXG4gICAgICAgICAgICBmaXJlOiBcIlN0clwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIlJmXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQnJhdmUgQmxhZGUsIFBvd2VyIENoYXJnZSwgWmlvZHluZSwgSGVhdCBSaXNlcig3NyksIFJlcGVsIEVsZWMoNzgpLCBFbGVjIEFtcCg3OSksIEhhc3NvdSBUb2JpKDgzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiU3RhciBTcHJlYWRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdGFyLFxuICAgICAgICBuYW1lX2pwOiBcIuOCteODiOOCpeODq+ODjOOCuVwiLFxuICAgICAgICBuYW1lOiBcIlNhdHVybnVzXCIsXG4gICAgICAgIGxldmVsOiA3NSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiRHJcIixcbiAgICAgICAgICAgIGljZTogXCJXa1wiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJOdWxcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lkeW5lLCBNYXJhZ2lkeW5lLCBGaXJlIEFtcCwgRXZhZGUgSWNlKDc3KSwgR3Jvd3RoIDMoNzkpLCBTcGVsbCBNYXN0ZXIoODEpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGllcm9waGFudCxcbiAgICAgICAgbmFtZV9qcDogXCLjgrPjgqbjg6rjg6XjgqZcIixcbiAgICAgICAgbmFtZTogXCJLb2hyeXVcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIkdlbmJ1XCIsXCJTZWlyeXVcIixcIlN1emFrdVwiLFwiQnlha2tvXCJdLFxuICAgICAgICBsZXZlbDogNzYsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJSZlwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJOdWxcIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9keW5lLCBNZWRpYXJhaGFuLCBTYW1hcmVjYXJtLCBNYXppb2R5bmUoNzgpLCBNaW5kIENoYXJnZSg3OSksIEVsZWMgQW1wKDgwKSwgU3BlbGwgTWFzdGVyKDgyKSwgU2FsdmF0aW9uKDgzKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkVsZWNcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVkZ2VtZW50LFxuICAgICAgICBuYW1lX2pwOiBcIuOCteOCv+ODs1wiLFxuICAgICAgICBuYW1lOiBcIlNhdGFuXCIsXG4gICAgICAgIGxldmVsOiA3NixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIldrXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlJmXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1lZ2lkb2xhb24sIE1hcmFnaW9uLCBSZWdlbmVyYXRlIDMoNzcpLCBJbnZpZ29yYXRlIDMoNzgpLCBFbmR1cmUgTGlnaHQoODApLCBCbGFjayBWaXBlcig4MSksIE51bGwgV2luZCg4MilcIixcbiAgICAgICAgaW5oZXJpdDogXCJBbG1pZ2h0eVwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjg5DjgqLjg6vjg7vjgrzjg5bjg6tcIixcbiAgICAgICAgbmFtZTogXCJCYWFsIFplYnVsXCIsXG4gICAgICAgIGxldmVsOiA3NyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiV2tcIixcbiAgICAgICAgICAgIGljZTogXCJEclwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWJ1ZnVkeW5lLCBNYW11ZG9vbiwgT2xkIE9uZSwgVGVudGFyYWZvbyg3OCksIE1hemlvZHluZSg3OSksIE11ZG8gQm9vc3QoODApLCBTdGFnbmFudCBBaXIoODIpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIllvbW90c3UgSGlyYXNha2FcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44K544OR44Or44OKXCIsXG4gICAgICAgIG5hbWU6IFwiU3VwYXJuYVwiLFxuICAgICAgICBsZXZlbDogNzcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCJEclwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkdhcnVkeW5lLCBNYWthamFtLCBFdmFkZSBJY2UoNzkpLCBXaW5kIEFtcCg4MCksIE1hZ2FydWR5bmUoODEpLCBFdmFkZSBGaXJlKDgyKSwgRWxlYyBBbXAoODMpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiV2luZFwiLFxuICAgICAgICBub3RlczogXCJZb21vdHN1IEhpcmFzYWthXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSmVzdGVyLFxuICAgICAgICBuYW1lOiBcIk1hZ2F0c3UtSXphbmFnaVwiLFxuICAgICAgICBsZXZlbDogNzcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIi1cIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiXCIsXG4gICAgICAgIG5vdGVzOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLk1hZ2ljaWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuODnuODgFwiLFxuICAgICAgICBuYW1lOiBcIk1hZGFcIixcbiAgICAgICAgbGV2ZWw6IDc4LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJEclwiLFxuICAgICAgICAgICAgaWNlOiBcIldrXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCItXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lkeW5lLCBGaXJlIEJvb3N0LCBGb29saXNoIFdoaXNwZXIsIE1hcmFnaWR5bmUoODEpLCBFdmFkZSBJY2UoODIpLCBBaWxtZW50IEJvb3N0KDgzKSwgRmlyZSBBbXAoODQpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiRmlyZVwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5EZWF0aCxcbiAgICAgICAgbmFtZV9qcDogXCLjg57jg4/jgqvjg7zjg6lcIixcbiAgICAgICAgbmFtZTogXCJNYWhha2FsYVwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiTWF0YWRvclwiLFwiV2hpdGUgUmlkZXJcIixcIk1vdGhlciBIYXJsb3RcIixcIkRhaXNvdWpvdVwiLFwiSGVsbCBCaWtlclwiLFwiVHJ1bXBldGVyXCJdLFxuICAgICAgICBsZXZlbDogNzgsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIkRyXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiUmZcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJOdWxcIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiQWdpZHluZSwgTXlyaWFkIEFycm93cywgUG93ZXIgQ2hhcmdlLCBNaW5kIENoYXJnZSg4MCksIE1hcmFnaWR5bmUoODIpLCBNYW11ZG9vbig4MyksIEZpcmUgQW1wKDg0KSwgTXVkbyBCb29zdCg4NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlByaWVzdGVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjgrnjgqvjgqLjg49cIixcbiAgICAgICAgbmFtZTogXCJTY2F0aGFjaFwiLFxuICAgICAgICBsZXZlbDogNzksXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCItXCIsXG4gICAgICAgICAgICBmaXJlOiBcIldrXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFidWZ1ZHluZSwgR2FydWR5bmUsIEFtcml0YSg4MSksIE1hZ2FydWR5bmUoODIpLCBJY2UgQW1wKDgzKSwgV2luZCBBbXAoODQpLCBNaW5kIENoYXJnZSg4NSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJJY2VcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuRW1wcmVzcyxcbiAgICAgICAgbmFtZV9qcDogXCLjgqTjgrfjgrlcIixcbiAgICAgICAgbmFtZTogXCJJc2lzXCIsXG4gICAgICAgIGxldmVsOiA3OSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIlJmXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWVkaWFyYWhhbiwgQnVmdWR5bmUsIFRldHJha2FybiwgQ29vbCBCcmVlemUoODApLCBBYnNvcmIgSWNlKDgyKSwgTWFidWZ1ZHluZSg4MyksIFNhbHZhdGlvbig4NSksIE51bGwgRWxlYyg4NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJSZWNvdmVyeVwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5DaGFyaW90LFxuICAgICAgICBuYW1lX2pwOiBcIuODleODhOODjOOCt1wiLFxuICAgICAgICBuYW1lOiBcIkZ1dHN1bnVzaGlcIixcbiAgICAgICAgZnVzaW9uUmVjaXBlTmFtZXM6IFtcIkFyZXNcIixcIlRyaWdsYXZcIixcIktpbi1raVwiLFwiQXRhdmFrYVwiLFwiTmVrbyBTaG9ndW5cIl0sXG4gICAgICAgIGxldmVsOiA4MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIk51bFwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIldrXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlByaW1hbCBGb3JjZSwgUG93ZXIgQ2hhcmdlLCBNYXRhcnVrYWphLCBBcHQgUHVwaWwoODIpLCBOdWxsIERpenp5KDgzKSwgQWxpIERhbmNlKDg0KSwgQXJtcyBNYXN0ZXIoODUpLCBGaXJtIFN0YW5jZSg4NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJQaHlzXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlRvd2VyLFxuICAgICAgICBuYW1lX2pwOiBcIuOCt+ODtOOCoVwiLFxuICAgICAgICBuYW1lOiBcIlNoaXZhXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJSYW5nZGFcIixcIkJhcm9uZ1wiXSxcbiAgICAgICAgbGV2ZWw6IDgwLFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiRHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIi1cIixcbiAgICAgICAgICAgIGRhcms6IFwiLVwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJaaW9keW5lLCBNYWdhcnVkeW5lLCBFbmR1cmluZyBTb3VsLCBNYXppb2R5bmUoODIpLCBTcGVsbCBNYXN0ZXIoODMpLCBNZWdpZG9sYW9uKDg0KSwgUHJhbGF5YSg4NylcIixcbiAgICAgICAgaW5oZXJpdDogXCJFbGVjXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkRldmlsLFxuICAgICAgICBuYW1lX2pwOiBcIuODmeODq+OCvOODluODllwiLFxuICAgICAgICBuYW1lOiBcIkJlZWx6ZWJ1YlwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiQmVsaWFsXCIsIFwiQmVscGhlZ29yXCIsIFwiQmFhbCBaZWJ1bFwiLCBcIlNldGhcIiwgXCJNb3RcIiwgXCJQYXp1enVcIl0sXG4gICAgICAgIGxldmVsOiA4MSxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiRHJcIixcbiAgICAgICAgICAgIGljZTogXCJOdWxcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIlJmXCIsXG4gICAgICAgICAgICB3aW5kOiBcIi1cIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIldrXCIsXG4gICAgICAgICAgICBkYXJrOiBcIlJmXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkFnaWR5bmUsIE1hYnVmdWR5bmUsIE1pbmQgQ2hhcmdlLCBQcmltYWwgRm9yY2UoODMpLCBNYW11ZG9vbig4NCksIEVuZHVyZSBMaWdodCg4NSksIE11ZG8gQm9vc3QoODYpLCBNZWdpZG9sYW9uKDg3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGVybWl0LFxuICAgICAgICBuYW1lX2pwOiBcIuOCquODs+OCruODp+OCpuOCrVwiLFxuICAgICAgICBuYW1lOiBcIk9uZ3lvLWtpXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJPbmlcIiwgXCJGdXUta2lcIiwgXCJLaW4ta2lcIiwgXCJTdWkta2lcIl0sXG4gICAgICAgIGxldmVsOiA4MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIk51bFwiLFxuICAgICAgICAgICAgd2luZDogXCJEclwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkZvb2xpc2ggV2hpc3BlciwgWmlvZHluZSwgTWFzdWt1a2FqYSwgQWlsbWVudCBCb29zdCg4NCksIEVsZWMgQW1wKDg1KSwgUmV2b2x1dGlvbig4NiksIEZpcm0gU3RhbmNlKDg3KVwiLFxuICAgICAgICBpbmhlcml0OiBcIlBoeXNcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSGFuZ2VkTWFuLFxuICAgICAgICBuYW1lX2pwOiBcIuOCouODhuOCo+OCuVwiLFxuICAgICAgICBuYW1lOiBcIkF0dGlzXCIsXG4gICAgICAgIGxldmVsOiA4MixcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJSZlwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJBZ2lkeW5lLCBBbXJpdGEsIE1hcmFrdWthamEsIEVuZHVyaW5nIFNvdWwoODQpLCBTYW1hcmVjYXJtKDg2KSwgTWFyYWdpZHluZSg4NyksIE1hbXVkb29uKDg4KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuSnVkZ2VtZW50LFxuICAgICAgICBuYW1lX2pwOiBcIuODoeOCv+ODiOODreODs1wiLFxuICAgICAgICBuYW1lOiBcIk1ldGF0cm9uXCIsXG4gICAgICAgIGxldmVsOiA4MyxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCJSZlwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWhhbWFvbiwgSGVhdmVuJ3MgQmxhZGUsIE1lZ2lkb2xhb24oODYpLCBSZXBlbCBJY2UoODcpLCBSZXBlbCBFbGVjKDg4KSwgUmVwZWwgRmlyZSg4OSlcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCItXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuTW9vbixcbiAgICAgICAgbmFtZV9qcDogXCLjgrXjg7Pjg4Djg6vjg5Xjgqnjg7NcIixcbiAgICAgICAgbmFtZTogXCJTYW5kYWxwaG9uXCIsXG4gICAgICAgIGxldmVsOiA4NCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBsaWdodDogXCJSZlwiLFxuICAgICAgICAgICAgZGFyazogXCJXa1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNYWhhbWFvbiwgU2FtYXJlY2FybSwgQW1yaXRhLCBBbmdlbGljIEdyYWNlKDg3KSwgQWduZXlhc3RyYSg4OCksIEVuZHVyZSBEYXJrKDg5KSwgUmVwZWwgRGFyayg5MClcIixcbiAgICAgICAgaW5oZXJpdDogXCJMaWdodFwiLFxuICAgICAgICBub3RlczogXCJVbmxvY2tlZCBieSBtYXhpbmcgc29jaWFsIGxpbmtcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5TdW4sXG4gICAgICAgIG5hbWVfanA6IFwi44Ki44K544Op44GK44GGXCIsXG4gICAgICAgIG5hbWU6IFwiQXN1cmFcIixcbiAgICAgICAgbGV2ZWw6IDg2LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgcGh5c2ljYWw6IFwiLVwiLFxuICAgICAgICAgICAgZmlyZTogXCJOdWxcIixcbiAgICAgICAgICAgIGljZTogXCJTdHJcIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiV2tcIixcbiAgICAgICAgICAgIGxpZ2h0OiBcIk51bFwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIk1hcmFnaWR5bmUsIFByaW1hbCBGb3JjZSwgTWFyYWt1a2FqYSwgTWFoYW1hb24oODgpLCBIaWdoIENvdW50ZXIoODkpLCBTcGVsbCBNYXN0ZXIoOTApLCBVbnNoYWtlbiBXaWxsKDkyKVwiLFxuICAgICAgICBpbmhlcml0OiBcIkZpcmVcIixcbiAgICAgICAgbm90ZXM6IFwiVW5sb2NrZWQgYnkgbWF4aW5nIHNvY2lhbCBsaW5rXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYXJjYW5hOiBBcmNhbmEuU3RhcixcbiAgICAgICAgbmFtZV9qcDogXCLjg6vjgrfjg5Xjgqfjg6tcIixcbiAgICAgICAgbmFtZTogXCJIZWxlbFwiLFxuICAgICAgICBsZXZlbDogODcsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiTnVsXCIsXG4gICAgICAgICAgICBpY2U6IFwiLVwiLFxuICAgICAgICAgICAgZWxlY3RyaWM6IFwiLVwiLFxuICAgICAgICAgICAgd2luZDogXCJXa1wiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiTnVsXCIsXG4gICAgICAgICAgICBkYXJrOiBcIk51bFwiXG4gICAgICAgIH0sXG4gICAgICAgIHNraWxsczogXCJNZWdpZG9sYW9uLCBNYXJhZ2lkeW5lLCBHb2QncyBIYW5kLCBTYWx2YXRpb24oODgpLCBJbnN0YS1IZWFsKDkwKSwgUmVwZWwgV2luZCg5MSksIEFybXMgTWFzdGVyKDkyKSwgTW9ybmluZyBTdGFyKDk0KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkFsbWlnaHR5XCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLlN0cmVuZ3RoLFxuICAgICAgICBuYW1lX2pwOiBcIuOCtuOCquOCpuOCtOODs+OCsuODs1wiLFxuICAgICAgICBuYW1lOiBcIlphb3UgR29uZ2VuXCIsXG4gICAgICAgIGxldmVsOiA5MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIi1cIixcbiAgICAgICAgICAgIGZpcmU6IFwiUmZcIixcbiAgICAgICAgICAgIGljZTogXCItXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJXa1wiLFxuICAgICAgICAgICAgd2luZDogXCItXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWFyYWdpZHluZSwgUG93ZXIgQ2hhcmdlLCBHb2QncyBIYW5kLCBBbmltYSBGcmVlemUoOTIpLCBFdmFkZSBQaHlzaWNhbCg5MyksIEVuZHVyaW5nIFNvdWwoOTQpLCBGaXJlIEFtcCg5NSksIFZvcnBhbCBCbGFkZSg5NilcIixcbiAgICAgICAgaW5oZXJpdDogXCJGaXJlXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFyY2FuYTogQXJjYW5hLkp1ZGdlbWVudCxcbiAgICAgICAgbmFtZV9qcDogXCLjgqLjg6vjg4Djg7xcIixcbiAgICAgICAgbmFtZTogXCJBcmRoYVwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiUGFydmF0aVwiLFwiU2hpdmFcIl0sXG4gICAgICAgIGxldmVsOiA5MCxcbiAgICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgICAgIHBoeXNpY2FsOiBcIlN0clwiLFxuICAgICAgICAgICAgZmlyZTogXCItXCIsXG4gICAgICAgICAgICBpY2U6IFwiTnVsXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJOdWxcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiLVwiLFxuICAgICAgICAgICAgZGFyazogXCItXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIlByaW1hbCBGb3JjZSwgR29kJ3MgSGFuZCwgTWVnaWRvbGFvbig5MSksIE51bGwgRGl6enkoOTIpLCBBdXRvLVJha3VrYWphKDkzKSwgTWVkaWFyYWhhbig5NCksIEFuZ2VsaWMgR3JhY2UoOTUpLCBOdWxsIFBoeXNpY2FsKDk2KVwiLFxuICAgICAgICBpbmhlcml0OiBcIkFsbWlnaHR5XCIsXG4gICAgICAgIG5vdGVzOiBcIi1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5Xb3JsZCxcbiAgICAgICAgbmFtZV9qcDogXCLkvIrpgqrpgqPlspDlpKfnpZ5cIixcbiAgICAgICAgbmFtZTogXCJJemFuYWdpLW5vLU9rYW1pXCIsXG4gICAgICAgIGZ1c2lvblJlY2lwZU5hbWVzOiBbXCJJemFuYWdpXCIsIFwiU2FuZG1hblwiLCBcIk5hdGEgVGFpc2hpXCIsIFwiR2lyaW1laGthbGFcIiwgXCJOb3JuXCIsIFwiT3VrdW5pbnVzaGlcIiwgXCJPcnRocnVzXCIsIFwiS2FydGlrZXlhXCIsIFwiTWl0aHJhXCIsIFwiVHppdHppbWl0bFwiLCBcIkN1IENodWxhaW5uXCIsIFwiTGVnaW9uXCJdLFxuICAgICAgICBsZXZlbDogOTEsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiU3RyXCIsXG4gICAgICAgICAgICBpY2U6IFwiU3RyXCIsXG4gICAgICAgICAgICBlbGVjdHJpYzogXCJTdHJcIixcbiAgICAgICAgICAgIHdpbmQ6IFwiU3RyXCIsXG4gICAgICAgICAgICBsaWdodDogXCItXCIsXG4gICAgICAgICAgICBkYXJrOiBcIi1cIlxuICAgICAgICB9LFxuICAgICAgICBza2lsbHM6IFwiTWVnaWRvbGFvbiwgVmljdG9yeSBDcnksIEFuZ2VsaWMgR3JhY2UsIE1pbmQgQ2hhcmdlLCBBZ2lkeW5lKDkyKSwgQnVmdWR5bmUoOTMpLCBaaW9keW5lKDk0KSwgR2FydWR5bmUoOTUpLCBGaXJlIEFtcCg5NiksIEljZSBBbXAoOTcpLCBFbGVjIEFtcCg5OCksIFdpbmQgQW1wKDk5KVwiLFxuICAgICAgICBpbmhlcml0OiBcIk51bGxcIixcbiAgICAgICAgbm90ZXM6IFwiT25seSBpbiBOZXcgR2FtZSsgd2l0aCBkYXRhIGZyb20gVHJ1ZSBFbmRpbmdcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBhcmNhbmE6IEFyY2FuYS5KdWRnZW1lbnQsXG4gICAgICAgIG5hbWVfanA6IFwi44Or44K344OV44Kh44O8XCIsXG4gICAgICAgIG5hbWU6IFwiTHVjaWZlclwiLFxuICAgICAgICBmdXNpb25SZWNpcGVOYW1lczogW1wiQW5hbnRhXCIsXCJBbnViaXNcIixcIlRydW1wZXRlclwiLFwiTWljaGFlbFwiLFwiU2F0YW5cIixcIk1ldGF0cm9uXCJdLFxuICAgICAgICBsZXZlbDogOTMsXG4gICAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgICAgICBwaHlzaWNhbDogXCJTdHJcIixcbiAgICAgICAgICAgIGZpcmU6IFwiLVwiLFxuICAgICAgICAgICAgaWNlOiBcIi1cIixcbiAgICAgICAgICAgIGVsZWN0cmljOiBcIi1cIixcbiAgICAgICAgICAgIHdpbmQ6IFwiLVwiLFxuICAgICAgICAgICAgbGlnaHQ6IFwiV2tcIixcbiAgICAgICAgICAgIGRhcms6IFwiTnVsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2tpbGxzOiBcIkJ1ZnVkeW5lLCBCcmF2ZSBCbGFkZSwgTWluZCBDaGFyZ2UsIEljZSBBbXAoOTQpLCBTcGVsbCBNYXN0ZXIoOTUpLCBSZXBlbCBMaWdodCg5NiksIEFic29yYiBFbGVjKDk4KSwgVmljdG9yeSBDcnkoOTkpXCIsXG4gICAgICAgIGluaGVyaXQ6IFwiSWNlXCIsXG4gICAgICAgIG5vdGVzOiBcIlVubG9ja2VkIGJ5IG1heGluZyBzb2NpYWwgbGlua1wiXG4gICAgfV07XG5cbmZ1bmN0aW9uIGNvbXBhcmVQZXJzb25hKGEsIGIpIFxue1xuICAgIHZhciBsdmxEaWZmID0gYS5sZXZlbCAtIGIubGV2ZWw7XG4gICAgaWYoIGx2bERpZmYgIT0gMCApIHtcbiAgICAgICAgcmV0dXJuIGx2bERpZmY7XG4gICAgfVxuICAgIHJldHVybiBhLmFyY2FuYSAtIGIuYXJjYW5hO1xufVxuXG52YXIgcGVyc29uYUJ5QXJjYW5hID0gW107XG52YXIgcGVyc29uYUJ5TmFtZSA9IHt9O1xuZm9yICh2YXIgaSA9IDA7IGkgPCBBcmNhbmEuQ291bnQ7IGkrKykge1xuICAgIHBlcnNvbmFCeUFyY2FuYS5wdXNoKFtdKTtcbn07XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgcGVyc29uYUJ5THZsLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBlcnNvbmEgPSBwZXJzb25hQnlMdmxbaV07XG4gICAgcGVyc29uYUJ5QXJjYW5hW3BlcnNvbmEuYXJjYW5hXS5wdXNoKHBlcnNvbmEpO1xuICAgIHBlcnNvbmFCeU5hbWVbcGVyc29uYS5uYW1lXSA9IHBlcnNvbmE7XG59O1xuXG5mdW5jdGlvbiBmaW5kUGVyc29uYUJ5TGV2ZWwoIGFyY2FuYSwgbGV2ZWwgKSB7XG4gICAgdmFyIHJlc3VsdFBlcnNvbmEgPSBudWxsO1xuICAgIGlmKCBhcmNhbmEgIT09IG51bGwgJiYgYXJjYW5hICE9PSB1bmRlZmluZWQgKSBcbiAgICB7XG4gICAgICAgIHZhciBhcmNhbmFQZXJzb25hID0gcGVyc29uYUJ5QXJjYW5hW2FyY2FuYV07IFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgIXJlc3VsdFBlcnNvbmEgJiYgaSA8IGFyY2FuYVBlcnNvbmEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwZXJzb25hID0gYXJjYW5hUGVyc29uYVtpXTtcbiAgICAgICAgICAgIGlmKCBwZXJzb25hLmxldmVsID49IGxldmVsICkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBlcnNvbmEgPSBwZXJzb25hO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRQZXJzb25hO1xufVxuXG5mdW5jdGlvbiBOb3JtYWxDYWxjdWxhdGlvbiggZmlyc3QsIHNlY29uZCApIHtcbiAgICB2YXIgbGV2ZWwgPSAoKGZpcnN0LmxldmVsICsgc2Vjb25kLmxldmVsKSAvIDIgKSArIDE7XG4gICAgdmFyIGFyY2FuYSA9IEFyY2FuYS5HZXROb3JtYWxSZXN1bHQoIGZpcnN0LmFyY2FuYSwgc2Vjb25kLmFyY2FuYSApO1xuICAgIHJldHVybiBmaW5kUGVyc29uYUJ5TGV2ZWwoYXJjYW5hLCBsZXZlbCk7XG59XG5cbmZ1bmN0aW9uIGdldFRyaWFuZ2xlTGV2ZWwoZmlyc3Qsc2Vjb25kLHRoaXJkKSB7XG4gICAgcmV0dXJuICgoZmlyc3QubGV2ZWwgKyBzZWNvbmQubGV2ZWwgKyB0aGlyZC5sZXZlbCkgLyAzICkgKyA1O1xufVxuXG5mdW5jdGlvbiBUcmlhbmdsZUNhbGN1bGF0aW9uKGZpcnN0LHNlY29uZCx0aGlyZCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBhcmdzLnNvcnQoY29tcGFyZVBlcnNvbmEpO1xuXG4gICAgdmFyIGxldmVsID0gZ2V0VHJpYW5nbGVMZXZlbChmaXJzdCxzZWNvbmQsdGhpcmQpO1xuICAgIHZhciBhcmNhbmEgPSBBcmNhbmEuR2V0VHJpYW5nbGVSZXN1bHQoIGFyZ3NbMF0uYXJjYW5hLCBhcmdzWzFdLmFyY2FuYSwgYXJnc1syXS5hcmNhbmEgKTtcbiAgICByZXR1cm4gZmluZFBlcnNvbmFCeUxldmVsKGFyY2FuYSwgbGV2ZWwpO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0RnJvbU5hbWVMaXN0KCBuYW1lTGlzdCApIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaCggcGVyc29uYUJ5TmFtZVtuYW1lTGlzdFtpXV0gKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gQmFja0NhbGNOb3JtYWwoIHBlcnNvbmEsIGluY2x1ZGluZyApIHtcbiAgICAvLyBkYW1uIHNwZWNpYWwgcGVyc29uYSB0aGluayB0aGV5IG93biB0aGUgcGxhY2UhXG4gICAgaWYoIHBlcnNvbmEuZnVzaW9uUmVjaXBlTmFtZXMgKVxuICAgICAgICByZXR1cm4gW2NvbnZlcnRGcm9tTmFtZUxpc3QocGVyc29uYS5mdXNpb25SZWNpcGVOYW1lcyldO1xuXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmNhbmEgPSBwZXJzb25hLmFyY2FuYTtcblxuICAgIHZhciBub3JtYWxBcmNhbmFNaXhlcyA9IEFyY2FuYS5CYWNrQ2FsY05vcm1hbCggYXJjYW5hICk7XG4gICAgaWYoIG5vcm1hbEFyY2FuYU1peGVzLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgIGZvciAodmFyIG5vcm1hbElkeCA9IDA7IG5vcm1hbElkeCA8IG5vcm1hbEFyY2FuYU1peGVzLmxlbmd0aDsgbm9ybWFsSWR4KyspIHtcbiAgICAgICAgICAgIHZhciBtaXggPSBub3JtYWxBcmNhbmFNaXhlc1tub3JtYWxJZHhdO1xuICAgICAgICAgICAgdmFyIGZpcnN0ID0gbWl4WzBdLCBzZWNvbmQgPSBtaXhbMV07XG5cbiAgICAgICAgICAgIGlmKCBmaXJzdCAhPSBzZWNvbmQgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdExpc3QgPSBwZXJzb25hQnlBcmNhbmFbZmlyc3RdO1xuICAgICAgICAgICAgICAgIHZhciBzZWNvbmRMaXN0ID0gcGVyc29uYUJ5QXJjYW5hW3NlY29uZF07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaXJzdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWNvbmRMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3RQZXJzb25hID0gZmlyc3RMaXN0W2ldLCBzZWNvbmRQZXJzb25hID0gc2Vjb25kTGlzdFtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAhaW5jbHVkaW5nIHx8IGZpcnN0UGVyc29uYSA9PSBpbmNsdWRpbmcgfHwgc2Vjb25kUGVyc29uYSA9PSBpbmNsdWRpbmcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIE5vcm1hbENhbGN1bGF0aW9uKGZpcnN0UGVyc29uYSwgc2Vjb25kUGVyc29uYSkgPT0gcGVyc29uYSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goW2ZpcnN0UGVyc29uYSwgc2Vjb25kUGVyc29uYV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBCYWNrQ2FsY1RyaWFuZ2xlKCBwZXJzb25hLCBpbmNsdWRpbmcgKSB7XG4gICAgLy8gZGFtbiBzcGVjaWFsIHBlcnNvbmEgdGhpbmsgdGhleSBvd24gdGhlIHBsYWNlIVxuICAgIGlmKCBwZXJzb25hLmZ1c2lvblJlY2lwZU5hbWVzIClcbiAgICAgICAgcmV0dXJuIFtjb252ZXJ0RnJvbU5hbWVMaXN0KHBlcnNvbmEuZnVzaW9uUmVjaXBlTmFtZXMpXTtcblxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgdHJpYW5nbGVzID0gQXJjYW5hLkJhY2tDYWxjVHJpYW5nbGUoIGFyY2FuYSApO1xuICAgIHZhciBhcmNhbmEgPSBwZXJzb25hLmFyY2FuYTtcbiAgICBjb25zb2xlLmxvZyggXCJUcnlpbmcgdG8gYnJ1dGUgZm9yY2UgdGhyb3VnaCBcIiArIHRyaWFuZ2xlcy5sZW5ndGggKyBcIiBjb21iaW5hdGlvbnMgLi4uXCIpO1xuICAgIGZvciAodmFyIHRyaWFuZ2xlSWR4ID0gMDsgdHJpYW5nbGVJZHggPCB0cmlhbmdsZXMubGVuZ3RoOyB0cmlhbmdsZUlkeCsrKSB7XG4gICAgICAgIHZhciB0cmlhbmdsZSA9IHRyaWFuZ2xlc1t0cmlhbmdsZUlkeF07XG4gICAgICAgIHZhciBmaXJzdEFyY2FuYSA9IHRyaWFuZ2xlWzBdLCBzZWNvbmRBcmNhbmEgPSB0cmlhbmdsZVsxXSwgdGhpcmRBcmNhbmEgPSB0cmlhbmdsZVsyXTtcbiAgICAgICAgdmFyIGZpcnN0UGVyc29uYXMgPSBwZXJzb25hQnlBcmNhbmFbZmlyc3RBcmNhbmFdLCBzZWNvbmRQZXJzb25hcyA9IHBlcnNvbmFCeUFyY2FuYVtzZWNvbmRBcmNhbmFdLCB0aGlyZFBlcnNvbmFzID0gcGVyc29uYUJ5QXJjYW5hW3RoaXJkQXJjYW5hXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaXJzdFBlcnNvbmFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlY29uZFBlcnNvbmFzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlyZFBlcnNvbmFzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IGZpcnN0UGVyc29uYXNbaV0sIHNlY29uZCA9IHNlY29uZFBlcnNvbmFzW2pdLCB0aGlyZCA9IHRoaXJkUGVyc29uYXNba107XG4gICAgICAgICAgICAgICAgICAgIGlmKCAhaW5jbHVkaW5nIHx8IGZpcnN0ID09IGluY2x1ZGluZyB8fCBzZWNvbmQgPT0gaW5jbHVkaW5nIHx8IHRoaXJkID09IGluY2x1ZGluZyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9IGdldFRyaWFuZ2xlTGV2ZWwoZmlyc3Qsc2Vjb25kLHRoaXJkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gYmUgbHRlIHRvIGdldCB0aGlzIGZ1c2lvbjsgcHVudFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGxldmVsID4gcGVyc29uYS5sZXZlbCApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBUcmlhbmdsZUNhbGN1bGF0aW9uKGZpcnN0LHNlY29uZCx0aGlyZCkgPT0gcGVyc29uYSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChbZmlyc3Qsc2Vjb25kLHRoaXJkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIFRvU3RyaW5nKHBlcnNvbmEpIHtcbiAgICByZXR1cm4gcGVyc29uYS5uYW1lICsgXCIgKFwiK0FyY2FuYS5Ub1N0cmluZyhwZXJzb25hLmFyY2FuYSkrXCIsIFwiICtwZXJzb25hLmxldmVsK1wiKVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBCeUxldmVsOiBwZXJzb25hQnlMdmwsXG4gICAgQnlBcmNhbmE6IHBlcnNvbmFCeUFyY2FuYSxcbiAgICBCeU5hbWU6IHBlcnNvbmFCeU5hbWUsXG4gICAgTm9ybWFsQ2FsY3VsYXRpb246IE5vcm1hbENhbGN1bGF0aW9uLFxuICAgIFRyaWFuZ2xlQ2FsY3VsYXRpb246IFRyaWFuZ2xlQ2FsY3VsYXRpb24sXG4gICAgQmFja0NhbGM6IEJhY2tDYWxjTm9ybWFsLFxuICAgIEJhY2tDYWxjTm9ybWFsOiBCYWNrQ2FsY05vcm1hbCxcbiAgICBCYWNrQ2FsY1RyaWFuZ2xlOiBCYWNrQ2FsY1RyaWFuZ2xlLFxuICAgIFRvU3RyaW5nOiBUb1N0cmluZ1xufVxuIl19
