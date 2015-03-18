#include "DigitalInputPin.h"

DigitalInputPin readPinON(2);
DigitalInputPin readPinOFF(3);

int ledPin = 13, ledCount = 0, SPEED = 1000;

int writePinON = 4;
int writePinOFF = 5;

//unsigned int data[] = {905,445,57,57,54,164,58,164,58,164,58,54,58,163,58,164,58,164,58,164,57,164,58,164,58,57,55,57,54,57,55,57,55,164,58,164,58,164,58,164,58,164,58,164,58,57,55,164,58,57,55,164,58,164,58,164,58,164,58,57,54,57,54,164,58,56,58,3390,905,444,58,54,58,164,58,164,58,164,58,56,55,164,58,164,58,164,60,162,58,164,58,164,58,57,54,57,55,57,55,54,57,164,58,164,58,56,55,164,57,54,58,54,57,57,55,54,57,54,58,164,58,164,58,164,58,164,61,51,57,57,55,164,58,58,55};

unsigned int DataON[] = {};
unsigned int DataOFF[] = {};

// セットアップ
void setup() {
	pinMode(ledPin, OUTPUT);
	pinMode(writePinON, OUTPUT);
	pinMode(writePinOFF, OUTPUT);
	Serial.begin(9600);
}
// dataから信号を送信
void sendON() {

	int dataSize = sizeof(DataON) / sizeof(DataON[0]);
	for (int cnt = 0; cnt < dataSize; cnt++) {
		unsigned long len = DataON[cnt]*10; // dataは10us単位でON/OFF時間を記録している
		unsigned long us = micros();
		do {

			digitalWrite(writePinON, 1 - (cnt&1)); // cntが偶数なら赤外線ON、奇数ならOFFのまま
			delayMicroseconds(8); // キャリア周波数38kHzでON/OFFするよう時間調整
			digitalWrite(writePinON, 0);
			delayMicroseconds(7);

		} while (long(us + len - micros()) > 0); // 送信時間に達するまでループ
	}
}

// dataから信号を送信
void sendOFF() {

	int dataSize = sizeof(DataOFF) / sizeof(DataOFF[0]);
	for (int cnt = 0; cnt < dataSize; cnt++) {
		unsigned long len = DataOFF[cnt]*10; // dataは10us単位でON/OFF時間を記録している
		unsigned long us = micros();
		do {

			digitalWrite(writePinOFF, 1 - (cnt&1)); // cntが偶数なら赤外線ON、奇数ならOFFのまま
			delayMicroseconds(8); // キャリア周波数38kHzでON/OFFするよう時間調整
			digitalWrite(writePinOFF, 0);
			delayMicroseconds(7);

		} while (long(us + len - micros()) > 0); // 送信時間に達するまでループ
	}
}

void loop() {


	if (readPinON.IsShifted() == HIGH)
	{
		Serial.write("ON");
		sendON();
	}
	else if(readPinOFF.IsShifted() == HIGH)
	{
		Serial.write("OFF");
		sendOFF();
	}


	ledCount++;
	if(ledCount >= SPEED)
	{
		digitalWrite(ledPin, HIGH);
		ledCount = -SPEED;
	}
	else if(ledCount == 0)
	{
		digitalWrite(ledPin, LOW);
	}
}
