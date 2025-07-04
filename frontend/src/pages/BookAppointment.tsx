import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Scissors, ArrowLeft, ArrowRight } from 'lucide-react';
import { mockBarbers, mockSpecialties, generateTimeSlots } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const selectedServiceData = mockSpecialties.find(s => s.id === selectedService);
  const selectedBarberData = mockBarbers.find(b => b.id === selectedBarber);
  const availableBarbers = selectedService 
    ? mockBarbers.filter(barber => barber.specialties.includes(selectedService))
    : [];

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return days;
  };

  const timeSlots = selectedDate && selectedBarber 
    ? generateTimeSlots(selectedDate, selectedBarber)
    : [];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmBooking = () => {
    toast({
      title: "Appointment booked!",
      description: `Your ${selectedServiceData?.name} appointment with ${selectedBarberData?.name} is confirmed for ${selectedDate} at ${selectedTime}.`,
    });
    navigate('/dashboard');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedService;
      case 2: return selectedBarber;
      case 3: return selectedDate && selectedTime;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Book Your Appointment</h1>
        <p className="text-muted-foreground">Follow the steps to schedule your visit</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNum <= step 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-12 h-0.5 ${
                  stepNum < step ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {step === 1 && <><Scissors className="h-5 w-5 text-primary" /> Choose Service</>}
            {step === 2 && <><User className="h-5 w-5 text-primary" /> Select Barber</>}
            {step === 3 && <><Calendar className="h-5 w-5 text-primary" /> Pick Date & Time</>}
            {step === 4 && <><Clock className="h-5 w-5 text-primary" /> Confirm Booking</>}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Select the service you'd like to book"}
            {step === 2 && "Choose your preferred barber"}
            {step === 3 && "Select your preferred date and time"}
            {step === 4 && "Review and confirm your appointment details"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockSpecialties.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedService === service.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/20'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{service.name}</h3>
                      <Badge variant="secondary">${service.price}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {service.duration} minutes
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 2: Barber Selection */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableBarbers.map((barber) => (
                <Card 
                  key={barber.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBarber === barber.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/20'
                  }`}
                  onClick={() => setSelectedBarber(barber.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{barber.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {barber.age} years old • Since {new Date(barber.hireDate).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <h3 className="font-semibold mb-3">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {getNext7Days().map((day) => (
                    <Button
                      key={day.date}
                      variant={selectedDate === day.date ? "default" : "outline"}
                      className="h-auto p-3 flex flex-col"
                      onClick={() => setSelectedDate(day.date)}
                    >
                      <span className="text-xs">{day.display.split(',')[0]}</span>
                      <span className="text-sm font-medium">{day.display.split(' ')[1]} {day.display.split(' ')[2]}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="font-semibold mb-3">Select Time</h3>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-muted/20 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Appointment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">{selectedServiceData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Barber:</span>
                    <span className="font-medium">{selectedBarberData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{selectedServiceData?.duration} minutes</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold text-primary">${selectedServiceData?.price}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            {step < 4 ? (
              <Button 
                variant="golden"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="golden"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAppointment;