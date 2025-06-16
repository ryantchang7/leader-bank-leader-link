
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';

const TestSubmission: React.FC = () => {
  const [formData, setFormData] = useState({
    borrower_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    company_hq: '',
    business_stage: '',
    industry: '',
    seeking_type: '',
    raise_amount: '',
    business_description: '',
    funding_purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      console.log('Submitting form data:', formData);
      
      // Make sure all required fields are filled
      if (!formData.borrower_name || !formData.contact_name || !formData.contact_email || 
          !formData.company_hq || !formData.business_stage || !formData.industry || !formData.seeking_type) {
        throw new Error('Please fill in all required fields');
      }

      const { data, error } = await supabase
        .from('submissions')
        .insert([formData])
        .select();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (data && data.length > 0) {
        console.log('Successfully inserted:', data[0]);
        setMessage('Submission created successfully! Check the admin panel to see it.');
        setFormData({
          borrower_name: '',
          contact_name: '',
          contact_email: '',
          contact_phone: '',
          company_hq: '',
          business_stage: '',
          industry: '',
          seeking_type: '',
          raise_amount: '',
          business_description: '',
          funding_purpose: ''
        });
      } else {
        throw new Error('No data returned from insert operation');
      }
    } catch (error: any) {
      console.error('Error creating submission:', error);
      setMessage(`Error creating submission: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Test Submission Form</CardTitle>
        <p className="text-sm text-gray-600">
          Use this form to test that submissions are working properly
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="borrower_name">Company Name *</Label>
              <Input
                id="borrower_name"
                value={formData.borrower_name}
                onChange={(e) => handleInputChange('borrower_name', e.target.value)}
                placeholder="Acme Corp"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact_name">Contact Name *</Label>
              <Input
                id="contact_name"
                value={formData.contact_name}
                onChange={(e) => handleInputChange('contact_name', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_email">Email *</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
                placeholder="john@acme.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Phone</Label>
              <Input
                id="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_hq">Company HQ *</Label>
              <Input
                id="company_hq"
                value={formData.company_hq}
                onChange={(e) => handleInputChange('company_hq', e.target.value)}
                placeholder="San Francisco, CA"
                required
              />
            </div>
            <div>
              <Label htmlFor="business_stage">Business Stage *</Label>
              <Select value={formData.business_stage} onValueChange={(value) => handleInputChange('business_stage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="seeking_type">Seeking Type *</Label>
              <Select value={formData.seeking_type} onValueChange={(value) => handleInputChange('seeking_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity">Equity Investment</SelectItem>
                  <SelectItem value="debt">Debt Financing</SelectItem>
                  <SelectItem value="grant">Grant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="raise_amount">Raise Amount</Label>
            <Input
              id="raise_amount"
              value={formData.raise_amount}
              onChange={(e) => handleInputChange('raise_amount', e.target.value)}
              placeholder="$1M"
            />
          </div>

          <div>
            <Label htmlFor="business_description">Business Description</Label>
            <Textarea
              id="business_description"
              value={formData.business_description}
              onChange={(e) => handleInputChange('business_description', e.target.value)}
              placeholder="Describe your business..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="funding_purpose">Funding Purpose</Label>
            <Textarea
              id="funding_purpose"
              value={formData.funding_purpose}
              onChange={(e) => handleInputChange('funding_purpose', e.target.value)}
              placeholder="How will you use the funding?"
              rows={2}
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Test Submission'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestSubmission;
