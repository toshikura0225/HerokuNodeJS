# header comment

from serial import Serial

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
com.write(b"\x04")
com.write("00ZZ")
com.write(b"\x05")

data = com.read(1000)
print(len(data))

com.close()

f = open("data.txt", "w")
for var in data:
	print("%s" % str(var))
	f.write("var=" + str(var))
f.close()

@webiopi.macro
def serialWrite( data ):
	

	return [10, 20, 30, 40, 50]