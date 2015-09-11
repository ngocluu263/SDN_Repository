import select
import paramiko
import sys
import odltestconfig as config
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(config.vmip,port=2222, username=config.vmusername, password=config.vmpassword)

print "connected successfully!"

sftp = ssh.open_sftp()
print sftp
sftp.put('c://RemoteExecution/runODLTest.py','/home/vagrant/wcbench/runODLTest.py' )
sftp.put('c://RemoteExecution/odltestconfig.py','/home/vagrant/wcbench/odltestconfig.py' )
sftp.close()
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

#remotelog=open("c://RemoteExecution/remotelog.txt","w")
#remotelog.write(stdout.readlines())

sftp.get('/home/vagrant/wcbench/results.csv','c://RemoteExecution/results.csv')

ssh.close()
sys.exit(5)
