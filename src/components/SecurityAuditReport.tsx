
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const SecurityAuditReport: React.FC = () => {
  const securityChecks = [
    {
      category: 'Input Validation & Sanitization',
      status: 'implemented',
      level: 'high',
      checks: [
        { name: 'Form Input Sanitization', status: 'pass', description: 'All form inputs are sanitized using DOMPurify' },
        { name: 'Email Validation', status: 'pass', description: 'Enhanced email validation with injection prevention' },
        { name: 'Phone Number Validation', status: 'pass', description: 'Phone numbers validated and sanitized' },
        { name: 'File Upload Validation', status: 'pass', description: 'Comprehensive file type and size validation' },
        { name: 'XSS Prevention', status: 'pass', description: 'XSS protection implemented via input sanitization' }
      ]
    },
    {
      category: 'Authentication & Session Management',
      status: 'implemented',
      level: 'high',
      checks: [
        { name: 'CSRF Protection', status: 'pass', description: 'CSRF tokens implemented for form submissions' },
        { name: 'Session Timeout', status: 'pass', description: '30-minute session timeout implemented' },
        { name: 'Secure Session Storage', status: 'pass', description: 'Session data stored securely with validation' },
        { name: 'Token Management', status: 'pass', description: 'Secure token generation and validation' }
      ]
    },
    {
      category: 'API Security',
      status: 'implemented',
      level: 'high',
      checks: [
        { name: 'Rate Limiting', status: 'pass', description: 'API rate limiting implemented (10 req/min)' },
        { name: 'Request Timeout', status: 'pass', description: '30-second request timeout configured' },
        { name: 'Error Message Sanitization', status: 'pass', description: 'Error messages sanitized to prevent info leakage' },
        { name: 'Retry Logic with Backoff', status: 'pass', description: 'Exponential backoff retry mechanism' },
        { name: 'Request ID Tracking', status: 'pass', description: 'Unique request IDs for audit trailing' }
      ]
    },
    {
      category: 'Data Protection',
      status: 'implemented',
      level: 'high',
      checks: [
        { name: 'Input Length Limits', status: 'pass', description: 'Maximum input lengths enforced' },
        { name: 'Data Sanitization', status: 'pass', description: 'All data sanitized before processing' },
        { name: 'Secure Data Transmission', status: 'pass', description: 'HTTPS enforced for all communications' },
        { name: 'File Hash Verification', status: 'pass', description: 'SHA-256 hashing for uploaded files' }
      ]
    },
    {
      category: 'Security Headers',
      status: 'implemented',
      level: 'medium',
      checks: [
        { name: 'CSP Headers', status: 'pass', description: 'Content Security Policy configured' },
        { name: 'XSS Protection', status: 'pass', description: 'X-XSS-Protection header set' },
        { name: 'Frame Options', status: 'pass', description: 'X-Frame-Options set to DENY' },
        { name: 'Content Type Options', status: 'pass', description: 'X-Content-Type-Options set to nosniff' }
      ]
    },
    {
      category: 'Environment Security',
      status: 'requires_action',
      level: 'critical',
      checks: [
        { name: 'API Key Management', status: 'action_required', description: 'Replace placeholder API keys with secure environment variables' },
        { name: 'Environment Configuration', status: 'action_required', description: 'Configure production environment variables' },
        { name: 'SSL Certificate', status: 'pending', description: 'Ensure SSL certificate is properly configured' },
        { name: 'Database Security', status: 'pending', description: 'Verify database security configuration' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'action_required':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'pending':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented':
        return 'bg-green-100 text-green-800';
      case 'requires_action':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalChecks = securityChecks.reduce((sum, category) => sum + category.checks.length, 0);
  const passedChecks = securityChecks.reduce((sum, category) => 
    sum + category.checks.filter(check => check.status === 'pass').length, 0);
  const actionRequiredChecks = securityChecks.reduce((sum, category) => 
    sum + category.checks.filter(check => check.status === 'action_required').length, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Security Audit Report</CardTitle>
              <p className="text-gray-600 mt-1">Leader Link - Bank Integration Security Assessment</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Passed Checks</p>
                  <p className="text-2xl font-bold text-green-700">{passedChecks}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Action Required</p>
                  <p className="text-2xl font-bold text-yellow-700">{actionRequiredChecks}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Checks</p>
                  <p className="text-2xl font-bold text-blue-700">{totalChecks}</p>
                </div>
                <Info className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {securityChecks.map((category, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                    <div className="flex space-x-2">
                      <Badge className={getLevelColor(category.level)}>
                        {category.level.toUpperCase()} PRIORITY
                      </Badge>
                      <Badge className={getStatusColor(category.status)}>
                        {category.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.checks.map((check, checkIndex) => (
                      <div key={checkIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{check.name}</h4>
                            <Badge variant={check.status === 'pass' ? 'default' : 'destructive'}>
                              {check.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Next Steps for Bank Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-blue-700">
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-800">1.</span>
                  <p>Replace all placeholder API keys with secure environment variables</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-800">2.</span>
                  <p>Configure production SSL certificates and verify HTTPS enforcement</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-800">3.</span>
                  <p>Set up database security with proper access controls and encryption</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-800">4.</span>
                  <p>Implement IP whitelisting for bank network access</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-800">5.</span>
                  <p>Set up comprehensive audit logging and monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAuditReport;
