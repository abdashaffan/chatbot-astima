from tesaurus import tesaurus as tes
import kmp

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

if __name__ == '__main__':
	while(1):
		str = input("Masukkan string : ")
		pattern = input("Masukkan pattern : ")
		strBaku = ubahKataBaku(pattern,str)
		print(strBaku)
		if(kmp.kmp_ext(strBaku,pattern) == -1):
			print("Tidak terjadi kecocokan")
		else:
			print("Nice COCOK !")