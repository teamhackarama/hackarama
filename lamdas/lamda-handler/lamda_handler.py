from __future__ import print_function

# --------------- Helpers that build all of the responses ----------------------

def build_speechlet_response(title, output, reprompt_text, should_end_session):
    return {
        'outputSpeech': {
            'type': 'PlainText',
            'text': output
        },
        'card': {
            'type': 'Simple',
            'title': "SessionSpeechlet - " + title,
            'content': "SessionSpeechlet - " + output
        },
        'reprompt': {
            'outputSpeech': {
                'type': 'PlainText',
                'text': reprompt_text
            }
        },
        'shouldEndSession': should_end_session
    }


def build_response(session_attributes, speechlet_response):
    return {
        'version': '1.0',
        'sessionAttributes': session_attributes,
        'response': speechlet_response
    }


# --------------- Functions that control the skill's behavior ------------------

def get_welcome_response():
    session_attributes = {}
    card_title = "Welcome"
    speech_output = "Welcome to Flash Feedback!"
    reprompt_text = "Please tell me your feedback by saying, " \
                    "my feedback for pizza hut is pizza was great."
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


def handle_session_end_request():
    card_title = "Session Ended"
    speech_output = "Thank you for trying the Alexa Skills Kit sample. " \
                    "Have a nice day! "
    # Setting this to true ends the session and exits the skill.
    should_end_session = True
    return build_response({}, build_speechlet_response(
        card_title, speech_output, None, should_end_session))


def process_feedback(intent, session):
    card_title = intent['name']
    session_attributes = {}

    feedbackItemValue = None
    feedbackTargetValue = None

    slots = intent['slots']
    
    if 'FeedbackItem' in slots:
        feedbackItem = slots['FeedbackItem']
        if 'value' in feedbackItem:
            feedbackItemValue = feedbackItem['value']

    if 'FeedbackTarget' in slots:
        feedbackTarget = slots['FeedbackTarget']
        if 'value' in feedbackTarget:
            feedbackTargetValue = feedbackTarget['value']
   
    if feedbackItemValue is None or feedbackTargetValue is None:
        should_end_session = False
        speech_output = "I didn't understand your feedback, please say it again."
        reprompt_text = "I didn't understand which company you are giving feedback on"
        return build_response(session_attributes, build_speechlet_response(
            card_title, speech_output, reprompt_text, should_end_session))

    should_end_session = True
    speech_output = "Thanks for giving feedback on " + feedbackTargetValue
    reprompt_text = "I didn't understand which company you are giving feedback on"
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


# --------------- Events ------------------

def on_session_started(session_started_request, session):
    print("on_session_started requestId=" + session_started_request['requestId']
          + ", sessionId=" + session['sessionId'])


def on_launch(launch_request, session):
    print("on_launch requestId=" + launch_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    return get_welcome_response()


def on_intent(intent_request, session):
    print("on_intent requestId=" + intent_request['requestId'] +
          ", sessionId=" + session['sessionId'])

    intent = intent_request['intent']
    intent_name = intent_request['intent']['name']

    # Dispatch to your skill's intent handlers
    if intent_name == "FeedbackIntent":
        return process_feedback(intent, session)
    elif intent_name == "AMAZON.HelpIntent":
        return get_welcome_response()
    elif intent_name == "AMAZON.CancelIntent" or intent_name == "AMAZON.StopIntent":
        return handle_session_end_request()
    else:
        raise ValueError("Invalid intent")


def on_session_ended(request, session):
    print("on_session_ended requestId=" + request['requestId'] + ", sessionId=" + session['sessionId'])


# --------------- Main handler ------------------

def lambda_handler(event, context):
    request = event['request']
    session = event['session']
    requestType = request['type']

    if event['session']['new']:
        on_session_started({'requestId': request['requestId']}, session)

    if requestType == "LaunchRequest":
        return on_launch(request, session)
    elif requestType == "IntentRequest":
        return on_intent(request, session)
    elif requestType == "SessionEndedRequest":
        return on_session_ended(request, session)
