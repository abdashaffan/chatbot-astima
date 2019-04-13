
def next_ext(str):
       leng = len(str)
       if (leng < 0):
              return []
       next = [0 for i in range (leng + 1)]
       ##treated like str[-1] is a '*'
       i = -1
       off = i
       j = off
       i = i+1
       next[i] = off
       while(i < leng):
              if (str[i] == '*' ): ##consistent with the above comment.
                     off = i
                     j = off 
                     i = i+1
                     next[i] = off
              elif (j == off or str[i] == str[j] or str[j] == '.'):
                     i = i+1
                     j = j+1
                     next[i] = j
              else:
                     j = next[j]
       return next

##if matched, return the last position of the first matched substring of the string, else return -1.
def kmp_ext(str,pattern):
       str_len = len(str)
       pattern_len = len(pattern)
       nexts = []
       nexts = next_ext(pattern)
       i = 0
       j = -1 
       off = j ## treated like pattern[-1] is a '*'
       j = j+1
       while(i < str_len and j < pattern_len):
              if (j != off and pattern[j] == '*' ):
                     off = j
                     j = j+1 ##consistent with the above comment
              elif( j == off or str[i] == pattern[j] or pattern[j] == '.'):
                     j = j+1
                     i = i+1
              else:
                     j = nexts[j]
       if(j == pattern_len):
              return i
       else:
              return -1