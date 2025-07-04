import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Scissors, Plus, Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { mockSpecialties } from '@/data/mockData';
import { Specialty } from '@/types';
import { useToast } from '@/hooks/use-toast';

const ManageSpecialties = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>(mockSpecialties);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: '',
    description: ''
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      name: '',
      duration: '',
      price: '',
      description: ''
    });
    setEditingSpecialty(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSpecialty) {
      // Update existing specialty
      setSpecialties(prev => prev.map(specialty => 
        specialty.id === editingSpecialty.id 
          ? {
              ...specialty,
              name: formData.name,
              duration: parseInt(formData.duration),
              price: parseFloat(formData.price),
              description: formData.description
            }
          : specialty
      ));
      toast({
        title: "Service updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new specialty
      const newSpecialty: Specialty = {
        id: Date.now().toString(),
        name: formData.name,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        description: formData.description
      };
      setSpecialties(prev => [...prev, newSpecialty]);
      toast({
        title: "Service added",
        description: `${formData.name} has been added to your services.`,
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (specialty: Specialty) => {
    setEditingSpecialty(specialty);
    setFormData({
      name: specialty.name,
      duration: specialty.duration.toString(),
      price: specialty.price.toString(),
      description: specialty.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (specialtyId: string) => {
    const specialty = specialties.find(s => s.id === specialtyId);
    setSpecialties(prev => prev.filter(s => s.id !== specialtyId));
    toast({
      title: "Service removed",
      description: `${specialty?.name} has been removed from your services.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <p className="text-muted-foreground">Add, edit, and manage your service offerings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="golden" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingSpecialty ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
              <DialogDescription>
                {editingSpecialty ? 'Update service information' : 'Add a new service to your offerings'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Classic Cut"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="30"
                    min="15"
                    step="15"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="25"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this service..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="golden">
                  {editingSpecialty ? 'Update' : 'Add'} Service
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialties.map((specialty) => (
          <Card key={specialty.id} className="shadow-lg border-border/50 hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Scissors className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{specialty.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {specialty.duration}min
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ${specialty.price}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(specialty)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(specialty.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {specialty.description && (
                  <p className="text-sm text-muted-foreground">
                    {specialty.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Duration: {specialty.duration} minutes
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    ${specialty.price}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {specialties.length === 0 && (
        <Card className="shadow-lg border-border/50">
          <CardContent className="text-center py-16">
            <Scissors className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No services added yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first service offering
            </p>
            <Button variant="golden" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageSpecialties;