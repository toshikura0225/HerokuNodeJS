# header comment

from serial import Serial

com = Serial(
  port=0,
  baudrate=9600,
  bytesize=8,
  parity='N',
  stopbits=1,
  timeout=None,
  xonxoff=0,
  rtscts=0,
  writeTimeout=None,
  dsrdtr=None)
print(com.portstr)
com.write(b"\x04")
com.write("00ZZ")
com.write(b"\x05")

print(com.read(200))

com.close()