import twitter
import sys




# Verifies twitter api account works
api = twitter.Api(consumer_key='01cakDvOdyw9ytVgVgA2e1loV',
                      consumer_secret='57Mmg8pz20J8NfFf3cL5QkiFw1gGBDL2nPgf4Dbj7J6daUaXTA',
                      access_token_key='4700491069-O7FycZmg158kJuGLALlLTBJ5CuTmi98mGs5vZ08',
                      access_token_secret='Em1V2RG2vXsMFtQNPuTM4bHPsehFnSNpi0yz0AsXx8eGF')






if __name__ == "__main__":
    #print(api.VerifyCredentials())
    #loop over command line args
    #used for flipping api scrapers on and off ect...
    for k in sys.argv:
      print(k)
      if k == "twitter":
        #do twitter
        #
      elif k == "guidebox":
        #do guidebox
        #
      elif k == "imdb"
        #do imdb
        #


