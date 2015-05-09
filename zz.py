# header comment

from serial import Serial
import webiopi


@webiopi.macro
def serialWrite( sendData ):
	webiopi.setDebug()
	webiopi.debug("came")
	f = open("data.txt", "w")
	f.write(sendData)
	f.close()
	return 4444
def abc(sendData):
	com = Serial(
		port="/dev/ttyACM0",
		baudrate=9600,
		bytesize=8,
		parity='N',
		stopbits=1,
		timeout=1,
		xonxoff=0,
		rtscts=0,
		writeTimeout=1000,
		dsrdtr=None)
	print(com.portstr)
	
	#for bt in sendData:
	#	com.write(bytes([bt]))	

	#com.write(sendData)
	#com.write(b"\x04")
	#com.write("00ZZ")
	#com.write(b"\x05")
	
	readData = com.read(1000)
	#print(len(readData))
	
	com.close()
	
	f = open("data.txt", "w")
	for var in readData:
		print("%s" % str(var))
		f.write("var=" + str(var))
	f.close()
	
	#return [10, 20, 30, 40, 50]
	return readData

#abc = [10, 20, 30, 40, 50]
#serialWrite(abc)