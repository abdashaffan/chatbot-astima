class lastOccurrence(object):
    def __init__(self, pattern, alphabet):
        self.occurrences = dict()
        length = len(pattern)-1
        for letter in alphabet:
            i = length
            while i>=0 and pattern[i]!=letter: # iterate from last element
                i-=1
            self.occurrences[letter] = i  # -1 if the letter isn't inside the pattern
            # self.occurrences[letter] = pattern.rfind(letter)

    def __call__(self, letter):
        return self.occurrences[letter]

    def print(self):
        print("Here's the dict : ")
        print(self.occurrences)

def boyer_moore(text, pattern):
    print("masuk",text,pattern)
    alphabet = set(text)
    last = lastOccurrence(pattern, alphabet)
    # last.print()
    m = len(pattern)
    n = len(text)
    i = m - 1  # text index
    j = m - 1  # pattern index
    # print("Mat:   "+'.'*(i-m+1)+pattern)
    while i < n:
        if text[i] == pattern[j]:
            if j == 0:
                return i
            else:
                i -= 1
                j -= 1
        # elif text[i] == '*':
        #     j-=1
        else:
            l = last(text[i])
            i = i + m - min(j, 1+l)
            # print("i index = ",i)
            # print("Mat:   "+'.'*(i-m+1)+pattern)
            j = m - 1 
    return -1


'''
if __name__ == '__main__':
        
    def show_match(text, pattern):
        # print 'Text:  %s' % text
        print("Text:  "+text)
        p = boyer_moore(text, pattern)
        # print 'Match: %s%s' % ('.'*p, pattern)
        print("Match: "+'.'*p+pattern)

    text = 'abacaabadcabacabaabb'
    pattern = 'abacab'
    show_match(text, pattern)
    print

#     text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
#     pattern = 'dolor'
#     show_match(text, pattern)
# show_match(text, pattern + 'e')
'''