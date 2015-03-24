#ifndef DigitalInputPin_h
#define DigitalInputPin_h


class DigitalInputPin
{
	public:
		DigitalInputPin(int argNumber);
		DigitalInputPin(int argNumber, int argKeepingConstant);
		int GetState();
		int IsShifted();
		int IsShifted(int argKeepingConstant);
		
	protected:
		int pinNumber;
		int keepingConstant;
		int keepingCount;
		int keepingState;
		int preKeepingState;
		void init(int argNumber, int argKeepingConstant);
};

#endif
