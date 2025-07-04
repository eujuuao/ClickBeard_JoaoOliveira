import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { mockBarbers, mockSpecialties } from '@/data/mockData';
import { Barber } from '@/types';
import { useToast } from '@/hooks/use-toast';

const ManageBarbers = () => {
  const [barbers, setBarbers] = useState<Barber[]>(mockBarbers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    hireDate: '',
    specialties: [] as string[]
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      hireDate: '',
      specialties: []
    });
    setEditingBarber(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBarber) {
      // Update existing barber
      setBarbers(prev => prev.map(barber => 
        barber.id === editingBarber.id 
          ? {
              ...barber,
              name: formData.name,
              age: parseInt(formData.age),
              hireDate: formData.hireDate,
              specialties: formData.specialties
            }
          : barber
      ));
      toast({
        title: "Barber updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new barber
      const newBarber: Barber = {
        id: Date.now().toString(),
        name: formData.name,
        age: parseInt(formData.age),
        hireDate: formData.hireDate,
        specialties: formData.specialties
      };
      setBarbers(prev => [...prev, newBarber]);
      toast({
        title: "Barber added",
        description: `${formData.name} has been added to the team.`,
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (barber: Barber) => {
    setEditingBarber(barber);
    setFormData({
      name: barber.name,
      age: barber.age.toString(),
      hireDate: barber.hireDate,
      specialties: barber.specialties
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (barberId: string) => {
    const barber = barbers.find(b => b.id === barberId);
    setBarbers(prev => prev.filter(b => b.id !== barberId));
    toast({
      title: "Barber removed",
      description: `${barber?.name} has been removed from the team.`,
      variant: "destructive",
    });
  };

  const handleSpecialtyToggle = (specialtyId: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialtyId)
        ? prev.specialties.filter(id => id !== specialtyId)
        : [...prev.specialties, specialtyId]
    }));
  };

  const getSpecialtyNames = (specialtyIds: string[]) => {
    return specialtyIds.map(id => 
      mockSpecialties.find(s => s.id === id)?.name || ''
    ).filter(Boolean);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Barbers</h1>
          <p className="text-muted-foreground">Add, edit, and manage your barber team</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="golden" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Barber
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingBarber ? 'Edit Barber' : 'Add New Barber'}
              </DialogTitle>
              <DialogDescription>
                {editingBarber ? 'Update barber information' : 'Add a new barber to your team'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="25"
                  min="18"
                  max="70"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hireDate: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Specialties</Label>
                <div className="grid grid-cols-2 gap-2">
                  {mockSpecialties.map((specialty) => (
                    <label key={specialty.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.specialties.includes(specialty.id)}
                        onChange={() => handleSpecialtyToggle(specialty.id)}
                        className="rounded border-border"
                      />
                      <span className="text-sm">{specialty.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="golden">
                  {editingBarber ? 'Update' : 'Add'} Barber
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Barbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <Card key={barber.id} className="shadow-lg border-border/50 hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{barber.name}</CardTitle>
                    <CardDescription>Age {barber.age}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(barber)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(barber.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Hired {new Date(barber.hireDate).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {getSpecialtyNames(barber.specialties).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {barbers.length === 0 && (
        <Card className="shadow-lg border-border/50">
          <CardContent className="text-center py-16">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No barbers added yet</h3>
            <p className="text-muted-foreground mb-4">
              Start building your team by adding your first barber
            </p>
            <Button variant="golden" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Barber
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageBarbers;