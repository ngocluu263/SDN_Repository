import select
import paramiko
import sys
import time
import odltestconfig as config

timestamp=sys.argv[1]

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(config.vmip,port=2222, username=config.vmusername, password=config.vmpassword)

print "connected successfully!"
exitcode=1
sftp = ssh.open_sftp()
print sftp
sftp.put('c://RemoteExecution/runODLTest.py','/home/vagrant/wcbench/runODLTest.py' )
sftp.put('c://RemoteExecution/odltestconfig.py','/home/vagrant/wcbench/odltestconfig.py' )

print "copied successfully!"
stdin,stdout,stderr= ssh.exec_command("cd /home/vagrant/wcbench/; python /home/vagrant/wcbench/runODLTest.py")
remotelog=open("c://RemoteExecution/remotelog.txt","w")
while not stdout.channel.exit_status_ready():
    # Only print data if there is data to read in the channel
    if stdout.channel.recv_ready():
        rl, wl, xl = select.select([stdout.channel], [], [], 0.0)
        if len(rl) > 0:
            # Print data from stdout
            print '-------------------------------'
            print stdout.channel.recv(1024)
            remotelog.write(stdout.channel.recv(1024)) 
            print '-------------------------------'

stdin2,stdout2,stderr2=ssh.exec_command('test -e /home/vagrant/results.csv; echo $?')
r=stdout2.readlines()
print "Result file found: "+r[0].strip("\n")
if r[0].strip("\n") =="0" :
    print "Results.csv created..copying the same back to local server."
    sftp.get('/home/vagrant/results.csv','c://RemoteExecution/results.csv')
    print "Results.csv file is copied to local server"
    stdin3,stdout3,stderr3=ssh.exec_command("cd /home/vagrant/wcbench ;python stats.py -g flows ram")
    exitcode=5
    if "graph file created\n" in stdout3.readlines():
        sftp.get('/home/vagrant/results.png','C:/Users/test/Desktop/ODL/ODLPerformance/WebContent/images/results'+timestamp+'.png')
        print "Graph file is downloaded to local server"
        exitcode=5
        
        
    
else:
    print "Results.csv not created.No file to copy back."


#sftp.get('/home/vagrant/results.csv','c://RemoteExecution/results.csv')
sftp.close()
ssh.close()
time.sleep(9)
sys.exit(exitcode)
