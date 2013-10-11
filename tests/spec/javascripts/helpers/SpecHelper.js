beforeEach(function() {

    this.addMatchers({

	toBeBehaving: function(expectedState) {

	    var object = this.actual;
	    
	    return object.currentState === expectedState && object.hasAState;
	}
    });
});
