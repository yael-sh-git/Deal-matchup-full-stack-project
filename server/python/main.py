from flask import Flask, request, jsonify
from googletrans import Translator
import spacy



# Load the English NLP model from spaCy
nlp = spacy.load("en_core_web_sm")
app = Flask(__name__)


# תרגום
def translate_text(text):
    translator = Translator()
    translated_text = translator.translate(text, src='he', dest='en')
    return translated_text.text


@app.route('/translate', methods=['POST'])
def translate():
    request_data = request.get_json()
    text_to_translate = request_data['text']
    translated_text = translate_text(text_to_translate)
    return jsonify({'translated_text': translated_text})


# # 2

def extract_compound_nouns(doc):
    # Extract compound nouns from the document
    compound_nouns = []
    for token in doc:
        if token.dep_ == 'compound' and token.head.pos_ == 'NOUN':
            compound_noun = token.lemma_.lower() + ' ' + token.head.lemma_.lower()
            compound_nouns.append((compound_noun, 'NOUN'))
    return compound_nouns


# def extract_combinations(doc):
#     # Extract combinations of words that form phrases
#     combinations = []
#     for i in range(len(doc) - 1):
#         for j in range(i + 1, len(doc)):
#             phrase = doc[i:j + 1]
#             combination = ' '.join(token.text.lower() for token in phrase)
#             combinations.append((combination, 'NOUN'))  # Assign "NOUN" as the default type for combinations
#     return combinations


def extract_complex_words(doc):
    # Extract complex words that are not compound nouns
    complex_words = []
    for token in doc:
        if token.pos_ == 'NOUN' and token.head.pos_ != 'NOUN':
            complex_word = token.head.lemma_.lower() + ' ' + token.lemma_.lower()
            complex_words.append((complex_word, 'NOUN'))
    return complex_words


@app.route('/tag-words', methods=['POST'])
def tag_words():
    # Get the sentence from the request
    data = request.json
    sentence = data['sentence']

    # Process the sentence using spaCy
    doc = nlp(sentence)

    # Extract individual words and lemmatize them
    individual_words = [(token.lemma_.lower(), token.pos_) for token in doc if
                        token.pos_ != 'DET']  # Exclude determiners
    individual_words = list(set(individual_words))  # Remove duplicate entries

    # Extract compound nouns
    compound_nouns = extract_compound_nouns(doc)

    # Extract combinations of words that form phrases
    # combinations = extract_combinations(doc)

    # Extract complex words
    complex_words = extract_complex_words(doc)

    tagged_words = []
    for word, pos in individual_words:
        # Check if the token's POS is either NOUN, PROPN, ADJ, or VERB
        if pos in ['NOUN', 'PROPN', 'VERB', 'ADJ']:
            tagged_words.append((word, pos))

    # Combine all extracted words and phrases
    tagged_words += compound_nouns + complex_words

    # Return the tagged words as JSON response
    return jsonify(tagged_words)
    # return tagged_words

nlp = spacy.load('en_core_web_lg')

#מודל לסיווג הטקסט
def classify_sentence(categories_list, sentence):
    category_names = [category['name'] for category in categories_list if 'name' in category]
    categories = nlp(' '.join(category_names))
    sent = nlp(sentence)

    max_similarity = 0
    best_category = None

    for i, category in enumerate(categories):
        sum_similarity = 0
        num_words = 0

        for word in sent:
            sum_similarity += word.similarity(category)
            num_words += 1

        avg_similarity = sum_similarity / num_words if num_words > 0 else 0

        if avg_similarity > max_similarity:
            max_similarity = avg_similarity
            best_category = categories_list[i]

    return best_category


@app.route('/classify', methods=['POST'])
def classify_api():
    data = request.get_json()
    categories_list = data.get('categories', [])
    sentence = data.get('sentence', '')

    if not categories_list or not sentence:
        return jsonify({'error': 'Categories list and sentence are required'}), 400

    best_category = classify_sentence(categories_list, sentence)

    return jsonify(best_category)



if __name__ == '__main__':
    # text = "מזגן של חברת תדיראן"
    # text=translate_text("מכשירי חשמל")
    # print(text)
    # print(tag_words(text))
    app.run(debug=True)

# # 1

# text = "I am Looking for AIR conditioner"
    # print(tag_words(text))
    # main()


#
# def extract_words(text):
#     # Process the text using the spaCy NLP model
#     doc = nlp(text)
#
#     # Initialize a list to store extracted words
#     extracted_words = []
#
#     # Iterate over the entities identified by spaCy
#     for ent in doc.ents:
#         # Check if the entity is recognized as a city in Israel
#         if ent.text in known_cities_israel:
#             extracted_words.append((ent.text, 'CITY'))
#
#     # Iterate over the tokens in the document
#     for token in doc:
#         # Check if the token is not a city and is a noun, adjective, or number
#         if token.text not in known_cities_israel and token.pos_ in ['NOUN', 'ADJ', 'NUM']:
#             # Lemmatize the token to its base form (singular)
#             lemma = token.lemma_
#             # Append the lemma to the extracted words list
#             extracted_words.append((lemma, token.pos_))
#
#     return extracted_words
#
#
# # @app.route('/extract-words', methods=['POST'])
# def handle_extract_words(text):
#     # data = request.json
#     # text = data['text']
#     extracted_words = extract_words(text)
#     # return jsonify(extracted_words)
#     return extracted_words
#
#
