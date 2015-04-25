# header comment

from serial import Serial

serialWrite( [10, 20, 30, 40, 50]);

@webiopi.macro
def serialWrite( sendData ):
	
	com = Serial(
		port="/dev/ttyUSB0",
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
	
	for b in sendData:
	 	com.write(b)
	
	#com.write(b"\x04")
	#com.write("00ZZ")
	#com.write(b"\x05")
	
	readData = com.read(1000)
	print(len(readData))
	
	com.close()
	
	f = open("data.txt", "w")
	for var in readData:
		print("%s" % str(var))
		f.write("var=" + str(var))
	f.close()
	
	#return [10, 20, 30, 40, 50]
	return readData