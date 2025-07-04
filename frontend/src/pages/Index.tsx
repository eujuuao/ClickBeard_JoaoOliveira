import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scissors, Clock, Star, Users, Calendar, Shield } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book appointments in just a few clicks with real-time availability"
    },
    {
      icon: Users,
      title: "Expert Barbers",
      description: "Choose from our team of skilled and experienced barbers"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "8 AM to 6 PM daily with 30-minute time slots"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your bookings and personal information are always protected"
    }
  ];

  const services = [
    { name: "Classic Cut", price: 25, duration: "30 min" },
    { name: "Beard Trim", price: 20, duration: "30 min" },
    { name: "Full Service", price: 40, duration: "60 min" },
    { name: "Hot Towel Shave", price: 35, duration: "45 min" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Scissors className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ClickBeard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium barbershop experience with convenient online booking. 
            Your style, your schedule, your way.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="golden" size="lg" asChild>
            <Link to="/signup">
              <Scissors className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/login">
              Sign In
            </Link>
          </Button>
        </div>

        <div className="flex justify-center items-center gap-6 pt-8">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary fill-current" />
            <span className="text-sm text-muted-foreground">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">1000+ Happy Clients</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose ClickBeard?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine traditional barbering excellence with modern convenience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional grooming services tailored to your style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{service.duration}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    ${service.price}
                  </Badge>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Ready for Your Best Look?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of satisfied clients who trust ClickBeard for their grooming needs
          </p>
        </div>
        
        <Button variant="golden" size="lg" asChild>
          <Link to="/signup">
            Get Started Today
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
