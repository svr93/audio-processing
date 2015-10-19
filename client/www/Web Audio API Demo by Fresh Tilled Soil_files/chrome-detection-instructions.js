var instructionOverlay = function(instructionsText, containerWidth, isChromeCapable, isSafariCapable, isFireFoxCapable, isOperaCapable, isIpadCapable, optionalLeftOffset, optionalTopOffset) {

// defaults / configurable settings
    var instructions = {
        title: {
            color: "#ffffff",
            fontFamily: "Arial",
            fontSize: '17px',
            fontWeight: 'normal',
            text: '&nbsp;&nbsp;Demo Instructions',
            width: '100%',
            height: '18px',
            background: "#3cc8d1",
            padding: "6px 0px"
        },
        fontFamily: "Arial",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.5)",
        fontSize: '14px',
        lineHeight: '18px',
        color: '#555555',
        background: '#ffffff',
        border: '4px solid #ffffff',
        left: '5px',
        top: '5px',
        width: '300px',
        padding: '40px 10px 8px 10px',
        cursor: 'move',
        text: 'test'
    };

// passed variable clean-up / declaration
    instructions.width = containerWidth ? containerWidth : instructions.width;

    if (typeof instructionsText !== "undefined") {
        instructions.text = instructionsText;
    }

    if (typeof optionalLeftOffset !== "undefined") {
	    	instructions.left = optionalLeftOffset;
    }
    
    
    if (typeof optionalTopOffset !== "undefined") {
	    	instructions.top = optionalTopOffset;
    }    
    

// Browser detection script
    var isChrome = false, browserVersion = 0;
    isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
    isSafari = /safari/.test(navigator.userAgent.toLowerCase());
    isSafari = isChrome ? false : true; // filter to check for chrome (both safari and chrome use webkit)

    if(isChrome && isChromeCapable){
        // first digit only as int of browser version:
        browserVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
        //console.log(browserVersion);

    } else if (isSafari && isSafariCapable) {
        // first digit only as int of browser version:
        browserVersion = parseInt(window.navigator.appVersion.match(/Version\/(\d+)\./)[1], 10);
        //console.log(browserVersion);
        if (browserVersion < 6) {
	        	showWarningText();
        }

    } else {
	    	showWarningText();
    }


    function showWarningText() {
		    instructions.title.background = '#FF0000';
	    	instructions.title.text = '&nbsp;&nbsp;WARNING!';
        console.log("This browser is not supported");
    }

// Vendor prefix solution
    function getSupportedPropertyName(properties) {
        for (var i = 0; i < properties.length; i++) {
            if (typeof document.body.style[properties[i]] != "undefined") {
                return properties[i];
            }
        }
        return null;
    }

    var boxshadow = ["boxShadow", "msBoxShadow", "webkitBoxShadow", "mozBoxShadow", "oBoxShadow"];

    var boxShadowProperty = getSupportedPropertyName(boxshadow);

// create dom elements here
    var instructionsTitleDiv = document.createElement("div");
    instructionsTitleDiv.style.zIndex = 1;
    instructionsTitleDiv.style.left = '0px';
    instructionsTitleDiv.style.top = '0px';
    instructionsTitleDiv.style.position = 'absolute';
    instructionsTitleDiv.style.border = instructions.title.border;
    instructionsTitleDiv.style.color = instructions.title.color;
    instructionsTitleDiv.style.fontFamily = instructions.title.fontFamily;
    instructionsTitleDiv.style.fontSize = instructions.title.fontSize;
    instructionsTitleDiv.style.fontWeight = instructions.title.fontWeight;
    instructionsTitleDiv.style.background = instructions.title.background;
    instructionsTitleDiv.style.padding = instructions.title.padding;
    instructionsTitleDiv.style.height = instructions.title.height;
    instructionsTitleDiv.style.width = instructions.title.width;
    instructionsTitleDiv.innerHTML = instructions.title.text;

    var instructionsDiv = document.createElement("div");
    // hard coded settings for instructions overlay
    instructionsDiv.style.zIndex = 100000;
    instructionsDiv.style.position = "fixed";
    instructionsDiv.style.display = "block";
    instructionsDiv.style.textAlign = "left";

    // configurable settings for instructions overlay
    instructionsDiv.style.cursor = instructions.cursor;
    instructionsDiv.style.border = instructions.border;
    instructionsDiv.style.lineHeight = instructions.lineHeight;
    instructionsDiv.style.fontSize = instructions.fontSize;
    instructionsDiv.style.color = instructions.color;
    instructionsDiv.style.fontFamily = instructions.fontFamily;
    instructionsDiv.style.left = instructions.left;
    instructionsDiv.style.top = instructions.top;
    instructionsDiv.style.background = instructions.background;
    instructionsDiv.style.width = instructions.width;
    instructionsDiv.style.padding = instructions.padding;
    instructionsDiv.innerHTML = instructions.text;

    // add boxshadow
    instructionsDiv.style[boxShadowProperty] = instructions.boxShadow;

    // add instruction title div
    instructionsDiv.appendChild(instructionsTitleDiv);

    document.body.appendChild(instructionsDiv);

    $(instructionsDiv).draggable({ opacity: 0.35 });

};

/* example use */
// var instructions = new instructionOverlay('Click & drag mouse to adjust view<br>Press a key<br>Audio is generated on the fly', '300px');
// var instructions2 = new instructionOverlay('some other text here<br>test');

