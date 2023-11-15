# contains utility functions and other useful things

WORD_LENGTH = 5
NUM_GUESSES = 6

# checks if a guess is valid. Current guess has to be WORD_LENGTH in length, all letters, and in valid_guesses
def is_valid_guess(current_guess: str, VALID_GUESSES) -> bool:
    return len(current_guess) == WORD_LENGTH and current_guess.isalpha() and current_guess.upper() in VALID_GUESSES


# generates feedback for current guess
def generate_feedback(current_guess, current_solution):
    # print("Current Guess", current_guess, "Solution", current_solution)
    # using an array because strings are immutable in Python
    feedback = ["W"] * WORD_LENGTH
    # create a dictionary mapping letters to num_occurences for current_solution for words with multiple of the same letter
    # e.g. solution is GROWS, guess is GOOSE, the middle O should have C and the first O should be W
    solution_letters = {}
    for i in current_solution:
        if solution_letters.get(i) is None:
            solution_letters[i] = 1
        else:
            solution_letters[i] += 1

    # need to iterate through the entire word for correct letters first before generating misplaced letters, see example above.
    for i in range(WORD_LENGTH):
        if current_guess[i] == current_solution[i]:
            feedback[i] = "C"
            # modify solution_letters as well to prevent the wrong feedback from being generated, see example above.
            solution_letters[current_guess[i]] -= 1

    for i in range(WORD_LENGTH):
        if current_guess[i] != current_solution[i] and current_guess[i] in current_solution and solution_letters[current_guess[i]] > 0:
            feedback[i] = "M"
            solution_letters[current_guess[i]] -= 1

    # feedback is default initialized to W, so no need to update feedback for this

    return "".join(feedback)


# takes in the current guesses and guess feedback and returns a filtered list of valid_guesses
def filter_on_feedback(current_guesses, guess_feedback, VALID_GUESSES):
    # disregard green tiles, handle that separately. If green tiles are used to filter the list of valid_guesses,
    # guesses may not be great. E.g. GREEN returns CCCMW, if you limit the guessing space to words starting with GRE,
    # it's hard to eliminate other letters as there are only 2 more spots left
    # We will let individual algorithms handle what to do with the green tiles

    filtered_guesses = []

    # keeps an array of all letters that shouldn't be in that position
    # this means either letters that are wrong (these letters should be added to all letter positions)
    # or letters that are misplaced for this position
    letter_not_in_position = [set() for i in range(WORD_LENGTH)]
    # helps in cases where a word has multiple of the same letter
    not_wrong_letters = set()

    # need separate for loops because words with multiple of the same letter would have that letter be propogated to all positions
    for guess, feedback in zip(current_guesses, guess_feedback):
        for i in range(WORD_LENGTH):
            if feedback[i] == "M":
                letter_not_in_position[i].add(guess[i])
                not_wrong_letters.add(guess[i])
            elif feedback[i] == "C":
                # read the description above for why we don't do anything else with correct letters
                not_wrong_letters.add(guess[i])
    for guess, feedback in zip(current_guesses, guess_feedback):
        for i in range(WORD_LENGTH):
            if feedback[i] == "W":
                if guess[i] in not_wrong_letters:
                    letter_not_in_position[i].add(guess[i])
                else:
                    # propagate to all positions, since letter cannot be in word at all
                    for j in range(WORD_LENGTH):
                        letter_not_in_position[j].add(guess[i])

    # now go through the list of guesses and append to filtered guesses if no letters in word at that position are in letter_not_in_position
    for word in VALID_GUESSES:
        valid = True
        for i in range(WORD_LENGTH):
            if word[i] in letter_not_in_position[i]:
                valid = False
                break
        if valid:
            filtered_guesses.append(word)

    return filtered_guesses