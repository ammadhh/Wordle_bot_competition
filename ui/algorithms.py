# contains your implementation of algorithms

import random
from utility import *
# TESTING BELOW 
# def calculate_entropies(words, valid_solutions, pattern_dict):
#     """Calculate the entropy for every word in `words`, taking into account
#     the remaining `possible_words`"""
#     entropies = {}
#     for word in words:
#         counts = []
#         for matches in pattern_dict[word].values():
#             num_matches = len(matches.intersection(possible_words))
#             counts.append(num_matches)
#         entropies[word] = entropy(counts)
#     return entropies
# # TESTING HERE 

# List which returns remaining possible Guesses
def remaining_possible_guesses(current_guesses, guess_feedback, valid_solutions):
    remaining_solutions = []
    if(len(current_guesses) == 0):
        return None
    # print("Cur Guess", "Feedback", current_guesses, guess_feedback)

    for word in valid_solutions:
        current_word_feedback = generate_feedback(current_guesses, word)
        if current_word_feedback == guess_feedback[-1]:
            remaining_solutions.append(word)

    return remaining_solutions

# referred to as the brute force algorithm in week 2 slides
# idea here is to only limit solution space to words that match the feedback pattern of your most recent guess WHEN COMPARED WITH THE SOLUTION
def only_matched_patterns(current_guesses, guess_feedback, valid_solutions):
    remaining_solutions = []
    for word in valid_solutions:
        current_word_feedback = generate_feedback(current_guesses[-1], word)
        if current_word_feedback == guess_feedback[-1]:
            remaining_solutions.append(word)
    return random.choice(remaining_solutions)

# uses letter frequency and feedback weighing as discussed in the week 2 slides
# extended by normalizing with the length of filtered_guesses and the number of occurrences of a letter in a word
# these help to make choosing a value for weighing easier and prevent words with lots of duplicates like EERIE from being favored
def letter_frequency(current_guesses, guess_feedback, filtered_guesses):
    # build letter frequency dictionary
    frequencies = {}
    for word in filtered_guesses:
        for i in range(WORD_LENGTH):
            if frequencies.get(word[i]) is None:
                frequencies[word[i]] = 1
            else:
                frequencies[word[i]] += 1

    # need to do the bottom two in separate for loops because a letter could not yet be in correct, but will be in the future.
    # if you get to the same letter but it's misplaced, then it will be doubly added to correct and misplaced
    correct = set()
    for i in reversed(range(len(current_guesses))):
        for j in range(WORD_LENGTH):
            if guess_feedback[i][j] == "C":
                correct.add(current_guesses[i][j])

    misplaced = set()
    for i in reversed(range(len(current_guesses))):
        for j in range(WORD_LENGTH):
            if guess_feedback[i][j] == "M" and current_guesses[i][j] not in correct:
                misplaced.add(current_guesses[i][j])

    # generate the sum of letter frequencies for all words left in the solution space
    solution_values = {
        # sum_frequency: [words]
    }

    weighing = 0.5
    for word in filtered_guesses:
        # normalize by # of duplicate letters
        word_letters = {}
        for i in word:
            if word_letters.get(i) is None:
                word_letters[i] = 1
            else:
                word_letters[i] += 1

        current_freq_sum = 0
        for i in range(WORD_LENGTH):
            # normalize the contribution of each letter by # of occurences in the word to prevent options like EERIE
            # also normalize by length of filtered_guesses
            current_freq_sum += frequencies[word[i]] / word_letters[word[i]] / len(filtered_guesses)

            if word[i] in correct:
                current_freq_sum += weighing * 1.5
            elif word[i] in misplaced:
                current_freq_sum += weighing
        current_freq_sum = round(current_freq_sum, 2)
        if solution_values.get(current_freq_sum) is None:
            solution_values[current_freq_sum] = [word]
        else:
            solution_values[current_freq_sum].append(word)
    if len(solution_values) == 0:
        return "ERROR"
    # get the words with the same sum of letter frequencies and choose a random one
    best_solutions = solution_values[max([float(i) for i in solution_values.keys()])]
    return random.choice(best_solutions)
