/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.444e05b4-3418-4cf2-a4b9-ff2ac7bae3b5"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "A year on Mercury is just 88 days long.",
    "Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
    "Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.",
    "On Mars, the Sun appears about half the size as it does on Earth.",
    "Earth is the only planet not named after a god.",
    "Jupiter has the shortest day of all the planets.",
    "The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
    "The Sun contains 99.86% of the mass in the Solar System.",
    "The Sun is an almost perfect sphere.",
    "A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
    "Saturn radiates two and a half times more energy into space than it receives from the sun.",
    "The temperature inside the Sun can reach 15 million degrees Celsius.",
    "The Moon is moving approximately 3.8 cm away from our planet every year."    
    ];

var CHATS = [
    "What's your favorite thing about space? Mine is space.",
    "Space going to space can't wait.",
    "Space...",
    "Space. Trial. Puttin' the system on trial. In space. Space system. On trial. Guilty. Of being in space! Going to space jail!",
    "Dad! I'm in space! I'm proud of you, son. Dad, are you space? Yes. Now we are a family again.",
    "Space space wanna go to space yes please space. Space space. Go to space.",
    "Space space wanna go to space.",
    "Space space going to space oh boy.",
    "Ba! Ba! Ba ba ba! Space! Ba! Ba! Ba ba ba!",
    "Oh. Play cool. Play cool. Here come the space cops. Here come the space cops.",
    "Help me, space cops. Space cops, help.",
    "Going to space going there can't wait gotta go. Space. Going.",
    "Better buy a telescope. Wanna see me. Buy a telescope. Gonna be in space.",
    "Space. Space.",
    "I'm going to space.",
    "Oh boy.",
    "Yeah yeah yeah okay okay.",
    "Space. Space. Gonna go to space.",
    "Space. Space. Go to space.",
    "Yes. Please. Space.",
    "Ba! Ba! Ba ba ba! Space!",
    "Ba! Ba! Ba ba ba! Space!",
    "Gonna be in space.",
    "Space.",
    "Space.",
    "Ohhhh, space.",
    "Wanna go to space. Space.",
    "Hmmhm.",
    "Let's go - let's go to space. Let's go to space.",
    "I love space. Love space.",
    "Atmosphere. Black holes. Astronauts. Nebulas. Jupiter. The Big Dipper.",
    "Orbit. Space orbit. In my spacesuit.",
    "Space...",
    "Ohhh, the Sun. I'm gonna meet the Sun. Oh no! What'll I say? 'Hi! Hi, Sun!' Oh, boy!",
    "Look, an eclipse! No. Don't look.",
    "Come here, space. I have a secret for you. No, come closer.",
    "Space space wanna go to space.",
    "Wanna go to -- wanna go to space.",
    "Space wanna go wanna go to space wanna go to space.",
    "I'm going to space.",
    "Space!",
    "Space!",
    "Hey hey hey hey hey!",
    "Hey.",
    "Hey.",
    "Hey!",
    "Hey.",
    "Hey!",
    "Hey lady.",
    "Lady.",
    "Space!",
    "Lady.",
    "Space.",
    "Gotta go to space. Lady. Lady.",
    "Oo. Oo. Oo. Lady. Oo. Lady. Oo. Let's go to space.",
    "Oh I know! I know I know I know I know I know - let's go to space!",
    "Oooh! Ooh! Hi hi hi hi hi. Where we going? Where we going? Hey. Lady. Where we going? Where we going? Let's go to space!",
    "Lady. I love space. I know! Spell it! S P... AACE. Space. Space.",
    "I love space.",
    "Hey lady. Lady. I'm the best. I'm the best at space.",
    "Oh oh oh oh. Wait wait. Wait I know. I know. I know wait. Space.",
    "Wait wait wait wait. I know I know I know. Lady wait. Wait. I know. Wait. Space.",
    "Gotta go to space.",
    "Gonna be in space.",
    "Oh oh oh ohohohoh oh. Gotta go to space.",
    "Space. Space. Space. Space. Comets. Stars. Galaxies. Orion.",
    "Are we in space yet? What's the hold-up? Gotta go to space. Gotta go to SPACE.",
    "Going to space.",
    "Yeah, yeah, yeah, I'm going. Going to space.",
    "Love space. Need to go to space.",
    "Space space space. Going. Going there. Okay. I love you, space.",
    "Space.",
    "So much space. Need to see it all.",
    "You are the farthest ever in space. Why me, space? Because you are the best. I'm the best at space? Yes.",
    "Space Court. For people in space. Judge space sun presiding. Bam. Guilty. Of being in space. I'm in space.",
    "Please go to space.",
    "Space.",
    "Wanna go to space.",
    "(excited gasps)",
    "Gotta go to space. Yeah. Gotta go to space.",
    "Hmmm. Hmmmmmm. Hmm. Hmmmmm. Space!",
    "Hey lady.",
    "Hey.",
    "Lady.",
    "Hey lady. Lady.",
    "Hey.",
    "Lady.",
    "Ohmygodohmygodohmygod! I'm in space!",
    "Space? SPACE!",
    "I'm in space!",
    "I'm in space.",
    "Where am I? Guess. Guess guess guess. I'm in space.",
    "There's a star. There's another one. Star. Star star star. Star.",
    "Getting bored of space.",
    "Bam! Bam bam bam! Take that, space.",
    "Are we in space?",
    "We are?",
    "Oh oh oh. This is space! I'm in space!",
    "We made it we made it we made it. Space!",
    "Earth.",
    "Wanna go to earth.",
    "Wanna go to earth wanna go to earth wanna go to earth wanna go to earth. Wanna go to earth.",
    "Wanna go home.",
    "Wanna go home wanna go home wanna go home wanna go home.",
    "Earth earth earth.",
    "Don't like space. Don't like space.",
    "It's too big. Too big. Wanna go home. Wanna go to earth.",
    "SPAAACCCCCE!",
    "SPAAACE!",
    "YEEEHAAAAAW!",
    "Ah!"
    ];


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Java
 Script/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceCore = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
    var speechOutput = "Space space wanna go to space yes please space. Space space. Go to space.";
    response.tell(speechOutput);
};
       
Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "GreetSpaceCoreIntent": function (intent, session, response) {
        handleNewChatRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Space! " + randomFact;
    var cardTitle = "Space Core Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

function handleNewChatRequest(response) {
    // Get a random quote when greeting Space Core
    var chatIndex = Math.floor(Math.random() * CHATS.length);
    var randomChat = CHATS[chatIndex];

    // Create speech output
    var speechOutput = randomChat;
    var cardTitle = "Space Core Chat";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the skill.
    var spaceCore = new SpaceCore();
    spaceCore.execute(event, context);
};

