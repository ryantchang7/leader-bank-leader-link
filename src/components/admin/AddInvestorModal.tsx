
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

interface AddInvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvestorAdded: () => void;
}

const AddInvestorModal: React.FC<AddInvestorModalProps> = ({ isOpen, onClose, onInvestorAdded }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    firm: '',
    email: '',
    phone: '',
    investment_range: '',
    location: '',
    bio: '',
    linkedin_url: '',
    website: '',
    status: 'active'
  });

  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [preferredStages, setPreferredStages] = useState<string[]>([]);
  const [newFocusArea, setNewFocusArea] = useState('');
  const [newStage, setNewStage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('investor_profiles')
        .insert([{
          ...formData,
          focus_areas: focusAreas,
          preferred_stages: preferredStages
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Investor added successfully!",
      });

      onInvestorAdded();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        firm: '',
        email: '',
        phone: '',
        investment_range: '',
        location: '',
        bio: '',
        linkedin_url: '',
        website: '',
        status: 'active'
      });
      setFocusAreas([]);
      setPreferredStages([]);
    } catch (error: any) {
      console.error('Error adding investor:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add investor",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFocusArea = () => {
    if (newFocusArea.trim() && !focusAreas.includes(newFocusArea.trim())) {
      setFocusAreas([...focusAreas, newFocusArea.trim()]);
      setNewFocusArea('');
    }
  };

  const removeFocusArea = (area: string) => {
    setFocusAreas(focusAreas.filter(a => a !== area));
  };

  const addStage = () => {
    if (newStage.trim() && !preferredStages.includes(newStage.trim())) {
      setPreferredStages([...preferredStages, newStage.trim()]);
      setNewStage('');
    }
  };

  const removeStage = (stage: string) => {
    setPreferredStages(preferredStages.filter(s => s !== stage));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Investor</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="firm">Firm *</Label>
              <Input
                id="firm"
                value={formData.firm}
                onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="investment_range">Investment Range *</Label>
              <Input
                id="investment_range"
                placeholder="e.g., $100K - $2M"
                value={formData.investment_range}
                onChange={(e) => setFormData({ ...formData, investment_range: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Focus Areas</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Enter focus area"
                value={newFocusArea}
                onChange={(e) => setNewFocusArea(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFocusArea())}
              />
              <Button type="button" onClick={addFocusArea} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <Badge key={area} variant="secondary" className="flex items-center gap-1">
                  {area}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFocusArea(area)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Preferred Stages</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Enter stage (e.g., Seed, Series A)"
                value={newStage}
                onChange={(e) => setNewStage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStage())}
              />
              <Button type="button" onClick={addStage} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferredStages.map((stage) => (
                <Badge key={stage} variant="secondary" className="flex items-center gap-1">
                  {stage}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeStage(stage)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Investor'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvestorModal;
