(function ui_decklist(ui, $) {

	/**
	 * sets up event handlers ; dataloaded not fired yet
	 * @memberOf ui
	 */
	ui.setup_event_handlers = function setup_event_handlers() {

		$('#decklist-delete').on('click', ui.delete_form);
		$('.social .social-icon-like').on('click', ui.send_like);
		$('.social .social-icon-favorite').on('click', ui.send_favorite);
		$('#btn-group-decklist button[id],a[id]').on('click', ui.do_action_decklist);
		$('#btn-compare').on('click', ui.compare_form);
		$('#btn-compare-submit').on('click', ui.compare_submit);

	}

	ui.delete_form = function delete_form() {
		$('#deleteModal').modal('show');
	}

	ui.do_action_decklist = function do_action_decklist(event) {
		var action_id = $(this).attr('id');
		if (!action_id) {
			return;
		}
		switch (action_id) {
		case 'btn-download-text':
			location.href = Routing.generate('decklist_export_text', {decklist_id:app.deck.get_id()});
			break;
		case 'btn-download-octgn':
			location.href = Routing.generate('decklist_export_octgn', {decklist_id:app.deck.get_id()});
			break;
		case 'btn-export-bbcode':
			export_bbcode();
			break;
		case 'btn-export-markdown':
			export_markdown();
			break;
		case 'btn-export-plaintext':
			export_plaintext();
			break;
		}
	}

	ui.send_like = function send_like(event) {
		event.preventDefault();
		var that = $(this);
		if($(that).hasClass('processing')) return;
		$(that).addClass('processing');
		$.post(Routing.generate('decklist_like'), {
			id : app.deck.get_id()
		}, function(data, textStatus, jqXHR) {
			$(that).find('.num').text(data);
			$(that).removeClass('processing');
		});
	}

	ui.send_favorite = function send_favorite(event) {
		event.preventDefault();
		var that = $(this);
		if($(that).hasClass('processing')) return;
		$(that).addClass('processing');
		$.post(Routing.generate('decklist_favorite'), {
			id : app.deck.get_id()
		}, function(data, textStatus, jqXHR) {
			that.find('.num').text(data);
			var title = that.data('original-tooltip');
			that.data('original-tooltip',
					title == "Add to favorites" ? "Remove from favorites"
							: "Add to favorites");
			that.attr('title', that.data('original-tooltip'));
			$(that).removeClass('processing');
		});
		ui.send_like.call($('.social .social-icon-like'), event);
	}

	ui.setup_comment_form = function setup_comment_form() {

		var form = $('<form method="POST" action="'+Routing.generate('decklist_comment')+'"><input type="hidden" name="id" value="'+app.deck.get_id()+'"><div class="form-group">'
				+ '<textarea id="comment-form-text" class="form-control" rows="4" name="comment" placeholder="Enter your comment in Markdown format. Type # to enter a card name. Type $ to enter a symbol. Type ^ to enter a rules reference. Type @ to enter a user name."></textarea>'
				+ '</div><div class="well text-muted" id="comment-form-preview"><small>Preview. Look <a href="http://daringfireball.net/projects/markdown/dingus">here</a> for a Markdown syntax reference.</small></div>'
				+ '<button type="submit" class="btn btn-success">Submit comment</button></form>').insertAfter('#comment-form');

		var already_submitted = false;
		form.on('submit', function (event) {
			event.preventDefault();
			var data = $(this).serialize();
			if(already_submitted) return;
			already_submitted = true;
			$.ajax(Routing.generate('decklist_comment'), {
				data: data,
				type: 'POST',
				success: function(data, textStatus, jqXHR) {
					form.replaceWith('<div class="alert alert-success" role="alert">Your comment has been posted. It will appear on the site in a few minutes.</div>');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log('['+moment().format('YYYY-MM-DD HH:mm:ss')+'] Error on '+this.url, textStatus, errorThrown);
					form.replaceWith('<div class="alert alert-danger" role="alert">An error occured while posting your comment ('+jqXHR.statusText+'). Reload the page and try again.</div>');
				}
			});
		});

		$('.social .social-icon-comment').on('click', function() {
			$('#comment-form-text').trigger('focus');
		});

		app.markdown.setup('#comment-form-text', '#comment-form-preview');
		app.textcomplete.setup('#comment-form-text', {
			cards: true,
			icons: true,
			users: Commenters
		});

	}

	ui.setup_social_icons = function setup_social_icons() {

		if(!app.user.data || app.user.data.is_author || app.user.data.is_liked) {
			var element = $('.social .social-icon-like');
			element.replaceWith($('<span class="social-icon-like"></span').html(element.html()));
		}

		if(!app.user.data) {
			var element = $('.social .social-icon-favorite');
			element.replaceWith($('<span class="social-icon-favorite"></span').html(element.html()));
		} else if(app.user.data.is_favorite) {
			var element = $('.social .social-icon-favorite');
			element.attr('title', "Remove from favorites");
		} else {
			var element = $('.social .social-icon-favorite');
			element.attr('title', "Add to favorites");
		}

		if(!app.user.data) {
			var element = $('.social .social-icon-comment');
			element.replaceWith($('<span class="social-icon-comment"></span').html(element.html()));
		}

	}

	ui.add_author_actions = function add_author_actions() {
		if(app.user.data && app.user.data.is_author) {
			$('#decklist-edit').show();
			if(app.user.data.can_delete) {
				$('#decklist-delete').show();
			} else {
				$('#decklist-delete').remove();
			}
		} else {
			$('#decklist-edit').remove();
			$('#decklist-delete').remove();
		}
	}

	ui.setup_comment_hide = function setup_comment_hide() {
		if(app.user.data && app.user.data.is_author) {
			$('.comment-hide-button').remove();
			$('<a href="#" class="comment-hide-button"><span class="text-danger fa fa-times" style="margin-left:.5em"></span></a>').appendTo('.collapse.in > .comment-date').on('click', function (event) {
				if(confirm('Do you really want to hide this comment for everybody?')) {
					ui.hide_comment($(this).closest('td'));
				}
				return false;
			});
			$('<a href="#" class="comment-hide-button"><span class="text-success fa fa-check" style="margin-left:.5em"></span></a>').appendTo('.collapse:not(.in) > .comment-date').on('click', function (event) {
				if(confirm('Do you really want to unhide this comment?')) {
					ui.unhide_comment($(this).closest('td'));
				}
				return false;
			});
		}
	}

	ui.hide_comment = function hide_comment(element) {
		var id = element.attr('id').replace(/comment-/, '');
		$.ajax(Routing.generate('decklist_comment_hide', { comment_id: id, hidden: 1 }), {
			type: 'POST',
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				if(data === true) {
					$(element).find('.collapse').collapse('hide');
					$(element).find('.comment-toggler').show().prepend('The comment will be hidden for everyone in a few minutes.');
					setTimeout(ui.setup_comment_hide, 1000);
				} else {
					alert(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('['+moment().format('YYYY-MM-DD HH:mm:ss')+'] Error on '+this.url, textStatus, errorThrown);
				alert('An error occured while hiding this comment ('+jqXHR.statusText+'). Reload the page and try again.');
			}
		});
	}

	ui.unhide_comment = function unhide_comment(element) {
		var id = element.attr('id').replace(/comment-/, '');
		$.ajax(Routing.generate('decklist_comment_hide', { comment_id: id, hidden: 0 }), {
			type: 'POST',
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				if(data === true) {
					$(element).find('.collapse').collapse('show');
					$(element).find('.comment-toggler').hide();
					setTimeout(setup_comment_hide, 1000);
				} else {
					alert(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('['+moment().format('YYYY-MM-DD HH:mm:ss')+'] Error on '+this.url, textStatus, errorThrown);
				alert('An error occured while unhiding this comment ('+jqXHR.statusText+'). Reload the page and try again.');
			}
		});
	}

	/**
	 * @memberOf ui
	 */
	ui.refresh_deck = function refresh_deck() {
		app.deck.display('#deck-content');
		app.deck_charts && app.deck_charts.setup();
	}

	/**
	 * called when the DOM is loaded
	 * @memberOf ui
	 */
	ui.on_dom_loaded = function on_dom_loaded() {
		ui.setup_event_handlers();
		app.draw_simulator && app.draw_simulator.on_dom_loaded();
	};

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
		ui.refresh_deck();
		app.draw_simulator && app.draw_simulator.reset();
		app.deck_upgrades.setup();
		app.user.loaded.done(function () {
			ui.setup_comment_form();
			ui.add_author_actions();
			ui.setup_comment_hide();
		}).fail(function () {
			$('<p>You must be logged in to post comments.</p>').insertAfter('#comment-form');
		}).always(function () {
			ui.setup_social_icons();
		});
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
