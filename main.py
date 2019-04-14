from tesaurus import tesaurus as tes
import kmp
import json

def ubahKataBaku(pat,str):
	patWords = pat.split("*")
	strWords = str.split(" ")
	## get all kata dasar dari strWords and patWords
	for i,patWord in enumerate(patWords):
		## get all sinonim of patwords
		sinonims = tes.getSinonim(tes.getKataDasar(patWord))
		for sinonim in sinonims:
			for i,strWord in enumerate(strWords):
				strBaku = tes.getKataDasar(strWord)
				if(strBaku == tes.getKataDasar(sinonim)):
					strWords[i] = patWord
	return ' '.join(strWords)

def tambahKataTanya(str):
	daftarKata = ["apa","dimana","kapan","bagimana","mengapa","siapa"]
	for kata in daftarKata:
		if (str.find(kata) != -1):
			str.replace(kata+" ","")
			str = kata + " " + str
	return str

def generateJawaban(str):
	global faq
	persenMaks = 0
	jawaban = "Maaf Tidak Mengenali Pertanyaan Anda"
	for pat in faq:
		strBaku = ubahKataBaku(pat,str)
		isCocok = kmp.kmp_ext(strBaku,pat)
		# print(strBaku)
		if(isCocok != -1):
			# print(pat)
			persenPat = len(pat)/len(strBaku)
			if(persenPat > persenMaks):
				jawaban = faq[pat]
	return jawaban

if __name__ == '__main__':
	while(1):
		str = input("Ayo tanya apa : ")
		str = tambahKataTanya(str)
		# pattern = input("Masukkan pattern : ")
		# strBaku = ubahKataBaku(pattern,str)
		# print(strBaku)
		# if(kmp.kmp_ext(strBaku,pattern) == -1):
		# 	print("Tidak terjadi kecocokan")
		# else:
		# 	print("Nice COCOK !")
		faq = json.load(open("faq.json"))
		print(generateJawaban(str))
		print()
