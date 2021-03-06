(function ui_decklist_edit(ui, $) {

/**
 * called when the DOM is loaded
 * @memberOf ui
 */
ui.on_dom_loaded = function on_dom_loaded() {
	$('#descriptionMd').markdown({
		autofocus: true,
		iconlibrary: 'fa',
		hiddenButtons: ['cmdHeading', 'cmdImage', 'cmdCode'],
		footer: 'Press # to insert a card name, $ to insert a game symbol.',
		additionalButtons: 
			[[{
				name: "groupCard",
				data: [{
					name: "cmdCard",
					title: "Turn a card name into a card link",
					icon: "fa fa-clone",
					callback: ui.on_button_card
				}]
			},{
				name: "groupSymbol",
				data: [{
					name: "cmdSymbol",
					title: "Insert a game symbol",
					icon: "icon-elder_sign",
					callback: ui.on_button_symbol
				}]
			},{
				name: "groupCustom",
				data: [{
					name: "cmdCustom1",
					title: "Heading 1",
					icon: "fa fa-header",
					callback: _.partial(ui.on_button_heading, '#')
				},{
					name: "cmdCustom2",
					title: "Heading 2",
					icon: "fa fa-header small",
					callback: _.partial(ui.on_button_heading, '##')
				},{
					name: "cmdCustom3",
					title: "Heading 3",
					icon: "fa fa-header smaller",
					callback: _.partial(ui.on_button_heading, '###')
				}]
			}]]
	});
};

ui.on_button_heading = function ui_on_button_heading(heading, e) {
    // Append/remove # surround the selection
    var chunk, cursor, selected = e.getSelection(), content = e.getContent(), pointer, prevChar;

    if (selected.length === 0) {
      // Give extra word
      chunk = e.__localize('heading text');
    } else {
      chunk = selected.text + '\n';
    }

    // transform selection and set the cursor into chunked text
    if ((pointer = heading.length+2, content.substr(selected.start-pointer,pointer) === heading+' ')
        || (pointer = heading.length+1, content.substr(selected.start-pointer,pointer) === heading)) {
      e.setSelection(selected.start-pointer,selected.end);
      e.replaceSelection(chunk);
      cursor = selected.start-pointer;
    } else if (selected.start > 0 && (prevChar = content.substr(selected.start-1,1), !!prevChar && prevChar != '\n')) {
      e.replaceSelection('\n\n'+heading+' '+chunk);
      cursor = selected.start+heading.length+4;
    } else {
      // Empty string before element
      e.replaceSelection(heading+' '+chunk);
      cursor = selected.start+heading.length+1;
    }

    // Set the cursor
    e.setSelection(cursor,cursor+chunk.length);
}

ui.on_button_symbol = function ui_on_button_symbol(e) 
{
	var button = $('button[data-handler=bootstrap-markdown-cmdSymbol]');
	$(button).attr('data-toggle', 'dropdown');
	$(button).next().remove();
	
	var menu = $('<ul class="dropdown-menu">').insertAfter(button).on('click', 'li', function (event) {
		var icon = $(this).data('icon');
		var chunk = '<span class="icon-'+icon+'"></span>';
		ui.replace_selection(e, e.getSelection(), chunk);
		$(menu).remove();
		$(button).off('click');
	});
	
	var icons = 'guardian survivor rogue mystic seeker action reaction fast free unique per_investigator null elder_sign elder_thing auto_fail skull cultist tablet willpower intellect combat agility wild'.split(' ');
	icons.forEach(function (icon) {
		menu.append('<li data-icon="'+icon+'"><a href="#"><span style="display:inline-block;width:2em;text-align:center" class="icon-'+icon+'"></span> '+icon+'</a></li>');
	});
	$(button).dropdown();
}

ui.on_button_card = function ui_on_button_card(e) 
{
	var button = $('button[data-handler=bootstrap-markdown-cmdCard]');
	$(button).attr('data-toggle', 'dropdown');
	$(button).next().remove();
	
	var menu = $('<ul class="dropdown-menu">').insertAfter(button).on('click', 'li', function (event) {
		var code = $(this).data('code'), name = $(this).data('name');
		var chunk = '['+name+'](' + Routing.generate('cards_zoom', { card_code: code }) + ')';
		ui.replace_selection(e, e.getSelection(), chunk);
		$(menu).remove();
		$(button).off('click');
	});
	
	var cards = app.data.cards.find({name: new RegExp(e.getSelection().text, 'i')}, {'$orderBy': {name: 1}});
	if(cards.length > 10) {
		cards = cards.slice(0, 10);
	}
	cards.forEach(function (card) {
		menu.append('<li data-code="'+card.code+'" data-name="'+card.name+'"><a href="#">' + card.name + ' <small><i>' + card.pack_name + '</i></small></a></li>');
	})
	$(button).dropdown();
}

ui.replace_selection = function ui_replace_selection(e, selected, chunk) 
{
    e.replaceSelection(chunk);
    var cursor = selected.start;
    e.setSelection(cursor+chunk.length, cursor+chunk.length);
    e.$textarea.focus();
}

/**
 * called when the app data is loaded
 * @memberOf ui
 */
ui.on_data_loaded = function on_data_loaded() {
};

/**
 * called when both the DOM and the data app have finished loading
 * @memberOf ui
 */
ui.on_all_loaded = function on_all_loaded() {
	app.textcomplete.setup('#descriptionMd');
	app.deck.display('#decklist');
	app.deck_upgrades.setup();
};


})(app.ui, jQuery);

(function app_deck_upgrades(deck_upgrades, $) {

var tbody,
	upgrades = [],
	xp_spent = 0,
	edit_mode = false


/**
 * @memberOf deck_upgrades
 */
deck_upgrades.display = function display() {
	
	// no upgrades
	if (upgrades.length <= 0){		
		return;
	}
	
	// put relevent data into deck object based on current deck 
	var current_deck = {};
	current_deck.content = app.deck.get_content();
	current_deck.exile_string = app.deck.get_exile_string();
	
	var last_deck = current_deck;
	$("#upgrade_changes").empty();
	var counter = upgrades.length;
	$("#upgrade_changes").append('<h4 class="deck-section>History</h4>');
	_.each(upgrades, function (deck) {		
		//console.log(last_deck, deck.content);
		var result = app.diff.compute_simple([last_deck.content, deck.content]);
		if(!result) return;
		
		var free_0_cards = 0;
		var removed_0_cards = 0;
		var diff = result[0];
		var cards_removed = [];
		var cards_added = [];
		var cards_exiled = {};
		var cost = 0;
		_.each(diff[1], function (qty, code) {
			var card = app.data.cards.findById(code);
			if(!card) return;
			var card_change = {
				"qty": qty,
				"code": code,
				"card": card
			};
			cards_removed.push(card_change);
		});
		
		_.each(diff[0], function (qty, code) {
			var card = app.data.cards.findById(code);
			if(!card) return;
			var card_change = {
				"qty": qty,
				"code": code,
				"card": card
			};
			cards_added.push(card_change);
			if (card_change.code == "06167") {
				free_0_cards += card_change.qty * 5;
				removed_0_cards += card_change.qty * 5;
			}
		});
				
		// find arcane research
		var arcane_research = app.data.cards.findById("04109");
		var spell_upgrade_discounts = 0;
		if (arcane_research && arcane_research.indeck) {
			spell_upgrade_discounts += arcane_research.indeck;
		}

		// find adaptable
		var adaptable = app.data.cards.findById("02110");
		if (adaptable && adaptable.indeck){
			free_0_cards += 2 * adaptable.indeck;
		}

		if (last_deck.exile_string){
			free_0_cards += last_deck.exile_string.split(",").length;
			removed_0_cards = last_deck.exile_string.split(",").length;
			_.each(last_deck.exile_string.split(","), function (code, id) {
				if (cards_exiled[code]){
					cards_exiled[code] = 2;
				} else {
					cards_exiled[code] = 1;
				}
			});
		}
		
		var myriad_madness = {};
		// first check for same named cards
		_.each(cards_added, function (addition) {
			_.each(cards_removed, function (removal) {
				var addition_xp = addition.card.xp;
				var removal_xp = removal.card.xp;

				if (typeof addition.card.real_text !== 'undefined' && addition.card.real_text.indexOf('Myriad.') !== -1) {
					addition.qty = 1;
					if (myriad_madness[addition.card.real_name]) {
						addition.qty = 0;
					}
					myriad_madness[addition.card.real_name] = 1;
				}
				if (removal.card.real_text.indexOf('Myriad.') !== -1) {
					removal.qty = 1;
				}
				if (addition.card.taboo_xp){
					addition_xp += addition.card.taboo_xp;
				}
				if (removal.card.taboo_xp){
					removal_xp += removal_xp.card.taboo_xp;
				}
				if (addition.qty > 0 && removal.qty > 0 && addition_xp >= 0 && addition.card.real_name == removal.card.real_name && addition_xp > removal_xp){
					addition.qty = addition.qty - removal.qty;
					if (spell_upgrade_discounts > 0 && removal.card.real_traits && removal.card.real_traits.indexOf('Spell.') !== -1 && addition.card.real_traits && addition.card.real_traits.indexOf('Spell.') !== -1) {
						// It's a spell card, and we have arcane research discounts remaining.
						var upgradeCost = ((addition_xp - removal_xp) * removal.qty)
						while (spell_upgrade_discounts > 0 && upgradeCost > 0) {
							upgradeCost--;
							spell_upgrade_discounts--;
						}
						cost = cost + upgradeCost;
					} else {
						cost = cost + ((addition_xp - removal_xp) * removal.qty);
					}
					removal.qty = Math.abs(addition.qty);
				}
				if (removal.card.xp === 0){
					removed_0_cards += removal.qty;
				}
			});
		});
		
	myriad_madness = {};
	//console.log(removed_0_cards);
	// then pay for all changes
	_.each(cards_added, function (addition) {
		var addition_xp = addition.card.xp;
		
		if (typeof addition.card.real_text !== 'undefined' && addition.card.real_text.indexOf('Myriad.') !== -1) {
			addition.qty = 1;
			if (myriad_madness[addition.card.real_name]) {
				addition.qty = 0;
			}
			myriad_madness[addition.card.real_name] = 1;
		}
		if (addition.card.exceptional){
			addition_xp *= 2;
		}
		if (addition.card.taboo_xp){
			addition_xp += addition.card.taboo_xp;
		}
		if (addition_xp >= 0){
			if (addition.card.xp === 0 && removed_0_cards > 0 && free_0_cards > 0){
				free_0_cards -= addition.qty;
				removed_0_cards -= addition.qty;
				if (removed_0_cards < 0 || free_0_cards < 0){
					addition.qty = 1;
				} else {
					addition.qty = 0;
				}
			}
			
			if (addition.card.indeck - addition.qty > 0 && addition.card.ignore) {
				addition.card.ignore = addition.card.ignore - (addition.card.indeck - addition.qty);
			}
			cost = cost + (Math.max(addition_xp, 1) * (addition.qty - addition.card.ignore) );
			addition.qty = 0;
		}
	});
		
		var add_list = [];
		var remove_list = [];
		var exile_list = [];
		// run through the changes and show them
		_.each(diff[0], function (qty, code) {
			var card = app.data.cards.findById(code);
			if(!card) return;
			add_list.push('+'+qty+' '+'<a href="'+card.url+'" class="card card-tip fg-'+card.faction_code+'" data-toggle="modal" data-remote="false" data-target="#cardModal" data-code="'+card.code+'">'+card.name+'</a>'+app.format.xp(card.xp)+'</a>');
			//add_list.push('+'+qty+' '+'<a href="'+Routing.generate('cards_zoom',{card_code:code})+'" class="card-tip" data-code="'+code+'">'+card.name+''+(card.xp >= 0 ? ' ('+card.xp+')' : '')+'</a>');
		});
		_.each(diff[1], function (qty, code) {
			var card = app.data.cards.findById(code);
			if(!card) return;
			if (cards_exiled[code]){
				qty = qty - cards_exiled[code];
				if (qty <= 0){
					return;
				}
			}
			remove_list.push('&minus;'+qty+' '+'<a href="'+card.url+'" class="card card-tip fg-'+card.faction_code+'" data-toggle="modal" data-remote="false" data-target="#cardModal" data-code="'+card.code+'">'+card.name+'</a>'+(app.format.xp(card.xp))+'</a>');
			//remove_list.push('&minus;'+qty+' '+'<a href="'+Routing.generate('cards_zoom',{card_code:code})+'" class="card-tip" data-code="'+code+'">'+card.name+'</a>');
		});
		_.each(cards_exiled, function (qty, code) {
			var card = app.data.cards.findById(code);
			if(!card) return;
			exile_list.push('&minus;'+qty+' '+'<a href="'+card.url+'" class="card card-tip fg-'+card.faction_code+'" data-toggle="modal" data-remote="false" data-target="#cardModal" data-code="'+card.code+'">'+card.name+'</a>'+(app.format.xp(card.xp))+'</a>');
			//remove_list.push('&minus;'+qty+' '+'<a href="'+Routing.generate('cards_zoom',{card_code:code})+'" class="card-tip" data-code="'+code+'">'+card.name+'</a>');
		});
		
		if (cost){
			app.deck.set_xp_spent(cost)
		}
		
		var div = $('<div class="deck-upgrade-changes">');
		if (edit_mode){
			div.append('<h4 class="deck-section">Progress</h4>');
			
			div.append('<div>Available experience: '+app.deck.get_xp()+' <span class="fa fa-plus-circle"></span><span class="fa fa-minus-circle"></span></div>');
			div.append('<div>Spent experience: '+cost+'</div>');
			if (app.deck.get_previous_deck() && $('#save_form').length <= 0){
				div.append('<div><a href="'+Routing.generate('deck_view', {deck_id:app.deck.get_previous_deck()})+'">View Previous Deck</a></div>');
			}
			if (app.deck.get_next_deck()){
				div.append('<div><a href="'+Routing.generate('deck_view', {deck_id:app.deck.get_next_deck()})+'">View Next Deck</a></div>');
			}
		}

		if (deck.xp_adjustment){
			div.append('<h5>Scenario '+counter+' complete: '+deck.xp+' xp spent. '+deck.xp_left+' xp remaining ('+deck.xp_adjustment+')</h5>');
		} else {
			div.append('<h5>Scenario '+counter+' complete: '+deck.xp+' xp spent. '+deck.xp_left+' xp remaining</h5>');
		}
		
		if (add_list.length <= 0 && remove_list.length <= 0){
			div.append('<div class="deck-content">No Changes</div>');
		}else {
			div.append('<div class="deck-content"><div class="row"><div class="col-sm-6 col-print-6">'+add_list.join('<br>')+'</div><div class="col-sm-6 col-print-6">'+remove_list.join('<br>')+'</div></div></div>');	
		}
		
		if (exile_list.length > 0){
			div.append('<b>Exiled Cards</b>');
			div.append('<div class="deck-content"><div class="row"><div class="col-sm-6 col-print-6">'+exile_list.join('<br>')+'</div></div></div>');	
		}
		div.append('<hr>');
		
		$("#upgrade_changes").append(div);
		last_deck = deck;
		counter--;
	});
	
	

}

deck_upgrades.init = function init(data) 
{
	// console.log("ch ch changes", app.deck.get_content());
	upgrades = data;
}

/**
 * @memberOf deck_history
 * @param container
 */
deck_upgrades.setup = function setup_upgrades() 
{
	deck_upgrades.display();
}

})(app.deck_upgrades = {}, jQuery);
