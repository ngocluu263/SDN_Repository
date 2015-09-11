import odltestconfig as conf
import subprocess
import os
#cmd="./loop_wcbench.sh"
if __name__ == "__main__":
        if os.path.isfile("../results.png"):
                os.remove("../results.png")
        if os.path.isfile("../results.csv"):
                os.remove("../results.csv")
        
        args=["./loop_wcbench.sh","-s",str(conf.numberofswitches),"-t",str(conf.runduration),"-p",str(conf.numberofprocessors)]
        if conf.restartodl=="Yes":
                args=args+["-r",str(conf.numberofruns)]
        else:
                args=args+["-l",str(conf.numberofruns)]
        subprocess.call(args)
