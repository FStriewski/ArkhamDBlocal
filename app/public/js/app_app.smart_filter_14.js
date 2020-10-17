(function app_smart_filter(smart_filter, $) {

var SmartFilterQuery = [];

var configuration = {
	v: [ add_string_sf, 'flavor', "Flavor text" ],
	y: [ add_string_sf, 'cycle_code', "Cycle name" ],
	e: [ add_string_sf, 'pack_code', "Pack" ],
	f: [ add_string_sf, 'faction_code', "Class" ],
	l: [ add_string_sf, 'illustrator', "Illustrator" ],
	k: [ add_string_sf, 'traits', "Traits" ],
	o: [ add_integer_sf, 'cost', "Cost" ],
	w: [ add_integer_sf, 'skill_willpower', "Willpower" ],
	c: [ add_integer_sf, 'skill_combat', "Combat" ],
	i: [ add_integer_sf, 'skill_intellect', "Intellect" ],
	a: [ add_integer_sf, 'skill_agility', "Agility" ],
	d: [ add_integer_sf, 'skill_wild', "Wild" ],
	t: [ add_string_sf, 'type_code', "Type" ],
	b: [ add_string_sf, 'subtype_code', "Subtype" ],
	u: [ add_boolean_sf, 'is_unique', "Uniqueness" ],
	h: [ add_integer_sf, 'health', "Health" ],
	s: [ add_integer_sf, 'sanity', "Sanity" ],
	x: [ add_string_sf, 'text', "Text" ],
	p: [ add_integer_sf, 'xp', "Experience" ],
	qt: [ add_integer_sf, 'quantity', "Quantity in pack" ],
	z: [ add_string_sf, 'slot', "Slot" ],
	j: [ add_integer_sf, 'victory', "Victory" ]
};

/**
 * called when the list is refreshed
 * @memberOf smart_filter
 */
smart_filter.get_query =  function get_query(query) {
	return _.extend(query, SmartFilterQuery);
};

/**
 * called when the filter input is modified
 * @memberOf smart_filter
 */
smart_filter.update =  function update(value) {
	var conditions = filterSyntax(value);
	SmartFilterQuery = {};

	for (var i = 0; i < conditions.length; i++) {
		var condition = conditions[i];
		var type = condition.shift();
		var operator = condition.shift();
		var values = condition;

		var tools = configuration[type];
		if(tools) {
			tools[0].call(this, tools[1], operator, values);
		}
	}
};

smart_filter.get_help = function get_help() {
	var items = _.map(configuration, function (value, key) {
		return '<li><tt>'+key+'</tt> &ndash; '+value[2]+'</li>';
	});
	return '<ul>'+items.join('')+'</ul><p>Example: <tt>a:1 c>1</tt> Shows all cards with 1 Agility icon or 1 Agility and more than 1 Combat icon or 1 Combat</p>';
}

function add_integer_sf(key, operator, values) {
	for (var j = 0; j < values.length; j++) {
		values[j] = parseInt(values[j], 10);
	}
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = {
			'$in' : values
		};
		break;
	case "<":
		SmartFilterQuery[key] = {
			'$lt' : values[0]
		};
		break;
	case ">":
		SmartFilterQuery[key] = {
			'$gt' : values[0]
		};
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$nin' : values
		};
		break;
	}
}
function add_string_sf(key, operator, values) {
	for (var j = 0; j < values.length; j++) {
		values[j] = new RegExp(values[j], 'i');
	}
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = {
			'$in' : values
		};
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$nin' : values
		};
		break;
	}
}
function add_boolean_sf(key, operator, values) {
	var value = parseInt(values.shift()), target = !!value;
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = target;
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$ne': target
		};
		break;
	}
}
function filterSyntax(query) {
	// renvoie une liste de conditions (array)
	// chaque condition est un tableau à n>1 éléments
	// le premier est le type de condition (0 ou 1 caractère)
	// les suivants sont les arguments, en OR

	query = query.replace(/^\s*(.*?)\s*$/, "$1").replace('/\s+/', ' ');

	var list = [];
	var cond = null;
	// l'automate a 3 états :
	// 1:recherche de type
	// 2:recherche d'argument principal
	// 3:recherche d'argument supplémentaire
	// 4:erreur de parsing, on recherche la prochaine condition
	// s'il tombe sur un argument alors qu'il est en recherche de type, alors le
	// type est vide
	var etat = 1;
	while (query != "") {
		if (etat == 1) {
			if (cond !== null && etat !== 4 && cond.length > 2) {
				list.push(cond);
			}
			// on commence par rechercher un type de condition
			if (query.match(/^(\w)([:<>!])(.*)/)) { // jeton "condition:"
				cond = [ RegExp.$1.toLowerCase(), RegExp.$2 ];
				query = RegExp.$3;
			} else {
				cond = [ "", ":" ];
			}
			etat = 2;
		} else {
			if (   query.match(/^"([^"]*)"(.*)/) // jeton "texte libre entre guillements"
				|| query.match(/^([^\s]+)(.*)/) // jeton "texte autorisé sans guillements"
			) {
				if ((etat === 2 && cond.length === 2) || etat === 3) {
					cond.push(RegExp.$1);
					query = RegExp.$2;
					etat = 2;
				} else {
					// erreur
					query = RegExp.$2;
					etat = 4;
				}
			} else if (query.match(/^\|(.*)/)) { // jeton "|"
				if ((cond[1] === ':' || cond[1] === '!')
						&& ((etat === 2 && cond.length > 2) || etat === 3)) {
					query = RegExp.$1;
					etat = 3;
				} else {
					// erreur
					query = RegExp.$1;
					etat = 4;
				}
			} else if (query.match(/^ (.*)/)) { // jeton " "
				query = RegExp.$1;
				etat = 1;
			} else {
				// erreur
				query = query.substr(1);
				etat = 4;
			}
		}
	}
	if (cond !== null && etat !== 4 && cond.length > 2) {
		list.push(cond);
	}
	return list;
}

$(function() {
	$('.smart-filter-help').tooltip({
		container: 'body',
		delay: 1000,
		html: true,
		placement: 'bottom',
		title: smart_filter.get_help(),
		trigger: 'hover'
	});
})

})(app.smart_filter = {}, jQuery);


(function app_smart_filter2(smart_filter, $) {

var SmartFilterQuery = [];

var configuration = {
	v: [ add_string_sf, 'flavor', "Flavor text" ],
	y: [ add_string_sf, 'cycle_code', "Cycle name" ],
	e: [ add_string_sf, 'pack_code', "Pack" ],
	f: [ add_string_sf, 'faction_code', "Class" ],
	l: [ add_string_sf, 'illustrator', "Illustrator" ],
	k: [ add_string_sf, 'traits', "Traits" ],
	o: [ add_integer_sf, 'cost', "Cost" ],
	w: [ add_integer_sf, 'skill_willpower', "Willpower" ],
	c: [ add_integer_sf, 'skill_combat', "Combat" ],
	i: [ add_integer_sf, 'skill_intellect', "Intellect" ],
	a: [ add_integer_sf, 'skill_agility', "Agility" ],
	d: [ add_integer_sf, 'skill_wild', "Wild" ],
	t: [ add_string_sf, 'type_code', "Type" ],
	b: [ add_string_sf, 'subtype_code', "Subtype" ],
	u: [ add_boolean_sf, 'is_unique', "Uniqueness" ],
	h: [ add_integer_sf, 'health', "Health" ],
	s: [ add_integer_sf, 'sanity', "Sanity" ],
	x: [ add_string_sf, 'text', "Text" ],
	p: [ add_integer_sf, 'xp', "Experience" ],
	q: [ add_integer_sf, 'quantity', "Quantity in pack" ],
	z: [ add_string_sf, 'slot', "Slot" ],
	j: [ add_integer_sf, 'victory', "Victory" ]
};

/**
 * called when the list is refreshed
 * @memberOf smart_filter
 */
smart_filter.get_query =  function get_query(query) {
	return _.extend(query, SmartFilterQuery);
};

/**
 * called when the filter input is modified
 * @memberOf smart_filter
 */
smart_filter.update =  function update(value) {
	var conditions = filterSyntax(value);
	SmartFilterQuery = {};

	for (var i = 0; i < conditions.length; i++) {
		var condition = conditions[i];
		var type = condition.shift();
		var operator = condition.shift();
		var values = condition;

		var tools = configuration[type];
		if(tools) {
			tools[0].call(this, tools[1], operator, values);
		}
	}
};

smart_filter.get_help = function get_help() {
	var items = _.map(configuration, function (value, key) {
		return '<li><tt>'+key+'</tt> &ndash; '+value[2]+'</li>';
	});
	return '<ul>'+items.join('')+'</ul><p>Example: <tt>a:1 c>1</tt> Shows all cards with 1 Agility icon or 1 Agility and more than 1 Combat icon or 1 Combat</p>';
}

function add_integer_sf(key, operator, values) {
	for (var j = 0; j < values.length; j++) {
		values[j] = parseInt(values[j], 10);
	}
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = {
			'$in' : values
		};
		break;
	case "<":
		SmartFilterQuery[key] = {
			'$lt' : values[0]
		};
		break;
	case ">":
		SmartFilterQuery[key] = {
			'$gt' : values[0]
		};
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$nin' : values
		};
		break;
	}
}
function add_string_sf(key, operator, values) {
	for (var j = 0; j < values.length; j++) {
		values[j] = new RegExp(values[j], 'i');
	}
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = {
			'$in' : values
		};
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$nin' : values
		};
		break;
	}
}
function add_boolean_sf(key, operator, values) {
	var value = parseInt(values.shift()), target = !!value;
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = target;
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$ne': target
		};
		break;
	}
}
function filterSyntax(query) {
	// renvoie une liste de conditions (array)
	// chaque condition est un tableau à n>1 éléments
	// le premier est le type de condition (0 ou 1 caractère)
	// les suivants sont les arguments, en OR

	query = query.replace(/^\s*(.*?)\s*$/, "$1").replace('/\s+/', ' ');

	var list = [];
	var cond = null;
	// l'automate a 3 états :
	// 1:recherche de type
	// 2:recherche d'argument principal
	// 3:recherche d'argument supplémentaire
	// 4:erreur de parsing, on recherche la prochaine condition
	// s'il tombe sur un argument alors qu'il est en recherche de type, alors le
	// type est vide
	var etat = 1;
	while (query != "") {
		if (etat == 1) {
			if (cond !== null && etat !== 4 && cond.length > 2) {
				list.push(cond);
			}
			// on commence par rechercher un type de condition
			if (query.match(/^(\w)([:<>!])(.*)/)) { // jeton "condition:"
				cond = [ RegExp.$1.toLowerCase(), RegExp.$2 ];
				query = RegExp.$3;
			} else {
				cond = [ "", ":" ];
			}
			etat = 2;
		} else {
			if (   query.match(/^"([^"]*)"(.*)/) // jeton "texte libre entre guillements"
				|| query.match(/^([^\s]+)(.*)/) // jeton "texte autorisé sans guillements"
			) {
				if ((etat === 2 && cond.length === 2) || etat === 3) {
					cond.push(RegExp.$1);
					query = RegExp.$2;
					etat = 2;
				} else {
					// erreur
					query = RegExp.$2;
					etat = 4;
				}
			} else if (query.match(/^\|(.*)/)) { // jeton "|"
				if ((cond[1] === ':' || cond[1] === '!')
						&& ((etat === 2 && cond.length > 2) || etat === 3)) {
					query = RegExp.$1;
					etat = 3;
				} else {
					// erreur
					query = RegExp.$1;
					etat = 4;
				}
			} else if (query.match(/^ (.*)/)) { // jeton " "
				query = RegExp.$1;
				etat = 1;
			} else {
				// erreur
				query = query.substr(1);
				etat = 4;
			}
		}
	}
	if (cond !== null && etat !== 4 && cond.length > 2) {
		list.push(cond);
	}
	return list;
}

$(function() {
	$('.smart-filter-help').tooltip({
		container: 'body',
		delay: 1000,
		html: true,
		placement: 'bottom',
		title: smart_filter.get_help(),
		trigger: 'hover'
	});
})

})(app.smart_filter2 = {}, jQuery);
