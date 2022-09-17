---
layout: article
title:  "C++ 시리얼 통신"
categories: nothing
---

아두이노는 시리얼 통신을 통해 데이터를 주고 받을 수 있습니다, 따라서 C++를 이용하여 아두이노와 데이터를 주고 받는 프로그램을 작성할 수 있습니다

먼저 아래와 같은 클래스를 만들어줍니다
{% highlight c++ %}
class Serial {
	private:
		HANDLE hSerial;
		bool connected;
		COMSTAT status;
		DWORD errors;

	public:
		Serial(const char* portName);
		~Serial();
		int ReadData(char* buffer, unsigned int nbChar, string& temp, queue<DATA>& q);
		bool SendData(const char buffer);
		bool isConnected();
};
{% endhighlight %}

{% highlight c++ %}
Serial::Serial(const char* portName) {
	this->connected = false;
	this->hSerial = CreateFileA(portName, GENERIC_READ | GENERIC_WRITE, 0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
	if (this->hSerial == INVALID_HANDLE_VALUE) {
		if (GetLastError() == ERROR_FILE_NOT_FOUND) {
			printf("Error: %s not available\n", portName);
		}
		else {
			printf("Error \n");
		}
	}
	else {
		DCB dcbSerialParams = { 0 };
		if (!GetCommState(this->hSerial, &dcbSerialParams)) {
			printf("failed to get current serial parameters!");
		}
		else {
			dcbSerialParams.BaudRate = CBR_19200;
			dcbSerialParams.ByteSize = 8;
			dcbSerialParams.StopBits = ONESTOPBIT;
			dcbSerialParams.Parity = NOPARITY;
			dcbSerialParams.fDsrSensitivity = DTR_CONTROL_ENABLE;
			if (!SetCommState(this->hSerial, &dcbSerialParams)) {
				printf("Could not set Serial port parameters");
			}
			else {
				this->connected = true;
				PurgeComm(this->hSerial, PURGE_RXCLEAR | PURGE_TXCLEAR);
				Sleep(ARDUINO_WAIT_TIME);
			}
		}
	}
}
{% endhighlight %}
