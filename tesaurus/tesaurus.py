# ==================================================
# Written in March 2016 by Victoria Anugrah Lestari
# ==================================================
import json
from kbbi import KBBI
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

arrStopword = ["itu","sih"]
# ==================================================
# Membaca dictionary dari json
# ==================================================
def load(filename):	
	with open(filename) as data_file:
		data = json.load(data_file)	

	return data

# load dictionary
mydict = load('tesaurus/dict.json')

# ==================================================
# Mencari sinonim suatu kata
# ==================================================
def getSinonim(word):
	if word in mydict.keys():
		return mydict[word]['sinonim']
	else:
		return []

# ==================================================
# Mencari antonim suatu kata
# ==================================================
def getAntonim(word):
	if word in mydict.keys():
		if 'antonim' in mydict[word].keys():
			return mydict[word]['antonim']

	return []

def word_count(str):
    counts = dict()
    words = str.split("*")

    for word in words:
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1

    return counts

def getKataDasar(str):
	factory = StemmerFactory()
	stemmer = factory.create_stemmer()
	return stemmer.stem(str)

def removeStopwords(str):
	for stopword in arrStopword:
		str = str.replace(stopword,"")
	str = str.replace("  "," ")
	return str